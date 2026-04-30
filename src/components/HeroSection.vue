<script setup>
import { ref } from 'vue'
defineProps({ t: Object })
const photoError = ref(false)
</script>

<template>
  <section class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 flex items-center pt-14 relative overflow-hidden">

    <!-- Orbs décoratifs -->
    <div class="absolute top-20 right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-4 py-24 w-full">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        <!-- Texte -->
        <div class="flex-1">

          <!-- Badge disponibilité -->
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {{ t.hero.available }}
          </div>

          <!-- Nom -->
          <h1 class="text-5xl sm:text-6xl font-black text-white leading-tight mb-4">
            Rodrigue<br>
            <span class="text-sky-400">Tchanga</span>
          </h1>

          <!-- Titre -->
          <p class="text-xl text-slate-300 font-medium mb-2">{{ t.hero.role }}</p>
          <p class="text-sky-500/80 text-sm font-semibold tracking-widest uppercase mb-6">{{ t.hero.years }}</p>

          <!-- Tagline -->
          <p class="text-slate-400 text-base leading-relaxed mb-10 max-w-xl">
            {{ t.hero.tagline }}
          </p>

          <!-- CTA -->
          <div class="flex flex-wrap gap-3">
            <a
              href="#contact"
              class="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
            >
              {{ t.hero.contactBtn }}
            </a>
            <a
              href="#projects"
              class="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/10 transition-all"
            >
              {{ t.hero.projectsBtn }}
            </a>
          </div>

          <!-- Tech stack rapide -->
          <div class="flex flex-wrap gap-2 mt-12">
            <span v-for="tech in ['C# .NET', 'Vue 3', 'Angular', 'Azure', 'Docker', 'SQL']" :key="tech"
              class="px-2.5 py-1 text-xs rounded bg-slate-700/60 text-slate-400 border border-slate-700"
            >
              {{ tech }}
            </span>
          </div>

        </div>

        <!-- Photo -->
        <div class="flex-shrink-0 order-first lg:order-last">
          <!-- Place ton fichier photo dans public/photo.jpg pour l'afficher -->
          <div class="relative">
            <img
              v-if="!photoError"
              src="/photo.jpg"
              alt="Rodrigue Tchanga"
              @error="photoError = true"
              class="w-48 h-48 lg:w-64 lg:h-64 rounded-2xl object-cover shadow-2xl shadow-sky-500/20 border border-sky-500/20"
            >
            <div
              v-if="photoError"
              class="w-48 h-48 lg:w-64 lg:h-64 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 border border-sky-500/30 flex items-center justify-center shadow-2xl shadow-sky-500/10"
            >
              <span class="text-5xl lg:text-7xl font-black text-sky-400/80">RT</span>
            </div>
            <!-- Halo décoratif -->
            <div class="absolute -inset-1 rounded-2xl bg-sky-500/10 blur-lg -z-10"></div>
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600">
      <span class="text-xs">scroll</span>
      <i class="fas fa-chevron-down text-xs animate-bounce"></i>
    </div>

  </section>
</template>
