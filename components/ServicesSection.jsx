'use client';

import { motion } from 'framer-motion';
import { MessageSquareMore, Blocks, CircuitBoard} from 'lucide-react';
import ServiceCard from './ui/ServiceCard';

export default function ServicesSection() {
  const services = [
    {
      icon: MessageSquareMore,
      title: 'Chatbots Inteligentes',
      description: 'Asistentes virtuales que brindan atención continua, resuelven consultas y mejoran la comunicación con tus clientes de forma eficiente.',
      image: '/images/Chatbots.png',
    },
    {
      icon: Blocks,
      title: 'Automatización de Procesos',
      description: 'Reduce tareas manuales y mejora la eficiencia operativa mediante flujos automatizados adaptados a tu negocio.',
      image: '/images/Automatización.png',
    },
    {
      icon: CircuitBoard,
      title: 'Integración de Sistemas con IA',
      description: 'Integramos tus plataformas empresariales para centralizar la información y permitir una gestión más ágil y conectada.',
      image: '/images/Integración.png',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a1628]">
      {/* Elementos decorativos de luz difusa */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#00b4d8]/8 rounded-full blur-3xl" />
      <div className="absolute top-10 right-0 w-80 h-80 bg-[#1a3a6b]/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00b4d8]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header con animación mejorada */}
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
            <span className="inline-block px-4 py-2 bg-[#00b4d8]/10 border border-[#00b4d8]/30 rounded-full text-sm font-semibold text-[#00b4d8]">
              Soluciones Completas
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            Nuestros <span className="text-[#00b4d8]">Servicios</span>
          </h2>
          
          {/* Línea decorativa */}
          <div className="w-16 h-1 bg-[#00b4d8] rounded-full mx-auto mt-4 mb-6" />
          
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Soluciones completas de inteligencia artificial para llevar tu negocio al siguiente nivel
          </p>
        </motion.div>

        {/* Services Grid con scroll reveal animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
