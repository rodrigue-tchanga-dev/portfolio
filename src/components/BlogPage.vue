<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import { lang, t, toggleLang } from '../i18n.js'
import { posts } from '../blog/index.js'

const params = new URLSearchParams(window.location.search)
const slug = params.get('post')

const currentPost = computed(() =>
  slug ? posts.find(p => p.slug === slug) : null
)

const renderedContent = computed(() => {
  if (!currentPost.value) return ''
  return marked(currentPost.value.content[lang.value])
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(lang.value === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
</script>

<template>
  <!-- Toolbar -->
  <div class="no-print fixed top-0 inset-x-0 z-50 bg-slate-900 text-white flex items-center justify-between px-6 h-12 shadow-lg">
    <div class="flex items-center gap-4 text-sm">
      <a v-if="currentPost" href="?blog" class="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
        <i class="fas fa-arrow-left text-xs"></i> {{ t.blog.backToBlog }}
      </a>
      <a v-else href="./" class="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
        <i class="fas fa-arrow-left text-xs"></i> {{ t.blog.backToPortfolio }}
      </a>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-slate-400 text-sm font-semibold hidden sm:block">Blog</span>
      <button @click="toggleLang"
        class="border border-slate-700 hover:border-sky-500 text-slate-300 hover:text-sky-400 rounded px-2.5 py-1 text-xs font-semibold transition">
        {{ lang === 'fr' ? 'EN' : 'FR' }}
      </button>
    </div>
  </div>

  <div class="min-h-screen bg-slate-50 pt-12">

    <!-- ===== VUE ARTICLE ===== -->
    <div v-if="currentPost" class="max-w-3xl mx-auto px-4 py-12">

      <!-- En-tête article -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tag in currentPost.tags" :key="tag"
            class="text-xs px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100 font-medium"
          >
            {{ tag }}
          </span>
        </div>
        <h1 class="text-3xl font-black text-slate-900 leading-tight mb-4">
          {{ currentPost.title[lang] }}
        </h1>
        <div class="flex items-center gap-4 text-sm text-slate-500">
          <span>{{ formatDate(currentPost.date) }}</span>
          <span class="flex items-center gap-1">
            <i class="fas fa-clock text-xs"></i>
            {{ currentPost.readTime }} {{ t.blog.minRead }}
          </span>
        </div>
      </div>

      <!-- Contenu Markdown rendu -->
      <article class="prose" v-html="renderedContent"></article>

      <!-- Retour -->
      <div class="mt-12 pt-8 border-t border-slate-200">
        <a href="?blog" class="inline-flex items-center gap-2 text-sky-600 hover:text-sky-500 font-semibold text-sm transition-colors">
          <i class="fas fa-arrow-left text-xs"></i> {{ t.blog.backToBlog }}
        </a>
      </div>
    </div>

    <!-- ===== VUE LISTE ===== -->
    <div v-else class="max-w-4xl mx-auto px-4 py-12">

      <div class="mb-10">
        <p class="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-2">{{ t.blog.title }}</p>
        <h1 class="text-3xl font-black text-slate-900">{{ t.blog.subtitle }}</h1>
      </div>

      <div class="flex flex-col gap-5">
        <a
          v-for="post in posts" :key="post.slug"
          :href="'?post=' + post.slug"
          class="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all block"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div class="flex-1">
              <div class="flex flex-wrap gap-1.5 mb-3">
                <span
                  v-for="tag in post.tags" :key="tag"
                  class="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100 font-medium"
                >
                  {{ tag }}
                </span>
              </div>
              <h2 class="text-slate-900 font-bold text-lg leading-snug mb-2 group-hover:text-sky-600 transition-colors">
                {{ post.title[lang] }}
              </h2>
              <p class="text-slate-500 text-sm leading-relaxed">{{ post.summary[lang] }}</p>
            </div>
            <div class="flex sm:flex-col items-center sm:items-end gap-3 text-xs text-slate-400 sm:text-right flex-shrink-0">
              <span>{{ formatDate(post.date) }}</span>
              <span class="flex items-center gap-1">
                <i class="fas fa-clock"></i> {{ post.readTime }} {{ t.blog.minRead }}
              </span>
              <span class="text-sky-600 font-semibold group-hover:underline hidden sm:block">{{ t.blog.readMore }}</span>
            </div>
          </div>
        </a>
      </div>

      <div class="mt-10">
        <a href="./" class="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm transition-colors">
          <i class="fas fa-arrow-left text-xs"></i> {{ t.blog.backToPortfolio }}
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
