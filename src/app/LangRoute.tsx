import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LanguageProvider } from '@/lib/i18n'
import type { Language } from '@/lib/languages'
import { detectLanguage, storeLanguage } from '@/lib/languages'
import { legacyPath, switchLanguagePath } from '@/lib/routes'

/**
 * Provides the language of its branch of the route tree. A slug from another language or an old
 * one (`/ca/services`, `/es/team`) is sent to the right URL; the server does the same with
 * permanent redirects (vercel.json).
 */
export function LangRoute({ language }: { language: Language }) {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    storeLanguage(language)
  }, [language])

  const canonical = switchLanguagePath(pathname, language)
  if (canonical !== (pathname.replace(/\/+$/, '') || '/')) {
    return <Navigate to={`${canonical}${search}${hash}`} replace />
  }
  return (
    <LanguageProvider language={language}>
      <Outlet />
    </LanguageProvider>
  )
}

/** URLs without a language prefix, from older versions of the site. */
export function LegacyRedirect() {
  const { pathname, search, hash } = useLocation()
  return <Navigate to={`${legacyPath(detectLanguage(), pathname)}${search}${hash}`} replace />
}

export function RootRedirect() {
  return <Navigate to={`/${detectLanguage()}`} replace />
}
