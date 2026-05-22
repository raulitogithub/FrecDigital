'use client';

import { motion } from 'framer-motion';
import { MessageSquareMore, Blocks, CircuitBoard, Calendar, BarChart3 } from 'lucide-react';
import ServiceCard from './ui/ServiceCard';

export default function ServicesSection() {
  const services = [
        {
      icon: Calendar,
      title: 'Agendamiento Inteligente',
      description: 'Automatiza tus reservas con un asistente virtual que agenda, confirma y recuerda citas sin intervención humana.',
      image: '/images/agendamiento.png',
      adMessage: '¿Cansado de gestionar citas manualmente?',
      adDescription: 'Nuestro chatbot atiende 24/7, sincroniza con tu calendario y envía recordatorios automáticos. Reduce el 80% de las ausencias y no-shows.',
      adBadges: ['⚡ Disponible 24/7'],
      adBorderColor: '#06b6d4',
    },
    {
      icon: BarChart3,
      title: 'Consultas Gerenciales IA',
      description: 'Consulta tus datos de ventas en lenguaje natural. Pregunta por períodos específicos y obtén reportes instantáneos.',
      image: '/images/gerencial.png',
      adMessage: 'Tus datos hablan, ¿los estás escuchando?',
      adDescription: 'Pregunta: "¿Cuáles fueron mis ventas de enero y febrero?" y obtén un reporte completo al instante. Conectamos tu base de datos con IA para decisiones más rápidas.',
      adBadges: ['📊 Ventas del último mes', '📈 Comparar 2 períodos', '🏆 Producto más vendido'],
      adBorderColor: '#818cf8',
    },
    {
      icon: MessageSquareMore,
      title: 'Chatbots Inteligentes',
      description: 'Asistentes virtuales con IA que responden consultas, automatizan la atención y mejoran la experiencia.',
      image: '/images/Chatbots.png',
      adMessage: '¿Pierdes clientes por responder tarde los mensajes?',
      adDescription: 'Nuestros chatbots atienden automáticamente WhatsApp, aplicaciones web, resolviendo preguntas frecuentes y guiando a tus clientes en tiempo real sin descanso.',
      adBadges: ['🤖 Atención automática 24/7'],
      adBorderColor: '#10b981',
    },
    {
      icon: Blocks,
      title: 'Automatización Inteligente de Procesos',
      description: 'Digitaliza y automatiza tareas repetitivas para optimizar tiempos, reducir errores y aumentar la productividad.',
      image: '/images/Automatización.png',
      adMessage: '¿Tu equipo pierde tiempo en tareas manuales repetitivas?',
      adDescription: 'Creamos flujos automatizados adaptados a tu empresa para gestionar procesos de manera más rápida, eficiente y organizada, reduciendo costos operativos.',
      adBadges: ['⚙️ Procesos más rápidos y eficientes'],
      adBorderColor: '#f59e0b',
    },
    {
      icon: CircuitBoard,
      title: 'Integración Inteligente de Sistemas',
      description: 'Conectamos tus plataformas empresariales para centralizar procesos, automatizar tareas y mejorar la comunicación.',
      image: '/images/Integración.png',
      adMessage: '¿Tu información está dispersa en diferentes plataformas?',
      adDescription: 'Integramos tus sistemas, aplicaciones y bases de datos para que trabajen en conjunto en tiempo real. Optimiza procesos, evita errores manuales y mejora la productividad de tu empresa.',
      adBadges: ['🔗 Integración en tiempo real'],
      adBorderColor: '#8b5cf6',
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
