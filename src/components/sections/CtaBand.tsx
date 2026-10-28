import { ArrowRight } from 'lucide-react'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Container } from '../ui/Container'
import { Emphasis } from '../ui/Emphasis'

export function CtaBand() {
  const { home } = useMessages()
  const { cta } = home
  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-accent text-on-accent"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-10 hidden aspect-square w-[30rem] sm:block"
      >
        <div className="mark-mask h-full w-full bg-on-accent/10" />
      </div>
      <Container className="relative flex flex-col gap-10 py-20 sm:py-28 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-4xl sm:text-6xl [&_em]:text-on-accent">
            <Emphasis text={cta.title} />
          </h2>
          <p className="mt-5 text-lg opacity-80">{cta.description}</p>
        </div>
        <AppLink
          to="contact"
          className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-on-accent px-8 text-base font-medium text-accent transition-opacity hover:opacity-90"
        >
          {cta.button} <ArrowRight size={18} aria-hidden />
        </AppLink>
      </Container>
    </section>
  )
}
