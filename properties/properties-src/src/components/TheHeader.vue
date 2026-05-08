<template>
  <header class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="index.html">
        <span class="brand-mark"></span>
        <span class="brand-name">Liquid Argon Properties</span>
        <span class="brand-sub">/lar.properties</span>
      </a>
      <nav class="topnav">
        <a v-for="link in links" :key="link.href"
           :href="link.href"
           :class="{ active: isActive(link.href) }">
          {{ link.label }}
        </a>
      </nav>
      <div class="topbar-tail">
        <button class="iconbtn" @click="toggle" :title="state.theme === 'dark' ? 'Light mode' : 'Dark mode'">
          <!-- moon: shown in light mode → click to go dark -->
          <svg v-if="state.theme !== 'dark'" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <!-- sun: shown in dark mode → click to go light -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useTheme } from '../composables/useTheme.js'

const { state, toggle } = useTheme()

const links = [
  { href: 'index.html',       label: 'Overview' },
  { href: 'basic.html',       label: 'Basic' },
  { href: 'pass.html',        label: 'Particle Passage' },
  { href: 'trans.html',       label: 'Transport' },
  { href: 'electronics.html', label: 'Electronics' },
  { href: 'scint.html',       label: 'Scintillation' },
  { href: 'spacecharge.html', label: 'Space Charge' },
]

function isActive(href) {
  const path = window.location.pathname
  if (href === 'index.html') {
    return path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('properties')
  }
  return path.endsWith(href)
}
</script>
