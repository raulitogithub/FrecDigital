'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { GA_ID, CONSENT_STORAGE_KEY, OPEN_COOKIE_SETTINGS_EVENT } from '@/lib/legal';

// Banner de cookies + carga condicionada de Google Analytics.
// - Sin GA_ID configurado: no renderiza nada (la web solo usa cookies técnicas).
// - Con GA_ID: Analytics NO se carga hasta que el visitante pulsa "Aceptar".
// - "Aceptar" y "Rechazar" tienen el mismo peso visual.
// - La elección se puede cambiar en cualquier momento (CookieSettingsButton).
// TODO(profesional): revisar textos y la duración de la elección guardada.

function readConsent() {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Navegación privada o almacenamiento bloqueado: la elección dura esta visita.
  }
}

// Borra las cookies _ga y _ga_* en el dominio actual y en el dominio raíz.
function deleteAnalyticsCookies() {
  const host = window.location.hostname;
  const rootDomain = host.split('.').slice(-2).join('.');
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (!name.startsWith('_ga')) return;
    [host, `.${host}`, `.${rootDomain}`].forEach((domain) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    });
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}

export default function CookieConsent() {
  // 'loading' hasta leer la elección guardada; luego 'granted' | 'denied' | 'pending'
  const [consent, setConsent] = useState('loading');
  const wasGranted = useRef(false);

  useEffect(() => {
    if (!GA_ID) return;
    const stored = readConsent();
    setConsent(stored === 'granted' || stored === 'denied' ? stored : 'pending');

    const openSettings = () => {
      setConsent((current) => {
        wasGranted.current = current === 'granted';
        return 'pending';
      });
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  if (!GA_ID) return null;

  const decide = (value) => {
    saveConsent(value);
    if (value === 'granted') {
      window[`ga-disable-${GA_ID}`] = false;
      setConsent('granted');
      return;
    }
    // Rechazo: si Analytics ya estaba cargado, se desactiva, se borran sus
    // cookies y se recarga la página para descargar el script.
    window[`ga-disable-${GA_ID}`] = true;
    deleteAnalyticsCookies();
    setConsent('denied');
    if (wasGranted.current) window.location.reload();
  };

  const buttonClass =
    'flex-1 px-5 py-2.5 rounded-full border-2 border-[#00b4d8] bg-[#0a1628] text-white text-sm font-semibold hover:bg-[#00b4d8] hover:text-[#0a1628] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white';

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {consent === 'pending' && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[60] rounded-2xl border border-[#00b4d8]/40 bg-[#0a1628]/95 backdrop-blur-md p-5 shadow-2xl shadow-black/40 text-white"
        >
          <h2 id="cookie-banner-title" className="text-base font-bold mb-2">
            Cookies de analítica
          </h2>
          <p className="text-sm text-white/75 leading-relaxed mb-4">
            Usamos Google Analytics para saber cómo se usa la web, solo si nos das permiso. Las
            cookies técnicas necesarias funcionan siempre.{' '}
            <Link href="/cookies" className="text-[#00b4d8] underline underline-offset-2 hover:text-white">
              Más información
            </Link>
          </p>
          <div className="flex gap-3">
            <button type="button" onClick={() => decide('denied')} className={buttonClass}>
              Rechazar
            </button>
            <button type="button" onClick={() => decide('granted')} className={buttonClass}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
