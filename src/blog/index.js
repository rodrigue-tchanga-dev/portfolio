import githubActionsFr from './fr/github-actions-vue3.md?raw'
import githubActionsEn from './en/github-actions-vue3.md?raw'
import devCanadaFr from './fr/dev-canada.md?raw'
import devCanadaEn from './en/dev-canada.md?raw'

export const posts = [
  {
    slug: 'github-actions-vue3',
    date: '2026-05-01',
    tags: ['Vue 3', 'GitHub Actions', 'DevOps'],
    readTime: 4,
    title: {
      fr: 'Déployer un site Vue 3 sur GitHub Pages avec GitHub Actions',
      en: 'Deploy a Vue 3 Site to GitHub Pages with GitHub Actions',
    },
    summary: {
      fr: 'Mise en place d\'un pipeline CI/CD complet pour un site statique : de Vite à GitHub Pages en moins de 30 minutes, sans serveur ni coût.',
      en: 'Setting up a complete CI/CD pipeline for a static site: from Vite to GitHub Pages in under 30 minutes, no server, no cost.',
    },
    content: { fr: githubActionsFr, en: githubActionsEn },
  },
  {
    slug: 'dev-canada',
    date: '2026-04-15',
    tags: ['Carrière', 'Canada', '.NET'],
    readTime: 5,
    title: {
      fr: 'De la France au Canada — développeur .NET à Montréal',
      en: 'From France to Canada — .NET Developer in Montreal',
    },
    summary: {
      fr: 'Retour d\'expérience sur 9 mois de mission chez Desjardins à Montréal : culture d\'équipe, migration technique et conseils pratiques.',
      en: 'Feedback on 9 months at Desjardins in Montreal: team culture, technical migration, and practical tips.',
    },
    content: { fr: devCanadaFr, en: devCanadaEn },
  },
]
