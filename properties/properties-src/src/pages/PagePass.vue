<template>
  <TheShell>
    <div class="doc-head">
      <p class="doc-eyebrow">BNL Detector R&amp;D · Liquid Argon</p>
      <h1 class="doc-title">Particle Passage through LAr</h1>
      <p class="doc-lede">Ionization, energy loss, Fano factor, and recombination of charged particles in liquid argon.</p>
      <div class="doc-meta"><span><a href="index.html#particle-pass">← Back to overview</a></span></div>
    </div>

    <!-- ── 1. Stopping Power ──────────────────────────────────────── -->
    <section class="doc-section" id="stopping-power">
      <h2 class="sec-title"><span class="num">01</span>Stopping Power</h2>

      <div class="content-cols">
        <div>
          <h3 class="subhead" id="bethe">Mean energy loss (Bethe formula)</h3>
          <p class="body">
            When a charged particle traverses liquid argon, it takes about 23.6 eV of energy on average to ionize an electron. For a minimum ionizing particle (heavy ionizing particle) the mean energy loss is about 2.1 (25) MeV/cm, leading to about 100 (10) nm average separation between adjacent ions.
          </p>
          <p class="body">
            The mean rate of energy loss by moderately relativistic charged heavy particles is well described by the <a href="https://en.wikipedia.org/wiki/Bethe_formula">Bethe formula</a>. Restricting energy transfers to $T \le T_\text{cut} \le T_\text{max}$:
          </p>
          <div class="eq">
            <span class="expr">$-\!\left\langle\dfrac{dE}{dx}\right\rangle = Kz^2\dfrac{Z}{A}\dfrac{1}{\beta^2}\!\left[\dfrac{1}{2}\ln\dfrac{2m_ec^2\beta^2\gamma^2 T_\text{cut}}{I^2} - \dfrac{\beta^2}{2}\!\left(1+\dfrac{T_\text{cut}}{T_\text{max}}\right) - \dfrac{\delta(\beta\gamma)}{2}\right]$</span>
          </div>
          <p class="body">
            Details of the parameters can be seen in <a href="http://pdg.lbl.gov/2016/reviews/rpp2016-rev-passage-particles-matter.pdf">PDG</a>. Note that the mean $dE/dx$ has no dependency on the thickness of the absorbers. Calculations regarding the LAr are shown in the central plot on the right side (from Milind Diwan).
          </p>

          <h3 class="subhead" id="mpv">Most probable energy loss (Landau MPV)</h3>
          <p class="body">
            Fluctuations in energy loss are described by the highly skewed Landau–Vavilov distribution. The most probable energy loss is:
          </p>
          <div class="eq">
            <span class="expr">$\Delta_p = \xi\!\left[\ln\dfrac{2m_ec^2\beta^2\gamma^2}{I} + \ln\dfrac{\xi}{I} + j - \beta^2 - \delta(\beta\gamma)\right]$</span>
          </div>
          <p class="body">
            where $\xi = (K/2)\langle Z/A\rangle(x/\beta^2)$ MeV for a detector with thickness $x$ in g&nbsp;cm$^{-2}$. Details can be seen in Ref. [1], especially the density effect $\delta$ which was not included in Landau's or Vavilov's work. Unlike the mean, the most probable energy loss depends on absorber thickness. <strong>Useful numbers</strong>: LAr density 1.38/1.40 g/cm$^3$ at 89/87 K; minimum ionizing muon (~260 MeV KE) has mean energy loss 2.1 MeV/cm; 5 GeV $\mu$ in 1 (0.03) cm LAr gives MPV of 1.8 (1.5) MeV/cm.
          </p>

          <h3 class="subhead" id="dedx-plots">$dE/dx$ plots</h3>
          <table class="data">
            <tbody>
              <tr>
                <td>$dE/dx$ vs. Kinetic Energy (proton, kaon, pion, muon) <button class="plot-btn" @click="togglePlot('dedx-ke')">{{ openPlots['dedx-ke'] ? 'Hide' : 'Plot' }}</button></td>
              </tr>
              <tr v-if="openPlots['dedx-ke']">
                <td><PlotChart v-if="series['dedx-ke']" :options="chartOptions('dedx-ke')" /></td>
              </tr>
              <tr>
                <td>$dE/dx$ vs. Residual Range (proton, kaon, pion, muon) <button class="plot-btn" @click="togglePlot('dedx-residual-range')">{{ openPlots['dedx-residual-range'] ? 'Hide' : 'Plot' }}</button></td>
              </tr>
              <tr v-if="openPlots['dedx-residual-range']">
                <td><PlotChart v-if="series['dedx-residual-range']" :options="chartOptions('dedx-residual-range')" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="img-col">
          <img :src="'./img/Landau.png'" alt="Landau distribution" style="width:100%; margin-bottom:12px;">
          <img :src="'./img/MPV-mean.png'" alt="MPV vs mean energy loss" style="width:95%; margin-bottom:12px;">
          <img :src="'./img/MPVvsThick.png'" alt="MPV vs thickness" style="width:100%;">
        </div>
      </div>
    </section>

    <!-- ── 2. Fano Factor ────────────────────────────────────────── -->
    <section class="doc-section" id="fano">
      <h2 class="sec-title"><span class="num">02</span>Fano Factor</h2>

      <h3 class="subhead" id="fano-derivation">Derivation</h3>
      <p class="body">
        When total energy $E_0$ of an ionizing particle is absorbed, the number of ion pairs is $N_i = E_0/W$, where $W$ is the average energy to form an ion pair. The r.m.s. fluctuation of ion pairs is $\sqrt{FN_i}$, where $F$ is the Fano factor [2].
      </p>
      <p class="body">
        Considering excitation (requiring $W_e$) and ionization (requiring $W_i$):
      </p>
      <div class="eq">
        <span class="expr">$E_0 = N_i \cdot W = N_i \cdot W_i + N_e \cdot W_e$</span>
      </div>
      <p class="body">
        Since $W_e \ll W_i$, every collision most likely causes excitation while ionization must combine with excitation to dissipate the total energy. With $\sigma_e = \sqrt{N_e}$:
      </p>
      <div class="eq">
        <span class="expr">$\sigma_i \cdot W_i = \sigma_e \cdot W_e = \sqrt{N_e}\cdot W_e$</span>
      </div>
      <div class="eq">
        <span class="expr">$\sigma_i = \sqrt{N_i}\cdot\sqrt{\dfrac{W_e}{W_i}\!\left(\dfrac{W}{W_i}-1\right)}$</span>
      </div>
      <p class="body">
        In practice three contributions are considered: ionization, excitation, and nuclear scattering (the last is negligible). The ultimate number of ionization electrons also depends on recombination — which also feeds scintillation photons.
      </p>
    </section>

    <!-- ── 3. Recombination ──────────────────────────────────────── -->
    <section class="doc-section" id="recombination">
      <h2 class="sec-title"><span class="num">03</span>Recombination</h2>

      <h3 class="subhead" id="recomb-models">Models</h3>
      <p class="body">
        The recombination factor $R_c$ describes the efficiency in converting $dE/dx$ into $dQ/dx$ (charge available at the sense wires before attenuation). An ionized electron has ~5 eV energy at ~0.5 nm from the ion. After ~2 ns and 10,000 collisions it reaches thermal energy (~0.01 eV) with average separation ~2.5 μm [3,4].
      </p>
      <p class="body"><strong>Birks model:</strong></p>
      <div class="eq">
        <span class="expr">$R_c = \dfrac{dQ/dx}{dE/dx} = \dfrac{A_{3t}}{1 + k_{3t}/\varepsilon \times dE/dx}$</span>
      </div>
      <p class="body">where $A_{3t} = 0.8$, $k_{3t} = 0.0486\ (\text{g/MeV cm}^2)(\text{kV/cm})$, and $\varepsilon = E\rho$.</p>
      <p class="body"><strong>Modified Box model:</strong></p>
      <div class="eq">
        <span class="expr">$R_c = \dfrac{dQ/dx}{dE/dx} = \dfrac{\ln(A + B/\varepsilon \times dE/dx)}{B/\varepsilon \times dE/dx}$</span>
      </div>
      <p class="body">where $A = 0.930$, $B = 0.212\ (\text{g/MeV cm}^2)(\text{kV/cm})$, and $\varepsilon = E\rho$.</p>

      <h3 class="subhead" id="recomb-plot">Recombination vs. $dE/dx$</h3>
      <table class="data">
        <tbody>
          <tr>
            <td>Birks model and Modified Box model vs. $dE/dx$ <button class="plot-btn" @click="togglePlot('rc-dedx')">{{ openPlots['rc-dedx'] ? 'Hide' : 'Plot' }}</button></td>
          </tr>
          <tr v-if="openPlots['rc-dedx']">
            <td><PlotChart v-if="series['rc-dedx']" :options="chartOptions('rc-dedx')" /></td>
          </tr>
        </tbody>
      </table>

      <p class="body">
        Three microscopic theories describe recombination: Germinate, Bulk, and Columnar. Columnar theory predicts angular dependence of recombination with respect to drift direction; this has been studied in ArgoNeuT [5], showing hints of angular dependence but much smaller than predicted (see Ref. [5] Fig. 9).
      </p>
    </section>

    <!-- ── 4. References ─────────────────────────────────────────── -->
    <section class="doc-section" id="refs">
      <h2 class="sec-title"><span class="num">04</span>References</h2>
      <ol class="references">
        <li><span class="ttl">H. Bichsel, "The Density Effect for the Ionization Loss in Various Materials"</span>, <a href="https://doi.org/10.1103/PhysRev.88.851">Rev. Mod. Phys. 60, 663 (1988)</a></li>
        <li><span class="ttl">T. Doke, A. Hitachi et al., "Estimation of fano factors in liquid argon, krypton, xenon and xenon-doped liquid argon"</span>, <a href="https://doi.org/10.1016/0029-554X(76)90292-5">Nuclear Instruments and Methods, Vol. 134, Issue 2 (1976)</a></li>
        <li><span class="ttl">M. Jaskolski and M. Wojcik, "Electron Recombination in Ionized Liquid Argon"</span>, <a href="http://pubs.acs.org/doi/abs/10.1021/jp201149w">J. Phys. Chem. A, 115 (17), 4317–4325 (2011)</a></li>
        <li><span class="ttl">U. Sowada, J.M. Warman, M.P. de Haas, "Hot-electron thermalization in solid and liquid argon, krypton, and xenon"</span>, <a href="http://journals.aps.org/prb/abstract/10.1103/PhysRevB.25.3434">Phys. Rev. B 25, 3434(R)</a></li>
        <li><span class="ttl">R. Acciarri et al. (ArgoNeuT), "A study of electron recombination using highly ionizing particles in the ArgoNeuT Liquid Argon TPC"</span>, <a href="http://iopscience.iop.org/article/10.1088/1748-0221/8/08/P08005/meta">JINST 8 P08005 (2013)</a></li>
      </ol>
    </section>
  </TheShell>
