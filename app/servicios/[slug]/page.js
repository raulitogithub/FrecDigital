import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { services } from '@/lib/services';
import { servicePages } from '@/lib/service-pages';
import { servicePageJsonLd } from '@/lib/seo-metadata';

// Solo existen las páginas de los servicios definidos: cualquier otro slug da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug) {
  const service = services.find((s) => s.slug === slug);
  const page = servicePages[slug];
  return service && page ? { service, page } : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = getService(slug);
  if (!data) return {};
  const { service, page } = data;
  const path = `/servicios/${slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${page.metaTitle} | FrecDigital`,
      description: page.metaDescription,
      url: path,
      type: 'website',
      images: [{ url: service.image, alt: service.title }],
    },
  };
}

function Section({ title, children }) {
  return (
    <section className="py-10 border-t border-[#d6e6f3] first:border-t-0">
      <h2 className="text-2xl md:text-3xl font-bold font-display text-[#1a3a6b] mb-6">{title}</h2>
      {children}
    </section>
  );
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const data = getService(slug);
  if (!data) notFound();
  const { service, page } = data;
  const Icon = service.icon;
  const related = page.related.map((s) => services.find((x) => x.slug === s)).filter(Boolean);
  const ctaHref = `/?servicio=${service.slug}#contact`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <JsonLd data={servicePageJsonLd(service, page)} />
      <Navbar />

      <main className="flex-1">
        {/* Cabecera del servicio */}
        <header className="relative overflow-hidden bg-[#0a1628] text-white">
          <Image src={service.image} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/90 to-[#0a1628]/60" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20">
            {/* Migas de pan */}
            <nav aria-label="Migas de pan" className="mb-8 text-sm text-white/60">
              <ol className="flex flex-wrap items-center gap-1">
                <li><Link href="/" className="hover:text-[#00b4d8]">Inicio</Link></li>
                <li aria-hidden="true"><ChevronRight size={14} /></li>
                <li><Link href="/servicios" className="hover:text-[#00b4d8]">Servicios</Link></li>
                <li aria-hidden="true"><ChevronRight size={14} /></li>
                <li aria-current="page" className="text-white/90">{service.title}</li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-5">
              <span className="w-12 h-12 rounded-xl bg-[#00b4d8]/20 border border-[#00b4d8]/40 flex items-center justify-center">
                <Icon aria-hidden="true" className="w-6 h-6 text-[#00b4d8]" />
              </span>
              {service.badge && (
                <span className="px-3 py-1 rounded-full bg-[#00b4d8] text-[#0a1628] text-xs font-bold uppercase tracking-wider">
                  {service.badge}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight mb-6">{service.title}</h1>
            {/* Entradilla: dos frases autocontenidas (qué es, para quién y en qué países) */}
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">{page.intro.join(' ')}</p>

            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-full bg-[#00b4d8] text-white font-semibold hover:bg-[#0090b0] transition-colors"
            >
              Pide una demo
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-[#334155] leading-relaxed">
          <Section title="Qué problema resuelve">
            <div className="space-y-4">
              {page.problem.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </div>
          </Section>

          <Section title="Cómo funciona">
            <ol className="grid gap-4 sm:grid-cols-2">
              {page.steps.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-[#d6e6f3] bg-[#f5faff] p-5">
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-[#1a3a6b] text-white text-sm font-bold mb-3">
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-[#1a3a6b] mb-1">{step.title}</h3>
                  <p className="text-sm">{step.text}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Casos de uso">
            <ul className="space-y-4">
              {page.useCases.map((u) => (
                <li key={u.text.slice(0, 40)} className="flex gap-4">
                  <span className="flex-shrink-0 h-fit px-3 py-1 rounded-full bg-[#1a3a6b]/10 text-[#1a3a6b] text-xs font-semibold uppercase tracking-wider">
                    {u.sector}
                  </span>
                  <p>{u.text}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Tecnologías">
            <ul className="list-disc pl-6 space-y-2">
              {page.technologies.map((t) => <li key={t.slice(0, 40)}>{t}</li>)}
            </ul>
          </Section>

          <Section title="Preguntas frecuentes">
            <div className="space-y-6">
              {page.faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-bold text-[#1a3a6b] mb-1">{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* CTA con el servicio preseleccionado en el formulario */}
          <section className="my-10 rounded-3xl bg-[#0a1628] text-white p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
              ¿Quieres verlo funcionando?
            </h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Cuéntanos tu caso y te enseñamos una demo antes de contratar. El servicio ya irá
              seleccionado en el formulario.
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#00b4d8] text-white font-semibold hover:bg-[#0090b0] transition-colors"
            >
              Solicitar información
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </section>

          {/* Servicios relacionados (enlazado interno) */}
          <Section title="Servicios relacionados">
            <ul className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => {
                const RelatedIcon = r.icon;
                return (
                  <li key={r.slug}>
                    <Link
                      href={`/servicios/${r.slug}`}
                      className="group flex h-full gap-4 rounded-2xl border border-[#d6e6f3] p-5 hover:border-[#00b4d8] hover:shadow-lg transition-all"
                    >
                      <RelatedIcon aria-hidden="true" className="w-6 h-6 flex-shrink-0 text-[#00b4d8]" />
                      <span>
                        <span className="block font-bold text-[#1a3a6b] group-hover:text-[#0284a8]">{r.title}</span>
                        <span className="block text-sm mt-1">{r.shortDescription}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
