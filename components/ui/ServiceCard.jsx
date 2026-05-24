'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  image,
  adMessage,
  adDescription,
  adBadges = [],
  adBorderColor = '#06b6d4'
}) {
  const [open, setOpen] = useState(false);
  const hasAdMessage = adMessage && adDescription;

  return (
    <motion.div className="relative overflow-hidden rounded-2xl group border border-white/10 hover:border-[#00b4d8]/50 transition-all duration-500 flex flex-col">

      {/* Imagen */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-cyan-900" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent" />
        <div className="absolute inset-0 bg-[#00b4d8]/0 group-hover:bg-[#00b4d8]/5 transition-all duration-500" />
        <div className="absolute left-0 top-0 w-0.5 h-full bg-[#00b4d8] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col">
          <div className="w-10 h-10 rounded-xl bg-[#00b4d8]/20 border border-[#00b4d8]/40 flex items-center justify-center mb-2">
            <Icon className="text-[#00b4d8] w-5 h-5" />
          </div>
          <h3 className="text-white font-bold text-base uppercase tracking-wider">
            {title}
          </h3>
          <p className="text-white/70 text-xs leading-relaxed mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Botón ver detalles */}
      {hasAdMessage && (
        <div className="bg-[#0a1628] px-4 py-2.5 border-t border-white/5">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between text-xs font-semibold text-[#00b4d8] hover:text-white transition-colors duration-200 group/btn"
          >
            <span>{open ? 'Ocultar detalles' : 'Ver detalles'}</span>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </div>
      )}

      {/* Panel expandible */}
      <AnimatePresence initial={false}>
        {hasAdMessage && open && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-[#0a1628]"
          >
            <div className="px-4 pb-4">
              <div
                className="rounded-lg p-3 border-l-4 bg-slate-800/50"
                style={{ borderLeftColor: adBorderColor }}
              >
                <h4 className="text-white font-semibold text-xs mb-1.5">
                  {adMessage}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">
                  {adDescription}
                </p>
                {adBadges.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {adBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded-full whitespace-nowrap"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
