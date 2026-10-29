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

const headingStyles = 'font-sans text-sm font-semibold text-on-inverse'

export function Footer() {
  const { footer, nav, a11y } = useMessages()
  return (
    <footer className="overflow-hidden border-t border-ink bg-inverse text-on-inverse">
      <Container className="pt-14">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-3 font-display text-6xl font-extrabold uppercase">
              <img src={SITE.logo} alt="" width={44} height={44} className="h-11 w-11 invert" />
              {SITE.name}
            </p>
            <p className="mt-5 max-w-xs text-on-inverse/70">{footer.tagline}</p>
          </div>

          <nav aria-label={a11y.footerNav}>
            <h2 className={headingStyles}>{footer.navigation}</h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.map((key) => (
                <li key={key}>
                  <AppLink
                    to={key}
                    className="link-underline pb-0.5 text-on-inverse/80 hover:text-on-inverse"
                  >
                    {nav[key]}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingStyles}>{footer.contact}</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 text-on-inverse/80 transition-colors hover:text-on-inverse"
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
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-on-inverse/70 transition-colors hover:bg-on-inverse/15 hover:text-on-inverse"
                  >
                    <Icon size={18} aria-hidden />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-on-inverse/20 pt-6 text-sm text-on-inverse/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. {footer.rights}
          </p>
          <ul className="flex gap-5">
            {LEGAL_NAV.map((key) => (
              <li key={key}>
                <AppLink to={key} className="transition-colors hover:text-on-inverse">
                  {nav[key]}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      {/* Oversized wordmark cropped by the bottom edge. Drawn as pseudo-element text so it is graphic only,
          not content for assistive tech or contrast checks. */}
      <div
        aria-hidden
        data-text={SITE.name}
        className="mt-4 select-none whitespace-nowrap text-center font-display text-[28vw] font-extrabold uppercase leading-[0.78] text-on-inverse/10 before:content-[attr(data-text)] sm:text-[22rem]"
      />
    </footer>
  )
}
