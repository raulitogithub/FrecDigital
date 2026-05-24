// app/robots.js - Genera robots.txt automáticamente
import { siteMetadata } from '@/lib/seo-metadata';

export default function robots() {
  const baseUrl = siteMetadata.siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api',
          '/.next',
          '/private',
          '/*?*sort=',
          '/*?*filter=',
        ],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
