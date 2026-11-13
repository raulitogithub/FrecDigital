// Datos legales del titular de la web, usados por /aviso-legal, /privacidad,
// /cookies y la información básica de protección de datos del formulario.
// TODO(profesional): completar los marcadores [ ... ] y revisar todo el texto legal.
import { company } from '@/lib/seo-metadata';

export const legal = {
  ownerName: 'Franklin Raúl Espinoza Contreras',
  ownerType: 'persona natural con actividad registrada en Ecuador',
  ruc: '[RUC]', // TODO: número de RUC
  address: '[DIRECCIÓN]', // TODO: domicilio completo
  email: company.email,
  website: company.url.replace(/^https?:\/\//, ''),
  // TODO: nombre y país de cada proveedor. El código actual envía los correos del
  // formulario con la API de Gmail (Google) y el dominio pasa por Cloudflare.
  providers: '[PROVEEDORES]',
  lastUpdated: '13 de noviembre de 2026', // TODO: actualizar al publicar cambios
};

// ID de Google Analytics (se fija en build). Si está vacío, la web no usa analítica,
// no se muestra banner de cookies y la política de cookies lo indica así.
export const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

export const CONSENT_STORAGE_KEY = 'frec-cookie-consent';
export const OPEN_COOKIE_SETTINGS_EVENT = 'frec:open-cookie-settings';
