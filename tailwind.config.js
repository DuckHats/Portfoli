/** Every colour comes from a CSS variable in src/index.css so light/dark live in one place. */
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // `dark:` follows the manual theme switch (data-theme) and falls back to the system preference.
  darkMode: [
    'variant',
    [
      '@media (prefers-color-scheme: dark) { &:not([data-theme="light"] *) }',
      '&:is([data-theme="dark"] *)',
    ],
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Archivo Variable"', 'Impact', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        canvas: token('canvas'),
        surface: token('surface'),
        tint: token('tint'),
        ink: token('ink'),
        muted: token('muted'),
        line: token('line'),
        accent: token('accent'),
        'accent-text': token('accent-text'),
        'on-accent': token('on-accent'),
        inverse: token('inverse'),
        'on-inverse': token('on-inverse'),
      },
      maxWidth: { content: '76rem', prose: '42rem' },
      // Square corners are part of the look; only `rounded-full` (dots, icon buttons) stays round.
      borderRadius: { DEFAULT: '0', lg: '0', xl: '0', '2xl': '0' },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 45s linear infinite',
      },
    },
  },
  plugins: [],
}
