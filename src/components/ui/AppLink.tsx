import type { ComponentProps, ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage, useMessages } from '@/lib/i18n'
import type { RouteKey } from '@/lib/routes'
import { buildPath } from '@/lib/routes'

interface AppLinkProps extends Omit<ComponentProps<typeof Link>, 'to'> {
  to: RouteKey
  param?: string
}

/** Internal link that always keeps the current language prefix. */
export function AppLink({ to, param, ...props }: AppLinkProps) {
  const language = useLanguage()
  return <Link to={buildPath(language, to, param)} {...props} />
}

interface AppNavLinkProps extends Omit<ComponentProps<typeof NavLink>, 'to' | 'end'> {
  to: RouteKey
}

export function AppNavLink({ to, ...props }: AppNavLinkProps) {
  const language = useLanguage()
  return <NavLink to={buildPath(language, to)} end={to === 'home'} {...props} />
}

interface ExternalLinkProps extends ComponentProps<'a'> {
  href: string
  children: ReactNode
}

/** External link: opens in a new tab and says so to assistive technology. */
export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  const { a11y } = useMessages()
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> {a11y.externalLink}</span>
    </a>
  )
}
