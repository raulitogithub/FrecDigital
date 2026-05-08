import { Inter } from "next/font/google";
import "./globals.css";
import ChatWrapper from "./ChatWrapper";
import WhatsAppButton from "@/components/WhatsAppButtonWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "FrecDigital - Inteligencia Artificial para tu Negocio",
  description: "Soluciones personalizadas con IA para startups y empresas. Chatbots inteligentes, automatización de procesos y más.",
  keywords: "IA, inteligencia artificial, chatbots, automatización",
  icons: {
    icon: "/images/logo1.jpeg",
    apple: "/images/logo1.jpeg",
  },
  openGraph: {
    title: "FrecDigital - Inteligencia Artificial para tu Negocio",
    description: "Soluciones personalizadas con IA para startups y empresas",
    type: "website",
    image: "/images/logo1.jpeg",
    url: "http://localhost:3000",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        {children}
        <ChatWrapper />
        <WhatsAppButton />
      </body>
    </html>
  );
}
