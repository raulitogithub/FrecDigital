import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import Logo from './Logo';
import Footer from './Footer';

// Plantilla común de las páginas legales. Mientras `sections` no traiga
// contenido, se muestra el aviso "Contenido en preparación".
export default function LegalPage({ title, sections }) {
  const pending = sections.every((s) => !s.content);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a1628] text-white">
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 h-16">
          <Link href="/" className="flex items-center gap-2 font-bold font-display">
            <Logo className="w-8 h-8" />
            FrecDigital
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#00b4d8] transition-colors">
            <ArrowLeft aria-hidden="true" size={16} />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-8">{title}</h1>

        {pending && (
          <div role="status" className="flex items-start gap-3 mb-12 p-5 rounded-2xl border border-[#00b4d8]/40 bg-[#00b4d8]/10">
            <Clock aria-hidden="true" className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#00b4d8]" />
            <p className="text-white/80">
              <strong className="text-white">Contenido en preparación.</strong> Estamos redactando esta página. Si tienes cualquier duda, escríbenos desde el formulario de contacto.
            </p>
          </div>
        )}

        <div className="space-y-10">
          {sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold font-display text-[#00b4d8] mb-3">
                {index + 1}. {section.title}
              </h2>
              {section.content ? (
                <div className="text-white/75 leading-relaxed space-y-4">{section.content}</div>
              ) : (
                <p className="text-white/40 italic">Pendiente de redacción.</p>
              )}
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
