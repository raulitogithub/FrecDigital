/**
 * Rate Limiting simple en memoria para proteger APIs
 * En producción, usar Redis o similar
 */

const requestCounts = new Map();
const cleanupInterval = 60000; // Limpiar cada minuto

// Limpiar registos antiguos cada minuto
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of requestCounts.entries()) {
    if (now - data.firstRequest > 3600000) { // 1 hora
      requestCounts.delete(key);
    }
  }
}, cleanupInterval);

/**
 * Middleware de rate limiting
 * @param {Request} request - Next.js request object
 * @param {number} maxRequests - Máximo de requests permitidos
 * @param {number} windowMs - Ventana de tiempo en milisegundos (default: 15 minutos)
 * @returns {Object} - { allowed: boolean, remaining: number, retryAfter: number }
 */
export function checkRateLimit(request, maxRequests = 10, windowMs = 900000) {
  // Obtener identificador del cliente (IP o sesión)
  const clientId = getClientId(request);
  const now = Date.now();
  
  if (!requestCounts.has(clientId)) {
    requestCounts.set(clientId, {
      count: 1,
      firstRequest: now,
      resetTime: now + windowMs
    });
    return { allowed: true, remaining: maxRequests - 1, retryAfter: null };
  }
  
  const data = requestCounts.get(clientId);
  
  // Si la ventana expiró, reiniciar
  if (now > data.resetTime) {
    data.count = 1;
    data.firstRequest = now;
    data.resetTime = now + windowMs;
    return { allowed: true, remaining: maxRequests - 1, retryAfter: null };
  }
  
  // Si alcanzó el límite
  if (data.count >= maxRequests) {
    const retryAfter = Math.ceil((data.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }
  
  // Incrementar contador
  data.count++;
  const remaining = maxRequests - data.count;
  
  return { allowed: true, remaining, retryAfter: null };
}

/**
 * Obtiene identificador único del cliente
 */
function getClientId(request) {
  // Intentar obtener de headers en este orden
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Fallback a user agent (menos ideal pero funciona para desarrollo)
  return request.headers.get('user-agent') || 'unknown';
}

/**
 * Retorna headers de rate limit para la respuesta
 */
export function getRateLimitHeaders(rateLimitData) {
  const headers = new Headers();
  
  if (!rateLimitData.allowed) {
    headers.set('Retry-After', rateLimitData.retryAfter.toString());
  }
  
  headers.set('X-RateLimit-Remaining', rateLimitData.remaining.toString());
  
  return headers;
}
