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
          aria-label={LANGUAGE_NAMES[language]}
          aria-current={language === current ? 'true' : undefined}
          onClick={() => storeLanguage(language)}
          className={`rounded-full px-2.5 py-1.5 uppercase transition-colors ${
            language === current ? 'bg-tint text-ink' : 'text-muted hover:text-ink'
          }`}
        >
          {language}
        </Link>
      ))}
    </nav>
  )
}
