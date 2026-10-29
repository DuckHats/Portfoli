import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
      {children}
    </span>
  )
}
