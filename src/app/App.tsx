import type { FeatureBundle } from 'motion/react'
import { lazy } from 'react'
import type { ReactElement } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { HomePage } from '@/pages/HomePage'
import { LANGUAGES } from '@/lib/languages'
import type { RouteKey } from '@/lib/routes'
import { ROUTES, routePath } from '@/lib/routes'
import { LangRoute, LegacyRedirect, RootRedirect } from './LangRoute'

const named = <T extends Record<string, React.ComponentType<never>>>(
  load: () => Promise<T>,
  name: keyof T,
) => lazy(() => load().then((m) => ({ default: m[name] as React.ComponentType })))

const ServicesPage = named(() => import('@/pages/ServicesPage'), 'ServicesPage')
const ProjectsPage = named(() => import('@/pages/ProjectsPage'), 'ProjectsPage')
const ProjectDetailPage = named(() => import('@/pages/ProjectDetailPage'), 'ProjectDetailPage')
const AboutPage = named(() => import('@/pages/AboutPage'), 'AboutPage')
const ContactPage = named(() => import('@/pages/ContactPage'), 'ContactPage')
const CareersPage = named(() => import('@/pages/CareersPage'), 'CareersPage')
const LegalPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NotFoundPage = named(() => import('@/pages/NotFoundPage'), 'NotFoundPage')

/** The page for each route key; slugs per language come from ROUTES. */
const PAGES: Record<Exclude<RouteKey, 'home'>, ReactElement> = {
  services: <ServicesPage />,
  projects: <ProjectsPage />,
  about: <AboutPage />,
  contact: <ContactPage />,
  careers: <CareersPage />,
  privacy: <LegalPage kind="privacy" />,
  legal: <LegalPage kind="legal" />,
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      {LANGUAGES.map((language) => (
        <Route key={language} path={language} element={<LangRoute language={language} />}>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            {ROUTES.filter((route) => route.key !== 'home').map((route) => (
              <Route
                key={route.key}
                path={routePath(language, route.key)}
                element={PAGES[route.key as Exclude<RouteKey, 'home'>]}
              />
            ))}
            <Route
              path={`${routePath(language, 'projects')}/:projectId`}
              element={<ProjectDetailPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      ))}
      <Route path="*" element={<LegacyRedirect />} />
    </Routes>
  )
}

export function App({ motionFeatures }: { motionFeatures?: FeatureBundle }) {
  return (
    <HelmetProvider>
      <MotionProvider features={motionFeatures}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MotionProvider>
    </HelmetProvider>
  )
}