</template>

<script setup>
import { reactive } from 'vue'
import TheShell from '../components/TheShell.vue'
import PlotChart from '../components/PlotChart.vue'
import { useKaTeX } from '../composables/useKaTeX.js'

useKaTeX()

const openPlots = reactive({})
const series    = reactive({})

const CHART_CONFIG = {
  'dedx-ke': {
    xAxis: { title: { text: 'Kinetic Energy [GeV]' }, type: 'logarithmic', min: 0.05, max: 10 },
    yAxis: { title: { text: 'dE/dx [MeV/cm]' }, min: 2, max: 4.5 },
  },
  'dedx-residual-range': {
    xAxis: { title: { text: 'Residual Range [cm]' }, min: 0, max: 100 },
    yAxis: { title: { text: 'dE/dx [MeV/cm]' }, min: 2, max: 10 },
  },
  'rc-dedx': {
    xAxis: { title: { text: 'dE/dx [MeV/cm]' }, min: 0.1, max: 30 },
    yAxis: { title: { text: '(dQ/dx) / (dE/dx) @ 500 V/cm' }, min: 0.2, max: 0.9 },
  },
}

function chartOptions(id) {
  return { ...CHART_CONFIG[id], series: series[id] }
}

async function fetchSeries(id) {
  if (series[id]) return
  try {
    const res = await fetch(`./data/${id}.json`)
    series[id] = await res.json()
  } catch (e) {
    console.warn('Could not load chart data:', id, e)
  }
}

function togglePlot(id) {
  openPlots[id] = !openPlots[id]
  if (openPlots[id]) fetchSeries(id)
}
</script>

<style scoped>
.content-cols { display: grid; grid-template-columns: 1fr 400px; gap: 32px; align-items: start; margin: 8px 0; }
.img-col { padding-top: 28px; }
.plot-btn {
  font-size: 11px; font-family: var(--mono); padding: 2px 7px;
  border: 1px solid var(--rule); border-radius: 3px;
  background: var(--paper); color: var(--accent); cursor: pointer;
  margin-left: 6px; vertical-align: baseline;
}
.plot-btn:hover { background: var(--accent-soft); }
@media (max-width: 960px) { .content-cols { grid-template-columns: 1fr; } }
</style>
