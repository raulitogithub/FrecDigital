'use client';

import { motion } from 'framer-motion';
import {
  Fingerprint,
  CircuitBoard,
  HandHeart
} from 'lucide-react';

export default function WhyUsSection() {
  const features = [
    {
      icon: Fingerprint,
      title: 'Soluciones a medida',
      description: 'Cada empresa es única. Diseñamos soluciones específicamente adaptadas a tus necesidades y objetivos.',
    },
    {
      icon: CircuitBoard,
      title: 'Tecnología de punta',
      description: 'Utilizamos las herramientas y frameworks de IA más avanzados y confiables del mercado.',
    },
    {
      icon: HandHeart,
      title: 'Acompañamiento continuo',
      description: 'No te dejamos solo. Te acompañamos en todo el proceso de implementación y más allá.',
    },
  ];

  return (
    <section
      id="why-us"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent" />

      {/* Fondo con imagen local */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/fondo3.png)',
        }}
      />

      {/* Overlay oscuro para visibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/85 via-[#1a3a6b]/75 to-[#0a1628]/85" />
      <div className="absolute inset-0 dot-pattern-dark opacity-20" />

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent" />

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
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-[#00b4d8]/40 rounded-full text-sm font-semibold text-[#00b4d8] backdrop-blur-sm">
              Nuestra diferencia
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            ¿Por qué <span className="text-[#00b4d8]">FrecDigital</span>?
          </h2>

          {/* Línea decorativa */}
          <div className="w-16 h-1 bg-[#00b4d8] rounded-full mx-auto mt-4 mb-6" />

          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Somos tu partner confiable en la transformación digital con IA
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Tarjeta con efecto glassmorphism */}
              <div className="relative h-full bg-white/8 backdrop-blur-md rounded-2xl p-8 border border-white/15 hover:border-[#00b4d8]/50 hover:bg-white/15 hover:shadow-2xl hover:shadow-[#00b4d8]/10 transition-all duration-300">
                {/* Icon */}
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-[#00b4d8]/15 border border-[#00b4d8]/30 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <feature.icon size={40} className="text-[#00b4d8]" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 font-display text-center">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-center">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#00b4d8]/0 via-[#00b4d8] to-[#00b4d8]/0 w-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
