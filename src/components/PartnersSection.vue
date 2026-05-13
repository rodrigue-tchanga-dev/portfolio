<script setup>
defineProps({ t: Object })
</script>

<template>
  <section id="partners" class="py-20 bg-slate-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <p class="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">{{ t.partners.title }}</p>
        <h2 class="text-3xl font-bold text-slate-900 mb-3">{{ t.partners.subtitle }}</h2>
      </div>

      <div class="flex flex-wrap justify-center gap-6">
        <a
          v-for="p in t.partners.items" :key="p.name"
          :href="p.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-5 bg-white border border-slate-200 rounded-2xl px-8 py-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all max-w-sm w-full"
        >
          <div class="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-sky-100 transition-colors">
            <i :class="['fas', p.icon]" class="text-sky-600 text-2xl"></i>
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-slate-900 font-bold text-lg">{{ p.name }}</h3>
              <i class="fas fa-arrow-up-right-from-square text-slate-400 text-xs group-hover:text-sky-500 transition-colors"></i>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed">{{ p.description }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
