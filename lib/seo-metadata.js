// Fuente única de datos de FrecDigital.
// Todo dato de empresa que aparezca en la web, el SEO o el chatbot sale de aquí.
// Los campos vacíos ('') están pendientes: se omiten en la web hasta que se rellenen.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://frecdigital.com';

export const company = {
  name: 'FrecDigital',
  url: SITE_URL,
  shortDescription: 'Consultora de IA aplicada para pymes e industria',
  description:
    'FrecDigital es una consultora de inteligencia artificial aplicada para pymes e industria, con actividad en España (Castellón) y Ecuador (Guayaquil).',
  email: 'fespinoza@frecdigital.com',
  logo: { url: '/images/logo1.webp', width: 200, height: 200 },

  whatsapp: {
    es: { country: 'España', number: '34643466617', display: '+34 643 466 617' },
    ec: { country: 'Ecuador', number: '', display: '' }, // pendiente
  },

  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '16:00',
    timeZone: 'Europe/Madrid',
    label: 'Lunes a viernes, 08:00–16:00 (hora de España)',
    short: 'Lun - Vie, 08:00 a 16:00 (hora de España)',
  },

  locations: [
    { city: 'Castellón', country: 'ES', countryName: 'España' },
    { city: 'Guayaquil', country: 'EC', countryName: 'Ecuador' },
  ],

  social: {
    linkedin: '', // pendiente
    instagram: '', // pendiente
  },

  founder: {
    name: 'Franklin Espinoza',
    degree: 'Ingeniero en Sistemas Computacionales',
    masters: 'Máster en Sistemas Inteligentes',
    university: 'Universitat Jaume I',
    currentRole: 'Responsable del área de IA en una empresa industrial del sector cerámico',
    experience: 'más de 20 años en proyectos tecnológicos',
  },
};

const DEFAULT_WHATSAPP_MESSAGE =
  'Hola. Me interesa conocer más sobre sus servicios, ¿podrían brindarme más información? Muchas gracias.';

/** Enlace wa.me del país indicado, o null si ese número aún no está definido. */
export function whatsappUrl(country = 'es', message = DEFAULT_WHATSAPP_MESSAGE) {
  const number = company.whatsapp[country]?.number;
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Redes sociales con URL definida, en formato [{ key, url }]. */
export function activeSocialLinks() {
  return Object.entries(company.social)
    .filter(([, url]) => Boolean(url))
    .map(([key, url]) => ({ key, url }));
}

// Metadatos globales para SEO (usados por layout, robots y sitemap)
export const siteMetadata = {
  siteName: company.name,
  siteUrl: SITE_URL,
  description:
    'Consultora de inteligencia artificial aplicada para pymes e industria en España y Ecuador: asistentes de IA, automatización de procesos e integración de sistemas.',
  keywords: [
    'consultora de IA',
    'inteligencia artificial para pymes',
    'IA para la industria',
    'automatización de procesos',
    'asistentes de IA',
    'Castellón',
    'Guayaquil',
  ],
  author: company.name,
  language: 'es',
  locale: 'es_ES',

  services: [
    {
      name: 'Asistentes de IA Especializados',
      description: 'Asistentes de IA que atienden a tus clientes en WhatsApp, Instagram y web, personalizados para cada sector',
      image: '/images/Chatbots.webp',
    },
    {
      name: 'Automatización de Procesos',
      description: 'Automatización de tareas repetitivas para aumentar productividad y reducir costos',
      image: '/images/Automatización.webp',
    },
    {
      name: 'Integración de Sistemas',
      description: 'Conectamos CRM, ERP y aplicaciones para centralizar datos en tiempo real',
      image: '/images/Integración.webp',
    },
    {
      name: 'Agendamiento Inteligente',
      description: 'Asistente de IA que agenda, confirma y recuerda citas automáticamente',
      image: '/images/agendamiento.webp',
    },
    {
      name: 'Consultas Gerenciales IA',
      description: 'Consulta tus datos de ventas en lenguaje natural y obtén reportes al instante',
      image: '/images/gerencial.webp',
    },
  ],
};

/**
 * Genera Schema.org structured data.
 * (Se amplía en la fase 2: ProfessionalService, Person, WebSite, Service.)
 */
export function generateSchemaMarkup(type = 'Organization') {
  const schemas = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: company.name,
      url: company.url,
      logo: `${company.url}${company.logo.url}`,
      description: company.description,
      email: company.email,
      sameAs: activeSocialLinks().map((s) => s.url),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: company.whatsapp.es.display,
        email: company.email,
        contactType: 'customer service',
        areaServed: 'ES',
        availableLanguage: 'es',
      },
    },

    FAQPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Qué es FrecDigital?',
          acceptedAnswer: { '@type': 'Answer', text: company.description },
        },
        {
          '@type': 'Question',
          name: '¿Qué servicios ofrecen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ofrecemos asistentes de IA especializados, automatización de procesos e integración de sistemas con IA.',
          },
        },
      ],
    },
  };

  return schemas[type] || schemas.Organization;
}
