import type { Messages } from './ca'

export const es: Messages = {
  meta: {
    siteName: 'DuckHats',
    tagline: 'Software y servicios digitales para negocios',
    ogLocale: 'es_ES',
  },
  a11y: {
    skipToContent: 'Saltar al contenido',
    mainNav: 'Navegación principal',
    footerNav: 'Navegación del pie de página',
    openMenu: 'Abrir el menú',
    closeMenu: 'Cerrar el menú',
    language: 'Idioma',
    switchTheme: 'Cambiar el tema',
    externalLink: '(se abre en una pestaña nueva)',
    logoAlt: 'Logotipo de DuckHats',
    backToTop: 'Volver arriba',
  },
  nav: {
    home: 'Inicio',
    services: 'Servicios',
    projects: 'Proyectos',
    team: 'Equipo',
    about: 'Nosotros',
    contact: 'Contacto',
    careers: 'Trabaja con nosotros',
    privacy: 'Política de privacidad',
    legal: 'Aviso legal',
    cta: 'Hablemos',
  },
  seo: {
    home: {
      title: 'Software y servicios digitales para negocios',
      description:
        'Estudio de desarrollo en Cataluña: aplicaciones web, APIs, automatización y mantenimiento. Diseñamos, construimos y mantenemos software a medida.',
    },
    services: {
      title: 'Servicios',
      description:
        'Desarrollo front-end y back-end, paneles de gestión, despliegue, automatización, testing y mantenimiento para proyectos digitales.',
    },
    projects: {
      title: 'Proyectos',
      description:
        'Una selección de los proyectos que hemos diseñado y desarrollado para clientes.',
    },
    team: {
      title: 'Equipo',
      description: 'Las personas detrás de DuckHats: desarrollo, coordinación y administración.',
    },
    about: {
      title: 'Nosotros',
      description: 'Quiénes somos, cómo trabajamos y qué principios guían nuestros proyectos.',
    },
    contact: {
      title: 'Contacto',
      description: 'Cuéntanos tu proyecto y te propondremos los siguientes pasos.',
    },
    careers: {
      title: 'Trabaja con nosotros',
      description: 'Envíanos tu candidatura si quieres colaborar con DuckHats.',
    },
    privacy: {
      title: 'Política de privacidad',
      description: 'Cómo tratamos los datos personales que nos facilitas a través del sitio web.',
    },
    legal: {
      title: 'Aviso legal',
      description: 'Información legal sobre el titular y el uso de este sitio web.',
    },
    notFound: {
      title: 'Página no encontrada',
      description: 'La página que buscas no existe.',
    },
  },
  home: {
    hero: {
      title: 'Software a medida para negocios que tienen que funcionar.',
      subtitle:
        'Aplicaciones web, APIs y automatizaciones. Trabajamos contigo de la idea a la puesta en producción, y nos quedamos para mantenerlo.',
      primaryCta: 'Hablemos de tu proyecto',
      secondaryCta: 'Ver servicios',
      keyHint: 'Flechas ← → para cambiar de sección',
    },
    services: {
      title: 'Del primer boceto al mantenimiento',
      intro: 'Un solo equipo responsable de todo el camino.',
      link: 'Todos los servicios',
      items: [
        {
          title: 'Desarrollo web',
          description: 'Interfaces responsive, accesibles y optimizadas para el rendimiento.',
        },
        {
          title: 'APIs y back-end',
          description: 'Servicios seguros y escalables, documentados y fáciles de integrar.',
        },
        {
          title: 'Automatización e integraciones',
          description: 'Conectamos tus sistemas y eliminamos tareas manuales repetitivas.',
        },
        {
          title: 'Mantenimiento y soporte',
          description: 'Actualizaciones, monitorización y respuesta a incidencias en producción.',
        },
      ],
    },
    cases: {
      title: 'Trabajo reciente',
      intro: 'Algunos de los proyectos que hemos entregado.',
      link: 'Ver todos los proyectos',
    },
    tech: {
      label: 'Tecnologías con las que trabajamos',
    },
    process: {
      title: 'Cómo trabajamos',
      intro: 'Un proceso claro, con puntos de revisión y decisiones documentadas.',
      steps: [
        {
          title: 'Análisis',
          description:
            'Entendemos el objetivo, los usuarios y las restricciones antes de escribir código.',
        },
        {
          title: 'Diseño',
          description:
            'Definimos la arquitectura y la interfaz, y acordamos alcance y estimaciones.',
        },
        {
          title: 'Desarrollo',
          description: 'Entregas iterativas con revisión de código, pruebas y demos periódicas.',
        },
        {
          title: 'Producción y soporte',
          description:
            'Despliegue, monitorización y mantenimiento una vez el producto está en marcha.',
        },
      ],
    },
    team: {
      title: 'Un equipo pequeño, responsable de cada proyecto',
      intro:
        'Un equipo de desarrolladores repartido por Cataluña, con estructura flexible y responsabilidad compartida sobre cada proyecto.',
      link: 'Conoce al equipo',
    },
    cta: {
      title: '¿Tienes un proyecto en mente?',
      description: 'Cuéntanos qué necesitas y te propondremos los siguientes pasos.',
      button: 'Contacta con nosotros',
    },
  },
  services: {
    title: 'Servicios',
    intro:
      'Un catálogo modular: puedes contratar solo lo que necesitas o delegarnos el proyecto completo.',
    disclaimer:
      'Los rangos de horas son estimaciones orientativas. El presupuesto final se define tras el análisis funcional del proyecto.',
    tiersLabel: 'Niveles',
    noteLabel: 'Nota',
  },
  projects: {
    title: 'Proyectos',
    intro:
      'Una selección de nuestro trabajo: el reto, la solución y el resultado de cada proyecto.',
    view: 'Ver proyecto',
    back: 'Todos los proyectos',
    visit: 'Visitar el sitio',
    source: 'Código fuente',
    challenge: 'El reto',
    solution: 'La solución',
    results: 'Resultados',
    technologies: 'Tecnologías',
    gallery: 'Galería',
    notFound: 'No hemos encontrado este proyecto.',
    imageOf: 'Captura de pantalla del proyecto',
    carouselLabel: 'Capturas de pantalla del proyecto',
    previous: 'Captura anterior',
    next: 'Captura siguiente',
    goTo: 'Mostrar la captura {n}',
    slide: 'Captura {n} de {total}',
  },
  team: {
    title: 'Equipo',
    intro: 'Personas con roles claros y responsabilidad compartida sobre cada proyecto.',
    workTitle: 'Cómo nos organizamos',
    workBody:
      'Trabajamos con una estructura flexible: lo que cuenta es la calidad y el cumplimiento de las entregas, no el horario. Confiamos en la autonomía y en la responsabilidad compartida.',
    profile: 'Perfil de',
  },
  about: {
    title: 'Nosotros',
    intro:
      'Somos un estudio de desarrollo de software y servicios digitales. Trabajamos con negocios y organizaciones que necesitan herramientas fiables, mantenibles y bien diseñadas.',
    valuesTitle: 'Principios',
    values: [
      {
        title: 'Criterio técnico',
        description:
          'Elegimos las herramientas según el problema, no al revés. Documentamos las decisiones y dejamos el código preparado para crecer.',
      },
      {
        title: 'Transparencia',
        description:
          'Estimaciones por rangos, comunicación directa y entregas que se pueden verificar.',
      },
      {
        title: 'Responsabilidad',
        description:
          'Cada proyecto tiene un responsable y criterios de aceptación claros. Asumimos los errores y los corregimos.',
      },
    ],
    originTitle: 'Origen',
    originBody:
      'DuckHats se fundó en {year} con una idea sencilla: ofrecer servicios digitales con la calidad de un estudio y la cercanía de un equipo pequeño.',
    approachTitle: 'Cómo trabajamos',
    approachBody:
      'Cada proyecto empieza con un análisis funcional y termina con un producto documentado, probado y desplegado. Mantenemos una comunicación directa con el cliente durante todo el proceso.',
  },
  contact: {
    title: 'Hablemos de tu proyecto',
    intro: 'Cuéntanos qué necesitas y te propondremos los siguientes pasos.',
    detailsTitle: 'Datos de contacto',
    emailLabel: 'Correo electrónico',
    phoneLabel: 'Teléfono',
    socialLabel: 'Redes',
    form: {
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Correo electrónico',
      emailPlaceholder: 'nombre@empresa.com',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntanos brevemente el proyecto y los plazos que tienes en mente…',
      submit: 'Enviar mensaje',
      sending: 'Enviando…',
      success: 'Mensaje enviado. Te responderemos lo antes posible.',
      error: 'No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbenos por correo.',
    },
  },
  careers: {
    title: 'Trabaja con nosotros',
    intro:
      'Si eres desarrollador, diseñador o perfil de producto y te interesa colaborar con nosotros, envíanos tu candidatura.',
    form: {
      name: 'Nombre completo',
      namePlaceholder: 'Tu nombre',
      email: 'Correo electrónico',
      emailPlaceholder: 'nombre@ejemplo.com',
      role: 'Perfil',
      rolePlaceholder: 'Selecciona un perfil',
      otherRole: 'Especifica el perfil',
      roles: {
        frontend: 'Desarrollador/a front-end',
        backend: 'Desarrollador/a back-end',
        fullstack: 'Desarrollador/a full stack',
        design: 'Diseño UI/UX',
        product: 'Gestión de proyectos',
        marketing: 'Marketing',
        other: 'Otros',
      },
      links: 'Enlaces (LinkedIn, GitHub, portfolio)',
      linkPlaceholder: 'https://',
      addLink: 'Añadir un enlace',
      removeLink: 'Eliminar el enlace',
      cv: 'CV (PDF, máx. 5 MB)',
      cvHint: 'Selecciona un archivo PDF',
      message: 'Presentación',
      messagePlaceholder: 'Cuéntanos tu experiencia y qué te interesa aportar.',
      submit: 'Enviar candidatura',
      sending: 'Enviando…',
      success: 'Candidatura enviada. Gracias por tu interés.',
      error: 'No se ha podido enviar la candidatura. Inténtalo de nuevo más tarde.',
    },
  },
  validation: {
    required: 'Este campo es obligatorio.',
    email: 'Introduce un correo electrónico válido.',
    tooLong: 'El texto es demasiado largo.',
    fileType: 'El archivo debe ser un PDF.',
    fileSize: 'El archivo supera el tamaño máximo.',
    url: 'Introduce una dirección web válida.',
  },
  consent: {
    prefix: 'Al enviar este formulario aceptas la',
    link: 'política de privacidad',
  },
  cookies: {
    title: 'Analítica',
    text: 'Usamos Google Analytics para entender cómo se utiliza el sitio. Solo se activa si lo aceptas.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    more: 'Política de privacidad',
  },
  footer: {
    tagline: 'Software y servicios digitales para negocios.',
    navigation: 'Navegación',
    contact: 'Contacto',
    social: 'Redes',
    legal: 'Legal',
    rights: 'Todos los derechos reservados.',
  },
  legalPages: {
    updated: 'Última actualización',
    privacy: {
      sections: [
        {
          title: 'Responsable del tratamiento',
          body: 'DuckHats es el responsable del tratamiento de los datos personales que nos facilitas a través de este sitio web. Puedes contactarnos en {email}.',
        },
        {
          title: 'Datos que recogemos y finalidad',
          body: 'Si usas el formulario de contacto, tratamos tu nombre, correo electrónico y mensaje para responder a tu consulta. Si envías una candidatura, tratamos también el perfil, los enlaces y el CV adjunto para evaluarla.',
        },
        {
          title: 'Base jurídica y conservación',
          body: 'La base jurídica es tu consentimiento y la aplicación de medidas precontractuales a petición tuya. Conservamos los datos durante el tiempo necesario para atender la solicitud y cumplir las obligaciones legales.',
        },
        {
          title: 'Analítica',
          body: 'Usamos Google Analytics solo si lo aceptas en el aviso de analítica. Puedes cambiar tu decisión borrando los datos del sitio en el navegador.',
        },
        {
          title: 'Derechos',
          body: 'Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiéndonos a {email}. También puedes presentar una reclamación ante la autoridad de protección de datos competente.',
        },
      ],
    },
    legal: {
      sections: [
        {
          title: 'Titular del sitio web',
          body: 'Este sitio web es titularidad de DuckHats. Contacto: {email}.',
        },
        {
          title: 'Condiciones de uso',
          body: 'El acceso al sitio es gratuito. El usuario se compromete a hacer un uso lícito del mismo y a no perjudicar su funcionamiento.',
        },
        {
          title: 'Propiedad intelectual',
          body: 'Los contenidos, el diseño y el código de este sitio son propiedad de DuckHats o de sus licenciantes. No pueden reproducirse sin autorización expresa.',
        },
        {
          title: 'Responsabilidad',
          body: 'Procuramos que la información sea exacta y actual, pero no garantizamos la ausencia de errores. DuckHats no se hace responsable de los contenidos de enlaces externos.',
        },
      ],
    },
  },
  notFound: {
    title: 'Esta página no existe',
    body: 'Quizá la dirección ha cambiado o se ha escrito mal.',
    back: 'Volver al inicio',
  },
  error: {
    title: 'Algo ha fallado',
    body: 'Ha habido un error inesperado al cargar esta página.',
    retry: 'Inténtalo de nuevo',
  },
}
