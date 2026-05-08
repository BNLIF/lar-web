<template>
  <TheShell>
    <div class="doc-head">
      <p class="doc-eyebrow">BNL Detector R&amp;D · Liquid Argon</p>
      <h1 class="doc-title">Liquid Argon Properties</h1>
      <p class="doc-lede">Tables and calculators for the thermophysical, electrical, and optical properties of liquid argon</p>
      <div class="legend-bar">
        <p class="live-legend"><span class="live-swatch"></span>Highlighted rows are calculated live — values update when you adjust the parameters above each table.</p>
        <button class="export-btn" @click="exportCSV">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export CSV
        </button>
      </div>
    </div>

    <!-- ── 1. Basic Properties ─────────────────────────────────────── -->
    <section class="doc-section" id="basic-prop">
      <h2 class="sec-title"><span class="num">01</span>Basic Properties</h2>
      <p class="sec-sub">Isotopic composition, thermodynamic constants, and density. <a href="basic.html">Full details →</a></p>

      <h3 class="subhead" id="basic-isotopes">Isotopic composition</h3>
      <table class="data">
        <thead><tr><th>Isotope</th><th>Rel. mass</th><th>Abundance</th><th>Decay</th><th>Half-life</th><th class="num">Q (MeV)</th></tr></thead>
        <tbody>
          <tr><td>$^{36}$Ar</td><td class="num">35.96754628(27)</td><td>0.337(3)%</td><td>stable</td><td>—</td><td class="num">—</td></tr>
          <tr><td>$^{37}$Ar</td><td></td><td>nil</td><td>EC, $\beta^+$</td><td>35.04 d</td><td class="num">0.8135(3)</td></tr>
          <tr><td>$^{38}$Ar</td><td class="num">37.9627322(5)</td><td>0.063(1)%</td><td>stable</td><td>—</td><td class="num">—</td></tr>
          <tr><td>$^{39}$Ar</td><td></td><td>1.01(8) Bq/kg</td><td>$\beta^-$</td><td>269 y</td><td class="num">0.565(5)</td></tr>
          <tr><td>$^{40}$Ar</td><td class="num">39.962383123(3)</td><td>99.600(3)%</td><td>stable</td><td>—</td><td class="num">—</td></tr>
          <tr><td>$^{41}$Ar</td><td></td><td>nil</td><td>$\beta^-$</td><td>109.34 m</td><td class="num">2.4916(7)</td></tr>
          <tr><td>$^{42}$Ar</td><td></td><td>$6\times10^{-5}$ Bq/kg</td><td>$\beta^-$</td><td>32.9 y</td><td class="num">0.599(40)</td></tr>
        </tbody>
      </table>

      <h3 class="subhead" id="basic-thermo">Thermodynamic properties</h3>
      <p class="sec-sub">All values on the liquid–vapor saturation line at 500 V/cm unless otherwise noted.</p>
      <table class="data">
        <thead><tr><th>Property</th><th>Symbol</th><th class="num">Value</th><th>Unit</th></tr></thead>
        <tbody>
          <tr><td>Normal boiling point</td><td>$T_\text{NBP}$</td><td class="num">87.303(2)</td><td class="units">K</td></tr>
          <tr><td>Density at NBP</td><td>$\rho_\text{NBP}$</td><td class="num">1.396(1)</td><td class="units">g/mL</td></tr>
          <tr><td>Vapor/liquid volume ratio</td><td>$V_g/V_l$</td><td class="num">241.7</td><td class="units">—</td></tr>
          <tr><td>Normal freezing point</td><td>$T_\text{NFP}$</td><td class="num">83.8(3)</td><td class="units">K</td></tr>
          <tr><td>Triple-point temperature</td><td>$T_\text{triple}$</td><td class="num">83.8058</td><td class="units">K</td></tr>
          <tr><td>Triple-point pressure</td><td>$P_\text{triple}$</td><td class="num">0.68891(2)</td><td class="units">bar</td></tr>
          <tr><td>Triple-point density</td><td>$\rho_\text{triple}$</td><td class="num">1.417</td><td class="units">g/cm³</td></tr>
          <tr><td>Critical temperature</td><td>$T_c$</td><td class="num">150.687(15)</td><td class="units">K</td></tr>
          <tr><td>Critical pressure</td><td>$P_c$</td><td class="num">48.63(3)</td><td class="units">bar</td></tr>
          <tr><td>Critical density</td><td>$\rho_c$</td><td class="num">0.5356(10)</td><td class="units">g/cm³</td></tr>
          <tr><td>Heat of vaporization</td><td>$\Delta H_\text{vap}$</td><td class="num">161.14</td><td class="units">kJ/kg</td></tr>
          <tr><td>Heat capacity</td><td>$C_p$</td><td class="num">1.117</td><td class="units">kJ/kg/K</td></tr>
          <tr><td>Thermal conductivity</td><td>$\kappa$</td><td class="num">0.1256</td><td class="units">W/m/K</td></tr>
          <tr><td>Viscosity</td><td>$\eta$</td><td class="num">270.7</td><td class="units">μPa·s</td></tr>
          <tr><td>Speed of sound</td><td>$v_s$</td><td class="num">838.3(1)</td><td class="units">m/s</td></tr>
        </tbody>
      </table>

      <h3 class="subhead" id="basic-density">Density (live)</h3>
      <div class="inline-params">
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Temperature <em>T</em></span>
              <span class="param-value">
                <input type="number" class="param-num" v-model.number="params.T"
                       min="75" max="100" step="0.1"
                       @change="params.T = clamp(params.T, 75, 100)">
                <span class="u">K</span>
              </span>
            </div>
            <input type="range" class="param-slider" v-model.number="params.T"
                   min="75" max="100" step="0.1">
            <div class="param-marks">
              <span style="left:0%">75</span>
              <span style="left:35.2%">83.8</span>
              <span style="left:49.2%">87.3</span>
              <span style="left:100%">100</span>
            </div>
          </div>
        </div>
      </div>
      <table class="data">
        <thead><tr><th>Property</th><th>Symbol</th><th class="num">Value</th><th>Unit</th></tr></thead>
        <tbody>
          <tr class="is-live" :class="{ live: flashing.rho }"><td>Density at T = {{ params.T.toFixed(2) }} K</td><td>$\rho$</td><td class="num">{{ trunc(physics.rho.value) }}</td><td class="units">g/cm³</td></tr>
        </tbody>
      </table>
    </section>

    <!-- ── 2. Electron Transportation ─────────────────────────────── -->
    <section class="doc-section" id="e-trans">
      <h2 class="sec-title"><span class="num">02</span>Electron Transportation</h2>
      <p class="sec-sub">Drift velocity, diffusion, and O₂ attachment as a function of field and temperature. <a href="trans.html">Full details →</a></p>

      <div class="inline-params">
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Temperature <em>T</em></span>
              <span class="param-value">
                <input type="number" class="param-num" v-model.number="params.T"
                       min="75" max="100" step="0.1"
                       @change="params.T = clamp(params.T, 75, 100)">
                <span class="u">K</span>
              </span>
            </div>
            <input type="range" class="param-slider" v-model.number="params.T"
                   min="75" max="100" step="0.1">
            <div class="param-marks">
              <span style="left:0%">75</span>
              <span style="left:35.2%">83.8</span>
              <span style="left:49.2%">87.3</span>
              <span style="left:100%">100</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Drift field <em>E</em></span>
              <span class="param-value">
                <input type="number" class="param-num" v-model.number="params.E"
                       min="50" max="1500" step="10"
                       @change="params.E = clamp(params.E, 50, 1500)">
                <span class="u">V/cm</span>
              </span>
            </div>
            <input type="range" class="param-slider" v-model.number="params.E"
                   min="50" max="1500" step="10">
            <div class="param-marks">
              <span style="left:0%">50</span>
              <span style="left:31%">500</span>
              <span style="left:65.5%">1k</span>
              <span style="left:100%">1.5k</span>
            </div>
          </div>
        </div>
      </div>
      <table class="data">
        <thead><tr><th>Property</th><th>Symbol</th><th class="num">Value</th><th>Unit</th></tr></thead>
        <tbody>
          <tr class="is-live" :class="{ live: flashing.mu }"><td>Electron mobility</td><td>$\mu$</td><td class="num">{{ trunc(physics.mu.value) }}</td><td class="units">cm² V⁻¹ s⁻¹</td></tr>
          <tr class="is-live" :class="{ live: flashing.vd }"><td>Drift velocity</td><td>$v$</td><td class="num">{{ trunc(physics.v.value) }}</td><td class="units">cm/μs</td></tr>
          <tr class="is-live" :class="{ live: flashing.epsl }"><td>Longitudinal electron energy</td><td>$\epsilon_L$</td><td class="num">{{ trunc(physics.epsl.value) }}</td><td class="units">eV</td></tr>
          <tr class="is-live" :class="{ live: flashing.DL }"><td>Longitudinal diffusion</td><td>$D_L$</td><td class="num">{{ trunc(physics.DL.value) }}</td><td class="units">cm²/s</td></tr>
          <tr class="is-live" :class="{ live: flashing.DT }"><td>Transverse diffusion</td><td>$D_T$</td><td class="num">{{ trunc(physics.DT.value) }}</td><td class="units">cm²/s</td></tr>
          <tr class="is-live" :class="{ live: flashing.kaO2 }"><td>Attachment rate constant (O₂)</td><td>$k_A$</td><td class="num">{{ trunc(physics.kaO2.value / 1e12) }}</td><td class="units">10¹² s⁻¹M⁻¹</td></tr>
          <tr class="is-live" :class="{ live: flashing.kaO2 }"><td>Electron lifetime (0.1 ppb O₂)</td><td>$\tau$</td><td class="num">{{ trunc(1 / (physics.kaO2.value * 0.1e-9) * 1e3) }}</td><td class="units">ms</td></tr>
        </tbody>
      </table>
    </section>

    <!-- ── 3. Space Charge ─────────────────────────────────────────── -->
    <section class="doc-section" id="space-charge">
      <h2 class="sec-title"><span class="num">03</span>Space Charge</h2>
      <p class="sec-sub">Electrostatic effects from slow-moving ions. <a href="spacecharge.html">Full details →</a></p>
      <table class="data">
        <thead><tr><th>Property</th><th>Symbol</th><th class="num">Value</th><th>Unit</th></tr></thead>
        <tbody>
          <tr><td>Ion drift velocity</td><td>$v_\text{ion}$</td><td class="num">8</td><td class="units">mm/s</td></tr>
        </tbody>
      </table>
    </section>

    <!-- ── 4. Particle Passage ────────────────────────────────────── -->
    <section class="doc-section" id="particle-pass">
      <h2 class="sec-title"><span class="num">04</span>Particle Passage</h2>
      <p class="sec-sub">Ionization, recombination, and energy loss. <a href="pass.html">Full details →</a></p>

      <table class="data">
        <thead><tr><th>Property</th><th>Symbol</th><th class="num">Value</th><th>Unit</th></tr></thead>
        <tbody>
          <tr><td>W-value for ionization</td><td>$W_i$</td><td class="num">23.6(3)</td><td class="units">eV/pair</td></tr>
          <tr><td>Fano factor</td><td>$F$</td><td class="num">0.107</td><td class="units">—</td></tr>
          <tr><td>Molière radius</td><td>$R_M$</td><td class="num">10.0</td><td class="units">cm</td></tr>
          <tr><td>Radiation length</td><td>$X_0$</td><td class="num">14.0</td><td class="units">cm</td></tr>
          <tr><td>Nuclear interaction length</td><td>$\lambda_i$</td><td class="num">85.7</td><td class="units">cm</td></tr>
          <tr><td>Critical energy</td><td>$E_c$</td><td class="num">30.5</td><td class="units">MeV</td></tr>
          <tr><td>Min. specific energy loss (MIP)</td><td>$(dE/dx)_\text{MIP}$</td><td class="num">2.12</td><td class="units">MeV/cm</td></tr>
        </tbody>
      </table>

      <h3 class="subhead" id="pass-recomb">Recombination (live)</h3>
      <div class="inline-params">
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Temperature <em>T</em></span>
              <span class="param-value">
                <input type="number" class="param-num" v-model.number="params.T"
                       min="75" max="100" step="0.1"
                       @change="params.T = clamp(params.T, 75, 100)">
                <span class="u">K</span>
              </span>
            </div>
            <input type="range" class="param-slider" v-model.number="params.T"
                   min="75" max="100" step="0.1">
            <div class="param-marks">
              <span style="left:0%">75</span>
              <span style="left:35.2%">83.8</span>
              <span style="left:49.2%">87.3</span>
              <span style="left:100%">100</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Drift field <em>E</em></span>
              <span class="param-value">
                <input type="number" class="param-num" v-model.number="params.E"
                       min="50" max="1500" step="10"
                       @change="params.E = clamp(params.E, 50, 1500)">
                <span class="u">V/cm</span>
              </span>
            </div>
            <input type="range" class="param-slider" v-model.number="params.E"
                   min="50" max="1500" step="10">
            <div class="param-marks">
              <span style="left:0%">50</span>
              <span style="left:31%">500</span>
              <span style="left:65.5%">1k</span>
              <span style="left:100%">1.5k</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">d<em>E</em>/d<em>x</em></span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.dEdx" min="0.5" max="10" step="0.1"><span class="u">MeV/cm</span></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.dEdx" min="0.5" max="10" step="0.1">
            <div class="param-marks">
              <span style="left:0%">0.5</span>
              <span style="left:15.8%">2</span>
              <span style="left:47.4%">5</span>
              <span style="left:100%">10</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Drift dist.</span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.drift_dist_max" min="0.1" max="10" step="0.1"><span class="u">m</span></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.drift_dist_max" min="0.1" max="10" step="0.1">
            <div class="param-marks">
              <span style="left:0%">0.1</span>
              <span style="left:19.2%">2</span>
              <span style="left:49.5%">5</span>
              <span style="left:100%">10</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">e⁻ lifetime</span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.tlife" min="0.1" max="20" step="0.1"><span class="u">ms</span></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.tlife" min="0.1" max="20" step="0.1">
            <div class="param-marks">
              <span style="left:0%">0.1</span>
              <span style="left:50%">10</span>
              <span style="left:100%">20</span>
            </div>
          </div>
        </div>
      </div>
      <table class="data">
        <thead><tr><th>Property</th><th>Symbol</th><th class="num">Value</th><th>Unit</th></tr></thead>
        <tbody>
          <tr class="is-live" :class="{ live: flashing.Rc }"><td>Recombination factor (Birks)</td><td>$R_c$</td><td class="num">{{ trunc(physics.Rc_birks.value) }}</td><td class="units">—</td></tr>
          <tr class="is-live" :class="{ live: flashing.atten }"><td>Attachment factor</td><td>$R_a$</td><td class="num">{{ trunc(physics.atten.value) }}</td><td class="units">—</td></tr>
          <tr class="is-live" :class="{ live: flashing.atten }"><td>Total electron reduction</td><td>$R_c \cdot R_a$</td><td class="num">{{ trunc(physics.atten.value * physics.Rc_birks.value) }}</td><td class="units">—</td></tr>
          <tr class="is-live" :class="{ live: flashing.RL }"><td>Light recombination factor</td><td>$R_L$</td><td class="num">{{ trunc(physics.R_L.value) }}</td><td class="units">—</td></tr>
        </tbody>
      </table>

      <h3 class="subhead" id="pass-eloss">Energy loss (live)</h3>
      <div class="inline-params">
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Temperature <em>T</em></span>
              <span class="param-value">
                <input type="number" class="param-num" v-model.number="params.T"
                       min="75" max="100" step="0.1"
                       @change="params.T = clamp(params.T, 75, 100)">
                <span class="u">K</span>
              </span>
            </div>
            <input type="range" class="param-slider" v-model.number="params.T"
                   min="75" max="100" step="0.1">
            <div class="param-marks">
              <span style="left:0%">75</span>
              <span style="left:35.2%">83.8</span>
              <span style="left:49.2%">87.3</span>
              <span style="left:100%">100</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Momentum</span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.particle_mom" min="0.01" max="10" step="0.01"><span class="u">GeV/c</span></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.particle_mom" min="0.01" max="10" step="0.01">
            <div class="param-marks">
              <span style="left:0%">0.01</span>
              <span style="left:9.9%">1</span>
              <span style="left:50%">5</span>
              <span style="left:100%">10</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Mass</span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.particle_mass" min="0.5" max="3000" step="1"><span class="u">MeV</span></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.particle_mass" min="0.5" max="3000" step="1">
            <div class="param-marks">
              <span style="left:0%">0.5</span>
              <span style="left:16.7%">500</span>
              <span style="left:100%">3k</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Thickness</span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.pass_thickness" min="0.1" max="1" step="0.01"><span class="u">cm</span></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.pass_thickness" min="0.1" max="1" step="0.01">
            <div class="param-marks">
              <span style="left:0%">0.1</span>
              <span style="left:44.4%">0.5</span>
              <span style="left:100%">1</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">T<sub>cut</sub></span>
              <span class="param-value">
                <input type="number" class="param-num" v-model.number="tcutVal"
                       min="0.001" :max="physics.elossVal.value.tmax" step="0.01">
                <span class="u">MeV</span>
              </span>
            </div>
            <input type="range" class="param-slider" v-model.number="tcutVal"
                   min="0.001" :max="physics.elossVal.value.tmax" step="0.01">
            <div style="font-size:11px; color:var(--ink-3); margin-top:2px;">
              &lt; T<sub>max</sub> = {{ trunc(physics.elossVal.value.tmax, 3) }} MeV
            </div>
          </div>
        </div>
      </div>
      <table class="data">
        <thead><tr><th>Property</th><th>Symbol</th><th class="num">Value</th><th>Unit</th></tr></thead>
        <tbody>
          <tr class="is-live" :class="{ live: flashing.mpv }"><td>Most probable energy loss</td><td>$(dE/dx)_\text{MPV}$</td><td class="num">{{ trunc(physics.mpvVal.value) }}</td><td class="units">MeV/cm</td></tr>
          <tr class="is-live" :class="{ live: flashing.eloss }"><td>Mean energy loss</td><td>$(dE/dx)_\text{mean}$</td><td class="num">{{ trunc(physics.elossVal.value.eloss) }}</td><td class="units">MeV/cm</td></tr>
        </tbody>
      </table>
    </section>

    <!-- ── 5. Scintillation ──────────────────────────────────────── -->
    <section class="doc-section" id="scint">
      <h2 class="sec-title"><span class="num">05</span>Scintillation</h2>
      <p class="sec-sub">Scintillation yield, optical constants, and photon transport. <a href="scint.html">Full details →</a></p>

      <table class="data">
        <thead><tr><th>Property</th><th>Symbol</th><th class="num">Value</th><th>Unit</th></tr></thead>
        <tbody>
          <tr><td>W-value for scintillation</td><td>$W_s$</td><td class="num">19.5</td><td class="units">eV/photon</td></tr>
          <tr><td>W-value for Čerenkov</td><td>$W_c$</td><td class="num">2700</td><td class="units">eV/photon</td></tr>
          <tr><td>Emission peak</td><td>$\lambda_\text{scint}$</td><td class="num">128(10)</td><td class="units">nm</td></tr>
          <tr><td>Decay times</td><td>$\tau_\text{scint}$</td><td class="num">6(2), 1590(100)</td><td class="units">ns</td></tr>
          <tr><td>Dielectric constant</td><td>$\varepsilon$</td><td class="num">1.505(3)</td><td class="units">—</td></tr>
          <tr><td>Index of refraction (128 nm)</td><td>$n$</td><td class="num">1.38</td><td class="units">—</td></tr>
          <tr><td>Rayleigh scattering length (128 nm)</td><td>$L_R$</td><td class="num">95</td><td class="units">cm</td></tr>
          <tr><td>Absorption length (&gt;128 nm)</td><td>$L_A$</td><td class="num">&gt;200</td><td class="units">cm</td></tr>
        </tbody>
      </table>

      <h3 class="subhead" id="scint-optical">Optical properties (live)</h3>
      <div class="inline-params">
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Wavelength</span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.wl" min="100" max="500" step="1"><span class="u">nm</span></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.wl" min="100" max="500" step="1">
            <div class="param-marks">
              <span style="left:0%">100</span>
              <span style="left:25%">200</span>
              <span style="left:50%">300</span>
              <span style="left:100%">500</span>
            </div>
          </div>
        </div>
      </div>
      <table class="data">
        <thead><tr><th>Property</th><th>Symbol</th><th class="num">Value</th><th>Unit</th></tr></thead>
        <tbody>
          <tr class="is-live" :class="{ live: flashing.iof }">
            <td>Index of refraction <button class="plot-btn" @click="togglePlot('iof_l')">{{ openPlots.iof_l ? 'Hide' : 'Plot' }}</button></td>
            <td>$n$</td>
            <td class="num">{{ trunc(physics.iof.value) }}</td>
            <td class="units">—</td>
          </tr>
          <tr v-if="openPlots.iof_l"><td colspan="4"><PlotChart :options="iofChartOptions" /></td></tr>
          <tr class="is-live" :class="{ live: flashing.vg }">
            <td>Photon group velocity <button class="plot-btn" @click="togglePlot('vg')">{{ openPlots.vg ? 'Hide' : 'Plot' }}</button></td>
            <td>$v_g$</td>
            <td class="num">{{ trunc(physics.vg.value) }}</td>
            <td class="units">c</td>
          </tr>
          <tr v-if="openPlots.vg"><td colspan="4"><PlotChart :options="vgChartOptions" /></td></tr>
        </tbody>
      </table>
    </section>

    <!-- ── 6. Electronics & TPC ──────────────────────────────────── -->
    <section class="doc-section" id="elec-tpc">
      <h2 class="sec-title"><span class="num">06</span>Electronics &amp; TPC</h2>
      <p class="sec-sub">Wire geometry, capacitance, and multi-plane drift. <a href="electronics.html">Full details →</a></p>

      <div class="inline-params">
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Temperature <em>T</em></span>
              <span class="param-value">
                <input type="number" class="param-num" v-model.number="params.T"
                       min="75" max="100" step="0.1"
                       @change="params.T = clamp(params.T, 75, 100)">
                <span class="u">K</span>
              </span>
            </div>
            <input type="range" class="param-slider" v-model.number="params.T"
                   min="75" max="100" step="0.1">
            <div class="param-marks">
              <span style="left:0%">75</span>
              <span style="left:35.2%">83.8</span>
              <span style="left:49.2%">87.3</span>
              <span style="left:100%">100</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Drift field <em>E</em></span>
              <span class="param-value">
                <input type="number" class="param-num" v-model.number="params.E"
                       min="50" max="1500" step="10"
                       @change="params.E = clamp(params.E, 50, 1500)">
                <span class="u">V/cm</span>
              </span>
            </div>
            <input type="range" class="param-slider" v-model.number="params.E"
                   min="50" max="1500" step="10">
            <div class="param-marks">
              <span style="left:0%">50</span>
              <span style="left:31%">500</span>
              <span style="left:65.5%">1k</span>
              <span style="left:100%">1.5k</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Wire spacing</span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.wire_spacing" min="0.5" max="10" step="0.1"><span class="u">mm</span></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.wire_spacing" min="0.5" max="10" step="0.1">
            <div class="param-marks">
              <span style="left:0%">0.5</span>
              <span style="left:47.4%">5</span>
              <span style="left:100%">10</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Wire diameter</span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.wire_diameter" min="0.01" max="1" step="0.01"><span class="u">mm</span></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.wire_diameter" min="0.01" max="1" step="0.01">
            <div class="param-marks">
              <span style="left:0%">0.01</span>
              <span style="left:49.5%">0.5</span>
              <span style="left:100%">1</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Plane gap</span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.plane_gap" min="0.5" max="20" step="0.1"><span class="u">mm</span></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.plane_gap" min="0.5" max="20" step="0.1">
            <div class="param-marks">
              <span style="left:0%">0.5</span>
              <span style="left:23.1%">5</span>
              <span style="left:48.7%">10</span>
              <span style="left:100%">20</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name">Drift dist.</span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.drift_dist_max" min="0.1" max="10" step="0.1"><span class="u">m</span></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.drift_dist_max" min="0.1" max="10" step="0.1">
            <div class="param-marks">
              <span style="left:0%">0.1</span>
              <span style="left:19.2%">2</span>
              <span style="left:49.5%">5</span>
              <span style="left:100%">10</span>
            </div>
          </div>
        </div>
        <div class="param-block">
          <div class="param-row">
            <div class="param-label">
              <span class="name"><em>E</em>-field ratio</span>
              <span class="param-value"><input type="number" class="param-num" v-model.number="config.E_ratio" min="1" max="3" step="0.1"></span>
            </div>
            <input type="range" class="param-slider" v-model.number="config.E_ratio" min="1" max="3" step="0.1">
            <div class="param-marks">
              <span style="left:0%">1</span>
              <span style="left:50%">2</span>
              <span style="left:100%">3</span>
            </div>
          </div>
        </div>
      </div>

      <table class="data">
        <thead><tr><th>Property</th><th class="num">Value</th><th>Unit</th></tr></thead>
        <tbody>
          <tr class="is-live" :class="{ live: flashing.elec }"><td>Min E-field ratio for 100% transparency</td><td class="num">{{ trunc(physics.E_ratio_trans.value) }}</td><td class="units">—</td></tr>
          <tr class="is-live" :class="{ live: flashing.elec }"><td>Wire capacitance in air</td><td class="num">{{ trunc(physics.wire_c_air.value) }}</td><td class="units">pF/m</td></tr>
          <tr class="is-live" :class="{ live: flashing.elec }"><td>Wire capacitance in LAr</td><td class="num">{{ trunc(physics.wire_c_lar.value) }}</td><td class="units">pF/m</td></tr>
          <tr class="is-live" :class="{ live: flashing.elec }"><td>Cathode high voltage</td><td class="num">{{ trunc(physics.cathod_hv.value) }}</td><td class="units">kV</td></tr>
          <tr class="is-live" :class="{ live: flashing.vd }"><td>E fields — bulk, plane 2, plane 3</td><td class="num">{{ trunc(physics.E.value, 3) }}, {{ trunc(physics.E2.value, 3) }}, {{ trunc(physics.E3.value, 3) }}</td><td class="units">kV/cm</td></tr>
          <tr class="is-live" :class="{ live: flashing.vd }"><td>Drift velocities — bulk, plane 2, plane 3</td><td class="num">{{ trunc(physics.v.value) }}, {{ trunc(physics.v2.value) }}, {{ trunc(physics.v3.value) }}</td><td class="units">cm/μs</td></tr>
          <tr class="is-live" :class="{ live: flashing.vd }"><td>Drift times — bulk, plane 2, plane 3</td><td class="num">{{ trunc(physics.driftTime.value) }}, {{ trunc(physics.driftTime2.value) }}, {{ trunc(physics.driftTime3.value) }}</td><td class="units">μs</td></tr>
        </tbody>
      </table>
    </section>

    <!-- ── 7. References ─────────────────────────────────────────── -->
    <section class="doc-section" id="refs">
      <h2 class="sec-title"><span class="num">07</span>References</h2>
      <ol class="references">
        <li><span class="ttl">Y. Li et al., "Measurement of Longitudinal Electron Diffusion in Liquid Argon"</span>, NIMA 816, 160 (2016). [<a href="http://arxiv.org/abs/1508.07059">arXiv:1508.07059</a>]</li>
        <li><span class="ttl">C. Thorn, "Catalogue of Liquid Argon properties"</span>, MicroBooNE doc:412. [<a href="https://www.phy.bnl.gov/~chao/docs/Properties-of-LAr-v9a-thorn.pdf">mirror</a>]</li>
        <li><span class="ttl">B. Baller, "LArTPC calculator"</span>, MicroBooNE doc:3564. [<a href="https://www.phy.bnl.gov/~chao/docs/LArTPC-Calculator-v4-baller.xlsx">mirror</a>]</li>
      </ol>
    </section>
  </TheShell>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import TheShell from '../components/TheShell.vue'
