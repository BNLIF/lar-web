<template>
  <TheShell>
    <div class="doc-head">
      <p class="doc-eyebrow">BNL Detector R&amp;D · Liquid Argon</p>
      <h1 class="doc-title">Electron Transportation</h1>
      <p class="doc-lede">Mobility, drift velocity, diffusion, and electron attachment in liquid argon.</p>
      <div class="doc-meta"><span><a href="index.html#e-trans">← Back to overview</a></span></div>
    </div>

    <!-- ── 1. Mobility ────────────────────────────────────────────── -->
    <section class="doc-section" id="mobility">
      <h2 class="sec-title"><span class="num">01</span>Electron Mobility</h2>

      <div class="content-cols">
        <div>
          <h3 class="subhead" id="walkowiak">Walkowiak fit</h3>
          <p class="body">
            The electron mobility data used in the global fit are from Refs. [29, 45–58] in Ref. [1]. The reference LAr temperature is 89 K; data from other references are scaled with the $T^{-3/2}$ temperature dependence. The fitting function is a rational polynomial:
          </p>
          <div class="eq">
            <span class="expr">$\mu = \dfrac{a_0 + a_1 E + a_2 E^{3/2} + a_3 E^{5/2}}{1 + (a_1/a_0)E + a_4 E^2 + a_5 E^3}\left(\dfrac{T}{T_0}\right)^{\!-3/2}$</span>
          </div>
          <p class="body">
            where $E$ is the electric field in kV/cm, $T$ is the LAr temperature, and $a_0 = 551.6\ \text{cm}^2/\text{V/s}$ is the mobility at zero field and $T_0 = 89\ \text{K}$. Best-fit parameters:
          </p>
          <div class="eq">
            <span class="expr">$a_0 = 551.6,\quad a_1 = 7158.3,\quad a_2 = 4440.43,\quad a_3 = 4.29,\quad a_4 = 43.63,\quad a_5 = 0.2053$</span>
          </div>
          <p class="body">
            Note: $a_1$ is adjusted down by a factor of 0.9 from Ref. [1] to match two recent precise measurements: MicroBooNE (1.101 mm/μs at 273 V/cm and 89 K [2]) and ProtoDUNE-SP (1.560 mm/μs at 486.7 V/cm and 87.7 K [3]).
          </p>
        </div>
        <div class="img-col">
          <img :src="'./img/lar_mob_data.gif'" alt="Electron mobility data and fit" style="width:100%;">
        </div>
      </div>
    </section>

    <!-- ── 2. Drift Velocity ──────────────────────────────────────── -->
    <section class="doc-section" id="drift-velocity">
      <h2 class="sec-title"><span class="num">02</span>Electron Drift Velocity</h2>
      <p class="body">Electron drift velocity is the product of electron mobility and the electric field:</p>
      <div class="eq">
        <span class="expr">$v = \mu E$</span>
      </div>
    </section>

    <!-- ── 3. Longitudinal Energy ─────────────────────────────────── -->
    <section class="doc-section" id="eps-l">
      <h2 class="sec-title"><span class="num">03</span>Effective Longitudinal Electron Energy</h2>

      <div class="content-cols">
        <div>
          <h3 class="subhead" id="epsl-fit">Parameterization</h3>
          <p class="body">
            The effective electron energy is parameterized using both the data in Ref. [1] and ICARUS low-field data. The form is again a rational polynomial:
          </p>
          <div class="eq">
            <span class="expr">$\epsilon_L = \dfrac{b_0 + b_1 E + b_2 E^2}{1 + (b_1/b_0)E + b_3 E^2}\left(\dfrac{T}{T_1}\right)$</span>
          </div>
          <p class="body">
            where $E$ is in kV/cm, $T$ is in K, and $b_0 = 0.0075\ \text{eV}$ is the electron energy at $T_1 = 87\ \text{K}$ under zero field. The temperature dependence is linear in $T$. Best-fit parameters:
          </p>
          <div class="eq">
            <span class="expr">$b_0 = 0.0075,\quad b_1 = 742.9,\quad b_2 = 3269.6,\quad b_3 = 31678.2$</span>
          </div>
        </div>
        <div class="img-col">
          <img :src="'./img/lar_el_data.gif'" alt="Longitudinal electron energy data" style="width:100%;">
        </div>
      </div>
    </section>

    <!-- ── 4. Diffusion ───────────────────────────────────────────── -->
    <section class="doc-section" id="diffusion">
      <h2 class="sec-title"><span class="num">04</span>Diffusion Coefficients</h2>

      <h3 class="subhead" id="diff-long">Longitudinal diffusion</h3>
      <p class="body">
        The longitudinal diffusion coefficient $D_L$ in the range 0.1–1.5 kV/cm is given by the Einstein relation:
      </p>
      <div class="eq">
        <span class="expr">$D_L = \dfrac{\mu\,\epsilon_L}{e}$</span>
      </div>
      <p class="body">Expanding with the parameterizations above:</p>
      <div class="eq">
        <span class="expr">$D_L = \left(\dfrac{a_0+a_1E+a_2E^{3/2}+a_3E^{5/2}}{1+(a_1/a_0)E+a_4E^2+a_5E^3}\right)\!\left(\dfrac{b_0+b_1E+b_2E^2}{1+(b_1/b_0)E+b_3E^2}\right)\!\left(\dfrac{T}{T_0}\right)^{\!-3/2}\!\left(\dfrac{T}{T_1}\right)$</span>
      </div>

      <h3 class="subhead" id="diff-trans">Transverse diffusion</h3>
      <p class="body">
        The transverse diffusion coefficient $D_T$ is related to $D_L$ by:
      </p>
      <div class="eq">
        <span class="expr">$\dfrac{D_L}{D_T} = 1 + \dfrac{E}{\mu}\dfrac{\partial\mu}{\partial E}$</span>
      </div>
      <p class="body">
        The diffusion length for drift time $t$ is $\sigma = \sqrt{2Dt}$.
      </p>
    </section>

    <!-- ── 5. Electron Attachment ─────────────────────────────────── -->
    <section class="doc-section" id="attachment">
      <h2 class="sec-title"><span class="num">05</span>Electron Attachment</h2>

      <div class="content-cols">
        <div>
          <h3 class="subhead" id="attach-lifetime">Electron lifetime</h3>
          <p class="body">
            Electron attachment to impurities (such as water or oxygen) attenuates the ionization signal, since ions drift ~five orders of magnitude more slowly than electrons. The mean electron lifetime is:
          </p>
          <div class="eq">
            <span class="expr">$\tau_A = \dfrac{1}{k_A\, n}$</span>
          </div>
          <p class="body">
            where $k_A$ is the attachment rate constant and $n$ is the impurity concentration. Below ~100 V/cm, electrons are in thermal equilibrium with the liquid and $k_A$ is field-independent.
          </p>

          <h3 class="subhead" id="attach-fit">Rate constant parameterization</h3>
          <p class="body">
            From Ref. [2], the attachment rate is fit with a constrained rational polynomial:
          </p>
          <div class="eq">
            <span class="expr">$k_A = 10^p \dfrac{a_1/b_1 + a_1E + a_2E^2 + a_3E^3 + a_4E^4}{1 + b_1E + b_2E^2 + b_3E^3 + b_4E^4}$</span>
          </div>
          <p class="body">
            where $E$ is in kV/cm and $k_A$ is in s$^{-1}$M$^{-1}$. Best-fit parameters for common impurities are in Table 2 of Ref. [2].
          </p>
        </div>
        <div class="img-col">
          <img :src="'./img/e-attachment.png'" alt="Electron attachment rate constants" style="width:100%;">
          <p style="font-size:11px; color:var(--ink-3); margin-top:6px;">Electron attachment rate constant vs. electric field for six impurities in LAr at 90 K (from Ref. [2]).</p>
        </div>
      </div>
    </section>

    <!-- ── 6. References ─────────────────────────────────────────── -->
    <section class="doc-section" id="refs">
      <h2 class="sec-title"><span class="num">06</span>References</h2>
      <ol class="references">
        <li><span class="ttl">Y. Li et al., "Measurement of Longitudinal Electron Diffusion in Liquid Argon"</span>, <a href="http://www.sciencedirect.com/science/article/pii/S0168900216001443">NIMA 816, 160 (2016)</a>. [<a href="http://arxiv.org/abs/1508.07059">arXiv:1508.07059</a>]</li>
        <li><span class="ttl">Y. Li et al., "Parameterization of Electron Attachment Rate Constants for Common Impurities in LArTPC Detectors"</span>, <a href="http://arxiv.org/abs/2205.06888">arXiv:2205.06888</a></li>
        <li><span class="ttl">MicroBooNE Collaboration, "Measurement of the electron drift velocity and attenuation in liquid argon using MicroBooNE's time projection chamber"</span>, <a href="https://arxiv.org/abs/2101.05076">arXiv:2101.05076</a></li>
        <li><span class="ttl">A. Paudel (ProtoDUNE-SP), "Drift Velocity Measurement"</span>, <a href="https://indico.fnal.gov/event/23110/contributions/191646/">New Perspectives 2020</a></li>
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
