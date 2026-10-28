import { SEO } from '@/components/SEO'
import { AppLink } from '@/components/ui/AppLink'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { serviceCategories } from '@/content/services'
import { useLocalize, useMessages } from '@/lib/i18n'
import { useT } from '@/lib/i18n'

export function ServicesPage() {
  const { seo, services, home } = useMessages()
  const localize = useLocalize()
  const t = useT()
  return (
    <>
      <SEO title={seo.services.title} description={seo.services.description} />
      <PageHeader title={services.title} intro={services.intro} />
      <Container className="py-16">
        <div className="space-y-16">
          {serviceCategories.map((category, index) => (
            <section key={category.id} aria-labelledby={`${category.id}-title`}>
              <div className="mb-6 flex items-baseline gap-4 border-b border-line pb-4">
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 id={`${category.id}-title`} className="text-2xl font-semibold tracking-tight">
                  {localize(category.title)}
                </h2>
              </div>
              <ul className="grid gap-4 md:grid-cols-2">
                {category.items.map((item) => (
                  <li key={item.id} className="rounded-lg border border-line bg-surface p-6">
                    <h3 className="font-semibold tracking-tight">{localize(item.name)}</h3>
                    {item.description && (
                      <p className="mt-2 text-sm text-muted">{localize(item.description)}</p>
                    )}
                    {item.tiers && (
                      <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
                        {item.tiers.map((tier) => (
                          <div key={tier.name.en} className="grid gap-x-4 sm:grid-cols-[8rem_1fr]">
                            <dt className="font-medium">{localize(tier.name)}</dt>
                            <dd className="text-muted">
                              {tier.description ? localize(tier.description) : ''}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {item.note && (
                      <p className="mt-4 text-xs text-muted">
                        <span className="font-medium text-ink">{services.noteLabel}:</span>{' '}
                        {localize(item.note)}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              {category.note && (
                <p className="mt-4 text-sm text-muted">{localize(category.note)}</p>
              )}
            </section>
          ))}
        </div>

        <p className="mt-16 max-w-prose border-l-2 border-line pl-4 text-sm text-muted">
          {services.disclaimer}
        </p>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-lg border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{t('home.cta.title')}</h2>
            <p className="mt-1 text-muted">{home.cta.description}</p>
          </div>
          <AppLink to="contact" className={buttonStyles({ size: 'lg' })}>
            {home.cta.button}
          </AppLink>
        </div>
      </Container>
    </>
  )
}
