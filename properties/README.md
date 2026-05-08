# LAr Properties Website

Reference tables and live calculators for the thermophysical, electrical, and optical properties of liquid argon, used in LArTPC detectors.

## Stack

| Layer | Tool |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build | Vite 5 — multi-page, one entry per HTML file |
| Math | KaTeX (server-side render via `useKaTeX` composable) |
| Plots | Highcharts |
| Styling | Plain CSS with design tokens (`tokens.css`) |

No Bootstrap. No jQuery. No MathJax.

## Development

```bash
cd properties/properties-src
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to properties/ (the parent directory)
```

The build writes compiled assets into `properties/assets/` and the HTML entry points directly into `properties/`. The source lives entirely inside `properties-src/`.

## Project layout

```
properties/
├── index.html          ← built output (do not edit directly)
├── basic.html
├── energy.html
├── electronics.html
├── pass.html
├── scint.html
├── spacecharge.html
├── trans.html
├── assets/             ← compiled JS/CSS (do not edit directly)
├── img/                ← static images referenced by pages
├── data/               ← JSON data files for Highcharts plots
└── properties-src/     ← all source code lives here
    ├── vite.config.js
    ├── *.html          ← HTML entry points (one per page)
    └── src/
        ├── pages/          ← one .vue + one .js per page
        ├── components/     ← TheShell, TheHeader, PlotChart, …
        ├── composables/    ← useParams, usePhysics, useKaTeX, useTheme, lar.js
        └── styles/
            └── tokens.css  ← all design tokens and shared CSS
```

## Pages

| File | URL | Content |
|---|---|---|
| `PageIndex.vue` | `index.html` | Overview — all properties with live calculators |
| `PageBasic.vue` | `basic.html` | Phase diagram, vapor pressure, density |
| `PagePass.vue` | `pass.html` | Stopping power, Landau MPV, recombination |
| `PageEnergy.vue` | `energy.html` | Quanta creation, Q+L calorimetry |
| `PageTrans.vue` | `trans.html` | Drift velocity, diffusion, electron lifetime |
| `PageScint.vue` | `scint.html` | Scintillation yield, optical constants |
| `PageSpacecharge.vue` | `spacecharge.html` | Ion drift, space charge effects |
| `PageElectronics.vue` | `electronics.html` | ENC, wire planes, field responses |

## Adding a new page

1. **Create the Vue component** `src/pages/PageFoo.vue` — wrap content in `<TheShell>`.

2. **Create the JS entry** `src/pages/foo.js`:
   ```js
   import { createApp } from 'vue'
   import '../styles/tokens.css'
   import PageFoo from './PageFoo.vue'
   createApp(PageFoo).mount('#app')
   ```

3. **Create the HTML entry** `properties-src/foo.html` — copy any existing `.html` and update the `<title>` and the `<script src>`.

4. **Register in `vite.config.js`** under `rollupOptions.input`:
   ```js
   foo: resolve(__dirname, 'foo.html'),
   ```

5. **Add to the nav** in `src/components/TheHeader.vue` `links` array:
   ```js
   { href: 'foo.html', label: 'Foo' },
   ```

## Adding content

### Static table

```html
<table class="data">
  <thead><tr><th>Property</th><th>Symbol</th><th class="num">Value</th><th>Unit</th></tr></thead>
  <tbody>
    <tr><td>Boiling point</td><td>$T_\text{NBP}$</td><td class="num">87.3</td><td class="units">K</td></tr>
  </tbody>
</table>
```

Use `class="num"` on cells that contain numbers (right-aligns them). Wrap wide tables in `<div class="table-scroll">` for horizontal scroll on mobile.

### Math (KaTeX)

Call `useKaTeX()` in `<script setup>` — it post-processes the rendered HTML and replaces all `$…$` and `\[…\]` with KaTeX output.

```vue
<script setup>
import { useKaTeX } from '../composables/useKaTeX.js'
useKaTeX()
</script>
```

Inline: `$\rho = 1.396\,\text{g/mL}$`

Block (use `.eq` wrapper for consistent centering):
```html
<div class="eq">
  <span class="expr">\[ E = mc^2 \]</span>
</div>
```

### Highcharts plot

Load data from `data/myplot.json` and pass options to `<PlotChart>`:

```vue
<PlotChart :options="chartOptions" />
```

```js
import PlotChart from '../components/PlotChart.vue'

const chartOptions = computed(() => ({
  xAxis: { title: { text: 'x label' } },
  yAxis: { title: { text: 'y label' } },
  series: [{ name: 'curve', data: [[x1, y1], [x2, y2], …] }],
}))
```

### Live (reactive) rows

Bind computed values from `usePhysics()` and mark the row with `class="is-live"` for the accent tint:

```vue
<tr class="is-live" :class="{ live: flashing.mu }">
  <td>Electron mobility</td>
  <td class="num">{{ trunc(physics.mu.value) }}</td>
  <td class="units">cm² V⁻¹ s⁻¹</td>
</tr>
```

The `live` class triggers a brief flash animation when the value changes (wired via `watch` + `flash()` in `PageIndex.vue`).

## Tunable parameters

`useParams()` returns a singleton reactive `state` shared across all components on a page. Persisted to `localStorage` (T and E are intentionally excluded — they reset to defaults on each visit).

`config` (exported from `usePhysics.js`) holds detector and particle parameters (wire geometry, particle momentum, electron lifetime, etc.) that are tunable via inline sliders on the overview page.

## Theming

`useTheme()` toggles a `data-theme="dark"` attribute on `<html>`. All colors are CSS custom properties in `tokens.css` — adding a new color means adding one token, not changing every component.
