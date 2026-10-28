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
      <Container className="py-28">
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{notFound.title}</h1>
        <p className="mt-3 max-w-prose text-muted">{notFound.body}</p>
        <AppLink to="home" className={`${buttonStyles({ size: 'lg' })} mt-8`}>
          {notFound.back}
        </AppLink>
      </Container>
    </>
  )
}
