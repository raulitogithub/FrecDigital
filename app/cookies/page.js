import Link from 'next/link';
import LegalPage, { LegalSection } from '@/components/LegalPage';
import CookieSettingsButton from '@/components/CookieSettingsButton';
import { legal, GA_ID, CONSENT_STORAGE_KEY } from '@/lib/legal';
import { company } from '@/lib/seo-metadata';

// TODO(profesional): revisar el texto completo antes de publicarlo como definitivo.
// TODO: quitar el noindex y añadir la página al sitemap cuando el texto esté revisado.
export const metadata = {
  title: 'Política de cookies',
  description: `Qué cookies y tecnologías similares usa la web de ${company.name}.`,
  robots: { index: false, follow: true },
  alternates: { canonical: '/cookies' },
};

// Auditoría del código (noviembre de 2026):
// - La web no crea cookies propias ni usa localStorage salvo para recordar la elección del banner.
// - Las fuentes se sirven desde el propio dominio (next/font): sin peticiones a Google Fonts.
// - WhatsApp solo es un enlace: no se carga nada de Meta hasta que el usuario hace clic.
// - Google Analytics solo existe si se define NEXT_PUBLIC_GOOGLE_ANALYTICS_ID en el build, y
//   entonces se carga únicamente tras aceptar en el banner (components/CookieConsent.jsx).
const analytics = Boolean(GA_ID);

const thClass = 'text-left font-semibold text-[#1a3a6b] px-3 py-2 border-b border-[#b0cfe8]';
const tdClass = 'px-3 py-2 border-b border-[#e2e8f0] align-top';

function CookieTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#b0cfe8] bg-white">
      <table className="w-full text-sm">
        <thead className="bg-[#e8f4fc]">
          <tr>
            <th className={thClass}>Nombre</th>
            <th className={thClass}>Proveedor</th>
            <th className={thClass}>Finalidad</th>
            <th className={thClass}>Duración</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className={`${tdClass} font-mono text-xs`}>{row.name}</td>
              <td className={tdClass}>{row.provider}</td>
              <td className={tdClass}>{row.purpose}</td>
              <td className={tdClass}>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const technicalRows = [
  // TODO: comprobar en producción (herramientas del navegador > Almacenamiento) si Cloudflare
  // instala __cf_bm. Solo aparece si está activada su protección frente a bots.
  {
    name: '__cf_bm',
    provider: 'Cloudflare (red de distribución del sitio)',
    purpose: 'Técnica. Distingue personas de bots para proteger el sitio. Solo si la protección frente a bots está activa.',
    duration: '30 minutos',
  },
  ...(analytics
    ? [
        {
          name: CONSENT_STORAGE_KEY,
          provider: `${company.name} (almacenamiento local del navegador)`,
          purpose: 'Técnica. Recuerda si has aceptado o rechazado las cookies de analítica.',
          duration: 'Hasta que la borres o cambies tu elección',
        },
      ]
    : []),
];

const analyticsRows = [
  {
    name: '_ga',
    provider: 'Google Analytics (Google)',
    purpose: 'Analítica. Distingue usuarios para elaborar estadísticas de uso anónimas.',
    duration: '2 años',
  },
  {
    name: `_ga_${GA_ID.replace(/^G-/, '') || '<ID>'}`,
    provider: 'Google Analytics (Google)',
    purpose: 'Analítica. Mantiene el estado de la sesión para las estadísticas.',
    duration: '2 años',
  },
];

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" lastUpdated={legal.lastUpdated}>
      <LegalSection number={1} title="¿Qué son las cookies?">
        <p>
          Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar
          información sobre tu visita. Tecnologías similares, como el almacenamiento local del
          navegador, cumplen funciones parecidas; en esta política las tratamos igual.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Cookies que utiliza este sitio web">
        {analytics ? (
          <>
            <p>
              Este sitio usa cookies técnicas, necesarias para su funcionamiento, y cookies de
              analítica, que <strong>solo se instalan si las aceptas</strong> en el aviso de cookies.
            </p>
            <h3 className="text-lg font-bold text-[#1a3a6b] pt-2">Cookies técnicas (siempre activas)</h3>
            <CookieTable rows={technicalRows} />
            <h3 className="text-lg font-bold text-[#1a3a6b] pt-2">Cookies de analítica (solo con tu consentimiento)</h3>
            {/* TODO(profesional): Google Analytics implica una transferencia de datos a EE. UU.; verificar
                las garantías (EU-US Data Privacy Framework) e incluirlas en la política de privacidad. */}
            <CookieTable rows={analyticsRows} />
          </>
        ) : (
          <>
            <p>
              <strong>Este sitio solo utiliza cookies técnicas.</strong> No usa cookies de analítica,
              publicidad ni seguimiento, propias ni de terceros, y por eso no muestra un aviso para
              aceptarlas: las cookies técnicas no requieren consentimiento.
            </p>
            <CookieTable rows={technicalRows} />
          </>
        )}
        <p>
          Las fuentes tipográficas se sirven desde nuestro propio dominio, por lo que tu navegador no
          se conecta a servidores de terceros para cargarlas. El botón de WhatsApp es un enlace: no
          se carga ningún contenido de WhatsApp hasta que haces clic en él.
        </p>
      </LegalSection>

      <LegalSection number={3} title="Cómo gestionar o desactivar las cookies">
        {analytics && (
          <>
            <p>
              Puedes aceptar o rechazar las cookies de analítica en el aviso que aparece en tu primera
              visita, y cambiar de opinión en cualquier momento:
            </p>
            <CookieSettingsButton className="px-5 py-2.5 rounded-full border-2 border-[#00b4d8] text-[#1a3a6b] font-semibold hover:bg-[#00b4d8] hover:text-white transition-colors duration-200">
              Cambiar mis preferencias de cookies
            </CookieSettingsButton>
          </>
        )}
        <p>
          También puedes bloquear o eliminar las cookies desde la configuración de tu navegador. Si
          bloqueas las técnicas, es posible que alguna parte del sitio no funcione correctamente.
        </p>
      </LegalSection>

      <LegalSection number={4} title="Más información y actualizaciones">
        <p>
          Para saber cómo tratamos tus datos personales, consulta nuestra{' '}
          <Link href="/privacidad">política de privacidad</Link>. Actualizaremos esta política si
          cambian las cookies que utiliza el sitio. Para cualquier duda, escribe a{' '}
          <a href={`mailto:${legal.email}`}>{legal.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
