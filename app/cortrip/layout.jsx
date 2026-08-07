import CortritoBot from '@/components/CortritoBot';

export const metadata = {
  title: 'HORIZONTE 180 - Sangre Nueva | CORTRIP',
  description: 'Lista Sangre Nueva — Horizonte 180. Recuperar la confianza, fortalecer las finanzas y volver a servir a los socios de CORTRIP.',
  robots: 'noindex, nofollow',
};

export default function CortripLayout({ children }) {
  return (
    <>
      {children}
      <CortritoBot />
    </>
  );
}
