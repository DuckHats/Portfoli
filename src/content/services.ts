import type { Localized } from './types'

export interface ServiceItem {
  id: string
  name: Localized
  description?: Localized
  tiers?: { name: Localized; description?: Localized }[]
  note?: Localized
}

export interface ServiceCategory {
  id: string
  title: Localized
  intro?: Localized
  items: ServiceItem[]
  note?: Localized
}

// TODO(client): add pricing or hour ranges per tier when the commercial offer is defined.
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'build',
    title: { ca: 'Desenvolupament', es: 'Desarrollo', en: 'Development' },
    items: [
      {
        id: 'frontend',
        name: { ca: 'Front-end web', es: 'Front-end web', en: 'Web front-end' },
        description: {
          ca: 'Implementació de la interfície a partir d’un disseny acordat, responsive i amb bones pràctiques de rendiment.',
          es: 'Implementación de la interfaz a partir de un diseño acordado, responsive y con buenas prácticas de rendimiento.',
          en: 'Implementation of the interface from an agreed design, responsive and following performance best practices.',
        },
        tiers: [
          {
            name: { ca: 'Simple', es: 'Simple', en: 'Simple' },
            description: {
              ca: 'Estructura senzilla i components estàndard.',
              es: 'Estructura sencilla y componentes estándar.',
              en: 'Simple structure and standard components.',
            },
          },
          {
            name: { ca: 'Estàndard', es: 'Estándar', en: 'Standard' },
            description: {
              ca: 'Layout més elaborat, interaccions bàsiques i adaptació completa a mòbil.',
              es: 'Layout más elaborado, interacciones básicas y adaptación completa a móvil.',
              en: 'More elaborate layout, basic interactions and full mobile adaptation.',
            },
          },
          {
            name: { ca: 'Avançat', es: 'Avanzado', en: 'Advanced' },
            description: {
              ca: 'Disseny visual personalitzat, animacions, components reutilitzables i optimització.',
              es: 'Diseño visual personalizado, animaciones, componentes reutilizables y optimización.',
              en: 'Custom visual design, animations, reusable components and optimisation.',
            },
          },
        ],
        note: {
          ca: 'No inclou lògica de negoci complexa ni integracions externes.',
          es: 'No incluye lógica de negocio compleja ni integraciones externas.',
          en: 'Does not include complex business logic or external integrations.',
        },
      },
      {
        id: 'api',
        name: { ca: 'APIs i back-end', es: 'APIs y back-end', en: 'APIs and back-end' },
        description: {
          ca: 'Disseny i implementació d’APIs per a ús propi o integració amb tercers, amb criteris de seguretat i escalabilitat.',
          es: 'Diseño e implementación de APIs para uso propio o integración con terceros, con criterios de seguridad y escalabilidad.',
          en: 'Design and implementation of APIs for internal use or third-party integration, built for security and scalability.',
        },
        tiers: [
          {
            name: { ca: 'Simple', es: 'Simple', en: 'Simple' },
            description: {
              ca: 'CRUD bàsic, autenticació simple i validacions estàndard.',
              es: 'CRUD básico, autenticación simple y validaciones estándar.',
              en: 'Basic CRUD, simple authentication and standard validation.',
            },
          },
          {
            name: { ca: 'Mitjana', es: 'Media', en: 'Intermediate' },
            description: {
              ca: 'Gestió de rols, relacions entre entitats i validacions avançades.',
              es: 'Gestión de roles, relaciones entre entidades y validaciones avanzadas.',
              en: 'Role management, entity relationships and advanced validation.',
            },
          },
          {
            name: { ca: 'Avançada', es: 'Avanzada', en: 'Advanced' },
            description: {
              ca: 'Integracions complexes, permisos, pagaments o serveis externs.',
              es: 'Integraciones complejas, permisos, pagos o servicios externos.',
              en: 'Complex integrations, permissions, payments or external services.',
            },
          },
        ],
        note: {
          ca: 'Inclou documentació bàsica (OpenAPI).',
          es: 'Incluye documentación básica (OpenAPI).',
          en: 'Includes basic documentation (OpenAPI).',
        },
      },
      {
        id: 'backoffice',
        name: {
          ca: 'Panell de gestió',
          es: 'Panel de gestión',
          en: 'Admin panel',
        },
        description: {
          ca: 'Interfície per a la gestió interna de dades i continguts.',
          es: 'Interfaz para la gestión interna de datos y contenidos.',
          en: 'Interface for managing internal data and content.',
        },
        tiers: [
          {
            name: { ca: 'Genèric', es: 'Genérico', en: 'Generic' },
            description: {
              ca: 'Panell CRUD estàndard, formularis i taules de dades.',
              es: 'Panel CRUD estándar, formularios y tablas de datos.',
              en: 'Standard CRUD panel, forms and data tables.',
            },
          },
          {
            name: { ca: 'Personalitzat', es: 'Personalizado', en: 'Custom' },
            description: {
              ca: 'Disseny a mida, rols d’usuari, filtres avançats i quadres de comandament.',
              es: 'Diseño a medida, roles de usuario, filtros avanzados y paneles de control.',
              en: 'Tailored design, user roles, advanced filters and dashboards.',
            },
          },
        ],
      },
      {
        id: 'deploy',
        name: {
          ca: 'Desplegament i entorns',
          es: 'Despliegue y entornos',
          en: 'Deployment and environments',
        },
        description: {
          ca: 'Configuració i posada en producció del projecte sobre infraestructura existent o nova.',
          es: 'Configuración y puesta en producción del proyecto sobre infraestructura existente o nueva.',
          en: 'Configuration and go-live of the project on existing or new infrastructure.',
        },
        tiers: [
          {
            name: { ca: 'Desplegament bàsic', es: 'Despliegue básico', en: 'Basic deployment' },
            description: {
              ca: 'Entorn de producció, SSL i configuració inicial.',
              es: 'Entorno de producción, SSL y configuración inicial.',
              en: 'Production environment, SSL and initial configuration.',
            },
          },
          {
            name: {
              ca: 'Sobre un CMS existent',
              es: 'Sobre un CMS existente',
              en: 'On an existing CMS',
            },
            description: {
              ca: 'Configuració, adaptació i posada en marxa sobre un CMS que ja teniu.',
              es: 'Configuración, adaptación y puesta en marcha sobre un CMS que ya tenéis.',
              en: 'Configuration, adaptation and launch on a CMS you already use.',
            },
          },
        ],
        note: {
          ca: 'No inclou els costos d’infraestructura ni de serveis externs.',
          es: 'No incluye los costes de infraestructura ni de servicios externos.',
          en: 'Infrastructure and third-party service costs are not included.',
        },
      },
    ],
  },
  {
    id: 'features',
    title: {
      ca: 'Funcionalitats addicionals',
      es: 'Funcionalidades adicionales',
      en: 'Additional features',
    },
    items: [
      {
        id: 'whatsapp',
        name: { ca: 'Bot de WhatsApp', es: 'Bot de WhatsApp', en: 'WhatsApp bot' },
        description: {
          ca: 'Automatització de respostes i fluxos bàsics.',
          es: 'Automatización de respuestas y flujos básicos.',
          en: 'Automated replies and basic flows.',
        },
      },
      {
        id: 'wcag',
        name: {
          ca: 'Accessibilitat WCAG 2.1 AA',
          es: 'Accesibilidad WCAG 2.1 AA',
          en: 'WCAG 2.1 AA accessibility',
        },
        description: {
          ca: 'Adaptació del projecte per complir criteris d’accessibilitat.',
          es: 'Adaptación del proyecto para cumplir criterios de accesibilidad.',
          en: 'Adapting the project to meet accessibility criteria.',
        },
      },
      {
        id: 'email',
        name: {
          ca: 'Enviament de correus electrònics',
          es: 'Envío de correos electrónicos',
          en: 'Transactional email',
        },
        tiers: [
          { name: { ca: 'Bàsic', es: 'Básico', en: 'Basic' } },
          {
            name: { ca: 'Avançat', es: 'Avanzado', en: 'Advanced' },
            description: {
              ca: 'Plantilles, serveis externs i seguiment.',
              es: 'Plantillas, servicios externos y seguimiento.',
              en: 'Templates, external services and tracking.',
            },
          },
        ],
      },
      {
        id: 'integrations',
        name: {
          ca: 'Integració amb serveis externs',
          es: 'Integración con servicios externos',
          en: 'Third-party integrations',
        },
        description: {
          ca: 'Connexió amb APIs de tercers: pagaments, CRMs, etc.',
          es: 'Conexión con APIs de terceros: pagos, CRMs, etc.',
          en: 'Connection with third-party APIs: payments, CRMs, etc.',
        },
      },
      {
        id: 'mobile',
        name: {
          ca: 'Aplicació mòbil (iOS / Android)',
          es: 'Aplicación móvil (iOS / Android)',
          en: 'Mobile app (iOS / Android)',
        },
        description: {
          ca: 'Desenvolupament d’una app híbrida o nativa amb API pròpia.',
          es: 'Desarrollo de una app híbrida o nativa con API propia.',
          en: 'Hybrid or native app development with a dedicated API.',
        },
      },
      {
        id: 'automation',
        name: {
          ca: 'Automatització de processos',
          es: 'Automatización de procesos',
          en: 'Process automation',
        },
        description: {
          ca: 'Scripts, tasques programades i fluxos de treball.',
          es: 'Scripts, tareas programadas y flujos de trabajo.',
          en: 'Scripts, scheduled jobs and workflows.',
        },
      },
      {
        id: 'iot',
        name: {
          ca: 'Integració amb dispositius IoT',
          es: 'Integración con dispositivos IoT',
          en: 'IoT device integration',
        },
        tiers: [
          { name: { ca: 'Prova de concepte', es: 'Prueba de concepto', en: 'Proof of concept' } },
          {
            name: {
              ca: 'Solució en producció',
              es: 'Solución en producción',
              en: 'Production solution',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'complementary',
    title: {
      ca: 'Serveis complementaris',
      es: 'Servicios complementarios',
      en: 'Complementary services',
    },
    items: [
      {
        id: 'testing',
        name: {
          ca: 'Testing (unitari i e2e)',
          es: 'Testing (unitario y e2e)',
          en: 'Testing (unit and e2e)',
        },
      },
      {
        id: 'performance',
        name: {
          ca: 'Optimització del rendiment',
          es: 'Optimización del rendimiento',
          en: 'Performance optimisation',
        },
      },
      {
        id: 'security',
        name: {
          ca: 'Seguretat bàsica i enduriment',
          es: 'Seguridad básica y endurecimiento',
          en: 'Baseline security and hardening',
        },
      },
      {
        id: 'monitoring',
        name: {
          ca: 'Monitoratge i registres',
          es: 'Monitorización y registros',
          en: 'Monitoring and logging',
        },
      },
      {
        id: 'seo',
        name: { ca: 'SEO tècnic inicial', es: 'SEO técnico inicial', en: 'Initial technical SEO' },
      },
      {
        id: 'analytics',
        name: {
          ca: 'Analítica i esdeveniments',
          es: 'Analítica y eventos',
          en: 'Analytics and events',
        },
      },
      {
        id: 'docs',
        name: {
          ca: 'Documentació tècnica i formació',
          es: 'Documentación técnica y formación',
          en: 'Technical documentation and training',
        },
      },
    ],
  },
  {
    id: 'maintenance',
    title: {
      ca: 'Manteniment i suport',
      es: 'Mantenimiento y soporte',
      en: 'Maintenance and support',
    },
    items: [
      {
        id: 'servers',
        name: {
          ca: 'Manteniment de servidors i sistemes',
          es: 'Mantenimiento de servidores y sistemas',
          en: 'Server and systems maintenance',
        },
        description: {
          ca: 'Actualitzacions bàsiques, revisió d’errors i suport tècnic limitat.',
          es: 'Actualizaciones básicas, revisión de errores y soporte técnico limitado.',
          en: 'Routine updates, error review and limited technical support.',
        },
      },
    ],
    note: {
      ca: 'Subjecte als costos propis del servidor i dels serveis contractats.',
      es: 'Sujeto a los costes propios del servidor y de los servicios contratados.',
      en: 'Subject to the costs of the server and contracted services.',
    },
  },
]
