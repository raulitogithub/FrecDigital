import Link from 'next/link';
import { ArrowRight, ChevronRight, MessageSquareMore, Workflow, GraduationCap, MapPin, Receipt, Monitor, PlayCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { company, whatsappUrl, ids, breadcrumbNode, serviceUrl } from '@/lib/seo-metadata';

// Landing para Ecuador. Mismo idioma que el resto de la web pero con contenido propio,
// así que NO lleva hreflang (no es una traducción de otra página).

const PATH = '/ecuador';
const PAGE_URL = `${company.url}${PATH}`;
const TITLE = 'Inteligencia artificial para empresas en Ecuador';
const DESCRIPTION =
  'Asistentes de IA por WhatsApp, automatización con IA sobre tu ERP y plataforma para academias. FrecDigital trabaja desde Guayaquil con todo Ecuador.';

export const metadata = {
  title: 'IA para empresas en Ecuador: Guayaquil y Quito',
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: `${TITLE} | FrecDigital`,
    description: DESCRIPTION,
    url: PATH,
    type: 'website',
    locale: 'es_EC',
    // Al definir openGraph propio hay que indicar la imagen (la generada en app/opengraph-image.js)
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'FrecDigital · Consultora de IA aplicada para pymes e industria' }],
  },
};

// CTA principal: WhatsApp Ecuador. Mientras no haya número de Ecuador en
// lib/seo-metadata.js, lleva al formulario con el país "Ecuador" preseleccionado.
const WHATSAPP_EC_MESSAGE = 'Hola, escribo desde Ecuador. Me gustaría información sobre sus soluciones de inteligencia artificial.';
const whatsappEc = whatsappUrl('ec', WHATSAPP_EC_MESSAGE);
const FORM_EC = '/?pais=ecuador#contact';

const solutions = [
  {
    icon: MessageSquareMore,
    title: 'Asistentes de IA por WhatsApp',
    status: null,
    text: 'En Ecuador, muchos clientes prefieren escribir por WhatsApp antes que llamar o enviar un correo. Nuestros asistentes identifican a cada cliente y completan gestiones con sus datos —consultar, reservar, pagar o tramitar— en el momento.',
    href: '/servicios/asistentes-ia',
    linkLabel: 'Ver el servicio',
  },
  {
    icon: Workflow,
    title: 'Automatización e integración con IA',
    status: null,
    text: 'Para empresas que mueven datos a mano entre Excel, correo y sistemas que no se hablan. Automatizamos esos procesos con IA y conectamos tu ERP, CRM, WhatsApp y pagos, con especialidad en Dynamics 365 y ERP a medida en .NET.',
    href: '/servicios/automatizacion-integracion',
    linkLabel: 'Ver el servicio',
  },
  {
    icon: GraduationCap,
    title: 'Plataforma para academias',
    status: 'Acceso anticipado',
    text: 'Para academias e institutos que quieren gestionar su día a día y atender a alumnos y familias con ayuda de la inteligencia artificial. Está en acceso anticipado: cuéntanos tu caso y te enseñamos el avance.',
    href: FORM_EC,
    linkLabel: 'Solicitar acceso',
  },
];

const reasons = [
  { icon: MapPin, title: 'Base en Guayaquil', text: 'Trabajamos desde Guayaquil con empresas de todo el país, incluida Quito.' },
  { icon: Receipt, title: 'Facturación en Ecuador', text: 'Facturamos con RUC ecuatoriano, en dólares estadounidenses.' },
  { icon: Monitor, title: 'Trabajo en remoto', text: 'Análisis, desarrollo y seguimiento por videollamada, estés donde estés.' },
  { icon: PlayCircle, title: 'Demo antes de contratar', text: 'Ves la solución funcionando antes de tomar una decisión.' },
];

const faqs = [
  {
    q: '¿Emiten factura en Ecuador?',
    a: 'Sí. FrecDigital factura en Ecuador con RUC ecuatoriano y en dólares estadounidenses, la moneda oficial del país, por lo que no tienes que gestionar pagos ni facturas del extranjero.',
  },
  {
    q: '¿Trabajan en remoto con empresas de Quito y de otras ciudades?',
    a: 'Sí. Trabajamos desde Guayaquil y atendemos a empresas de Quito y del resto de Ecuador en remoto: las reuniones, la puesta en marcha y el seguimiento se hacen por videollamada.',
  },
  {
    q: '¿Los asistentes usan la API oficial de WhatsApp?',
    a: 'Sí. Usamos WhatsApp Business Platform, la API oficial de Meta, de modo que el asistente funciona con el número de tu empresa y dentro de las normas de WhatsApp.',
  },
  {
    q: '¿Tienen en cuenta la ley de protección de datos de Ecuador?',
    a: 'Sí. Diseñamos cada solución teniendo en cuenta la Ley Orgánica de Protección de Datos Personales de Ecuador: qué datos se tratan, con qué finalidad y quién puede acceder a ellos.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      url: PAGE_URL,
      name: TITLE,
      serviceType: 'Consultoría de inteligencia artificial',
      description: DESCRIPTION,
      provider: { '@id': ids.organization },
      areaServed: { '@type': 'Country', name: 'Ecuador' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Soluciones de inteligencia artificial en Ecuador',
        itemListElement: solutions.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            ...(s.href.startsWith('/servicios/') && { url: serviceUrl(s.href.split('/').pop()) }),
          },
        })),
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'es-EC',
      isPartOf: { '@id': ids.website },
      about: { '@id': `${PAGE_URL}#service` },
      breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
    },
    breadcrumbNode(`${PAGE_URL}#breadcrumb`, [
      { name: 'Inicio', url: `${company.url}/` },
      { name: 'Ecuador', url: PAGE_URL },
    ]),
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

