// app/sitemap.js - Genera sitemap.xml automáticamente para Next.js
import { siteMetadata } from '@/lib/seo-metadata';

export default function sitemap() {
  const baseUrl = siteMetadata.siteUrl;

  // Define todas las rutas de tu sitio
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date('2025-05-21'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // Si tienes blog u otras páginas, agrégalas aquí
  const pages = [
    // { slug: 'blog', priority: 0.8 },
    // { slug: 'servicios', priority: 0.8 },
    // { slug: 'about', priority: 0.7 },
  ];

  pages.forEach(page => {
    routes.push({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: page.priority || 0.7,
    });
  });

  return routes;
}
