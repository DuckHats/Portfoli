import '@fontsource-variable/inter'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/jetbrains-mono/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { getConsent, loadAnalytics } from './lib/consent'
import './index.css'

// Analytics only runs after the visitor has accepted it (see CookieBanner).
if (getConsent() === 'granted') loadAnalytics()

const root = document.getElementById('root')
if (!root) throw new Error('Missing #root element')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
