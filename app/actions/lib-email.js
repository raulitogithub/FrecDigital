'use server';

import { google } from "googleapis";

export async function handleContactForm(data) {
  const { fullName, email, company, service, message } = data;

  try {
    // Validar variables de entorno
    if (!process.env.GOOGLE_CLIENT_ID) {
      throw new Error('GOOGLE_CLIENT_ID no definido');
    }
    if (!process.env.GOOGLE_CLIENT_SECRET) {
      throw new Error('GOOGLE_CLIENT_SECRET no definido');
    }
    if (!process.env.GOOGLE_REFRESH_TOKEN) {
      throw new Error('GOOGLE_REFRESH_TOKEN no definido');
    }

    console.log("🔐 Inicializando OAuth2Client...");
    
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN.trim(),
    });

    console.log("🔄 Obteniendo access token...");
    const { token: accessToken } = await oauth2Client.getAccessToken();
    
    if (!accessToken) {
      throw new Error('No se pudo obtener el access token. Verifica que el refresh token sea válido.');
    }

    console.log("✅ Access token obtenido exitosamente");

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    // Construcción del correo
    const emailContent = [
      `To: fespinoza@frecdigital.com`,
      `From: fespinoza@frecdigital.com`,
      `Reply-To: ${email}`,
      `Subject: Nuevo contacto: ${service} - ${fullName}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=utf-8`,
      ``,
      `<div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a3a6b; padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">Nuevo contacto - FrecDigital</h2>
        </div>
        <div style="background: #f8fafc; padding: 24px; border: 1px solid #e8f4fc; border-radius: 0 0 12px 12px;">
          <p><strong>Nombre:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Empresa:</strong> ${company || 'No especificada'}</p>
          <p><strong>Servicio:</strong> ${service}</p>
          <p><strong>Mensaje:</strong> ${message}</p>
        </div>
      </div>`,
    ].join('\n');

    const encoded = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    console.log("📧 Enviando correo...");

    // 📤 Envío del correo
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encoded },
    });

    console.log("✅ Correo enviado exitosamente. ID:", response.data.id);
    return { success: true, messageId: response.data.id };

  } catch (error) {
    console.error("❌ Error enviando email:", error.message);
    console.error("Detalles completos:", error);
    
    // Proporcionar mensajes de error específicos
    if (error.message.includes('invalid_grant')) {
      return { 
        success: false, 
        message: 'El refresh token ha expirado o no es válido. Por favor, renueva tus credenciales de Google.'
      };
    }
    
    if (error.message.includes('403')) {
      return { 
        success: false, 
        message: 'No tienes permisos para enviar correos. Verifica que el scope gmail.send esté habilitado.'
      };
    }

    return { success: false, message: error.message };
  }
}