<script setup>
defineProps({ t: Object })
</script>

<template>
  <section id="education" class="py-20 bg-slate-50">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-12">
        <p class="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">{{ t.education.title }}</p>
      </div>
      <div class="grid sm:grid-cols-2 gap-4">
        <div v-for="edu in t.education.items" :key="edu.year"
          class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-start gap-4"
        >
          <div class="w-12 h-12 rounded-xl bg-sky-600 flex items-center justify-center flex-shrink-0">
            <i class="fas fa-graduation-cap text-white"></i>
          </div>
          <div>
            <p class="text-xs font-bold text-sky-600 uppercase tracking-widest mb-1">{{ edu.year }}</p>
            <h3 class="font-bold text-slate-900 text-sm leading-snug">{{ edu.degree }}</h3>
            <p class="text-slate-500 text-sm">{{ edu.school }}</p>
            <p class="text-slate-400 text-xs mt-0.5 flex items-center gap-1">
              <i class="fas fa-location-dot"></i> {{ edu.location }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
