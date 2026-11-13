import LegalPage from '@/components/LegalPage';

// noindex mientras el contenido esté en preparación; quitarlo al publicar el texto.
export const metadata = {
  title: 'Política de cookies',
  robots: { index: false, follow: true },
  alternates: { canonical: '/cookies' },
};

const sections = [
  { title: '¿Qué son las cookies?' },
  { title: 'Cookies que utiliza este sitio web' },
  { title: 'Cómo gestionar o desactivar las cookies' },
  { title: 'Actualizaciones de esta política' },
];

export default function CookiesPage() {
  return <LegalPage title="Política de cookies" sections={sections} />;
}
