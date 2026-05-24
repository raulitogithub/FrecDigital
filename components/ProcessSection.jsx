'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Cog, Rocket, ArrowRight } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Consulta',
      description: 'Conocemos tus necesidades y objetivos de negocio en detalle',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      icon: Lightbulb,
      title: 'Diseño',
      description: 'Creamos la solución perfecta adaptada a tu proyecto',
      color: 'from-cyan-400 to-teal-400',
    },
    {
      icon: Cog,
      title: 'Desarrollo',
      description: 'Implementamos con tecnología de punta y buenas prácticas',
      color: 'from-teal-400 to-green-400',
    },
    {
      icon: Rocket,
      title: 'Lanzamiento',
      description: 'Desplegamos y ofrecemos soporte continuo para tu éxito',
      color: 'from-green-400 to-cyan-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Fondo con imagen local */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/fondo5.webp)',
        }}
      />
      
      {/* Overlay oscuro para mejor contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1019]/80 via-[#0f1419]/70 to-[#0a1019]/80" />
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#00b4d8] rounded-full opacity-5 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#00b4d8] rounded-full opacity-5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-[#00b4d8]/10 border border-[#00b4d8]/30 rounded-full text-sm font-semibold text-[#00b4d8]">
              Nuestro Flujo de Trabajo
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display">
            Proceso Comprobado en <span className="bg-gradient-to-r from-[#00b4d8] to-cyan-300 bg-clip-text text-transparent">4 Pasos</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Metodología optimizada para entregar soluciones de IA de alta calidad que transforman tu negocio
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Animated connecting line - desktop only */}
          <div className="hidden lg:block absolute top-28 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#00b4d8]/40 to-transparent -z-10"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                {/* Step Container */}
                <div className="relative h-full">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00b4d8]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  
                  {/* Main Card */}
                  <div className="relative h-full bg-[#0f1728]/60 backdrop-blur-xl border border-white/10 group-hover:border-[#00b4d8]/40 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00b4d8]/20">
                    
                    {/* Icon */}
                    <motion.div
                      className="flex justify-center mb-6"
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="p-4 bg-gradient-to-br from-[#00b4d8]/20 to-cyan-400/20 rounded-xl border border-[#00b4d8]/30 group-hover:border-[#00b4d8]/70 transition-all duration-300">
                        <step.icon className="w-8 h-8 text-[#00b4d8]" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-3 text-center font-display group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#00b4d8] group-hover:to-cyan-300 group-hover:bg-clip-text transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-center leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-300">
                      {step.description}
                    </p>

                    {/* Arrow indicator for next step */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className="hidden lg:flex justify-center"
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6 text-[#00b4d8]/50 group-hover:text-[#00b4d8] transition-colors" />
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile vertical connector */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="lg:hidden absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-0.5 h-8 bg-gradient-to-b from-[#00b4d8]/40 to-transparent"
                      animate={{ height: [24, 32, 24] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/70 mb-6 text-lg">
            ¿Listo para transformar tu negocio?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00b4d8] to-cyan-300 text-white font-bold text-lg hover:shadow-2xl hover:shadow-[#00b4d8]/50 transition-all duration-300"
          >
            Comienza tu Proyecto Hoy
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
