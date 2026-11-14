// Contenido de las páginas /servicios/[slug].
// Sin clientes, cifras ni resultados inventados. Si se añade información que deba
// confirmarse, márquese con [DATO: …] hasta tenerla.
// Los datos de las tarjetas (título, imagen, icono…) están en lib/services.js.

export const servicePages = {
  'asistentes-ia': {
    metaTitle: 'Asistentes de IA transaccionales para WhatsApp y web',
    metaDescription:
      'Asistentes de IA que identifican al cliente y completan gestiones reales (reservas, pagos o trámites) por WhatsApp o web. Para pymes en España y Ecuador.',
    intro: [
      'Los asistentes de IA transaccionales de FrecDigital son agentes conversacionales que identifican a cada cliente por WhatsApp o en la web y completan gestiones con sus datos reales: consultar un saldo, reservar, pagar o tramitar una solicitud.',
      'Están pensados para pymes y organizaciones de servicios —academias, hostelería, clubes o corporaciones— de España y Ecuador que reciben muchas consultas repetitivas.',
    ],
    problem: [
      'Buena parte de los mensajes que recibe una empresa de servicios son gestiones sencillas: «¿cuánto debo?», «quiero cambiar mi reserva», «envíame el certificado». Cada una obliga a alguien del equipo a buscar al cliente, consultar el sistema y responder, a menudo fuera de horario o con retraso.',
      'Un chatbot de preguntas frecuentes no resuelve esto, porque no sabe quién escribe ni puede actuar sobre sus datos. El cliente acaba esperando a una persona y el equipo dedica horas a tareas que no aportan valor.',
    ],
    steps: [
      { title: 'Identificación del cliente', text: 'El asistente reconoce a quien escribe por su número de WhatsApp o mediante una verificación sencilla (por ejemplo, un código o un dato que solo conoce el cliente).' },
      { title: 'Consulta de sus datos', text: 'Se conecta a tus sistemas —CRM, ERP, plataforma de reservas o base de datos— para consultar la información de ese cliente en tiempo real.' },
      { title: 'Gestión completa', text: 'Ejecuta la acción solicitada: confirma una reserva, genera un enlace de pago o registra un trámite, siempre dentro de las reglas que definas.' },
      { title: 'Paso a una persona', text: 'Cuando la consulta lo requiere, deriva la conversación a tu equipo con todo el contexto, para que nadie tenga que volver a preguntar.' },
    ],
    useCases: [
      { sector: 'Academias', text: 'Consultar el estado de pagos de matrícula, enviar el horario de clases o tramitar un cambio de grupo sin pasar por secretaría.' },
      { sector: 'Hostelería', text: 'Gestionar reservas, modificaciones y cancelaciones por WhatsApp, y enviar el enlace de pago de una señal.' },
      { sector: 'Clubes y corporaciones', text: 'Atender a socios: consultar cuotas pendientes, reservar instalaciones o solicitar documentos de la entidad.' },
    ],
    technologies: [
      'WhatsApp Business Platform (API oficial de Meta) y chat web integrable en tu sitio.',
      'Modelos de lenguaje (LLM) para entender peticiones en lenguaje natural, del proveedor que prefiera tu organización (por ejemplo, Claude, GPT o Gemini) según sus políticas y herramientas habituales.',
      'Conexión por API con tus sistemas de gestión, reservas o pasarela de pago.',
      'Registro de conversaciones y reglas de negocio configurables para controlar qué puede hacer el asistente.',
    ],
    faqs: [
      { q: '¿En qué se diferencia de un chatbot de preguntas frecuentes?', a: 'Un chatbot de preguntas frecuentes solo responde información general. Un asistente transaccional sabe quién es el cliente, consulta sus datos y completa la gestión que pide.' },
      { q: '¿Necesito cambiar mis sistemas actuales?', a: 'No. El asistente se conecta a los sistemas que ya usas mediante sus APIs o integraciones. Si un sistema no tiene API, estudiamos alternativas en la fase de análisis.' },
      { q: '¿Qué pasa si el asistente no sabe resolver una consulta?', a: 'La deriva a una persona de tu equipo con el historial de la conversación, para que la atención continúe sin repetir preguntas.' },
      { q: '¿Cuánto tarda la puesta en marcha?', a: 'De forma orientativa, entre dos y seis semanas. Depende de los sistemas que haya que conectar y del número de gestiones, y lo concretamos tras una primera reunión.' },
    ],
    related: ['agendamiento-inteligente', 'integracion-sistemas'],
  },

  'agendamiento-inteligente': {
    metaTitle: 'Agendamiento inteligente con IA: reservas y recordatorios',
    metaDescription:
      'Asistente de IA que agenda, confirma y recuerda citas a cualquier hora, sincronizado con tu calendario, para reducir ausencias. Para pymes en España y Ecuador.',
    intro: [
      'El agendamiento inteligente de FrecDigital es un asistente de IA que gestiona reservas y citas a cualquier hora, se sincroniza con tu calendario y envía recordatorios automáticos para reducir las ausencias.',
      'Está pensado para negocios que trabajan con cita previa —academias, hostelería, clínicas, clubes o servicios profesionales— en España y Ecuador.',
    ],
    problem: [
      'Gestionar citas a mano consume tiempo: llamadas que se pierden fuera de horario, mensajes para encontrar un hueco y cambios de última hora que obligan a reorganizar la agenda.',
      'Además, las ausencias sin aviso dejan huecos que no se pueden recuperar. Sin recordatorios ni una forma cómoda de cancelar o cambiar la cita, el cliente simplemente no aparece.',
    ],
    steps: [
      { title: 'Conexión con tu agenda', text: 'Sincronizamos el asistente con el calendario que ya usas para que solo ofrezca huecos realmente disponibles.' },
      { title: 'Reserva conversacional', text: 'El cliente pide cita por WhatsApp o en la web, en lenguaje natural, y el asistente le propone opciones y la confirma.' },
      { title: 'Recordatorios automáticos', text: 'Antes de la cita, el cliente recibe un recordatorio con la opción de confirmar, cambiar o cancelar.' },
      { title: 'Huecos liberados', text: 'Si alguien cancela, el hueco vuelve a quedar disponible al momento para otros clientes.' },
    ],
    useCases: [
      { sector: 'Academias', text: 'Reservar clases de prueba, tutorías o exámenes de nivel, y recordar la cita al alumno o a su familia.' },
      { sector: 'Hostelería', text: 'Gestionar reservas de mesa o de eventos, con confirmación previa para reducir las mesas vacías.' },
      { sector: 'Clubes y corporaciones', text: 'Reservar pistas, salas o instalaciones según la disponibilidad real y las normas de cada socio.' },
      { sector: 'Servicios profesionales', text: 'Organizar citas de consultas, revisiones o visitas comerciales, con recordatorio y opción de reprogramar desde el móvil.' },
    ],
    technologies: [
      'Integración con el calendario que ya usa tu organización (por ejemplo, Google Calendar o Microsoft 365).',
      'WhatsApp Business Platform y chat web para la reserva conversacional.',
      'Recordatorios automáticos por el canal que prefieran tú y tus clientes: WhatsApp, email u otros.',
      'Modelos de lenguaje (LLM) para entender fechas y peticiones expresadas con naturalidad.',
    ],
    faqs: [
      { q: '¿Funciona con el calendario que ya uso?', a: 'Sí. Trabajamos con el calendario que ya usa tu organización, como Google Calendar o Microsoft 365, y el asistente se sincroniza con él para ofrecer solo huecos libres.' },
      { q: '¿Puede el cliente cambiar o cancelar su cita?', a: 'Sí. Desde la misma conversación o desde el recordatorio puede confirmar, cambiar o cancelar, y la agenda se actualiza al momento.' },
      { q: '¿Se pueden aplicar reglas propias, como duración o antelación mínima?', a: 'Sí. Configuramos duraciones, márgenes entre citas, antelación mínima y cualquier norma propia de tu negocio.' },
      { q: '¿Qué ocurre con las peticiones que el asistente no puede resolver?', a: 'Si el cliente pide algo fuera de las reglas, como una cita urgente sin hueco disponible, el asistente lo deriva a tu equipo con los datos de la conversación para que decida.' },
    ],
    related: ['asistentes-ia', 'automatizacion-procesos'],
  },

  'vision-artificial': {
    metaTitle: 'Visión artificial industrial: lectura de contenedores y precintos',
    metaDescription:
      'Lectura automática de números de contenedor y precinto con OCR en local y aviso si no coinciden. Visión artificial para la industria en España y Ecuador.',
    intro: [
      'La visión artificial industrial de FrecDigital lee automáticamente los números de contenedor y de precinto en las fotos de cada expedición, los compara con los registrados y analiza en vídeo la carga de palés.',
      'Está pensada para empresas industriales y logísticas de España y Ecuador que necesitan verificar sus expediciones sin depender de revisiones manuales.',
    ],
    problem: [
      'En una expedición, un número de precinto mal anotado o un contenedor equivocado puede provocar retenciones en aduana, reclamaciones o mercancía enviada a un destino incorrecto. Y el error suele descubrirse cuando el camión ya ha salido.',
      'La verificación manual depende de que alguien revise fotos y documentos uno a uno, con prisa y al final de la jornada. Es justo el tipo de tarea repetitiva en la que es fácil equivocarse.',
    ],
    steps: [
      { title: 'Captura de imágenes', text: 'El personal hace las fotos habituales de cada expedición, o se usan cámaras fijas en el muelle de carga.' },
      { title: 'Detección y lectura', text: 'El sistema localiza en cada foto el contenedor y el precinto y lee sus números con OCR ejecutado en local.' },
      { title: 'Comparación con los registros', text: 'Los números leídos se comparan con los registrados en tu sistema de gestión para esa expedición.' },
      { title: 'Aviso inmediato', text: 'Si algo no cuadra, el sistema avisa al responsable antes de que salga el camión, con la imagen como evidencia.' },
    ],
    useCases: [
      { sector: 'Industria', text: 'Verificar los contenedores y precintos de cada expedición de exportación y conservar la evidencia fotográfica asociada al pedido.' },
      { sector: 'Logística', text: 'Controlar las entradas y salidas de contenedores en almacenes y terminales, con registro automático de cada lectura.' },
      { sector: 'Industria', text: 'Analizar en vídeo la carga de palés para revisar el proceso de carga y documentar cómo sale la mercancía.' },
    ],
    technologies: [
      'OCR ejecutado en local (en tus propias instalaciones): las imágenes no tienen por qué salir a la nube.',
      'Modelos de detección de objetos en imagen y vídeo que funcionan sin GPU: no hace falta un equipo especial.',
      'Fotos de móvil o tableta y cámaras IP en muelles de carga.',
      'Integración con tu ERP o sistema de gestión de almacén para comparar con los datos registrados.',
    ],
    faqs: [
      { q: '¿Necesito instalar cámaras nuevas?', a: 'No necesariamente. El sistema puede trabajar con las fotos que ya se hacen en cada expedición. Las cámaras fijas son una opción si se quiere automatizar la captura.' },
      { q: '¿Las imágenes salen de mi empresa?', a: 'El OCR se ejecuta en local, por lo que las imágenes pueden procesarse sin enviarse a servicios externos. Lo definimos según tus requisitos de seguridad.' },
      { q: '¿Qué ocurre si una foto no se lee bien?', a: 'El sistema marca la lectura como dudosa y la deja para revisión humana, en lugar de darla por buena.' },
      { q: '¿Puedo verlo funcionar antes de decidir?', a: 'Sí. Es una de las soluciones que tenemos en demo; podemos enseñártela con imágenes de ejemplo o con las tuyas.' },
    ],
    related: ['automatizacion-procesos', 'integracion-sistemas'],
  },

  'automatizacion-procesos': {
    metaTitle: 'Automatización inteligente de procesos con IA',
    metaDescription:
      'Nóminas, facturas, informes o pedidos hechos con Excel y correo, convertidos en flujos automáticos y trazables. Para pymes e industria en España y Ecuador.',
    intro: [
      'La automatización inteligente de procesos de FrecDigital convierte tareas que hoy se hacen con Excel y correo —nóminas, facturas, informes o pedidos— en flujos automáticos, rápidos y trazables.',
      'Está pensada para pymes y empresas industriales de España y Ecuador cuyos equipos dedican cada semana horas a copiar datos entre documentos y sistemas.',
    ],
    problem: [
      'Muchos procesos administrativos dependen de hojas de cálculo que circulan por correo: alguien recibe un archivo, copia los datos a otro, revisa, reenvía y espera respuesta. Funciona, pero es lento, depende de personas concretas y cuesta saber en qué punto está cada tarea.',
      'Los errores de transcripción y los olvidos son frecuentes, y cuando algo falla es difícil reconstruir qué pasó.',
    ],
    steps: [
      { title: 'Análisis del proceso', text: 'Revisamos contigo cómo se hace hoy la tarea, quién interviene y qué documentos y sistemas se usan.' },
      { title: 'Diseño del flujo', text: 'Definimos el flujo automático: de dónde llegan los datos, qué validaciones se aplican y quién debe aprobar cada paso.' },
      { title: 'Automatización con IA', text: 'La IA extrae datos de documentos como facturas, pedidos o correos, y el flujo los procesa y los lleva a su destino.' },
      { title: 'Trazabilidad', text: 'Cada ejecución queda registrada, con avisos cuando algo requiere atención humana.' },
    ],
    useCases: [
      { sector: 'Industria', text: 'Procesar pedidos recibidos por correo, extraer sus datos y registrarlos en el ERP sin teclearlos de nuevo.' },
      { sector: 'Academias', text: 'Generar informes periódicos de alumnos, asistencia o cobros a partir de los datos de la plataforma, sin montarlos a mano.' },
      { sector: 'Clubes y corporaciones', text: 'Automatizar la emisión de facturas o recibos de cuotas y su envío a cada socio.' },
      { sector: 'Hostelería', text: 'Consolidar los pedidos a proveedores de varios locales y enviar a cada proveedor su pedido en el formato que necesita.' },
    ],
    technologies: [
      'Herramientas de automatización de flujos según las que prefiera tu organización (por ejemplo, Power Automate, n8n o Make), o desarrollo a medida.',
      'Extracción de datos de documentos (facturas, pedidos, correos) con IA y OCR.',
      'Conexión con Excel, SharePoint, correo electrónico y tu ERP.',
      'Registros de ejecución y alertas para la supervisión humana.',
    ],
    faqs: [
      { q: '¿Qué procesos se pueden automatizar?', a: 'Los que se repiten con reglas claras: entrada de pedidos, facturación, conciliaciones, informes periódicos o nóminas. En la primera reunión identificamos cuáles compensan más.' },
      { q: '¿Tengo que dejar de usar Excel?', a: 'No necesariamente. Excel puede seguir siendo el punto de entrada o de salida; lo que se automatiza es el trabajo manual entre medias.' },
      { q: '¿Quién controla el proceso una vez automatizado?', a: 'Tu equipo. El flujo deja registro de cada paso y avisa cuando algo necesita revisión o aprobación.' },
      { q: '¿Por dónde conviene empezar?', a: 'Por un proceso concreto, frecuente y con reglas claras. Suele estar automatizado en un plazo orientativo de entre dos y seis semanas, y permite comprobar el resultado antes de abordar otros.' },
    ],
    related: ['integracion-sistemas', 'ia-erp-crm'],
  },

  'ia-erp-crm': {
    metaTitle: 'Consultas gerenciales e IA sobre ERP y Dynamics 365',
    metaDescription:
      'Pregunta por ventas, stock o clientes en lenguaje natural desde Teams o WhatsApp, con agentes y aprobación humana. Especialidad en Dynamics 365.',
    intro: [
      'Las consultas gerenciales e IA sobre ERP de FrecDigital permiten preguntar por ventas, stock o clientes en lenguaje natural desde Teams o WhatsApp y obtener la respuesta al instante, con agentes que preparan acciones en el ERP siempre con aprobación humana.',
      'Están pensadas para direcciones y equipos de pymes y empresas industriales de España y Ecuador, con especialidad en Microsoft Dynamics 365.',
    ],
    problem: [
      'Los datos de la empresa están en el ERP, pero llegar a ellos suele requerir informes predefinidos, filtros complejos o pedírselo a alguien que sepa sacarlos. Una pregunta sencilla, como las ventas de un cliente en el último trimestre, puede tardar horas o días en tener respuesta.',
      'Mientras tanto, las decisiones se toman con información incompleta o desactualizada.',
    ],
    steps: [
      { title: 'Conexión segura al ERP', text: 'Conectamos el asistente a tu ERP respetando los permisos de cada usuario: cada persona solo ve lo que ya puede ver.' },
      { title: 'Preguntas en lenguaje natural', text: 'Desde Teams o WhatsApp preguntas, por ejemplo, «¿cuáles fueron mis ventas de enero y febrero?», y recibes el informe al instante.' },
      { title: 'Acciones preparadas por agentes', text: 'Los agentes pueden preparar acciones en el ERP, como un pedido o una actualización de datos, a partir de tus instrucciones.' },
      { title: 'Aprobación humana', text: 'Ninguna acción se ejecuta sin que una persona autorizada la revise y la apruebe.' },
    ],
    useCases: [
      { sector: 'Industria', text: 'Consultar stock, pedidos pendientes o ventas por producto y cliente sin abrir el ERP ni esperar a un informe.' },
      { sector: 'Industria', text: 'Preparar borradores de pedidos u ofertas en el ERP a partir de una petición en Teams, para que un responsable los apruebe.' },
      { sector: 'Clubes y corporaciones', text: 'Consultar indicadores de gestión, como cuotas cobradas o pendientes, desde el móvil antes de una reunión de junta.' },
    ],
    technologies: [
      'Microsoft Dynamics 365 (especialidad) y ERP a medida desarrollados en .NET.',
      'Microsoft Teams y WhatsApp como canales de consulta.',
      'Modelos de lenguaje (LLM) del proveedor que prefiera tu organización (por ejemplo, Claude, GPT o Gemini) para interpretar preguntas y generar respuestas.',
      'Control de permisos por usuario y flujo de aprobación humana para cualquier acción.',
    ],
    faqs: [
      { q: '¿Cada usuario ve todos los datos de la empresa?', a: 'No. El asistente respeta los permisos de tu ERP: cada persona solo puede consultar la información a la que ya tiene acceso.' },
      { q: '¿Puede la IA modificar datos del ERP por su cuenta?', a: 'No. Los agentes solo preparan acciones; ninguna se ejecuta sin la aprobación de una persona autorizada.' },
      { q: '¿Funciona solo con Dynamics 365?', a: 'Dynamics 365 es nuestra especialidad, y también trabajamos con ERP a medida desarrollados en .NET. Para otros sistemas con API, lo valoramos caso por caso.' },
      { q: '¿Desde dónde se hacen las consultas?', a: 'Desde Microsoft Teams o WhatsApp, sin instalar nada nuevo en el ordenador de cada usuario.' },
    ],
    related: ['integracion-sistemas', 'gobernanza-ia'],
  },

  'integracion-sistemas': {
    metaTitle: 'Integración inteligente de sistemas: ERP, CRM, WhatsApp y pagos',
    metaDescription:
      'Conectamos ERP, CRM, WhatsApp, pasarelas de pago y bases de datos en tiempo real y sin errores manuales. Para pymes e industria en España y Ecuador.',
    intro: [
      'La integración inteligente de sistemas de FrecDigital conecta tu ERP, CRM, WhatsApp, pasarelas de pago y bases de datos para que trabajen juntos en tiempo real y sin errores manuales.',
      'Está pensada para pymes y empresas industriales de España y Ecuador que trabajan con varias herramientas que no se hablan entre sí.',
    ],
    problem: [
      'Es habitual que cada área use su propia herramienta: ventas en el CRM, operaciones en el ERP, cobros en la pasarela de pago y atención al cliente en WhatsApp. Los datos se copian a mano de una a otra, o no se copian.',
      'El resultado son duplicados, información desactualizada y procesos que se detienen porque un dato no ha llegado a tiempo al sistema que lo necesita.',
    ],
    steps: [
      { title: 'Mapa de sistemas', text: 'Identificamos qué herramientas usas, qué datos maneja cada una y dónde se producen hoy las copias manuales.' },
      { title: 'Diseño de la integración', text: 'Definimos qué sistema es la referencia para cada dato y cómo debe fluir la información entre ellos.' },
      { title: 'Conexión en tiempo real', text: 'Conectamos los sistemas mediante APIs y eventos para que los cambios se propaguen al momento.' },
      { title: 'Supervisión', text: 'Monitorizamos las integraciones y avisamos si algún intercambio falla, para corregirlo antes de que afecte al negocio.' },
    ],
    useCases: [
      { sector: 'Industria', text: 'Sincronizar pedidos y estados de entrega entre el ERP y el CRM para que el equipo comercial vea siempre la información actualizada.' },
      { sector: 'Academias', text: 'Conectar la plataforma de matrículas con la pasarela de pago y la contabilidad, para que cada cobro quede registrado sin intervención manual.' },
      { sector: 'Hostelería', text: 'Unificar las reservas que llegan por distintos canales en un único sistema, con confirmaciones automáticas por WhatsApp.' },
      { sector: 'Clubes y corporaciones', text: 'Conectar el registro de socios con el cobro de cuotas y las comunicaciones, para que un alta o una baja se refleje en todos los sistemas a la vez.' },
    ],
    technologies: [
      'APIs REST, webhooks y conectores nativos de cada plataforma.',
      'ERP: Microsoft Dynamics 365 y ERP a medida desarrollados en .NET.',
      'WhatsApp Business Platform y la pasarela de pago Stripe.',
      'Bases de datos SQL y monitorización de las integraciones.',
    ],
    faqs: [
      { q: '¿Qué pasa si uno de mis sistemas no tiene API?', a: 'Estudiamos alternativas, como exportaciones programadas, acceso a la base de datos o automatización de la interfaz, y te explicamos sus ventajas e inconvenientes.' },
      { q: '¿La integración es en tiempo real?', a: 'Siempre que los sistemas lo permiten, sí. Cuando no, se programan sincronizaciones periódicas con la frecuencia que necesites.' },
      { q: '¿Quién mantiene la integración?', a: 'Ofrecemos tres modalidades, según lo que necesites: mantenimiento mensual, bolsa de horas o soporte por incidencia.' },
      { q: '¿Cómo se protegen los datos que circulan entre sistemas?', a: 'Las conexiones se cifran y cada integración usa credenciales propias con los permisos mínimos necesarios, de forma que solo accede a los datos que necesita.' },
    ],
    related: ['ia-erp-crm', 'asistentes-ia'],
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
      { title: 'Despliegue de Copilot', text: 'Preparamos permisos y etiquetas de información y desplegamos Microsoft 365 Copilot de forma controlada.' },
    ],
    useCases: [
      { sector: 'Industria', text: 'Definir qué información técnica y comercial puede usarse con herramientas de IA y desplegar Copilot para las áreas de oficina.' },
      { sector: 'Academias', text: 'Establecer normas de uso de IA para el personal docente y administrativo, y formarlo en su aplicación práctica.' },
      { sector: 'Clubes y corporaciones', text: 'Aprobar una política de uso de IA para la organización y preparar la documentación que exige la normativa aplicable.' },
    ],
    technologies: [
      'Microsoft 365 Copilot y la configuración de permisos de Microsoft 365.',
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
    related: ['ia-erp-crm', 'automatizacion-procesos'],
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
