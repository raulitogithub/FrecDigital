// Datos legales del titular de la web, usados por /aviso-legal, /privacidad,
// /cookies y la información básica de protección de datos del formulario.
// TODO(profesional): completar los marcadores [ ... ] y revisar todo el texto legal.
import { company } from '@/lib/seo-metadata';

export const legal = {
  ownerName: 'Franklin Raúl Espinoza Contreras',
  ownerType: 'persona natural con actividad registrada en Ecuador',
  ruc: '0919816546001',
  // TODO: dirección postal completa de la oficina virtual (debe ser real y, a ser posible,
  // estar registrada como establecimiento en el RUC del SRI).
  address: '[Dirección de la oficina virtual], Guayaquil, Ecuador',
  email: company.email,
  website: company.url.replace(/^https?:\/\//, ''),
  // Proveedores que tratan datos del formulario (encargados del tratamiento).
  providers: [
    { name: 'Hetzner Online GmbH', country: 'Alemania (UE)', role: 'alojamiento del sitio web' },
    // TODO(profesional): confirmar la entidad de Google que presta el servicio a la cuenta usada
    // (Google LLC, EE. UU., o Google Ireland Limited, UE) y sus garantías de transferencia.
    { name: 'Google', country: 'EE. UU. / UE', role: 'envío y recepción de los correos del formulario (Gmail)' },
    // El DNS de frecdigital.com apunta a Cloudflare: el tráfico pasa por su red.
    { name: 'Cloudflare, Inc.', country: 'EE. UU.', role: 'red de distribución y seguridad del sitio web' },
  ],
  retention: '12 meses',
  lastUpdated: '13 de noviembre de 2026', // TODO: actualizar al publicar cambios
};

// ID de Google Analytics (se fija en build). Si está vacío, la web no usa analítica,
// no se muestra banner de cookies y la política de cookies lo indica así.
export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

export const CONSENT_STORAGE_KEY = 'frec-cookie-consent';
export const OPEN_COOKIE_SETTINGS_EVENT = 'frec:open-cookie-settings';
