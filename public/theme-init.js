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
