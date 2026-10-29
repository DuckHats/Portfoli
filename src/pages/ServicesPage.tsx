import { SEO } from '@/components/SEO'
import { pageJsonLd } from '@/lib/jsonLd'
import { AppLink } from '@/components/ui/AppLink'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { serviceCategories } from '@/content/services'
import { useLocalize, useMessages, useLanguage } from '@/lib/i18n'

export function ServicesPage() {
  const language = useLanguage()
  const { seo, services, home } = useMessages()
  const localize = useLocalize()
  return (
    <>
      <SEO
        title={seo.services.title}
        description={seo.services.description}
        jsonLd={pageJsonLd('services', language)}
      />
      <PageHeader title={services.title} intro={services.intro} />
      <div data-act="paper" className="bg-canvas">
        <Container className="py-20 sm:py-28">
          <div className="space-y-24 sm:space-y-32">
            {serviceCategories.map((category, index) => (
              <section key={category.id} aria-labelledby={`${category.id}-title`}>
                {/* Title above its list at full width: long category names never squeeze. */}
                <div className="border-b border-ink/20 pb-6">
                  <p aria-hidden className="label mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 id={`${category.id}-title`} className="text-[1.7rem] sm:text-4xl md:text-5xl">
                    {localize(category.title)}
                  </h2>
                </div>
                <div className="mt-8">
                  <ul className="grid gap-3 lg:grid-cols-2">
                    {category.items.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-2xl bg-surface p-6 ring-1 ring-ink/10 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
                      >
                        <h3 className="text-xl sm:text-2xl">{localize(item.name)}</h3>
                        {item.description && (
                          <p className="mt-2 max-w-prose text-muted">
                            {localize(item.description)}
                          </p>
                        )}
                        {item.tiers && (
                          <dl className="mt-5 space-y-2 text-sm">
                            {item.tiers.map((tier) => (
                              <div
                                key={tier.name.en}
                                className="grid gap-x-6 sm:grid-cols-[9rem_1fr]"
                              >
                                <dt className="font-semibold">{localize(tier.name)}</dt>
                                <dd className="text-muted">
                                  {tier.description ? localize(tier.description) : ''}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {item.note && (
                          <p className="mt-4 text-sm text-muted">
                            <span className="font-semibold text-ink">{services.noteLabel}:</span>{' '}
                            {localize(item.note)}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  {category.note && (
                    <p className="mt-4 text-sm text-muted">{localize(category.note)}</p>
                  )}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-20 max-w-prose rounded-2xl bg-tint p-6 text-muted">
            {services.disclaimer}
          </p>
        </Container>
      </div>

      <section data-act="red" aria-labelledby="services-cta" className="bg-canvas text-ink">
        <Container className="flex flex-col items-start gap-10 py-24 sm:py-32 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 id="services-cta" className="text-5xl sm:text-7xl">
              {home.cta.title}
            </h2>
            <p className="mt-6 text-lg">{home.cta.description}</p>
          </div>
          <AppLink to="contact" className={buttonStyles({ size: 'lg' })}>
            {home.cta.button}
          </AppLink>
        </Container>
      </section>
    </>
  )
}
