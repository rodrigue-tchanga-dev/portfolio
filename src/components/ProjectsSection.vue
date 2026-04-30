<script setup>
defineProps({ t: Object })
const palette = {
  sky:     { bg: 'bg-sky-600',     light: 'bg-sky-50 text-sky-700 border-sky-100',     badge: 'bg-sky-100 text-sky-700', btn: 'text-sky-700 hover:bg-sky-100' },
  emerald: { bg: 'bg-emerald-600', light: 'bg-emerald-50 text-emerald-700 border-emerald-100', badge: 'bg-emerald-100 text-emerald-700', btn: 'text-emerald-700 hover:bg-emerald-100' },
}
</script>

<template>
  <section id="projects" class="py-24 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-14">
        <p class="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">{{ t.projects.title }}</p>
        <h2 class="text-3xl font-bold text-slate-900 mb-3">{{ t.projects.subtitle }}</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="p in t.projects.items" :key="p.name"
          class="rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col"
        >
          <!-- Header coloré -->
          <div :class="palette[p.color].bg" class="px-6 py-8 flex items-start justify-between">
            <div>
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <i :class="['fas', p.icon]" class="text-white text-xl"></i>
              </div>
              <h3 class="text-white text-xl font-bold">{{ p.name }}</h3>
              <p class="text-white/70 text-sm mt-1">{{ p.tagline }}</p>
            </div>
            <span class="text-white/80 text-xs font-semibold bg-white/15 px-3 py-1 rounded-full">
              {{ p.status }}
            </span>
          </div>

          <!-- Contenu -->
          <div class="p-6 flex-1 flex flex-col">
            <p class="text-slate-600 text-sm leading-relaxed mb-5">{{ p.description }}</p>
            <div class="flex flex-wrap gap-2 mb-5">
              <span
                v-for="tech in p.tech" :key="tech"
                :class="palette[p.color].badge"
                class="text-xs px-2.5 py-1 rounded-lg font-medium border"
              >
                {{ tech }}
              </span>
            </div>
            <!-- Liens GitHub / Démo -->
            <div v-if="p.github || p.demo" class="flex gap-3 mt-auto pt-4 border-t border-slate-100">
              <a
                v-if="p.github"
                :href="p.github"
                target="_blank"
                rel="noopener"
                :class="palette[p.color].btn"
                class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                <i class="fab fa-github"></i> GitHub
              </a>
              <a
                v-if="p.demo"
                :href="p.demo"
                target="_blank"
                rel="noopener"
                :class="palette[p.color].btn"
                class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                <i class="fas fa-arrow-up-right-from-square"></i> Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
