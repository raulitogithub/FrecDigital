// FrecBot Local - Respuestas basadas en palabras clave
// No requiere API externa, funciona completamente local

const KNOWLEDGE_BASE = {
  // Saludos
  saludos: {
    palabras: ['hola', 'buenos', 'halo', 'hey', 'qué tal', 'cómo estás'],
    respuestas: [
      '¡Hola! Soy FrecBot, asistente virtual de FrecDigital. 👋 ¿En qué puedo ayudarte hoy?',
      '¡Hola! Bienvenido a FrecDigital. 😊 ¿Qué necesitas?',
      '¡Hola! Encantado de verte. 👍 ¿Cómo puedo asistirte?',
    ],
  },

  // Servicios generales
  servicios: {
    palabras: ['servicios', 'qué ofreces', 'qué venden', 'ofrecen', 'soluciones'],
    respuestas: [
      'En FrecDigital ofrecemos: 🤖\n• Chatbots Inteligentes 24/7\n• Automatización de Procesos\n• Integración de Sistemas con IA\n• Agendamiento Inteligente\n• Consultas Gerenciales con IA\n¿Cuál te interesa?',
    ],
  },

  // Chatbots
  chatbots: {
    palabras: ['chatbot', 'asistente', 'atención cliente', 'whatsapp'],
    respuestas: [
      'Nuestros Chatbots Inteligentes: 🤖\n✓ Atienden clientes 24/7\n✓ Responden preguntas frecuentes\n✓ Califican leads automáticamente\n✓ Funcionan en WhatsApp, Instagram, Facebook y web\n\n¿Te interesa cotizar uno?',
    ],
  },

  // Automatización
  automatizacion: {
    palabras: ['automatización', 'automatizar', 'procesos', 'tareas repetitivas'],
    respuestas: [
      'Automatización de Procesos: ⚙️\n✓ Automatizan tareas repetitivas\n✓ Envío automático de correos\n✓ Seguimiento de clientes\n✓ Generación de reportes\n✓ Gestión de bases de datos\n\n¿Quieres conocer más?',
    ],
  },

  // Integración
  integracion: {
    palabras: ['integración', 'sistemas', 'crm', 'erp', 'conectar', 'sincronizar'],
    respuestas: [
      'Integración de Sistemas con IA: 🔗\n✓ Conectan CRM, ERP y apps\n✓ Todo en un solo lugar\n✓ Acceso a datos en tiempo real\n✓ Decisiones más rápidas\n\n¿Necesitas integrar tus sistemas?',
    ],
  },

  // Agendamiento
  agendamiento: {
    palabras: ['agenda', 'cita', 'reserva', 'agendar', 'horario'],
    respuestas: [
      'Agendamiento Inteligente: 📅\n✓ Chatbot agenda citas automáticamente\n✓ Confirmación automática\n✓ Recordatorios 24/7\n✓ Disponibilidad en tiempo real\n\n¿Te interesa para tu negocio?',
    ],
  },

  // Consultas Gerenciales
  consultas: {
    palabras: ['consultas', 'datos', 'reportes', 'ventas', 'análisis', 'inteligencia'],
    respuestas: [
      'Consultas Gerenciales con IA: 📊\n✓ Consulta datos en lenguaje natural\n✓ Análisis de ventas por período\n✓ Reportes automáticos\n✓ Decisiones basadas en datos\n\n¿Necesitas visualizar tus datos?',
    ],
  },

  // Precios
  precios: {
    palabras: ['precio', 'costo', 'cuánto', 'valor', 'tarifa', 'presupuesto'],
    respuestas: [
      'Nuestros precios son personalizados según tus necesidades. 💰 Un asesor te contactará pronto con una cotización adaptada a tu negocio.\n\n¿Te gustaría agendar una consulta?',
    ],
  },

  // Contacto
  contacto: {
    palabras: ['contacto', 'llamar', 'hablar', 'persona', 'asesor', 'email'],
    respuestas: [
      'Claro, puedes contactarnos: 📞\n📧 Email: fespinoza@frecdigital.com\n⏰ Horario: Lunes a Viernes 08:00 a 16:00 (Ecuador)\n\n¿Necesitas algo más?',
    ],
  },

  // Ubicación/Ubicacion
  ubicacion: {
    palabras: ['dónde', 'ubicación', 'dirección', 'ciudad', 'país'],
    respuestas: [
      'FrecDigital es una agencia especializada en soluciones de IA para empresas. 🌐\n\nPuedes contactarnos en:\n📧 fespinoza@frecdigital.com\n⏰ Lunes a Viernes 08:00 a 16:00 (Ecuador)',
    ],
  },

  // Despedida
  despedida: {
    palabras: ['adiós', 'chao', 'hasta luego', 'bye', 'nos vemos'],
    respuestas: [
      '¡Hasta luego! Fue un placer conversar contigo. 👋 Si necesitas algo más, aquí estaré.',
      '¡Adiós! Gracias por charlar conmigo. 😊 Vuelve pronto.',
    ],
  },

  // Agradecimiento
  gracias: {
    palabras: ['gracias', 'grazie', 'merci', 'tyvm', 'muchas gracias'],
    respuestas: [
      'De nada, es un placer ayudarte. 😊',
      '¡Para eso estamos aquí! ¿Hay algo más en lo que pueda ayudarte?',
    ],
  },
};

// Función para obtener respuesta del chatbot
export function getChatbotResponse(userMessage) {
  const messageLower = userMessage.toLowerCase().trim();

  // Buscar coincidencias de palabras clave
  for (const [category, data] of Object.entries(KNOWLEDGE_BASE)) {
    const matchedWord = data.palabras.some((word) =>
      messageLower.includes(word)
    );

    if (matchedWord) {
      // Retornar una respuesta aleatoria de la categoría
      const randomIndex = Math.floor(Math.random() * data.respuestas.length);
      return data.respuestas[randomIndex];
    }
  }

  // Respuesta por defecto si no hay coincidencia
  return 'Interesante pregunta. 🤔 Para asuntos específicos, contacta a nuestro equipo en fespinoza@frecdigital.com\n\n¿Hay algo más en lo que pueda ayudarte?';
}

// Función para registrar análisis de mensajes (opcional)
export function logMessageAnalysis(userMessage, category) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${category}] ${userMessage}`);
}
