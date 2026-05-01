<script setup>
import { computed } from 'vue'
import { posts } from '../blog/index.js'
defineProps({ t: Object, lang: String })

const latest = computed(() => posts.slice(0, 3))

function formatDate(dateStr, lang) {
  return new Date(dateStr).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
</script>

<template>
  <section id="blog" class="py-24 bg-slate-50">
    <div class="max-w-6xl mx-auto px-4">

      <div class="text-center mb-14">
        <p class="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">{{ t.blog.title }}</p>
        <h2 class="text-3xl font-bold text-slate-900 mb-3">{{ t.blog.subtitle }}</h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <a
          v-for="post in latest" :key="post.slug"
          :href="'?post=' + post.slug"
          class="group block bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span
              v-for="tag in post.tags" :key="tag"
              class="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100 font-medium"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Title -->
          <h3 class="text-slate-900 font-bold text-base leading-snug mb-2 group-hover:text-sky-600 transition-colors">
            {{ post.title[lang] }}
          </h3>

          <!-- Summary -->
          <p class="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
            {{ post.summary[lang] }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
            <span>{{ formatDate(post.date, lang) }}</span>
            <span class="flex items-center gap-1">
              <i class="fas fa-clock"></i>
              {{ post.readTime }} {{ t.blog.minRead }}
            </span>
          </div>
        </a>
      </div>

      <!-- Voir tous -->
      <div class="text-center">
        <a
          href="?blog"
          class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition"
        >
          {{ t.blog.allArticles }}
          <i class="fas fa-arrow-right text-xs"></i>
        </a>
      </div>

    </div>
  </section>
</template>
