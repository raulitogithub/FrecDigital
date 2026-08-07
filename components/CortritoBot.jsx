'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Anchor, Home, ArrowLeft, Phone, FileText, MapPin, CreditCard, Building2, Scale, BarChart2 } from 'lucide-react';

const GOLD = '#c9a227';
const NAVY = '#081539';

const FLOW = {
  welcome: {
    text: '⚓ ¡Bienvenido! Soy *CORTRITO*, tu asistente virtual de la Corporación de Tripulación de la Armada.\n\n¿En qué puedo ayudarte hoy?',
    buttons: [
      { icon: Building2, label: 'Nuestros Servicios', next: 'servicios' },
      { icon: Phone,     label: 'Hablar con un asesor', next: 'contacto' },
      { icon: FileText,  label: 'Plan Maestro',        next: 'plan' },
    ],
  },
  servicios: {
    text: '¿Qué servicio te interesa?',
    buttons: [
      { icon: Building2,  label: 'Alquiler de locales',      next: 'alquiler' },
      { icon: FileText,   label: 'Certificado no adeudar',   next: 'certificado' },
      { icon: MapPin,     label: 'Filiales',                 next: 'filiales' },
      { icon: CreditCard, label: 'Crédito de consumo',       next: 'credito' },
      { icon: ArrowLeft,  label: 'Volver',                   next: 'welcome' },
    ],
  },
  alquiler: {
    text: '🏛 *Alquiler de Locales*\n\n✓ Salones de eventos para socios y familiares\n✓ Áreas sociales, canchas y piscinas\n✓ Tarifas preferenciales para socios activos\n✓ Reservas en línea desde tu celular\n\n¿Te gustaría reservar un espacio?',
    buttons: [
      { icon: Phone,     label: 'Reservar ahora',  action: 'whatsapp' },
      { icon: ArrowLeft, label: 'Otros servicios', next: 'servicios' },
      { icon: Home,      label: 'Inicio',          next: 'welcome' },
    ],
  },
  certificado: {
    text: '📄 *Certificado de No Adeudar*\n\n✓ Trámite 100% en línea\n✓ Entrega en formato PDF\n✓ Sin filas ni desplazamientos\n✓ Requiere cédula del socio\n\nPara solicitarlo necesitamos validar tu identidad.',
    buttons: [
      { icon: Phone,     label: 'Solicitar por WA', action: 'whatsapp' },
      { icon: ArrowLeft, label: 'Otros servicios',  next: 'servicios' },
      { icon: Home,      label: 'Inicio',           next: 'welcome' },
    ],
  },
  filiales: {
    text: '📍 *Filiales CORTRIP*\n\n✓ Guayaquil (Sede Principal)\n✓ Quito\n✓ Manta\n✓ Esmeraldas\n✓ Galápagos\n\nCada filial cuenta con servicios exclusivos para socios activos.',
    buttons: [
      { icon: Phone,     label: 'Más información', action: 'whatsapp' },
      { icon: ArrowLeft, label: 'Otros servicios', next: 'servicios' },
      { icon: Home,      label: 'Inicio',          next: 'welcome' },
    ],
  },
  credito: {
    text: '💳 *Crédito de Consumo*\n\n✓ $50 en Víveres\n✓ $50 en Farmacias\n✓ $20 para Combustible\n✓ Activo por descuento de rol\n✓ Sin papeleos ni requisitos extra\n\n¿Quieres consultar tu saldo o realizar un pago?',
    buttons: [
      { icon: BarChart2,  label: 'Consultar saldo',   next: 'credito_saldo' },
      { icon: CreditCard, label: 'Realizar pago',     next: 'credito_pago' },
      { icon: ArrowLeft,  label: 'Otros servicios',   next: 'servicios' },
    ],
  },
  credito_saldo: {
    text: '📊 Para consultar tu *saldo de crédito de consumo*, necesitamos verificar tu identidad como socio.\n\nUn asesor CORTRITO te atenderá en línea.',
    buttons: [
      { icon: Phone,     label: 'Consultar por WA', action: 'whatsapp' },
      { icon: ArrowLeft, label: 'Volver',           next: 'credito' },
      { icon: Home,      label: 'Inicio',           next: 'welcome' },
    ],
  },
  credito_pago: {
    text: '💰 Para *realizar un pago de crédito* te conectaremos con un asesor que te guiará en el proceso de forma segura.',
    buttons: [
      { icon: Phone,     label: 'Pagar por WA',  action: 'whatsapp' },
      { icon: ArrowLeft, label: 'Volver',        next: 'credito' },
      { icon: Home,      label: 'Inicio',        next: 'welcome' },
    ],
  },
  contacto: {
    text: '📞 *Contacto Directo*\n\nUn asesor de la Corporación se pondrá en contacto contigo en breve.\n\n🕐 Lun – Vie: 08:00 a 17:00\n📱 WhatsApp disponible',
    buttons: [
      { icon: Phone,    label: 'Abrir WhatsApp', action: 'whatsapp' },
      { icon: Home,     label: 'Inicio',         next: 'welcome' },
    ],
  },
  plan: {
    text: '📋 *Plan Maestro "Horizonte 180"*\n\n5 pilares estratégicos para transformar la Corporación:\n\n1️⃣ Gobernanza Institucional\n2️⃣ Sostenibilidad Financiera\n3️⃣ Bienestar del Socio\n4️⃣ Operaciones e Infraestructura\n5️⃣ Innovación y Transformación Digital',
    buttons: [
      { icon: FileText,  label: 'Ver plan completo', action: 'plan-link' },
      { icon: Home,      label: 'Inicio',            next: 'welcome' },
    ],
  },
  asesoria: {
    text: '💼 *Asesorías disponibles*\n\n¿Qué tipo de asesoría te interesa?',
    buttons: [
      { icon: Scale,     label: 'Asesoría Legal',      next: 'asesoria_legal' },
      { icon: BarChart2, label: 'Asesoría Financiera', next: 'asesoria_financiera' },
      { icon: ArrowLeft, label: 'Volver',              next: 'welcome' },
    ],
  },
  asesoria_legal: {
    text: '⚖️ *Asesoría Legal*\n\nNuestro equipo legal te puede orientar en:\n✓ Estatutos y reglamentos\n✓ Derechos del socio\n✓ Procesos de impugnación\n✓ Defensa patrimonial\n\nUn asesor te contactará para coordinar la sesión.',
    buttons: [
      { icon: Phone,     label: 'Agendar por WA', action: 'whatsapp' },
      { icon: ArrowLeft, label: 'Volver',         next: 'asesoria' },
      { icon: Home,      label: 'Inicio',         next: 'welcome' },
    ],
  },
  asesoria_financiera: {
    text: '📊 *Asesoría Financiera*\n\nTe ayudamos a entender:\n✓ Estado financiero de la Corporación\n✓ Aportaciones y derechos\n✓ Plan de recuperación 180 días\n✓ Auditoría forense\n\nUn asesor te contactará para coordinar la sesión.',
    buttons: [
      { icon: Phone,     label: 'Agendar por WA', action: 'whatsapp' },
      { icon: ArrowLeft, label: 'Volver',         next: 'asesoria' },
      { icon: Home,      label: 'Inicio',         next: 'welcome' },
    ],
  },
};

