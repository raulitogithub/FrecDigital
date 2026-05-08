/**
 * Script para probar la autenticación OAuth2 con Google Gmail API
 * Ejecutar: node lib/test-oauth.js
 * 
 * NOTA: Requiere .env.local configurado correctamente
 */

// Cargar variables de entorno
require('dotenv').config({ path: '.env.local' });

const { google } = require('googleapis');

async function testOAuth2() {
  console.log('🧪 Iniciando prueba de autenticación OAuth2...\n');

  try {
    // 1️⃣ Validar variables de entorno
    console.log('📋 Verificando variables de entorno...');
    const requiredVars = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN'];
    
    for (const varName of requiredVars) {
      const value = process.env[varName];
      if (!value) {
        throw new Error(`❌ ${varName} no está definido`);
      }
      const masked = value.substring(0, 10) + '...' + value.substring(value.length - 5);
      console.log(`✅ ${varName}: ${masked}`);
    }

    // 2️⃣ Crear OAuth2Client
    console.log('\n🔐 Creando OAuth2Client...');
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI || 'https://developers.google.com/oauthplayground'
    );
    console.log('✅ OAuth2Client creado');

    // 3️⃣ Configurar refresh token
    console.log('\n🔑 Configurando refresh token...');
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN.trim(),
    });
    console.log('✅ Refresh token configurado');

    // 4️⃣ Obtener access token
    console.log('\n🔄 Obteniendo access token...');
    const { token: accessToken, res } = await oauth2Client.getAccessToken();
    
    if (!accessToken) {
      throw new Error('No se pudo obtener el access token');
    }
    console.log(`✅ Access token obtenido: ${accessToken.substring(0, 20)}...`);

    // 5️⃣ Verificar scopes
    console.log('\n🔍 Verificando scopes...');
    const userInfo = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
    console.log(`✅ Usuario verificado: ${userInfo.data.email}`);

    // 6️⃣ Verificar acceso a Gmail API
    console.log('\n📧 Verificando acceso a Gmail API...');
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const profile = await gmail.users.getProfile({ userId: 'me' });
    console.log(`✅ Acceso a Gmail API confirmado`);
    console.log(`   - Email: ${profile.data.emailAddress}`);
    console.log(`   - Mensajes totales: ${profile.data.messagesTotal}`);

    console.log('\n✅ ✅ ✅ TODAS LAS PRUEBAS PASARON ✅ ✅ ✅');
    console.log('\nTu configuración OAuth2 es válida y lista para enviar correos.');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    
    if (error.message.includes('invalid_grant')) {
      console.error('\n💡 Solución: El refresh token ha expirado.');
      console.error('   1. Ve a: https://myaccount.google.com/permissions');
      console.error('   2. Revoca el acceso a "Google OAuth Playground"');
      console.error('   3. Genera un nuevo refresh token en: https://developers.google.com/oauthplayground/');
    }
    
    if (error.message.includes('401')) {
      console.error('\n💡 Solución: Credenciales inválidas.');
      console.error('   Verifica que GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET sean correctos.');
    }
    
    process.exit(1);
  }
}

testOAuth2();
