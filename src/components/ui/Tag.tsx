import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-ink px-3 py-0.5 font-mono text-xs uppercase tracking-wider text-ink">
      {children}
    </span>
  )
}
