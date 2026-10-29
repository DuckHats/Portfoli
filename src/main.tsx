import '@fontsource-variable/inter'
import '@fontsource-variable/archivo/wdth.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './app/App'
import { loadFeatures } from './components/motion/loadFeatures'
import { getConsent, loadAnalytics } from './lib/consent'
import './index.css'

// Google Analytics only runs after the visitor has accepted it (see CookieBanner).
if (getConsent() === 'granted') loadAnalytics()
// Vercel Web Analytics: cookieless, aggregate page views (also on client-side navigation), so it
// needs no consent (it is listed in the privacy policy). Loaded apart to keep the entry small.
void import('@vercel/analytics').then(({ inject }) => inject())

const root = document.getElementById('root')
if (!root) throw new Error('Missing #root element')

// Built pages ship prerendered HTML (src/entry-server.tsx): take it over instead of repainting it.
// The animation engine is loaded first, so no late update disturbs hydration. The dev server starts
// empty and renders as usual.
if (root.hasChildNodes()) {
  void loadFeatures().then((motionFeatures) =>
    hydrateRoot(
      root,
      <StrictMode>
        <App motionFeatures={motionFeatures} />
      </StrictMode>,
    ),
  )
} else {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
