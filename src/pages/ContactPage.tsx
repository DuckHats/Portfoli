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
      <Container className="grid gap-16 py-16 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-xl">
          <ContactForm />
        </div>
        <aside aria-labelledby="details" className="lg:border-l lg:border-line lg:pl-8">
          <h2 id="details" className="font-mono text-xs uppercase tracking-widest text-muted">
            {contact.detailsTitle}
          </h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={16} aria-hidden className="text-muted" />
              <span className="sr-only">{contact.emailLabel}: </span>
              <a
                href={`mailto:${SITE.email}`}
                className="underline underline-offset-2 hover:text-accent"
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
                className="underline underline-offset-2 hover:text-accent"
              >
                GitHub
              </ExternalLink>
            </li>
            <li className="flex items-center gap-3">
              <Instagram size={16} aria-hidden className="text-muted" />
              <ExternalLink
                href={SITE.social.instagram}
                className="underline underline-offset-2 hover:text-accent"
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
