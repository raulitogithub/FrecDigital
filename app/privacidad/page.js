import Link from 'next/link';
import LegalPage, { LegalSection } from '@/components/LegalPage';
import { legal } from '@/lib/legal';
import { company } from '@/lib/seo-metadata';

// TODO(profesional): revisar el texto completo antes de publicarlo como definitivo.
// TODO: quitar el noindex y añadir la página al sitemap cuando estén completos los marcadores [ ... ].
export const metadata = {
  title: 'Política de privacidad',
  description: `Cómo trata ${company.name} los datos personales del formulario de contacto y cómo ejercer tus derechos.`,
  robots: { index: false, follow: true },
  alternates: { canonical: '/privacidad' },
};

const mail = <a href={`mailto:${legal.email}`}>{legal.email}</a>;

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad" lastUpdated={legal.lastUpdated}>
      <p>
        Esta política explica qué datos personales tratamos a través de este sitio web, para qué, con
        qué base legal, durante cuánto tiempo y cómo puedes ejercer tus derechos. Se ha redactado
        conforme al Reglamento (UE) 2016/679 (RGPD), la Ley Orgánica 3/2018 de Protección de Datos
        Personales y garantía de los derechos digitales (LOPDGDD) y la Ley Orgánica de Protección de
        Datos Personales de Ecuador (LOPDP).
      </p>

      <LegalSection number={1} title="Responsable del tratamiento">
        {/* TODO(profesional): si el titular reside y presta servicios en España, puede necesitar alta
            fiscal en España; en ese caso cambiarían el titular, el identificador fiscal y las secciones 7 y 8.
            Si se mantiene como responsable establecido fuera de la UE: confirmar que aplica la exención de
            representante en la UE del art. 27.2 RGPD (tratamiento ocasional, de bajo riesgo y sin datos
            sensibles a gran escala, como un formulario de contacto). */}
        <ul>
          <li><strong>Responsable:</strong> {legal.ownerName}, {legal.ownerType}.</li>
          <li><strong>RUC:</strong> {legal.ruc}</li>
          <li><strong>Domicilio:</strong> {legal.address}</li>
          <li><strong>Email de contacto para protección de datos:</strong> {mail}</li>
        </ul>
      </LegalSection>

      <LegalSection number={2} title="Datos personales que tratamos">
        <p>
          <strong>Formulario de contacto.</strong> Cuando nos escribes desde el formulario tratamos:
        </p>
        <ul>
          <li>Nombre completo y correo electrónico (obligatorios).</li>
          <li>Empresa u organización (opcional).</li>
          <li>País (España, Ecuador u otro) y servicio de interés.</li>
          <li>El mensaje que nos envías.</li>
          <li>La constancia de que has aceptado esta política de privacidad.</li>
          <li>Si quieres recibir o no novedades por email (casilla opcional, desmarcada por defecto).</li>
        </ul>
        <p>
          Te pedimos que no incluyas en el mensaje datos especialmente protegidos (salud, ideología,
          origen étnico, etc.) ni datos de otras personas sin su consentimiento.
        </p>
        <p>
          <strong>Datos técnicos.</strong> Para evitar abusos, usamos tu dirección IP de forma temporal
          para limitar el número de envíos del formulario (cinco por hora). Se guarda solo en la memoria
          del servidor y se descarta como máximo al cabo de una hora.
        </p>
        {/* TODO: confirmar con el proveedor de hosting qué registros de acceso (logs) guarda y durante cuánto tiempo. */}
        <p>
          <strong>Contacto directo.</strong> Si nos escribes por email o WhatsApp, trataremos los datos
          que nos facilites en esa comunicación con la misma finalidad.
        </p>
      </LegalSection>

      <LegalSection number={3} title="Finalidad del tratamiento">
        <ul>
          <li>Responder a tu consulta y, si lo pides, enviarte información o una propuesta sobre nuestros servicios.</li>
          <li>
            Solo si marcas la casilla correspondiente, enviarte por email novedades sobre nuestros
            servicios, proyectos y demos.
          </li>
          <li>Proteger el formulario frente a envíos masivos o abusivos.</li>
        </ul>
        <p>
          Si no marcas la casilla de novedades, usaremos tus datos únicamente para responder a tu
          consulta. No tomamos decisiones automatizadas ni elaboramos perfiles con tus datos.
        </p>
      </LegalSection>

      <LegalSection number={4} title="Base legal">
        {/* TODO(profesional): validar las bases legales. Si tras la consulta se prepara una propuesta o un
            contrato, puede aplicar también la ejecución de medidas precontractuales (art. 6.1.b RGPD). */}
        <ul>
          <li>
            <strong>Consentimiento</strong> (art. 6.1.a RGPD y art. 7 LOPDP): lo das al marcar la
            casilla de aceptación del formulario. Puedes retirarlo en cualquier momento escribiendo a{' '}
            {mail}, sin que ello afecte a la licitud del tratamiento anterior.
          </li>
          <li>
            <strong>Consentimiento específico para novedades</strong> (art. 6.1.a RGPD y art. 21 de la
            LSSI): solo si marcas la casilla opcional. Es independiente del anterior: puedes enviar el
            formulario sin aceptarlo.
          </li>
          <li>
            <strong>Interés legítimo</strong> (art. 6.1.f RGPD) en mantener la seguridad del sitio, para
            el uso temporal de la dirección IP descrito arriba.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number={5} title="Plazo de conservación">
        <p>
          Conservaremos los datos del formulario durante el tiempo necesario para atender tu consulta
          y, si no se inicia una relación profesional, durante un máximo de {legal.retention} desde el
          último contacto. Después se suprimirán, salvo que debamos conservarlos bloqueados para atender
          posibles responsabilidades legales.
        </p>
        <p>
          Si aceptaste recibir novedades, conservaremos tu nombre y email para ese fin hasta que te des
          de baja. Cada envío incluirá un enlace para hacerlo, y también puedes pedirlo en cualquier
          momento escribiendo a {mail}.
        </p>
        {/* TODO: cuando se envíen novedades, incluir en cada email un enlace o instrucciones de baja
            (LSSI art. 22) y registrar la fecha del consentimiento de cada contacto. */}
        <p>
          Si se inicia una relación profesional, los datos se conservarán mientras dure y, después,
          durante los plazos que exija la normativa aplicable.
        </p>
      </LegalSection>

      <LegalSection number={6} title="Destinatarios">
        {/* TODO(profesional): verificar que se aceptaron los contratos de encargado del tratamiento
            (art. 28 RGPD) de cada proveedor; Hetzner, Google y Cloudflare los ofrecen en sus paneles. */}
        <p>
          No cedemos tus datos a terceros, salvo obligación legal. Para prestar el servicio, acceden a
          ellos, como encargados del tratamiento, los siguientes proveedores:
        </p>
        <ul>
          {legal.providers.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong> ({p.country}): {p.role}.
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection number={7} title="Transferencias internacionales">
        {/* TODO(profesional): validar la base de la transferencia al responsable en Ecuador (país sin
            decisión de adecuación de la Comisión Europea) y confirmar la adhesión vigente de Google y
            Cloudflare al EU-US Data Privacy Framework. */}
        <p>
          El sitio web se aloja en la Unión Europea (Hetzner, Alemania). No obstante, hay datos que
          salen del Espacio Económico Europeo:
        </p>
        <ul>
          <li>
            <strong>Al responsable, en Ecuador:</strong> los mensajes del formulario llegan al
            responsable, que se encuentra en Ecuador, con la única finalidad de responder a tu
            consulta.
          </li>
          <li>
            <strong>A proveedores de EE. UU.:</strong> Google y Cloudflare pueden tratar datos en
            Estados Unidos. Ambas empresas están adheridas al Marco de Privacidad de Datos UE-EE. UU.
            (EU-US Data Privacy Framework), reconocido por la Comisión Europea como garantía adecuada.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number={8} title="Tus derechos">
        {/* TODO(profesional): revisar los plazos de respuesta exigidos por la LOPDP de Ecuador. */}
        <p>
          Puedes ejercer en cualquier momento los siguientes derechos (conocidos como ARCO-POL):
        </p>
        <ul>
          <li><strong>Acceso:</strong> saber qué datos tuyos tratamos.</li>
          <li><strong>Rectificación:</strong> corregir o actualizar datos inexactos.</li>
          <li><strong>Cancelación o supresión:</strong> pedir que eliminemos tus datos.</li>
          <li><strong>Oposición:</strong> oponerte a un tratamiento concreto.</li>
          <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado y de uso común.</li>
          <li><strong>Olvido:</strong> pedir que dejen de difundirse tus datos cuando ya no sean necesarios.</li>
          <li><strong>Limitación:</strong> pedir que suspendamos el tratamiento en determinados casos.</li>
        </ul>
        <p>
          La LOPDP de Ecuador reconoce además el derecho a no ser objeto de decisiones basadas
          únicamente en tratamientos automatizados. También puedes retirar tu consentimiento en
          cualquier momento.
        </p>
        <p>
          Para ejercerlos, escribe a {mail} con el asunto «Protección de datos», indicando el derecho
          que quieres ejercer. Si tenemos dudas razonables sobre tu identidad, podremos pedirte
          información adicional para confirmarla. Responderemos en el plazo de un mes, prorrogable en
          los casos previstos en el RGPD.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Reclamación ante la autoridad de control">
        <p>Si consideras que no hemos atendido correctamente tus derechos, puedes reclamar ante:</p>
        <ul>
          <li>
            En España: la Agencia Española de Protección de Datos (
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
          </li>
          <li>En Ecuador: la Superintendencia de Protección de Datos Personales.</li>
        </ul>
      </LegalSection>

      <LegalSection number={10} title="Menores de edad">
        {/* TODO(profesional): confirmar la edad mínima de consentimiento aplicable en Ecuador. */}
        <p>
          Este sitio está dirigido a empresas y profesionales. No recogemos conscientemente datos de
          menores de 14 años; si eres menor, no nos envíes tus datos sin la autorización de tus padres
          o tutores.
        </p>
      </LegalSection>

      <LegalSection number={11} title="Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas para proteger tus datos: conexión cifrada (HTTPS),
          validación de los datos del formulario en el servidor, límite de envíos y acceso restringido
          a la información recibida.
        </p>
      </LegalSection>

      <LegalSection number={12} title="Cambios en esta política">
        <p>
          Podemos actualizar esta política para adaptarla a cambios normativos o del sitio web. La
          fecha de la última actualización figura al principio de la página. Consulta también nuestra{' '}
          <Link href="/cookies">política de cookies</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
