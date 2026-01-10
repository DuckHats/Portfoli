import { Helmet } from 'react-helmet-async';
import { seoConfig, SeoLang } from '../config/seo.config';


type SEOProps = {
  lang: SeoLang;
  path?: string; // ex: /projects/menu-ginebro
};

export function SEO({ lang, path = '/' }: SEOProps) {
  const seo = seoConfig[lang];
  const url = `https://duckhats.cat${path}`;

  return (
    <Helmet>
      {/* HTML */}
      <html lang={seo.lang} />

      {/* Primary SEO */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#111827" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content="https://duckhats.cat/og-cover.jpg" />
      <meta property="og:locale" content={seo.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Hats4Ducks" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content="https://duckhats.cat/og-cover.jpg" />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* hreflang */}
      <link rel="alternate" href="https://duckhats.cat/" hrefLang="ca" />
      <link rel="alternate" href="https://duckhats.cat/es" hrefLang="es" />
      <link rel="alternate" href="https://duckhats.cat/en" hrefLang="en" />
      <link rel="alternate" href="https://duckhats.cat/" hrefLang="x-default" />
    </Helmet>
  );
}
