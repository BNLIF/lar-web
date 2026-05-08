<template>
  <TheShell>
    <div class="doc-head">
      <p class="doc-eyebrow">BNL Detector R&amp;D · Liquid Argon</p>
      <h1 class="doc-title">Energy Deposition in Liquid Argon</h1>
      <p class="doc-lede">Quanta creation, charge–light recombination, and the calorimetric picture for ionization and scintillation signals in LArTPC detectors.</p>
      <div class="doc-meta"><span><a href="index.html">← Back to overview</a></span></div>
    </div>

    <!-- ── 1. Quanta Creation ──────────────────────────────────────── -->
    <section class="doc-section" id="quanta">
      <h2 class="sec-title"><span class="num">01</span>Quanta Creation</h2>

      <div class="content-cols">
        <div>
          <p class="body">
            When a charged particle traverses liquid argon it deposits energy through two primary channels: excited argon atoms (excitons, Ar*) and electron–ion pairs (e⁻–Ar⁺). The ratio of excitons to ion pairs is measured to be
          </p>
          <div class="eq">
            <span class="expr">$\alpha = \dfrac{N_{ex}}{N_i} = 0.21$</span>
          </div>
          <p class="body">
            The mean energy to create one electron–ion pair is $W_{ion} = 23.6\,\text{eV}$. Treating each exciton and each ion pair as one <em>quantum</em> of deposited energy, the energy per quantum is
          </p>
          <div class="eq">
            <span class="expr">$W_q = \dfrac{W_{ion}}{1+\alpha} = \beta \cdot W_{ion} = 19.5\,\text{eV}$</span>
          </div>
          <p class="body">
            where $\beta = 1/(1+\alpha) = 0.83$. The initial number of quanta produced by a deposited energy $E_{dep}$ is
          </p>
          <div class="eq">
            <span class="expr">$N_i = \beta \dfrac{E_{dep}}{W_q},\quad N_{ex} = (1-\beta)\dfrac{E_{dep}}{W_q},\quad N_q = N_i + N_{ex} = \dfrac{E_{dep}}{W_q}$</span>
          </div>
          <p class="body">
            For 1 MeV of deposited energy, $N_q \approx 51{,}000$: roughly 42,000 ionization electrons and 9,000 excitons.
          </p>
        </div>
        <div class="img-col">
          <div class="symbol-table-wrap">
            <p class="tbl-caption">Key symbols</p>
            <table class="data sym-tbl">
              <thead><tr><th>Symbol</th><th>Value</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>$\alpha$</td><td class="num">0.21</td><td>$N_{ex}/N_i$</td></tr>
                <tr><td>$\beta$</td><td class="num">0.83</td><td>$1/(1+\alpha)$</td></tr>
                <tr><td>$W_q$</td><td class="num">19.5 eV</td><td>Energy per quantum</td></tr>
                <tr><td>$W_{ion}$</td><td class="num">23.6 eV</td><td>Energy per ion pair</td></tr>
                <tr><td>$N_i$</td><td>Eq. (4)</td><td>Number of e⁻–Ar⁺ pairs</td></tr>
                <tr><td>$N_{ex}$</td><td>Eq. (4)</td><td>Number of Ar*</td></tr>
                <tr><td>$N_q$</td><td>$N_i + N_{ex}$</td><td>Total quanta</td></tr>
                <tr><td>$R_c$</td><td>Eq. (6)</td><td>Charge recombination factor</td></tr>
                <tr><td>$R_L$</td><td>Eq. (7)</td><td>Light recombination factor</td></tr>
                <tr><td>$N_e$</td><td>$N_i R_c$</td><td>Electrons after recombination</td></tr>
                <tr><td>$N_{ph}$</td><td>$N_q R_L$</td><td>Photons after recombination</td></tr>
                <tr><td>$Q$</td><td>Eq. (8)</td><td>Visible energy in charge</td></tr>
                <tr><td>$L$</td><td>Eq. (8)</td><td>Visible energy in light</td></tr>
                <tr><td>$E_{dep}$</td><td></td><td>Total deposited energy in LAr</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 2. Recombination ───────────────────────────────────────── -->
    <section class="doc-section" id="recombination">
      <h2 class="sec-title"><span class="num">02</span>Charge Recombination</h2>

      <p class="body">
        The ionization electrons and Ar⁺ ions undergo recombination during their passage through the liquid:
      </p>
      <div class="reaction-block">
        <div class="reaction">Ar⁺ + Ar → Ar₂⁺</div>
        <div class="reaction">Ar₂⁺ + e⁻ → Ar** + Ar</div>
        <div class="reaction">Ar** → Ar* + heat</div>
      </div>
      <p class="body">
        The resulting Ar* follows the same de-excitation path as the directly created excitons, ultimately emitting a VUV scintillation photon at 127 nm. This additional light production via recombination is known as <em>recombination luminescence</em>, first observed by Kubota et al. in 1978 [1].
      </p>
      <p class="body">
        A key conservation law governs this process: <strong>the total number of quanta $N_q$ is conserved before and after recombination.</strong> Recombination converts charge quanta into light quanta, but their sum is always $E_{dep}/W_q$. This conservation has been confirmed experimentally over a wide range of linear energy transfers (LET) and electric fields [2].
      </p>

      <h3 class="subhead" id="birks">Recombination Factors (Birks Model)</h3>
      <div class="content-cols">
        <div>
          <p class="body">
            The charge recombination factor $R_c$, defined as the fraction of ionization electrons surviving recombination, is well described by the Birks model [3]:
          </p>
          <div class="eq">
            <span class="expr">$R_c = \dfrac{N_e}{N_i} = \dfrac{0.8}{1 + \dfrac{0.0486}{\mathcal{E}\rho} \cdot \dfrac{dE}{dx}}$</span>
          </div>
          <p class="body">
            where $\mathcal{E}$ is the drift electric field in kV/cm, $\rho$ is the LAr density in g/cm³, and $dE/dx$ is the energy loss per unit length in MeV/cm.
            For a minimum ionizing particle (MIP) with $dE/dx \approx 2.1\,\text{MeV/cm}$ at a typical 0.5 kV/cm field, $R_c \approx 0.7$.
          </p>
          <p class="body">
            The light recombination factor, defined as the fraction of the ideal photon yield $N_q$ that actually emerges as scintillation, follows directly from charge conservation:
          </p>
          <div class="eq">
            <span class="expr">$R_L = \dfrac{N_{ph}}{N_q} = 1 - \beta R_c$</span>
          </div>
          <p class="body">
            At zero electric field, $R_c = 0$ (complete recombination) and $R_L = 1$ — all deposited energy appears as light. At high fields, $R_c \to 1$ (electrons fully escape) and $R_L \to 1 - \beta = 0.17$ — residual light comes only from the exciton channel. The two factors are complementary: more charge means less light, and vice versa.
          </p>
        </div>
        <div class="img-col">
          <img :src="'./img/recomb_factors.png'" alt="R_c and R_L vs dE/dx"
               style="width:100%;"
               @error="(e) => e.target.style.display='none'">
          <p class="img-caption">$R_c$ and $R_L$ as functions of $dE/dx$ (normalized to MIP) at 0.5 kV/cm, from Eqs. (6) and (7). Charge and light vary inversely; heavily ionizing particles produce more light and less charge.</p>
        </div>
      </div>
    </section>

    <!-- ── 3. Visible Energy & Conservation ─────────────────────────── -->
    <section class="doc-section" id="visible-energy">
      <h2 class="sec-title"><span class="num">03</span>Visible Energy &amp; Quanta Conservation</h2>

      <p class="body">
        The charge and light signals in a LArTPC can both be expressed as <em>visible energy</em> by choosing $W_q$ as the energy unit per quantum:
      </p>
      <div class="eq">
        <span class="expr">$Q = W_q \cdot N_e,\qquad L = W_q \cdot N_{ph}$</span>
      </div>
      <p class="body">
        With this choice, quanta conservation directly gives the most important result:
      </p>
      <div class="eq highlight-eq">
        <span class="expr">$Q + L = W_q(N_e + N_{ph}) = W_q(N_i + N_{ex}) = E_{dep}$</span>
      </div>
      <p class="body">
        <strong>The sum $Q + L$ equals the deposited energy regardless of the recombination factor.</strong> This is the foundation of self-compensating light calorimetry in LArTPC: by measuring both charge and light, no recombination correction is needed.
      </p>

      <h3 class="subhead" id="edep-estimators">Deposited Energy Estimators</h3>
      <p class="body">
        There are three ways to estimate $E_{dep}$ from the measured signals:
      </p>
      <table class="data">
        <thead>
          <tr><th>Estimator</th><th>Formula</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Charge only ($Q$)</td>
            <td class="num">$E_{dep} = Q\,/\,(\beta R_c)$</td>
            <td>Requires knowledge of $R_c$; sensitive to $dE/dx$ fluctuations</td>
          </tr>
          <tr>
            <td>Light only ($L$)</td>
            <td class="num">$E_{dep} = L\,/\,(1 - \beta R_c)$</td>
            <td>Requires $R_c$ and photon collection efficiency $\epsilon$</td>
          </tr>
          <tr>
            <td>Combined ($Q + L$)</td>
            <td class="num">$E_{dep} = Q + L$</td>
            <td>Exact — no recombination correction; requires calibrated $\epsilon$</td>
          </tr>
        </tbody>
      </table>
      <p class="body">
        The charge-only estimator is the standard approach in current LArTPC neutrino experiments, but it suffers from event-by-event smearing due to fluctuations in $R_c$ along the particle trajectory. The $Q + L$ estimator removes this smearing entirely, at the cost of requiring uniform and well-calibrated light collection.
      </p>
    </section>

    <!-- ── 4. Missing Energy ──────────────────────────────────────── -->
    <section class="doc-section" id="missing-energy">
      <h2 class="sec-title"><span class="num">04</span>Missing Energy in LArTPC</h2>

      <p class="body">
        Even with perfect quanta conservation, some fraction of the incident particle's energy does not appear in $E_{dep}$ and is therefore "missing" from the calorimeter. The main sources are:
      </p>
      <dl class="missing-list">
        <dt>Inactive material</dt>
        <dd>In homogeneous LArTPC detectors there is no absorber material, so this contribution is negligible for fully contained events. Partially contained events and structural materials can contribute.</dd>

        <dt>Detection threshold</dt>
        <dd>Charge calorimetry has a noise floor set by electronics (below ~400 $e^-$ in cold ASIC detectors), corresponding to $E_{dep} \lesssim 100\,\text{keV}$ for a MIP. Light calorimetry thresholds are set per-photon-detector and are effectively zero for GeV events.</dd>

        <dt>Nuclear breakup</dt>
        <dd>Particles can inelastically scatter on Ar nuclei, breaking them up and producing secondary hadrons. Energy spent overcoming nuclear binding energy becomes invisible. The nuclear breakup fraction can be 30–50% for neutrons, which neither ionize directly nor produce light.</dd>

        <dt>Particle decay and escape</dt>
        <dd>Charged pions and muons carry away energy via decays and daughter neutrinos. Negatively charged pions and muons captured by Ar nuclei produce missing energy when the nucleus de-excites. Neutrons released after thermalization capture on Ar, releasing several γ rays (~6 MeV total) that can be detected as a delayed signal.</dd>
      </dl>
      <p class="body">
        Estimating missing energy typically requires full detector Monte Carlo simulation. For GeV neutrino interactions, nuclear breakup is the dominant term and is the primary factor limiting hadronic energy resolution in LArTPC calorimeters.
      </p>
    </section>

    <!-- ── 5. References ─────────────────────────────────────────── -->
    <section class="doc-section" id="refs">
      <h2 class="sec-title"><span class="num">05</span>References</h2>
      <ol class="references">
        <li><span class="ttl">S. Kubota et al., "Recombination luminescence in liquid argon and in liquid xenon"</span>, Phys. Rev. B 17, 2762 (1978).</li>
        <li><span class="ttl">T. Doke et al., "Absolute scintillation yields in liquid argon and xenon for various particles"</span>, Jpn. J. Appl. Phys. 41, 1538 (2002).</li>
        <li><span class="ttl">J.B. Birks, "The Theory and Practice of Scintillation Counting"</span>, Pergamon Press, Oxford, 1964.</li>
        <li><span class="ttl">X. Ning, W. Shi, C. Zhang, C. Riccio, J.H. Jo, "Self-compensating light calorimetry with liquid argon time projection chamber for GeV neutrino physics"</span>, Phys. Rev. D 111, 032007 (2025). <a href="https://doi.org/10.1103/PhysRevD.111.032007">doi:10.1103/PhysRevD.111.032007</a></li>
      </ol>
    </section>
  </TheShell>
