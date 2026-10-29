import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { featuredProject } from '@/content/projects'
import { useLocalize, useMessages } from '@/lib/i18n'
import { displayUrl, showcaseImages } from '@/lib/projectUrl'
import { AppLink } from '../ui/AppLink'
import { BrowserFrame } from '../ui/BrowserFrame'
import { buttonStyles } from '../ui/buttonStyles'
import { Container } from '../ui/Container'
import { Headline } from '../ui/Headline'
import { Magnetic } from '../ui/Magnetic'
import { HeroLight, HeroTilt } from './HeroTilt'
import { ShowcaseCarousel } from './ShowcaseCarousel'

const featured = featuredProject

/**
 * The dark stage. The featured project floats in perspective, turns toward the mouse and settles
 * flat as the page scrolls; a soft light follows the pointer (see HeroTilt). Touch users get the
 * scroll settle only; reduced motion, a still window.
 */
export function Hero() {
  const { home, projects: copy } = useMessages()
  const localize = useLocalize()
  const { hero } = home
  const stage = useRef<HTMLElement>(null)

  const slides = featured
    ? showcaseImages(featured).map((src, i) => ({
        src,
        alt: `${featured.title} — ${copy.imageOf} ${i + 1}`,
      }))
    : []

  return (
    <section
      ref={stage}
      id="hero"
      data-act="ink"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-canvas text-ink"
    >
      <HeroLight stage={stage} />

      <Container className="relative pb-24 pt-12 sm:pt-16 lg:pb-32">
        <Headline
          id="hero-title"
          lively
          text={hero.title}
          className="max-w-6xl text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.25rem]"
        />

        <div className="mt-12 grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="line-up text-lg text-muted [animation-delay:0.35s] sm:text-xl">
              {hero.subtitle}
            </p>
            <div className="line-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 [animation-delay:0.45s]">
              <Magnetic>
                <AppLink to="contact" className={buttonStyles({ size: 'lg' })}>
                  {hero.primaryCta} <ArrowRight size={18} aria-hidden />
                </AppLink>
              </Magnetic>
              <AppLink to="services" className="link-underline pb-0.5 font-semibold">
                {hero.secondaryCta}
              </AppLink>
            </div>
            <p className="label mt-12 hidden [@media(hover:hover)]:block">{hero.keyHint}</p>
          </div>

          {featured && (
            <figure className="[perspective:1600px] lg:col-span-8">
              <HeroTilt stage={stage}>
                <BrowserFrame url={displayUrl(featured)}>
                  <ShowcaseCarousel slides={slides} priority />
                </BrowserFrame>
                {/* Lifted off the window so it parallaxes against it when the window turns. */}
                <figcaption
                  style={{ transform: 'translateZ(70px)' }}
                  className="absolute -bottom-6 left-6 flex items-center gap-4 rounded-full bg-accent py-2 pl-5 pr-2 text-on-accent shadow-[0_20px_40px_-12px_rgb(0_0_0/0.6)]"
                >
                  <span className="text-sm font-semibold">
                    {featured.title}
                    <span className="hidden sm:inline"> · {localize(featured.category)}</span>
                  </span>
                  <AppLink
                    to="projects"
                    param={featured.id}
                    className="rounded-full bg-on-accent px-4 py-1.5 text-sm font-semibold text-accent transition-transform hover:scale-105"
                  >
                    {copy.view} →
                  </AppLink>
                </figcaption>
              </HeroTilt>
            </figure>
          )}
        </div>
      </Container>
    </section>
  )
}
