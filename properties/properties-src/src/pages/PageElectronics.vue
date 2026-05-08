<template>
  <TheShell>
    <div class="doc-head">
      <p class="doc-eyebrow">BNL Detector R&amp;D · Liquid Argon</p>
      <h1 class="doc-title">Electronics &amp; TPC</h1>
      <p class="doc-lede">Cold electronics, equivalent noise charge, and LArTPC wire-plane geometry.</p>
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

    <!-- ── 3. References ─────────────────────────────────────────── -->
    <section class="doc-section" id="refs">
      <h2 class="sec-title"><span class="num">03</span>References</h2>
      <ol class="references">
        <li><span class="ttl">Veljko Radeka et al., "Cold electronics for Giant Liquid Argon Time Projection Chambers"</span>, J. Phys. Conf. Ser., 308:012021, 2011.</li>
        <li><span class="ttl">G. Horton-Smith, "Wire Plane Analytic Calculations"</span>, <a href="http://microboone-docdb.fnal.gov:8080/cgi-bin/RetrieveFile?docid=4708&filename=wire-plane-calcs.pdf&version=1">MicroBooNE doc:4708</a></li>
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
@media (max-width: 960px) { .content-cols { grid-template-columns: 1fr; } }
</style>
