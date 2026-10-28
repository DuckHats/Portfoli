import type { ReactNode } from 'react'

interface BrowserFrameProps {
  /** Address shown in the pill. Omit it for a bare title bar. */
  url?: string
  children: ReactNode
  className?: string
}

/** A browser window around a real screenshot. Decorative chrome is hidden from assistive tech. */
export function BrowserFrame({ url, children, className = '' }: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-xl shadow-ink/15 ${className}`}
    >
      <div aria-hidden className="flex items-center gap-3 border-b border-line bg-tint px-4 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-ink/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-ink/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-ink/20" />
        </span>
        {url && (
          <span className="mx-auto max-w-[70%] truncate rounded-full bg-surface px-4 py-1 text-xs text-muted">
            {url}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
