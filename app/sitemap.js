// app/sitemap.js - Genera sitemap.xml automáticamente para Next.js
import { siteMetadata } from '@/lib/seo-metadata';

// Solo páginas indexables. Las legales (/aviso-legal, /privacidad, /cookies)
// se añadirán cuando tengan contenido y se les quite el noindex.
export default function sitemap() {
  const baseUrl = siteMetadata.siteUrl;
  const lastModified = new Date(); // fecha del build

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
