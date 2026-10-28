/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { Messages, MessageKey } from '@/content/messages'
import { interpolate, messages, resolveMessage } from '@/content/messages'
import type { Localized } from '@/content/types'
import type { Language } from './languages'

const LanguageContext = createContext<Language | null>(null)

export function LanguageProvider({
  language,
  children,
}: {
  language: Language
  children: ReactNode
}) {
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>
}

export function useLanguage(): Language {
  const language = useContext(LanguageContext)
  if (!language) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return language
}

export function useMessages(): Messages {
  return messages[useLanguage()]
}

export function useT() {
  const table = useMessages()
  return useCallback(
    (key: MessageKey, values?: Record<string, string | number>) => {
      const text = resolveMessage(table, key)
      return values ? interpolate(text, values) : text
    },
    [table],
  )
}

/** Pick the current language from a `{ca, es, en}` object. */
export function useLocalize() {
  const language = useLanguage()
  return useMemo(
    () =>
      <T,>(value: Localized<T>): T =>
        value[language],
    [language],
  )
}
