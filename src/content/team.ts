import type { Localized } from './types'

export interface TeamMember {
  id: string
  name: string
  role: Localized
  photo: string
  /** Where the face is in the photo (percentages) and how far to zoom in on it. */
  photoFocus?: { x: number; y: number; zoom?: number }
  links: { label: string; url: string }[]
}

// TODO(client): add the missing LinkedIn/GitHub profiles and confirm every role title.
// TODO(client): replace the photos in public/team with real portraits of the team (same file names,
// at least 640 px, portrait or square, face centred; the cards crop them to tall portraits).
export const teamMembers: TeamMember[] = [
  {
    id: 'sergi',
    name: 'Sergi Giribet',
    role: {
      ca: 'Coordinació i administració',
      es: 'Coordinación y administración',
      en: 'Coordination and administration',
    },
    photo: '/team/Sergi.webp',
    photoFocus: { x: 45, y: 35 },
    links: [
      { label: 'LinkedIn', url: 'https://linkedin.com/in/sergigiribet' },
      { label: 'GitHub', url: 'https://github.com/SergiGiribet' },
    ],
  },
  {
    id: 'gerard',
    name: 'Gerard Loriz',
    role: {
      ca: 'Desenvolupador back-end',
      es: 'Desarrollador back-end',
      en: 'Back-end developer',
    },
    photo: '/team/Gerard.webp',
    photoFocus: { x: 52, y: 70, zoom: 1.9 },
    links: [{ label: 'Web', url: 'https://www.gerardloriz.com/' }],
  },
  {
    id: 'arnau',
    name: 'Arnau Clavijos',
    role: {
      ca: 'Desenvolupador front-end',
      es: 'Desarrollador front-end',
      en: 'Front-end developer',
    },
    photo: '/team/Arnau.webp',
    photoFocus: { x: 50, y: 42 },
    links: [],
  },
  {
    id: 'ferran',
    name: 'Ferran García',
    role: {
      ca: 'Desenvolupador front-end',
      es: 'Desarrollador front-end',
      en: 'Front-end developer',
    },
    photo: '/team/Ferran.webp',
    photoFocus: { x: 50, y: 38 },
    links: [],
  },
]
