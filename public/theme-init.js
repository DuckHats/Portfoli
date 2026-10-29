// Applies the saved theme before first paint to avoid a flash. Loaded as an external
// script so it keeps working under a strict Content-Security-Policy.
try {
  var theme = localStorage.getItem('dh-theme')
  if (theme === 'light' || theme === 'dark') {
    document.documentElement.setAttribute('data-theme', theme)
  }
} catch {
  // storage unavailable: fall back to the system preference
}

// The name intro (#intro in index.html, animated in CSS): home only, once per browser session,
// never with reduced motion. Decided here so it is on screen from the very first paint.
try {
  if (/^\/(?:ca|es|en)?\/?$/.test(location.pathname)) {
    if (
      !sessionStorage.getItem('dh-intro') &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      document.documentElement.setAttribute('data-intro', '')
    }
    sessionStorage.setItem('dh-intro', '1')
  }
} catch {
  // storage unavailable: no intro
}
