import type { Localized } from './types'

export interface TeamMember {
  id: string
  name: string
  role: Localized
  photo: string
  links: { label: string; url: string }[]
}

// TODO(client): add the missing LinkedIn/GitHub profiles and confirm every role title.
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
    links: [],
  },
]
