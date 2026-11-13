// Esquema del formulario de contacto, compartido por el navegador
// (react-hook-form) y la Server Action: las mismas reglas en los dos lados.
import { z } from 'zod';
import { siteMetadata } from '@/lib/seo-metadata';

export const CONTACT_COUNTRIES = ['España', 'Ecuador', 'Otro'];
export const CONTACT_SERVICES = [...siteMetadata.services.map((s) => s.name), 'Otros'];

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
});
