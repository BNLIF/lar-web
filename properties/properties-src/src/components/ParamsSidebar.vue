<template>
  <aside class="params">
    <h6>Tunable parameters</h6>

    <!-- Temperature -->
    <div class="param-block">
      <div class="param-row">
        <div class="param-label">
          <span class="name">Temperature <em>T</em></span>
          <span class="param-value">
            <input type="number" class="param-num" v-model.number="state.T"
                   min="75" max="100" step="0.1"
                   @change="state.T = clamp(state.T, 75, 100)">
            <span class="u">K</span>
          </span>
        </div>
        <input type="range" class="param-slider" v-model.number="state.T"
               min="75" max="100" step="0.1">
        <div class="param-marks">
          <span style="left:0%">75</span>
          <span style="left:35.2%">83.8</span>
          <span style="left:49.2%">87.3</span>
          <span style="left:100%">100</span>
        </div>
      </div>
    </div>

    <!-- Drift field -->
    <div class="param-block">
      <div class="param-row">
        <div class="param-label">
          <span class="name">Drift field <em>E</em></span>
          <span class="param-value">
            <input type="number" class="param-num" v-model.number="state.E"
                   min="50" max="1500" step="10"
                   @change="state.E = clamp(state.E, 50, 1500)">
            <span class="u">V/cm</span>
          </span>
        </div>
        <input type="range" class="param-slider" v-model.number="state.E"
               min="50" max="1500" step="10">
        <div class="param-marks">
          <span style="left:0%">50</span>
          <span style="left:31%">500</span>
          <span style="left:65.5%">1k</span>
          <span style="left:100%">1.5k</span>
        </div>
      </div>
    </div>

  </aside>
</template>

<script setup>
import { useParams } from '../composables/useParams.js'

const { state } = useParams()

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
</script>
