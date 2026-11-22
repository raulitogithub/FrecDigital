'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Chat de la web: lo sirve el ARM (arm.frecdigital.com). Lo atiende el agente
// del CRM y, cuando hace falta, una persona desde la bandeja. Se dibuja en su
// propio Shadow DOM, así que no le afecta el CSS de la web.
// Color e icono: los del antiguo FrecBot (el color definitivo lo manda el CRM).
// El id de la cuenta es público (aparece en la página); no es un secreto.
// Las variables solo sirven para probar la web contra un CRM local.
const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || 'https://arm.frecdigital.com';
const CUENTA_CHAT = process.env.NEXT_PUBLIC_CRM_CHAT_CUENTA || 'c50e9665-3d15-46ef-b797-c1a572004017';

// El widget pone su botón a 20px del borde inferior, demasiado abajo. Su Shadow
// DOM es abierto, así que la web le añade estas reglas para subir el botón y la
// ventana del chat (:host les da más prioridad que las del widget). El botón de
// WhatsApp (components/WhatsAppButton.jsx) va justo encima: si se cambia esto, moverlo también.
const POSICION_CHAT = `
:host .burbuja { bottom: calc(44px + env(safe-area-inset-bottom, 0px)); }
:host .panel { bottom: calc(112px + env(safe-area-inset-bottom, 0px)); max-height: calc(100vh - 144px); }
@media (max-width: 480px) {
  :host .panel { bottom: calc(104px + env(safe-area-inset-bottom, 0px)); height: calc(100vh - 120px); }
}`;

/** El widget se monta una sola vez en <body>: al navegar se muestra u oculta. */
function mostrarChat(visible) {
  const chat = document.getElementById('crm-chat');
  if (!chat) return;
  chat.style.display = visible ? '' : 'none';
  const sombra = chat.shadowRoot;
  if (sombra && !sombra.getElementById('posicion-web')) {
    const estilo = document.createElement('style');
    estilo.id = 'posicion-web';
    estilo.textContent = POSICION_CHAT;
    sombra.appendChild(estilo);
  }
}

export default function ChatWrapper() {
  const oculto = usePathname()?.startsWith('/cortrip') ?? false;
  const ocultoActual = useRef(oculto);

  useEffect(() => {
    ocultoActual.current = oculto;
    mostrarChat(!oculto);
  }, [oculto]);

  // En /cortrip no se carga; si ya estaba cargado (se llegó navegando), queda oculto.
  if (oculto) return null;
  return (
    <Script
      id="crm-chat-script"
      src={`${CRM_URL}/widget/v1.js`}
      data-cuenta={CUENTA_CHAT}
      data-color="#0891b2"
      data-icono="/images/frecbot-ia.webp"
      strategy="afterInteractive"
      onLoad={() => mostrarChat(!ocultoActual.current)}
    />
  );
}
