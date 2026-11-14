'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// El panel "Ver detalles" se renderiza SIEMPRE (también en el HTML del servidor)
// y solo se pliega con CSS. Así buscadores e IA leen la pregunta, el detalle y
// las etiquetas aunque nadie haga clic. Cerrado lleva `inert`: no recibe foco.
export default function ServiceCard({
  slug,
  icon: Icon,
  title,
  shortDescription,
  image,
  badge,
  question,
  detail,
  tags = [],
  accentColor = '#06b6d4',
}) {
  const [open, setOpen] = useState(false);
  const hasDetails = Boolean(question && detail);
  const panelId = `${slug}-detalles`;

  return (
    <article
      id={slug}
      className="scroll-mt-24 rounded-2xl border border-white/10 hover:border-[#00b4d8]/50 transition-all duration-500 overflow-hidden group bg-[#0a1628]"
    >
      {/* Imagen — contenida en su propio bloque con overflow-hidden */}
      <div className="relative h-64 w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-cyan-900" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent" />
        <div className="absolute inset-0 bg-[#00b4d8]/0 group-hover:bg-[#00b4d8]/5 transition-all duration-500" />
        <div className="absolute left-0 top-0 w-0.5 h-full bg-[#00b4d8] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

        {badge && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#00b4d8] text-[#0a1628] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#00b4d8]/30">
            {badge}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="w-10 h-10 rounded-xl bg-[#00b4d8]/20 border border-[#00b4d8]/40 flex items-center justify-center mb-2">
            <Icon aria-hidden="true" className="text-[#00b4d8] w-5 h-5" />
          </div>
          <h3 className="text-white font-bold text-base uppercase tracking-wider">
            {title}
          </h3>
          <p className="text-white/70 text-xs leading-relaxed mt-1 line-clamp-2">
            {shortDescription}
          </p>
        </div>
      </div>

      {hasDetails && (
        <>
          {/* Botón ver detalles */}
          <div className="px-4 py-2.5 border-t border-white/5">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="w-full flex items-center justify-between text-xs font-semibold text-[#00b4d8] hover:text-white transition-colors duration-200"
            >
              <span>{open ? 'Ocultar detalles' : 'Ver detalles'}</span>
              <ChevronDown
                aria-hidden="true"
                className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Panel expandible — inline, empuja hacia abajo solo esta tarjeta */}
          <div
            id={panelId}
            inert={!open}
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
              open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-4 pb-4">
                <div
                  className="rounded-lg p-3 border-l-4 bg-slate-800/50"
                  style={{ borderLeftColor: accentColor }}
                >
                  <h4 className="text-white font-semibold text-xs mb-1.5">{question}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-3">{detail}</p>
                  {tags.length > 0 && (
                    <ul className="flex flex-wrap gap-1">
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded-full whitespace-nowrap"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={`/servicios/${slug}`}
                    className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-[#00b4d8] hover:text-white transition-colors"
                  >
                    Más información <span aria-hidden="true">→</span>
                    <span className="sr-only">sobre {title}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
