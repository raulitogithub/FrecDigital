'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Clock, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Button from './ui/Button';
import { handleContactForm } from "@/app/actions/lib-email";
import { company } from '@/lib/seo-metadata';
import { contactFormSchema, CONTACT_COUNTRIES, CONTACT_SERVICES, HONEYPOT_FIELD, CONSENT_TEXTS } from '@/lib/contact-schema';

const PRIVACY_LINK_TEXT = 'política de privacidad';
import { services } from '@/lib/services';

const GENERIC_ERROR = 'Ocurrió un error al enviar. Por favor intenta de nuevo.';

// Si se despliega una versión nueva de la web mientras el visitante tiene la página
// abierta, la Server Action de su página ya no existe en el servidor ("Failed to find
// Server Action"). En ese caso se guarda lo escrito, se recarga la página una sola vez
// y se devuelve al formulario. Las casillas de consentimiento no se restauran: el
// visitante las vuelve a marcar.
const DRAFT_KEY = 'frecdigital:contact-draft';
const RELOADED_AT_KEY = 'frecdigital:contact-reloaded-at';
const DRAFT_FIELDS = ['fullName', 'email', 'company', 'country', 'service', 'message'];
const STALE_DEPLOYMENT_ERROR = /Server Action|failed-to-find-server-action|was not found on the server/i;
const RECOVERED_NOTICE =
  'La web se acaba de actualizar y hemos recuperado lo que escribiste. Marca de nuevo la casilla de privacidad y pulsa «Enviar consulta».';

function readStorage(key) {
  try { return window.sessionStorage.getItem(key); } catch { return null; }
}
function writeStorage(key, value) {
  try { window.sessionStorage.setItem(key, value); return true; } catch { return false; }
}
function removeStorage(key) {
  try { window.sessionStorage.removeItem(key); } catch { /* sin almacenamiento: nada que borrar */ }
}

// Si el error viene de una página de una versión anterior, guarda lo escrito y recarga
// (una sola vez cada 2 minutos, para no entrar en bucle). Devuelve true si recarga.
function recoverFromStaleDeployment(error, data) {
  if (!STALE_DEPLOYMENT_ERROR.test(error?.message || '')) return false;
  const now = Date.now();
  if (now - (Number(readStorage(RELOADED_AT_KEY)) || 0) < 2 * 60 * 1000) return false;
  const values = Object.fromEntries(DRAFT_FIELDS.map((field) => [field, data[field] ?? '']));
  const saved =
    writeStorage(DRAFT_KEY, JSON.stringify({ at: now, values })) &&
    writeStorage(RELOADED_AT_KEY, String(now));
  if (!saved) return false;
  window.location.reload();
  return true;
}

// Borrador guardado antes de la recarga (si tiene menos de 10 minutos); se consume al leerlo.
function takeRecentDraft() {
  const raw = readStorage(DRAFT_KEY);
  if (!raw) return null;
  removeStorage(DRAFT_KEY);
  try {
    const draft = JSON.parse(raw);
    return Date.now() - draft.at <= 10 * 60 * 1000 ? draft.values : null;
  } catch {
    return null;
  }
}
const selectClassName =
  'w-full px-4 py-3 rounded-lg border-2 border-white/15 focus:border-[#00b4d8] focus:outline-none transition-all bg-white/8 backdrop-blur-md text-white placeholder-white/30 focus:bg-white/12 focus:shadow-lg focus:shadow-[#00b4d8]/20 appearance-none pr-10';

