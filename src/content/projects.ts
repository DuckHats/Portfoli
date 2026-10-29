import type { Localized } from './types'

export interface Project {
  id: string
  title: string
  status: Localized
  category: Localized
  image: string
  summary: Localized
  challenge: Localized
  solution: Localized
  results: Localized<string[]>
  technologies: string[]
  gallery: string[]
  link?: string
  github?: string
}

const gallery = (dir: string, prefix: string, count: number) =>
  Array.from(
    { length: count },
    (_, i) => `/projects/${dir}/${prefix}-${String(i + 1).padStart(2, '0')}.webp`,
  )

export const projects: Project[] = [
  {
    id: 'menu-ginebro',
    title: 'Menú Ginebró',
    status: { ca: 'En desenvolupament', es: 'En desarrollo', en: 'In development' },
    category: { ca: 'Aplicació web', es: 'Aplicación web', en: 'Web application' },
    image: '/projects/menuGinebro/menu-ginebro-02.webp',
    summary: {
      ca: 'Sistema de gestió de menús escolars per a l’Escola Ginebró: els alumnes trien el menú setmanal i l’administració gestiona plats, usuaris i comandes.',
      es: 'Sistema de gestión de menús escolares para l’Escola Ginebró: los alumnos eligen el menú semanal y la administración gestiona platos, usuarios y pedidos.',
      en: 'School meal management system for Escola Ginebró: students choose their weekly menu and staff manage dishes, users and orders.',
    },
    challenge: {
      ca: 'L’escola necessitava digitalitzar la selecció de menús, eliminar el paper i fer més eficient la gestió de comandes diàries per a centenars d’alumnes.',
      es: 'La escuela necesitaba digitalizar la selección de menús, eliminar el papel y hacer más eficiente la gestión de pedidos diarios para cientos de alumnos.',
      en: 'The school needed to digitise menu selection, remove paper and make daily order handling more efficient for hundreds of students.',
    },
    solution: {
      ca: 'Aplicació web amb Angular i Laravel: autenticació segura, gestió de rols (administració, cuina, alumnat), importació i exportació massiva de dades i un calendari interactiu per escollir menús.',
      es: 'Aplicación web con Angular y Laravel: autenticación segura, gestión de roles (administración, cocina, alumnado), importación y exportación masiva de datos y un calendario interactivo para elegir menús.',
      en: 'Web application built with Angular and Laravel: secure authentication, role management (administration, kitchen, students), bulk data import and export, and an interactive calendar to pick menus.',
    },
    // TODO(client): confirm the 70% figure and its source before launch, or replace it with a measured result.
    results: {
      ca: [
        'Procés en paper eliminat',
        'Reducció del 70% del temps de gestió administrativa',
        'Verificació per correu electrònic amb OTP',
        'Quadre de comandament amb mètriques en temps real',
      ],
      es: [
        'Proceso en papel eliminado',
        'Reducción del 70% del tiempo de gestión administrativa',
        'Verificación por correo electrónico con OTP',
        'Panel de control con métricas en tiempo real',
      ],
      en: [
        'Paper-based process removed',
        '70% reduction in administrative management time',
        'Email verification with OTP',
        'Dashboard with real-time metrics',
      ],
    },
    technologies: [
      'Angular',
      'Laravel',
      'TypeScript',
      'PHP',
      'MySQL',
      'TailwindCSS',
      'Laravel Sanctum',
    ],
    gallery: gallery('menuGinebro', 'menu-ginebro', 12),
    github: 'https://github.com/DuckHats/menu-ginebro-front',
  },
  {
    id: 'sushi-sudoku',
    title: 'Sushi Sudoku',
    status: { ca: 'En desenvolupament', es: 'En desarrollo', en: 'In development' },
    category: { ca: 'Aplicació web', es: 'Aplicación web', en: 'Web application' },
    image: '/projects/sushisudoku/Home.webp',
    summary: {
      ca: 'Plataforma web per gestionar reserves i comandes d’un restaurant de sushi, amb inventari en temps real i integració per API amb plataformes de menjar a domicili.',
      es: 'Plataforma web para gestionar reservas y pedidos de un restaurante de sushi, con inventario en tiempo real e integración por API con plataformas de comida a domicilio.',
      en: 'Web platform to manage reservations and orders for a sushi restaurant, with real-time inventory and API integration with food delivery platforms.',
    },
    challenge: {
      ca: 'El restaurant necessitava gestionar reserves i comandes, controlar l’inventari i centralitzar les comandes de diverses plataformes de menjar a domicili.',
      es: 'El restaurante necesitaba gestionar reservas y pedidos, controlar el inventario y centralizar los pedidos de varias plataformas de comida a domicilio.',
      en: 'The restaurant needed to manage reservations and orders, track inventory and centralise orders from several food delivery platforms.',
    },
    // TODO(client): expand with the real architecture and integrations delivered.
    solution: {
      ca: 'Aplicació web completa desenvolupada conjuntament amb l’equip de Visualize.',
      es: 'Aplicación web completa desarrollada conjuntamente con el equipo de Visualize.',
      en: 'A complete web application built together with the Visualize team.',
    },
    // TODO(client): replace with measured results. These describe delivered capabilities only.
    results: {
      ca: [
        'Reserves i comandes gestionades en un sol lloc',
        'Inventari actualitzat en temps real',
        'Comandes de plataformes externes registrades per API',
      ],
      es: [
        'Reservas y pedidos gestionados en un solo lugar',
        'Inventario actualizado en tiempo real',
        'Pedidos de plataformas externas registrados por API',
      ],
      en: [
        'Reservations and orders managed in one place',
        'Inventory updated in real time',
        'Orders from external platforms recorded through APIs',
      ],
    },
    technologies: ['React', 'Laravel', 'TypeScript', 'PHP', 'MySQL', 'TailwindCSS'],
    gallery: [
      '/projects/sushisudoku/Home.webp',
      '/projects/sushisudoku/food-Images.webp',
      '/projects/sushisudoku/Products-to-change.webp',
      '/projects/sushisudoku/reviews.webp',
      '/projects/sushisudoku/reservationForm.webp',
    ],
    link: 'https://www.sushisudoku.com/',
  },
]

export const findProject = (id: string | undefined) => projects.find((p) => p.id === id)

/** The project that opens the home page: the one whose screenshots read best at first glance. */
export const featuredProject = findProject('sushi-sudoku') ?? projects[0]
