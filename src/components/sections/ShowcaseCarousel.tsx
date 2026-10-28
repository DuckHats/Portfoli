import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCarousel } from '@/hooks/useCarousel'
import { useMessages, useT } from '@/lib/i18n'

export interface Slide {
  src: string
  alt: string
}

/**
 * Fixed-ratio screenshot carousel (no layout shift). Autoplay is handled by `useCarousel`;
 * the previous/next buttons and dots are real controls, so it also works with a keyboard.
 */
export function ShowcaseCarousel({ slides }: { slides: Slide[] }) {
  const { projects } = useMessages()
  const t = useT()
  const { index, playing, go, next, prev, ref, handlers } = useCarousel({ count: slides.length })

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="carousel"
      aria-label={projects.carouselLabel}
      className="relative"
      {...handlers}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-tint">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={i !== index}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-3 right-3 flex items-center rounded-full bg-canvas/90 px-1 py-0.5 shadow-md backdrop-blur">
          <button
            type="button"
            onClick={prev}
            aria-label={projects.previous}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink hover:bg-ink/10"
          >
            <ChevronLeft size={16} aria-hidden />
          </button>
          <ol className="flex">
            {slides.map((slide, i) => (
              <li key={slide.src}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={t('projects.goTo', { n: i + 1 })}
                  aria-current={i === index ? 'true' : undefined}
                  className="group inline-flex h-8 w-4 items-center justify-center"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-4 bg-accent' : 'w-1.5 bg-ink/30 group-hover:bg-ink/60'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={next}
            aria-label={projects.next}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink hover:bg-ink/10"
          >
            <ChevronRight size={16} aria-hidden />
          </button>
        </div>
      )}

      <p className="sr-only" aria-live={playing ? 'off' : 'polite'}>
        {t('projects.slide', { n: index + 1, total: slides.length })}
      </p>
    </div>
  )
}
