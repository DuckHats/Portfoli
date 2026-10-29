import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { Slide } from './ShowcaseCarousel'
import { useMessages, useT } from '@/lib/i18n'

/**
 * Project screenshots as a grid; one opens full screen, growing out of its thumbnail (shared
 * layout animation). Arrows move between screenshots, Escape closes and focus goes back to the
 * thumbnail it came from.
 */
export function ProjectGallery({ slides }: { slides: Slide[] }) {
  const { cursor } = useMessages()
  const t = useT()
  const [open, setOpen] = useState<number | null>(null)
  const thumbs = useRef<(HTMLButtonElement | null)[]>([])
  const lastOpened = useRef(0)

  const show = (index: number) => {
    lastOpened.current = index
    setOpen(index)
  }

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2">
        {slides.map((slide, index) => (
          <li key={slide.src}>
            <button
              ref={(node) => {
                thumbs.current[index] = node
              }}
              type="button"
              data-cursor={cursor.enlarge}
              aria-label={t('projects.enlarge', { n: index + 1 })}
              onClick={() => show(index)}
              className="group block aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface ring-1 ring-ink/15"
            >
              {open === index ? (
                <span aria-hidden className="block h-full w-full" />
              ) : (
                <m.img
                  layoutId={`shot-${slide.src}`}
                  src={slide.src}
                  alt={slide.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence onExitComplete={() => thumbs.current[lastOpened.current]?.focus()}>
        {open !== null && (
          <Lightbox slides={slides} index={open} onChange={show} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

interface LightboxProps {
  slides: Slide[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

function Lightbox({ slides, index, onChange, onClose }: LightboxProps) {
  const { projects } = useMessages()
  const t = useT()
  const close = useRef<HTMLButtonElement>(null)
  const slide = slides[index]!
  const step = (by: number) => onChange((index + by + slides.length) % slides.length)

  useEffect(() => {
    close.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowRight') step(1)
      else if (event.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  const controls =
    'inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink/10 text-ink transition-colors hover:bg-ink/20'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('projects.slide', { n: index + 1, total: slides.length })}
      data-act="ink"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 text-ink sm:p-10"
    >
      <m.div
        aria-hidden
        className="absolute inset-0 bg-canvas/95 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <m.img
        layoutId={`shot-${slide.src}`}
        src={slide.src}
        alt={slide.alt}
        className="relative max-h-full max-w-full rounded-xl object-contain shadow-[0_40px_100px_-20px_rgb(0_0_0/0.8)]"
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      />
      <m.div
        className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label={projects.previous}
          className={controls}
        >
          <ChevronLeft size={20} aria-hidden />
        </button>
        <p className="min-w-16 text-center text-sm font-semibold tabular-nums">
          {index + 1} / {slides.length}
        </p>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label={projects.next}
          className={controls}
        >
          <ChevronRight size={20} aria-hidden />
        </button>
      </m.div>
      <button
        ref={close}
        type="button"
        onClick={onClose}
        aria-label={projects.close}
        className={`${controls} absolute right-4 top-4 sm:right-8 sm:top-8`}
      >
        <X size={20} aria-hidden />
      </button>
    </div>
  )
}
