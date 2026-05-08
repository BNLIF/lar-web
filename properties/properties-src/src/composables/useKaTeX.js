import { onMounted } from 'vue'
import renderMathInElement from 'katex/contrib/auto-render'

export function useKaTeX() {
  onMounted(() => {
    renderMathInElement(document.querySelector('main'), {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
      ],
      throwOnError: false,
    })
  })
}
