'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Share2, Heart, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Logo from './Logo';

export default function Footer() { 
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Share2, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Heart, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FaWhatsapp, href: 'https://wa.me/34643466617?text=Estimado%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.%20Gracias.', label: 'WhatsApp' },
    { icon: Mail, href: 'mailto:fespinoza@frecdigital.com?subject=Información%20sobre%20servicios&body=Hola,%20buen%20día.%20Me%20gustaría%20conocer%20más%20sobre%20sus%20servicios.%20Quedo%20atento.%20Gracias.', label: 'Email' },
  ];
  const footerLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Servicios', href: '#services' },
    { label: 'Nosotros', href: '#why-us' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent" />

      {/* Fondo con imagen local */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/fondo4.webp)',
        }}
      />
      
      {/* Overlay oscuro y elegante */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/90 via-[#0a1628]/85 to-[#050d1a]/95" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 dot-pattern-dark opacity-15" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00b4d8]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1a3a6b]/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16 border-b border-white/8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo className="w-10 h-10" />
              <span className="font-bold text-xl font-display">FrecDigital</span>
            </Link>
            <div className="w-12 h-px bg-[#00b4d8] mt-4 mb-4" />
            <p className="text-white/55 text-sm leading-relaxed">
              Transformamos negocios con soluciones de inteligencia artificial personalizadas y de clase mundial.
            </p>
            <span className="inline-block mt-4 bg-[#00b4d8]/10 border border-[#00b4d8]/25 text-[#00b4d8] text-xs px-3 py-1 rounded-full">
              Revolución Digital
            </span>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <h4 className="font-bold text-lg mb-4 font-display text-[#00b4d8]">Enlaces Rápidos</h4>
            <div className="w-8 h-px bg-[#00b4d8]/50 mb-4" />
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label} className="group">
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-[#00b4d8] transition-colors duration-300 hover:translate-x-2 inline-flex items-center gap-2"
                  >
                    <span className="text-[#00b4d8] opacity-0 group-hover:opacity-100 transition-all duration-300">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <h4 className="font-bold text-lg mb-4 font-display text-[#00b4d8]">Servicios</h4>
            <div className="w-8 h-px bg-[#00b4d8]/50 mb-4" />
            <ul className="space-y-3 text-sm">
              {[
                'Asistentes de IA Especializados',
                'Agendamiento Inteligente',
                'Automatización Inteligente de Procesos',
                'Consultas Gerenciales IA',
                'Integración Inteligente de Sistemas',
              ].map((service) => (
                <li key={service} className="group">
                  <Link href="#services" className="text-white/55 hover:text-[#00b4d8] transition-colors duration-300 hover:translate-x-2 inline-flex items-center gap-2">
                    <span className="text-[#00b4d8] opacity-0 group-hover:opacity-100 transition-all duration-300">›</span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <h4 className="font-bold text-lg mb-4 font-display text-[#00b4d8]">Síguenos</h4>
            <div className="w-8 h-px bg-[#00b4d8]/50 mb-4" />
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-full flex items-center gap-3 px-3 py-2.5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#00b4d8]/50 hover:bg-[#00b4d8]/10 transition-all duration-300 group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <social.icon className="text-white/60 group-hover:text-[#00b4d8] transition-colors duration-300" size={18} />
                  <span className="text-white/50 text-xs group-hover:text-white/80 transition-colors duration-300">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="py-8 px-6 bg-black/20 backdrop-blur-sm rounded-xl flex flex-col md:flex-row justify-between items-center text-white/40 text-xs gap-4"
        >
          <p className="flex items-center gap-2">
            © {currentYear} FrecDigital · Todos los derechos reservados
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/40 hover:text-[#00b4d8] transition-colors duration-300">
              Privacidad
            </Link>
            <Link href="#" className="text-white/40 hover:text-[#00b4d8] transition-colors duration-300">
              Términos
            </Link>
            <Link href="#" className="text-white/40 hover:text-[#00b4d8] transition-colors duration-300">
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