import PlotChart from '../components/PlotChart.vue'
import { useParams } from '../composables/useParams.js'
import { usePhysics, config } from '../composables/usePhysics.js'
import { trunc, iofLiquid, groupVelocity } from '../composables/lar.js'
import { useKaTeX } from '../composables/useKaTeX.js'

const params  = useParams().state
const physics = usePhysics()
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

const tcutVal = computed({
  get: () => config.particle_tcut ?? physics.elossVal.value.tmax,
  set: v  => { config.particle_tcut = v },
})

// ── Live-row flash ────────────────────────────────────────────────
const flashing = reactive({})

function flash(keys, ms = 400) {
  keys.forEach(k => {
    flashing[k] = true
    setTimeout(() => { flashing[k] = false }, ms)
  })
}

watch(() => params.T,       () => flash(['rho', 'mu', 'vd', 'epsl', 'DL', 'DT', 'kaO2', 'Rc', 'atten', 'RL', 'mpv', 'eloss', 'iof', 'vg']))
watch(() => params.E,       () => flash(['mu', 'vd', 'epsl', 'DL', 'DT', 'kaO2', 'Rc', 'atten', 'RL', 'mpv', 'eloss', 'elec']))
watch(() => params.P,       () => flash(['rho']))
watch(() => params.O2_log,  () => flash(['atten']))
watch(() => config.dEdx,    () => flash(['Rc', 'RL']))
watch(() => config.tlife,   () => flash(['atten']))
watch(() => config.drift_dist_max, () => flash(['atten', 'elec']))
watch(() => config.wl,      () => flash(['iof', 'vg']))
watch([() => config.wire_spacing, () => config.wire_diameter,
       () => config.plane_gap,    () => config.E_ratio],
      () => flash(['elec']))
