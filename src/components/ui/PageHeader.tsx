import type { ReactNode } from 'react'
import { Container } from './Container'
import { Dimension } from './Dimension'

interface PageHeaderProps {
  title: string
  intro?: string
  children?: ReactNode
}

export function PageHeader({ title, intro, children }: PageHeaderProps) {
  return (
    <header className="border-b border-ink">
      <Container className="py-14 sm:py-24">
        <h1 className="max-w-5xl text-7xl leading-[0.9] sm:text-[9rem]">{title}</h1>
        <Dimension label="DuckHats" className="mt-8 max-w-xl" />
        <div className="mt-8 grid lg:grid-cols-12">
          {intro && (
            <p className="max-w-prose text-lg text-muted lg:col-span-6 lg:col-start-4">{intro}</p>
          )}
        </div>
        {children}
      </Container>
    </header>
  )
}
