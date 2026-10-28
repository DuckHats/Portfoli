import { ArrowRight } from 'lucide-react'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { buttonStyles } from '../ui/buttonStyles'
import { Container } from '../ui/Container'

export function Hero() {
  const { home } = useMessages()
  const { hero } = home
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--color-line)/0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--color-line)/0.6)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
      />
      <Container className="relative py-20 sm:py-28 lg:py-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">
          {hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{hero.subtitle}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <AppLink to="contact" className={buttonStyles({ size: 'lg' })}>
            {hero.primaryCta} <ArrowRight size={18} aria-hidden />
          </AppLink>
          <AppLink to="services" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
            {hero.secondaryCta}
          </AppLink>
        </div>
      </Container>
    </section>
  )
}
