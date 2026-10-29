import { m } from 'motion/react'
import { useEffect, useState } from 'react'
import { useMessages } from '@/lib/i18n'

interface Act {
  id: string
  label: string
}

/**
 * A slim index of the home page's acts, fixed on the right on wide screens. The section in view
 * is marked (the marker slides between items); each item scrolls to its section.
 */
export function ActIndex({ acts }: { acts: Act[] }) {
  const { actIndex } = useMessages()
  const [current, setCurrent] = useState(acts[0]?.id)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      // The active act is the last one whose top has passed 40% of the viewport.
      const line = window.innerHeight * 0.4
      let found = acts[0]?.id
      for (const act of acts) {
        const top = document.getElementById(act.id)?.getBoundingClientRect().top
        if (top !== undefined && top <= line) found = act.id
      }
      setCurrent(found)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [acts])

  return (
    <nav
      aria-label={actIndex}
      data-act="ink"
      className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-canvas/90 p-1.5 text-ink shadow-[0_20px_50px_-15px_rgb(0_0_0/0.6)] backdrop-blur xl:block"
    >
      <ol className="flex flex-col gap-1">
        {acts.map((act, index) => {
          const active = act.id === current
          return (
            <li key={act.id} className="group relative">
              <a
                href={`#${act.id}`}
                aria-current={active ? 'true' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  document.getElementById(act.id)?.scrollIntoView({ block: 'start' })
                }}
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold tabular-nums"
              >
                {active && (
                  <m.span
                    layoutId="act-index-marker"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative ${active ? 'text-on-accent' : 'text-muted'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="sr-only">{act.label}</span>
              </a>
              {/* The name slides out on hover; screen readers get it from the sr-only text above. */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-canvas px-3 py-1 text-xs font-semibold opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
              >
                {act.label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
