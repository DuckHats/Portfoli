import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Suspense, lazy, useRef } from 'react'
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

const StageCursor = lazy(() => import('../ui/StageCursor'))
// Only mouse users ever see the cursor, so nobody else downloads it.
const finePointer = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

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
  const mainRef = useRef<HTMLElement>(null)
  const outlet = useOutlet()
  const reduce = useReducedMotion()

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
          and the panel lifts away. The first load is not animated; reduced motion gets a plain fade.
        */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={onPageLeft}>
          <m.div
            key={pathname}
            initial={{ opacity: reduce ? 0 : 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduce ? 0 : 1 }}
            transition={{ duration: reduce ? 0.15 : 0.3 }}
          >
            {!reduce && (
              <m.div
                aria-hidden
                data-act="ink"
                className="pointer-events-none fixed inset-0 z-[55] bg-canvas"
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
            )}
            <ErrorBoundary fallback={(reset) => <RouteError reset={reset} />}>
              <Suspense fallback={<PageFallback />}>{outlet}</Suspense>
            </ErrorBoundary>
          </m.div>
        </AnimatePresence>
      </main>
      <Footer />
      <CookieBanner />
      <QuickSearch />
      {finePointer() && (
        <Suspense fallback={null}>
          <StageCursor />
        </Suspense>
      )}
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
