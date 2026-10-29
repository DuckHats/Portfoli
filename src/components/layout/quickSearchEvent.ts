const OPEN_EVENT = 'dh:quick-search'

/** Opens quick search from anywhere (e.g. the header button). */
export const openQuickSearch = () => window.dispatchEvent(new Event(OPEN_EVENT))

export const onQuickSearchOpen = (listener: () => void) => {
  window.addEventListener(OPEN_EVENT, listener)
  return () => window.removeEventListener(OPEN_EVENT, listener)
}
