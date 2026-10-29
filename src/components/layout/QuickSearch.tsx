import { AnimatePresence } from 'motion/react'
import { Suspense, lazy, useEffect, useState } from 'react'
import { onQuickSearchOpen } from './quickSearchEvent'

const CommandPalette = lazy(() => import('./CommandPalette'))

/**
 * Listens for Ctrl+K / ⌘K and the open event; the palette itself is only downloaded the first
 * time it is opened.
 */
export function QuickSearch() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    document.addEventListener('keydown', onKey)
    const stopListening = onQuickSearchOpen(() => setOpen(true))
    return () => {
      document.removeEventListener('keydown', onKey)
      stopListening()
    }
  }, [])

  return (
    <Suspense fallback={null}>
      <AnimatePresence>
        {open && <CommandPalette key="palette" onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </Suspense>
  )
}
