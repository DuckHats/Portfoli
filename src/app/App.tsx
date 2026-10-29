import { lazy } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { HomePage } from '@/pages/HomePage'
import { LangRoute, RootRedirect } from './LangRoute'

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

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path=":lang" element={<LangRoute />}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="privacy" element={<LegalPage kind="privacy" />} />
          <Route path="legal" element={<LegalPage kind="legal" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export function App() {
  return (
    <HelmetProvider>
      <MotionProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MotionProvider>
    </HelmetProvider>
  )
}
