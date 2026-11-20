// Esquema del formulario de contacto, compartido por el navegador
// (react-hook-form) y la Server Action: las mismas reglas en los dos lados.
import { z } from 'zod';
import { services } from '@/lib/services';

export const CONTACT_COUNTRIES = ['España', 'Ecuador', 'Otro'];
export const CONTACT_SERVICES = [...services.map((s) => s.title), 'CRM FrecDigital', 'Plataforma para academias', 'Otros'];

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  email: z
    .string()
    .trim()
    .max(254, 'El email es demasiado largo')
    .email('Por favor ingresa un email válido'),
  company: z.string().trim().max(100, 'La empresa no puede exceder 100 caracteres').optional(),
  country: z.enum(CONTACT_COUNTRIES, { error: 'Por favor selecciona un país' }),
  service: z.enum(CONTACT_SERVICES, { error: 'Por favor selecciona un servicio' }),
  message: z
    .string()
    .trim()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
  privacy: z.literal(true, { error: 'Debes aceptar la política de privacidad' }),
  // Consentimiento comercial: opcional, separado de la privacidad y sin marcar por defecto.
  marketing: z.boolean().optional().default(false),
  // Campo trampa antispam: invisible para personas. Si llega relleno, es un bot
  // (la Server Action lo descarta en silencio). Sin restricciones aquí para no
  // dar pistas al bot con un mensaje de error.
  website: z.string().optional(),
});

export const HONEYPOT_FIELD = 'website';

// Textos literales de las casillas de consentimiento. Los usan el formulario
// (lo que ve la persona) y el correo de registro (lo que consta que aceptó),
// para que nunca difieran. Si se cambian, cambia lo que se registra.
export const CONSENT_TEXTS = {
  privacy: 'He leído y acepto la política de privacidad',
  marketing: 'Quiero recibir novedades de FrecDigital por email (opcional). Puedes darte de baja cuando quieras.',
};

// Prefijo del asunto del correo, para filtrarlos y etiquetarlos en Gmail.
export const CONTACT_SUBJECT_TAG = '[Contacto web]';
