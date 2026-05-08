import { computed, reactive } from 'vue'
import { useParams } from './useParams.js'
import {
  density, mobility, epsL, diffusionL, diffusionT, driftVelocity,
  recombBirks, recombBox, attenuation, ka_O2,
  iofLiquid, groupVelocity,
  mpv, eloss,
  eRatioTrans, wireCapacitanceAir, wireCapacitanceLAr, cathodeHV,
} from './lar.js'

// Fixed scientific / detector constants — not user-tunable via the sidebar.
// Can be overridden per-page by mutating `config` after calling usePhysics().
export const config = reactive({
  T_c:            150.687,  // K   — critical temperature
  rho_c:          0.5356,   // g/cm³ — critical density
  T0:             89.0,     // K   — Walkowiak reference T
  T1:             87.0,     // K   — eps_L reference T
  wl:             128.0,    // nm  — VUV emission wavelength
  dEdx:           2.1,      // MeV/cm — reference ionisation dE/dx
  particle_mom:   0.3,      // GeV/c
  particle_mass:  105,      // MeV  — muon
  pass_thickness: 0.3,      // cm
  particle_tcut:  null,     // MeV  — null → use tmax
  tlife:          10,       // ms  — electron lifetime
  wire_spacing:   3,        // mm
  wire_diameter:  0.15,     // mm
  drift_dist_max: 2.56,     // m
  plane_gap:      3,        // mm
  E_ratio:        1.4,      // induction/collection field ratio
})

export function usePhysics() {
  const { state } = useParams()

  // E in kV/cm for all lar.js functions
  const E = computed(() => state.E / 1000)

  const rho  = computed(() => density(state.T, config.T_c, config.rho_c))
  const mu   = computed(() => mobility(E.value, state.T, config.T0))
  const epsl = computed(() => epsL(E.value, state.T, config.T1))
  const DL   = computed(() => diffusionL(epsl.value, mu.value))
  const DT   = computed(() => diffusionT(E.value, state.T, DL.value, mu.value))
  const v    = computed(() => driftVelocity(mu.value, E.value))

  // Induction / collection plane fields
  const E2  = computed(() => E.value * config.E_ratio)
  const E3  = computed(() => E2.value * config.E_ratio)
  const mu2 = computed(() => mobility(E2.value, state.T, config.T0))
  const mu3 = computed(() => mobility(E3.value, state.T, config.T0))
  const v2  = computed(() => driftVelocity(mu2.value, E2.value))
  const v3  = computed(() => driftVelocity(mu3.value, E3.value))

  // Drift times (μs)
  const driftTime  = computed(() => config.drift_dist_max * 100 / v.value)
  const driftTime2 = computed(() => config.plane_gap * 0.1 / v2.value)
  const driftTime3 = computed(() => config.plane_gap * 0.1 / v3.value)

  // Recombination
  const Rc_birks = computed(() => recombBirks(config.dEdx, E.value, rho.value))
  const Rc_box   = computed(() => recombBox(config.dEdx, E.value, rho.value))
  const R_L      = computed(() => 1 - 0.803 * Rc_birks.value)

  // Electron attenuation over drift_dist_max
  const atten = computed(() => attenuation(config.drift_dist_max, v.value, config.tlife))

  // O₂ attachment rate constant
  const kaO2 = computed(() => ka_O2(E.value))

  // Electron lifetime from O₂ contamination
  const o2Ppt      = computed(() => Math.pow(10, state.O2_log))
  const electronLifetime = computed(() => {
    if (o2Ppt.value <= 0) return Infinity
    return 1 / (kaO2.value * 3.5e-11 * o2Ppt.value) * 1e6 // ms
  })

  // Optics at current wavelength
  const iof = computed(() => iofLiquid(config.wl, rho.value))
  const vg  = computed(() => groupVelocity(config.wl, rho.value))

  // Electronics
  const E_ratio_trans = computed(() => eRatioTrans(config.wire_diameter, config.wire_spacing))
  const wire_c_air    = computed(() => wireCapacitanceAir(config.wire_spacing, config.wire_diameter, config.plane_gap))
  const wire_c_lar    = computed(() => wireCapacitanceLAr(config.wire_spacing, config.wire_diameter, config.plane_gap))
  const cathod_hv     = computed(() => cathodeHV(E.value, config.drift_dist_max))

  // Particle passage
  const mpvVal    = computed(() => mpv(config.particle_mom, config.particle_mass, rho.value, config.pass_thickness))
  const elossVal  = computed(() => eloss(config.particle_mom, config.particle_mass, config.particle_tcut, rho.value))

  return {
    // Core
    E, rho, mu, epsl, DL, DT, v,
    // Multi-plane
    E2, E3, mu2, mu3, v2, v3,
    // Drift
    driftTime, driftTime2, driftTime3,
    // Recombination & attenuation
    Rc_birks, Rc_box, R_L, atten,
    // O₂
    kaO2, o2Ppt, electronLifetime,
    // Optics
    iof, vg,
    // Electronics
    E_ratio_trans, wire_c_air, wire_c_lar, cathod_hv,
    // Particle passage
    mpvVal, elossVal,
  }
}
