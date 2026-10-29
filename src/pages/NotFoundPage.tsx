import { SEO } from '@/components/SEO'
import { AppLink } from '@/components/ui/AppLink'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { Headline } from '@/components/ui/Headline'
import { useMessages } from '@/lib/i18n'

/** An empty stage: the number at full width, the way back right under it. */
export function NotFoundPage() {
  const { seo, notFound } = useMessages()
  return (
    <>
      <SEO noindex title={seo.notFound.title} description={seo.notFound.description} />
      <section data-act="ink" className="relative overflow-hidden bg-canvas text-ink">
        <Container className="py-24 sm:py-32">
          <p
            aria-hidden
            className="line-up font-display text-[34vw] font-black leading-[0.8] text-transparent [-webkit-text-stroke:2px_rgb(var(--color-accent))] lg:text-[22rem]"
          >
            404
          </p>
          <Headline text={notFound.title} className="mt-10 text-5xl sm:text-7xl" delay={0.2} />
          <p className="mt-6 max-w-prose text-lg text-muted">{notFound.body}</p>
          <AppLink to="home" className={`${buttonStyles({ size: 'lg' })} mt-10`}>
            {notFound.back}
          </AppLink>
        </Container>
      </section>
    </>
  )
}
