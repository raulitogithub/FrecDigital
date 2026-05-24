import { getOAuth2Client } from '@/lib/gmail';
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
      return new Response(
        'Demasiados intentos. Intenta más tarde.',
        { 
          status: 429, 
          headers,
          statusText: 'Too Many Requests'
        }
      );
    }

    // 2. Generar URL de autorización OAuth
    const oauth2Client = getOAuth2Client();
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.modify',
      ],
      prompt: 'consent', // Siempre pedir consentimiento
    });

    return Response.redirect(url);

  } catch (error) {
    console.error('OAuth initiation error:', error.message);
    // Redirigir a página de error en lugar de mostrar error en API
    return Response.redirect(`/?error=auth_failed`);
  }
}
