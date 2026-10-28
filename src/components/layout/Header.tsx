import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE } from '@/config/site'
import { useLanguage, useMessages } from '@/lib/i18n'
import { AppLink, AppNavLink } from '../ui/AppLink'
import { buttonStyles } from '../ui/buttonStyles'
import { Container } from '../ui/Container'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import { PRIMARY_NAV } from './navigation'

const linkStyles = ({ isActive }: { isActive: boolean }) =>
  `rounded px-3 py-2 text-sm transition-colors ${
    isActive ? 'text-ink' : 'text-muted hover:text-ink'
  }`

export function Header() {
  const { nav, a11y } = useMessages()
  const language = useLanguage()
  const { pathname } = useLocation()
  // The menu is open only for the page it was opened on, so navigating or switching language closes it.
  const pageKey = `${language}:${pathname}`
  const [openKey, setOpenKey] = useState<string | null>(null)
  const open = openKey === pageKey

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpenKey(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <AppLink to="home" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <img src={SITE.logo} alt="" width={32} height={32} className="h-8 w-8 dark:invert" />
          <span>{SITE.name}</span>
        </AppLink>

        <nav aria-label={a11y.mainNav} className="hidden items-center md:flex">
          {PRIMARY_NAV.map((key) => (
            <AppNavLink key={key} to={key} className={linkStyles}>
              {nav[key]}
            </AppNavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <AppLink to="contact" className={buttonStyles({ variant: 'primary' })}>
            {nav.cta}
          </AppLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded hover:bg-ink/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? a11y.closeMenu : a11y.openMenu}
          onClick={() => setOpenKey(open ? null : pageKey)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-canvas md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <nav aria-label={a11y.mainNav} className="flex flex-col">
              {PRIMARY_NAV.map((key) => (
                <AppNavLink key={key} to={key} className={(s) => `${linkStyles(s)} py-3 text-base`}>
                  {nav[key]}
                </AppNavLink>
              ))}
            </nav>
            <div className="mt-3 flex items-center justify-between">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <AppLink to="contact" className={`${buttonStyles({ variant: 'primary' })} mt-3`}>
              {nav.cta}
            </AppLink>
          </Container>
        </div>
      )}
    </header>
  )
}
