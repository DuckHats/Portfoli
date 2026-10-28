import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-tint px-3 py-1 text-sm text-ink/80">
      {children}
    </span>
  )
}
