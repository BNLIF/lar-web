import { reactive, watchEffect } from 'vue'

const DEFAULTS = {
  T:        87.30,   // K
  P:        1.013,   // bar
  E:        500,     // V/cm
  O2_log:   2,       // log10(ppt) → 100 ppt
  units:    'si',
  particle: 'mip',
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem('lar-params') || '{}')
    const { T: _T, E: _E, ...rest } = saved
    return { ...DEFAULTS, ...rest }
  } catch {
    return { ...DEFAULTS }
  }
}

const state = reactive(load())

watchEffect(() => {
  const { T, E, ...rest } = state
  localStorage.setItem('lar-params', JSON.stringify(rest))
})

export function useParams() {
  function reset() {
    Object.assign(state, DEFAULTS)
  }
  return { state, reset, DEFAULTS }
}
