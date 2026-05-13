<script setup>
import { computed } from 'vue'
import { lang, t, toggleLang } from './i18n.js'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import PartnersSection from './components/PartnersSection.vue'
import BlogSection from './components/BlogSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import CVPage from './components/CVPage.vue'
import BlogPage from './components/BlogPage.vue'

const params = new URLSearchParams(window.location.search)
const showCV   = computed(() => params.has('cv'))
const showBlog = computed(() => params.has('blog') || params.has('post'))
</script>

<template>
  <!-- Mode CV -->
  <CVPage v-if="showCV" />

  <!-- Mode Blog (liste ou article) -->
  <BlogPage v-else-if="showBlog" />

  <!-- Portfolio principal -->
  <div v-else class="font-sans text-slate-800 bg-white">
    <NavBar :t="t" :lang="lang" @toggle-lang="toggleLang" />
    <HeroSection :t="t" />
    <AboutSection :t="t" />
    <SkillsSection :t="t" />
    <ExperienceSection :t="t" />
    <ProjectsSection :t="t" />
    <PartnersSection :t="t" />
    <BlogSection :t="t" :lang="lang" />
    <EducationSection :t="t" />
    <ContactSection :t="t" :lang="lang" />

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-400 py-6 text-center text-sm">
      © 2026 Rodrigue Tchanga · Strasbourg, France
    </footer>
  </div>
</template>
