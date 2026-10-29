import { AnimatePresence, m } from 'motion/react'
import { Suspense, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { useMessages } from '@/lib/i18n'
import { ErrorBoundary } from '../ErrorBoundary'
import { AppLink } from '../ui/AppLink'
import { buttonStyles } from '../ui/buttonStyles'
import { Container } from '../ui/Container'
import { CookieBanner } from './CookieBanner'
import { Footer } from './Footer'
import { Header } from './Header'
import { QuickSearch } from './QuickSearch'

function RouteError({ reset }: { reset: () => void }) {
  const { error } = useMessages()
  return (
    <Container className="py-24">
      <h1 className="text-4xl">{error.title}</h1>
      <p className="mt-3 text-muted">{error.body}</p>
      <button type="button" onClick={reset} className={`${buttonStyles()} mt-6`}>
        {error.retry}
      </button>
    </Container>
  )
}

function PageFallback() {
  // Tall enough to keep the footer below the fold while the page chunk loads (no layout shift).
  return <div className="min-h-screen" aria-hidden />
}

export function Layout() {
  const { a11y } = useMessages()
  const { pathname } = useLocation()
  // The page identity without its language prefix: switching language re-renders the same page in
  // place instead of playing a page transition (an exiting page re-rendered in the new language
  // never finished leaving and left the curtain covering the screen).
  const pageKey = pathname.replace(/^\/[^/]+/, '') || '/'
  const mainRef = useRef<HTMLElement>(null)
  const outlet = useOutlet()

  // Once the old page has left: reset scroll and move focus to <main>, so keyboard and
  // screen-reader users land on the new page.
  const onPageLeft = () => {
    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only z-50 rounded bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {a11y.skipToContent}
      </a>
      <Header />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
        {/*
          Page change as a curtain: a dark panel rises over the old page, the new page mounts behind it
          and the panel lifts away. The first load is not animated. Nothing here reads the reduced-motion
          preference while rendering (a re-render would undo the prerendered HTML's hydration): CSS
          hides the curtain and the page simply changes.
        */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={onPageLeft}>
          <m.div key={pageKey} exit={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {/* Always rendered (the prerendered HTML has it too); reduced motion hides it in CSS. */}
            <m.div
              aria-hidden
              data-curtain
              data-act="ink"
              className="pointer-events-none fixed inset-0 z-[55] bg-canvas motion-reduce:hidden"
              initial={{ scaleY: 1, originY: 0 }}
              animate={{
                scaleY: 0,
                originY: 0,
                transition: { duration: 0.3, ease: [0.65, 0, 0.35, 1] },
              }}
              exit={{
                scaleY: 1,
                originY: 1,
                transition: { duration: 0.25, ease: [0.65, 0, 0.35, 1] },
              }}
              style={{ scaleY: 0 }}
            />
            <ErrorBoundary fallback={(reset) => <RouteError reset={reset} />}>
              <Suspense fallback={<PageFallback />}>{outlet}</Suspense>
            </ErrorBoundary>
          </m.div>
        </AnimatePresence>
      </main>
      <Footer />
      <CookieBanner />
      <QuickSearch />
    </div>
  )
}

export function BackLink({ to, children }: { to: 'projects' | 'home'; children: string }) {
  return (
    <AppLink to={to} className="text-sm text-muted transition-colors hover:text-ink">
      ← {children}
    </AppLink>
  )
}
