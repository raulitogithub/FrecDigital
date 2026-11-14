// /llms.txt — resumen en texto plano para buscadores y asistentes de IA
// (formato propuesto en https://llmstxt.org). Se genera en build desde
// la fuente única de datos, así que nunca se desincroniza de la web.
import { company, siteMetadata, faqs, activeSocialLinks } from '@/lib/seo-metadata';

export const dynamic = 'force-static';

export function GET() {
  const { founder } = company;
  const url = company.url;

  const contact = [
    `- Email: ${company.email}`,
    ...Object.values(company.whatsapp)
      .filter((w) => w.number)
      .map((w) => `- WhatsApp ${w.country}: ${w.display}`),
    `- Horario: ${company.hours.label}`,
    `- Formulario: ${url}/#contact`,
    ...activeSocialLinks().map((s) => `- ${s.key.charAt(0).toUpperCase() + s.key.slice(1)}: ${s.url}`),
  ];

  const body = `# ${company.name}

> ${company.description}

## Servicios

${siteMetadata.services.map((s) => `- [${s.name}](${url}/servicios/${s.slug}): ${s.description}`).join('\n')}

## Proyectos y demos

Soluciones en desarrollo o en demo (se pueden ver funcionando antes de contratar):

- Contenedores y precintos (Logística)
- Plataforma para academias (Educación, acceso anticipado)
- Voto electrónico y asambleas virtuales (Corporaciones)
- Agentes sobre Dynamics 365 (Industria)

## Fundador

${founder.name}: ${founder.degree}, ${founder.masters} por la ${founder.university}. ${founder.currentRole}. Acumula ${founder.experience}.

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
