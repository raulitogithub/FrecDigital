import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { services } from '@/lib/services';
import { breadcrumbNode, serviceUrl, siteMetadata } from '@/lib/seo-metadata';

// Índice de servicios: da una URL real al nivel "Servicios" de las migas de pan.
export const metadata = {
  title: 'Servicios de IA para pymes e industria',
  description:
    'Asistentes de IA, visión artificial, automatización e integración de sistemas y gobernanza de IA para pymes e industria en España y Ecuador.',
  alternates: { canonical: '/servicios' },
};

const base = siteMetadata.siteUrl;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumbNode(`${base}/servicios#breadcrumb`, [
      { name: 'Inicio', url: `${base}/` },
      { name: 'Servicios', url: `${base}/servicios` },
    ]),
    {
      '@type': 'ItemList',
      '@id': `${base}/servicios#list`,
      itemListElement: services.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: serviceUrl(s.slug),
        name: s.title,
      })),
    },
  ],
};

export default function ServiciosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <JsonLd data={jsonLd} />
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-[#e8f4fc] to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <nav aria-label="Migas de pan" className="mb-8 text-sm text-[#64748b]">
            <ol className="flex items-center gap-1">
              <li><Link href="/" className="hover:text-[#0284a8]">Inicio</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li aria-current="page" className="text-[#1a3a6b]">Servicios</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-[#1a3a6b] mb-4">Servicios</h1>
          <p className="text-lg text-[#4a6080] max-w-3xl mb-12">
            FrecDigital es una consultora de inteligencia artificial aplicada para pymes e industria, con
            actividad en España y Ecuador. Estas son las soluciones que ofrecemos.
          </p>
          <ul className="grid gap-5 sm:grid-cols-2">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-[#d6e6f3] bg-white p-6 hover:border-[#00b4d8] hover:shadow-lg transition-all"
                  >
                    <span className="flex items-center gap-3 mb-3">
                      <Icon aria-hidden="true" className="w-6 h-6 text-[#00b4d8]" />
                      {s.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-[#00b4d8] text-[#0a1628] text-[10px] font-bold uppercase tracking-wider">
                          {s.badge}
                        </span>
                      )}
                    </span>
                    <span className="text-xl font-bold font-display text-[#1a3a6b] group-hover:text-[#0284a8]">{s.title}</span>
                    <span className="mt-2 text-[#334155]">{s.shortDescription}</span>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0284a8]">
                      Más información <ArrowRight aria-hidden="true" size={16} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
