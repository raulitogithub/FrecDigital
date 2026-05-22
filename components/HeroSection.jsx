'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';

export default function HeroSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/images/video3.mp4" type="video/mp4" />
      </video>

      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-slate-900/70 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 z-[2]" />

      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl z-0" />
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-slate-700/10 rounded-full blur-3xl z-0" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            {/* Main Title */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-3 text-center">
                Potencia tu negocio con
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-cyan-500 leading-tight mb-3 text-center">
                Inteligencia Artificial
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-10 max-w-2xl text-center mx-auto"
            >
              Deja de preocuparte por las operaciones, empieza a enfocarte en lo que importa.
              Un equipo experto a tu disposición, sin los costos de una contratación tradicional. Transparente, simple y predecible
            </motion.p>

            {/* CTA Buttons */}
        
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-cyan-500 text-white font-semibold text-lg hover:bg-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/40 group"
              >
                Comenzar ahora
                <motion.div
                  className="group-hover:translate-x-1 transition-transform"
                  initial={false}
                >
                  <ArrowRight size={22} />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const servicesSection = document.querySelector('#services');
                  servicesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border-2 border-cyan-400 text-white font-semibold text-lg hover:border-cyan-500 hover:bg-cyan-500/20 transition-all duration-300"
              >
                Explorar Servicios
              </motion.button>
            </motion.div>

            {/* Stats Row */}
                        <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-10 sm:gap-12 mt-14 pt-10 border-t border-white/20"
            >
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-cyan-500 mb-2">500+</p>
                <p className="text-sm sm:text-base text-gray-300">Empresas confían en nosotros</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-cyan-500 mb-2">98%</p>
                <p className="text-sm sm:text-base text-gray-300">Satisfacción de clientes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-cyan-500 mb-2">24/7</p>
                <p className="text-sm sm:text-base text-gray-300">Soporte disponible</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}



