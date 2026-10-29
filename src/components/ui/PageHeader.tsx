import type { ReactNode } from 'react'
import { Container } from './Container'
import { Headline } from './Headline'

interface PageHeaderProps {
  title: string
  intro?: string
  children?: ReactNode
}

/** Every inner page opens on the dark stage with its title at poster size. */
export function PageHeader({ title, intro, children }: PageHeaderProps) {
  return (
    <header data-act="ink" className="relative overflow-hidden bg-canvas text-ink">
      <div
        aria-hidden
        className="mark-mask pointer-events-none absolute -bottom-24 -right-16 hidden aspect-square w-[30rem] bg-ink/[0.06] lg:block"
      />
      <Container className="relative pb-16 pt-20 sm:pb-24 sm:pt-28">
        <Headline text={title} className="max-w-5xl text-5xl sm:text-8xl lg:text-9xl" />
        {intro && (
          <p className="line-up mt-10 max-w-prose text-lg text-muted [animation-delay:0.3s] sm:text-xl">
            {intro}
          </p>
        )}
        {children}
      </Container>
    </header>
  )
}
