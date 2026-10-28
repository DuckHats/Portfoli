import type { ReactNode } from 'react'
import { Container } from './Container'

interface PageHeaderProps {
  title: string
  intro?: string
  children?: ReactNode
}

export function PageHeader({ title, intro, children }: PageHeaderProps) {
  return (
    <header className="border-b-2 border-ink bg-tint">
      <Container className="py-16 sm:py-24">
        <h1 className="max-w-3xl text-5xl leading-[1.05] sm:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-prose text-lg text-muted">{intro}</p>}
        {children}
      </Container>
    </header>
  )
}
