import { ChevronDown } from 'lucide-react';
import { faqs } from '@/lib/seo-metadata';

// Componente de servidor: las preguntas y respuestas van en el HTML inicial
// (visibles sin JavaScript). El mismo texto se publica como FAQPage en app/page.js.
export default function FAQSection() {
  return (
    <section id="faq" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1628]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-[#00b4d8]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[#1a3a6b]/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-4 py-2 bg-[#00b4d8]/10 border border-[#00b4d8]/30 rounded-full text-sm font-semibold text-[#00b4d8]">
            Resolvemos tus dudas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            Preguntas <span className="text-[#00b4d8]">frecuentes</span>
          </h2>
          <div className="w-16 h-1 bg-[#00b4d8] rounded-full mx-auto mt-4" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/10 bg-white/5 open:border-[#00b4d8]/40 open:bg-[#00b4d8]/5 transition-colors duration-300"
              {...(index === 0 && { open: true })}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-white font-semibold [&::-webkit-details-marker]:hidden">
                <h3 className="text-base sm:text-lg">{faq.question}</h3>
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-[#00b4d8] transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="px-6 pb-5 text-white/70 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
