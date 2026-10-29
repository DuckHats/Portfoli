import { Github, Instagram, Mail, Phone } from 'lucide-react'
import { ContactForm } from '@/components/forms/ContactForm'
import { SEO } from '@/components/SEO'
import { ExternalLink } from '@/components/ui/AppLink'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { SITE } from '@/config/site'
import { useMessages } from '@/lib/i18n'

export function ContactPage() {
  const { seo, contact } = useMessages()
  return (
    <>
      <SEO title={seo.contact.title} description={seo.contact.description} />
      <PageHeader title={contact.title} intro={contact.intro} />
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_22rem] lg:gap-20">
        <div className="max-w-xl">
          <ContactForm />
        </div>
        <aside aria-labelledby="details" className="self-start border border-ink bg-tint p-8">
          <h2 id="details" className="text-2xl">
            {contact.detailsTitle}
          </h2>
          <ul className="mt-6 space-y-4">
            <li className="flex items-center gap-3">
              <Mail size={16} aria-hidden className="text-muted" />
              <span className="sr-only">{contact.emailLabel}: </span>
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline pb-0.5 hover:text-accent-text"
              >
                {SITE.email}
              </a>
            </li>
            {SITE.phone && (
              <li className="flex items-center gap-3">
                <Phone size={16} aria-hidden className="text-muted" />
                <span className="sr-only">{contact.phoneLabel}: </span>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
              </li>
            )}
            <li className="flex items-center gap-3">
              <Github size={16} aria-hidden className="text-muted" />
              <ExternalLink
                href={SITE.social.github}
                className="link-underline pb-0.5 hover:text-accent-text"
              >
                GitHub
              </ExternalLink>
            </li>
            <li className="flex items-center gap-3">
              <Instagram size={16} aria-hidden className="text-muted" />
              <ExternalLink
                href={SITE.social.instagram}
                className="link-underline pb-0.5 hover:text-accent-text"
              >
                Instagram
              </ExternalLink>
            </li>
          </ul>
        </aside>
      </Container>
    </>
  )
}
