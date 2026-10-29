import type { Language } from '@/lib/languages'

export type Localized<T = string> = Record<Language, T>
