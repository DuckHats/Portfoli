import { useState } from 'react'
import { getConsent, setConsent } from '@/lib/consent'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { buttonStyles } from '../ui/buttonStyles'

export function CookieBanner() {
  const { cookies } = useMessages()
  const [visible, setVisible] = useState(() => getConsent() === null)
  if (!visible) return null

  const choose = (value: 'granted' | 'denied') => {
    setConsent(value)
    setVisible(false)
  }

  return (
    <aside
      aria-label={cookies.title}
      data-act="ink"
      className="fixed inset-x-4 bottom-4 z-50 max-w-sm rounded-2xl bg-canvas p-5 text-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)] sm:left-6 sm:right-auto"
    >
      <p className="text-sm text-muted">
        {cookies.text}{' '}
        <AppLink to="privacy" className="link-underline pb-0.5 text-ink">
          {cookies.more}
        </AppLink>
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={() => choose('granted')} className={buttonStyles()}>
          {cookies.accept}
        </button>
        <button
          type="button"
          onClick={() => choose('denied')}
          className={buttonStyles({ variant: 'secondary' })}
        >
          {cookies.reject}
        </button>
      </div>
    </aside>
  )
}