watch([() => config.particle_mom, () => config.particle_mass,
       () => config.pass_thickness, () => config.particle_tcut],
      () => flash(['mpv', 'eloss']))
watch(() => physics.elossVal.value.tmax, () => { config.particle_tcut = null })

// ── Plot toggle ───────────────────────────────────────────────────
const openPlots = reactive({})
function togglePlot(id) { openPlots[id] = !openPlots[id] }

const iofChartOptions = computed(() => {
  const rho = physics.rho.value
  const data = []
  for (let wl = 120; wl < 300; wl++) data.push([wl * 1.0, iofLiquid(wl, rho)])
  return {
    xAxis: { title: { text: 'Wavelength [nm]' } },
    yAxis: { title: { text: 'Index of refraction' } },
    series: [{ name: 'n(λ)', data, color: 'var(--accent)' }],
  }
})

const vgChartOptions = computed(() => {
  const rho = physics.rho.value
  const data = []
  for (let wl = 120; wl < 300; wl++) data.push([wl * 1.0, groupVelocity(wl, rho)])
  return {
    xAxis: { title: { text: 'Wavelength [nm]' } },
    yAxis: { title: { text: 'Group velocity (c)' } },
    series: [{ name: 'v_g(λ)', data, color: 'var(--accent)' }],
  }
})

