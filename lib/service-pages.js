// Contenido de las páginas /servicios/[slug].
// Sin clientes, cifras ni resultados inventados. Si se añade información que deba
// confirmarse, márquese con [DATO: …] hasta tenerla.
// Los datos de las tarjetas (título, imagen, icono…) están en lib/services.js.

export const servicePages = {
  'asistentes-ia': {
    metaTitle: 'Asistentes de IA para WhatsApp y web: gestiones, citas y pagos',
    metaDescription:
      'Asistentes de IA que identifican al cliente y completan gestiones reales por WhatsApp o web: citas, reservas, pagos o trámites. Para pymes en España y Ecuador.',
    intro: [
      'Los asistentes de IA transaccionales de FrecDigital son agentes conversacionales que identifican a cada cliente por WhatsApp o en la web y completan gestiones con sus datos reales: consultar un saldo, agendar una cita, pagar o tramitar una solicitud.',
      'Están pensados para pymes y organizaciones de servicios —academias, hostelería, clínicas, clubes, corporaciones o servicios profesionales— de España y Ecuador que reciben muchas consultas repetitivas.',
    ],
    problem: [
      'Buena parte de los mensajes que recibe una empresa de servicios son gestiones sencillas: «¿cuánto debo?», «quiero cambiar mi cita», «envíame el certificado». Cada una obliga a alguien del equipo a buscar al cliente, consultar el sistema y responder, a menudo fuera de horario o con retraso.',
      'Con las citas pasa lo mismo: llamadas que se pierden, mensajes para encontrar un hueco y ausencias sin aviso que dejan la agenda vacía. Un chatbot de preguntas frecuentes no resuelve nada de esto, porque no sabe quién escribe ni puede actuar sobre sus datos ni sobre tu calendario.',
    ],
    steps: [
      { title: 'Identificación del cliente', text: 'El asistente reconoce a quien escribe por su número de WhatsApp o mediante una verificación sencilla (por ejemplo, un código o un dato que solo conoce el cliente).' },
      { title: 'Consulta de sus datos y de tu agenda', text: 'Se conecta a tus sistemas —CRM, ERP, calendario, plataforma de reservas o base de datos— para consultar en tiempo real la información del cliente y los huecos disponibles.' },
      { title: 'Gestión completa', text: 'Ejecuta la acción solicitada: agenda o cambia una cita, genera un enlace de pago o registra un trámite, siempre dentro de las reglas que definas.' },
      { title: 'Seguimiento y paso a una persona', text: 'Envía recordatorios antes de cada cita y, cuando la consulta lo requiere, deriva la conversación a tu equipo con todo el contexto.' },
    ],
    useCases: [
      { sector: 'Academias', text: 'Consultar el estado de pagos de matrícula, reservar clases de prueba o tutorías y tramitar un cambio de grupo sin pasar por secretaría.' },
      { sector: 'Hostelería', text: 'Gestionar reservas de mesa o de eventos por WhatsApp, con confirmación previa y enlace de pago de una señal.' },
      { sector: 'Clubes y corporaciones', text: 'Atender a socios: consultar cuotas pendientes, reservar pistas o instalaciones y solicitar documentos de la entidad.' },
      { sector: 'Servicios profesionales', text: 'Organizar citas de consultas, revisiones o visitas, con recordatorio y opción de reprogramar desde el móvil.' },
    ],
    technologies: [
      'WhatsApp Business Platform (API oficial de Meta) y chat web integrable en tu sitio.',
      'Modelos de lenguaje (LLM) para entender peticiones en lenguaje natural, del proveedor que prefiera tu organización (por ejemplo, Claude, GPT o Gemini) según sus políticas y herramientas habituales.',
      'Integración con el calendario que ya usa tu organización (por ejemplo, Google Calendar o Microsoft 365) y recordatorios por el canal que prefieras: WhatsApp, email u otros.',
      'Conexión por API con tus sistemas de gestión, reservas o pasarela de pago, con reglas de negocio configurables para controlar qué puede hacer el asistente.',
    ],
    faqs: [
      { q: '¿En qué se diferencia de un chatbot de preguntas frecuentes?', a: 'Un chatbot de preguntas frecuentes solo responde información general. Un asistente transaccional sabe quién es el cliente, consulta sus datos y completa la gestión que pide: una cita, un pago o un trámite.' },
      { q: '¿También gestiona citas y reservas?', a: 'Sí. Se sincroniza con tu calendario para ofrecer solo huecos libres, aplica tus reglas (duración, antelación mínima, márgenes entre citas) y envía recordatorios desde los que el cliente puede confirmar, cambiar o cancelar.' },
      { q: '¿Necesito cambiar mis sistemas actuales?', a: 'No. El asistente se conecta a los sistemas que ya usas mediante sus APIs o integraciones. Si un sistema no tiene API, estudiamos alternativas en la fase de análisis.' },
      { q: '¿Cuánto tarda la puesta en marcha?', a: 'De forma orientativa, entre dos y seis semanas. Depende de los sistemas que haya que conectar y del número de gestiones, y lo concretamos tras una primera reunión.' },
    ],
    related: ['automatizacion-integracion', 'gobernanza-ia'],
  },

  'vision-artificial': {
    metaTitle: 'Visión artificial industrial: control de calidad, OCR e inspección',
    metaDescription:
      'Visión artificial para la industria: control de calidad, lectura de códigos y etiquetas, conteo y verificación de expediciones, en local. España y Ecuador.',
    intro: [
      'La visión artificial industrial de FrecDigital usa cámaras y modelos de IA para inspeccionar, leer y contar en tus procesos: detectar defectos, leer códigos, lotes o etiquetas, contar piezas y palés o verificar expediciones, y avisar al momento si algo no cuadra.',
      'Está pensada para empresas industriales, logísticas y de fabricación de España y Ecuador que hoy dependen de revisiones manuales, y funciona en local, sin necesidad de equipos con GPU.',
    ],
    problem: [
      'Muchas comprobaciones de una planta o un almacén se siguen haciendo a ojo: revisar si una pieza tiene defectos, anotar un lote o un número de serie, contar unidades o confirmar que una expedición sale con los datos correctos. Son tareas repetitivas, se hacen con prisa y dependen de la atención de cada persona.',
      'Cuando algo se escapa, el error se descubre tarde: una reclamación de cliente, mercancía retenida en aduana o un lote que hay que retirar. Y sin imágenes ni registros, cuesta saber qué pasó y dónde.',
    ],
    steps: [
      { title: 'Captura de imágenes', text: 'Usamos las fotos que ya hace tu equipo o cámaras fijas en la línea de producción, el muelle de carga o la zona que haya que controlar.' },
      { title: 'Ajuste a tu caso', text: 'Configuramos y entrenamos los modelos con imágenes de tu proceso: qué es un defecto, qué código hay que leer o qué hay que contar.' },
      { title: 'Análisis en local', text: 'El sistema analiza cada imagen o vídeo en tus instalaciones y compara el resultado con lo esperado o con los datos de tu sistema de gestión.' },
      { title: 'Aviso y registro', text: 'Si algo no cuadra, avisa al responsable con la imagen como evidencia; si el sistema no está seguro, deja el caso para revisión humana. Cada inspección queda registrada para su trazabilidad.' },
    ],
    useCases: [
      { sector: 'Fabricación', text: 'Inspeccionar piezas o productos al final de la línea para detectar defectos visibles y apartar los que no cumplen antes de embalarlos.' },
      { sector: 'Industria', text: 'Leer códigos, lotes, fechas o números de serie en etiquetas y envases, y comprobar que coinciden con la orden de producción.' },
      { sector: 'Logística', text: 'Verificar en cada expedición los números de contenedor y precinto, y contar palés o bultos en la carga. Es la solución que ya tenemos en demo.' },
      { sector: 'Seguridad en planta', text: 'Comprobar el uso de equipos de protección o el acceso a zonas restringidas, y avisar al responsable cuando se detecta una situación de riesgo.' },
    ],
    technologies: [
      'OCR y modelos de detección de objetos en imagen y vídeo que funcionan sin GPU: no hace falta un equipo especial.',
      'Procesamiento en local, en tus propias instalaciones: las imágenes no tienen por qué salir a la nube.',
      'Cámaras IP en línea o muelle, y fotos de móvil o tableta.',
      'Integración con tu ERP, sistema de gestión de almacén o de producción para comparar con los datos registrados.',
    ],
    faqs: [
      { q: '¿Qué tipo de inspecciones puede hacer?', a: 'Las que se basan en lo que se ve: detectar defectos visibles, leer códigos, textos y etiquetas, contar objetos, verificar que algo está donde debe o detectar situaciones concretas en vídeo. En la primera reunión valoramos si tu caso es viable.' },
      { q: '¿Necesito instalar cámaras nuevas o un equipo con GPU?', a: 'No necesariamente. Podemos empezar con las fotos que ya hace tu equipo, y los modelos funcionan sin GPU. Las cámaras fijas son una opción cuando se quiere automatizar la captura.' },
      { q: '¿Las imágenes salen de mi empresa?', a: 'El análisis se ejecuta en local, por lo que las imágenes pueden procesarse sin enviarse a servicios externos. Lo definimos según tus requisitos de seguridad.' },
      { q: '¿Puedo verlo funcionar antes de decidir?', a: 'Sí. Tenemos en demo la verificación de contenedores y precintos, y podemos hacer una prueba con imágenes de tu propio proceso.' },
    ],
    related: ['automatizacion-integracion', 'asistentes-ia'],
  },

  'automatizacion-integracion': {
    metaTitle: 'Automatización e integración de sistemas con IA: ERP, CRM y Dynamics 365',
    metaDescription:
      'Automatizamos procesos y conectamos ERP, CRM, WhatsApp y pagos, con agentes de IA sobre Dynamics 365 y ERP .NET. Para pymes e industria en España y Ecuador.',
    intro: [
      'La automatización e integración de sistemas de FrecDigital convierte en flujos automáticos las tareas que hoy se hacen con Excel y correo, conecta tu ERP, CRM, WhatsApp y pasarelas de pago para que trabajen juntos en tiempo real y añade agentes de IA que consultan el ERP y preparan acciones con aprobación humana.',
      'Está pensada para pymes y empresas industriales de España y Ecuador, con especialidad en Microsoft Dynamics 365 y en ERP a medida desarrollados en .NET.',
    ],
    problem: [
      'En muchas empresas cada área trabaja con su propia herramienta y los datos viajan a mano: alguien recibe un pedido por correo, lo copia al ERP, actualiza una hoja de cálculo y avisa por WhatsApp. Funciona, pero es lento, depende de personas concretas y genera duplicados y errores de transcripción.',
      'Además, la información está en el ERP pero cuesta llegar a ella: una pregunta sencilla, como las ventas de un cliente en el último trimestre, puede esperar horas o días a que alguien prepare el informe.',
    ],
    steps: [
      { title: 'Análisis de procesos y sistemas', text: 'Revisamos contigo cómo se hacen hoy las tareas, qué herramientas usas, qué datos maneja cada una y dónde se producen las copias manuales.' },
      { title: 'Integración en tiempo real', text: 'Conectamos tus sistemas mediante APIs y eventos, definiendo qué sistema es la referencia para cada dato, para que los cambios se propaguen al momento.' },
      { title: 'Automatización con IA', text: 'Creamos los flujos automáticos: la IA extrae datos de facturas, pedidos o correos, y los agentes responden consultas sobre el ERP desde Teams o WhatsApp y preparan acciones.' },
      { title: 'Supervisión y aprobación humana', text: 'Cada ejecución queda registrada, avisamos si algo falla y ninguna acción en el ERP se ejecuta sin que una persona autorizada la apruebe.' },
    ],
    useCases: [
      { sector: 'Industria', text: 'Procesar los pedidos que llegan por correo, registrarlos en el ERP sin teclearlos de nuevo y mantener sincronizado el estado de cada pedido con el CRM.' },
      { sector: 'Dirección', text: 'Preguntar desde Teams «¿cuáles fueron mis ventas de enero y febrero?» o consultar el stock y recibir la respuesta al instante, con los permisos de cada usuario.' },
      { sector: 'Academias', text: 'Conectar la plataforma de matrículas con la pasarela de pago y la contabilidad, para que cada cobro quede registrado y los informes se generen solos.' },
      { sector: 'Clubes y corporaciones', text: 'Unir el registro de socios con el cobro de cuotas y la emisión de recibos, para que un alta o una baja se refleje en todos los sistemas a la vez.' },
    ],
    technologies: [
      'Microsoft Dynamics 365 (especialidad) y ERP a medida desarrollados en .NET.',
      'Herramientas de automatización según las que prefiera tu organización (por ejemplo, Power Automate, n8n o Make), o desarrollo a medida.',
      'APIs REST, webhooks y bases de datos SQL; WhatsApp Business Platform y la pasarela de pago Stripe.',
      'Modelos de lenguaje (LLM) del proveedor que prefiera tu organización (por ejemplo, Claude, GPT o Gemini), con Microsoft Teams o WhatsApp como canales de consulta.',
    ],
    faqs: [
      { q: '¿Copilot no hace ya esto?', a: 'Copilot es muy útil dentro del ecosistema de Microsoft. Nosotros cubrimos lo que queda fuera o requiere desarrollo: ERP a medida en .NET, conexión con sistemas de otros fabricantes, automatización de procesos completos y agentes que preparan acciones con aprobación humana. Si ya usas Copilot, lo aprovechamos y lo desplegamos de forma segura.' },
      { q: '¿Tengo que cambiar de ERP o dejar de usar Excel?', a: 'No. Conectamos los sistemas que ya usas, y Excel puede seguir siendo el punto de entrada o de salida: lo que se automatiza es el trabajo manual entre medias. Si un sistema no tiene API, estudiamos alternativas.' },
      { q: '¿Puede la IA modificar datos del ERP por su cuenta?', a: 'No. Los agentes respetan los permisos de cada usuario y solo preparan acciones: ninguna se ejecuta sin la aprobación de una persona autorizada.' },
      { q: '¿Cuánto tarda y quién lo mantiene?', a: 'De forma orientativa, un primer proceso o integración está listo en entre dos y seis semanas. Después ofrecemos tres modalidades de soporte: mantenimiento mensual, bolsa de horas o soporte por incidencia.' },
    ],
    related: ['asistentes-ia', 'gobernanza-ia'],
  },

  'gobernanza-ia': {
    metaTitle: 'Gobernanza y adopción de IA: políticas, Copilot y AI Act',
    metaDescription:
      'Políticas de uso de IA, formación de equipos, despliegue seguro de Microsoft 365 Copilot y preparación para el AI Act. Para empresas de España y Ecuador.',
    intro: [
      'El servicio de gobernanza y adopción de IA de FrecDigital define qué herramientas de IA usar y cómo, forma al equipo y despliega Microsoft 365 Copilot de forma segura, preparando a la empresa para el Reglamento Europeo de IA.',
      'Está pensado para pymes, empresas industriales y organizaciones de España y Ecuador cuyos equipos ya usan IA sin reglas claras.',
    ],
    problem: [
      'En muchas empresas los empleados ya usan herramientas de IA por su cuenta, con cuentas personales y sin criterios comunes. Es fácil que se introduzcan datos de clientes o información confidencial en servicios externos sin saber qué ocurre con ellos.',
      'A la vez, el Reglamento Europeo de IA (Reglamento (UE) 2024/1689) ya exige obligaciones como la alfabetización en IA del personal, y las empresas no siempre saben por dónde empezar.',
    ],
    steps: [
      { title: 'Diagnóstico', text: 'Analizamos qué herramientas de IA se usan hoy, con qué datos y con qué riesgos.' },
      { title: 'Política de uso', text: 'Redactamos una política clara: herramientas permitidas, datos que nunca deben introducirse y responsables de cada decisión.' },
      { title: 'Formación del equipo', text: 'Formamos a cada perfil en el uso práctico y seguro de la IA en su trabajo diario.' },
      { title: 'Despliegue de Copilot', text: 'Preparamos permisos y etiquetas de información y desplegamos Copilot de forma controlada en Microsoft 365 y, si lo usas, en Dynamics 365.' },
    ],
    useCases: [
      { sector: 'Industria', text: 'Definir qué información técnica y comercial puede usarse con herramientas de IA y desplegar Copilot para las áreas de oficina.' },
      { sector: 'Academias', text: 'Establecer normas de uso de IA para el personal docente y administrativo, y formarlo en su aplicación práctica.' },
      { sector: 'Clubes y corporaciones', text: 'Aprobar una política de uso de IA para la organización y preparar la documentación que exige la normativa aplicable.' },
    ],
    technologies: [
      'Microsoft 365 Copilot, Copilot en Dynamics 365 y la configuración de permisos de Microsoft 365.',
      'Reglamento (UE) 2024/1689 de Inteligencia Artificial (AI Act).',
      'Normativa de protección de datos: RGPD en España y Ley Orgánica de Protección de Datos Personales en Ecuador.',
      'Materiales de formación adaptados a cada perfil de la empresa.',
    ],
    faqs: [
      { q: '¿El Reglamento Europeo de IA afecta a mi empresa?', a: 'Si tu empresa opera en la Unión Europea y usa sistemas de IA, le afectan al menos algunas obligaciones, como la alfabetización en IA del personal, aplicable desde febrero de 2025. En el diagnóstico revisamos tu caso concreto.' },
      { q: '¿Qué hay que preparar antes de activar Copilot?', a: 'Sobre todo los permisos: Copilot accede a la información que cada usuario ya puede ver, así que conviene revisar quién tiene acceso a qué antes de desplegarlo.' },
      { q: '¿La formación es igual para todo el equipo?', a: 'No. Adaptamos los contenidos a cada perfil: dirección, áreas técnicas y personal administrativo usan la IA de forma distinta.' },
      { q: '¿Sirve para empresas de Ecuador?', a: 'Sí. Adaptamos la política y la formación a la normativa aplicable en cada país, incluida la Ley Orgánica de Protección de Datos Personales de Ecuador.' },
    ],
    related: ['automatizacion-integracion', 'asistentes-ia'],
  },
};

/** Recuento aproximado de palabras de una página (para revisar la extensión del borrador). */
export function wordCount(page) {
  const text = [
    ...page.intro,
    ...page.problem,
    ...page.steps.flatMap((s) => [s.title, s.text]),
    ...page.useCases.flatMap((u) => [u.sector, u.text]),
    ...page.technologies,
    ...page.faqs.flatMap((f) => [f.q, f.a]),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}
