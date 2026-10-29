import { SEO } from '@/components/SEO'
import { AppLink } from '@/components/ui/AppLink'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { serviceCategories } from '@/content/services'
import { useLocalize, useMessages } from '@/lib/i18n'

export function ServicesPage() {
  const { seo, services, home } = useMessages()
  const localize = useLocalize()
  return (
    <>
      <SEO title={seo.services.title} description={seo.services.description} />
      <PageHeader title={services.title} intro={services.intro} />
      <div data-act="paper" className="bg-canvas">
        <Container className="py-20 sm:py-28">
          <div className="space-y-24 sm:space-y-32">
            {serviceCategories.map((category) => (
              <section
                key={category.id}
                aria-labelledby={`${category.id}-title`}
                className="grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-16"
              >
                <h2
                  id={`${category.id}-title`}
                  className="text-3xl sm:text-4xl lg:sticky lg:top-28 lg:self-start"
                >
                  {localize(category.title)}
                </h2>
                <div>
                  <ul className="space-y-3">
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
