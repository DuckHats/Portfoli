import { useEffect, useState } from 'react'
import { useHydrated } from '@/hooks/useHydrated'
import { useLanguage, useMessages } from '@/lib/i18n'
import { catalanTime } from '@/lib/time'

/** A live clock for the studio's local time; it ticks every 20 seconds. */
export function LocalTime() {
  const { footer } = useMessages()
  const language = useLanguage()
  // Shown only in the browser, so the prerendered page never shows the build's time.
  const hydrated = useHydrated()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 20_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <p className="flex items-center gap-2 text-sm text-ink/70">
      <span aria-hidden className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      {footer.localTime}{' '}
      {hydrated && (
        <time className="font-semibold tabular-nums text-ink" dateTime={now.toISOString()}>
          {catalanTime(now, language)}
        </time>
      )}
    </p>
  )
}
