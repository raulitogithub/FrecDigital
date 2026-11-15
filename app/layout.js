import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ChatWrapper from "./ChatWrapper";
import WhatsAppButton from "@/components/WhatsAppButtonWrapper";
import CookieConsent from "@/components/CookieConsent";
import { siteMetadata, siteJsonLd } from "@/lib/seo-metadata";
import JsonLd from "@/components/JsonLd";

// next/font descarga las fuentes en el build y las sirve desde nuestro dominio:
// el navegador del visitante no hace ninguna petición a Google.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#1a3a6b",
  colorScheme: "light dark",
};

const BASE_URL = 'https://frecdigital.com';
const TITLE = 'FrecDigital · Consultora de IA para pymes e industria';

// La imagen para redes (1200×630) se genera en app/opengraph-image.js y
// app/twitter-image.js. El canonical de cada página se define en su page.js.
export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: TITLE,
    template: '%s | FrecDigital',
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author, url: BASE_URL }],

  icons: {
    icon: "/images/logo1.webp",
    apple: "/images/logo1.webp",
    shortcut: "/images/logo1.webp",
  },

  openGraph: {
    title: TITLE,
    description: siteMetadata.description,
    url: BASE_URL,
    type: 'website',
    siteName: 'FrecDigital',
    locale: 'es_ES',
    alternateLocale: ['es_EC'],
  },

  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: siteMetadata.description,
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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}
      // Desplazamiento suave en anclas (#servicios…), pero no al cambiar de página
      data-scroll-behavior="smooth"
    >
      <head>
        <meta charSet="utf-8" />

        <JsonLd data={siteJsonLd()} />

        {/* Manifest para PWA */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {children}
        <ChatWrapper />
        <WhatsAppButton />
        {/* Google Analytics solo se carga tras aceptar en el banner (si hay ID configurado) */}
        <CookieConsent />
      </body>
    </html>
  );
}
