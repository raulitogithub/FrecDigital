// FrecBot Local - Respuestas basadas en palabras clave
// No requiere API externa, funciona completamente local.
// Los servicios salen de lib/services.js y los datos de contacto de lib/seo-metadata.js.

import { company } from '@/lib/seo-metadata';
import { services } from '@/lib/services';

// Palabras clave de cada servicio. Coinciden por inicio de palabra y sin tildes:
// 'agenda' encaja con "agendar" o "agendamiento", pero 'cita' no con "necesita".
const SERVICE_KEYWORDS = {
  // Incluye las citas y reservas (el agendamiento forma parte de los asistentes)
  'asistentes-ia': ['chatbot', 'asistente', 'whatsapp', 'atencion al cliente', 'pago', 'tramite', 'agenda', 'cita', 'reserva', 'recordatorio', 'calendario'],
  'vision-artificial': ['vision', 'camara', 'calidad', 'defecto', 'inspeccion', 'etiqueta', 'lote', 'codigo de barras', 'conteo', 'ocr', 'contenedor', 'precinto', 'pale', 'foto', 'video'],
  'automatizacion-procesos': ['automatiza', 'proceso', 'tareas repetitivas', 'nomina', 'factura', 'excel'],
  'ia-erp-crm': ['erp', 'dynamics', 'venta', 'stock', 'informe', 'reporte', 'teams', 'consultas gerenciales'],
  'integracion-sistemas': ['integra', 'conectar', 'sincroniza', 'crm', 'pasarela'],
  'gobernanza-ia': ['gobernanza', 'copilot', 'ai act', 'reglamento', 'formacion', 'politica de uso'],
};

function serviceAnswer(s) {
  return `${s.title}:\n${s.question}\n${s.detail}\n\n${s.tags.map((t) => `✓ ${t}`).join('\n')}\n\n¿Quieres que te lo enseñemos en una demo?`;
}

// El orden importa: gana la primera categoría que coincide.
const KNOWLEDGE_BASE = [
  ...services.map((s) => ({
    categoria: s.slug,
    palabras: SERVICE_KEYWORDS[s.slug] || [],
    respuestas: [serviceAnswer(s)],
  })),
  {
    categoria: 'servicios',
    palabras: ['servicio', 'que ofreces', 'que ofrecen', 'que venden', 'ofrecen', 'soluciones'],
    respuestas: [
      `En FrecDigital ofrecemos:\n${services.map((s) => `• ${s.title}`).join('\n')}\n\n¿Cuál te interesa?`,
    ],
  },
  {
    categoria: 'precios',
    palabras: ['precio', 'costo', 'coste', 'cuesta', 'cuanto', 'valor', 'tarifa', 'presupuesto'],
    respuestas: [
      'Nuestros precios son personalizados según tus necesidades. Un asesor te contactará con una cotización adaptada a tu negocio.\n\n¿Te gustaría agendar una consulta?',
    ],
  },
  {
    categoria: 'contacto',
    palabras: ['contacto', 'llamar', 'hablar', 'persona', 'asesor', 'email', 'correo', 'horario'],
    respuestas: [
      `Claro, puedes contactarnos:\n Email: ${company.email}\n Formulario: te respondemos en menos de 24 horas en días laborables.\n\n¿Necesitas algo más?`,
    ],
  },
  {
    categoria: 'ubicacion',
    palabras: ['donde', 'ubicacion', 'direccion', 'ciudad', 'pais'],
    respuestas: [
      `${company.description}\n\nPuedes contactarnos en:\n ${company.email}`,
    ],
  },
  {
    categoria: 'gracias',
    palabras: ['gracias', 'grazie', 'merci', 'tyvm'],
    respuestas: [
      'De nada, es un placer ayudarte.',
      '¡Para eso estamos aquí! ¿Hay algo más en lo que pueda ayudarte?',
    ],
  },
  {
    categoria: 'despedida',
    palabras: ['adios', 'chao', 'hasta luego', 'bye', 'nos vemos'],
    respuestas: [
      '¡Hasta luego! Fue un placer conversar contigo. Si necesitas algo más, aquí estaré.',
      '¡Adiós! Gracias por charlar conmigo. Vuelve pronto.',
    ],
  },
  {
    categoria: 'saludos',
    palabras: ['hola', 'buenos', 'buenas', 'hey', 'que tal', 'como estas'],
    respuestas: [
      '¡Hola! Soy FrecBot, asistente virtual de FrecDigital. ¿En qué puedo ayudarte hoy?',
      '¡Hola! Bienvenido a FrecDigital. ¿Qué necesitas?',
      '¡Hola! Encantado de verte. ¿Cómo puedo asistirte?',
    ],
  },
];

/** Minúsculas, sin tildes y con la puntuación convertida en espacios. */
function normalize(text) {
  return ` ${text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '') // quita tildes y diéresis
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;
}

/** true si la palabra clave aparece al inicio de una palabra del mensaje. */
function matches(normalizedMessage, keyword) {
  return normalizedMessage.includes(` ${normalize(keyword).trim()}`);
}

// Función para obtener respuesta del chatbot
export function getChatbotResponse(userMessage) {
  const message = normalize(userMessage);

  for (const entry of KNOWLEDGE_BASE) {
    if (entry.palabras.some((word) => matches(message, word))) {
      const randomIndex = Math.floor(Math.random() * entry.respuestas.length);
      return entry.respuestas[randomIndex];
    }
  }

  // Respuesta por defecto si no hay coincidencia
  return `Interesante pregunta. Para asuntos específicos, contacta a nuestro equipo en ${company.email}\n\n¿Hay algo más en lo que pueda ayudarte?`;
}

// Función para registrar análisis de mensajes (opcional)
export function logMessageAnalysis(userMessage, category) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${category}] ${userMessage}`);
}
