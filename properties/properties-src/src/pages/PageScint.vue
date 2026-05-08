<template>
  <TheShell>
    <div class="doc-head">
      <p class="doc-eyebrow">BNL Detector R&amp;D · Liquid Argon</p>
      <h1 class="doc-title">Scintillation</h1>
      <p class="doc-lede">Scintillation yield, emission spectrum, and time constants of liquid argon.</p>
      <div class="doc-meta"><span><a href="index.html#scint">← Back to overview</a></span></div>
    </div>

    <!-- ── 1. Scintillation ──────────────────────────────────────── -->
    <section class="doc-section" id="scint-intro">
      <h2 class="sec-title"><span class="num">01</span>Scintillation in LAr</h2>

      <div class="content-cols">
        <div>
          <h3 class="subhead" id="yield">Light yield and emission</h3>
          <p class="body">
            The light yield in LAr is a few 10,000 photons per MeV, dependent on electric field, particle type, and purity. The emission wavelength peaks at 128 nm (vacuum ultraviolet). The scintillation light has two characteristic time constants: a fast component of ~6 ns and a slow component of ~1500 ns. Argon is highly transparent to its own scintillation light.
          </p>
        </div>
        <div class="img-col">
          <img :src="'./img/light-emission.png'" alt="LAr light emission spectrum" style="width:100%;">
        </div>
      </div>
    </section>

    <!-- ── 2. References ─────────────────────────────────────────── -->
    <section class="doc-section" id="refs">
      <h2 class="sec-title"><span class="num">02</span>References</h2>
      <p class="body" style="color: var(--ink-3); font-style: italic;">References to be added.</p>
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
