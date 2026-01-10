import { Link } from 'react-router-dom'
import { brandConfig } from '../config/brand.config'
import { contactConfig } from '../config/contact.config'
import { useContent } from '../hooks/useContent'
import { useLanguage } from '../hooks/useLanguage'
import { accessibilityConfig } from '../config/accessibility'

export function Footer() {
  const content = useContent()
  const {
    language
  } = useLanguage();

  return (
    <footer aria-label={accessibilityConfig.footer[language].footerLabel}
      className="border-t-4 py-16 px-4 md:px-8 mt-32"
      style={{
        backgroundColor: brandConfig.colors.primary.white,
        borderColor: brandConfig.colors.primary.black,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Internal Links */}
          <nav aria-label={accessibilityConfig.footer[language].internalLinksLabel} className="flex flex-col space-y-3">
            <h3
              className="font-display font-bold text-xl mb-4 pb-2 border-b-4 inline-block"
              style={{
                color: brandConfig.colors.primary.black,
                borderColor: brandConfig.colors.primary.black,
              }}
            >
              {content.footer.internal}
            </h3>
            <Link aria-label={accessibilityConfig.nav[language].linkHomeLabel}
              to="/"
              className="font-mono text-sm transition-all hover:translate-x-1 inline-block w-fit"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandConfig.colors.primary.black
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandConfig.colors.neutral.gray600
              }}
            >
              → {content.nav.home}
            </Link>
            <Link aria-label={accessibilityConfig.nav[language].linkAboutLabel}
              to="/about"
              className="font-mono text-sm transition-all hover:translate-x-1 inline-block w-fit"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandConfig.colors.primary.black
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandConfig.colors.neutral.gray600
              }}
            >
              → {content.nav.about}
            </Link>
            <Link aria-label={accessibilityConfig.nav[language].linkTeamLabel}
              to="/projects"
              className="font-mono text-sm transition-all hover:translate-x-1 inline-block w-fit"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandConfig.colors.primary.black
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandConfig.colors.neutral.gray600
              }}
            >
              → {content.nav.projects}
            </Link>
            <Link aria-label={accessibilityConfig.nav[language].linkAboutLabel}
              to="/team"
              className="font-mono text-sm transition-all hover:translate-x-1 inline-block w-fit"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandConfig.colors.primary.black
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandConfig.colors.neutral.gray600
              }}
            >
              → {content.nav.team}
            </Link>
            
          </nav>

          {/* Contact */}
          <div aria-label={accessibilityConfig.footer[language].contactInfoLabel} className="flex flex-col space-y-3">
            <h3
              className="font-display font-bold text-xl mb-4 pb-2 border-b-4 inline-block"
              style={{
                color: brandConfig.colors.primary.black,
                borderColor: brandConfig.colors.primary.black,
              }}
            >
              {content.footer.contact}
            </h3>
            <a aria-label={accessibilityConfig.footer[language].emailLinkLabel}
              href={`mailto:${contactConfig.email}`}
              className="font-mono text-sm transition-colors inline-block w-fit"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandConfig.colors.accent.red
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandConfig.colors.neutral.gray600
              }}
            >
              {contactConfig.email}
            </a>
            <a aria-label={accessibilityConfig.footer[language].phoneLinkLabel}
              href={`tel:${contactConfig.phone}`}
              className="font-mono text-sm transition-colors inline-block w-fit"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = brandConfig.colors.accent.red
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = brandConfig.colors.neutral.gray600
              }}
            >
              {contactConfig.phone}
            </a>
            {/* Socials */}
            <div role='group' aria-label={accessibilityConfig.footer[language].socialsLabel} className="pt-4">
              <h4
                className="font-mono font-bold text-sm mb-3"
                style={{
                  color: brandConfig.colors.primary.black,
                }}
              >
                {content.footer.socials}
              </h4>
              <div className="flex flex-col space-y-2">
              <a aria-label={accessibilityConfig.footer[language].githubLinkLabel}
                href={contactConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm transition-colors inline-block w-fit"
                style={{
                  color: brandConfig.colors.neutral.gray600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = brandConfig.colors.accent.red
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = brandConfig.colors.neutral.gray600
                }}
              >
                {contactConfig.handles.github}
              </a>
              <a aria-label={accessibilityConfig.footer[language].twitterLinkLabel}
                href={contactConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm transition-colors inline-block w-fit"
                style={{
                  color: brandConfig.colors.neutral.gray600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = brandConfig.colors.accent.red
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = brandConfig.colors.neutral.gray600
                }}
              >
                {contactConfig.handles.twitter}
              </a>
              <a aria-label={accessibilityConfig.footer[language].instagramLinkLabel}
                href={contactConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm transition-colors inline-block w-fit"
                style={{
                  color: brandConfig.colors.neutral.gray600,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = brandConfig.colors.accent.red
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = brandConfig.colors.neutral.gray600
                }}
              >
                {contactConfig.handles.instagram}
              </a>
              </div>
            </div>
          </div>

          {/* DuckHats Info */}
          <div className="flex flex-col space-y-4 md:items-end md:text-right">
            <h3
              className="font-display font-bold text-4xl"
              style={{
                color: brandConfig.colors.primary.black,
              }}
            >
              DuckHats
            </h3>
            <div
              className="h-1 w-24 md:ml-auto"
              style={{
                backgroundColor: brandConfig.colors.primary.black,
              }}
            />
            <p
              className="font-mono text-sm whitespace-pre-line"
              style={{
                color: brandConfig.colors.neutral.gray600,
              }}
            >
              {content.footer.tagline}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-8 border-t-2 text-center"
          style={{
            borderColor: brandConfig.colors.neutral.gray300,
          }}
        >
          <p
            className="font-mono text-xs"
            style={{
              color: brandConfig.colors.neutral.gray400,
            }}
          >
            {content.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}