// ── Export CSV ────────────────────────────────────────────────────
function cellText(el) {
  if (!el) return ''
  const c = el.cloneNode(true)
  c.querySelectorAll('button').forEach(b => b.remove())
  c.querySelectorAll('.katex-mathml').forEach(m => m.remove())
  // strip zero-width / invisible chars KaTeX injects for spacing
  return c.textContent.trim()
    .replace(/[­​-‏⁠﻿]/g, '')
    .replace(/\s+/g, ' ')
}
function csvEsc(v) {
  const s = String(v)
  return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}
function exportCSV() {
  const lines = []
  const ts = new Date().toISOString().slice(0, 16).replace('T', ' ')
  lines.push(`# LAr Properties — ${ts}`)
  lines.push(`# T = ${params.T.toFixed(2)} K,  E = ${params.E} V/cm`)
  lines.push(`# dE/dx = ${config.dEdx} MeV/cm,  e- lifetime = ${config.tlife} ms,  drift dist = ${config.drift_dist_max} m`)
  lines.push(`# particle momentum = ${config.particle_mom} GeV/c,  mass = ${config.particle_mass} MeV,  thickness = ${config.pass_thickness} cm,  Tcut = ${config.particle_tcut ?? 'tmax'} MeV`)
  lines.push(`# optical wavelength = ${config.wl} nm`)
  lines.push(`# wire spacing = ${config.wire_spacing} mm,  wire diameter = ${config.wire_diameter} mm,  plane gap = ${config.plane_gap} mm,  E-field ratio = ${config.E_ratio}`)
  lines.push('')
  document.querySelectorAll('section.doc-section').forEach(section => {
    const secTitle = cellText(section.querySelector('h2.sec-title'))
    section.querySelectorAll('table.data').forEach(table => {
      let label = secTitle
      let node = table.previousElementSibling
      while (node) {
        if (node.matches('h3.subhead')) { label = cellText(node); break }
        node = node.previousElementSibling
      }
      const headers = [...table.querySelectorAll('thead th')].map(th => cellText(th))
      if (!headers.length) return
      const rows = [...table.querySelectorAll('tbody tr')]
        .filter(tr => !tr.querySelector('td[colspan]'))
        .map(tr => [...tr.querySelectorAll('td')].map(td => cellText(td)))
        .filter(r => r.length)
      if (!rows.length) return
      lines.push(`# ${label}`)
      lines.push(headers.map(csvEsc).join(','))
      rows.forEach(r => lines.push(r.map(csvEsc).join(',')))
      lines.push('')
    })
  })
  const filename = `lar-properties-T${params.T.toFixed(1)}K-E${params.E}Vcm.csv`
  const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

// ── KaTeX ─────────────────────────────────────────────────────────
useKaTeX()
</script>

<style scoped>
.legend-bar {
  display: flex; align-items: center; justify-content: space-between;
  margin: 14px 0 0; gap: 16px;
}
.live-legend {
  display: flex; align-items: center; gap: 8px;
  margin: 0;
  font-size: 12px; color: var(--ink-3);
}
.export-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 11px; border: 1px solid var(--rule); border-radius: 4px;
  background: var(--paper); color: var(--ink-2);
  font-family: var(--mono); font-size: 11px; cursor: pointer; white-space: nowrap;
  flex-shrink: 0;
}
.export-btn:hover { background: var(--paper-2); color: var(--ink); }
.live-swatch {
  width: 30px; height: 15px; border-radius: 2px; flex-shrink: 0;
  background: color-mix(in oklab, var(--accent) 7%, var(--paper));
  border: 1px solid var(--rule);
}

.plot-btn {
  font-size: 11px; font-family: var(--mono); padding: 2px 7px;
  border: 1px solid var(--rule); border-radius: 3px;
  background: var(--paper); color: var(--accent); cursor: pointer;
  margin-left: 6px; vertical-align: baseline;
}
.plot-btn:hover { background: var(--accent-soft); }

.inline-params {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 4px 16px;
  margin: 12px 0 16px;
}
.inline-params .param-block {
  margin-bottom: 0;
  border-left: 2px solid var(--rule);
  padding-left: 12px;
}
</style>
