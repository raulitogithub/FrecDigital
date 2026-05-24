'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Clock, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Button from './ui/Button';
import { handleContactForm } from "@/app/actions/lib-email";
// Validation Schema
const contactFormSchema = z.object({
  fullName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un email válido'),
  company: z.string().optional(),
  service: z.string().min(1, 'Por favor selecciona un servicio'),
  message: z
    .string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
});

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | loading | success | error
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  const services = [
    'Asistentes de IA Especializados',
    'Agendamiento Inteligente',
    'Automatización Inteligente de Procesos',
    'Consultas Gerenciales IA',
    'Integración Inteligente de Sistemas',
    'Otros',
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'fespinoza@frecdigital.com' },
    //{ icon: Phone, label: 'Teléfono', value: '+1 (555) 123-4567' },
    //{ icon: MapPin, label: 'Ubicación', value: 'Ecuador, EC' },
    { icon: Clock, label: 'Horario', value: 'Lun - Vie, 08:00 a 16:00' },
  ];
  
  const onSubmit = async (data) => {
  setSubmitStatus('loading');
  try {
    const result = await handleContactForm(data);
    if (result.success) {
      setSubmitStatus('success');
      setSubmitMessage('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
      reset();
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    } else {
      setSubmitStatus('error');
      setSubmitMessage('Ocurrió un error al enviar. Por favor intenta de nuevo.');
    }
  } catch (error) {
    setSubmitStatus('error');
    setSubmitMessage('Ocurrió un error al enviar. Por favor intenta de nuevo.');
  }
};


  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent" />

      {/* Fondo con imagen local */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/fondo7.webp)',
        }}
      />
      
      {/* Overlay oscuro cálido */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#1a3a6b]/70 to-[#0a1628]/80" />
      <div className="absolute inset-0 dot-pattern-dark opacity-15" />

      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b4d8]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00b4d8]/10 rounded-full blur-3xl" />

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
              Hablemos de tu proyecto
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            ¿Listo para impulsar tu negocio con <span className="text-[#00b4d8]">IA</span>?
          </h2>

          {/* Línea decorativa */}
          <div className="w-16 h-1 bg-[#00b4d8] rounded-full mx-auto mt-4 mb-6" />

          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Completa el formulario y nuestro equipo se pondrá en contacto contigo pronto
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Nombre completo *
                </label>
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-lg border-2 border-white/15 focus:border-[#00b4d8] focus:outline-none transition-all bg-white/8 backdrop-blur-md text-white placeholder-white/30 focus:bg-white/12 focus:shadow-lg focus:shadow-[#00b4d8]/20"
                />
                {errors.fullName && (
                  <p className="text-red-300 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Correo electrónico *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-lg border-2 border-white/15 focus:border-[#00b4d8] focus:outline-none transition-all bg-white/8 backdrop-blur-md text-white placeholder-white/30 focus:bg-white/12 focus:shadow-lg focus:shadow-[#00b4d8]/20"
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Empresa / Organización
                </label>
                <input
                  {...register('company')}
                  type="text"
                  placeholder="Tu empresa"
                  className="w-full px-4 py-3 rounded-lg border-2 border-white/15 focus:border-[#00b4d8] focus:outline-none transition-all bg-white/8 backdrop-blur-md text-white placeholder-white/30 focus:bg-white/12 focus:shadow-lg focus:shadow-[#00b4d8]/20"
                />
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Servicio de interés *
                </label>
                <div className="relative">
                  <select
                    {...register('service')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-white/15 focus:border-[#00b4d8] focus:outline-none transition-all bg-white/8 backdrop-blur-md text-white placeholder-white/30 focus:bg-white/12 focus:shadow-lg focus:shadow-[#00b4d8]/20 appearance-none pr-10"
                  >
                    <option value="" className="bg-[#0a1628] text-white">Selecciona un servicio</option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-[#0a1628] text-white">
                        {service}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.service && (
                  <p className="text-red-300 text-sm mt-1">{errors.service.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Mensaje / Descripción del proyecto *
                </label>
                <textarea
                  {...register('message')}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border-2 border-white/15 focus:border-[#00b4d8] focus:outline-none transition-all resize-none bg-white/8 backdrop-blur-md text-white placeholder-white/30 focus:bg-white/12 focus:shadow-lg focus:shadow-[#00b4d8]/20"
                />
                {errors.message && (
                  <p className="text-red-300 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start gap-3 shadow-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-green-800">{submitMessage}</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3 shadow-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800">{submitMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  variant="accent"
                  size="lg"
                  className="w-full justify-center gap-2 font-semibold shadow-lg shadow-[#00b4d8]/30"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Consulta
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">
                Información de Contacto
              </h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Nos encantaría escuchar sobre tu proyecto y cómo podemos ayudarte a alcanzar tus objetivos con IA.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, ease: 'easeOut' }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/8 backdrop-blur-md border border-white/15 hover:border-[#00b4d8]/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1a3a6b] to-[#0f2847] rounded-lg flex items-center justify-center flex-shrink-0 text-white border border-[#00b4d8]/30">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-[#00b4d8] font-semibold uppercase tracking-wide">
                      {info.label}
                    </p>
                    <p className="text-white font-semibold text-base">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="relative pt-8">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00b4d8] via-[#00b4d8]/50 to-transparent"></div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ease: 'easeOut' }}
                className="bg-white/8 backdrop-blur-md rounded-xl p-6 border border-[#00b4d8]/25 hover:border-[#00b4d8]/50 transition-all duration-300 flex items-start gap-3"
              >
                <Clock className="w-5 h-5 text-[#00b4d8] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold mb-1 font-display">
                    Respuesta rápida garantizada
                  </p>
                  <p className="text-white/60 text-sm">
                    Nuestro equipo se pondrá en contacto contigo en menos de 24 horas.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
