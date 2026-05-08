<template>
  <TheShell>
    <div class="doc-head">
      <p class="doc-eyebrow">{{ eyebrow }}</p>
      <h1 class="doc-title">{{ title }}</h1>
      <p class="doc-lede">{{ lede }}</p>
    </div>

    <section class="doc-section" id="section-one">
      <h2 class="sec-title"><span class="num">01</span>Section One</h2>
      <p class="sec-sub">Placeholder — full content coming soon.</p>
      <h3 class="subhead" id="section-one-a">Subsection A</h3>
      <p class="body">Content will be ported from the original page in issue #8.</p>
    </section>

    <section class="doc-section" id="section-two">
      <h2 class="sec-title"><span class="num">02</span>Section Two</h2>
      <p class="sec-sub">Placeholder — full content coming soon.</p>
      <h3 class="subhead" id="section-two-a">Subsection A</h3>
      <p class="body">Content will be ported from the original page in issue #8.</p>
    </section>
  </TheShell>
</template>

<script setup>
import TheShell from './TheShell.vue'
defineProps({ title: String, eyebrow: String, lede: String })
</script>
