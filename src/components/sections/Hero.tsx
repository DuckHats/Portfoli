import { ArrowRight } from 'lucide-react'
import { featuredProject } from '@/content/projects'
import { useLocalize, useMessages } from '@/lib/i18n'
import { displayUrl, showcaseImages } from '@/lib/projectUrl'
import { AppLink } from '../ui/AppLink'
import { BrowserFrame } from '../ui/BrowserFrame'
import { buttonStyles } from '../ui/buttonStyles'
import { Container } from '../ui/Container'
import { Dimension } from '../ui/Dimension'
import { ShowcaseCarousel } from './ShowcaseCarousel'

const featured = featuredProject

/** Opens as a drafting sheet: oversized headline, a dimension mark, and the featured project overlapping it. */
export function Hero() {
  const { home, projects: copy } = useMessages()
  const localize = useLocalize()
  const { hero } = home
  const slides = featured
    ? showcaseImages(featured).map((src, i) => ({
        src,
        alt: `${featured.title} — ${copy.imageOf} ${i + 1}`,
      }))
    : []

  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-x-clip">
      <div
        aria-hidden
        className="sheet-grid pointer-events-none absolute inset-0 hidden [mask-image:linear-gradient(to_bottom,black,transparent_85%)] lg:block"
      />
      <Container className="relative pb-20 pt-14 sm:pt-20 lg:pb-28">
        <h1
          id="hero-title"
          className="animate-rise max-w-6xl text-[4.25rem] leading-[0.88] sm:text-[8rem] lg:text-[10.5rem]"
        >
          {hero.title}
        </h1>
        <Dimension label="01 / 06" className="mt-8 max-w-2xl" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="animate-rise text-lg text-ink/80 [animation-delay:120ms] sm:text-xl">
              {hero.subtitle}
            </p>
            <div className="mt-10 flex animate-rise flex-wrap items-center gap-x-8 gap-y-5 [animation-delay:200ms]">
              <AppLink to="contact" className={buttonStyles({ size: 'lg' })}>
                {hero.primaryCta} <ArrowRight size={18} aria-hidden />
              </AppLink>
              <AppLink to="services" className="link-underline pb-0.5 font-semibold">
                {hero.secondaryCta}
              </AppLink>
            </div>
            <p className="meta mt-10 hidden [@media(hover:hover)]:block">{hero.keyHint}</p>
          </div>

          {featured && (
            <figure className="lg:col-span-8 lg:translate-y-10">
              <BrowserFrame url={displayUrl(featured)}>
                <ShowcaseCarousel slides={slides} priority />
              </BrowserFrame>
              <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span className="meta">
                  {featured.title} · {localize(featured.category)}
                </span>
                <AppLink
                  to="projects"
                  param={featured.id}
                  className="link-underline pb-0.5 text-sm font-semibold text-accent-text"
                >
                  {copy.view} →
                </AppLink>
              </figcaption>
            </figure>
          )}
        </div>
      </Container>
    </section>
  )
}
