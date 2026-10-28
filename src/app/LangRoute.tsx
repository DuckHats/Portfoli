import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { LanguageProvider } from '@/lib/i18n'
import { detectLanguage, isLanguage, storeLanguage } from '@/lib/languages'
import { legacyPath } from '@/lib/routes'

/** Validates the `:lang` URL segment and provides it to the tree. Unknown prefixes are treated as legacy URLs. */
export function LangRoute() {
  const { lang } = useParams()
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (isLanguage(lang)) storeLanguage(lang)
  }, [lang])

  if (!isLanguage(lang)) {
    return <Navigate to={`${legacyPath(detectLanguage(), pathname)}${search}${hash}`} replace />
  }
  return (
    <LanguageProvider language={lang}>
      <Outlet />
    </LanguageProvider>
  )
}

export function RootRedirect() {
  return <Navigate to={`/${detectLanguage()}`} replace />
}
