import { getGmail } from '@/lib/gmail';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit';
import { SECURITY_CONFIG } from '@/lib/security-config';

export async function GET(request) {
  try {
    // 1. Rate limiting
    const rateLimitResult = checkRateLimit(
      request,
      SECURITY_CONFIG.RATE_LIMITS.gmail.maxRequests,
      SECURITY_CONFIG.RATE_LIMITS.gmail.windowMs
    );

    if (!rateLimitResult.allowed) {
      const headers = getRateLimitHeaders(rateLimitResult);
      return Response.json(
        { error: 'Límite de solicitudes alcanzado. Intenta más tarde.' },
        { status: 429, headers }
      );
    }

    // 2. Obtener mensajes de Gmail
    const gmail = getGmail();
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
      q: 'is:unread',
    });

    const messages = response.data.messages || [];

    if (messages.length === 0) {
      return Response.json({ success: true, emails: [] });
    }

    // 3. Procesar cada mensaje
    const emails = await Promise.all(
      messages.map(async (msg) => {
        try {
          const detail = await gmail.users.messages.get({
            userId: 'me',
            id: msg.id,
            format: 'full',
          });

          const headers = detail.data.payload.headers;
          const subject = headers.find(h => h.name === 'Subject')?.value || 'Sin asunto';
          const from = headers.find(h => h.name === 'From')?.value || 'Desconocido';
          const date = headers.find(h => h.name === 'Date')?.value || '';
          const snippet = detail.data.snippet || '';

          return { id: msg.id, subject, from, date, snippet };
        } catch (msgError) {
          console.error(`Error procesando mensaje ${msg.id}:`, msgError.message);
          return null;
        }
      })
    );

    // Filtrar errores
    const validEmails = emails.filter(e => e !== null);

    return Response.json({ success: true, emails: validEmails });

  } catch (error) {
    console.error('Gmail API error:', error.message);
    return Response.json(
      { error: 'Error al acceder a Gmail. Verifica las credenciales.' },
      { status: 500 }
    );
  }
}
