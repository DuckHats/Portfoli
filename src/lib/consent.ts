import { SITE } from '@/config/site'

export type Consent = 'granted' | 'denied'
const KEY = 'dh-consent'

export function getConsent(): Consent | null {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function setConsent(value: Consent): void {
  try {
    localStorage.setItem(KEY, value)
  } catch {
    // ignore: the choice just won't persist
  }
  if (value === 'granted') loadAnalytics()
}

let loaded = false

/** Google Analytics is only injected after explicit consent. */
export function loadAnalytics(): void {
  if (loaded || typeof document === 'undefined') return
  loaded = true
  const id = SITE.analyticsId
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

  const w = window as unknown as { dataLayer: unknown[] }
  w.dataLayer = w.dataLayer || []
  const gtag = (...args: unknown[]) => {
    w.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', id, { anonymize_ip: true })
}
