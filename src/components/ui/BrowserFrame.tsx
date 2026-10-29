import type { ReactNode } from 'react'

interface BrowserFrameProps {
  /** Address shown in the bar. Omit it for a bare title bar. */
  url?: string
  children: ReactNode
  className?: string
}

/**
 * A browser window around a real screenshot. The deep, soft shadow is what sells the depth when
 * the window tilts in 3D. Decorative chrome is hidden from assistive tech.
 */
export function BrowserFrame({ url, children, className = '' }: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-surface shadow-[0_50px_100px_-30px_rgb(0_0_0/0.55)] ring-1 ring-ink/15 ${className}`}
    >
      <div aria-hidden className="flex items-center gap-3 bg-tint px-4 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-accent" />
          <i className="h-2.5 w-2.5 rounded-full bg-ink/25" />
          <i className="h-2.5 w-2.5 rounded-full bg-ink/25" />
        </span>
        {url && (
          <span className="mx-auto max-w-[70%] truncate rounded-full bg-surface px-3 py-0.5 text-xs text-muted">
            {url}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
