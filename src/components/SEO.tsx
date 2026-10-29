import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { messages } from '@/content/messages'
import { SITE } from '@/config/site'
import { useLanguage } from '@/lib/i18n'
import { LANGUAGES } from '@/lib/languages'
import {
  absoluteUrl,
  alternateLinks,
  canonicalUrl,
  formatTitle,
  organizationJsonLd,
} from '@/lib/seo'

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
  const { pathname } = useLocation()

  const fullTitle = formatTitle(title, home)
  const canonical = canonicalUrl(pathname)
  const imageUrl = absoluteUrl(image)
  // The default cover's size is known; project screenshots vary and are left to the crawler.
  const coverSize = image === SITE.ogImage ? SITE.ogImageSize : null
  const structured = [organizationJsonLd(language), ...(jsonLd ? [jsonLd].flat() : [])]

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
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large" />}

      {!noindex &&
        alternateLinks(pathname).map(({ hrefLang, href }) => (
          <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
        ))}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={messages[language].meta.ogLocale} />
      {LANGUAGES.filter((code) => code !== language).map((code) => (
        <meta key={code} property="og:locale:alternate" content={messages[code].meta.ogLocale} />
      ))}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={fullTitle} />
      {coverSize && <meta property="og:image:width" content={String(coverSize.width)} />}
      {coverSize && <meta property="og:image:height" content={String(coverSize.height)} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {structured.map((entry, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(entry).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Helmet>
  )
}
