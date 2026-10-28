export const LANGUAGES = ['ca', 'es', 'en'] as const
export type Language = (typeof LANGUAGES)[number]
export const DEFAULT_LANGUAGE: Language = 'ca'

export const LANGUAGE_NAMES: Record<Language, string> = {
  ca: 'Català',
  es: 'Español',
  en: 'English',
}

export const isLanguage = (value: unknown): value is Language =>
  typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value)

const STORAGE_KEY = 'dh-lang'

export function readStoredLanguage(): Language | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isLanguage(stored) ? stored : null
  } catch {
    return null
  }
}

export function storeLanguage(language: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, language)
  } catch {
    // storage can be blocked (private mode); the URL still carries the language
  }
}

export function detectLanguage(): Language {
  const stored = readStoredLanguage()
  if (stored) return stored
  const preferred = typeof navigator === 'undefined' ? [] : (navigator.languages ?? [])
  for (const tag of preferred) {
    const base = tag.toLowerCase().split('-')[0]
    if (isLanguage(base)) return base
  }
  return DEFAULT_LANGUAGE
}
