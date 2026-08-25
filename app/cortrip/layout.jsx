import CortritoBot from '@/components/CortritoBot';

export const metadata = {
  title: 'HORIZONTE 180 - Sangre Nueva | CORTRIP Lista 6',
  description: 'Horizonte 180 viene a devolverte lo que siempre fue tuyo. Recuperar la confianza, fortalecer las finanzas y volver a servir a los socios de CORTRIP. ¡Vota Lista 6!',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'HORIZONTE 180 - Sangre Nueva | CORTRIP Lista 6',
    description: 'Horizonte 180 viene a devolverte lo que siempre fue tuyo. Recuperar la confianza, fortalecer las finanzas y volver a servir a los socios de CORTRIP. ¡Vota Lista 6!',
    url: 'https://frecdigital.com/cortrip',
    siteName: 'CORTRIP - Sangre Nueva',
    images: [
      {
        url: 'https://frecdigital.com/images/cortrip-logo.jpeg',
        width: 800,
        height: 800,
        alt: 'Horizonte 180 - Sangre Nueva - Lista 6',
      },
    ],
    type: 'website',
    locale: 'es_EC',
  },
};

export default function CortripLayout({ children }) {
  return (
    <>
      {children}
      <CortritoBot />
    </>
  );
}
