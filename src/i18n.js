import { ref, computed } from 'vue'
import fr from './locales/fr.js'
import en from './locales/en.js'

export const lang = ref('fr')

export const t = computed(() => lang.value === 'fr' ? fr : en)

export function toggleLang() {
  lang.value = lang.value === 'fr' ? 'en' : 'fr'
}
