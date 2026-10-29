import { Link, useLocation } from 'react-router-dom'
import { useLanguage, useMessages } from '@/lib/i18n'
import { LANGUAGES, LANGUAGE_NAMES, storeLanguage } from '@/lib/languages'
import { switchLanguagePath } from '@/lib/routes'

export function LanguageSwitcher() {
  const current = useLanguage()
  const { pathname, search } = useLocation()
  const { a11y } = useMessages()

  return (
    <nav aria-label={a11y.language} className="flex items-center gap-1 text-xs font-medium">
      {LANGUAGES.map((language) => (
        <Link
          key={language}
          to={`${switchLanguagePath(pathname, language)}${search}`}
          hrefLang={language}
          lang={language}
          title={LANGUAGE_NAMES[language]}
          aria-current={language === current ? 'true' : undefined}
          onClick={() => storeLanguage(language)}
          className={`inline-flex min-h-7 items-center px-2.5 uppercase transition-colors ${
            language === current ? 'bg-ink text-canvas' : 'text-muted hover:text-ink'
          }`}
        >
          {/* The visible code is part of the name (WCAG 2.5.3); the full name follows for AT. */}
          {language}
          <span className="sr-only"> · {LANGUAGE_NAMES[language]}</span>
        </Link>
      ))}
    </nav>
  )
}
