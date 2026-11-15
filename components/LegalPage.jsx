import Navbar from './Navbar';
import Footer from './Footer';

// Plantilla de las páginas legales: misma cabecera (Navbar) y pie (Footer) que la web,
// con el texto sobre fondo claro para que se lea con comodidad.
export default function LegalPage({ title, lastUpdated, children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-[#e8f4fc] to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-[#1a3a6b] mb-3">{title}</h1>
          <div className="w-16 h-1 bg-[#00b4d8] rounded-full mb-4" />
          {lastUpdated && (
            <p className="text-sm text-[#64748b] mb-12">Última actualización: {lastUpdated}</p>
          )}
          <div className="space-y-10 text-[#334155] leading-relaxed">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({ number, title, children }) {
  return (
    <section>
      <h2 className="text-2xl font-bold font-display text-[#1a3a6b] mb-4">
        {number}. {title}
      </h2>
      <div className="space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-[#0284a8] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-[#1a3a6b]">
        {children}
      </div>
    </section>
  );
}
