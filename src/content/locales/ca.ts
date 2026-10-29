// Catalan is the source locale: its shape defines `Messages`.
// es.ts and en.ts must match it exactly (enforced by the type and by translations.test.ts).
export const ca = {
  meta: {
    siteName: 'DuckHats',
    tagline: 'Programari i serveis digitals per a negocis',
    ogLocale: 'ca_ES',
  },
  a11y: {
    skipToContent: 'Salta al contingut',
    mainNav: 'Navegació principal',
    footerNav: 'Navegació del peu de pàgina',
    openMenu: 'Obre el menú',
    closeMenu: 'Tanca el menú',
    language: 'Idioma',
    switchTheme: 'Canvia el tema',
    externalLink: '(s’obre en una pestanya nova)',
    logoAlt: 'Logotip de DuckHats',
    backToTop: 'Torna a dalt',
    requiredNote: 'Camps obligatoris',
  },
  nav: {
    home: 'Inici',
    services: 'Serveis',
    projects: 'Projectes',
    about: 'Nosaltres',
    contact: 'Contacte',
    careers: 'Treballa amb nosaltres',
    privacy: 'Política de privacitat',
    legal: 'Avís legal',
    cta: 'Parlem',
  },
  seo: {
    home: {
      title: 'Programari i serveis digitals per a negocis',
      description:
        'Estudi de desenvolupament a Catalunya: aplicacions web, APIs, automatització i manteniment. Dissenyem, construïm i mantenim programari a mida.',
    },
    services: {
      title: 'Serveis',
      description:
        'Desenvolupament front-end i back-end, panells de gestió, desplegament, automatització, testing i manteniment per a projectes digitals.',
    },
    projects: {
      title: 'Projectes',
      description: 'Una selecció dels projectes que hem dissenyat i desenvolupat per a clients.',
    },
    about: {
      title: 'Nosaltres i l’equip',
      description:
        'Qui som, les persones darrere de DuckHats, com treballem i quins principis guien els nostres projectes.',
    },
    contact: {
      title: 'Contacte',
      description:
        'Explica’ns el teu projecte pas a pas: què necessites, terminis i pressupost orientatiu. Et respondrem per correu amb els propers passos.',
    },
    careers: {
      title: 'Treballa amb nosaltres',
      description:
        'Envia’ns la teva candidatura si ets desenvolupador, dissenyador o perfil de producte i t’interessa col·laborar amb DuckHats.',
    },
    privacy: {
      title: 'Política de privacitat',
      description:
        'Com tractem les dades personals que ens facilites a través del web: finalitat, base jurídica, conservació, analítica i els teus drets.',
    },
    legal: {
      title: 'Avís legal',
      description:
        'Informació legal sobre el titular d’aquest web, les condicions d’ús, la propietat intel·lectual i la responsabilitat.',
    },
    notFound: {
      title: 'Pàgina no trobada',
      description: 'La pàgina que busques no existeix.',
    },
  },
  palette: {
    open: 'Obre la cerca ràpida',
    title: 'Cerca ràpida',
    placeholder: 'Cerca una pàgina, un projecte o una acció',
    empty: 'Cap resultat',
    pages: 'Pàgines',
    projects: 'Projectes',
    actions: 'Accions',
    theme: 'Canvia el tema clar o fosc',
    copyEmail: 'Copia el correu',
    copied: 'Correu copiat',
    language: 'Canvia a {name}',
  },
  home: {
    hero: {
      title: 'Programari a mida per a negocis que han de funcionar.',
      subtitle:
        'Aplicacions web, APIs i automatitzacions. Treballem amb tu de la idea a la posada en producció, i ens quedem per mantenir-ho.',
      primaryCta: 'Parlem del teu projecte',
      secondaryCta: 'Veure serveis',
      keyHint: 'Fletxes ← → per canviar de secció',
    },
    services: {
      title: 'Del primer esbós al manteniment',
      intro: 'Un sol equip responsable de tot el camí.',
      link: 'Tots els serveis',
      items: [
        {
          title: 'Desenvolupament web',
          description: 'Interfícies responsive, accessibles i optimitzades per al rendiment.',
        },
        {
          title: 'APIs i back-end',
          description: 'Serveis segurs i escalables, documentats i fàcils d’integrar.',
        },
        {
          title: 'Automatització i integracions',
          description: 'Connectem els teus sistemes i eliminem tasques manuals repetitives.',
        },
        {
          title: 'Manteniment i suport',
          description: 'Actualitzacions, monitoratge i resposta a incidències un cop en producció.',
        },
      ],
    },
    cases: {
      title: 'Feina recent',
      intro: 'Alguns dels projectes que hem lliurat.',
      link: 'Veure tots els projectes',
    },
    marquee: {
      label: 'Què fem',
      pause: 'Atura l’animació',
    },
    process: {
      title: 'Com treballem',
      intro: 'Un procés clar, amb punts de revisió i decisions documentades.',
      steps: [
        {
          title: 'Anàlisi',
          description: 'Entenem l’objectiu, els usuaris i les restriccions abans d’escriure codi.',
        },
        {
          title: 'Disseny',
          description: 'Definim l’arquitectura i la interfície, i acordem abast i estimacions.',
        },
        {
          title: 'Desenvolupament',
          description:
            'Lliuraments iteratius amb revisió de codi, proves i demostracions periòdiques.',
        },
        {
          title: 'Producció i suport',
          description: 'Desplegament, monitoratge i manteniment un cop el producte és en marxa.',
        },
      ],
    },
    team: {
      title: 'Un equip petit, responsable de cada projecte',
      intro:
        'Un equip de desenvolupadors repartit per Catalunya, amb estructura flexible i responsabilitat compartida sobre cada projecte.',
      link: 'Coneix l’equip',
    },
    cta: {
      title: 'Tens un projecte en ment?',
      description: 'Explica’ns què necessites i et proposarem els propers passos.',
      button: 'Contacta amb nosaltres',
    },
  },
  services: {
    title: 'Serveis',
    intro:
      'Un catàleg modular: pots contractar només el que necessites o delegar-nos el projecte complet.',
    disclaimer:
      'Els rangs d’hores són estimacions orientatives. El pressupost final es defineix després de l’anàlisi funcional del projecte.',
    tiersLabel: 'Nivells',
    noteLabel: 'Nota',
  },
  projects: {
    title: 'Projectes',
    intro: 'Una selecció del nostre treball: el repte, la solució i el resultat de cada projecte.',
    view: 'Veure projecte',
    back: 'Tots els projectes',
    visit: 'Visitar el lloc',
    source: 'Codi font',
    challenge: 'El repte',
    solution: 'La solució',
    results: 'Resultats',
    technologies: 'Tecnologies',
    gallery: 'Galeria',
    notFound: 'No hem trobat aquest projecte.',
    imageOf: 'Captura de pantalla del projecte',
    carouselLabel: 'Captures de pantalla del projecte',
    previous: 'Captura anterior',
    next: 'Captura següent',
    goTo: 'Mostra la captura {n}',
    pause: 'Atura el passi automàtic',
    play: 'Reprèn el passi automàtic',
    slide: 'Captura {n} de {total}',
    nextProject: 'Projecte següent',
    enlarge: 'Amplia la captura {n}',
    close: 'Tanca',
  },
  team: {
    title: 'Equip',
    intro: 'Persones amb rols clars i responsabilitat compartida sobre cada projecte.',
    workTitle: 'Com ens organitzem',
    workBody:
      'Treballem amb una estructura flexible: el que compta és la qualitat i el compliment dels lliuraments, no l’horari. Confiem en l’autonomia i en la responsabilitat compartida.',
    profile: 'Perfil de',
  },
  about: {
    title: 'Nosaltres',
    intro:
      'Som un estudi de desenvolupament de programari i serveis digitals. Treballem amb negocis i organitzacions que necessiten eines fiables, mantenibles i ben dissenyades.',
    valuesTitle: 'Principis',
    values: [
      {
        title: 'Criteri tècnic',
        description:
          'Triem les eines segons el problema, no al revés. Documentem les decisions i deixem el codi preparat per créixer.',
      },
      {
        title: 'Transparència',
        description:
          'Estimacions per rangs, comunicació directa i lliuraments que es poden verificar.',
      },
      {
        title: 'Responsabilitat',
        description:
          'Cada projecte té un responsable i criteris d’acceptació clars. Assumim els errors i els corregim.',
      },
    ],
    originTitle: 'Origen',
    originBody:
      'DuckHats es va fundar el {year} amb una idea senzilla: oferir serveis digitals amb la qualitat d’un estudi i la proximitat d’un equip petit.',
    approachTitle: 'Com treballem',
    approachBody:
      'Cada projecte comença amb una anàlisi funcional i acaba amb un producte documentat, provat i desplegat. Mantenim una comunicació directa amb el client durant tot el procés.',
  },
  contact: {
    title: 'Parlem del teu projecte',
    intro: 'Explica’ns què necessites i et proposarem els propers passos.',
    detailsTitle: 'Dades de contacte',
    emailLabel: 'Correu electrònic',
    phoneLabel: 'Telèfon',
    socialLabel: 'Xarxes',
    form: {
      stepOf: 'Pas {n} de {total}',
      back: 'Enrere',
      next: 'Següent',
      backToSummary: 'Torna al resum',
      edit: 'Edita',
      steps: {
        type: { title: 'Què necessites?', hint: 'Tria l’opció que s’hi assembli més.' },
        stage: { title: 'D’on partim?', hint: 'Així sabem per on començar.' },
        features: {
          title: 'Què ha de fer?',
          hint: 'Marca el que calgui; ho afinarem junts més endavant.',
        },
        plan: {
          title: 'Terminis i pressupost',
          hint: 'Una idea aproximada ens ajuda a proposar l’abast adequat.',
        },
        contact: { title: 'Qui ets?', hint: 'Et respondrem per correu.' },
        summary: {
          title: 'Revisa i envia',
          hint: 'Pots editar qualsevol resposta abans d’enviar-la.',
        },
      },
      projectTypes: {
        website: { label: 'Web corporativa', description: 'Presentar l’empresa i captar clients.' },
        ecommerce: {
          label: 'Botiga online',
          description: 'Vendre productes o serveis a internet.',
        },
        webapp: {
          label: 'Aplicació web',
          description: 'Una eina o plataforma a mida per a usuaris o equips.',
        },
        mobile: { label: 'App mòbil', description: 'Una aplicació per a iOS i Android.' },
        design: { label: 'Disseny UI/UX', description: 'Definir o redissenyar la interfície.' },
        other: { label: 'Una altra cosa', description: 'Explica’ns-ho amb les teves paraules.' },
      },
      projectTypeOther: 'Quin tipus de projecte és?',
      projectTypeOtherPlaceholder: 'Per exemple, una integració entre dos programes',
      stages: {
        idea: { label: 'És una idea', description: 'Encara no hi ha res fet.' },
        design: { label: 'Tinc el disseny', description: 'Hi ha disseny o requisits definits.' },
        existing: {
          label: 'Ja existeix',
          description: 'Cal millorar-lo, ampliar-lo o refer-lo.',
        },
      },
      currentUrl: 'Adreça actual (opcional)',
      currentUrlPlaceholder: 'https://',
      featuresLabel: 'Funcionalitats',
      features: {
        payments: 'Pagaments online',
        catalog: 'Catàleg de productes',
        booking: 'Reserves o cites',
        accounts: 'Àrea d’usuaris',
        admin: 'Panell d’administració',
        cms: 'Contingut editable',
        multilingual: 'Diversos idiomes',
        integrations: 'Integracions amb altres eines',
        notifications: 'Avisos i notificacions',
      },
      goal: 'L’objectiu, en una frase',
      goalPlaceholder: 'Per exemple, rebre reserves sense haver de contestar trucades',
      timeline: 'Quan t’agradaria tenir-ho?',
      timelinePlaceholder: 'Selecciona un termini',
      timelines: {
        asap: 'En menys d’un mes',
        short: 'D’1 a 3 mesos',
        medium: 'De 3 a 6 mesos',
        flexible: 'Sense data fixa',
      },
      budget: 'Pressupost orientatiu',
      budgetPlaceholder: 'Selecciona una opció',
      // TODO(client): replace these labels with the real budget ranges (e.g. amounts in euros).
      budgets: {
        small: 'Projecte petit',
        medium: 'Projecte mitjà',
        large: 'Projecte gran',
        xlarge: 'Projecte de llarg recorregut',
        unknown: 'Encara no ho sé',
      },
      name: 'Nom',
      namePlaceholder: 'El teu nom',
      email: 'Correu electrònic',
      emailPlaceholder: 'nom@empresa.com',
      company: 'Empresa (opcional)',
      companyPlaceholder: 'El nom de l’empresa o del projecte',
      message: 'Alguna cosa més? (opcional)',
      messagePlaceholder: 'Referències, dubtes o qualsevol detall que vulguis afegir…',
      submit: 'Envia la petició',
      sending: 'Enviant…',
      success: 'Petició enviada',
      successBody: 'Gràcies. La revisarem i et respondrem per correu tan aviat com puguem.',
      another: 'Envia una altra petició',
      error: 'No s’ha pogut enviar la petició. Torna-ho a provar o escriu-nos per correu.',
    },
  },
  careers: {
    title: 'Treballa amb nosaltres',
    intro:
      'Si ets desenvolupador, dissenyador o perfil de producte i t’interessa col·laborar amb nosaltres, envia’ns la teva candidatura.',
    form: {
      name: 'Nom complet',
      namePlaceholder: 'El teu nom',
      email: 'Correu electrònic',
      emailPlaceholder: 'nom@exemple.com',
      role: 'Perfil',
      rolePlaceholder: 'Selecciona un perfil',
      otherRole: 'Especifica el perfil',
      roles: {
        frontend: 'Desenvolupador/a front-end',
        backend: 'Desenvolupador/a back-end',
        fullstack: 'Desenvolupador/a full stack',
        design: 'Disseny UI/UX',
        product: 'Gestió de projectes',
        marketing: 'Màrqueting',
        other: 'Altres',
      },
      links: 'Enllaços (LinkedIn, GitHub, portfolio)',
      linkPlaceholder: 'https://',
      addLink: 'Afegeix un enllaç',
      removeLink: 'Elimina l’enllaç',
      cv: 'CV (PDF, màx. 5 MB)',
      cvHint: 'Selecciona un fitxer PDF',
      message: 'Presentació',
      messagePlaceholder: 'Explica’ns la teva experiència i què t’interessa aportar.',
      submit: 'Envia la candidatura',
      sending: 'Enviant…',
      success: 'Candidatura enviada. Gràcies pel teu interès.',
      error: 'No s’ha pogut enviar la candidatura. Torna-ho a provar més tard.',
    },
  },
  validation: {
    required: 'Aquest camp és obligatori.',
    email: 'Introdueix un correu electrònic vàlid.',
    tooLong: 'El text és massa llarg.',
    fileType: 'El fitxer ha de ser un PDF.',
    fileSize: 'El fitxer supera la mida màxima.',
    url: 'Introdueix una adreça web vàlida.',
  },
  consent: {
    prefix: 'En enviar aquest formulari acceptes la',
    link: 'política de privacitat',
  },
  cookies: {
    title: 'Analítica',
    text: 'Fem servir Google Analytics per entendre com s’utilitza el web. Només s’activa si ho acceptes.',
    accept: 'Accepta',
    reject: 'Rebutja',
    more: 'Política de privacitat',
  },
  footer: {
    tagline: 'Programari i serveis digitals per a negocis.',
    navigation: 'Navegació',
    contact: 'Contacte',
    social: 'Xarxes',
    legal: 'Legal',
    rights: 'Tots els drets reservats.',
    localTime: 'Hora local a Catalunya',
  },
  legalPages: {
    updated: 'Última actualització',
    privacy: {
      sections: [
        {
          title: 'Responsable del tractament',
          body: 'DuckHats és el responsable del tractament de les dades personals que ens facilites a través d’aquest web. Pots contactar-nos a {email}.',
        },
        {
          title: 'Dades que recollim i finalitat',
          body: 'Si fas servir el formulari de contacte, tractem el teu nom, correu electrònic i missatge per respondre la teva consulta. Si envies una candidatura, tractem també el perfil, els enllaços i el CV adjunt per avaluar-la.',
        },
        {
          title: 'Base jurídica i conservació',
          body: 'La base jurídica és el teu consentiment i l’aplicació de mesures precontractuals a petició teva. Conservem les dades durant el temps necessari per atendre la sol·licitud i complir les obligacions legals.',
        },
        {
          title: 'Analítica',
          body: 'Fem servir Google Analytics només si ho acceptes al bàner d’analítica. Pots canviar la teva decisió esborrant les dades del lloc al navegador.',
        },
        {
          title: 'Drets',
          body: 'Pots exercir els drets d’accés, rectificació, supressió, oposició, limitació i portabilitat escrivint-nos a {email}. També pots presentar una reclamació davant l’Autoritat Catalana de Protecció de Dades.',
        },
      ],
    },
    legal: {
      sections: [
        {
          title: 'Titular del web',
          body: 'Aquest web és titularitat de DuckHats. Contacte: {email}.',
        },
        {
          title: 'Condicions d’ús',
          body: 'L’accés al web és gratuït. L’usuari es compromet a fer-ne un ús lícit i a no perjudicar el seu funcionament.',
        },
        {
          title: 'Propietat intel·lectual',
          body: 'Els continguts, el disseny i el codi d’aquest web són propietat de DuckHats o dels seus llicenciants. No es poden reproduir sense autorització expressa.',
        },
        {
          title: 'Responsabilitat',
          body: 'Procurem que la informació sigui exacta i actual, però no garantim l’absència d’errors. DuckHats no es fa responsable dels continguts d’enllaços externs.',
        },
      ],
    },
  },
  notFound: {
    title: 'Aquesta pàgina no existeix',
    body: 'Potser l’adreça ha canviat o s’ha escrit malament.',
    back: 'Torna a l’inici',
  },
  error: {
    title: 'Alguna cosa ha fallat',
    body: 'Hi ha hagut un error inesperat en carregar aquesta pàgina.',
    retry: 'Torna-ho a provar',
  },
}

export type Messages = typeof ca
