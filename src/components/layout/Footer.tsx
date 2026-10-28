import { Github, Instagram, Mail } from 'lucide-react'
import { SITE } from '@/config/site'
import { useMessages } from '@/lib/i18n'
import { AppLink, ExternalLink } from '../ui/AppLink'
import { Container } from '../ui/Container'
import { FOOTER_NAV, LEGAL_NAV } from './navigation'

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const socials = [
  { key: 'github', label: 'GitHub', url: SITE.social.github, Icon: Github },
  { key: 'x', label: 'X', url: SITE.social.x, Icon: XIcon },
  { key: 'instagram', label: 'Instagram', url: SITE.social.instagram, Icon: Instagram },
] as const

export function Footer() {
  const { footer, nav, a11y } = useMessages()
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 font-semibold tracking-tight">
              <img src={SITE.logo} alt="" width={28} height={28} className="h-7 w-7 dark:invert" />
              {SITE.name}
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted">{footer.tagline}</p>
          </div>

          <nav aria-label={a11y.footerNav}>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
              {footer.navigation}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_NAV.map((key) => (
                <li key={key}>
                  <AppLink to={key} className="text-ink/80 transition-colors hover:text-ink">
                    {nav[key]}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
              {footer.contact}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 text-ink/80 transition-colors hover:text-ink"
                >
                  <Mail size={16} aria-hidden /> {SITE.email}
                </a>
              </li>
            </ul>
            <ul className="mt-5 flex items-center gap-1" aria-label={footer.social}>
              {socials.map(({ key, label, url, Icon }) => (
                <li key={key}>
                  <ExternalLink
                    href={url}
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded text-muted transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    <Icon size={18} aria-hidden />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. {footer.rights}
          </p>
          <ul className="flex gap-5">
            {LEGAL_NAV.map((key) => (
              <li key={key}>
                <AppLink to={key} className="transition-colors hover:text-ink">
                  {nav[key]}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
