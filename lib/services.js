// Fuente única de los servicios de FrecDigital.
// La usan la sección de servicios, el footer, el formulario de contacto,
// los datos estructurados (JSON-LD), las preguntas frecuentes y /llms.txt.
import {
  MessageSquareMore,
  ScanLine,
  Workflow,
  ShieldCheck,
} from 'lucide-react';

export const services = [
  {
    slug: 'asistentes-ia',
    shortTitle: 'Asistentes de IA', // botones del chatbot
    title: 'Asistentes de IA Transaccionales',
    shortDescription:
      'Por WhatsApp o web, identifican al cliente y hacen gestiones con sus datos: consultar, agendar citas, pagar o tramitar.',
    question: '¿Tus clientes escriben para cosas que podrían resolver solos?',
    detail:
      'El asistente reconoce a cada cliente, consulta su información y completa la gestión en el momento: saldos, citas, reservas, pagos o trámites. Agenda sobre tu calendario y envía recordatorios para reducir ausencias. Más allá de responder preguntas frecuentes.',
    tags: ['Gestiones con datos reales', 'Citas y recordatorios', 'WhatsApp y web'],
    image: '/images/asistentes-ia.webp',
    icon: MessageSquareMore,
    accentColor: '#10b981',
  },
  {
    slug: 'vision-artificial',
    shortTitle: 'Visión artificial', // botones del chatbot
    title: 'Visión Artificial Industrial',
    badge: 'Nuevo',
    shortDescription:
      'Cámaras que inspeccionan, leen y cuentan: control de calidad, lectura de códigos y etiquetas, verificación de expediciones y seguridad en planta.',
    question: '¿Tu equipo revisa a ojo lo que una cámara podría verificar sola?',
    detail:
      'Analizamos fotos y vídeo de tu proceso para detectar defectos, leer códigos, lotes o etiquetas, contar piezas y palés o verificar expediciones —como los números de contenedor y precinto— y avisar al momento si algo no cuadra.',
    tags: ['Control de calidad', 'Lectura de códigos y OCR', 'Funciona en local'],
    image: '/images/vision-ia.webp',
    icon: ScanLine,
    accentColor: '#f97316',
  },
  {
    // Unifica automatización de procesos, integración de sistemas e IA sobre ERP
    slug: 'automatizacion-integracion',
    shortTitle: 'Automatización e integración', // botones del chatbot
    title: 'Automatización e Integración de Sistemas',
    shortDescription:
      'Procesos automáticos y sistemas conectados: ERP, CRM, WhatsApp y pagos, con agentes de IA sobre Dynamics 365 y ERP a medida en .NET.',
    question: '¿Tus datos viajan a mano entre Excel, correo y sistemas que no se hablan?',
    detail:
      'Convertimos nóminas, facturas, informes o pedidos en flujos automáticos y trazables, conectamos tus sistemas en tiempo real y creamos agentes que consultan el ERP y preparan acciones, siempre con aprobación humana.',
    tags: ['Flujos automáticos', 'Integración en tiempo real', 'Especialidad Dynamics 365'],
    image: '/images/Integración.webp',
    icon: Workflow,
    accentColor: '#8b5cf6',
  },
  {
    slug: 'gobernanza-ia',
    shortTitle: 'Gobernanza de IA', // botones del chatbot
    title: 'Gobernanza y Adopción de IA',
    badge: 'Nuevo',
    shortDescription:
      'Políticas de uso, formación de equipos, Copilot y preparación para el Reglamento Europeo de IA.',
    question: '¿Tu equipo ya usa IA sin reglas claras?',
    detail:
      'Definimos qué herramientas usar y cómo, formamos al equipo y desplegamos Copilot en Microsoft 365 y Dynamics 365 de forma segura, para aprovechar la IA sin riesgos legales ni de datos.',
    tags: ['Microsoft 365 Copilot', 'Copilot en Dynamics 365', 'AI Act'],
    image: '/images/gobernanza.webp',
    icon: ShieldCheck,
    accentColor: '#22c55e',
  },
];

/** Une una lista en español: "a, b y c" (usa "e" ante palabras que suenan a "i"). */
export function joinEs(items) {
  if (items.length <= 1) return items.join('');
  const last = items[items.length - 1];
  const conj = /^h?i(?![aeiouáéíóú])/i.test(last) ? 'e' : 'y';
  return `${items.slice(0, -1).join(', ')} ${conj} ${last}`;
}
