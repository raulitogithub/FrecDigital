// Sanitización y validación de seguridad
// (la validación del formulario de contacto está en lib/contact-schema.js)

/**
 * Valida y sanitiza entrada de formulario
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  // Remover caracteres de control y normalizar
  const normalized = input.trim().normalize('NFKC');
  
  // Escapar caracteres especiales HTML
  const escaped = normalized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
  
  return escaped;
}

/**
 * Valida formato de email
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  // Verificar longitud razonable
  if (email.length > 254) return false;
  
  return isValid;
}

/**
 * Escapa HTML para prevenir XSS en emails
 */
export function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Valida código OAuth
 */
export function isValidOAuthCode(code) {
  if (!code || typeof code !== 'string') return false;
  // Los códigos OAuth típicamente tienen cierta estructura
  if (code.length < 10 || code.length > 500) return false;
  // Validar que solo contenga caracteres válidos
  return /^[a-zA-Z0-9\-_.~]+$/.test(code);
}
