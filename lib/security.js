// Sanitización y validación de seguridad
import DOMPurify from 'isomorphic-dompurify';

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
 * Valida datos del formulario de contacto
 */
export function validateContactForm(data) {
  const errors = [];
  
  // Validar nombre
  if (!data.fullName || typeof data.fullName !== 'string') {
    errors.push('Nombre es requerido');
  } else if (data.fullName.length < 2 || data.fullName.length > 100) {
    errors.push('Nombre debe tener entre 2 y 100 caracteres');
  }
  
  // Validar email
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Email válido es requerido');
  }
  
  // Validar empresa (opcional pero con límites)
  if (data.company && data.company.length > 100) {
    errors.push('Empresa no debe exceder 100 caracteres');
  }
  
  // Validar servicio
  const validServices = ['web', 'mobile', 'consulting', 'other'];
  if (!data.service || !validServices.includes(data.service)) {
    errors.push('Servicio inválido');
  }
  
  // Validar mensaje
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Mensaje es requerido');
  } else if (data.message.length < 10 || data.message.length > 5000) {
    errors.push('Mensaje debe tener entre 10 y 5000 caracteres');
  }
  
  return { isValid: errors.length === 0, errors };
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
