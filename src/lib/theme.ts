import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

export function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'light' || attr === 'dark') return attr
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** Flips the theme, remembers the choice and returns the new theme. */
export function toggleTheme(): Theme {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  try {
    localStorage.setItem('dh-theme', next)
  } catch {
    // theme still applies for this session
  }
  return next
}

/** The active theme, kept in sync wherever it is changed (button, quick search). */
export function useTheme(): Theme {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange)
      observer.observe(document.documentElement, { attributeFilter: ['data-theme'] })
      return () => observer.disconnect()
    },
    currentTheme,
    () => 'light',
  )
}