function SelectChevron() {
  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | loading | success | error
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { country: '', service: '', privacy: false, marketing: false, [HONEYPOT_FIELD]: '' },
  });

  // Preselección desde otras páginas: /?servicio=<slug>#contact (páginas de servicio)
  // y /?pais=ecuador#contact (landing de Ecuador)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('servicio');
    const service = services.find((s) => s.slug === slug);
    if (service) setValue('service', service.title);
    else if (slug === 'academias') setValue('service', 'Plataforma para academias');
    else if (slug === 'arm' || slug === 'crm') setValue('service', 'ARM FrecDigital');
    const country = { ecuador: 'Ecuador', espana: 'España' }[params.get('pais')];
    if (country) setValue('country', country);
  }, [setValue]);

  // Tras la recarga por versión nueva: devolver al formulario lo que el visitante escribió
  useEffect(() => {
    const values = takeRecentDraft();
    if (!values) return;
    for (const field of DRAFT_FIELDS) {
      if (typeof values[field] === 'string') setValue(field, values[field]);
    }
    setError('root.recovered', { type: 'recovered', message: RECOVERED_NOTICE });
    document.getElementById('contact')?.scrollIntoView({ block: 'start' });
  }, [setValue, setError]);

  const contactInfo = [
    { icon: Mail, label: 'Email', value: company.email },
  ];
  
  const onSubmit = async (data) => {
  setSubmitStatus('loading');
  clearErrors('root.recovered');
  try {
    const result = await handleContactForm(data);
    if (result.success) {
      setSubmitStatus('success');
      setSubmitMessage('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
      reset();
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    } else {
      setSubmitStatus('error');
      setSubmitMessage(result.message || GENERIC_ERROR);
    }
  } catch (error) {
    // Página de una versión anterior de la web: se guarda lo escrito y se recarga
    if (recoverFromStaleDeployment(error, data)) return;
    setSubmitStatus('error');
    setSubmitMessage(GENERIC_ERROR);
  }
};


  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent" />

      {/* Fondo con imagen local */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/fondo7.webp)',
        }}
      />
      
      {/* Overlay oscuro cálido */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#1a3a6b]/70 to-[#0a1628]/80" />
      <div className="absolute inset-0 dot-pattern-dark opacity-15" />

      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b4d8]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00b4d8]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-[#00b4d8]/40 rounded-full text-sm font-semibold text-[#00b4d8] backdrop-blur-sm">
              Hablemos de tu proyecto
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            ¿Listo para impulsar tu negocio con <span className="text-[#00b4d8]">IA</span>?
          </h2>

          {/* Línea decorativa */}
          <div className="w-16 h-1 bg-[#00b4d8] rounded-full mx-auto mt-4 mb-6" />

          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Completa el formulario y nuestro equipo se pondrá en contacto contigo pronto
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Nombre completo *
                </label>
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-lg border-2 border-white/15 focus:border-[#00b4d8] focus:outline-none transition-all bg-white/8 backdrop-blur-md text-white placeholder-white/30 focus:bg-white/12 focus:shadow-lg focus:shadow-[#00b4d8]/20"
                />
                {errors.fullName && (
                  <p className="text-red-300 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Correo electrónico *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-lg border-2 border-white/15 focus:border-[#00b4d8] focus:outline-none transition-all bg-white/8 backdrop-blur-md text-white placeholder-white/30 focus:bg-white/12 focus:shadow-lg focus:shadow-[#00b4d8]/20"
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Empresa / Organización
                </label>
                <input
                  {...register('company')}
                  type="text"
                  placeholder="Tu empresa"
                  className="w-full px-4 py-3 rounded-lg border-2 border-white/15 focus:border-[#00b4d8] focus:outline-none transition-all bg-white/8 backdrop-blur-md text-white placeholder-white/30 focus:bg-white/12 focus:shadow-lg focus:shadow-[#00b4d8]/20"
                />
              </div>

              {/* Country Select */}
              <div>
                <label htmlFor="contact-country" className="block text-sm font-semibold text-white/80 mb-2">
                  País *
                </label>
                <div className="relative">
                  <select id="contact-country" {...register('country')} className={selectClassName}>
                    <option value="" className="bg-[#0a1628] text-white">Selecciona un país</option>
                    {CONTACT_COUNTRIES.map((country) => (
                      <option key={country} value={country} className="bg-[#0a1628] text-white">
                        {country}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
                {errors.country && (
                  <p className="text-red-300 text-sm mt-1">{errors.country.message}</p>
                )}
              </div>

              {/* Service Select */}
              <div>
                <label htmlFor="contact-service" className="block text-sm font-semibold text-white/80 mb-2">
                  Servicio de interés *
                </label>
                <div className="relative">
                  <select id="contact-service" {...register('service')} className={selectClassName}>
                    <option value="" className="bg-[#0a1628] text-white">Selecciona un servicio</option>
                    {CONTACT_SERVICES.map((service) => (
                      <option key={service} value={service} className="bg-[#0a1628] text-white">
                        {service}
                      </option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
                {errors.service && (
                  <p className="text-red-300 text-sm mt-1">{errors.service.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">
                  Mensaje / Descripción del proyecto *
                </label>
                <textarea
                  {...register('message')}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border-2 border-white/15 focus:border-[#00b4d8] focus:outline-none transition-all resize-none bg-white/8 backdrop-blur-md text-white placeholder-white/30 focus:bg-white/12 focus:shadow-lg focus:shadow-[#00b4d8]/20"
                />
                {errors.message && (
                  <p className="text-red-300 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Campo trampa antispam: fuera de pantalla, sin foco y oculto a lectores de pantalla.
                  Las personas no lo ven; los bots que rellenan todo, sí (ver app/actions/lib-email.js). */}
              <div aria-hidden="true" className="absolute -left-[10000px] top-auto w-px h-px overflow-hidden">
                <label htmlFor="contact-website">No rellenes este campo</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register(HONEYPOT_FIELD)}
                />
              </div>

              {/* Privacy consent (obligatorio) */}
              <div>
                <label htmlFor="contact-privacy" className="flex items-start gap-3 cursor-pointer text-sm text-white/80">
                  <input
                    id="contact-privacy"
                    type="checkbox"
                    {...register('privacy')}
                    className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-2 border-white/30 bg-white/10 accent-[#00b4d8] cursor-pointer"
                  />
                  <span>
                    {/* Texto de CONSENT_TEXTS.privacy, con "política de privacidad" como enlace */}
                    {CONSENT_TEXTS.privacy.replace(PRIVACY_LINK_TEXT, '')}
                    <Link
                      href="/privacidad"
                      target="_blank"
                      className="text-[#00b4d8] underline underline-offset-2 hover:text-white"
                    >
                      {PRIVACY_LINK_TEXT}
                    </Link>{' '}
                    *
                  </span>
                </label>
                {errors.privacy && (
                  <p className="text-red-300 text-sm mt-1">{errors.privacy.message}</p>
                )}

                {/* Consentimiento comercial: opcional, separado y sin marcar por defecto (LSSI art. 21, RGPD) */}
                <label htmlFor="contact-marketing" className="mt-3 flex items-start gap-3 cursor-pointer text-sm text-white/80">
                  <input
                    id="contact-marketing"
                    type="checkbox"
                    {...register('marketing')}
                    className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-2 border-white/30 bg-white/10 accent-[#00b4d8] cursor-pointer"
                  />
                  <span>{CONSENT_TEXTS.marketing}</span>
                </label>
                {/* La información de protección de datos está en /privacidad, enlazada en la casilla.
                    TODO(profesional): confirmar que basta con el enlace en el punto de recogida
                    (la AEPD recomienda además una primera capa informativa junto al formulario). */}
              </div>

              {/* Aviso tras recuperar el borrador por una versión nueva de la web */}
              {errors.root?.recovered && (
                <div role="status" className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 flex items-start gap-3 shadow-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-900">{errors.root.recovered.message}</p>
                </div>
              )}

              {/* Submit Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start gap-3 shadow-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-green-800">{submitMessage}</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3 shadow-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800">{submitMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  variant="accent"
                  size="lg"
                  className="w-full justify-center gap-2 font-semibold shadow-lg shadow-[#00b4d8]/30"
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Consulta
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">
                Información de Contacto
              </h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Nos encantaría escuchar sobre tu proyecto y cómo podemos ayudarte a alcanzar tus objetivos con IA.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, ease: 'easeOut' }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/8 backdrop-blur-md border border-white/15 hover:border-[#00b4d8]/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1a3a6b] to-[#0f2847] rounded-lg flex items-center justify-center flex-shrink-0 text-white border border-[#00b4d8]/30">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-[#00b4d8] font-semibold uppercase tracking-wide">
                      {info.label}
                    </p>
                    <p className="text-white font-semibold text-base">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="relative pt-8">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00b4d8] via-[#00b4d8]/50 to-transparent"></div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ease: 'easeOut' }}
                className="bg-white/8 backdrop-blur-md rounded-xl p-6 border border-[#00b4d8]/25 hover:border-[#00b4d8]/50 transition-all duration-300 flex items-start gap-3"
              >
                <Clock className="w-5 h-5 text-[#00b4d8] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-bold mb-1 font-display">
                    Respuesta rápida garantizada
                  </p>
                  <p className="text-white/60 text-sm">
                    Nuestro equipo se pondrá en contacto contigo en menos de 24 horas en días laborables.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
