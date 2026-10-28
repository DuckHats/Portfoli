import { ArrowRight } from 'lucide-react'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Container } from '../ui/Container'

export function CtaBand() {
  const { home } = useMessages()
  const { cta } = home
  return (
    <section aria-labelledby="cta-title" className="border-t border-line bg-ink text-canvas">
      <Container className="flex flex-col gap-8 py-16 sm:py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 id="cta-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {cta.title}
          </h2>
          <p className="mt-3 text-lg opacity-70">{cta.description}</p>
        </div>
        <AppLink
          to="contact"
          className="inline-flex h-12 items-center justify-center gap-2 rounded bg-canvas px-6 font-medium text-ink transition-opacity hover:opacity-90"
        >
          {cta.button} <ArrowRight size={18} aria-hidden />
        </AppLink>
      </Container>
    </section>
  )
}
