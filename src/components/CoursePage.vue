<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import { lang, t, toggleLang } from '../i18n.js'
import { findSeries, findLesson } from '../courses/index.js'

const params = new URLSearchParams(window.location.search)
const seriesId = params.get('course')
const lessonSlug = params.get('lesson')

const currentSeries = computed(() => findSeries(seriesId))
const current = computed(() =>
  lessonSlug ? findLesson(seriesId, lessonSlug) : null
)

const previousLesson = computed(() => {
  if (!current.value || current.value.index === 0) return null
  return current.value.series.lessons[current.value.index - 1]
})
const nextLesson = computed(() => {
  if (!current.value) return null
  const { series: s, index } = current.value
  return index < s.lessons.length - 1 ? s.lessons[index + 1] : null
})

const renderedContent = computed(() => {
  if (!current.value) return ''
  return marked(current.value.lesson.content[lang.value])
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(lang.value === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function lessonHref(slug) {
  return `?course=${seriesId}&lesson=${slug}`
}
</script>

<template>
  <!-- Toolbar -->
  <div class="no-print fixed top-0 inset-x-0 z-50 bg-slate-900 text-white flex items-center justify-between px-6 h-12 shadow-lg">
    <div class="flex items-center gap-4 text-sm">
      <a v-if="current" :href="'?course=' + seriesId" class="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
        <i class="fas fa-arrow-left text-xs"></i> {{ t.courses.backToSeries }}
      </a>
      <a v-else href="?blog" class="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
        <i class="fas fa-arrow-left text-xs"></i> {{ t.courses.backToBlog }}
      </a>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-slate-400 text-sm font-semibold hidden sm:block">{{ t.courses.label }}</span>
      <button @click="toggleLang"
        class="border border-slate-700 hover:border-sky-500 text-slate-300 hover:text-sky-400 rounded px-2.5 py-1 text-xs font-semibold transition">
        {{ lang === 'fr' ? 'EN' : 'FR' }}
      </button>
    </div>
  </div>

  <div v-if="!currentSeries" class="min-h-screen bg-slate-50 pt-24 text-center text-slate-500">
    <p>404</p>
  </div>

  <div v-else class="min-h-screen bg-slate-50 pt-12">

    <!-- ===== VUE LEÇON ===== -->
    <div v-if="current" class="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-[240px_1fr] gap-10">

      <!-- Sommaire de la série -->
      <aside class="md:sticky md:top-20 self-start">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{{ currentSeries.name[lang] }}</p>
        <nav class="flex flex-col gap-1">
          <a
            v-for="(l, i) in currentSeries.lessons" :key="l.slug"
            :href="lessonHref(l.slug)"
            class="text-sm rounded-lg px-3 py-2 transition-colors"
            :class="l.slug === current.lesson.slug
              ? 'bg-sky-50 text-sky-700 font-semibold border border-sky-100'
              : 'text-slate-500 hover:bg-slate-100'"
          >
            {{ i + 1 }}. {{ l.title[lang] }}
          </a>
        </nav>
      </aside>

      <div>
        <div class="mb-8">
          <p class="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-2">
            {{ t.courses.lessonLabel }} {{ current.index + 1 }}/{{ currentSeries.lessons.length }}
          </p>
          <h1 class="text-3xl font-black text-slate-900 leading-tight mb-4">
            {{ current.lesson.title[lang] }}
          </h1>
          <div class="flex items-center gap-4 text-sm text-slate-500">
            <span>{{ formatDate(current.lesson.date) }}</span>
            <span class="flex items-center gap-1">
              <i class="fas fa-clock text-xs"></i>
              {{ current.lesson.readTime }} {{ t.courses.minRead }}
            </span>
          </div>
        </div>

        <article class="prose" v-html="renderedContent"></article>

        <!-- Navigation précédent / suivant -->
        <div class="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between gap-4">
          <a v-if="previousLesson" :href="lessonHref(previousLesson.slug)"
            class="text-sky-600 hover:text-sky-500 font-semibold text-sm transition-colors">
            {{ t.courses.previousLesson }}
          </a>
          <span v-else></span>
          <a v-if="nextLesson" :href="lessonHref(nextLesson.slug)"
            class="text-sky-600 hover:text-sky-500 font-semibold text-sm transition-colors">
            {{ t.courses.nextLesson }}
          </a>
        </div>
      </div>
    </div>

    <!-- ===== VUE SÉRIE (sommaire) ===== -->
    <div v-else class="max-w-3xl mx-auto px-4 py-12">
      <div class="mb-10">
        <p class="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-2">{{ t.courses.label }}</p>
        <h1 class="text-3xl font-black text-slate-900 mb-3">{{ currentSeries.name[lang] }}</h1>
        <p class="text-slate-500 leading-relaxed">{{ currentSeries.description[lang] }}</p>
      </div>

      <div class="flex flex-col gap-4">
        <a
          v-for="(l, i) in currentSeries.lessons" :key="l.slug"
          :href="lessonHref(l.slug)"
          class="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all block"
        >
          <div class="flex items-start gap-4">
            <span class="flex-shrink-0 w-8 h-8 rounded-full bg-sky-50 text-sky-700 border border-sky-100 font-bold text-sm flex items-center justify-center">
              {{ i + 1 }}
            </span>
            <div class="flex-1">
              <h2 class="text-slate-900 font-bold text-lg leading-snug mb-1 group-hover:text-sky-600 transition-colors">
                {{ l.title[lang] }}
              </h2>
              <p class="text-slate-500 text-sm leading-relaxed">{{ l.summary[lang] }}</p>
            </div>
          </div>
        </a>
      </div>

      <div class="mt-10">
        <a href="?blog" class="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm transition-colors">
          <i class="fas fa-arrow-left text-xs"></i> {{ t.courses.backToBlog }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles Markdown rendus */
.prose {
  color: #334155;
  line-height: 1.75;
  font-size: 1rem;
}
.prose :deep(h1) { font-size: 1.875rem; font-weight: 800; color: #0f172a; margin: 2rem 0 1rem; }
.prose :deep(h2) { font-size: 1.375rem; font-weight: 700; color: #0f172a; margin: 2rem 0 0.75rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e0f2fe; }
.prose :deep(h3) { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 1.5rem 0 0.5rem; }
.prose :deep(p)  { margin-bottom: 1.25rem; }
.prose :deep(ul) { margin: 0.75rem 0 1.25rem 1.5rem; }
.prose :deep(li) { margin-bottom: 0.4rem; }
.prose :deep(strong) { color: #0f172a; font-weight: 700; }
.prose :deep(a)  { color: #0ea5e9; text-decoration: underline; }
.prose :deep(pre) {
  background: #0f172a;
  color: #e2e8f0;
  padding: 1.25rem 1.5rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-size: 0.875rem;
  line-height: 1.6;
}
.prose :deep(code) {
  background: #f1f5f9;
  color: #0369a1;
  padding: 0.15rem 0.4rem;
  border-radius: 0.3rem;
  font-size: 0.875em;
  font-family: 'Fira Code', 'Consolas', monospace;
}
.prose :deep(pre code) {
  background: transparent;
  color: #e2e8f0;
  padding: 0;
  font-size: inherit;
}
.prose :deep(blockquote) {
  border-left: 4px solid #38bdf8;
  padding-left: 1rem;
  color: #64748b;
  font-style: italic;
  margin: 1.5rem 0;
}
</style>
