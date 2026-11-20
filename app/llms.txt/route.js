// /llms.txt — resumen en texto plano para buscadores y asistentes de IA
// (formato propuesto en https://llmstxt.org). Se genera en build desde
// la fuente única de datos, así que nunca se desincroniza de la web.
import { company, siteMetadata, faqs, activeSocialLinks } from '@/lib/seo-metadata';

export const dynamic = 'force-static';

export function GET() {
  const { team } = company;
  const url = company.url;

  const contact = [
    `- Email: ${company.email}`,
    ...Object.values(company.whatsapp)
      .filter((w) => w.number)
      .map((w) => `- WhatsApp ${w.country}: ${w.display}`),
    `- Formulario: ${url}/#contact`,
    ...activeSocialLinks().map((s) => `- ${s.key.charAt(0).toUpperCase() + s.key.slice(1)}: ${s.url}`),
  ];

  const body = `# ${company.name}

> ${company.description}

## Servicios

${siteMetadata.services.map((s) => `- [${s.name}](${url}/servicios/${s.slug}): ${s.description}`).join('\n')}

## Proyectos y demos

Soluciones en desarrollo o en demo (se pueden ver funcionando antes de contratar):

- CRM FrecDigital (Atención y ventas, en demo): WhatsApp, chat web, email y formularios en una sola bandeja; un agente de IA con el conocimiento de la empresa responde a cualquier hora, cualifica al cliente, agenda la llamada y, si hace falta, pasa la conversación al equipo. Incluye panel de leads, embudo de ventas y tareas de seguimiento propuestas por la IA. Vídeo de presentación: ${url}/videos/crm/crm-frecdigital-v1.mp4
- Verificación de contenedores y precintos (Logística, en demo): lee en las fotos de cada expedición los números de contenedor y precinto, los compara con los registrados y avisa si no coinciden antes de que salga el camión.
- Plataforma para academias (Educación, acceso anticipado): para academias e institutos que quieren gestionar su día a día y atender a alumnos y familias con ayuda de la inteligencia artificial.
- Agentes de IA para Dynamics 365 (Industria): consultas de ventas, stock o pedidos en lenguaje natural desde Teams o WhatsApp, y preparación de pedidos u ofertas en el ERP con aprobación humana.

## Equipo

FrecDigital está liderada por un ${team.degree} con un ${team.masters} por la ${team.university}, que acumula ${team.experience} y tiene ${team.industryRole}.

## Ubicación

${company.locations.map((l) => `- ${l.city} (${l.countryName})`).join('\n')}

## Contacto

${contact.join('\n')}

## Preguntas frecuentes

${faqs.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n')}

## Enlaces

- [Inicio](${url}/)
- [Servicios](${url}/servicios)
- [Inteligencia artificial para empresas en Ecuador](${url}/ecuador)
- [Proyectos y demos](${url}/#proyectos)
- [Preguntas frecuentes](${url}/#faq)
- [Contacto](${url}/#contact)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
