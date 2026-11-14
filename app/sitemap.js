// app/sitemap.js - Genera sitemap.xml automáticamente para Next.js
import { siteMetadata } from '@/lib/seo-metadata';
import { services } from '@/lib/services';

// Solo páginas indexables. Las legales (/aviso-legal, /privacidad, /cookies)
// se añadirán cuando tengan contenido revisado y se les quite el noindex.
export default function sitemap() {
  const baseUrl = siteMetadata.siteUrl;
  const lastModified = new Date(); // fecha del build

  return [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/servicios`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    ...services.map((s) => ({
      url: `${baseUrl}/servicios/${s.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
