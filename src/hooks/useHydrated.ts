import { useSyncExternalStore } from 'react'

const noop = () => () => {}

/**
 * False while rendering the prerendered HTML (and while hydrating it), true afterwards. For
 * anything that depends on the visitor's browser (stored choices, the clock), so the first client
 * render matches the HTML exactly.
 */
export const useHydrated = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
