<template>
  <aside class="toc">
    <h6>Contents</h6>
    <ol v-if="topLevel.length">
      <li v-for="h2 in topLevel" :key="h2.id">
        <a :href="'#' + h2.id"
           :class="{ active: activeId === h2.id }"
           @click.prevent="scrollTo(h2.id)">
          {{ h2.text }}
        </a>
        <ul v-if="h2.children.length">
          <li v-for="h3 in h2.children" :key="h3.id">
            <a :href="'#' + h3.id"
               :class="{ active: activeId === h3.id }"
               @click.prevent="scrollTo(h3.id)">
              {{ h3.text }}
            </a>
          </li>
        </ul>
      </li>
    </ol>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const activeId = ref('')
const flat = ref([])
let observer = null

const topLevel = computed(() => {
  const result = []
  let current = null
  for (const h of flat.value) {
    if (h.level === 2) {
      current = { ...h, children: [] }
      result.push(current)
    } else if (h.level === 3 && current) {
      current.children.push(h)
    }
  }
  return result
})

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 64
  window.scrollTo({ top, behavior: 'smooth' })
}

function ensureId(el) {
  if (!el.id) {
    el.id = el.textContent.trim().toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')
  }
  return el.id
}

onMounted(() => {
  const els = [...document.querySelectorAll('main h2, main h3')]

  flat.value = els.map(el => {
    const clone = el.cloneNode(true)
    clone.querySelectorAll('.num').forEach(n => n.remove())
    return { id: ensureId(el), text: clone.textContent.trim(), level: parseInt(el.tagName[1]) }
  })

  if (!flat.value.length) return

  activeId.value = flat.value[0].id

  observer = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) { activeId.value = e.target.id; break }
    }
  }, { rootMargin: '-56px 0px -75% 0px', threshold: 0 })

  els.forEach(el => observer.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>
