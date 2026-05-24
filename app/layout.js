import { Inter } from "next/font/google";
import "./globals.css";
import ChatWrapper from "./ChatWrapper";
import WhatsAppButton from "@/components/WhatsAppButtonWrapper";
import { siteMetadata, generateSchemaMarkup } from "@/lib/seo-metadata";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const schemaOrganization = generateSchemaMarkup('Organization');
const schemaFAQ = generateSchemaMarkup('FAQPage');

export const viewport = {
  themeColor: "#1a3a6b",
  colorScheme: "light dark",
};

const BASE_URL = 'https://frecdigital.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: "FrecDigital - Inteligencia Artificial para tu Negocio",
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.author, url: BASE_URL }],

  alternates: {
    canonical: '/',
    languages: { es: '/' },
  },

  icons: {
    icon: "/images/logo1.webp",
    apple: "/images/logo1.webp",
    shortcut: "/images/logo1.webp",
  },

  openGraph: {
    title: "FrecDigital - Inteligencia Artificial para tu Negocio",
    description: siteMetadata.description,
    url: BASE_URL,
    type: 'website',
    siteName: 'FrecDigital',
    images: [
      {
        url: '/images/logo1.webp',
        width: 200,
        height: 200,
        alt: 'FrecDigital - Inteligencia Artificial',
        type: 'image/webp',
      },
    ],
    locale: 'es_ES',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@frecdigital',
    creator: '@frecdigital',
    title: "FrecDigital - Inteligencia Artificial para tu Negocio",
    description: siteMetadata.description,
    images: ['/images/logo1.webp'],
  },

  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FrecDigital",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <meta charSet="utf-8" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />

        {/* Google Analytics (opcional) */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* DNS Prefetch para optimización */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Manifest para PWA */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {children}
        <ChatWrapper />
        <WhatsAppButton />
      </body>
    </html>
  );
}
