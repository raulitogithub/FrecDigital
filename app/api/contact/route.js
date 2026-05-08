import { gmail } from '@/lib/gmail';

export async function POST(request) {
  try {
    const { fullName, email, company, service, message } = await request.json();

    const emailContent = [
      `To: fespinoza@frecdigital.com`,
      `From: fespinoza@frecdigital.com`,
      `Reply-To: ${email}`,
      `Subject: Nuevo contacto: ${service} — ${fullName}`,
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
              <td style="padding: 10px 0; border-bottom: 1px solid #e8f4fc; font-weight: bold;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8f4fc; color: #64748b; font-size: 13px;">Correo</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8f4fc;">
                <a href="mailto:${email}" style="color: #1a3a6b; font-weight: bold;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8f4fc; color: #64748b; font-size: 13px;">Empresa</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8f4fc;">${company || 'No especificada'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">Servicio</td>
              <td style="padding: 10px 0;">
                <span style="background: #e8f4fc; color: #1a3a6b; padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: bold;">${service}</span>
              </td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 8px;">Mensaje:</p>
            <div style="background: white; border: 1px solid #e8f4fc; border-radius: 8px; padding: 16px; color: #1e293b; line-height: 1.7;">
              ${message}
            </div>
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${email}" style="background: #1a3a6b; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Responder a ${fullName}
            </a>
          </div>
        </div>
        <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
          FrecDigital · Revolución Digital
        </p>
      </div>`,
    ].join('\n');

    const encoded = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encoded },
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error('Error enviando email:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}