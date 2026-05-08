#!/usr/bin/env node

/**
 * Generador de Refresh Token - Google OAuth2
 * Uso: node lib/generate-refresh-token.js
 * 
 * Este script te guiará paso a paso para obtener el refresh token
 * usando tus credenciales de Google Cloud.
 */

const http = require('http');
const url = require('url');
const { google } = require('googleapis');

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/auth/callback'; // URL local para capturar el código

console.log('\n🔐 GENERADOR DE REFRESH TOKEN - Google OAuth2');
console.log('═'.repeat(50));

// Crear OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Generar URL de autorización
const scopes = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.readonly',
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent', // Fuerza a mostrar pantalla de consentimiento
});

console.log('\n📋 PASO 1: Abre esta URL en tu navegador:');
console.log('\n' + authUrl);

// Crear servidor local para capturar el código
const server = http.createServer(async (req, res) => {
  const query = url.parse(req.url, true).query;

  if (query.code) {
    console.log('\n✅ Código recibido exitosamente');

    try {
      // Intercambiar código por tokens
      console.log('🔄 Intercambiando código por tokens...');
      const { tokens } = await oauth2Client.getToken(query.code);

      console.log('\n✅ ✅ ✅ REFRESH TOKEN GENERADO ✅ ✅ ✅\n');
      console.log('━'.repeat(50));
      console.log('REFRESH_TOKEN:');
      console.log(tokens.refresh_token);
      console.log('━'.repeat(50));

      console.log('\n📝 Copia el token anterior y pegalo en tu .env.local:\n');
      console.log('GOOGLE_REFRESH_TOKEN=' + tokens.refresh_token);

      console.log('\n\n📋 PRÓXIMOS PASOS:');
      console.log('1. Abre: .env.local');
      console.log('2. Encuentra: GOOGLE_REFRESH_TOKEN=YOUR_REAL_REFRESH_TOKEN_HERE');
      console.log('3. Reemplaza con: GOOGLE_REFRESH_TOKEN=' + tokens.refresh_token);
      console.log('4. Guarda el archivo');
      console.log('5. Ejecuta: npm run test:oauth');
      console.log('6. Luego: npm run test:email\n');

      // Respuesta HTML
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>✅ Éxito - Refresh Token Generado</title>
          <style>
            body { font-family: Arial; text-align: center; padding: 40px; background: #0f172a; color: #fff; }
            .success { background: #10b981; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .token { background: #1e293b; padding: 15px; border-radius: 8px; word-break: break-all; text-align: left; font-family: monospace; }
            button { background: #00b4d8; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
          </style>
        </head>
        <body>
          <div class="success">
            <h1>✅ ¡Refresh Token Generado!</h1>
            <p>Tu token ha sido generado exitosamente.</p>
          </div>
          
          <div class="token">
            <strong>GOOGLE_REFRESH_TOKEN=</strong><br>
            ${tokens.refresh_token}
          </div>
          
          <p style="margin-top: 30px; font-size: 14px;">
            1. Copia el token anterior<br>
            2. Pégalo en tu .env.local<br>
            3. Cierra esta ventana y vuelve a la terminal<br>
            4. Ejecuta: npm run test:oauth
          </p>
          
          <button onclick="window.close()">Cerrar</button>
        </body>
        </html>
      `);

      // Esperar 3 segundos y cerrar servidor
      setTimeout(() => {
        server.close();
        process.exit(0);
      }, 3000);

    } catch (error) {
      console.error('\n❌ Error:', error.message);
      res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>❌ Error</title>
          <style>
            body { font-family: Arial; text-align: center; padding: 40px; background: #0f172a; color: #fff; }
            .error { background: #ef4444; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="error">
            <h1>❌ Error al generar el token</h1>
            <p>${error.message}</p>
          </div>
        </body>
        </html>
      `);
      server.close();
      process.exit(1);
    }

  } else if (query.error) {
    console.error('\n❌ Error de OAuth:', query.error);
    console.error('Descripción:', query.error_description);
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>❌ Error de Autorización</title>
        <style>
          body { font-family: Arial; text-align: center; padding: 40px; background: #0f172a; color: #fff; }
          .error { background: #ef4444; padding: 20px; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="error">
          <h1>❌ Error de Autorización</h1>
          <p>Error: ${query.error}</p>
          <p>${query.error_description || ''}</p>
        </div>
      </body>
      </html>
    `);
    server.close();
    process.exit(1);
  }
});

server.listen(3000, () => {
  console.log('\n🌐 Servidor de autorización iniciado en http://localhost:3000');
  console.log('\n📋 PASO 2: Se abrirá una ventana de autorización de Google');
  console.log('          1. Inicia sesión con tu cuenta de Google');
  console.log('          2. Haz clic en "Permitir"');
  console.log('          3. Se capturará el código automáticamente\n');
  
  // Abrir navegador automáticamente (si es posible)
  try {
    const open = require('open');
    open(authUrl);
  } catch (e) {
    // Si open no está instalado, el usuario debe abrir manualmente
  }
});

// Timeout después de 5 minutos
setTimeout(() => {
  console.error('\n❌ Timeout: No se recibió autorización en 5 minutos');
  server.close();
  process.exit(1);
}, 5 * 60 * 1000);
