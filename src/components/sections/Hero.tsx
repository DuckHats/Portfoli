import { ArrowRight } from 'lucide-react'
import { projects } from '@/content/projects'
import { useLocalize, useMessages } from '@/lib/i18n'
import { displayUrl, showcaseImages } from '@/lib/projectUrl'
import { AppLink } from '../ui/AppLink'
import { BrowserFrame } from '../ui/BrowserFrame'
import { buttonStyles } from '../ui/buttonStyles'
import { Container } from '../ui/Container'
import { Scribble } from '../ui/Scribble'
import { ShowcaseCarousel } from './ShowcaseCarousel'

const featured = projects[0]

/** Opens with the work itself: a real project in a live browser window beside the pitch. */
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
    <section id="hero" aria-labelledby="hero-title">
      <Container className="grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-5">
          <h1
            id="hero-title"
            className="animate-rise text-5xl leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            {hero.title}
          </h1>
          <Scribble variant="underline" className="mt-3 h-4 w-56 sm:w-72" />
          <p className="mt-8 max-w-md animate-rise text-lg text-ink/80 [animation-delay:120ms] sm:text-xl">
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
          <p className="mt-10 hidden text-sm text-muted [@media(hover:hover)]:block">
            {hero.keyHint}
          </p>
        </div>

        {featured && (
          <figure className="animate-rise [animation-delay:160ms] lg:col-span-7">
            <BrowserFrame url={displayUrl(featured)}>
              <ShowcaseCarousel slides={slides} priority />
            </BrowserFrame>
            <figcaption className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <span className="text-sm text-muted">
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
      </Container>
    </section>
  )
}