</template>

<script setup>
import TheShell from '../components/TheShell.vue'
import { useKaTeX } from '../composables/useKaTeX.js'
useKaTeX()
</script>

<style scoped>
.content-cols { display: grid; grid-template-columns: 1fr 360px; gap: 32px; align-items: start; margin: 8px 0; }
.img-col { padding-top: 8px; }
.img-caption { font-size: 12px; color: var(--ink-3); margin: 8px 0 0; line-height: 1.5; }

.reaction-block {
  margin: 8px 0 16px 24px;
  display: flex; flex-direction: column; gap: 4px;
}
.reaction {
  font-family: var(--mono); font-size: 14px; color: var(--ink-2);
}

.highlight-eq {
  border-left: 3px solid var(--accent);
  padding-left: 16px;
  margin-left: 0;
}

.symbol-table-wrap { font-size: 13px; }
.tbl-caption { font-size: 12px; color: var(--ink-3); margin: 0 0 6px; font-style: italic; }
.sym-tbl td:first-child { font-family: var(--mono); }
.sym-tbl td:nth-child(2) { font-family: var(--mono); white-space: nowrap; }

.missing-list {
  display: grid; grid-template-columns: 180px 1fr; gap: 10px 20px;
  margin: 8px 0 16px;
}
.missing-list dt {
  font-weight: 600; font-size: 14px; color: var(--ink);
  padding-top: 2px;
}
.missing-list dd {
  margin: 0; font-size: 14px; color: var(--ink-2); line-height: 1.6;
}

@media (max-width: 960px) {
  .content-cols { grid-template-columns: 1fr; }
  .missing-list { grid-template-columns: 1fr; gap: 2px 0; }
  .missing-list dt { margin-top: 10px; }
}
</style>
