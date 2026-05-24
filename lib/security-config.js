/**
 * Configuración centralizada de seguridad
 */

export const SECURITY_CONFIG = {
  // CORS - Solo permitir orígenes autorizados
  ALLOWED_ORIGINS: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'https://frecdigital.com',
    'https://www.frecdigital.com'
  ],
  
  // Rate Limiting por endpoint
  RATE_LIMITS: {
    contact: { maxRequests: 5, windowMs: 3600000 }, // 5 requests/hora
    auth: { maxRequests: 10, windowMs: 900000 },    // 10 requests/15 minutos
    gmail: { maxRequests: 20, windowMs: 3600000 }   // 20 requests/hora
  },
  
  // Validación de entrada
  MAX_INPUT_LENGTHS: {
    name: 100,
    email: 254,
    company: 100,
    service: 50,
    message: 5000
  },
  
  // Headers de seguridad
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  }
};

/**
 * Valida que el origen está autorizado
 */
export function isOriginAllowed(origin) {
  if (!origin) return false;
  return SECURITY_CONFIG.ALLOWED_ORIGINS.some(allowed => {
    // Soporte para wildcard en desarrollo
    if (allowed.includes('*')) {
      const pattern = allowed.replace(/\*/g, '.*');
      return new RegExp(`^${pattern}$`).test(origin);
    }
    return origin === allowed;
  });
}

/**
 * Obtiene headers CORS permitidos
 */
export function getCorsHeaders(origin) {
  if (isOriginAllowed(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    };
  }
  return {};
}
