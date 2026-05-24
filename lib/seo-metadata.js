// Metadatos globales para SEO
export const siteMetadata = {
  siteName: 'FrecDigital',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://frecdigital.com',
  description: 'Soluciones personalizadas con IA para startups y empresas. Chatbots inteligentes, automatización de procesos y más.',
  keywords: ['IA', 'inteligencia artificial', 'chatbots', 'automatización', 'Next.js'],
  author: 'FrecDigital',
  language: 'es',
  locale: 'es_ES',
  
  // Social Media
  socialMedia: {
    twitter: '@frecdigital',
    linkedin: 'https://linkedin.com/company/frecdigital',
    facebook: 'https://facebook.com/frecdigital',
    instagram: 'https://instagram.com/frecdigital'
  },
  
  // Organization Schema
  organization: {
    name: 'FrecDigital',
    logo: {
      url: '/images/logo1.webp',
      width: 200,
      height: 200
    },
    contact: {
      email: 'hola@frecdigital.com',
      phone: '+1-XXX-XXX-XXXX', // Actualiza con tu número
      url: 'https://frecdigital.com'
    },
    address: {
      streetAddress: 'Tu dirección',
      addressLocality: 'Tu ciudad',
      postalCode: '00000',
      addressCountry: 'MX' // Actualiza con tu país
    }
  },

  // Services
  services: [
    {
      name: 'Chatbots IA',
      description: 'Chatbots inteligentes con inteligencia artificial',
      image: '/images/service-chatbot.jpg' // Actualiza con tu imagen
    },
    {
      name: 'Automatización',
      description: 'Automatización de procesos empresariales',
      image: '/images/service-automation.jpg'
    },
    {
      name: 'Consultoría',
      description: 'Consultoría en transformación digital',
      image: '/images/service-consulting.jpg'
    }
  ]
};

/**
 * Genera Schema.org structured data
 */
export function generateSchemaMarkup(type = 'Organization', customData = {}) {
  const { siteName, siteUrl, description, organization } = siteMetadata;
  
  const schemas = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: organization.name,
      url: siteUrl,
      logo: organization.logo,
      description: description,
      sameAs: [
        siteMetadata.socialMedia.twitter,
        siteMetadata.socialMedia.linkedin,
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: organization.contact.phone,
        contactType: 'Customer Service'
      }
    },
    
    LocalBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: organization.name,
      url: siteUrl,
      image: organization.logo.url,
      description: description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: organization.address.streetAddress,
        addressLocality: organization.address.addressLocality,
        postalCode: organization.address.postalCode,
        addressCountry: organization.address.addressCountry
      },
      email: organization.contact.email,
      telephone: organization.contact.phone,
      priceRange: '$$$' // Actualiza según corresponda
    },
    
    WebPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'FrecDigital - Inteligencia Artificial para tu Negocio',
      url: siteUrl,
      description: description,
      image: organization.logo.url,
      publisher: {
        '@type': 'Organization',
        name: organization.name,
        logo: organization.logo
      }
    },

    FAQPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Qué es FrecDigital?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FrecDigital es una empresa de soluciones de inteligencia artificial para startups y empresas.'
          }
        },
        {
          '@type': 'Question',
          name: '¿Qué servicios ofrecen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ofrecemos chatbots inteligentes, automatización de procesos y consultoría en IA.'
          }
        }
      ]
    }
  };
  
  return schemas[type] || schemas.Organization;
}

/**
 * Genera Open Graph metadata
 */
export function generateOpenGraphMetadata(page = {}) {
  const { title, description, image, url, type = 'website' } = page;
  
  return {
    'og:site_name': siteMetadata.siteName,
    'og:type': type,
    'og:url': url || siteMetadata.siteUrl,
    'og:title': title || siteMetadata.siteName,
    'og:description': description || siteMetadata.description,
    'og:image': image || siteMetadata.organization.logo.url,
    'og:image:alt': 'FrecDigital - Inteligencia Artificial',
    'og:locale': 'es_ES'
  };
}

/**
 * Genera Twitter Card metadata
 */
export function generateTwitterCardMetadata(page = {}) {
  const { title, description, image } = page;
  
  return {
    'twitter:card': 'summary_large_image',
    'twitter:site': siteMetadata.socialMedia.twitter,
    'twitter:creator': siteMetadata.socialMedia.twitter,
    'twitter:title': title || siteMetadata.siteName,
    'twitter:description': description || siteMetadata.description,
    'twitter:image': image || siteMetadata.organization.logo.url,
    'twitter:image:alt': 'FrecDigital Logo'
  };
}

/**
 * Genera breadcrumb schema para navegación
 */
export function generateBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteMetadata.siteUrl}${item.url}`
    }))
  };
}
