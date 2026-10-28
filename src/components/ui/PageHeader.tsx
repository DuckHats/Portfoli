import type { ReactNode } from 'react'
import { Container } from './Container'

interface PageHeaderProps {
  title: string
  intro?: string
  children?: ReactNode
}

export function PageHeader({ title, intro, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b-2 border-ink">
      {/* A solid accent block anchors the title; purely decorative. */}
      <div
        aria-hidden
        className="absolute right-0 top-0 hidden h-full w-1/5 border-l-2 border-ink bg-accent sm:block"
      />
      <Container className="relative py-14 sm:py-20">
        <h1 className="max-w-4xl text-6xl leading-[0.98] sm:text-8xl">{title}</h1>
        {intro && <p className="mt-6 max-w-prose text-lg text-muted">{intro}</p>}
        {children}
      </Container>
    </header>
  )
}
