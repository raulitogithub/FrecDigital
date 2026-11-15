// Fuente única de datos de FrecDigital.
// Todo dato de empresa que aparezca en la web, el SEO o el chatbot sale de aquí.
// Los campos vacíos ('') están pendientes: se omiten en la web hasta que se rellenen.
// Los servicios viven en lib/services.js.

import { services, joinEs } from '@/lib/services';

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

  // Sin horario público a propósito: la empresa atiende a clientes de varios husos
  // horarios y no quiere limitar cuándo pueden contactar. El compromiso publicado
  // es la primera respuesta en menos de 24 h en días laborables.

  locations: [
    { city: 'Castellón', country: 'ES', countryName: 'España' },
    { city: 'Guayaquil', country: 'EC', countryName: 'Ecuador' },
  ],

  social: {
    linkedin: '', // pendiente
    instagram: '', // pendiente
  },

  // Perfil del equipo, sin datos personales: por decisión del titular no se publican
  // su nombre ni su empleador actual (el nombre solo figura en las páginas legales).
  team: {
    degree: 'ingeniero en sistemas computacionales',
    masters: 'máster en sistemas inteligentes',
    university: 'Universitat Jaume I',
    experience: 'más de 20 años en proyectos tecnológicos',
    industryRole: 'experiencia liderando la implantación de IA en la industria',
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
    'Consultora de IA aplicada para pymes e industria en España y Ecuador: asistentes de IA, automatización, visión artificial e integración de sistemas.',
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

  // Derivado de lib/services.js: el schema coincide siempre con lo visible
  services: services.map((s) => ({
    slug: s.slug,
    name: s.title,
    description: s.shortDescription,
    detail: s.detail,
    image: s.image,
  })),
};

// ─── Preguntas frecuentes ───────────────────────────────────────────────
// Se muestran en FAQSection y se publican como FAQPage con el mismo texto.
// Solo usan datos de `company` o afirmaciones ya presentes en la web.

const { team } = company;

export const faqs = [
  {
    question: '¿Qué es FrecDigital?',
    answer: company.description,
  },
  {
    question: '¿Qué servicios ofrece FrecDigital?',
    answer: `Ofrecemos ${joinEs(services.map((s) => s.title))}. Cada solución se adapta a los procesos de tu empresa.`,
  },
  {
    question: '¿En qué países trabaja FrecDigital?',
    answer: 'Trabajamos en España, desde Castellón, y en Ecuador, desde Guayaquil.',
  },
  {
    question: '¿Quién está detrás de FrecDigital?',
    answer: `FrecDigital está liderada por un ${team.degree} con un ${team.masters} por la ${team.university}, que acumula ${team.experience} y tiene ${team.industryRole}.`,
  },
  {
    question: '¿Puedo ver una solución funcionando antes de contratar?',
    answer: 'Sí. Te enseñamos una demo de la solución funcionando antes de que contrates.',
  },
  {
    question: '¿Cuánto cuesta un proyecto?',
    answer: 'Los precios son personalizados según tu proyecto. Cuéntanos qué necesitas y te preparamos una propuesta adaptada a tu negocio.',
  },
  {
    question: '¿Cómo contacto con FrecDigital?',
    answer: `Puedes escribirnos a ${company.email}, por WhatsApp al ${company.whatsapp.es.display} o desde el formulario de contacto. La primera respuesta llega en menos de 24 horas en días laborables.`,
  },
];

// ─── Datos estructurados (JSON-LD) ──────────────────────────────────────
// Un único grafo enlazado por @id: la organización, la web,
// la home, sus servicios y las preguntas frecuentes se referencian entre sí.

export const ids = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  homepage: `${SITE_URL}/#webpage`,
  faq: `${SITE_URL}/#faq`,
};

const countries = company.locations.map((l) => ({ '@type': 'Country', name: l.countryName }));

function organizationNode() {
  const contactPoints = Object.values(company.whatsapp)
    .filter((w) => w.number)
    .map((w) => ({
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${w.number}`,
      email: company.email,
      areaServed: company.locations.find((l) => l.countryName === w.country)?.country,
      availableLanguage: 'es',
    }));

  const sameAs = activeSocialLinks().map((s) => s.url);

  return {
    '@type': 'ProfessionalService',
    '@id': ids.organization,
    name: company.name,
    url: company.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${company.logo.url}`,
      width: company.logo.width,
      height: company.logo.height,
    },
    image: `${SITE_URL}${company.logo.url}`,
    description: company.description,
    slogan: company.shortDescription,
    email: company.email,
    ...(company.whatsapp.es.number && { telephone: `+${company.whatsapp.es.number}` }),
    address: company.locations.map((l) => ({
      '@type': 'PostalAddress',
      addressLocality: l.city,
      addressCountry: l.country,
    })),
    areaServed: countries,
    contactPoint: contactPoints,
    knowsAbout: [
      'Inteligencia artificial aplicada',
      'Automatización de procesos',
      'Asistentes de IA',
      'Integración de sistemas',
      'IA para la industria',
      'Visión artificial industrial',
      'Microsoft Dynamics 365',
      'Gobernanza de IA',
    ],
    ...(sameAs.length > 0 && { sameAs }),
  };
}


function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: SITE_URL,
    name: company.name,
    description: siteMetadata.description,
    inLanguage: 'es',
    publisher: { '@id': ids.organization },
  };
}

/** URL canónica de la página de un servicio. */
export function serviceUrl(slug) {
  return `${SITE_URL}/servicios/${slug}`;
}

/** Migas de pan (BreadcrumbList) a partir de [{ name, url }]. */
export function breadcrumbNode(id, items) {
  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Grafo de /servicios/[slug]: servicio, página, migas de pan y preguntas frecuentes. */
export function servicePageJsonLd(service, page) {
  const url = serviceUrl(service.slug);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        url,
        name: service.title,
        description: page.intro.join(' '),
        serviceType: service.title,
        image: `${SITE_URL}${encodeURI(service.image)}`,
        provider: { '@id': ids.organization },
        areaServed: countries,
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.metaTitle,
        description: page.metaDescription,
        inLanguage: 'es',
        isPartOf: { '@id': ids.website },
        about: { '@id': `${url}#service` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      breadcrumbNode(`${url}#breadcrumb`, [
        { name: 'Inicio', url: `${SITE_URL}/` },
        { name: 'Servicios', url: `${SITE_URL}/servicios` },
        { name: service.title, url },
      ]),
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

/** Grafo común a todo el sitio: organización y web. */
export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(), websiteNode()],
  };
}

/** Grafo de la home: página, servicios y preguntas frecuentes. */
export function homeJsonLd() {
  const serviceNodes = siteMetadata.services.map((s) => ({
    '@type': 'Service',
    '@id': `${serviceUrl(s.slug)}#service`,
    url: serviceUrl(s.slug),
    name: s.name,
    description: `${s.description} ${s.detail}`,
    image: `${SITE_URL}${encodeURI(s.image)}`,
    serviceType: s.name,
    provider: { '@id': ids.organization },
    areaServed: countries,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': ids.homepage,
        url: `${SITE_URL}/`,
        name: 'FrecDigital - Inteligencia Artificial para tu Negocio',
        description: siteMetadata.description,
        inLanguage: 'es',
        isPartOf: { '@id': ids.website },
        about: { '@id': ids.organization },
        hasPart: { '@id': ids.faq },
      },
      ...serviceNodes,
      {
        '@type': 'FAQPage',
        '@id': ids.faq,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };
}
