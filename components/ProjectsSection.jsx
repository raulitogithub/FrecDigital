import Link from 'next/link';
import { Container, GraduationCap, Factory, ArrowRight, Check } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import ProjectVideo from '@/components/ProjectVideo';
import { siteMetadata } from '@/lib/seo-metadata';

// Proyecto destacado con vídeo. Los vídeos de la web van en public/videos/<proyecto>/
// (el original sin comprimir, en media/, fuera de git). Si se cambia el vídeo,
// subir la versión del nombre (v1 → v2): /videos/* se sirve con caché "immutable" de un año.
const CRM_VIDEO = {
  src: '/videos/crm/crm-frecdigital-v1.mp4',
  poster: '/videos/crm/crm-frecdigital-v1-poster.webp',
  captions: '/videos/crm/crm-frecdigital-v1.es.vtt',
  uploadDate: '2026-11-20',
  duration: 'PT46S',
};

const crmProject = {
  title: 'CRM FrecDigital',
  sector: 'Atención y ventas',
  badge: 'En demo',
  description:
    'Tus clientes y tu agente de IA en un solo lugar. WhatsApp, chat web, email y formularios llegan a una sola bandeja, y el agente responde a cualquier hora, cualifica al cliente y agenda la llamada.',
  features: [
    'Una sola bandeja para todos los canales',
    'Agente de IA con el conocimiento de tu empresa; si hace falta, pasa la conversación a tu equipo',
    'Panel con leads, embudo de ventas y actividad de la IA',
    'Tareas de seguimiento propuestas por la IA',
    'Tú decides su conocimiento, sus canales y sus integraciones',
  ],
  href: '/?servicio=crm#contact',
  linkLabel: 'Solicitar demo',
};

const crmVideoJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'CRM FrecDigital: atención omnicanal con IA',
  description: crmProject.description,
  thumbnailUrl: `${siteMetadata.siteUrl}${CRM_VIDEO.poster}`,
  contentUrl: `${siteMetadata.siteUrl}${CRM_VIDEO.src}`,
  uploadDate: CRM_VIDEO.uploadDate,
  duration: CRM_VIDEO.duration,
  inLanguage: 'es',
});

// Componente de servidor: todo el texto va en el HTML inicial.
// Sin cifras ni nombres de clientes: solo soluciones en desarrollo o en demo.
const projects = [
  {
    icon: Container,
    title: 'Verificación de contenedores y precintos',
    sector: 'Logística',
    badge: 'En demo',
    description:
      'Lee en las fotos de cada expedición los números de contenedor y precinto, los compara con los registrados y avisa si no coinciden antes de que salga el camión.',
    href: '/servicios/vision-artificial',
    linkLabel: 'Ver visión artificial',
  },
  {
    icon: GraduationCap,
    title: 'Plataforma para academias',
    sector: 'Educación',
    badge: 'Acceso anticipado',
    // TODO: concretar las funciones principales de la plataforma cuando estén definidas
    description:
      'Para academias e institutos que quieren gestionar su día a día y atender a alumnos y familias con ayuda de la inteligencia artificial.',
    href: '/?servicio=academias#contact',
    linkLabel: 'Solicitar acceso',
  },
  {
    icon: Factory,
    title: 'Agentes de IA para Dynamics 365',
    sector: 'Industria',
    description:
      'Pregunta por ventas, stock o pedidos en lenguaje natural desde Teams o WhatsApp, y el agente prepara pedidos u ofertas en el ERP para que una persona los apruebe.',
    href: '/servicios/automatizacion-integracion',
    linkLabel: 'Ver automatización e integración',
  },
];

