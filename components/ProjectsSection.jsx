import Link from 'next/link';
import { Container, GraduationCap, Factory, ArrowRight, Check } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import ProjectVideo from '@/components/ProjectVideo';
import { siteMetadata } from '@/lib/seo-metadata';

// Proyecto destacado con vídeo. Los vídeos de la web van en public/videos/<proyecto>/
// (el original sin comprimir, en media/, fuera de git). Si se cambia el vídeo,
// subir la versión del nombre (v1 → v2): /videos/* se sirve con caché "immutable" de un año.
// La versión anterior (crm-frecdigital-v1.*, cuando se llamaba CRM) se conserva en la carpeta.
const ARM_VIDEO = {
  src: '/videos/arm/arm-frecdigital-v2.mp4',
  poster: '/videos/arm/arm-frecdigital-v2-poster.webp',
  captions: '/videos/arm/arm-frecdigital-v2.es.vtt',
  uploadDate: '2026-11-22',
  duration: 'PT59S',
  seconds: 59,
};

const armProject = {
  title: 'ARM FrecDigital',
  subtitle: 'AI Relationship Management',
  sector: 'Atención y ventas',
  badge: 'En demo',
  description:
    'La evolución del CRM: no solo guarda datos, trabaja por ti. Atiende a cualquier hora en WhatsApp, web y email, crea y califica cada lead por sí solo y te propone el siguiente paso y el mensaje. Tú solo apruebas y cierras.',
  features: [
    'Todo en una bandeja: WhatsApp, chat web, email y formularios, con quién lleva cada caso y qué falta',
    'La IA conversa, califica y puntúa a cada cliente con el siguiente paso',
    'Te propone la respuesta: la revisas, la editas si quieres y se envía con un clic',
    'Tu negocio de un vistazo y un embudo de ventas siempre al día',
    'Tareas que se crean solas desde la conversación',
    'Tú decides cómo trabaja en cada canal: que responda sola o que proponga y apruebes tú',
  ],
  href: '/?servicio=arm#contact',
  linkLabel: 'Solicitar demo',
};

const armVideoJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'ARM FrecDigital: de CRM a AI Relationship Management',
  description: armProject.description,
  thumbnailUrl: `${siteMetadata.siteUrl}${ARM_VIDEO.poster}`,
  contentUrl: `${siteMetadata.siteUrl}${ARM_VIDEO.src}`,
  uploadDate: ARM_VIDEO.uploadDate,
  duration: ARM_VIDEO.duration,
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

        <JsonLd data={armVideoJsonLd()} />
        <article
          aria-labelledby="proyecto-arm"
          className="max-w-5xl mx-auto mb-6 bg-white/80 rounded-2xl border border-[#b0cfe8] hover:border-[#00b4d8]/40 hover:shadow-xl hover:shadow-[#00b4d8]/20 transition-all duration-500 overflow-hidden"
        >
          {/* Vídeo a todo el ancho y el texto debajo: así el vídeo nunca queda
              más bajo que el texto con franjas vacías arriba y abajo */}
          <div className="bg-[#0a1628]">
            <ProjectVideo
              src={ARM_VIDEO.src}
              poster={ARM_VIDEO.poster}
              captions={ARM_VIDEO.captions}
              title={armProject.title}
              heading={
                <>
                  <span className="text-[#00b4d8]">ARM</span> FrecDigital
                </>
              }
              label={`Vídeo de presentación de ${armProject.title} (${ARM_VIDEO.seconds} segundos, con locución)`}
            />
          </div>
          <div className="p-8 lg:p-10 text-left md:grid md:grid-cols-2 md:gap-10">
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#1a3a6b]/10 text-[#1a3a6b] text-xs font-semibold uppercase tracking-wider">
                {armProject.sector}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#00b4d8]/15 text-[#0284a8] text-xs font-semibold uppercase tracking-wider">
                {armProject.badge}
              </span>
            </div>
            <h3 id="proyecto-arm" className="text-2xl font-bold text-[#1a3a6b] mb-1 font-display">
              <span className="text-[#00b4d8]">ARM</span> FrecDigital
            </h3>
            <p className="text-sm font-semibold text-[#0284a8] mb-3">{armProject.subtitle}</p>
            <p className="text-base text-[#4a6080] leading-relaxed mb-6">{armProject.description}</p>
            <Link
              href={armProject.href}
              className="mt-auto self-start inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1a3a6b] text-white text-sm font-semibold hover:bg-[#00b4d8] transition-colors duration-300"
            >
              {armProject.linkLabel} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <ul className="space-y-3 mt-8 md:mt-0">
            {armProject.features.map((feature) => (
              <li key={feature} className="flex gap-2 text-sm text-[#4a6080] leading-relaxed">
                <Check aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-[#00b4d8]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
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
