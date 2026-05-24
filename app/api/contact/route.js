import { getGmail } from '@/lib/gmail';
import { validateContactForm, escapeHtml } from '@/lib/security';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit';
import { SECURITY_CONFIG } from '@/lib/security-config';

export async function POST(request) {
  try {
    // 1. Rate limiting
    const rateLimitResult = checkRateLimit(
      request,
      SECURITY_CONFIG.RATE_LIMITS.contact.maxRequests,
      SECURITY_CONFIG.RATE_LIMITS.contact.windowMs
    );

    if (!rateLimitResult.allowed) {
      const headers = getRateLimitHeaders(rateLimitResult);
      return Response.json(
        { success: false, message: 'Demasiadas solicitudes. Intenta más tarde.' },
        { status: 429, headers }
      );
    }

    // 2. Parsear y validar entrada
    const { fullName, email, company, service, message } = await request.json();

    const validation = validateContactForm({
      fullName,
      email,
      company,
      service,
      message
    });

    if (!validation.isValid) {
      return Response.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // 3. Sanitizar datos para prevenir XSS
    const sanitized = {
      fullName: escapeHtml(fullName),
      email: escapeHtml(email), // Email también puede contener caracteres especiales
      company: escapeHtml(company || ''),
      service: escapeHtml(service),
      message: escapeHtml(message)
    };

    // 4. Obtener email de contacto desde variables de entorno
    const contactEmail = process.env.CONTACT_EMAIL || 'hola@frecdigital.com';

    // 5. Construir email con datos sanitizados
    const emailContent = [
      `To: ${contactEmail}`,
      `From: ${contactEmail}`,
      `Reply-To: ${sanitized.email}`,
      `Subject: Nuevo contacto: ${sanitized.service} — ${sanitized.fullName}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=utf-8`,
      ``,
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a3a6b; padding: 28px 32px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0 0 4px;">Nuevo mensaje de contacto</h2>
          <p style="color: #00b4d8; margin: 0; font-size: 13px;">FrecDigital — Formulario web</p>
        </div>
        <div style="background: #f8fafc; padding: 28px 32px; border: 1px solid #e8f4fc; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8f4fc; color: #64748b; font-size: 13px; width: 35%;">Nombre</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8f4fc; font-weight: bold;">${sanitized.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8f4fc; color: #64748b; font-size: 13px;">Correo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8f4fc;">
                <a href="mailto:${sanitized.email}" style="color: #1a3a6b; font-weight: bold;">${sanitized.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8f4fc; color: #64748b; font-size: 13px;">Empresa</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8f4fc;">${sanitized.company || 'No especificada'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Servicio</td>
              <td style="padding: 10px 0;">
                <span style="background: #e8f4fc; color: #1a3a6b; padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: bold;">${sanitized.service}</span>
              </td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 8px;">Mensaje:</p>
            <div style="background: white; border: 1px solid #e8f4fc; border-radius: 8px; padding: 16px; color: #1e293b; line-height: 1.7; white-space: pre-wrap; word-wrap: break-word;">
              ${sanitized.message}
            </div>
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${sanitized.email}" style="background: #1a3a6b; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Responder a ${sanitized.fullName}
            </a>
          </div>
        </div>
        <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
          FrecDigital · Revolución Digital
        </p>
      </div>`,
    ].join('\n');

    // 6. Codificar y enviar email
    const encoded = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const gmail = getGmail();
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encoded },
    });

    // 7. Retornar respuesta exitosa sin exponer detalles
    return Response.json({ success: true });

  } catch (error) {
    // Loguear el error real internamente (no exponer al cliente)
    console.error('Error enviando email:', error.message);
    
    // Retornar error genérico al cliente
    return Response.json(
      { 
        success: false, 
        message: 'Error al procesar tu solicitud. Intenta más tarde.'
      },
      { status: 500 }
    );
  }
}