<script setup>
import { lang, t, toggleLang } from '../i18n.js'
import { social } from '../config.js'

function downloadPDF() {
  window.print()
}
</script>

<template>
  <!-- Toolbar (masquée à l'impression) -->
  <div class="no-print fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200 flex items-center justify-between px-6 h-11 shadow-sm">
    <div class="flex items-center gap-4 text-sm">
      <a href="./" class="text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors text-xs">
        <i class="fas fa-arrow-left text-xs"></i> Portfolio
      </a>
      <button @click="toggleLang"
        class="border border-slate-300 hover:border-slate-500 text-slate-500 hover:text-slate-800 rounded px-2 py-0.5 text-xs font-semibold transition">
        {{ lang === 'fr' ? 'EN' : 'FR' }}
      </button>
    </div>
    <button @click="downloadPDF"
      class="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition">
      <i class="fas fa-print text-xs"></i>
      {{ lang === 'fr' ? 'Imprimer / PDF' : 'Print / PDF' }}
    </button>
  </div>

  <!-- Fond écran -->
  <div class="cv-wrapper">
    <div class="cv-page">

      <!-- ══ EN-TÊTE ══ -->
      <header class="cv-head">
        <div class="cv-name-block">
          <h1 class="cv-name">Rodrigue<span class="cv-name-last"> Tchanga</span></h1>
          <div class="cv-accent-bar"></div>
          <p class="cv-title">{{ t.hero.role }}</p>
        </div>
        <div class="cv-contact-bar">
          <span>{{ t.contact.phone }}</span>
          <span class="cv-dot">·</span>
          <span>{{ t.contact.email }}</span>
          <span class="cv-dot">·</span>
          <span>{{ t.contact.location }}</span>
          <span class="cv-dot">·</span>
          <a :href="social.linkedin">LinkedIn</a>
          <span class="cv-dot">·</span>
          <a :href="social.github">GitHub</a>
        </div>
      </header>

      <div class="cv-divider"></div>

      <!-- ══ EXPÉRIENCE ══ -->
      <section class="cv-section">
        <h2 class="cv-section-title">{{ t.experience.title }}</h2>
        <div v-for="exp in t.experience.items" :key="exp.period" class="cv-exp">
          <div class="cv-exp-top">
            <div>
              <span class="cv-exp-role">{{ exp.role }}</span>
              <span class="cv-exp-sep"> — </span>
              <span class="cv-exp-company">{{ exp.company }}, {{ exp.location }}</span>
            </div>
            <span class="cv-exp-period">{{ exp.period }}</span>
          </div>
          <ul class="cv-bullets">
            <li v-for="b in exp.bullets" :key="b">{{ b }}</li>
          </ul>
          <p class="cv-tech">{{ exp.tech.join(' · ') }}</p>
        </div>
      </section>

      <!-- ══ PROJETS ══ -->
      <section class="cv-section">
        <h2 class="cv-section-title">{{ t.projects.title }}</h2>
        <div v-for="p in t.projects.items" :key="p.name" class="cv-project">
          <div class="cv-exp-top">
            <div>
              <span class="cv-exp-role">{{ p.name }}</span>
              <span class="cv-exp-sep"> — </span>
              <span class="cv-exp-company">{{ p.tagline }}</span>
            </div>
            <span class="cv-project-status">{{ p.status }}</span>
          </div>
          <p class="cv-project-desc">{{ p.description }}</p>
          <p class="cv-tech">{{ p.tech.join(' · ') }}</p>
        </div>
      </section>

      <!-- ══ COMPÉTENCES ══ -->
      <section class="cv-section cv-page-break">
        <h2 class="cv-section-title">{{ t.skills.title }}</h2>
        <div class="cv-skills-grid">
          <div v-for="cat in t.skills.categories" :key="cat.name" class="cv-skill-row">
            <span class="cv-skill-cat">{{ cat.name }}</span>
            <span class="cv-skill-items">{{ cat.items.join(' · ') }}</span>
          </div>
        </div>
      </section>

      <!-- ══ FORMATION + LANGUES ══ -->
      <div class="cv-bottom-row">
        <section class="cv-section cv-section-half">
          <h2 class="cv-section-title">{{ t.education.title }}</h2>
          <div v-for="edu in t.education.items" :key="edu.year" class="cv-edu">
            <span class="cv-edu-year">{{ edu.year }}</span>
            <span class="cv-edu-degree">{{ edu.degree }}</span>
            <span class="cv-edu-school">{{ edu.school }}, {{ edu.location }}</span>
          </div>
        </section>

        <section class="cv-section cv-section-half">
          <h2 class="cv-section-title">{{ lang === 'fr' ? 'Langues' : 'Languages' }}</h2>
          <p class="cv-lang">{{ lang === 'fr' ? 'Français — natif' : 'French — native' }}</p>
          <p class="cv-lang">{{ lang === 'fr' ? 'Anglais — professionnel' : 'English — professional' }}</p>
        </section>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Wrapper écran ── */
.cv-wrapper {
  min-height: 100vh;
  background: #e8eaed;
  padding: 3.5rem 1rem 3rem;
  display: flex;
  justify-content: center;
}

/* ── Feuille A4 ── */
.cv-page {
  width: 210mm;
  min-height: 297mm;
  background: #fff;
  box-shadow: 0 4px 32px rgba(0,0,0,0.14);
  font-family: 'Inter', sans-serif;
  font-size: 9pt;
  color: #1e293b;
  line-height: 1.5;
  padding: 22mm 20mm 18mm;
  box-sizing: border-box;
}

/* ── En-tête ── */
.cv-head { margin-bottom: 10px; }

.cv-name-block { margin-bottom: 8px; }

.cv-name {
  font-size: 26pt;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -1px;
  line-height: 1;
  margin: 0 0 6px;
}
.cv-name-last { color: #0369a1; }

.cv-accent-bar {
  width: 36px;
  height: 3px;
  background: #0369a1;
  margin-bottom: 6px;
}

.cv-title {
  font-size: 10.5pt;
  color: #475569;
  font-weight: 400;
  margin: 0;
}

.cv-contact-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 0;
  font-size: 7.5pt;
  color: #64748b;
  margin-top: 6px;
}
.cv-contact-bar a { color: #0369a1; text-decoration: none; }
.cv-contact-bar a:hover { text-decoration: underline; }
.cv-dot { margin: 0 5px; color: #cbd5e1; }

/* ── Divider ── */
.cv-divider {
  border: none;
  border-top: 1.5px solid #0369a1;
  margin: 10px 0 14px;
  opacity: 0.25;
}

/* ── Sections ── */
.cv-section { margin-bottom: 14px; }
.cv-section-title {
  font-size: 7pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  color: #94a3b8;
  margin: 0 0 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid #f1f5f9;
}

/* ── Expérience ── */
.cv-exp {
  margin-bottom: 11px;
  padding-left: 10px;
  border-left: 2px solid #e2e8f0;
  break-inside: avoid;
}
.cv-exp:last-child { margin-bottom: 0; }

.cv-exp-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 3px;
}
.cv-exp-role    { font-size: 9.5pt; font-weight: 700; color: #0f172a; }
.cv-exp-sep     { color: #cbd5e1; }
.cv-exp-company { font-size: 8.5pt; color: #64748b; }
.cv-exp-period  {
  font-size: 7.5pt;
  color: #0369a1;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.cv-bullets {
  margin: 2px 0 4px 12px;
  padding: 0;
}
.cv-bullets li {
  font-size: 8.5pt;
  color: #475569;
  margin-bottom: 1.5px;
  list-style: disc;
}

.cv-tech {
  font-size: 7.5pt;
  color: #94a3b8;
  margin: 0;
  font-style: italic;
}

/* ── Projets ── */
.cv-project { margin-bottom: 9px; break-inside: avoid; }
.cv-project-status {
  font-size: 7pt;
  font-weight: 600;
  color: #64748b;
  white-space: nowrap;
  flex-shrink: 0;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 1px 6px;
  border-radius: 3px;
}
.cv-project-desc { font-size: 8.5pt; color: #475569; margin: 2px 0 3px; }

/* ── Compétences ── */
.cv-skills-grid { display: flex; flex-direction: column; gap: 4px; }
.cv-skill-row   { display: flex; gap: 8px; align-items: baseline; }
.cv-skill-cat   { font-size: 8pt; font-weight: 700; color: #334155; min-width: 110px; flex-shrink: 0; }
.cv-skill-items { font-size: 8pt; color: #64748b; }

/* ── Bas de page (Formation + Langues côte à côte) ── */
.cv-bottom-row { display: flex; gap: 20px; }
.cv-section-half { flex: 1; }

.cv-edu { display: flex; gap: 8px; align-items: baseline; margin-bottom: 4px; flex-wrap: wrap; }
.cv-edu-year   { font-size: 8pt; font-weight: 700; color: #0369a1; flex-shrink: 0; }
.cv-edu-degree { font-size: 8.5pt; font-weight: 600; color: #1e293b; }
.cv-edu-school { font-size: 8pt; color: #64748b; }

.cv-lang { font-size: 8.5pt; color: #475569; margin: 0 0 3px; }

/* ── Impression ── */
@media print {
  .no-print      { display: none !important; }
  .cv-wrapper    { padding: 0; background: #fff; display: block; }
  .cv-page       { box-shadow: none; width: 100%; min-height: unset; padding: 14mm 16mm; }
  .cv-page-break { break-before: page; padding-top: 14mm; }
  @page          { size: A4 portrait; margin: 0; }
}
</style>
