import type { RouteKey } from '@/lib/routes'

/** Header navigation. Footer and sitemap derive from ROUTES in src/lib/routes.ts. */
export const PRIMARY_NAV = ['services', 'projects', 'about'] as const satisfies readonly RouteKey[]

export const FOOTER_NAV = [
  'services',
  'projects',
  'about',
  'careers',
] as const satisfies readonly RouteKey[]

export const LEGAL_NAV = ['privacy', 'legal'] as const satisfies readonly RouteKey[]
