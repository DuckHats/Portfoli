import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SITE } from '@/config/site'
import { useLanguage, useMessages } from '@/lib/i18n'
import { LANGUAGES } from '@/lib/languages'
import { switchLanguagePath } from '@/lib/routes'

type JsonLd = Record<string, unknown>

interface SEOProps {
  title: string
  description: string
  /** Absolute-path image under public/, e.g. `/projects/x/home.webp`. */
  image?: string
  noindex?: boolean
  jsonLd?: JsonLd | JsonLd[]
  /** Use the site tagline format instead of "Page | Site". */
  home?: boolean
}

export function SEO({ title, description, image = SITE.ogImage, noindex, jsonLd, home }: SEOProps) {
  const language = useLanguage()
  const { meta } = useMessages()
  const { pathname } = useLocation()

  const fullTitle = home ? `${SITE.name} | ${title}` : `${title} | ${SITE.name}`
  const canonical = `${SITE.url}${pathname.replace(/\/$/, '') || '/'}`
  const imageUrl = image.startsWith('http') ? image : `${SITE.url}${image}`

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={canonical} />
      )}

      {!noindex &&
        LANGUAGES.map((code) => (
          <link
            key={code}
            rel="alternate"
            hrefLang={code}
            href={`${SITE.url}${switchLanguagePath(pathname, code)}`}
          />
        ))}
      {!noindex && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${SITE.url}${switchLanguagePath(pathname, 'ca')}`}
        />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={meta.ogLocale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd &&
        (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((entry, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(entry).replace(/</g, '\\u003c')}
          </script>
        ))}
    </Helmet>
  )
}
