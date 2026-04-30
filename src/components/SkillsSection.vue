<script setup>
defineProps({ t: Object })
const colors = ['sky', 'violet', 'emerald', 'orange', 'rose', 'indigo']
const colorMap = {
  sky:    { bg: 'bg-sky-50',    border: 'border-sky-100',    badge: 'bg-sky-100 text-sky-700',    title: 'text-sky-700'    },
  violet: { bg: 'bg-violet-50', border: 'border-violet-100', badge: 'bg-violet-100 text-violet-700', title: 'text-violet-700' },
  emerald:{ bg: 'bg-emerald-50',border: 'border-emerald-100',badge: 'bg-emerald-100 text-emerald-700', title: 'text-emerald-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-100', badge: 'bg-orange-100 text-orange-700', title: 'text-orange-700' },
  rose:   { bg: 'bg-rose-50',   border: 'border-rose-100',   badge: 'bg-rose-100 text-rose-700',   title: 'text-rose-700'   },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', badge: 'bg-indigo-100 text-indigo-700', title: 'text-indigo-700' },
}
</script>

<template>
  <section id="skills" class="py-24 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-14">
        <p class="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">{{ t.skills.title }}</p>
        <h2 class="text-3xl font-bold text-slate-900 mb-3">{{ t.skills.subtitle }}</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(cat, i) in t.skills.categories" :key="cat.name"
          :class="[colorMap[colors[i]].bg, colorMap[colors[i]].border]"
          class="rounded-2xl border p-6"
        >
          <h3 :class="colorMap[colors[i]].title" class="text-xs font-bold uppercase tracking-widest mb-4">
            {{ cat.name }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in cat.items" :key="item"
              :class="colorMap[colors[i]].badge"
              class="px-2.5 py-1 text-xs font-medium rounded-lg"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
