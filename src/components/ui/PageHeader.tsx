import type { ReactNode } from 'react'
import { Container } from './Container'

interface PageHeaderProps {
  title: string
  intro?: string
  eyebrow?: string
  children?: ReactNode
}

export function PageHeader({ title, intro, eyebrow, children }: PageHeaderProps) {
  return (
    <header className="border-b border-line">
      <Container className="py-16 sm:py-20">
        {eyebrow && (
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-prose text-lg text-muted">{intro}</p>}
        {children}
      </Container>
    </header>
  )
}
