import { ArrowRight } from 'lucide-react'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Container } from '../ui/Container'
import { Scribble } from '../ui/Scribble'

export function CtaBand() {
  const { home } = useMessages()
  const { cta } = home
  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden border-t-2 border-ink bg-inverse text-on-inverse"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-10 hidden aspect-square w-[32rem] sm:block"
      >
        <div className="mark-mask h-full w-full bg-on-inverse/10" />
      </div>
      <Container className="relative flex flex-col gap-10 py-20 sm:py-28 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-5xl sm:text-7xl">
            {cta.title}
          </h2>
          <p className="mt-5 max-w-md text-lg text-on-inverse/80">{cta.description}</p>
        </div>
        <div className="flex items-end gap-4">
          <Scribble variant="arrow" className="hidden h-16 w-28 shrink-0 md:block" />
          <AppLink
            to="contact"
            className="inline-flex h-14 shrink-0 items-center justify-center gap-2 border-2 border-on-inverse bg-accent px-8 text-base font-semibold text-on-accent shadow-[6px_6px_0_0_rgb(var(--color-on-inverse))] transition duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_0_rgb(var(--color-on-inverse))]"
          >
            {cta.button} <ArrowRight size={18} aria-hidden />
          </AppLink>
        </div>
      </Container>
    </section>
  )
}
