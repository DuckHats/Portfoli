import type { ReactNode } from 'react'

interface BrowserFrameProps {
  /** Address shown in the bar. Omit it for a bare title bar. */
  url?: string
  children: ReactNode
  className?: string
}

/** A browser window around a real screenshot. Decorative chrome is hidden from assistive tech. */
export function BrowserFrame({ url, children, className = '' }: BrowserFrameProps) {
  return (
    <div className={`overflow-hidden border border-ink bg-surface ${className}`}>
      <div aria-hidden className="flex items-center gap-3 border-b border-ink bg-tint px-4 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-accent" />
          <i className="h-2.5 w-2.5 rounded-full border border-ink" />
          <i className="h-2.5 w-2.5 rounded-full border border-ink" />
        </span>
        {url && (
          <span className="mx-auto max-w-[70%] truncate border border-ink bg-surface px-3 py-0.5 text-xs text-ink">
            {url}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
