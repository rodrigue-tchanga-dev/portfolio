<script setup>
defineProps({ t: Object })
</script>

<template>
  <section id="experience" class="py-24 bg-slate-50">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-14">
        <p class="text-sky-600 text-sm font-semibold tracking-widest uppercase mb-3">{{ t.experience.title }}</p>
        <h2 class="text-3xl font-bold text-slate-900 mb-3">{{ t.experience.subtitle }}</h2>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Ligne verticale -->
        <div class="absolute left-5 top-0 bottom-0 w-px bg-slate-200 hidden sm:block"></div>

        <div class="space-y-8">
          <div
            v-for="(exp, i) in t.experience.items" :key="i"
            class="relative sm:pl-16"
          >
            <!-- Point timeline -->
            <div class="absolute left-3.5 top-5 w-3 h-3 rounded-full border-2 border-sky-500 bg-white hidden sm:block"></div>

            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 class="font-bold text-slate-900 text-base">{{ exp.role }}</h3>
                  <p class="text-sky-600 font-semibold text-sm">{{ exp.company }}</p>
                  <p class="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                    <i class="fas fa-location-dot"></i> {{ exp.location }}
                  </p>
                </div>
                <span class="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full whitespace-nowrap self-start">
                  {{ exp.period }}
                </span>
              </div>

              <p class="text-slate-500 text-sm mb-3 italic">{{ exp.description }}</p>

              <ul class="space-y-1.5 mb-4">
                <li v-for="b in exp.bullets" :key="b" class="flex items-start gap-2 text-sm text-slate-600">
                  <i class="fas fa-check text-sky-500 text-xs mt-1 flex-shrink-0"></i>
                  {{ b }}
                </li>
              </ul>

              <div class="flex flex-wrap gap-1.5">
                <span v-for="tech in exp.tech" :key="tech"
                  class="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded border border-slate-200"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
