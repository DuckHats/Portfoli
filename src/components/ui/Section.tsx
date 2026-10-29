import type { ReactNode } from 'react'
import { Container } from './Container'

interface SectionProps {
  id?: string
  /** Position on the sheet, shown as a monospaced index in the margin. */
  no?: string
  title: string
  intro?: string
  action?: ReactNode
  tone?: 'default' | 'tint'
  children: ReactNode
}

export function Section({
  id,
  no,
  title,
  intro,
  action,
  tone = 'default',
  children,
}: SectionProps) {
  const headingId = id ? `${id}-title` : undefined
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`overflow-x-clip border-t border-ink py-20 sm:py-28 ${tone === 'tint' ? 'bg-tint' : ''}`}
    >
      <Container>
        <div className="mb-12 grid gap-4 sm:mb-16 lg:grid-cols-12 lg:gap-8">
          {no && (
            <p aria-hidden className="meta lg:col-span-2">
              {no}
            </p>
          )}
          <div className="lg:col-span-7">
            <h2 id={headingId} className="text-5xl leading-[0.95] sm:text-7xl">
              {title}
            </h2>
            {intro && <p className="mt-6 max-w-prose text-lg text-muted">{intro}</p>}
          </div>
          {action && <div className="lg:col-span-3 lg:self-end lg:justify-self-end">{action}</div>}
        </div>
        {children}
      </Container>
    </section>
  )
}