function PrimaryCta({ className = '' }) {
  if (whatsappEc) {
    return (
      <a
        href={whatsappEc}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20c55e] transition-colors ${className}`}
      >
        <FaWhatsapp aria-hidden="true" size={20} />
        Escríbenos por WhatsApp
      </a>
    );
  }
  return (
    <Link
      href={FORM_EC}
      className={`inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#00b4d8] text-white font-semibold hover:bg-[#0090b0] transition-colors ${className}`}
    >
      Escríbenos
      <ArrowRight aria-hidden="true" size={18} />
    </Link>
  );
}

export default function EcuadorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <Navbar />

      <main className="flex-1">
        <header className="relative overflow-hidden bg-[#0a1628] text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#1a3a6b] to-[#0a1628]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00b4d8]/15 rounded-full blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20">
            <nav aria-label="Migas de pan" className="mb-8 text-sm text-white/60">
              <ol className="flex items-center gap-1">
                <li><Link href="/" className="hover:text-[#00b4d8]">Inicio</Link></li>
                <li aria-hidden="true"><ChevronRight size={14} /></li>
                <li aria-current="page" className="text-white/90">Ecuador</li>
              </ol>
            </nav>
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full bg-[#00b4d8]/15 border border-[#00b4d8]/40 text-sm font-semibold text-[#00b4d8]">
              Guayaquil · Quito · Todo Ecuador
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight mb-6">{TITLE}</h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">
              FrecDigital ayuda a pymes, empresas industriales y academias de Ecuador a aplicar la
              inteligencia artificial en su día a día, con asistentes que atienden por WhatsApp,
              automatización e integración de sistemas con IA y una plataforma para academias. Trabajamos desde
              Guayaquil con empresas de todo el país, incluida Quito, en remoto y con facturación
              en Ecuador.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <PrimaryCta />
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:border-[#00b4d8] hover:text-[#00b4d8] transition-colors"
              >
                Ver todos los servicios
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-[#334155] leading-relaxed">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-[#1a3a6b] mb-8">
              Soluciones de IA para empresas ecuatorianas
            </h2>
            <ul className="grid gap-6 md:grid-cols-3">
              {solutions.map(({ icon: Icon, title, status, text, href, linkLabel }) => (
                <li key={title} className="flex flex-col rounded-2xl border border-[#d6e6f3] bg-[#f5faff] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon aria-hidden="true" className="w-7 h-7 text-[#00b4d8]" />
                    {status && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00b4d8]/15 text-[#0284a8] text-[11px] font-bold uppercase tracking-wider">
                        {status}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold font-display text-[#1a3a6b] mb-2">{title}</h3>
                  <p className="text-sm flex-1">{text}</p>
                  <Link href={href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0284a8] hover:text-[#1a3a6b]">
                    {linkLabel} <ArrowRight aria-hidden="true" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              También ofrecemos en Ecuador el resto de nuestros servicios, como la{' '}
              <Link href="/servicios/vision-artificial" className="text-[#0284a8] underline underline-offset-2">visión artificial industrial</Link>{' '}
              o la{' '}
              <Link href="/servicios/gobernanza-ia" className="text-[#0284a8] underline underline-offset-2">gobernanza y adopción de IA</Link>.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-[#1a3a6b] mb-8">
              Por qué trabajar con FrecDigital en Ecuador
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2">
              {reasons.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#1a3a6b] flex items-center justify-center">
                    <Icon aria-hidden="true" className="w-5 h-5 text-[#00b4d8]" />
                  </span>
                  <span>
                    <span className="block font-bold text-[#1a3a6b]">{title}</span>
                    <span className="block text-sm">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-[#1a3a6b] mb-8">Preguntas frecuentes</h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-bold text-[#1a3a6b] mb-1">{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-3xl bg-[#0a1628] text-white p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">Hablemos de tu proyecto en Ecuador</h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Cuéntanos qué quieres resolver y te enseñamos una demo antes de contratar.
            </p>
            <PrimaryCta />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
