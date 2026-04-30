<script setup>
import { computed } from 'vue'
import { lang, t, toggleLang } from './i18n.js'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import CVPage from './components/CVPage.vue'

const showCV = computed(() => new URLSearchParams(window.location.search).has('cv'))
</script>

<template>
  <!-- Mode CV (accessible via ?cv dans l'URL) -->
  <CVPage v-if="showCV" />

  <!-- Portfolio principal -->
  <div v-else class="font-sans text-slate-800 bg-white">
    <NavBar :t="t" :lang="lang" @toggle-lang="toggleLang" />
    <HeroSection :t="t" />
    <AboutSection :t="t" />
    <SkillsSection :t="t" />
    <ExperienceSection :t="t" />
    <ProjectsSection :t="t" />
    <EducationSection :t="t" />
    <ContactSection :t="t" :lang="lang" />

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-400 py-6 text-center text-sm">
      © 2026 Rodrigue Tchanga · Strasbourg, France
    </footer>
  </div>
</template>