export default function ProjectsSection() {
  return (
    <section id="proyectos" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent" />
      <div className="absolute inset-0 bg-[#c8dff0]" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: 'url(/images/fondo2-opt.webp)' }}
      />
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#1a3a6b]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#1a3a6b]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1.5 bg-[#1a3a6b]/15 border border-[#1a3a6b]/30 rounded-full text-sm font-semibold text-[#1a3a6b]">
            En marcha
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a6b] mb-4 font-display">
            Proyectos y <span className="text-[#00b4d8]">demos</span>
          </h2>
          <div className="w-16 h-1 bg-[#00b4d8] rounded-full mx-auto mt-4 mb-6" />
          <p className="text-xl text-[#4a6080] max-w-2xl mx-auto">
            Soluciones que ya tenemos en desarrollo o en demo. Pídenos verlas funcionando.
          </p>
        </div>

        <JsonLd data={crmVideoJsonLd()} />
        <article
          aria-labelledby="proyecto-crm"
          className="max-w-5xl mx-auto mb-6 bg-white/80 rounded-2xl border border-[#b0cfe8] hover:border-[#00b4d8]/40 hover:shadow-xl hover:shadow-[#00b4d8]/20 transition-all duration-500 overflow-hidden lg:grid lg:grid-cols-5"
        >
          <div className="lg:col-span-3 bg-[#0a1628] flex items-center">
            <ProjectVideo
              src={CRM_VIDEO.src}
              poster={CRM_VIDEO.poster}
              captions={CRM_VIDEO.captions}
              title="CRM FrecDigital"
              label="Vídeo de presentación del CRM FrecDigital (46 segundos, con locución)"
            />
          </div>
          <div className="lg:col-span-2 p-8 flex flex-col text-left">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#1a3a6b]/10 text-[#1a3a6b] text-xs font-semibold uppercase tracking-wider">
                {crmProject.sector}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00b4d8]/15 text-[#0284a8] text-xs font-semibold uppercase tracking-wider">
                {crmProject.badge}
              </span>
            </div>
            <h3 id="proyecto-crm" className="text-2xl font-bold text-[#1a3a6b] mb-3 font-display">
              {crmProject.title}
            </h3>
            <p className="text-sm text-[#4a6080] leading-relaxed mb-4">{crmProject.description}</p>
            <ul className="space-y-2 mb-6">
              {crmProject.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-[#4a6080]">
                  <Check aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-[#00b4d8]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href={crmProject.href}
              className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#0284a8] hover:text-[#1a3a6b] transition-colors"
            >
              {crmProject.linkLabel} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </article>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map(({ icon: Icon, title, sector, badge, description, href, linkLabel }) => (
            <li
              key={title}
              className="flex flex-col bg-white/80 rounded-2xl p-8 text-center border border-[#b0cfe8] hover:border-[#00b4d8]/40 hover:shadow-xl hover:shadow-[#00b4d8]/20 transition-all duration-500 group"
            >
              <div className="w-12 h-1 bg-[#00b4d8] rounded-full mx-auto mb-6 group-hover:w-20 transition-all duration-500" />
              <div className="w-14 h-14 bg-[#e8f4fc] rounded-full flex items-center justify-center mx-auto mb-5">
                <Icon aria-hidden="true" className="w-7 h-7 text-[#00b4d8]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3a6b] mb-3 font-display">{title}</h3>
              <p className="text-sm text-[#4a6080] leading-relaxed mb-5">{description}</p>
              <div className="mt-auto flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#1a3a6b]/10 text-[#1a3a6b] text-xs font-semibold uppercase tracking-wider">
                  {sector}
                </span>
                {badge && (
                  <span className="px-3 py-1 rounded-full bg-[#00b4d8]/15 text-[#0284a8] text-xs font-semibold uppercase tracking-wider">
                    {badge}
                  </span>
                )}
              </div>
              <Link
                href={href}
                className="mt-5 inline-flex items-center justify-center gap-1 text-sm font-semibold text-[#0284a8] hover:text-[#1a3a6b] transition-colors"
              >
                {linkLabel} <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#1a3a6b] text-white font-semibold hover:bg-[#00b4d8] transition-colors duration-300"
          >
            Pide una demo
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
