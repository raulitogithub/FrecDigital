/**
 * Script para probar envío de correo con Gmail API
 * Ejecutar: pnpm test:email
 * 
 * NOTA: Requiere .env.local configurado correctamente
 */

// Variables de .env.local cargadas por Node con --env-file (ver scripts en package.json)

const { google } = require('googleapis');

async function testSendEmail() {
  console.log('📧 Iniciando prueba de envío de correo...\n');

  try {
    // 1️⃣ Crear OAuth2Client
    console.log('🔐 Configurando autenticación...');
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || 'https://developers.google.com/oauthplayground'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN.trim(),
    });

    const { token: accessToken } = await oauth2Client.getAccessToken();
    if (!accessToken) {
      throw new Error('No se pudo obtener el access token');
    }
    console.log('✅ Autenticación exitosa');

    // 2️⃣ Crear instancia de Gmail API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // 3️⃣ Crear un correo de prueba
    console.log('\n📝 Creando correo de prueba...');
    const mailbox = process.env.GMAIL_USER;
    if (!mailbox) throw new Error('Define GMAIL_USER (buzón de la cuenta de Google) en .env.local');
    const emailContent = [
      `To: ${mailbox}`,
      `From: ${mailbox}`,
      `Subject: 🧪 Prueba de envío - ${new Date().toISOString()}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=utf-8`,
      ``,
      `<div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a3a6b;">✅ Correo de Prueba</h2>
        <p>Este es un correo de prueba para verificar que la autenticación OAuth2 funciona correctamente.</p>
        <p>Fecha: ${new Date().toLocaleString()}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Si recibiste este correo, significa que tu configuración es correcta.</p>
      </div>`,
    ].join('\n');

    // 4️⃣ Codificar en base64url
    const encoded = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    console.log('✅ Correo preparado');

    // 5️⃣ Enviar el correo
    console.log('\n📤 Enviando correo...');
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encoded },
    });

    console.log('✅ ✅ ✅ CORREO ENVIADO EXITOSAMENTE ✅ ✅ ✅');
    console.log(`\nID del mensaje: ${response.data.id}`);
    console.log('\nEl correo debe llegar en tu bandeja de entrada en unos segundos.');
    console.log(`Verifica en: ${mailbox}`);

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.message.includes('invalid_grant')) {
      console.error('\n💡 El refresh token ha expirado o no es válido.');
      console.error('Regenera el token en: https://developers.google.com/oauthplayground/');
    }
    
    process.exit(1);
  }
}

testSendEmail();
