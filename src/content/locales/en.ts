import type { Messages } from './ca'

export const en: Messages = {
  meta: {
    siteName: 'DuckHats',
    tagline: 'Software and digital services for businesses',
    ogLocale: 'en_GB',
  },
  a11y: {
    skipToContent: 'Skip to content',
    mainNav: 'Main navigation',
    footerNav: 'Footer navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    switchTheme: 'Switch theme',
    externalLink: '(opens in a new tab)',
    logoAlt: 'DuckHats logo',
    backToTop: 'Back to top',
  },
  nav: {
    home: 'Home',
    services: 'Services',
    projects: 'Projects',
    team: 'Team',
    about: 'About',
    contact: 'Contact',
    careers: 'Work with us',
    privacy: 'Privacy policy',
    legal: 'Legal notice',
    cta: 'Get in touch',
  },
  seo: {
    home: {
      title: 'Software and digital services for businesses',
      description:
        'Development studio based in Catalonia: web applications, APIs, automation and maintenance. We design, build and maintain custom software.',
    },
    services: {
      title: 'Services',
      description:
        'Front-end and back-end development, admin panels, deployment, automation, testing and maintenance for digital projects.',
    },
    projects: {
      title: 'Projects',
      description: 'A selection of the projects we have designed and built for clients.',
    },
    team: {
      title: 'Team',
      description: 'The people behind DuckHats: development, coordination and administration.',
    },
    about: {
      title: 'About',
      description: 'Who we are, how we work and the principles behind our projects.',
    },
    contact: {
      title: 'Contact',
      description: 'Tell us about your project and we will propose the next steps.',
    },
    careers: {
      title: 'Work with us',
      description: 'Send us your application if you would like to collaborate with DuckHats.',
    },
    privacy: {
      title: 'Privacy policy',
      description: 'How we handle the personal data you provide through this website.',
    },
    legal: {
      title: 'Legal notice',
      description: 'Legal information about the owner and the use of this website.',
    },
    notFound: {
      title: 'Page not found',
      description: 'The page you are looking for does not exist.',
    },
  },
  home: {
    hero: {
      eyebrow: 'Development studio · Catalonia',
      title: 'Custom software to help your business grow.',
      subtitle:
        'We design, build and maintain web applications, APIs and automations. A small, direct team, from analysis to production.',
      primaryCta: 'Talk about your project',
      secondaryCta: 'See services',
    },
    services: {
      eyebrow: 'Services',
      title: 'The full lifecycle of a digital product',
      intro: 'From the first prototype to maintenance: one team accountable for the whole journey.',
      link: 'All services',
      items: [
        {
          title: 'Web development',
          description: 'Responsive, accessible interfaces tuned for performance.',
        },
        {
          title: 'APIs and back-end',
          description: 'Secure, scalable services that are documented and easy to integrate.',
        },
        {
          title: 'Automation and integrations',
          description: 'We connect your systems and remove repetitive manual work.',
        },
        {
          title: 'Maintenance and support',
          description: 'Updates, monitoring and incident response once you are in production.',
        },
      ],
    },
    cases: {
      eyebrow: 'Projects',
      title: 'Recent work',
      intro: 'A few of the projects we have delivered.',
      link: 'View all projects',
    },
    process: {
      eyebrow: 'Method',
      title: 'How we work',
      intro: 'A clear process, with review points and documented decisions.',
      steps: [
        {
          title: 'Analysis',
          description: 'We understand the goal, the users and the constraints before writing code.',
        },
        {
          title: 'Design',
          description:
            'We define the architecture and the interface, and agree on scope and estimates.',
        },
        {
          title: 'Development',
          description: 'Iterative deliveries with code review, testing and regular demos.',
        },
        {
          title: 'Production and support',
          description: 'Deployment, monitoring and maintenance once the product is live.',
        },
      ],
    },
    team: {
      eyebrow: 'Team',
      title: 'A small team, accountable for every project',
      intro:
        'A team of developers spread across Catalonia, with a flexible structure and shared responsibility for each project.',
      link: 'Meet the team',
    },
    cta: {
      title: 'Have a project in mind?',
      description: 'Tell us what you need and we will propose the next steps.',
      button: 'Contact us',
    },
  },
  services: {
    title: 'Services',
    intro: 'A modular catalogue: hire only what you need, or hand us the whole project.',
    disclaimer:
      'Hour ranges are indicative estimates. The final quote is defined after the functional analysis of the project.',
    tiersLabel: 'Tiers',
    noteLabel: 'Note',
  },
  projects: {
    title: 'Projects',
    intro: 'A selection of our work: the challenge, the solution and the outcome of each project.',
    view: 'View project',
    back: 'All projects',
    visit: 'Visit site',
    source: 'Source code',
    challenge: 'The challenge',
    solution: 'The solution',
    results: 'Results',
    technologies: 'Technologies',
    gallery: 'Gallery',
    notFound: 'We could not find this project.',
    imageOf: 'Screenshot of the project',
  },
  team: {
    title: 'Team',
    intro: 'People with clear roles and shared responsibility for every project.',
    workTitle: 'How we are organised',
    workBody:
      'We work with a flexible structure: what matters is the quality and delivery of the work, not the schedule. We rely on autonomy and shared responsibility.',
    profile: 'Profile of',
  },
  about: {
    title: 'About',
    intro:
      'We are a software and digital services studio. We work with businesses and organisations that need reliable, maintainable and well-designed tools.',
    valuesTitle: 'Principles',
    values: [
      {
        title: 'Technical judgement',
        description:
          'We pick tools for the problem, not the other way round. We document decisions and leave the code ready to grow.',
      },
      {
        title: 'Transparency',
        description: 'Range-based estimates, direct communication and deliveries you can verify.',
      },
      {
        title: 'Accountability',
        description:
          'Every project has an owner and clear acceptance criteria. We own our mistakes and fix them.',
      },
    ],
    originTitle: 'Origin',
    originBody:
      'DuckHats was founded in {year} with a simple idea: offer digital services with the quality of a studio and the closeness of a small team.',
    approachTitle: 'How we work',
    approachBody:
      'Every project starts with a functional analysis and ends with a documented, tested and deployed product. We keep direct communication with the client throughout.',
  },
  contact: {
    title: 'Let’s talk about your project',
    intro: 'Tell us what you need and we will propose the next steps.',
    detailsTitle: 'Contact details',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    socialLabel: 'Social',
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'name@company.com',
      message: 'Message',
      messagePlaceholder: 'Briefly tell us about the project and the timeline you have in mind…',
      submit: 'Send message',
      sending: 'Sending…',
      success: 'Message sent. We will get back to you as soon as we can.',
      error: 'The message could not be sent. Please try again or email us directly.',
    },
  },
  careers: {
    title: 'Work with us',
    intro:
      'If you are a developer, designer or product profile and want to collaborate with us, send us your application.',
    form: {
      name: 'Full name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'name@example.com',
      role: 'Profile',
      rolePlaceholder: 'Select a profile',
      otherRole: 'Specify the profile',
      roles: {
        frontend: 'Front-end developer',
        backend: 'Back-end developer',
        fullstack: 'Full stack developer',
        design: 'UI/UX design',
        product: 'Project management',
        marketing: 'Marketing',
        other: 'Other',
      },
      links: 'Links (LinkedIn, GitHub, portfolio)',
      linkPlaceholder: 'https://',
      addLink: 'Add a link',
      removeLink: 'Remove link',
      cv: 'CV (PDF, max. 5 MB)',
      cvHint: 'Select a PDF file',
      message: 'Introduction',
      messagePlaceholder: 'Tell us about your experience and what you would like to contribute.',
      submit: 'Send application',
      sending: 'Sending…',
      success: 'Application sent. Thank you for your interest.',
      error: 'The application could not be sent. Please try again later.',
    },
  },
  validation: {
    required: 'This field is required.',
    email: 'Enter a valid email address.',
    tooLong: 'The text is too long.',
    fileType: 'The file must be a PDF.',
    fileSize: 'The file exceeds the maximum size.',
    url: 'Enter a valid web address.',
  },
  consent: {
    prefix: 'By submitting this form you accept the',
    link: 'privacy policy',
  },
  cookies: {
    title: 'Analytics',
    text: 'We use Google Analytics to understand how the site is used. It only runs if you accept.',
    accept: 'Accept',
    reject: 'Reject',
    more: 'Privacy policy',
  },
  footer: {
    tagline: 'Software and digital services for businesses.',
    navigation: 'Navigation',
    contact: 'Contact',
    social: 'Social',
    legal: 'Legal',
    rights: 'All rights reserved.',
  },
  legalPages: {
    updated: 'Last updated',
    privacy: {
      sections: [
        {
          title: 'Data controller',
          body: 'DuckHats is the controller of the personal data you provide through this website. You can reach us at {email}.',
        },
        {
          title: 'Data we collect and purpose',
          body: 'If you use the contact form, we process your name, email and message to answer your enquiry. If you submit an application, we also process your profile, links and attached CV to assess it.',
        },
        {
          title: 'Legal basis and retention',
          body: 'The legal basis is your consent and the application of pre-contractual measures at your request. We keep the data for as long as needed to handle the request and meet legal obligations.',
        },
        {
          title: 'Analytics',
          body: 'We use Google Analytics only if you accept it in the analytics notice. You can change your decision by clearing the site data in your browser.',
        },
        {
          title: 'Your rights',
          body: 'You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to {email}. You may also lodge a complaint with the competent data protection authority.',
        },
      ],
    },
    legal: {
      sections: [
        {
          title: 'Website owner',
          body: 'This website is owned by DuckHats. Contact: {email}.',
        },
        {
          title: 'Terms of use',
          body: 'Access to the website is free. Users agree to use it lawfully and not to impair its operation.',
        },
        {
          title: 'Intellectual property',
          body: 'The content, design and code of this website belong to DuckHats or its licensors and may not be reproduced without express permission.',
        },
        {
          title: 'Liability',
          body: 'We aim for accurate and up-to-date information but cannot guarantee it is error-free. DuckHats is not responsible for the content of external links.',
        },
      ],
    },
  },
  notFound: {
    title: 'This page does not exist',
    body: 'The address may have changed or been mistyped.',
    back: 'Back to home',
  },
  error: {
    title: 'Something went wrong',
    body: 'An unexpected error occurred while loading this page.',
    retry: 'Try again',
  },
}
