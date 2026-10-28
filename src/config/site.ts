// Single source of truth for site identity. Content lives in src/content.
export const SITE = {
  name: 'DuckHats',
  // TODO(client): confirm the production domain (.cat vs .com). Used by SEO, sitemap and JSON-LD.
  url: 'https://duckhats.cat',
  foundedYear: 2023,
  logo: '/brand/logo-mark.png',
  ogImage: '/og-cover.png',
  email: 'info@duckhats.cat',
  // TODO(client): add a corporate phone number (the personal one was removed on purpose).
  phone: null as string | null,
  social: {
    github: 'https://github.com/DuckHats',
    x: 'https://x.com/Hats4Ducks',
    instagram: 'https://instagram.com/hats4_ducks',
  },
  analyticsId: 'G-TTWP9NN570',
} as const

export type SocialKey = keyof typeof SITE.social
