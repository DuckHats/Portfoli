import type { ReactNode } from 'react'
import { Container } from './Container'

interface SectionProps {
  id?: string
  eyebrow?: string
  title: string
  intro?: string
  action?: ReactNode
  tone?: 'default' | 'muted'
  children: ReactNode
}

export function Section({
  id,
  eyebrow,
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
      className={`py-16 sm:py-24 ${tone === 'muted' ? 'border-y border-line bg-surface' : ''}`}
    >
      <Container>
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-prose">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
                {eyebrow}
              </p>
            )}
            <h2 id={headingId} className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
          </div>
          {action}
        </div>
        {children}
      </Container>
    </section>
  )
}
