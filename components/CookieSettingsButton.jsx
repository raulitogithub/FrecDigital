'use client';

import { GA_ID, OPEN_COOKIE_SETTINGS_EVENT } from '@/lib/legal';

// Reabre el banner de cookies para cambiar o retirar el consentimiento.
// Sin analítica configurada no hay nada que configurar y no se muestra.
export default function CookieSettingsButton({ className = '', children = 'Configurar cookies' }) {
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      className={className}
    >
      {children}
    </button>
  );
}
