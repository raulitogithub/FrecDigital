'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Servicios', href: '#services' },
    { label: 'Nosotros', href: '#why-us' },
    { label: 'Contacto', href: '#contact' },
  ];

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
      const element = document.querySelector(link.href);
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
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-sm font-medium transition-all duration-300 group ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#00b4d8]'
                    : 'text-[#1a3a6b]/70 hover:text-[#00b4d8]'
                }`}
              >
                {link.label}
                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00b4d8] to-cyan-300 transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button with Pulse Indicator */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
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
                    activeSection === link.href.slice(1)
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
                  const contactSection = document.querySelector('#contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
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
