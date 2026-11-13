import LegalPage from '@/components/LegalPage';

// noindex mientras el contenido esté en preparación; quitarlo al publicar el texto.
export const metadata = {
  title: 'Política de privacidad',
  robots: { index: false, follow: true },
  alternates: { canonical: '/privacidad' },
};

const sections = [
  { title: 'Responsable del tratamiento' },
  { title: 'Datos personales que tratamos' },
  { title: 'Finalidad del tratamiento' },
  { title: 'Base jurídica' },
  { title: 'Plazo de conservación' },
  { title: 'Destinatarios y transferencias internacionales' },
  { title: 'Derechos de las personas interesadas' },
  { title: 'Reclamación ante la autoridad de control' },
  { title: 'Medidas de seguridad' },
  { title: 'Cambios en esta política' },
];

export default function PrivacidadPage() {
  return <LegalPage title="Política de privacidad" sections={sections} />;
}
