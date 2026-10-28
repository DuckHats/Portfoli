import { ArrowRight } from 'lucide-react'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { buttonStyles } from '../ui/buttonStyles'
import { Container } from '../ui/Container'
import { Emphasis } from '../ui/Emphasis'

export function Hero() {
  const { home } = useMessages()
  const { hero } = home
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* The logo as a large, cropped silhouette: a graphic anchor, not a mascot. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-1/2 hidden aspect-square w-[38rem] -translate-y-1/2 lg:block"
      >
        <div className="mark-mask h-full w-full bg-accent-soft" />
      </div>

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <p className="mb-8 flex animate-rise items-center gap-3 text-sm font-medium text-muted">
          <span aria-hidden className="h-px w-10 bg-accent" />
          {hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="max-w-4xl animate-rise text-5xl leading-[1.04] [animation-delay:80ms] sm:text-6xl lg:text-7xl"
        >
          <Emphasis text={hero.title} />
        </h1>
        <p className="mt-8 max-w-2xl animate-rise text-lg text-ink/80 [animation-delay:160ms] sm:text-xl">
          {hero.subtitle}
        </p>
        <div className="mt-10 flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:240ms]">
          <AppLink to="contact" className={buttonStyles({ size: 'lg' })}>
            {hero.primaryCta} <ArrowRight size={18} aria-hidden />
          </AppLink>
          <AppLink to="services" className="link-underline pb-0.5 font-medium">
            {hero.secondaryCta}
          </AppLink>
        </div>
      </Container>
    </section>
  )
}
