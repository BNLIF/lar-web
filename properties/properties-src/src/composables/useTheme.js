import { reactive, watchEffect } from 'vue'

const state = reactive({
  theme: localStorage.getItem('lar-theme') || 'light'
})

watchEffect(() => {
  document.documentElement.dataset.theme = state.theme === 'dark' ? 'dark' : ''
  localStorage.setItem('lar-theme', state.theme)
})

export function useTheme() {
  function toggle() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark'
  }
  return { state, toggle }
}
