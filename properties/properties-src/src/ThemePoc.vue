<template>
  <div style="padding: 32px">
    <p class="doc-eyebrow">Liquid Argon Properties</p>
    <h1 class="doc-title">Design System POC</h1>
    <p class="doc-lede">Verifying tokens, fonts, and theme toggle.</p>

    <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap">
      <div v-for="tok in swatches" :key="tok.name"
           :style="{ background: `var(${tok.var})`, border: '1px solid var(--rule)', borderRadius: '4px', padding: '10px 14px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink)' }">
        {{ tok.name }}
      </div>
    </div>

    <div style="margin-top: 32px; display: flex; gap: 12px">
      <button class="param-btn primary" @click="toggle">
        Toggle theme ({{ state.theme }})
      </button>
    </div>

    <div class="eq" style="margin-top: 32px">
      <span class="expr">ρ = ρ<sub>c</sub> · exp(a·t<sup>1/3</sup> + b·t<sup>2/3</sup> + …)</span>
      <span class="tag">Eq. 1</span>
    </div>

    <table class="data" style="margin-top: 24px">
      <caption>Sample data table</caption>
      <thead>
        <tr><th>Property</th><th>Symbol</th><th class="num">Value</th><th>Units</th></tr>
      </thead>
      <tbody>
        <tr><td>Boiling point</td><td>T<sub>b</sub></td><td class="num">87.30</td><td class="units">K</td></tr>
        <tr class="live"><td>Density (live)</td><td>ρ</td><td class="num">1.396</td><td class="units">g/cm³</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useTheme } from './composables/useTheme.js'

const { state, toggle } = useTheme()

const swatches = [
  { name: '--paper',       var: '--paper' },
  { name: '--paper-2',     var: '--paper-2' },
  { name: '--paper-3',     var: '--paper-3' },
  { name: '--accent',      var: '--accent' },
  { name: '--accent-soft', var: '--accent-soft' },
]
</script>
