import type { ReactNode } from 'react'
import { Container } from './Container'
import { Emphasis } from './Emphasis'

interface SectionProps {
  id?: string
  title: string
  intro?: string
  action?: ReactNode
  tone?: 'default' | 'tint'
  children: ReactNode
}

export function Section({ id, title, intro, action, tone = 'default', children }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`overflow-x-clip py-20 sm:py-28 ${tone === 'tint' ? 'bg-tint/60' : ''}`}
    >
      <Container>
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 id={headingId} className="text-4xl sm:text-5xl">
              <Emphasis text={title} />
            </h2>
            {intro && <p className="mt-5 text-lg text-muted">{intro}</p>}
          </div>
          {action}
        </div>
        {children}
      </Container>
    </section>
  )
}
