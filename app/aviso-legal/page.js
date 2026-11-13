import LegalPage from '@/components/LegalPage';

// noindex mientras el contenido esté en preparación; quitarlo al publicar el texto.
export const metadata = {
  title: 'Aviso legal',
  robots: { index: false, follow: true },
  alternates: { canonical: '/aviso-legal' },
};

const sections = [
  { title: 'Datos identificativos del titular' },
  { title: 'Objeto y ámbito de aplicación' },
  { title: 'Condiciones de uso del sitio web' },
  { title: 'Propiedad intelectual e industrial' },
  { title: 'Exclusión de responsabilidad' },
  { title: 'Enlaces a sitios de terceros' },
  { title: 'Legislación aplicable y jurisdicción' },
];

export default function AvisoLegalPage() {
  return <LegalPage title="Aviso legal" sections={sections} />;
}
