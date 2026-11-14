'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { services } from '@/lib/services';

// Rutas absolutas ("/#…") para que el menú funcione desde cualquier página.
// "Servicios" lleva a /servicios (con submenú en escritorio); `section` es la
// sección de la home que lo marca como activo al hacer scroll.
const navLinks = [
  { label: 'Inicio', href: '/#hero', section: 'hero' },
  { label: 'Servicios', href: '/servicios', section: 'services', hasSubmenu: true },
  { label: 'Nosotros', href: '/#why-us', section: 'why-us' },
  { label: 'Proyectos', href: '/#proyectos', section: 'proyectos' },
  { label: 'Contacto', href: '/#contact', section: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();

  // En la home manda la sección visible; en /servicios… se marca "Servicios".
  const isActive = (link) => {
    if (link.hasSubmenu && pathname?.startsWith('/servicios')) return true;
    return pathname === '/' && activeSection === link.section;
  };

  // En la home baja al formulario; en otras páginas navega a /#contact
  const goToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.section);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 h-16 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-[#00b4d8]/30 shadow-lg shadow-[#1a3a6b]/8'
          : 'bg-white border-b border-[#e8f4fc]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Logo className="w-8 h-8" />
            <span className="font-bold text-lg hidden sm:inline">
              <span className="text-[#1a3a6b]">Frec</span>
              <span className="text-[#00b4d8] group-hover:drop-shadow-[0_0_8px_rgb(0,180,216)] transition-all duration-300">
                Digital
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const linkEl = (
                <Link
                  href={link.href}
                  className={`relative inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 group ${
                    isActive(link) ? 'text-[#00b4d8]' : 'text-[#1a3a6b]/70 hover:text-[#00b4d8]'
                  }`}
                >
                  {link.label}
                  {link.hasSubmenu && (
                    <ChevronDown aria-hidden="true" size={14} className="transition-transform duration-200 group-hover/menu:rotate-180" />
                  )}
                  {/* Animated underline */}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-[#00b4d8] to-cyan-300 transition-all duration-300 ${
                      isActive(link) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );

              if (!link.hasSubmenu) return <div key={link.label}>{linkEl}</div>;

              // Submenú de servicios: se abre al pasar el ratón o al llegar con el teclado (Tab)
              return (
                <div key={link.label} className="relative group/menu">
                  {linkEl}
                  <div className="invisible opacity-0 translate-y-1 group-hover/menu:visible group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-focus-within/menu:visible group-focus-within/menu:opacity-100 group-focus-within/menu:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-4 w-80">
                    <ul className="rounded-2xl border border-[#e8f4fc] bg-white p-2 shadow-xl shadow-[#1a3a6b]/10">
                      {services.map((s) => {
                        const Icon = s.icon;
                        return (
                          <li key={s.slug}>
                            <Link
                              href={`/servicios/${s.slug}`}
                              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                                pathname === `/servicios/${s.slug}`
                                  ? 'bg-[#e8f4fc] text-[#00b4d8] font-semibold'
                                  : 'text-[#1a3a6b] hover:bg-[#f0f9ff] hover:text-[#00b4d8]'
                              }`}
                            >
                              <Icon aria-hidden="true" className="w-4 h-4 flex-shrink-0 text-[#00b4d8]" />
                              <span className="flex-1">{s.title}</span>
                              {s.badge && (
                                <span className="px-1.5 py-0.5 rounded-full bg-[#00b4d8] text-white text-[10px] font-bold uppercase">
                                  {s.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                      <li className="mt-1 border-t border-[#e8f4fc] pt-1">
                        <Link
                          href="/servicios"
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-[#0284a8] hover:bg-[#f0f9ff]"
                        >
                          Ver todos los servicios
                          <ArrowRight aria-hidden="true" size={16} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Button with Pulse Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={goToContact}
              className="px-5 py-2 rounded-full bg-[#00b4d8] text-white font-medium text-sm border border-[#00b4d8] hover:bg-[#0090b0] hover:shadow-lg hover:shadow-[#00b4d8]/25 transition-all duration-300 flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Comenzar ahora
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#1a3a6b] hover:text-[#00b4d8] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="md:hidden absolute top-16 left-0 right-0 bg-white border border-[#e8f4fc] rounded-b-2xl shadow-xl shadow-[#1a3a6b]/10 mx-4 mb-2"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, ease: 'easeOut' }}
              >
                <Link
                  href={link.href}
                  className={`block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                    isActive(link)
                      ? 'text-[#00b4d8] bg-[#e8f4fc] font-semibold'
                      : 'text-[#1a3a6b]/70 hover:text-[#00b4d8] hover:bg-[#f0f9ff]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#00b4d8]/30 to-transparent my-3" />

            {/* Mobile CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: 'easeOut' }}
              className="pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={() => {
                  setIsMenuOpen(false);
                  goToContact();
                }}
                className="w-full px-5 py-3 rounded-full bg-[#00b4d8] text-white font-medium text-base border border-[#00b4d8] hover:bg-[#0090b0] hover:shadow-lg hover:shadow-[#00b4d8]/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Comenzar ahora
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
