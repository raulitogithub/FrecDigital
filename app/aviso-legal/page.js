import LegalPage, { LegalSection } from '@/components/LegalPage';
import { legal } from '@/lib/legal';
import { company } from '@/lib/seo-metadata';

// TODO(profesional): revisar el texto completo antes de publicarlo como definitivo.
// TODO: quitar el noindex y añadir la página al sitemap cuando estén completos los marcadores [ ... ].
export const metadata = {
  title: 'Aviso legal',
  description: `Aviso legal de ${company.name}: datos del titular, condiciones de uso y propiedad intelectual.`,
  robots: { index: false, follow: true },
  alternates: { canonical: '/aviso-legal' },
};

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal" lastUpdated={legal.lastUpdated}>
      <LegalSection number={1} title="Datos identificativos del titular">
        {/* TODO(profesional): el titular es una persona natural con actividad registrada en Ecuador.
            Confirmar el alcance de la LSSI (Ley 34/2002) para un prestador establecido fuera de la UE
            que dirige sus servicios a España, y si procede indicar un NIF o identificador fiscal español. */}
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Información y de Comercio Electrónico (LSSI), se informa de los datos del
          titular de este sitio web:
        </p>
        <ul>
          <li><strong>Titular:</strong> {legal.ownerName}, {legal.ownerType}.</li>
          <li><strong>RUC:</strong> {legal.ruc}</li>
          <li><strong>Domicilio:</strong> {legal.address}</li>
          <li>
            <strong>Email:</strong> <a href={`mailto:${legal.email}`}>{legal.email}</a>
          </li>
          <li><strong>Sitio web:</strong> {legal.website}</li>
          <li><strong>Nombre comercial:</strong> {company.name}</li>
        </ul>
      </LegalSection>

      <LegalSection number={2} title="Objeto del sitio web">
        <p>
          Este sitio web informa sobre los servicios de {company.name}, consultora de inteligencia
          artificial aplicada para pymes e industria con actividad en España y Ecuador, y permite
          contactar con el titular mediante el formulario, el correo electrónico o WhatsApp.
        </p>
        <p>
          El sitio no permite contratar servicios ni realizar pagos en línea. Cualquier contratación
          se formaliza por separado, con las condiciones que se acuerden en cada caso.
        </p>
      </LegalSection>

      <LegalSection number={3} title="Condiciones de uso">
        <p>
          El acceso a este sitio web es gratuito y atribuye la condición de usuario a quien navega
          por él. El usuario se compromete a utilizarlo de forma lícita, conforme a este aviso legal y
          a la buena fe, y en particular a:
        </p>
        <ul>
          <li>No introducir virus ni código malicioso, ni intentar acceder a áreas restringidas.</li>
          <li>No enviar a través del formulario contenidos ilícitos, ofensivos o datos de terceros sin su consentimiento.</li>
          <li>Facilitar información veraz cuando se ponga en contacto con el titular.</li>
        </ul>
      </LegalSection>

      <LegalSection number={4} title="Propiedad intelectual e industrial">
        {/* TODO(profesional): confirmar si la marca "FrecDigital" está registrada (OEPM, EUIPO o SENADI)
            antes de afirmarlo, y la titularidad o licencia de imágenes y vídeos de terceros o generados con IA. */}
        <p>
          Los contenidos de este sitio web (textos, imágenes, vídeos, logotipos, diseño gráfico y
          código fuente) son titularidad de {legal.ownerName} o se utilizan con la licencia o
          autorización correspondiente, y están protegidos por la normativa de propiedad intelectual
          e industrial.
        </p>
        <p>
          Queda prohibida su reproducción, distribución, comunicación pública o transformación, total
          o parcial, sin autorización expresa y por escrito del titular, salvo para uso personal y
          privado.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Exclusión de responsabilidad">
        <p>
          La información de este sitio tiene carácter general e informativo. Las soluciones descritas
          en la sección «Proyectos y demos» están en desarrollo o en demostración y pueden cambiar.
        </p>
        <p>
          El titular procura que el sitio esté disponible y libre de errores, pero no garantiza su
          funcionamiento ininterrumpido ni responde de los daños derivados de interrupciones, fallos
          técnicos o de un uso indebido del sitio por parte de los usuarios.
        </p>
      </LegalSection>

      <LegalSection number={6} title="Enlaces a sitios de terceros">
        <p>
          El sitio incluye enlaces a servicios de terceros, como WhatsApp. El titular no controla esos
          servicios ni se responsabiliza de sus contenidos o de sus políticas de privacidad, que
          conviene consultar antes de usarlos.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Legislación aplicable y jurisdicción">
        {/* TODO(profesional): definir ley aplicable y fuero. El titular está en Ecuador y la web se dirige
            también a usuarios en España: hay que respetar las normas imperativas de protección de
            consumidores (p. ej., el fuero del domicilio del consumidor en la UE). */}
        <p>
          Este aviso legal se rige por la legislación que resulte aplicable según el país de
          residencia del usuario, sin perjuicio de los derechos que la normativa de protección de
          consumidores y usuarios reconozca a quienes residan en la Unión Europea o en Ecuador.
        </p>
        <p>
          Para cualquier consulta sobre este aviso legal puedes escribir a{' '}
          <a href={`mailto:${legal.email}`}>{legal.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
