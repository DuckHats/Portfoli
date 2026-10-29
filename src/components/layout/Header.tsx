import { Menu, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useActiveAct } from '@/hooks/useActiveAct'
import { SITE } from '@/config/site'
import { useLanguage, useMessages } from '@/lib/i18n'
import { AppLink, AppNavLink } from '../ui/AppLink'
import { buttonStyles } from '../ui/buttonStyles'
import { Container } from '../ui/Container'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import { PRIMARY_NAV } from './navigation'
import { openQuickSearch } from './quickSearchEvent'
import { ScrollProgress } from './ScrollProgress'

const linkStyles = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'text-ink underline decoration-accent decoration-2 underline-offset-[10px]'
      : 'text-muted hover:text-ink'
  }`

export function Header() {
  const { nav, a11y, palette } = useMessages()
  const language = useLanguage()
  const { pathname } = useLocation()
  // The menu is open only for the page it was opened on, so navigating or switching language closes it.
  const pageKey = `${language}:${pathname}`
  const [openKey, setOpenKey] = useState<string | null>(null)
  const open = openKey === pageKey
  // The bar takes the colours of the act scrolling under it.
  const act = useActiveAct()

  const toggle = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)

  // Opening the menu moves focus into it; Escape closes it and returns focus to the toggle.
  useEffect(() => {
    if (!open) return
    menu.current?.querySelector<HTMLElement>('a, button')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpenKey(null)
      toggle.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      data-act={act === 'paper' ? undefined : act}
      className="sticky top-0 z-40 bg-canvas text-ink transition-colors duration-500"
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        <AppLink to="home" aria-label={SITE.name} className="flex items-center rounded-full p-1">
          <span aria-hidden className="mark-mask h-10 w-10 bg-ink" />
        </AppLink>

        <nav aria-label={a11y.mainNav} className="hidden items-center md:flex">
          {PRIMARY_NAV.map((key) => (
            <AppNavLink key={key} to={key} className={linkStyles}>
              {nav[key]}
            </AppNavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={openQuickSearch}
            aria-keyshortcuts="Control+K Meta+K"
            className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:bg-ink/10 hover:text-ink"
          >
            <Search size={16} aria-hidden />
            <span className="sr-only">{palette.open}</span>
            <kbd className="hidden font-sans text-xs lg:inline">Ctrl K</kbd>
          </button>
          <LanguageSwitcher />
          <ThemeToggle />
          <AppLink to="contact" className={buttonStyles({ variant: 'primary' })}>
            {nav.cta}
          </AppLink>
        </div>

        <button
          ref={toggle}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/30 hover:bg-ink/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? a11y.closeMenu : a11y.openMenu}
          onClick={() => setOpenKey(open ? null : pageKey)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </Container>
      <ScrollProgress />

      {open && (
        <div ref={menu} id="mobile-menu" className="border-t border-ink/15 bg-canvas md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <nav aria-label={a11y.mainNav} className="flex flex-col">
              {PRIMARY_NAV.map((key) => (
                <AppNavLink
                  key={key}
                  to={key}
                  className={(state) =>
                    `${linkStyles(state)} py-3 font-display text-3xl font-black uppercase`
                  }
                >
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
