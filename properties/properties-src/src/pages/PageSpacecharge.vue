<template>
  <TheShell>
    <div class="doc-head">
      <p class="doc-eyebrow">BNL Detector R&amp;D · Liquid Argon</p>
      <h1 class="doc-title">Space Charge</h1>
      <p class="doc-lede">Positive ion accumulation, electric field distortion, and its impact on LArTPC reconstruction.</p>
      <div class="doc-meta"><span><a href="index.html#space-charge">← Back to overview</a></span></div>
    </div>

    <!-- ── 1. Space Charge Effect ────────────────────────────────── -->
    <section class="doc-section" id="space-charge-effect">
      <h2 class="sec-title"><span class="num">01</span>Space Charge Effect in LAr</h2>

      <div class="content-cols">
        <div>
          <h3 class="subhead" id="ion-drift">Ion accumulation</h3>
          <p class="body">
            When ionized electrons drift toward the anode plane, positive argon ions drift toward the cathode. The ion drift speed is roughly five orders of magnitude smaller than that of ionized electrons. For a LArTPC operating on the surface, the continuous flux of cosmic muons produces a large accumulation of positive ions inside the drift volume — commonly referred to as <em>space charge</em>. This distorts the electric field lines inside the TPC.
          </p>

          <h3 class="subhead" id="impact">Impact on reconstruction</h3>
          <p class="body">
            Since electron diffusion in LAr is small, ionized electrons essentially travel along field lines. Space charge therefore distorts the reconstructed image from the LArTPC. Because space charge also changes the magnitude of the electric field, it affects energy reconstruction through altered electron–ion recombination. The impact of space charge scales as $L^3$ with drift distance $L$ and as $E^{-1.7}$ with electric field $E$ (the exponent −1.7 rather than −2 reflects increased recombination at low field). A summary of space charge effects is given in Ref. [1].
          </p>
          <p class="body">
            The space charge effect has been clearly observed in the MicroBooNE experiment [2]. Calibration of the space charge effect remains an active area of research.
          </p>
        </div>
        <div class="img-col">
          <img :src="'./img/sc.png'" alt="Space charge field distortion" style="width:100%; margin-bottom:12px;">
          <img :src="'./img/sc-uboone.png'" alt="Space charge in MicroBooNE" style="width:100%;">
        </div>
      </div>
    </section>

    <!-- ── 2. References ─────────────────────────────────────────── -->
    <section class="doc-section" id="refs">
      <h2 class="sec-title"><span class="num">02</span>References</h2>
      <ol class="references">
        <li><span class="ttl">M. Mooney, "The MicroBooNE Experiment and the Impact of Space Charge Effects"</span>, <a href="https://arxiv.org/abs/1511.01563">arXiv:1511.01563</a></li>
        <li><span class="ttl">MicroBooNE Collaboration, "Study of Space Charge Effects in MicroBooNE"</span>, <a href="http://www-microboone.fnal.gov/publications/publicnotes/MICROBOONE-NOTE-1018-PUB.pdf">MICROBOONE-NOTE-1018-PUB</a></li>
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
