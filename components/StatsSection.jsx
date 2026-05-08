'use client';

import { motion } from 'framer-motion';
import StatCounter from './ui/StatCounter';

export default function StatsSection() {
  const stats = [
    { endValue: 50, label: 'Proyectos completados', prefix: '+' },
    { endValue: 30, label: 'Clientes satisfechos', prefix: '+' },
    { endValue: 99, label: 'Satisfacción del cliente', prefix: '' },
    { endValue: 3, label: 'Años de experiencia', prefix: '+' },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent" />

      {/* Fondo claro */}
      <div className="absolute inset-0 bg-[#c8dff0]" />

      {/* Imagen de fondo ← AQUÍ, fuera del z-10 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(/images/fondo6.jfif)',
        }}
      />

      {/* Elementos decorativos sutiles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#1a3a6b]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#1a3a6b]/20 rounded-full blur-3xl" />

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#1a3a6b]/15 border border-[#1a3a6b]/30 rounded-full text-sm font-semibold text-[#1a3a6b]">
              Resultados reales
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a6b] mb-4 font-display">
            Nuestro <span className="text-[#00b4d8]">Impacto</span>
          </h2>

          <div className="w-16 h-1 bg-[#00b4d8] rounded-full mx-auto mt-4 mb-6" />

          <p className="text-xl text-[#4a6080] max-w-2xl mx-auto">
            Números que hablan de nuestro compromiso con la excelencia
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <StatCounter
                endValue={stat.endValue}
                label={stat.label}
                prefix={stat.prefix}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
