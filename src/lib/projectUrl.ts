import type { Project } from '@/content/projects'

/** Address shown in the browser-frame pill: the live site, else the repository, else the id. */
export function displayUrl(project: Pick<Project, 'id' | 'link' | 'github'>): string {
  const raw = project.link || project.github
  if (!raw) return project.id
  try {
    const url = new URL(raw)
    return `${url.host.replace(/^www\./, '')}${url.pathname.replace(/\/$/, '')}`
  } catch {
    return project.id
  }
}

/** Cover first, then the rest of the gallery, without repeating the cover. */
export const showcaseImages = (project: Pick<Project, 'image' | 'gallery'>, max = 5): string[] =>
  [project.image, ...project.gallery.filter((src) => src !== project.image)].slice(0, max)
