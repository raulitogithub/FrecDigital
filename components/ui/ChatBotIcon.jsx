'use client';

import { useId } from 'react';

// Icono de FrecBot en SVG: un asistente con forma de globo de chat, en los colores
// de la marca. Nítido a cualquier tamaño (botón de 56 px, cabecera de 36 px y
// avatar de 24 px) y sin imagen que descargar. Decorativo: el texto accesible lo
// pone el elemento que lo contiene (p. ej. aria-label="Abrir chat").
export default function ChatBotIcon({ size = 56, className = '' }) {
  const gradientId = `chatbot-bg-${useId().replace(/:/g, '')}`;
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a3a6b" />
          <stop offset="1" stopColor="#00b4d8" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill={`url(#${gradientId})`} />
      {/* Globo de chat (cuerpo del asistente) con cola abajo a la izquierda */}
      <path
        d="M22 13h20a10 10 0 0 1 10 10v10a10 10 0 0 1-10 10H29l-8 7v-7.4A10 10 0 0 1 12 33V23a10 10 0 0 1 10-10z"
        fill="#ffffff"
      />
      {/* Pantalla (cara) */}
      <rect x="17" y="18.5" width="30" height="19" rx="8" fill="#1a3a6b" />
      {/* Ojos y sonrisa */}
      <circle cx="26" cy="26.5" r="3.4" fill="#22e3ff" />
      <circle cx="38" cy="26.5" r="3.4" fill="#22e3ff" />
      <path d="M27 32.2q5 3.2 10 0" fill="none" stroke="#22e3ff" strokeWidth="2.4" strokeLinecap="round" />
      {/* Destello de IA */}
      <path
        d="M51 6.5c.6 2.6 1.6 3.6 4.2 4.2-2.6.6-3.6 1.6-4.2 4.2-.6-2.6-1.6-3.6-4.2-4.2 2.6-.6 3.6-1.6 4.2-4.2z"
        fill="#ffffff"
      />
    </svg>
  );
}
