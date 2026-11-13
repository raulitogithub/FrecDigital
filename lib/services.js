// Fuente única de los servicios de FrecDigital.
// La usan la sección de servicios, el footer, el formulario de contacto,
// los datos estructurados (JSON-LD), las preguntas frecuentes y /llms.txt.
import {
  MessageSquareMore,
  Calendar,
  ScanLine,
  Blocks,
  BarChart3,
  CircuitBoard,
  ShieldCheck,
} from 'lucide-react';

export const services = [
  {
    slug: 'asistentes-ia',
    shortTitle: 'Asistentes de IA', // botones del chatbot
    title: 'Asistentes de IA Transaccionales',
    shortDescription:
      'Por WhatsApp o web, identifican al cliente y hacen gestiones con sus datos: consultar, reservar, pagar o tramitar.',
    question: '¿Tus clientes escriben para cosas que podrían resolver solos?',
    detail:
      'El asistente reconoce a cada cliente, consulta su información y completa la gestión en el momento: saldos, reservas, pagos o trámites. Más allá de responder preguntas frecuentes.',
    tags: ['Gestiones con datos reales', 'WhatsApp y web'],
    image: '/images/Chatbots.webp',
    icon: MessageSquareMore,
    accentColor: '#10b981',
  },
  {
    slug: 'agendamiento-inteligente',
    shortTitle: 'Agendamiento', // botones del chatbot
    title: 'Agendamiento Inteligente',
    shortDescription:
      'Automatiza tus reservas con un asistente virtual que agenda, confirma y recuerda citas sin intervención humana.',
    question: '¿Cansado de gestionar citas manualmente?',
    detail:
      'El asistente atiende a cualquier hora, se sincroniza con tu calendario y envía recordatorios automáticos para reducir ausencias.',
    tags: ['Reservas a cualquier hora', 'Recordatorios'],
    image: '/images/agendamiento.webp',
    icon: Calendar,
    accentColor: '#06b6d4',
  },
  {
    slug: 'vision-artificial',
    shortTitle: 'Visión artificial', // botones del chatbot
    title: 'Visión Artificial Industrial',
    badge: 'Nuevo',
    shortDescription:
      'Lectura automática de números de contenedor y precinto, y análisis de vídeo de la carga de palés.',
    question: '¿Se puso el precinto correcto en el contenedor?',
    detail:
      'El sistema encuentra en las fotos de cada expedición el contenedor y el precinto, lee los números y los compara con los registrados. Si no cuadran, avisa antes de que salga el camión.',
    tags: ['OCR en local', 'Verificación automática'],
    image: '/images/vision.webp', // marcador provisional
    icon: ScanLine,
    accentColor: '#f97316',
  },
  {
    slug: 'automatizacion-procesos',
    shortTitle: 'Automatización', // botones del chatbot
    title: 'Automatización Inteligente de Procesos',
    shortDescription:
      'Digitaliza y automatiza tareas repetitivas para optimizar tiempos, reducir errores y aumentar la productividad.',
    question: '¿Tu equipo pierde tiempo en tareas manuales repetitivas?',
    detail:
      'Nóminas, facturas, informes o pedidos que hoy se hacen con Excel y correo, convertidos en flujos automáticos, rápidos y trazables.',
    tags: ['Procesos más rápidos y eficientes'],
    image: '/images/Automatización.webp',
    icon: Blocks,
    accentColor: '#f59e0b',
  },
  {
    slug: 'ia-erp-crm',
    shortTitle: 'IA sobre ERP', // botones del chatbot
    title: 'Consultas Gerenciales e IA sobre ERP',
    shortDescription:
      'Pregunta por ventas, stock o clientes en lenguaje natural desde Teams o WhatsApp. Especialidad en Dynamics 365.',
    question: 'Tus datos hablan, ¿los estás escuchando?',
    detail:
      'Pregunta "¿cuáles fueron mis ventas de enero y febrero?" y obtén el informe al instante. Los agentes también preparan acciones en el ERP, siempre con aprobación humana.',
    tags: ['Ventas del último mes', 'Stock en tiempo real', 'Agentes en Teams'],
    image: '/images/gerencial.webp',
    icon: BarChart3,
    accentColor: '#818cf8',
  },
  {
    slug: 'integracion-sistemas',
    shortTitle: 'Integración de sistemas', // botones del chatbot
    title: 'Integración Inteligente de Sistemas',
    shortDescription:
      'Conectamos tus plataformas empresariales para centralizar procesos, automatizar tareas y mejorar la comunicación.',
    question: '¿Tu información está dispersa en diferentes plataformas?',
    detail:
      'Integramos ERP, CRM, WhatsApp, pasarelas de pago y bases de datos para que trabajen juntos en tiempo real y sin errores manuales.',
    tags: ['Integración en tiempo real'],
    image: '/images/Integración.webp',
    icon: CircuitBoard,
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
      'Definimos qué herramientas usar y cómo, formamos al equipo y desplegamos Copilot de forma segura, para aprovechar la IA sin riesgos legales ni de datos.',
    tags: ['Microsoft 365 Copilot', 'AI Act'],
    image: '/images/gobernanza.webp', // marcador provisional
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
