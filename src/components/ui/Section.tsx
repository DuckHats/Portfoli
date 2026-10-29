import type { ReactNode } from 'react'
import type { Act } from '@/hooks/useActiveAct'
import { Container } from './Container'
import { Headline } from './Headline'

interface SectionProps {
  id?: string
  act?: Act
  /** Short label above the title (e.g. its position on the page). */
  label?: string
  title: string
  intro?: string
  action?: ReactNode
  children: ReactNode
}

/** A full-bleed "act": its own background and colours, an oversized title and the content. */
export function Section({
  id,
  act = 'paper',
  label,
  title,
  intro,
  action,
  children,
}: SectionProps) {
  const headingId = id ? `${id}-title` : undefined
  return (
    <section
      id={id}
      data-act={act}
      aria-labelledby={headingId}
      className="overflow-x-clip bg-canvas py-24 text-ink sm:py-32"
    >
      <Container>
        <div className="mb-14 grid gap-8 sm:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-12 xl:col-span-9">
            {label && (
              <p aria-hidden className="label mb-6">
                {label}
              </p>
            )}
            <Headline
              as="h2"
              id={headingId}
              text={title}
              className="text-[2.3rem] sm:text-5xl md:text-6xl lg:text-7xl"
            />
            {intro && <p className="mt-8 max-w-prose text-lg text-muted">{intro}</p>}
          </div>
          {action && (
            <div className="lg:col-span-12 xl:col-span-3 xl:justify-self-end">{action}</div>
          )}
        </div>
        {children}
      </Container>
    </section>
  )
}
