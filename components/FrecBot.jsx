'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const FLOW = {
  welcome: {
    text: '¡Hola! Soy FrecBot, asistente de FrecDigital. ¿En qué te puedo ayudar?',
    buttons: [
      { label: '🛠 Ver servicios', next: 'servicios' },
      { label: '💰 Precios', next: 'precios' },
      { label: '📞 Contactar', next: 'contacto' },
      { label: '📅 Agendar consulta', next: 'agendar' },
    ],
  },
  servicios: {
    text: 'Ofrecemos estas soluciones con IA. ¿Cuál te interesa?',
    buttons: [
      { label: '🤖 Chatbots Inteligentes', next: 'chatbots' },
      { label: '⚙️ Automatización', next: 'automatizacion' },
      { label: '🔗 Integración de Sistemas', next: 'integracion' },
      { label: '📅 Agendamiento', next: 'agendamiento' },
      { label: '📊 Consultas Gerenciales', next: 'consultas' },
    ],
  },
  chatbots: {
    text: 'Nuestros Chatbots Inteligentes:\n✓ Atienden clientes 24/7\n✓ WhatsApp, Instagram, Facebook y web\n✓ Califican leads automáticamente\n✓ Responden preguntas frecuentes',
    buttons: [
      { label: '💰 Quiero cotizar', next: 'cotizar' },
      { label: '← Otros servicios', next: 'servicios' },
    ],
  },
  automatizacion: {
    text: 'Automatización de Procesos:\n✓ Elimina tareas repetitivas\n✓ Envío automático de correos\n✓ Generación de reportes\n✓ Gestión de bases de datos',
    buttons: [
      { label: '💰 Quiero cotizar', next: 'cotizar' },
      { label: '← Otros servicios', next: 'servicios' },
    ],
  },
  integracion: {
    text: 'Integración de Sistemas con IA:\n✓ Conecta CRM, ERP y apps\n✓ Datos centralizados en tiempo real\n✓ Elimina errores manuales',
    buttons: [
      { label: '💰 Quiero cotizar', next: 'cotizar' },
      { label: '← Otros servicios', next: 'servicios' },
    ],
  },
  agendamiento: {
    text: 'Agendamiento Inteligente:\n✓ Chatbot agenda citas automáticamente\n✓ Confirmaciones y recordatorios\n✓ Disponibilidad en tiempo real 24/7',
    buttons: [
      { label: '💰 Quiero cotizar', next: 'cotizar' },
      { label: '← Otros servicios', next: 'servicios' },
    ],
  },
  consultas: {
    text: 'Consultas Gerenciales con IA:\n✓ Pregunta tus datos en lenguaje natural\n✓ Reportes automáticos al instante\n✓ Análisis de ventas por período',
    buttons: [
      { label: '💰 Quiero cotizar', next: 'cotizar' },
      { label: '← Otros servicios', next: 'servicios' },
    ],
  },
  precios: {
    text: 'Nuestros precios son personalizados según tu proyecto. Un asesor te dará una cotización adaptada a tu negocio.',
    buttons: [
      { label: '📞 Hablar con un asesor', next: 'contacto' },
      { label: '🏠 Inicio', next: 'welcome' },
    ],
  },
  contacto: {
    text: 'Puedes contactarnos en:\n📧 fespinoza@frecdigital.com\n🕐 Lun - Vie, 08:00 a 16:00 (Ecuador)',
    buttons: [
      { label: '📝 Ir al formulario', action: 'scroll-contact' },
      { label: '🏠 Inicio', next: 'welcome' },
    ],
  },
  agendar: {
    text: '¡Perfecto! Completa el formulario y un asesor se pondrá en contacto contigo en menos de 24 horas.',
    buttons: [
      { label: '📝 Ir al formulario', action: 'scroll-contact' },
      { label: '🏠 Inicio', next: 'welcome' },
    ],
  },
  cotizar: {
    text: '¡Excelente decisión! Completa el formulario y nuestro equipo preparará una cotización personalizada para ti.',
    buttons: [
      { label: '📝 Ir al formulario', action: 'scroll-contact' },
      { label: '🏠 Inicio', next: 'welcome' },
    ],
  },
};

export default function FrecBot() {
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleButton = (button) => {
    if (button.action === 'scroll-contact') {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
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
                  <Image src="/images/avatar1.webp" alt="FrecBot" width={56} height={56} className="w-full h-full object-cover rounded-full" />
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
                      {msg.buttons.map((btn, i) => (
                        <button
                          key={i}
                          onClick={() => !msg.buttonsDisabled && handleButton(btn)}
                          disabled={msg.buttonsDisabled}
                          className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                            msg.buttonsDisabled
                              ? 'border-slate-700 text-slate-600 cursor-default'
                              : 'border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white'
                          }`}
                        >
                          {btn.label}
                        </button>
                      ))}
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
