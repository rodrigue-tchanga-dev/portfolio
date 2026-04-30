<script setup>
import { lang, t, toggleLang } from '../i18n.js'
import { social } from '../config.js'
const printPage = () => window.print()
</script>

<template>
  <!-- Toolbar (masquée à l'impression) -->
  <div class="no-print fixed top-0 inset-x-0 z-50 bg-slate-900 text-white flex items-center justify-between px-6 h-12 shadow-lg">
    <div class="flex items-center gap-4 text-sm">
      <a href="./" class="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
        <i class="fas fa-arrow-left text-xs"></i> Portfolio
      </a>
      <button @click="toggleLang"
        class="border border-slate-700 hover:border-sky-500 text-slate-300 hover:text-sky-400 rounded px-2.5 py-1 text-xs font-semibold transition">
        {{ lang === 'fr' ? 'EN' : 'FR' }}
      </button>
    </div>
    <button @click="printPage"
      class="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition">
      <i class="fas fa-file-pdf"></i>
      {{ lang === 'fr' ? 'Télécharger PDF' : 'Download PDF' }}
    </button>
  </div>

  <!-- Zone grise (écran) + page A4 -->
  <div class="cv-wrapper">
    <div class="cv-page">

      <!-- ===== EN-TÊTE ===== -->
      <header class="cv-header">
        <div>
          <h1>Rodrigue Tchanga</h1>
          <p class="cv-role">{{ t.hero.role }}</p>
        </div>
        <div class="cv-contact">
          <span><i class="fas fa-phone"></i> {{ t.contact.phone }}</span>
          <span><i class="fas fa-envelope"></i> {{ t.contact.email }}</span>
          <span><i class="fas fa-location-dot"></i> {{ t.contact.location }}</span>
          <a :href="social.linkedin" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
          <a :href="social.github" target="_blank"><i class="fab fa-github"></i> GitHub</a>
        </div>
      </header>

      <!-- ===== CORPS 2 COLONNES ===== -->
      <div class="cv-body">

        <!-- GAUCHE : Compétences + Formation + Langues -->
        <aside class="cv-sidebar">

          <section class="cv-section">
            <h2 class="cv-section-title">{{ t.skills.title }}</h2>
            <div v-for="cat in t.skills.categories" :key="cat.name" class="cv-skill-cat">
              <h3>{{ cat.name }}</h3>
              <p>{{ cat.items.join(' · ') }}</p>
            </div>
          </section>

          <section class="cv-section">
            <h2 class="cv-section-title">{{ t.education.title }}</h2>
            <div v-for="edu in t.education.items" :key="edu.year" class="cv-edu-item">
              <p class="cv-edu-year">{{ edu.year }}</p>
              <p class="cv-edu-degree">{{ edu.degree }}</p>
              <p class="cv-edu-school">{{ edu.school }} — {{ edu.location }}</p>
            </div>
          </section>

          <section class="cv-section">
            <h2 class="cv-section-title">{{ lang === 'fr' ? 'Langues' : 'Languages' }}</h2>
            <p class="cv-lang-item">🇫🇷 {{ lang === 'fr' ? 'Français — Natif' : 'French — Native' }}</p>
            <p class="cv-lang-item">🇬🇧 {{ lang === 'fr' ? 'Anglais — Courant' : 'English — Conversational' }}</p>
          </section>

        </aside>

        <!-- DROITE : Expérience + Projets -->
        <main class="cv-main">

          <section class="cv-section">
            <h2 class="cv-section-title">{{ t.experience.title }}</h2>
            <div v-for="exp in t.experience.items" :key="exp.period" class="cv-exp-item">
              <div class="cv-exp-header">
                <div>
                  <p class="cv-exp-role">{{ exp.role }}</p>
                  <p class="cv-exp-company">{{ exp.company }} — {{ exp.location }}</p>
                </div>
                <p class="cv-exp-period">{{ exp.period }}</p>
              </div>
              <ul class="cv-exp-bullets">
                <li v-for="b in exp.bullets" :key="b">{{ b }}</li>
              </ul>
              <div class="cv-tech-tags">
                <span v-for="tech in exp.tech" :key="tech">{{ tech }}</span>
              </div>
            </div>
          </section>

          <section class="cv-section">
            <h2 class="cv-section-title">{{ t.projects.title }}</h2>
            <div v-for="p in t.projects.items" :key="p.name" class="cv-project-item">
              <div class="cv-project-header">
                <p class="cv-project-name">{{ p.name }} <span class="cv-project-tagline">— {{ p.tagline }}</span></p>
                <span class="cv-project-status">{{ p.status }}</span>
              </div>
              <p class="cv-project-desc">{{ p.description }}</p>
              <div class="cv-tech-tags">
                <span v-for="tech in p.tech" :key="tech">{{ tech }}</span>
              </div>
            </div>
          </section>

        </main>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Fond écran ── */
.cv-wrapper {
  min-height: 100vh;
  background: #cbd5e1;
  padding: 4rem 1rem 3rem;
}

/* ── Feuille A4 ── */
.cv-page {
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 8px 40px rgba(0,0,0,0.18);
  font-family: 'Inter', sans-serif;
  font-size: 9.5pt;
  color: #1e293b;
  line-height: 1.45;
}

/* ── En-tête ── */
.cv-header {
  background: #0f172a;
  color: #fff;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 10px;
}
.cv-header h1 {
  font-size: 20pt;
  font-weight: 800;
  color: #fff;
  margin: 0 0 3px;
  letter-spacing: -0.3px;
}
.cv-role {
  font-size: 10pt;
  color: #7dd3fc;
  margin: 0;
  font-weight: 500;
}
.cv-contact {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 8pt;
  color: #94a3b8;
  text-align: right;
}
.cv-contact a { color: #94a3b8; text-decoration: none; }
.cv-contact i { margin-right: 5px; color: #38bdf8; }

/* ── Corps 2 colonnes ── */
.cv-body { display: flex; }

/* ── Colonne gauche ── */
.cv-sidebar {
  width: 35%;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  padding: 16px 14px;
}

/* ── Colonne droite ── */
.cv-main {
  flex: 1;
  padding: 16px 18px;
}

/* ── Sections ── */
.cv-section { margin-bottom: 16px; }
.cv-section-title {
  font-size: 7.5pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #0ea5e9;
  border-bottom: 1.5px solid #e0f2fe;
  padding-bottom: 3px;
  margin-bottom: 9px;
}

/* ── Compétences ── */
.cv-skill-cat { margin-bottom: 7px; }
.cv-skill-cat h3 { font-size: 8pt; font-weight: 600; color: #334155; margin: 0 0 1px; }
.cv-skill-cat p  { font-size: 7.5pt; color: #64748b; margin: 0; }

/* ── Formation ── */
.cv-edu-item  { margin-bottom: 7px; }
.cv-edu-year  { font-size: 7.5pt; font-weight: 700; color: #0ea5e9; margin: 0; }
.cv-edu-degree { font-size: 8.5pt; font-weight: 600; color: #1e293b; margin: 0; }
.cv-edu-school { font-size: 7.5pt; color: #64748b; margin: 0; }

/* ── Langues ── */
.cv-lang-item { font-size: 8.5pt; color: #475569; margin: 0 0 3px; }

/* ── Expérience ── */
.cv-exp-item {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
  break-inside: avoid;
}
.cv-exp-item:last-child { border-bottom: none; }
.cv-exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 4px;
}
.cv-exp-role    { font-size: 9.5pt; font-weight: 700; color: #0f172a; margin: 0; }
.cv-exp-company { font-size: 8pt; color: #475569; margin: 0; }
.cv-exp-period  { font-size: 7.5pt; color: #0ea5e9; font-weight: 600; white-space: nowrap; margin: 0; text-align: right; flex-shrink: 0; }
.cv-exp-bullets { margin: 3px 0 5px 14px; padding: 0; }
.cv-exp-bullets li { font-size: 8pt; color: #475569; margin-bottom: 2px; }

/* ── Projets ── */
.cv-project-item { margin-bottom: 10px; break-inside: avoid; }
.cv-project-header { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 3px; }
.cv-project-name   { font-size: 9pt; font-weight: 700; color: #0f172a; margin: 0; }
.cv-project-tagline { font-weight: 400; color: #64748b; }
.cv-project-status { font-size: 7pt; font-weight: 600; background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; padding: 1px 6px; border-radius: 99px; white-space: nowrap; }
.cv-project-desc   { font-size: 8pt; color: #475569; margin: 0 0 5px; }

/* ── Badges tech ── */
.cv-tech-tags { display: flex; flex-wrap: wrap; gap: 3px; }
.cv-tech-tags span {
  font-size: 7pt;
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
  padding: 1px 5px;
  border-radius: 3px;
}

/* ── Impression ── */
@media print {
  .no-print    { display: none !important; }
  .cv-wrapper  { padding: 0; background: #fff; min-height: unset; }
  .cv-page     { box-shadow: none; width: 100%; min-height: unset; }
  .cv-sidebar  { background: #f8fafc !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cv-header   { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  @page        { size: A4 portrait; margin: 10mm 12mm; }
}
</style>
