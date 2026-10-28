import { SEO } from '@/components/SEO'
import { AppLink } from '@/components/ui/AppLink'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { useMessages } from '@/lib/i18n'

export function NotFoundPage() {
  const { seo, notFound } = useMessages()
  return (
    <>
      <SEO noindex title={seo.notFound.title} description={seo.notFound.description} />
      <Container className="py-24 sm:py-32">
        <p
          aria-hidden
          className="font-display text-[10rem] font-bold leading-none text-transparent [-webkit-text-stroke:3px_rgb(var(--color-ink))]"
        >
          404
        </p>
        <h1 className="mt-4 text-5xl">{notFound.title}</h1>
        <p className="mt-3 max-w-prose text-muted">{notFound.body}</p>
        <AppLink to="home" className={`${buttonStyles({ size: 'lg' })} mt-8`}>
          {notFound.back}
        </AppLink>
      </Container>
    </>
  )
}
