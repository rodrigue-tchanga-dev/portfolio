<script setup>
defineProps({ t: Object })
const stats = [
  { value: '8+', label: 'ans d\'expérience' },
  { value: '5', label: 'entreprises' },
  { value: '3', label: 'pays' },
]
</script>

<template>
  <section id="about" class="py-24 bg-slate-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-16 items-center">

        <!-- Texte -->
        <div>
          <p class="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">{{ t.about.title }}</p>
          <h2 class="text-3xl font-bold text-slate-900 mb-6 leading-tight">{{ t.about.subtitle }}</h2>
          <div class="space-y-4 text-slate-600 leading-relaxed">
            <p>{{ t.about.p1 }}</p>
            <p>{{ t.about.p2 }}</p>
            <p>{{ t.about.p3 }}</p>
          </div>

          <!-- Langues -->
          <div class="mt-8 flex gap-3">
            <span class="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-100">
              🇫🇷 Français — natif
            </span>
            <span class="px-4 py-2 bg-sky-50 text-sky-700 text-sm font-medium rounded-lg border border-sky-100">
              🇬🇧 English — conversationnel
            </span>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 gap-4">
          <div v-for="s in stats" :key="s.value"
            class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-5"
          >
            <div class="text-4xl font-black text-sky-600 w-16">{{ s.value }}</div>
            <div class="text-slate-600 font-medium">{{ s.label }}</div>
          </div>

          <!-- Intérêts -->
          <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Intérêts</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="i in ['Tennis 🎾', 'Football ⚽', 'Voyages 🌍', 'Finance 📈', 'Dev personnel 💻']" :key="i"
                class="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-lg">
                {{ i }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
