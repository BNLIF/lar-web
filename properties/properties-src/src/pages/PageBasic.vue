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
      <div class="table-scroll">
        <table class="data">
          <thead>
            <tr>
              <th class="num">T (K)</th>
              <th class="num">P (MPa)</th>
              <th class="num">Dens (kg/m³)</th>
              <th class="num">Vol (m³/kg)</th>
              <th class="num">U (kJ/kg)</th>
              <th class="num">H (kJ/kg)</th>
              <th class="num">S (J/g·K)</th>
              <th class="num">C<sub>v</sub> (J/g·K)</th>
              <th class="num">C<sub>p</sub> (J/g·K)</th>
              <th class="num">w (m/s)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="num">84</td><td class="num">0.0704485</td><td class="num">1415.52</td><td class="num">0.000706455</td><td class="num">−121.264</td><td class="num">−121.233</td><td class="num">1.33213</td><td class="num">0.548776</td><td class="num">1.11575</td><td class="num">860.974</td></tr>
            <tr><td class="num">85</td><td class="num">0.0788957</td><td class="num">1409.47</td><td class="num">0.000709485</td><td class="num">−120.154</td><td class="num">−120.107</td><td class="num">1.34526</td><td class="num">0.544784</td><td class="num">1.11578</td><td class="num">854.18</td></tr>
            <tr><td class="num">86</td><td class="num">0.0881068</td><td class="num">1403.39</td><td class="num">0.000712559</td><td class="num">−119.044</td><td class="num">−118.983</td><td class="num">1.35826</td><td class="num">0.540937</td><td class="num">1.11618</td><td class="num">847.341</td></tr>
            <tr><td class="num">87</td><td class="num">0.0981266</td><td class="num">1397.27</td><td class="num">0.000715683</td><td class="num">−117.932</td><td class="num">−117.858</td><td class="num">1.37111</td><td class="num">0.537224</td><td class="num">1.11693</td><td class="num">840.456</td></tr>
            <tr><td class="num">88</td><td class="num">0.109001</td><td class="num">1391.11</td><td class="num">0.000718848</td><td class="num">−116.82</td><td class="num">−116.734</td><td class="num">1.38383</td><td class="num">0.533634</td><td class="num">1.11801</td><td class="num">833.527</td></tr>
            <tr><td class="num">89</td><td class="num">0.120776</td><td class="num">1384.92</td><td class="num">0.000722066</td><td class="num">−115.706</td><td class="num">−115.609</td><td class="num">1.39642</td><td class="num">0.530157</td><td class="num">1.1194</td><td class="num">826.555</td></tr>
            <tr><td class="num">90</td><td class="num">0.133499</td><td class="num">1378.68</td><td class="num">0.000725333</td><td class="num">−114.59</td><td class="num">−114.482</td><td class="num">1.40889</td><td class="num">0.526786</td><td class="num">1.1211</td><td class="num">819.539</td></tr>
            <tr><td class="num">91</td><td class="num">0.147218</td><td class="num">1372.39</td><td class="num">0.000728653</td><td class="num">−113.473</td><td class="num">−113.354</td><td class="num">1.42124</td><td class="num">0.523512</td><td class="num">1.12309</td><td class="num">812.48</td></tr>
            <tr><td class="num">92</td><td class="num">0.161983</td><td class="num">1366.07</td><td class="num">0.000732027</td><td class="num">−112.354</td><td class="num">−112.223</td><td class="num">1.43347</td><td class="num">0.52033</td><td class="num">1.12538</td><td class="num">805.377</td></tr>
            <tr><td class="num">93</td><td class="num">0.177842</td><td class="num">1359.7</td><td class="num">0.000735457</td><td class="num">−111.233</td><td class="num">−111.091</td><td class="num">1.4456</td><td class="num">0.517233</td><td class="num">1.12794</td><td class="num">798.23</td></tr>
            <tr><td class="num">94</td><td class="num">0.194845</td><td class="num">1353.28</td><td class="num">0.000738944</td><td class="num">−110.109</td><td class="num">−109.955</td><td class="num">1.45763</td><td class="num">0.514217</td><td class="num">1.13079</td><td class="num">791.039</td></tr>
            <tr><td class="num">95</td><td class="num">0.213044</td><td class="num">1346.82</td><td class="num">0.000742492</td><td class="num">−108.983</td><td class="num">−108.816</td><td class="num">1.46955</td><td class="num">0.511278</td><td class="num">1.13391</td><td class="num">783.803</td></tr>
            <tr><td class="num">96</td><td class="num">0.232489</td><td class="num">1340.3</td><td class="num">0.000746101</td><td class="num">−107.855</td><td class="num">−107.673</td><td class="num">1.48138</td><td class="num">0.508411</td><td class="num">1.13731</td><td class="num">776.522</td></tr>
            <tr><td class="num">97</td><td class="num">0.253233</td><td class="num">1333.74</td><td class="num">0.000749774</td><td class="num">−106.723</td><td class="num">−106.527</td><td class="num">1.49311</td><td class="num">0.505613</td><td class="num">1.14098</td><td class="num">769.195</td></tr>
            <tr><td class="num">98</td><td class="num">0.275326</td><td class="num">1327.12</td><td class="num">0.000753513</td><td class="num">−105.589</td><td class="num">−105.376</td><td class="num">1.50476</td><td class="num">0.502881</td><td class="num">1.14494</td><td class="num">761.821</td></tr>
            <tr><td class="num">99</td><td class="num">0.298823</td><td class="num">1320.44</td><td class="num">0.000757322</td><td class="num">−104.451</td><td class="num">−104.221</td><td class="num">1.51632</td><td class="num">0.500213</td><td class="num">1.14919</td><td class="num">754.399</td></tr>
            <tr><td class="num">100</td><td class="num">0.323775</td><td class="num">1313.71</td><td class="num">0.000761202</td><td class="num">−103.31</td><td class="num">−103.061</td><td class="num">1.5278</td><td class="num">0.497607</td><td class="num">1.15372</td><td class="num">746.927</td></tr>
          </tbody>
        </table>
      </div>
      <p class="sec-sub" style="margin-top:4px;">Source: NIST WebBook <sup class="refmark"><a href="#refs">[1]</a></sup></p>
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
.table-scroll { overflow-x: auto; }
@media (max-width: 960px) { .content-cols { grid-template-columns: 1fr; } }
</style>
