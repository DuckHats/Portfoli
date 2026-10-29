import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export type Act = 'paper' | 'ink' | 'red'

// Just below the 4.5rem sticky header.
const PROBE_Y = 80

/**
 * The act (`data-act` block) currently just under the sticky header, so the header can take its
 * colours. Every top-level block declares its act, paper included.
 */
export function useActiveAct(): Act {
  const { pathname } = useLocation()
  const [act, setAct] = useState<Act>('paper')

  useEffect(() => {
    let frame = 0
    const probe = () => {
      frame = 0
      // Optional call: jsdom (unit tests) has no elementFromPoint.
      const hit = document
        .elementFromPoint?.(window.innerWidth / 2, PROBE_Y)
        ?.closest<HTMLElement>('main [data-act], footer[data-act]')
      setAct((hit?.dataset.act as Act | undefined) ?? 'paper')
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(probe)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // Pages load lazily and animate in, so look again whenever the page content changes.
    const mutations = new MutationObserver(schedule)
    const main = document.querySelector('main')
    if (main) mutations.observe(main, { childList: true, subtree: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      mutations.disconnect()
    }
  }, [pathname])

  return act
}
