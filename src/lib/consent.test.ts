import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('consent', () => {
  beforeEach(() => {
    vi.resetModules()
    document.head.querySelectorAll('script').forEach((s) => s.remove())
  })

  it('reads and writes the stored choice', async () => {
    const { getConsent, setConsent } = await import('./consent')
    expect(getConsent()).toBeNull()
    setConsent('denied')
    expect(getConsent()).toBe('denied')
  })

  it('ignores unknown stored values', async () => {
    localStorage.setItem('dh-consent', 'maybe')
    const { getConsent } = await import('./consent')
    expect(getConsent()).toBeNull()
  })

  it('does not load analytics when the visitor rejects', async () => {
    const { setConsent } = await import('./consent')
    setConsent('denied')
    expect(document.head.querySelector('script[src*="googletagmanager"]')).toBeNull()
  })

  it('loads analytics once when the visitor accepts', async () => {
    const { setConsent, loadAnalytics } = await import('./consent')
    setConsent('granted')
    loadAnalytics()
    expect(document.head.querySelectorAll('script[src*="googletagmanager"]')).toHaveLength(1)
  })
})
