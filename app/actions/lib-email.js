'use server';

import { headers } from 'next/headers';
import { google } from 'googleapis';
import { contactFormSchema, HONEYPOT_FIELD, CONSENT_TEXTS, CONTACT_SUBJECT_TAG } from '@/lib/contact-schema';
import { legal } from '@/lib/legal';
import { escapeHtml } from '@/lib/security';
import { checkRateLimit } from '@/lib/rate-limit';
import { SECURITY_CONFIG } from '@/lib/security-config';
import { company as companyData } from '@/lib/seo-metadata';
import { enviarLeadAlCrm } from '@/lib/crm';

const GENERIC_ERROR = 'Ocurrió un error al enviar. Por favor intenta de nuevo.';

// Cabecera de correo con caracteres no ASCII (RFC 2047) y sin saltos de línea,
// para que ningún dato del usuario pueda inyectar cabeceras nuevas.
function encodeHeader(value) {
  const clean = String(value).replace(/[\r\n]+/g, ' ');
  return `=?UTF-8?B?${Buffer.from(clean, 'utf8').toString('base64')}?=`;
}

export async function handleContactForm(data) {
  // 0. Campo trampa: una persona nunca lo ve ni lo rellena. Si viene con contenido es un bot:
  //    respondemos "éxito" para no darle pistas, pero no enviamos nada.
  if (typeof data?.[HONEYPOT_FIELD] === 'string' && data[HONEYPOT_FIELD].trim() !== '') {
    console.warn('🛑 Envío del formulario descartado: campo trampa relleno (probable bot).');
    return { success: true };
  }

  // 1. Límite de envíos por IP (5 por hora, ver lib/security-config.js)
  const { maxRequests, windowMs } = SECURITY_CONFIG.RATE_LIMITS.contact;
  const rateLimit = checkRateLimit({ headers: await headers() }, maxRequests, windowMs);
  if (!rateLimit.allowed) {
    return {
      success: false,
      message: 'Has enviado demasiados mensajes. Inténtalo de nuevo más tarde o escríbenos por email.',
    };
  }

  // 2. Validación en el servidor con el mismo esquema que el navegador
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || 'Revisa los datos del formulario.',
    };
  }
  const { fullName, email, company, country, service, message, marketing } = parsed.data;

  // Momento del consentimiento (prueba exigida por el art. 7.1 RGPD)
  const consentAt = new Date();
  const formatIn = (timeZone) =>
    new Intl.DateTimeFormat('es-ES', { timeZone, dateStyle: 'long', timeStyle: 'medium' }).format(consentAt);

  // 2b. El lead también va al CRM (contacto, consentimientos y bandeja). Si el CRM
  //     no responde, el correo se envía igual: el formulario nunca falla por esto.
  const cabeceras = await headers();
  await enviarLeadAlCrm({
    nombre: fullName,
    email,
    empresa: company,
    pais: country,
    servicio: service,
    mensaje: message,
    privacidad: { aceptada: true, version: legal.lastUpdated },
    comunicacionesComerciales: Boolean(marketing),
    enviadoEn: consentAt.toISOString(),
    ip: cabeceras.get('cf-connecting-ip') || cabeceras.get('x-forwarded-for')?.split(',')[0]?.trim(),
    userAgent: cabeceras.get('user-agent')?.slice(0, 400),
    pagina: cabeceras.get('referer')?.slice(0, 500),
  });

  // 3. Escape de todos los campos antes de insertarlos en el HTML del correo
  const safe = {
    fullName: escapeHtml(fullName),
    email: escapeHtml(email),
    company: escapeHtml(company) || 'No especificada',
    country: escapeHtml(country),
    service: escapeHtml(service),
    message: escapeHtml(message).replace(/\n/g, '<br>'),
  };

  try {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
      throw new Error('Faltan variables de entorno de Google OAuth');
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || 'https://developers.google.com/oauthplayground'
    );
    oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN.trim() });

    const { token: accessToken } = await oauth2Client.getAccessToken();
    if (!accessToken) {
      throw new Error('No se pudo obtener el access token. Verifica que el refresh token sea válido.');
    }

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Buzón real de la cuenta de Google que envía (no se publica en la web).
    // La dirección pública (companyData.email) es un alias de ese mismo buzón.
    const mailbox = process.env.GMAIL_USER || companyData.email;

    const emailContent = [
      `To: ${mailbox}`,
      `From: ${mailbox}`,
      `Reply-To: ${email}`,
      `Subject: ${encodeHeader(`${CONTACT_SUBJECT_TAG} ${service} - ${fullName} (${country})${marketing ? ' · Novedades: SÍ' : ''}`)}`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=utf-8',
      '',
      `<div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a3a6b; padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">Nuevo contacto - FrecDigital</h2>
        </div>
        <div style="background: #f8fafc; padding: 24px; border: 1px solid #e8f4fc; border-radius: 0 0 12px 12px;">
          <p><strong>Nombre:</strong> ${safe.fullName}</p>
          <p><strong>Email:</strong> ${safe.email}</p>
          <p><strong>Empresa:</strong> ${safe.company}</p>
          <p><strong>País:</strong> ${safe.country}</p>
          <p><strong>Servicio:</strong> ${safe.service}</p>
          <p><strong>Mensaje:</strong><br>${safe.message}</p>

          <div style="margin-top: 24px; padding: 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; color: #334155;">
            <p style="margin: 0 0 10px; font-weight: bold; color: #1a3a6b;">Registro del consentimiento</p>
            <p style="margin: 0 0 6px;"><strong>Fecha y hora:</strong> ${formatIn('Europe/Madrid')} (hora de España) · ${formatIn('America/Guayaquil')} (hora de Ecuador) · ${consentAt.toISOString()} (UTC)</p>
            <p style="margin: 0 0 6px;"><strong>Política de privacidad aceptada:</strong> versión del ${escapeHtml(legal.lastUpdated)} (${companyData.url}/privacidad)</p>
            <p style="margin: 0 0 6px;"><strong>Casilla obligatoria marcada:</strong> «${escapeHtml(CONSENT_TEXTS.privacy)}»</p>
            <p style="margin: 0 0 6px;"><strong>Novedades por email:</strong> ${
              marketing
                ? `<strong style="color: #15803d;">SÍ</strong>. Marcó «${escapeHtml(CONSENT_TEXTS.marketing)}»`
                : `<strong style="color: #b91c1c;">NO</strong>. No marcó «${escapeHtml(CONSENT_TEXTS.marketing)}». Usar sus datos solo para responder a esta consulta.`
            }</p>
            <p style="margin: 10px 0 0; color: #64748b; font-size: 12px;">Conservación: ${escapeHtml(legal.retention)} desde el último contacto si no se inicia una relación profesional${marketing ? '; para las novedades, hasta que se dé de baja' : ''}.</p>
          </div>
        </div>
      </div>`,
    ].join('\r\n');

    const encoded = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encoded },
    });

    return { success: true, messageId: response.data.id };
  } catch (error) {
    // El detalle se queda en el log del servidor; al navegador solo va un mensaje genérico.
    console.error('❌ Error enviando email de contacto:', error.message);
    if (error.message?.includes('invalid_grant')) {
      console.error('El refresh token de Google ha expirado o no es válido: renueva las credenciales.');
    }
    return { success: false, message: GENERIC_ERROR };
  }
}
