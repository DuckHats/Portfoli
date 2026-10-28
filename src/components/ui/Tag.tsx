import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border-2 border-ink px-3 py-0.5 text-sm text-ink">
      {children}
    </span>
  )
}
