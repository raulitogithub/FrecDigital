import { getOAuth2Client } from '@/lib/gmail';
import { isValidOAuthCode } from '@/lib/security';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit';
import { SECURITY_CONFIG } from '@/lib/security-config';

export async function GET(request) {
  try {
    // 1. Rate limiting
    const rateLimitResult = checkRateLimit(
      request,
      SECURITY_CONFIG.RATE_LIMITS.auth.maxRequests,
      SECURITY_CONFIG.RATE_LIMITS.auth.windowMs
    );

    if (!rateLimitResult.allowed) {
      const headers = getRateLimitHeaders(rateLimitResult);
      return Response.json(
        { success: false, message: 'Demasiados intentos. Intenta más tarde.' },
        { status: 429, headers }
      );
    }

    // 2. Extraer y validar código OAuth
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Manejar errores de OAuth
    if (error) {
      console.error('OAuth error:', error);
      return Response.json(
        { success: false, message: 'Error en autenticación. Contacta al administrador.' },
        { status: 400 }
      );
    }

    if (!code || !isValidOAuthCode(code)) {
      return Response.json(
        { success: false, message: 'Código inválido.' },
        { status: 400 }
      );
    }

    // 3. Intercambiar código por tokens (solo en servidor)
    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens || !tokens.refresh_token) {
      console.error('No refresh token received');
      return Response.json(
        { success: false, message: 'Error al obtener credenciales.' },
        { status: 500 }
      );
    }

    // 4. IMPORTANTE: Guardar refresh_token de forma SEGURA
    // En producción, almacenar encriptado en base de datos, NO devolver al cliente
    // Por ahora, mostrar al usuario para que lo agregue a .env.local manualmente
    
    oauth2Client.setCredentials(tokens);

    // 5. Validar que los tokens funcionan
    const userInfo = await oauth2Client.getAccessToken();
    if (!userInfo.token) {
      throw new Error('No se pudo validar el access token');
    }

    // 6. Retornar respuesta segura SIN exponer el refresh token
    return Response.json({
      success: true,
      message: 'Autenticación exitosa. Copia el refresh_token del servidor y agrégalo a tu .env.local',
      // En producción: guardar refresh_token en base de datos segura, NO devolverlo aquí
      // Por ahora solo devolvemos confirmación de éxito
      authenticated: true
    });

  } catch (error) {
    console.error('OAuth callback error:', error.message);
    return Response.json(
      { success: false, message: 'Error en el proceso de autenticación.' },
      { status: 500 }
    );
  }
}
