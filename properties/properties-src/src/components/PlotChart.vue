<template>
  <div ref="el" class="chart-wrap"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Highcharts from 'highcharts'
// ESM modules self-register with the Highcharts singleton on import (no function call needed)
import 'highcharts/esm/modules/exporting.js'
import 'highcharts/esm/modules/offline-exporting.js'

const props = defineProps({ options: { type: Object, required: true } })
const el = ref(null)
let chart = null

const defaults = {
  credits: { enabled: false },
  title: { text: '' },
  chart: { animation: false, zoomType: 'xy', style: { fontFamily: 'inherit', fontSize: '12px' } },
  legend: {
    layout: 'vertical', floating: true,
    align: 'right', verticalAlign: 'top',
    x: -10, y: 20,
    itemMarginTop: 4, itemMarginBottom: 4,
    backgroundColor: '#ffffff',
    borderColor: '#000000', borderWidth: 1,
    shadow: false,
    itemStyle: { fontSize: '13px', fontWeight: 'normal' },
  },
  exporting: {
    fallbackToExportServer: false,
    buttons: { contextButton: { menuItems: ['printChart', 'separator', 'downloadPNG', 'downloadSVG'] } },
  },
  plotOptions: { series: { animation: false } },
  xAxis: { gridLineWidth: 1, startOnTick: true, tickPosition: 'inside', title: { style: { fontSize: '18px' } } },
  yAxis: { gridLineWidth: 1, startOnTick: true, tickPosition: 'inside', title: { style: { fontSize: '18px' } } },
}

function render() {
  if (!el.value) return
  if (chart) { chart.destroy(); chart = null }
  chart = Highcharts.chart(el.value, Highcharts.merge(defaults, props.options))
}

onMounted(render)
watch(() => props.options, render)
onUnmounted(() => { if (chart) { chart.destroy(); chart = null } })
</script>

<style scoped>
.chart-wrap { height: 420px; margin: 4px 0 12px; }
</style>
