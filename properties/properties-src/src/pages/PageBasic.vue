<template>
  <TheShell>
    <div class="doc-head">
      <p class="doc-eyebrow">BNL Detector R&amp;D · Liquid Argon</p>
      <h1 class="doc-title">Basic Properties</h1>
      <p class="doc-lede">Phase diagram, vapor pressure, density, and thermophysical properties of liquid argon.</p>
      <div class="doc-meta"><span><a href="index.html#basic-prop">← Back to overview</a></span></div>
    </div>

    <!-- ── 1. Phase Diagram ──────────────────────────────────────── -->
    <section class="doc-section" id="phase-diagram">
      <h2 class="sec-title"><span class="num">01</span>Phase Diagram &amp; Vapor Pressure</h2>

      <div class="content-cols">
        <div>
          <h3 class="subhead" id="boiling-line">Boiling Line ($T_t \le T \le T_c$)</h3>
          <p class="body">
          \[
          p_b = p_c \times e^{\frac{T_c}{T}\left(a_1\phi + a_2\phi^{1.5} + a_3\phi^2 + a_4\phi^{4.5}\right)}
          \]
          with
          \[
          \phi = 1 - T/T_c, \quad T_c = 150.687\,\text{K}, \quad p_c = 4.863\,\text{MPa}
          \]
          \[
          a_1 = -5.9409785, \quad a_2 = 1.3553888, \quad a_3 = -0.46497607, \quad a_4 = -1.5399043
          \]
          </p>

          <h3 class="subhead" id="melting-line">Melting Line</h3>
          <p class="body">
          \[
          p_m = p_t\left(1 + a_1\left[\left(\frac{T}{T_t}\right)^{1.05}-1\right] + a_2\left[\left(\frac{T}{T_t}\right)^{1.275}-1\right]\right)
          \]
          with
          \[
          T_t = 83.8058\,\text{K}, \quad p_t = 0.068891\,\text{MPa}, \quad a_1 = -7476.2665, \quad a_2 = 9959.0613
          \]
          </p>

          <h3 class="subhead" id="sublimation-line">Sublimation Line</h3>
          <p class="body">
          \[
          P_{\text{sub}} = P_t \times e^{\frac{T_t}{T}\left[a_1\left(1-\frac{T}{T_t}\right) + a_2\left(1-\frac{T}{T_t}\right)^{2.7}\right]}
          \]
          with
          \[
          T_t = 83.8058\,\text{K}, \quad p_t = 0.068891\,\text{MPa}, \quad a_1 = -11.391604, \quad a_2 = -0.39513431
          \]
          </p>

          <h3 class="subhead" id="density">LAr Density ($T_t \le T \le T_c$)</h3>
          <p class="body">
          \[
          \rho_{\text{liquid}} = \rho_c \times e^{A\cdot t^{0.334} + B\cdot t^{2/3} + C\cdot t^{7/3} + D\cdot t^4}
          \]
          with
          \[
          t = 1 - T/T_c, \quad T_c = 150.687\,\text{K}, \quad \rho_c = 0.5356\,\text{g/cm}^3
          \]
          \[
          A = 1.5004262, \quad B = -0.31381290, \quad C = 0.086461622, \quad D = -0.041477525
          \]
          </p>

          <h3 class="subhead" id="enthalpy">Enthalpy of Vaporization</h3>
          <p class="body">
          Fit to data from Ref. [1]. Enthalpy of vaporization $\Delta H$ (kJ/mol) as a function of temperature $T$:
          \[
          \Delta H = \frac{A + B\cdot T}{1 + C\cdot T}, \qquad A = 7.98304, \quad B = -0.0481275, \quad C = -0.0047259
          \]
          </p>
        </div>
        <div class="img-col">
          <img :src="'./img/lar_phase.gif'" alt="LAr phase diagram" style="width:100%; margin-bottom:12px;">
          <img :src="'./img/lar_vapor_pressure.png'" alt="LAr vapor pressure" style="width:100%;">
        </div>
      </div>
    </section>

    <!-- ── 2. Saturation Properties ──────────────────────────────── -->
    <section class="doc-section" id="saturation">
      <h2 class="sec-title"><span class="num">02</span>Properties on Saturation Line</h2>
      <p class="sec-sub">Thermophysical properties of LAr along the liquid–vapor saturation line.</p>
      <img :src="'./img/LArProperties_1.gif'" alt="LAr saturation properties" style="width:100%; max-width:640px; display:block; margin:16px 0;">
    </section>

    <!-- ── 3. References ─────────────────────────────────────────── -->
    <section class="doc-section" id="refs">
      <h2 class="sec-title"><span class="num">03</span>References</h2>
      <ol class="references">
        <li><span class="ttl">"Thermophysical Properties of Fluid Systems"</span> by E.W. Lemmon, M.O. McLinden and D.G. Friend in NIST Chemistry WebBook, NIST Standard Reference Database Number 69, Eds. P.J. Linstrom and W.G. Mallard, NIST, Gaithersburg MD, 20899. <a href="http://webbook.nist.gov/chemistry/fluid/">http://webbook.nist.gov/chemistry/fluid/</a></li>
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
