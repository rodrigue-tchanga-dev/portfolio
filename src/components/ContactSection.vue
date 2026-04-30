<script setup>
import { ref, reactive } from 'vue'
import { social } from '../config.js'
defineProps({ t: Object, lang: String })

const form = reactive({ name: '', email: '', message: '' })
const status = ref('') // '', 'sending', 'success', 'error'

async function submitForm(t) {
  status.value = 'sending'
  try {
    // ← Remplace VOTRE-ID par ton identifiant Formspree (formspree.io)
    const res = await fetch('https://formspree.io/f/VOTRE-ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: form.name, _replyto: form.email, message: form.message }),
    })
    status.value = res.ok ? 'success' : 'error'
    if (res.ok) { form.name = ''; form.email = ''; form.message = '' }
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="py-24 bg-slate-900">
    <div class="max-w-4xl mx-auto px-4 text-center">

      <p class="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-4">{{ t.contact.title }}</p>
      <h2 class="text-3xl font-bold text-white mb-4">{{ t.contact.subtitle }}</h2>

      <!-- Coordonnées -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 mb-4">
        <a :href="'tel:' + t.contact.phone.replace(/\s/g, '')"
          class="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3.5 rounded-xl transition group"
        >
          <div class="w-9 h-9 bg-sky-500/20 group-hover:bg-sky-500/30 rounded-lg flex items-center justify-center">
            <i class="fas fa-phone text-sky-400 text-sm"></i>
          </div>
          <span class="text-sm font-medium">{{ t.contact.phone }}</span>
        </a>

        <a :href="'mailto:' + t.contact.email"
          class="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3.5 rounded-xl transition group"
        >
          <div class="w-9 h-9 bg-sky-500/20 group-hover:bg-sky-500/30 rounded-lg flex items-center justify-center">
            <i class="fas fa-envelope text-sky-400 text-sm"></i>
          </div>
          <span class="text-sm font-medium">{{ t.contact.email }}</span>
        </a>

        <div class="flex items-center gap-3 bg-white/5 border border-white/10 text-slate-400 px-5 py-3.5 rounded-xl">
          <div class="w-9 h-9 bg-slate-500/20 rounded-lg flex items-center justify-center">
            <i class="fas fa-location-dot text-slate-400 text-sm"></i>
          </div>
          <span class="text-sm font-medium">{{ t.contact.location }}</span>
        </div>
      </div>

      <!-- Réseaux sociaux -->
      <div class="flex items-center justify-center gap-4 mb-12">
        <a :href="social.github" target="_blank" rel="noopener"
          class="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3.5 rounded-xl transition group"
        >
          <div class="w-9 h-9 bg-slate-500/20 group-hover:bg-slate-500/30 rounded-lg flex items-center justify-center">
            <i class="fab fa-github text-slate-300 text-sm"></i>
          </div>
          <span class="text-sm font-medium">{{ t.contact.githubLabel }}</span>
        </a>

        <a :href="social.linkedin" target="_blank" rel="noopener"
          class="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3.5 rounded-xl transition group"
        >
          <div class="w-9 h-9 bg-sky-500/20 group-hover:bg-sky-500/30 rounded-lg flex items-center justify-center">
            <i class="fab fa-linkedin text-sky-400 text-sm"></i>
          </div>
          <span class="text-sm font-medium">{{ t.contact.linkedinLabel }}</span>
        </a>
      </div>

      <!-- Formulaire de contact -->
      <div class="max-w-xl mx-auto mb-12">
        <p class="text-slate-400 text-sm mb-5">{{ t.contact.formTitle }}</p>
        <form @submit.prevent="submitForm(t)" class="flex flex-col gap-3 text-left">
          <input
            v-model="form.name"
            type="text"
            :placeholder="t.contact.formName"
            required
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
          >
          <input
            v-model="form.email"
            type="email"
            :placeholder="t.contact.formEmail"
            required
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
          >
          <textarea
            v-model="form.message"
            :placeholder="t.contact.formMessage"
            rows="4"
            required
            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition resize-none"
          ></textarea>
          <button
            type="submit"
            :disabled="status === 'sending'"
            class="w-full px-6 py-3 bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition hover:shadow-lg hover:shadow-sky-500/25"
          >
            {{ status === 'sending' ? t.contact.formSending : t.contact.formSubmit }}
          </button>
          <p v-if="status === 'success'" class="text-emerald-400 text-sm text-center">{{ t.contact.formSuccess }}</p>
          <p v-if="status === 'error'" class="text-red-400 text-sm text-center">{{ t.contact.formError }}</p>
        </form>
      </div>

      <!-- Télécharger CV -->
      <div class="border-t border-white/10 pt-10">
        <p class="text-slate-400 text-sm mb-5">{{ t.contact.downloadTitle }}</p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <a
            href="?cv"
            target="_blank"
            class="inline-flex items-center gap-2 px-5 py-3 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-xl transition hover:shadow-lg hover:shadow-sky-500/25"
          >
            <i class="fas fa-eye"></i>
            {{ lang === 'fr' ? 'Voir CV en ligne' : 'View CV online' }}
          </a>
          <a
            href="/cv-rodrigue-tchanga-fr.pdf"
            download
            class="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl border border-white/10 transition"
          >
            <i class="fas fa-file-pdf"></i>
            {{ t.contact.downloadFR }}
          </a>
          <a
            href="/cv-rodrigue-tchanga-en.pdf"
            download
            class="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl border border-white/10 transition"
          >
            <i class="fas fa-file-pdf"></i>
            {{ t.contact.downloadEN }}
          </a>
        </div>
        <p class="text-slate-600 text-xs mt-4">Formats PDF — mis à jour 2026</p>
      </div>

    </div>
  </section>
</template>
