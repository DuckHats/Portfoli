import { ArrowRight } from 'lucide-react'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Container } from '../ui/Container'

export function CtaBand() {
  const { home } = useMessages()
  const { cta } = home
  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden border-t border-ink bg-inverse text-on-inverse"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-10 hidden aspect-square w-[32rem] sm:block"
      >
        <div className="mark-mask h-full w-full bg-on-inverse/10" />
      </div>
      <Container className="relative flex flex-col gap-10 py-20 sm:py-28 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-6xl sm:text-8xl">
            {cta.title}
          </h2>
          <p className="mt-5 max-w-md text-lg text-on-inverse/80">{cta.description}</p>
        </div>
        <AppLink
          to="contact"
          className="inline-flex h-14 shrink-0 items-center justify-center gap-2 border border-on-inverse bg-accent px-8 text-base font-semibold text-on-accent transition duration-200 hover:bg-on-inverse hover:text-inverse"
        >
          {cta.button} <ArrowRight size={18} aria-hidden />
        </AppLink>
      </Container>
    </section>
  )
}
