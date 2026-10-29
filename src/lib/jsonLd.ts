// Page-specific structured data, shared by the pages (client) and the prerendered shells (build).
// Kept apart from seo.ts because it reads the content modules, which stay out of the entry chunk.
import { SITE } from '@/config/site'
import { messages } from '@/content/messages'
import type { Project } from '@/content/projects'
import { projects } from '@/content/projects'
import { serviceCategories } from '@/content/services'
import { teamMembers } from '@/content/team'
import type { Language } from './languages'
import type { RouteKey } from './routes'
import { buildPath, projectPath } from './routes'
import { absoluteUrl, breadcrumbJsonLd, organizationId, websiteJsonLd } from './seo'

type JsonLd = Record<string, unknown>
const CONTEXT = 'https://schema.org'

/** Home › Page (› Project): every inner page gets its trail. */
function trail(language: Language, key: RouteKey, base: string, project?: Project) {
  const { nav } = messages[language]
  return breadcrumbJsonLd(
    [
      { name: nav.home, path: buildPath(language, 'home') },
      ...(key === 'home'
        ? []
        : [{ name: nav[key as keyof typeof nav], path: buildPath(language, key) }]),
      ...(project ? [{ name: project.title, path: projectPath(language, project.id) }] : []),
    ],
    base,
  )
}

const servicesList = (language: Language, base: string): JsonLd => ({
  '@context': CONTEXT,
  '@type': 'ItemList',
  name: messages[language].services.title,
  itemListElement: serviceCategories
    .flatMap((category) => category.items)
    .map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: item.name[language],
        ...(item.description && { description: item.description[language] }),
        provider: { '@id': organizationId(base) },
        areaServed: 'Catalunya',
      },
    })),
})

const projectWork = (project: Project, language: Language, base: string): JsonLd => ({
  '@context': CONTEXT,
  '@type': 'CreativeWork',
  name: project.title,
  description: project.summary[language],
  url: absoluteUrl(projectPath(language, project.id), base),
  image: [project.image, ...project.gallery].map((src) => absoluteUrl(src, base)),
  inLanguage: language,
  genre: project.category[language],
  keywords: project.technologies.join(', '),
  creator: { '@id': organizationId(base) },
})

const projectsList = (language: Language, base: string): JsonLd => ({
  '@context': CONTEXT,
  '@type': 'ItemList',
  name: messages[language].projects.title,
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: absoluteUrl(projectPath(language, project.id), base),
    name: project.title,
  })),
})

const aboutPage = (language: Language, base: string): JsonLd => ({
  '@context': CONTEXT,
  '@type': 'AboutPage',
  url: absoluteUrl(buildPath(language, 'about'), base),
  inLanguage: language,
  about: { '@id': organizationId(base) },
  mainEntity: teamMembers.map((member) => ({
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role[language],
    image: absoluteUrl(member.photo, base),
    worksFor: { '@id': organizationId(base) },
    ...(member.links.length > 0 && { sameAs: member.links.map((link) => link.url) }),
  })),
})

const contactPage = (language: Language, base: string): JsonLd => ({
  '@context': CONTEXT,
  '@type': 'ContactPage',
  url: absoluteUrl(buildPath(language, 'contact'), base),
  inLanguage: language,
  mainEntity: {
    '@id': organizationId(base),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE.email,
      availableLanguage: ['Catalan', 'Spanish', 'English'],
      areaServed: 'ES',
    },
  },
})

/** The structured data of a page (the Organization is added to every page by <SEO>). */
export function pageJsonLd(key: RouteKey, language: Language, base: string = SITE.url): JsonLd[] {
  if (key === 'home') return [websiteJsonLd(language, base)]
  const extra: Partial<Record<RouteKey, JsonLd>> = {
    services: servicesList(language, base),
    projects: projectsList(language, base),
    about: aboutPage(language, base),
    contact: contactPage(language, base),
  }
  return [trail(language, key, base), ...(extra[key] ? [extra[key]] : [])]
}

export const projectJsonLd = (project: Project, language: Language, base: string = SITE.url) => [
  trail(language, 'projects', base, project),
  projectWork(project, language, base),
]
