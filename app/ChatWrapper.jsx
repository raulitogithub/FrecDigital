'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Chat de la web: lo sirve el CRM (crm.frecdigital.com). Lo atiende el agente
// del CRM y, cuando hace falta, una persona desde la bandeja. Se dibuja en su
// propio Shadow DOM, así que no le afecta el CSS de la web.
// El id de la cuenta es público (aparece en la página); no es un secreto.
// Las variables solo sirven para probar la web contra un CRM local.
const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || 'https://crm.frecdigital.com';
const CUENTA_CHAT = process.env.NEXT_PUBLIC_CRM_CHAT_CUENTA || 'c50e9665-3d15-46ef-b797-c1a572004017';

/** El widget se monta una sola vez en <body>: al navegar se muestra u oculta. */
function mostrarChat(visible) {
  const chat = document.getElementById('crm-chat');
  if (chat) chat.style.display = visible ? '' : 'none';
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
      data-color="#1d4ed8"
      strategy="afterInteractive"
      onLoad={() => mostrarChat(!ocultoActual.current)}
    />
  );
}
