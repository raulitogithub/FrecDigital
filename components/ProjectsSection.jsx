import { Container, GraduationCap, Factory, ArrowRight } from 'lucide-react';

// Componente de servidor: todo el texto va en el HTML inicial.
// Sin cifras ni nombres de clientes: solo soluciones en desarrollo o en demo.
const projects = [
  { icon: Container, title: 'Contenedores y precintos', sector: 'Logística' },
  { icon: GraduationCap, title: 'Plataforma para academias', sector: 'Educación', badge: 'Acceso anticipado' },
  { icon: Factory, title: 'Agentes sobre Dynamics 365', sector: 'Industria' },
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

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map(({ icon: Icon, title, sector, badge }) => (
            <li
              key={title}
              className="flex flex-col bg-white/80 rounded-2xl p-8 text-center border border-[#b0cfe8] hover:border-[#00b4d8]/40 hover:shadow-xl hover:shadow-[#00b4d8]/20 transition-all duration-500 group"
            >
              <div className="w-12 h-1 bg-[#00b4d8] rounded-full mx-auto mb-6 group-hover:w-20 transition-all duration-500" />
              <div className="w-14 h-14 bg-[#e8f4fc] rounded-full flex items-center justify-center mx-auto mb-5">
                <Icon aria-hidden="true" className="w-7 h-7 text-[#00b4d8]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3a6b] mb-4 font-display">{title}</h3>
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
