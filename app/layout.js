import { Inter } from "next/font/google";
import "./globals.css";
import ChatWrapper from "./ChatWrapper";
import WhatsAppButton from "@/components/WhatsAppButtonWrapper";
import { siteMetadata, generateSchemaMarkup, generateOpenGraphMetadata, generateTwitterCardMetadata } from "@/lib/seo-metadata";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Structured Data (JSON-LD)
const schemaMarkup = generateSchemaMarkup('Organization');

// Open Graph
const ogMetadata = generateOpenGraphMetadata({
  title: "FrecDigital - Inteligencia Artificial para tu Negocio",
  description: siteMetadata.description,
  image: siteMetadata.organization.logo.url,
  url: siteMetadata.siteUrl,
  type: "website"
});

// Twitter Card
const twitterMetadata = generateTwitterCardMetadata({
  title: "FrecDigital - Inteligencia Artificial para tu Negocio",
  description: siteMetadata.description,
  image: siteMetadata.organization.logo.url
});

export const viewport = {
  themeColor: "#1a3a6b",
  colorScheme: "light dark",
};

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://frecdigital.com'),

  // Basic SEO
  title: "FrecDigital - Inteligencia Artificial para tu Negocio",
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  author: siteMetadata.author,
  
  // Canonical URL
  alternates: {
    canonical: siteMetadata.siteUrl,
  },

  // Icons
  icons: {
    icon: "/images/logo1.webp",
    apple: "/images/logo1.webp",
    shortcut: "/images/logo1.webp",
  },

  // Open Graph
  openGraph: {
    title: ogMetadata['og:title'],
    description: ogMetadata['og:description'],
    url: ogMetadata['og:url'],
    type: ogMetadata['og:type'],
    siteName: ogMetadata['og:site_name'],
    images: [
      {
        url: ogMetadata['og:image'],
        width: siteMetadata.organization.logo.width,
        height: siteMetadata.organization.logo.height,
        alt: ogMetadata['og:image:alt'],
        type: 'image/jpeg',
      },
    ],
    locale: ogMetadata['og:locale'],
  },

  // Twitter Card
  twitter: {
    card: twitterMetadata['twitter:card'],
    site: twitterMetadata['twitter:site'],
    creator: twitterMetadata['twitter:creator'],
    title: twitterMetadata['twitter:title'],
    description: twitterMetadata['twitter:description'],
    images: [twitterMetadata['twitter:image']],
  },

  // Additional SEO
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION,
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },

  // Localization
  alternates: {
    languages: {
      es: `${siteMetadata.siteUrl}`,
    },
  },

  // Mobile Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FrecDigital",
  },

  // Microsoft specific
  msapplication: {
    TileColor: "#1a3a6b",
    config: "/browserconfig.xml",
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={siteMetadata.siteUrl} />
        
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />

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
