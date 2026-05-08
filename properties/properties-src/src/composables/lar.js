// Pure physics functions ported verbatim from properties/js/app.js.
// E is in kV/cm throughout (convert from V/cm with E/1000 before calling).

export function trunc(value, precision = 4) {
  try { return value.toFixed(precision) } catch (e) { console.log(e) }
}

// ─── Density ──────────────────────────────────────────────────────────────────

export function density(T, T_c = 150.687, rho_c = 0.5356) {
  const a = 1.5004262
  const b = -0.31381290
  const c = 0.086461622
  const d = -0.041477525
  const t = 1 - T / T_c
  const rho = Math.log(rho_c)
    + a * Math.pow(t, 0.334)
    + b * Math.pow(t, 2 / 3)
    + c * Math.pow(t, 7 / 3)
    + d * Math.pow(t, 4)
  return Math.exp(rho)
}

// ─── Electron transport ───────────────────────────────────────────────────────

// Walkowiak mobility fit.  E in kV/cm, T in K.  Returns cm²/(kV·μs).
export function mobility(E, T,
  T0 = 89.0,
  a0 = 551.6, a1 = 7953.7 * 0.9, a2 = 4440.43,
  a3 = 4.29,  a4 = 43.63,        a5 = 0.2053,
) {
  return (a0 + a1 * E + a2 * Math.pow(E, 1.5) + a3 * Math.pow(E, 2.5))
    / (1 + (a1 / a0) * E + a4 * Math.pow(E, 2) + a5 * Math.pow(E, 3))
    * Math.pow(T / T0, -1.5)
}

// Longitudinal characteristic energy.  E in kV/cm, T in K.  Returns eV.
export function epsL(E, T,
  T1 = 87.0,
  b0 = 0.0075, b1 = 742.9, b2 = 3269.6, b3 = 31678.2,
) {
  return (b0 + b1 * E + b2 * E * E)
    / (1 + (b1 / b0) * E + b3 * E * E)
    * T / T1
}

// Longitudinal diffusion coefficient.  Returns cm²/μs.
export function diffusionL(epsL_val, mu_val) {
  return epsL_val * mu_val
}

// Transverse diffusion coefficient.  Returns cm²/μs.
export function diffusionT(E, T, DL, mu_val) {
  if (E < 1e-4) return DL
  const dmu_dE = (mobility(E * 1.001, T) - mu_val) / (0.001 * E)
  return DL / (1 + (E / mu_val) * dmu_dE)
}

// Drift velocity.  E in kV/cm, mu in cm²/(kV·μs).  Returns cm/μs.
export function driftVelocity(mu_val, E) {
  return mu_val * E / 1000
}

// ─── Recombination ────────────────────────────────────────────────────────────

export function recombBirks(dEdx, E, rho) {
  return 0.8 / (1 + 0.0486 * dEdx / E / rho)
}

export function recombBox(dEdx, E, rho) {
  const x = 0.212 / E / rho * dEdx
  return Math.log(0.93 + x) / x
}

// ─── Attenuation ──────────────────────────────────────────────────────────────

// drift_dist in metres, v in cm/μs, tlife in ms.
export function attenuation(drift_dist, v, tlife) {
  return Math.exp(-drift_dist / v * 0.1 / tlife)
}

// ─── O₂ attachment ───────────────────────────────────────────────────────────

// arXiv:2205.06888.  E in kV/cm.
export function attachment(E, p, a1, a2, a3, a4, b1, b2, b3, b4) {
  return Math.pow(10, p)
    * (a1 / b1 + a1 * E + a2 * Math.pow(E, 2) + a3 * Math.pow(E, 3) + a4 * Math.pow(E, 4))
    / (1 + b1 * E + b2 * Math.pow(E, 2) + b3 * Math.pow(E, 3) + b4 * Math.pow(E, 4))
}

export function ka_O2(E) {
  return attachment(E, 11, 39.4, 1.20062, 0, 0, 0.925794, 1.63816, 0, 0)
}

// ─── Optics ───────────────────────────────────────────────────────────────────

// Gas index of refraction.  lambda in nm.
export function iofGas(lambda) {
  const c0 = 1.2055e-2
  const a1 = 0.2075, b1 = 91.012
  const a2 = 0.0415, b2 = 87.892
  const a3 = 4.3330, b3 = 214.02
  const lam = lambda / 1000
  return 1 + c0 * (
    a1 / (b1 - 1 / lam / lam) +
    a2 / (b2 - 1 / lam / lam) +
    a3 / (b3 - 1 / lam / lam)
  )
}

