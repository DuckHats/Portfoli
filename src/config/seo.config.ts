export const seoConfig = {
  ca: {
    lang: 'ca',
    title: "DuckHats | Desenvolupant amb passió i un toc d'humor",
    description:
      "DuckHats — Creem experiències digitals amb professionalitat juganera, on el codi seriós es troba amb el caos creatiu.",
    locale: 'ca_ES',
  },
  es: {
    lang: 'es',
    title: 'DuckHats | Desarrollando con pasión y un toque de humor',
    description:
      'DuckHats — Creamos experiencias digitales con profesionalidad lúdica, donde el código serio se encuentra con el caos creativo.',
    locale: 'es_ES',
  },
  en: {
    lang: 'en',
    title: 'DuckHats | Developing with passion and a touch of humor',
    description:
      'DuckHats — We create digital experiences with playful professionalism, where serious code meets creative chaos.',
    locale: 'en_US',
  },
} as const;

export type SeoLang = keyof typeof seoConfig;
