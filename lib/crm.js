// Solo se importa desde la Server Action del formulario (app/actions/lib-email.js): nunca llega al navegador.
import { createHmac, randomUUID } from 'node:crypto';

/**
 * Envía cada lead del formulario de contacto al CRM de FrecDigital.
 *
 * Servidor a servidor (nunca desde el navegador) y firmado con HMAC-SHA256:
 *   X-CRM-Fecha: segundos unix
 *   X-CRM-Firma: sha256=<hex de HMAC(secreto, `${fecha}.${cuerpo}`)>
 * El CRM rechaza firmas incorrectas y envíos con más de 5 minutos de diferencia.
 *
 * Nunca rompe el formulario: si el CRM no responde, se registra y el correo
 * de siempre se envía igual. Variables (en el .env del servidor):
 *   CRM_FORMULARIO_URL      URL de envío que muestra el CRM en Canales
 *   CRM_FORMULARIO_SECRETO  secreto de firma que muestra el CRM en Canales
 */

const TIEMPO_MAXIMO_MS = 5000;

export async function enviarLeadAlCrm(lead) {
  const url = process.env.CRM_FORMULARIO_URL;
  const secreto = process.env.CRM_FORMULARIO_SECRETO;
  if (!url || !secreto) {
    console.warn('CRM: faltan CRM_FORMULARIO_URL o CRM_FORMULARIO_SECRETO; el lead no se envía al CRM.');
    return { enviado: false };
  }

  // Solo los campos con valor: el CRM no admite campos desconocidos ni vacíos en los opcionales.
  const cuerpo = JSON.stringify(
    Object.fromEntries(Object.entries({ idEnvio: randomUUID(), ...lead }).filter(([, v]) => v !== undefined && v !== null && v !== '')),
  );
  const fecha = Math.floor(Date.now() / 1000);
  const firma = `sha256=${createHmac('sha256', secreto).update(`${fecha}.${cuerpo}`).digest('hex')}`;

  try {
    const respuesta = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CRM-Fecha': String(fecha), 'X-CRM-Firma': firma },
      body: cuerpo,
      signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS),
    });
    if (!respuesta.ok) {
      console.error(`CRM: el envío del lead falló (HTTP ${respuesta.status}).`);
      return { enviado: false };
    }
    return { enviado: true };
  } catch (error) {
    console.error('CRM: no se pudo conectar para enviar el lead:', error.message);
    return { enviado: false };
  }
}
