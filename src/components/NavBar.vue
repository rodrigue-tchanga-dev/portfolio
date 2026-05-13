<script setup>
import { ref } from 'vue'
import { social } from '../config.js'
defineProps({ t: Object, lang: String })
defineEmits(['toggle-lang'])
const open = ref(false)
const links = ['about', 'skills', 'experience', 'projects', 'partners', 'contact']
</script>

<template>
  <header class="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
    <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

      <!-- Logo / Name -->
      <a href="#" class="text-white font-bold text-lg tracking-tight">
        RT <span class="text-sky-400">·</span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-6 text-sm">
        <a
          v-for="key in links" :key="key"
          :href="'#' + key"
          class="text-slate-400 hover:text-white transition-colors"
        >
          {{ t.nav[key] }}
        </a>
        <a href="?blog" class="text-slate-400 hover:text-white transition-colors">
          {{ t.nav.blog }}
        </a>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Social icons (desktop) -->
        <div class="hidden md:flex items-center gap-1 mr-1">
          <a :href="social.github" target="_blank" rel="noopener"
            class="p-1.5 text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
            <i class="fab fa-github text-base"></i>
          </a>
          <a :href="social.linkedin" target="_blank" rel="noopener"
            class="p-1.5 text-slate-400 hover:text-sky-400 transition-colors" aria-label="LinkedIn">
            <i class="fab fa-linkedin text-base"></i>
          </a>
        </div>

        <!-- Language toggle -->
        <button
          @click="$emit('toggle-lang')"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-400 transition"
        >
          <i class="fas fa-globe text-xs"></i>
          {{ lang === 'fr' ? 'EN' : 'FR' }}
        </button>

        <!-- Hamburger mobile -->
        <button @click="open = !open" class="md:hidden text-slate-400 hover:text-white">
          <i class="fas" :class="open ? 'fa-xmark' : 'fa-bars'"></i>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="open" class="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 flex flex-col gap-4">
      <a
        v-for="key in links" :key="key"
        :href="'#' + key"
        @click="open = false"
        class="text-slate-300 hover:text-white text-sm font-medium"
      >
        {{ t.nav[key] }}
      </a>
      <a href="?blog" @click="open = false" class="text-slate-300 hover:text-white text-sm font-medium">
        {{ t.nav.blog }}
      </a>
      <!-- Social links mobile -->
      <div class="flex gap-5 pt-2 border-t border-slate-800">
        <a :href="social.github" target="_blank" rel="noopener"
          class="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
          <i class="fab fa-github"></i> GitHub
        </a>
        <a :href="social.linkedin" target="_blank" rel="noopener"
          class="flex items-center gap-2 text-slate-400 hover:text-sky-400 text-sm transition-colors">
          <i class="fab fa-linkedin"></i> LinkedIn
        </a>
      </div>
    </div>
  </header>
</template>