const WHATSAPP_NUMBER = '34643466617';
const WHATSAPP_MSG = 'Hola, me comunico desde la página de CORTRIP y deseo más información.';

export default function CortritoBot() {
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
    if (button.action === 'whatsapp') {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`, '_blank');
      return;
    }
    if (button.action === 'plan-link') {
      window.location.href = '/cortrip/plan';
      return;
    }

    const nextStep = FLOW[button.next];
    if (!nextStep) return;

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

  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      const formatted = line.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Toggle button */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 60 }}>
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: GOLD, pointerEvents: 'none' }}
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              width: 56, height: 56, borderRadius: '50%',
              background: `linear-gradient(135deg, ${NAVY}, #0d2060)`,
              border: `2px solid ${GOLD}`,
              boxShadow: `0 4px 20px ${GOLD}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'transform 0.2s',
            }}
            aria-label="Abrir CORTRITO"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={26} color={GOLD} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Anchor size={26} color={GOLD} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', bottom: 96, right: 24, width: 340, height: 480, background: NAVY, borderRadius: 20, boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${GOLD}30`, display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 40 }}
          >
            {/* Header */}
            <div style={{ background: `linear-gradient(135deg, #0d2060, #0a1845)`, padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${GOLD}30` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: `radial-gradient(circle, #0d2060, ${NAVY})`, border: `2px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Anchor size={18} color={GOLD} />
                </div>
                <div>
                  <p style={{ color: GOLD, fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>CORTRITO</p>
                  <p style={{ color: '#6aed9b', fontSize: '0.65rem', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6aed9b', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                    En línea · CORTRIP
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: `${GOLD}80`, padding: 4 }} aria-label="Cerrar">
                <X size={18} color={GOLD} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: `linear-gradient(to bottom, ${NAVY}, #050e25)` }}>
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', gap: 6 }}>
                    {msg.type === 'bot' && (
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: `linear-gradient(135deg, #0d2060, ${NAVY})`, border: `1px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                        <Anchor size={11} color={GOLD} />
                      </div>
                    )}
                    <div style={{
                      maxWidth: '80%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: msg.type === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      fontSize: '0.75rem',
                      lineHeight: 1.6,
                      background: msg.type === 'user' ? `linear-gradient(135deg, #0d2060, #0a1845)` : '#0d1f4a',
                      color: msg.type === 'user' ? '#e8d5a0' : '#c8d8f0',
                      border: msg.type === 'user' ? `1px solid ${GOLD}40` : '1px solid #1a3060',
                    }}>
                      {formatText(msg.text)}
                    </div>
                  </div>

                  {msg.type === 'bot' && msg.buttons && (
                    <div style={{ marginTop: 8, marginLeft: 28, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {msg.buttons.map((btn, i) => {
                        const Icon = btn.icon;
                        return (
                          <button
                            key={i}
                            onClick={() => !msg.buttonsDisabled && handleButton(btn)}
                            disabled={msg.buttonsDisabled}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 5,
                              fontSize: '0.7rem', padding: '0.35rem 0.7rem',
                              borderRadius: 999, cursor: msg.buttonsDisabled ? 'default' : 'pointer',
                              border: `1px solid ${msg.buttonsDisabled ? '#1a2a50' : GOLD + '70'}`,
                              background: msg.buttonsDisabled ? 'transparent' : `${GOLD}10`,
                              color: msg.buttonsDisabled ? '#2a3a60' : GOLD,
                              transition: 'all 0.2s',
                            }}
                          >
                            {Icon && <Icon size={11} />}
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

            {/* Footer */}
            <div style={{ padding: '0.5rem 1rem', background: '#050e25', borderTop: `1px solid ${GOLD}15`, textAlign: 'center' }}>
              <p style={{ fontSize: '0.6rem', color: '#3a4a6a', margin: 0 }}>
                CORTRITO · Asistente virtual CORTRIP
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
