<template>
  <TheShell>
    <div class="doc-head">
      <p class="doc-eyebrow">BNL Detector R&amp;D · Liquid Argon</p>
      <h1 class="doc-title">Noise, Electronics and Field Responses</h1>
      <p class="doc-lede">Equivalent noise charge for cold ASIC electronics, wire-plane analytic calculations, and field response tools for LArTPC detectors.</p>
      <div class="doc-meta"><span><a href="index.html#elec-tpc">← Back to overview</a></span></div>
    </div>

    <!-- ── 1. Cold Electronics ───────────────────────────────────── -->
    <section class="doc-section" id="electronics">
      <h2 class="sec-title"><span class="num">01</span>Electronics in LAr</h2>

      <div class="content-cols">
        <div>
          <h3 class="subhead" id="cold-asic">Cold ASIC</h3>
          <p class="body">
            The commonly referred BNL "cold electronics" is a custom designed complementary metal-oxide-semiconductor (CMOS) analog front-end cold application-specific integrated circuit (ASIC) operated in the LAr to amplify and shape the induced current from each wire in a LArTPC. Compared to warm electronics, the cold electronics has the advantage of being placed at the wire to minimize the overall capacitance. In addition, the noise level measured in equivalent noise charge is much lower for CMOS technology at low temperature. Due to the lack of amplification of electrons inside LAr, low noise with cold electronics is essential to reliably extract ionization electron signals from both collection and induction wire planes in a single-phase LArTPC. The current development of the cold electronics lies on the cold ADC and cold signal multiplexing. The integration of these capabilities in the cold LAr would minimize the signal penetrations on the 10 kt LArTPC cryostat designed for DUNE.
          </p>

          <h3 class="subhead" id="enc">Equivalent Noise Charge (ENC)</h3>
          <p class="body">
            The level of noise from the entire electronic readout chain is expressed as the Equivalent Noise Charge (ENC), measured in units of number of electrons. The ENC is defined as the number of instantaneously collected electrons required so that their peak ADC count equals the root mean square (RMS) value of the noise. The ENC can be approximated by:
          </p>
          <div class="eq">
            <span class="expr">$\text{ENC}^2 \approx \dfrac{1}{2} A_1 \dfrac{e_n^2 C_{in}^2}{t_p} + A_2 \pi C_{in}^2 A_f + A_3\!\left(q_e I_o + \dfrac{2k_B T}{R_b}\right) t_p$</span>
          </div>
          <p class="body">
            The first two terms represent input transistor noise (white and $1/f$ series). $C_{in}$ is the total capacitance at the ASIC input; $e_n$ is the white series noise spectral density (V/Hz); $\sqrt{A_f/f}$ is the $1/f$ series noise density. The third term is white parallel noise from ASIC bias current $I_o$ (shot noise) and the wire bias resistor $R_b$ (thermal noise). $t_p$ is the peaking time of the anti-aliasing filter.
          </p>
        </div>
        <div class="img-col">
          <img :src="'./img/enc.png'" alt="ENC vs capacitance" style="width:100%; margin-bottom:12px;">
          <img :src="'./img/signal.png'" alt="Signal shaping" style="width:100%;">
        </div>
      </div>
    </section>

    <!-- ── 2. LArTPC ─────────────────────────────────────────────── -->
    <section class="doc-section" id="tpc">
      <h2 class="sec-title"><span class="num">02</span>LArTPC Wire Planes</h2>

      <div class="content-cols">
        <div>
          <h3 class="subhead" id="wire-planes">Wire-plane analytic calculations</h3>
          <p class="body">
            Useful formulas for design of TPCs with multiple parallel wire planes are derived using an extension of conformal representation theory previously applied to single-grid ionization chambers [2]. Expressions are given for the electric potential and field lines around the wires, the fraction of electrons collected by the wire planes, and the relation between wire plane voltages and asymptotic fields between planes. <a href="./img/WirePlanes4.py">Python code</a> for calculating and plotting potentials for the DUNE situation is provided. The result is consistent with that of a Finite Element Model (FEM) calculation.
          </p>
        </div>
        <div class="img-col">
          <img :src="'./img/fieldpy.png'" alt="Wire plane field calculation" style="width:100%;">
        </div>
      </div>
    </section>

    <!-- ── 3. Field Responses ─────────────────────────────────────── -->
    <section class="doc-section" id="field-responses">
      <h2 class="sec-title"><span class="num">03</span>Field Responses</h2>
      <p class="sec-sub">Induced current responses on wire planes from drifting charge, required for LArTPC signal deconvolution.</p>

      <p class="body">
        The field response function describes the induced current signal on a wire (or pixel) as a point charge drifts past it. Accurate field responses are essential input to signal processing and deconvolution in LArTPC reconstruction. Several tools are available for computing them:
      </p>
      <ul class="field-resp-list">
        <li>
          <strong>Garfield simulations</strong> — a curated collection of Garfield field simulations for Wire-Cell based LArTPC detectors.
          <a href="https://github.com/Ningclover/wirecell-field-sim">github.com/Ningclover/wirecell-field-sim</a>
        </li>
        <li>
          <strong>Pochoir</strong> — finite-difference method (FDM) calculator for pixel and strip geometries.
          <a href="https://github.com/brettviren/pochoir">github.com/brettviren/pochoir</a>
        </li>
        <li>
          <strong>Drifires</strong> — Garfield++ finite-element method (FEM) for wire-based LArTPC field responses.
          <a href="https://github.com/brettviren/drifires">github.com/brettviren/drifires</a>
        </li>
      </ul>
      <p class="body">
        An example of computed field responses for the ProtoDUNE-SP detector is available as a
        <a href="https://github.com/LS4GAN/toyzero/blob/master/plots/real-resps-diagnostic.png">diagnostic plot</a>
        showing the full set of per-wire-plane response functions.
      </p>
    </section>

    <!-- ── 4. References ─────────────────────────────────────────── -->
    <section class="doc-section" id="refs">
      <h2 class="sec-title"><span class="num">04</span>References</h2>
      <ol class="references">
        <li><span class="ttl">Veljko Radeka et al., "Cold electronics for Giant Liquid Argon Time Projection Chambers"</span>, J. Phys. Conf. Ser., 308:012021, 2011.</li>
        <li><span class="ttl">G. Horton-Smith, "Wire Plane Analytic Calculations"</span>, <a href="http://microboone-docdb.fnal.gov:8080/cgi-bin/RetrieveFile?docid=4708&filename=wire-plane-calcs.pdf&version=1">MicroBooNE doc:4708</a></li>
        <li><span class="ttl">"WireCell Field Simulations"</span>, <a href="https://github.com/Ningclover/wirecell-field-sim">github.com/Ningclover/wirecell-field-sim</a></li>
        <li><span class="ttl">B. Viren, "Pochoir: FDM field response calculator"</span>, <a href="https://github.com/brettviren/pochoir">github.com/brettviren/pochoir</a></li>
        <li><span class="ttl">B. Viren, "Drifires: Garfield++ FEM field responses"</span>, <a href="https://github.com/brettviren/drifires">github.com/brettviren/drifires</a></li>
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
.content-cols { display: grid; grid-template-columns: 1fr 400px; gap: 32px; align-items: start; margin: 8px 0; }
.img-col { padding-top: 28px; }
.field-resp-list {
  margin: 0 0 16px; padding-left: 20px;
  display: flex; flex-direction: column; gap: 10px;
}
.field-resp-list li { font-size: 14px; color: var(--ink-2); }
.field-resp-list li strong { color: var(--ink); }
.field-resp-list li a { margin-left: 4px; font-family: var(--mono); font-size: 12px; }
@media (max-width: 960px) { .content-cols { grid-template-columns: 1fr; } }
</style>
