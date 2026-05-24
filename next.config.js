const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimizaciones de imagen
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compresión y optimización
  compress: true,
  poweredByHeader: false, // No expongas que usas Next.js

  // Headers de seguridad y SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security Headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()'
          },
          // SEO Headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          },
        ],
      },
      // Cache para assets estáticos
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      ...(isProd
        ? [
            {
              source: '/_next/static/:path*',
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'public, max-age=31536000, immutable'
                },
              ],
            },
          ]
        : []),
    ];
  },

  // Redirects para SEO
  async redirects() {
    return [
      // Asegurar HTTPS en producción (configurar en hosting)
      // {
      //   source: '/:path*',
      //   destination: 'https://frecdigital.com/:path*',
      //   permanent: true,
      // },
    ];
  },

  // Rewrites para API routes
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // Turbopack (Next.js 16 default bundler)
  turbopack: {},

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Experimental features (según tu versión de Next.js)
  experimental: {
    // optimizeCss: true, // Optimizar CSS
  },
};

module.exports = nextConfig;
