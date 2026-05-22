import Image from 'next/image';
import { motion } from 'framer-motion';

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
  const hasAdMessage = adMessage && adDescription;
  const cardHeight = hasAdMessage ? 'auto' : 'h-80';

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl group cursor-pointer border border-white/10 hover:border-[#00b4d8]/50 transition-all duration-500 ${
        hasAdMessage ? 'flex flex-col' : cardHeight
      }`}
    >
      {/* Contenedor de imagen */}
      {hasAdMessage ? (
        // Para cards con mensaje publicitario
        <div className="relative h-64 overflow-hidden">
          {/* Imagen de fondo */}
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${
              adBorderColor === '#818cf8' ? 'from-slate-700 to-indigo-900' : 'from-slate-700 to-cyan-900'
            }`} />
          )}

          {/* Overlay permanente oscuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent" />

          {/* Overlay hover */}
          <div className="absolute inset-0 bg-[#00b4d8]/0 group-hover:bg-[#00b4d8]/5 transition-all duration-500" />

          {/* Línea cian izquierda animada */}
          <div className="absolute left-0 top-0 w-0.5 h-full bg-[#00b4d8] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

          {/* Contenido de imagen */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
            {/* Ícono */}
            <div className="w-10 h-10 rounded-xl bg-[#00b4d8]/20 border border-[#00b4d8]/40 flex items-center justify-center mb-3">
              <Icon className="text-[#00b4d8] w-5 h-5" />
            </div>

            {/* Título */}
            <h3 className="text-white font-bold text-lg uppercase tracking-wider">
              {title}
            </h3>

            {/* Descripción */}
            <p className="text-white/70 text-sm leading-relaxed mt-2">
              {description}
            </p>
          </div>
        </div>
      ) : (
        // Para cards originales sin mensaje publicitario
        <>
          {/* Imagen de fondo */}
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}

          {/* Overlay permanente oscuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent" />

          {/* Overlay hover con color cian */}
          <div className="absolute inset-0 bg-[#00b4d8]/0 group-hover:bg-[#00b4d8]/5 transition-all duration-500" />

          {/* Línea cian izquierda animada */}
          <div className="absolute left-0 top-0 w-0.5 h-full bg-[#00b4d8] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

          {/* Contenido */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
            {/* Ícono */}
            <div className="w-10 h-10 rounded-xl bg-[#00b4d8]/20 border border-[#00b4d8]/40 flex items-center justify-center mb-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <Icon className="text-[#00b4d8] w-5 h-5" />
            </div>

            {/* Título */}
            <h3 className="text-white font-bold text-lg uppercase tracking-wider mb-2">
              {title}
            </h3>

            {/* Descripción con animación */}
            <p className="text-white/70 text-sm leading-relaxed overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500">
              {description}
            </p>

            {/* Botón "Saber más →" */}
            <button className="mt-3 text-[#00b4d8] text-xs font-semibold uppercase tracking-widest border-b border-[#00b4d8] pb-0.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 inline-block hover:text-[#00d4e8]">
             
            </button>
          </div>
        </>
      )}

      {/* Mensaje Publicitario - Solo si hasAdMessage */}
      {hasAdMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 p-6 flex flex-col justify-between"
        >
          {/* Separador línea cian */}
          <div className="w-full h-0.5 bg-[#06b6d4]/30 mb-4" />

          {/* Contenedor del mensaje */}
          <div className={`bg-slate-800/50 rounded-lg p-4 border-l-4 transition-all duration-300`}
               style={{ borderLeftColor: adBorderColor }}>
            
            {/* Texto principal */}
            <h4 className="text-white font-semibold text-sm mb-2">
              {adMessage}
            </h4>

            {/* Texto secundario */}
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              {adDescription}
            </p>

            {/* Badges */}
            {adBadges.length > 0 && (
              <div className="flex flex-wrap gap-2">
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
        </motion.div>
      )}
    </motion.div>
  );
}
