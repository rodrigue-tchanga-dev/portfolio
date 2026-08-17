import memoireLesson1Fr from './csharp-memoire/fr/01-comprendre-la-memoire-en-csharp.md?raw'
import memoireLesson1En from './csharp-memoire/en/01-comprendre-la-memoire-en-csharp.md?raw'
import memoireLesson2Fr from './csharp-memoire/fr/02-espace-occupe-en-memoire.md?raw'
import memoireLesson2En from './csharp-memoire/en/02-espace-occupe-en-memoire.md?raw'
import memoireLesson3Fr from './csharp-memoire/fr/03-pourquoi-long-occupe-8-octets.md?raw'
import memoireLesson3En from './csharp-memoire/en/03-pourquoi-long-occupe-8-octets.md?raw'
import memoireLesson4Fr from './csharp-memoire/fr/04-pourquoi-bool-occupe-1-octet.md?raw'
import memoireLesson4En from './csharp-memoire/en/04-pourquoi-bool-occupe-1-octet.md?raw'
import memoireLesson5Fr from './csharp-memoire/fr/05-Le processeur.md?raw'
import memoireLesson5En from './csharp-memoire/en/05-Le processeur.md?raw'
import memoireLesson6Fr from './csharp-memoire/fr/06-pourquoi-string-n-occupe-pas-taille-fixe.md?raw'
import memoireLesson6En from './csharp-memoire/en/06-pourquoi-string-n-occupe-pas-taille-fixe.md?raw'

// Une "série" regroupe plusieurs cours ordonnés sur un même sujet.
// Pour ajouter une nouvelle série : dupliquer un bloc, créer le dossier
// src/courses/<series-id>/{fr,en}/ et importer les .md correspondants.
export const series = [
  {
    id: 'csharp-memoire',
    tags: ['C#', 'Mémoire'],
    name: {
      fr: 'Comprendre la mémoire en C#',
      en: 'Understanding Memory in C#',
    },
    description: {
      fr: 'Une série de cours pas à pas pour comprendre comment un programme C# utilise la mémoire : RAM, adresses, stack, heap, et plus encore.',
      en: 'A step-by-step series of lessons on how a C# program uses memory: RAM, addresses, stack, heap, and more.',
    },
    lessons: [
      {
        slug: 'comprendre-la-memoire-en-csharp',
        date: '2026-07-01',
        readTime: 6,
        title: {
          fr: 'Cours 1 — La mémoire (RAM)',
          en: 'Lesson 1 — Memory (RAM)',
        },
        summary: {
          fr: 'Qu\'est-ce que la RAM, pourquoi les adresses mémoire existent, et pourquoi on donne un nom à une variable.',
          en: 'What RAM is, why memory addresses exist, and why we name variables.',
        },
        content: { fr: memoireLesson1Fr, en: memoireLesson1En },
      },
      {
        slug: 'espace-occupe-en-memoire',
        date: '2026-07-04',
        readTime: 6,
        title: {
          fr: 'Cours 2 — L\'espace occupé en mémoire',
          en: 'Lesson 2 — Memory footprint',
        },
        summary: {
          fr: 'Pourquoi un int occupe exactement 4 octets, et comment une valeur est réellement représentée en mémoire.',
          en: 'Why an int takes exactly 4 bytes, and how a value is actually represented in memory.',
        },
        content: { fr: memoireLesson2Fr, en: memoireLesson2En },
      },
      {
        slug: 'pourquoi-long-occupe-8-octets',
        date: '2026-07-07',
        readTime: 6,
        title: {
          fr: 'Cours 3 — Pourquoi long occupe 8 octets',
          en: 'Lesson 3 — Why long* takes 8 bytes',
        },
        summary: {
          fr: 'Pourquoi un pointeur occupe exactement 8 octets, et comment une adresse est réellement représentée en mémoire.',
          en: 'Why a pointer takes exactly 8 bytes, and how an address is actually represented in memory.',
        },
        content: { fr: memoireLesson3Fr, en: 'memoireLesson3En' },
      },
      {
        slug: 'pourquoi-bit-occupe-1-octet',
        date: '2026-07-10',
        readTime: 6,
        title: {
          fr: 'Cours 4 — Pourquoi bool occupe 1 octet',
          en: 'Lesson 4 — Why bool takes 1 byte',
        },
        summary: {
          fr: 'Pourquoi un booléen occupe exactement 1 octet, et comment une valeur booléenne est réellement représentée en mémoire.',
          en: 'Why a boolean takes exactly 1 byte, and how a boolean value is actually represented in memory.',
        },
        content: { fr: memoireLesson4Fr, en: memoireLesson4En },
      },
      {
        slug: 'le-processeur',
        date: '2026-07-13',
        readTime: 6,
        title: {
          fr: 'Cours 5 — Le processeur',
          en: 'Lesson 5 — The CPU',
        },
        summary: {
          fr: 'Comment le processeur lit et écrit des valeurs en mémoire, et comment il exécute les instructions d\'un programme.',
          en: 'How the CPU reads and writes values in memory, and how it executes the instructions of a program.',
        },
        content: { fr: memoireLesson5Fr, en: memoireLesson5En },
      },
      {
        slug: 'pourquoi-string-n-occupe-pas-taille-fixe',
        date: '2026-07-16',
        readTime: 6,
        title: {
          fr: 'Cours 6 — Pourquoi string n\'occupe pas une taille fixe',
          en: 'Lesson 6 — Why string does not have a fixed size',
        },
        summary: {
          fr: 'Pourquoi une chaîne de caractères n\'occupe pas une taille fixe en mémoire, et comment elle est réellement représentée.',
          en: 'Why a string does not have a fixed size in memory, and how it is actually represented.',
        },
        content: { fr: memoireLesson6Fr, en: memoireLesson6En },
      }
    ],
  },
]

export function findSeries(seriesId) {
  return series.find(s => s.id === seriesId) || null
}

export function findLesson(seriesId, slug) {
  const s = findSeries(seriesId)
  if (!s) return null
  const index = s.lessons.findIndex(l => l.slug === slug)
  if (index === -1) return null
  return { series: s, lesson: s.lessons[index], index }
}
