'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Wrench, DollarSign, Phone, CalendarDays, ArrowLeft,
  Home, ClipboardList, BadgeDollarSign, ExternalLink
} from 'lucide-react';
import { company } from '@/lib/seo-metadata';
import { services } from '@/lib/services';

// Un paso del flujo por servicio, generado desde lib/services.js
const SERVICE_STEPS = Object.fromEntries(
  services.map((s) => [
    s.slug,
    {
      text: `${s.title}${s.badge ? ` (${s.badge.toLowerCase()})` : ''}\n\n${s.question}\n${s.detail}\n\n${s.tags.map((t) => `✓ ${t}`).join('\n')}`,
      buttons: [
        { icon: BadgeDollarSign, label: 'Quiero cotizar',  next: 'cotizar' },
        { icon: ExternalLink,    label: 'Más información', action: 'navigate', target: `/servicios/${s.slug}` },
        { icon: ArrowLeft,       label: 'Otros servicios', next: 'servicios' },
      ],
    },
  ])
);

const FLOW = {
  welcome: {
    text: '¡Hola! Soy FrecBot, asistente de FrecDigital. ¿En qué te puedo ayudar?',
    buttons: [
      { icon: Wrench,        label: 'Ver servicios',    next: 'servicios' },
      { icon: DollarSign,    label: 'Precios',          next: 'precios' },
      { icon: Phone,         label: 'Contactar',        next: 'contacto' },
      { icon: CalendarDays,  label: 'Agendar consulta', next: 'agendar' },
    ],
  },
  servicios: {
    text: 'Ofrecemos estas soluciones con IA. ¿Cuál te interesa?',
    buttons: services.map((s) => ({ icon: s.icon, label: s.shortTitle, next: s.slug })),
  },
  ...SERVICE_STEPS,
  precios: {
    text: 'Nuestros precios son personalizados según tu proyecto. Un asesor te dará una cotización adaptada a tu negocio.',
    buttons: [
      { icon: Phone,  label: 'Hablar con un asesor', next: 'contacto' },
      { icon: Home,   label: 'Inicio',               next: 'welcome' },
    ],
  },
  contacto: {
    text: `Puedes contactarnos en:\n✉ ${company.email}\n\nO déjanos tu consulta en el formulario y te respondemos en menos de 24 horas en días laborables.`,
    buttons: [
      { icon: ClipboardList, label: 'Ir al formulario', action: 'scroll-contact' },
      { icon: Home,          label: 'Inicio',           next: 'welcome' },
    ],
  },
  agendar: {
    text: '¡Perfecto! Completa el formulario y un asesor se pondrá en contacto contigo en menos de 24 horas en días laborables.',
    buttons: [
      { icon: ClipboardList, label: 'Ir al formulario', action: 'scroll-contact' },
      { icon: Home,          label: 'Inicio',           next: 'welcome' },
    ],
  },
  cotizar: {
    text: '¡Excelente decisión! Completa el formulario y nuestro equipo preparará una cotización personalizada para ti.',
    buttons: [
      { icon: ClipboardList, label: 'Ir al formulario', action: 'scroll-contact' },
      { icon: Home,          label: 'Inicio',           next: 'welcome' },
    ],
  },
};

export default function FrecBot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setMessages([{
        id: 1,
        type: 'bot',
        text: FLOW.welcome.text,
        buttons: FLOW.welcome.buttons,
        timestamp: new Date(),
      }]);
      setHasOpened(true);
    }
  }, [isOpen, hasOpened]);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleButton = (button) => {
    // Abre la página del servicio
    if (button.action === 'navigate') {
      router.push(button.target);
      setIsOpen(false);
      return;
    }

    if (button.action === 'scroll-contact' || button.action === 'scroll') {
      const target = button.action === 'scroll' ? button.target : '#contact';
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = `/${target}`; // p. ej. desde las páginas legales
      }
      setIsOpen(false);
      return;
    }

    const nextStep = FLOW[button.next];
    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: button.label,
      timestamp: new Date(),
    };
    const botMsg = {
      id: Date.now() + 1,
      type: 'bot',
      text: nextStep.text,
      buttons: nextStep.buttons,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const updated = prev.map((msg, i) =>
        i === prev.length - 1 && msg.type === 'bot'
          ? { ...msg, buttonsDisabled: true }
          : msg
      );
      return [...updated, userMsg, botMsg];
    });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-20" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 hover:scale-110 transition-transform overflow-hidden border-2 border-cyan-600"
            aria-label="Abrir chat"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={28} color="#fff" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="w-full h-full flex items-center justify-center">
                  <Image src="/images/avatar1.webp" alt="FrecBot" width={56} height={56} className="w-full h-full object-cover rounded-full" loading="eager" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[460px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden z-40"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/images/avatar1.webp" alt="FrecBot" width={36} height={36} className="rounded-full object-cover border-2 border-cyan-300" />
                <div>
                  <h2 className="text-white font-semibold text-sm">FrecBot</h2>
                  <p className="text-xs text-green-300 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    En línea
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white transition-colors" aria-label="Cerrar chat">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-slate-900 to-slate-950">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <div className={`flex gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type === 'bot' && (
                      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mt-1">
                        <Image src="/images/avatar1.webp" alt="FrecBot" width={24} height={24} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={`max-w-[80%] px-3 py-2 rounded-lg text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.type === 'user'
                        ? 'bg-[#1a3a6b] text-white rounded-br-none shadow-md border border-[#00b4d8]/30'
                        : 'bg-slate-800 text-gray-200 rounded-bl-none border border-slate-700'
                    }`}>
                      {msg.text}
                    </div>
                  </div>

                  {msg.type === 'bot' && msg.buttons && (
                    <div className="mt-2 ml-8 flex flex-wrap gap-2">
                      {msg.buttons.map((btn, i) => {
                        const Icon = btn.icon;
                        return (
                          <button
                            key={i}
                            onClick={() => !msg.buttonsDisabled && handleButton(btn)}
                            disabled={msg.buttonsDisabled}
                            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                              msg.buttonsDisabled
                                ? 'border-slate-700 text-slate-600 cursor-default'
                                : 'border-cyan-500/60 text-cyan-400 hover:bg-cyan-500 hover:text-white hover:border-cyan-500'
                            }`}
                          >
                            {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
                            {btn.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
