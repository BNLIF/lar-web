<template>
  <TheHeader />
  <div class="layout">
    <div class="left-col">
      <ParamsSidebar />
      <TocSidebar />
    </div>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import TheHeader from './TheHeader.vue'
import TocSidebar from './TocSidebar.vue'
import ParamsSidebar from './ParamsSidebar.vue'
</script>
