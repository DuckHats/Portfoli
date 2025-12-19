export type Project = {
  id: string
  title: string
  date: string
  category: {
    ca: string
    es: string
    en: string
  }
  image: string
  description: {
    ca: string
    es: string
    en: string
  }
  challenge: {
    ca: string
    es: string
    en: string
  }
  solution: {
    ca: string
    es: string
    en: string
  }
  results: {
    ca: string[]
    es: string[]
    en: string[]
  }
  technologies: string[]
  gallery: string[]
  link?: string
  github?: string
}

export const projectsData: Project[] = [
  {
    id: 'menu-ginebro',
    title: 'MENÚ GINEBRO',
    date: 'En Procés',
    category: {
      ca: 'Aplicació Web',
      es: 'Aplicación Web',
      en: 'Web App',
    },
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpetfood.guide%2Fwp-content%2Fuploads%2F2022%2F06%2Fwapt_image_post_-6.jpg&f=1&nofb=1&ipt=4f82a78be934f6f0dbbde99f0ec727af671f40f99f74f7c98bf0402e07aed173',
    description: {
      ca: "Sistema complet de gestió de menús escolars per a l'Escola Ginebro. Permet als estudiants seleccionar els seus menús setmanals i als administradors gestionar plats, usuaris i comandes amb facilitat.",
      es: 'Sistema completo de gestión de menús escolares para la Escuela Ginebro. Permite a los estudiantes seleccionar sus menús semanales y a los administradores gestionar platos, usuarios y pedidos con facilidad.',
      en: 'Complete school menu management system for Escola Ginebro. Allows students to select their weekly menus and administrators to manage dishes, users and orders with ease.',
    },
    challenge: {
      ca: "L'escola necessitava digitalitzar el procés de selecció de menús escolars, eliminant el paper i millorant l'eficiència en la gestió de pedidos diaris per a centenars d'estudiants.",
      es: 'La escuela necesitaba digitalizar el proceso de selección de menús escolares, eliminando el papel y mejorando la eficiencia en la gestión de pedidos diarios para cientos de estudiantes.',
      en: 'The school needed to digitize the school menu selection process, eliminating paper and improving efficiency in managing daily orders for hundreds of students.',
    },
    solution: {
      ca: "Desenvolupament d'una aplicació web completa amb Angular i Laravel, incloent autenticació segura, gestió de rols (admin, cuiners, estudiants), importació/exportació massiva de dades i un calendari interactiu per a la selecció de menús.",
      es: 'Desarrollo de una aplicación web completa con Angular y Laravel, incluyendo autenticación segura, gestión de roles (admin, cocineros, estudiantes), importación/exportación masiva de datos y un calendario interactivo para la selección de menús.',
      en: 'Development of a complete web application with Angular and Laravel, including secure authentication, role management (admin, cooks, students), bulk data import/export and an interactive calendar for menu selection.',
    },
    results: {
      ca: [
        'Eliminació completa del procés en paper',
        'Reducció del 70% en temps de gestió administrativa',
        'Sistema de verificació per email amb OTP',
        'Dashboard amb mètriques en temps real',
      ],
      es: [
        'Eliminación completa del proceso en papel',
        'Reducción del 70% en tiempo de gestión administrativa',
        'Sistema de verificación por email con OTP',
        'Dashboard con métricas en tiempo real',
      ],
      en: [
        'Complete elimination of paper process',
        '70% reduction in administrative management time',
        'Email verification system with OTP',
        'Dashboard with real-time metrics',
      ],
    },
    technologies: [
      'Angular 19',
      'Laravel 10',
      'TypeScript',
      'PHP',
      'MySQL',
      'TailwindCSS',
      'Angular Material',
      'Laravel Sanctum',
    ],
    gallery: [
      '/public/menu-select.png',
      '/public/orders.png',
      '/public/history-orders.png',
    ],
    link: '',
    github: 'https://github.com/DuckHats/menu-ginebro-front',
  },
]