// Liquid index of refraction.  lambda in nm, rho in g/cm³.
export function iofLiquid(lambda, rho) {
  const nG  = iofGas(lambda)
  const rhoG = 1.0034 * 0.0017840
  return Math.sqrt((2 + nG * nG) * rhoG + 2 * (-1 + nG * nG) * rho)
    / Math.sqrt((2 + nG * nG) * rhoG + rho - nG * nG * rho)
}

// Group velocity (units of c).  lambda in nm, rho in g/cm³.
export function groupVelocity(lambda, rho) {
  const y  = iofLiquid(lambda, rho)
  const dx = 0.01
  return 1 / y + lambda / y / y * (iofLiquid(lambda + dx, rho) - y) / dx
}

// ─── Particle passage ─────────────────────────────────────────────────────────

// Most-probable energy loss (Landau MPV).  mom in GeV/c, mass in MeV, rho in g/cm³.
export function mpv(particle_mom, particle_mass, rho, pass_thickness) {
  const fZ = 18, fA = 39.948, fI = 188.00
  const fSa = 0.1956, fSk = 3.0, fSx0 = 0.2, fSx1 = 3.0, fScbar = 5.2146
  const K = 0.307075, me = 0.510998918

  const bg    = particle_mom * 1000 / particle_mass
  const gamma = Math.sqrt(1 + bg * bg)
  const beta  = bg / gamma

  const psi  = K / 2 * fZ / fA / beta / beta * rho * pass_thickness
  let   coef = Math.log(2 * me * 1e6 * bg * bg / fI) + Math.log(psi * 1e6 / fI) + 0.2 - beta * beta

  const x = Math.log10(bg)
  let delta = 0
  if (x >= fSx0) {
    delta = 2 * Math.log(10) * x - fScbar
    if (x < fSx1) delta += fSa * Math.pow(fSx1 - x, fSk)
  }
  coef -= delta
  return psi * coef / pass_thickness
}

// Mean energy loss (Bethe-Bloch).  Returns { eloss, tmax }.
export function eloss(particle_mom, particle_mass, particle_tcut, rho) {
  const fZ = 18, fA = 39.948, fI = 188.00
  const fSa = 0.1956, fSk = 3.0, fSx0 = 0.2, fSx1 = 3.0, fScbar = 5.2146
  const K = 0.307075, me = 0.510998918

  const bg    = particle_mom * 1000 / particle_mass
  const gamma = Math.sqrt(1 + bg * bg)
  const beta  = bg / gamma
  const mer   = 0.001 * me / particle_mass
  const tmax  = 2 * me * bg * bg / (1 + 2 * gamma * mer + mer * mer)

  let tcut = particle_tcut
  if (tcut < 1e-3 || tcut > tmax) tcut = tmax

  const x = Math.log10(bg)
  let delta = 0
  if (x >= fSx0) {
    delta = 2 * Math.log(10) * x - fScbar
    if (x < fSx1) delta += fSa * Math.pow(fSx1 - x, fSk)
  }

  let B = 0.5 * Math.log(2 * me * bg * bg * tcut / (1e-12 * fI * fI))
    - 0.5 * beta * beta * (1 + tcut / tmax)
    - 0.5 * delta
  if (B < 1) B = 1

  return { eloss: rho * K * fZ * B / (fA * beta * beta), tmax }
}

// ─── Electronics ─────────────────────────────────────────────────────────────

// Ratio of induction to collection plane E field.
export function eRatioTrans(wire_diameter, wire_spacing) {
  const pi = Math.PI, r = wire_diameter / 2, d = wire_spacing
  return 1 + 4 * pi * r / d * (1 + Math.log(d / 2 / pi / r) / 2 / pi)
}

// Wire capacitance in air/LAr (pF/cm).
export function wireCapacitanceAir(wire_spacing, wire_diameter, plane_gap, perm_free_space = 8.85) {
  return 5 + 2 * Math.PI * perm_free_space
    / (Math.PI * plane_gap / wire_spacing - Math.log(Math.PI * wire_diameter / wire_spacing))
}

export function wireCapacitanceLAr(wire_spacing, wire_diameter, plane_gap, dielec = 1.505) {
  return dielec * wireCapacitanceAir(wire_spacing, wire_diameter, plane_gap)
}

// Cathode high voltage (kV).  E in kV/cm, drift_dist in m.
export function cathodeHV(E, drift_dist) {
  return 100 * E * drift_dist
}
