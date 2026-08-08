'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Target, Compass } from 'lucide-react';

const gold = '#c9a227';
const navy = '#081539';

const CheckIcon = ({ size = 20 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, borderRadius: '50%', background: gold, flexShrink: 0 }}>
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 12 12" fill="none">
      <path d="M2 6L5 9L10 3" stroke="#081539" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const BulletItem = ({ title, children }) => (
  <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
    <div style={{ marginTop: 3 }}><CheckIcon size={20} /></div>
    <p style={{ color: '#c0d0e8', lineHeight: 1.8, margin: 0 }}>
      {title && <strong style={{ color: '#e8d5a0' }}>{title} </strong>}
      {children}
    </p>
  </li>
);

const pillars = [
  {
    number: 1,
    image: '/images/cortrip-pilar.png',
    title: 'Gobernanza Institucional',
    tags: ['Administración Gerencial', 'Gestión Transparente', 'Seguridad Jurídica'],
    objetivo: 'Acabar con los secretos a puerta cerrada y proteger el patrimonio del socio con reglas claras. Nadie estará por encima de la Corporación.',
    items: [
      { title: null, body: 'Abriremos los libros contables reales y en nuestros primeros 3 meses sabrás exactamente qué pasó con el manejo de nuestros recursos. Cero impunidad, el que le falló al socio, tendrá que responder ante los órganos competentes y la justicia penal civil.' },
      { title: 'Reforma integral del estatuto:', body: 'A fin de fortalecerlo y blindarlo para proteger nuestro patrimonio y el derecho de los socios. Se acabó el abuso de autoridad y las decisiones de solo unos pocos.' },
      { title: null, body: 'Nadie hará "negocios entre amigos" con el dinero de tu familia. Implementaremos reglas estrictas obligatorias para toda compra o contrato. Cerraremos todas las puertas a la corrupción.' },
    ],
  },
  {
    number: 2,
    image: '/images/cortrip-pilar2.png',
    title: 'Sostenibilidad Financiera',
    tags: ['Reingeniería Económica', 'Autogestión Responsable', 'Crecimiento Sostenible'],
    objetivo: 'Optimizar integralmente los recursos económicos y diversificar las fuentes de ingreso, garantizando la solvencia a largo plazo sin incrementar un solo centavo en la cuota mensual del socio.',
    items: [
      { title: 'Disminuiremos inmediatamente las dietas,', body: 'viáticos y gastos innecesarios del Directorio. Ese porcentaje irá directamente al ingreso fijo de nuestra corporación. Ser directivo es un servicio, no un negocio.' },
      { title: 'Sistema contable moderno y transparente:', body: 'Al final del primer semestre. Sabrás exactamente dónde está cada dólar, sin informes maquillados ni secretos a puerta cerrada.' },
      { title: null, body: 'Reactivaremos las sedes en provincias con modelos de autogestión. Al finalizar nuestra administración, cada filial podrá generar rentabilidad sostenible.' },
      { title: null, body: 'Firmaremos alianzas, patrocinios y macro-eventos con marcas externas. Usaremos el sector privado para inyectar plata fresca a la Corporación sin tocar tu bolsillo.' },
    ],
  },
  {
    number: 3,
    image: '/images/cortrip-pilar3.png',
    title: 'Bienestar del Socio',
    tags: ['Bienestar Integral', 'Beneficios Exclusivos', 'Restitución de Derechos', 'Desarrollo Socio-Cultural'],
    objetivo: 'Que el club deje de ser una carga y se convierta en un respaldo real para tu bolsillo y tu familia.',
    items: [
      { title: 'Beneficios sin rogar:', body: 'Reactivaremos de forma progresiva y responsable los créditos, pago de mortuorias y ayudas sociales que hoy te tienen retenidos. Lo que es tuyo, se paga rápido.' },
      { title: 'Cupos de Emergencia (Crédito automático):', body: 'Activo por descuento de rol, sin papeleos: $50 en Víveres, $50 en Farmacias y $20 para Combustible. Un salvavidas real para fin de mes.' },
      { title: 'Comida 20% más barata:', body: 'Se acabó el abuso. Bajaremos los precios de los alimentos y bebidas del club. Venir con tu familia costará menos que comer en la calle.' },
      { title: 'Tu Corporación en tu celular (Cero filas):', body: 'Todos tus trámites, préstamos y reservas serán 100% en línea. Capacitaremos al personal para garantizarte una atención digna y VIP.' },
      { title: 'Reapertura discoteca Neptuno:', body: 'Financiada con los nuevos ingresos del proyecto "Operación Retorno". Eventos 100% con auspiciantes, sin gastar dinero de la corporación.' },
      { title: 'Delivery del Cortrip:', body: 'Activaremos un WhatsApp exclusivo para llevar nuestros platos a tu casa, generando ingresos extra diarios.' },
    ],
  },
  {
    number: 4,
    image: '/images/cortrip-pilar4.png',
    title: 'Operaciones e Infraestructura',
    tags: ['Seguridad Permanente', 'Infraestructura Moderna', 'Excelencia Operativa'],
    objetivo: 'Construir infraestructura de primer nivel y entornos 100% seguros para nuestras familias.',
    items: [
      { title: 'Seguridad Total: Tu tranquilidad no es negociable.', body: 'Blindaremos nuestras instalaciones con monitoreo 24/7 con Inteligencia Artificial, arcos detectores de metales y botones de pánico conectados directamente a la Policía Nacional.' },
      { title: 'Protección Vital: Cuidamos lo que más amas.', body: 'Contarás con un paramédico permanente en el Club Campestre durante todos los fines de semana y feriados, listo para atender cualquier emergencia al instante.' },
      { title: 'Plan Expansión: Instalaciones que te darán orgullo.', body: 'Rehabilitaremos al 100% nuestras canchas y piscinas, construiremos salones de eventos modernos y proyectaremos el gran complejo recreacional del Club Campestre.' },
    ],
  },
  {
    number: 5,
    image: '/images/cortrip-pilar5.png',
    title: 'Innovación y Transformación Digital',
    tags: ['Modernización Tecnológica', 'Digitalización de Vanguardia', 'Expansión Institucional'],
    objetivo: 'Dar el salto tecnológico definitivo para erradicar la burocracia, garantizar transparencia total en los fondos y poner el control de todos tus beneficios directamente en la palma de tu mano.',
    items: [
      { title: 'App "CORTRITO": Tu club en el celular.', body: 'Olvídate de los trámites. Ingresa rápido tus datos, paga tus cuotas sin hacer filas y recibe alertas de eventos en tiempo real.' },
      { title: 'Reservas Inteligentes,', body: 'sin esperas ni favoritismos. Separa canchas, áreas sociales y salones de eventos al instante, desde tu teléfono, con un sistema automático y 100% transparente.' },
      { title: 'Transparencia Total:', body: 'Diseñaremos un portal web que se actualice minuto a minuto para que puedas observar en tiempo real la gestión de nuestra Corporación.' },
      { title: 'Voto Electrónico:', body: 'Implementaremos el voto electrónico para que votes desde cualquier lugar. Nunca más decidirán unos pocos. Participa en asambleas desde tu celular.' },
      { title: 'Atención 24/7 por WhatsApp: Cero burocracia.', body: 'Un canal inteligente y siempre disponible para descargar tus estados de cuenta y resolver tus dudas.' },
    ],
  },
];

export default function PlanMaestroPage() {
  const ctaRef = useRef(null);
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingBtn(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: navy, minHeight: '100vh', color: '#fff', fontFamily: "'Arial', sans-serif" }}>

      {/* BOTÓN FLOTANTE VOLVER */}
      {showFloatingBtn && (
        <Link href="/cortrip" style={{
          position: 'fixed',
          bottom: 28,
          left: 24,
          zIndex: 50,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: gold,
          color: navy,
          fontWeight: 700,
          fontSize: '0.8rem',
          letterSpacing: '0.04em',
          padding: '0.65rem 1.25rem',
          borderRadius: 999,
          textDecoration: 'none',
          boxShadow: `0 4px 20px rgba(201,162,39,0.5)`,
          whiteSpace: 'nowrap',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12 7H2M6 3L2 7l4 4" stroke={navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver al resumen
        </Link>
      )}

      {/* NAV */}
      <div style={{ background: '#050e25', borderBottom: `1px solid ${gold}20`, padding: '0.75rem 1.5rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <Link href="/cortrip" style={{ color: gold, textDecoration: 'none' }}>← Sangre Nueva</Link>
          <span style={{ color: '#5a6a82' }}>/</span>
          <span style={{ color: '#c0d0e8' }}>Plan Maestro</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{
        background: `linear-gradient(160deg, #0d2060 0%, #081539 60%, #050e25 100%)`,
        padding: '4rem 1.5rem 3.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', border: `2px solid ${gold}22`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', border: `2px solid ${gold}15`, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', border: `1px solid ${gold}60`, borderRadius: 999, padding: '0.3rem 1.2rem', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: gold, marginBottom: '1.5rem' }}>
            Estrategia integral de recuperación, modernización y expansión
          </div>
          <h1 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: gold, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '0.4rem' }}>
            Plan Maestro
          </h1>
          <h2 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', color: '#e8d5a0', marginBottom: '1rem' }}>
            "Horizonte 180"
          </h2>
          <div style={{ width: 80, height: 3, background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, margin: '0 auto 1.25rem' }} />
          <p style={{ color: '#8090a8', fontSize: '0.85rem' }}>Presentado por el equipo de trabajo <strong style={{ color: gold }}>Sangre Nueva</strong></p>
        </div>
      </section>

      {/* DIAGNÓSTICO */}
      <section style={{ padding: '4rem 1.5rem', background: '#0a1e50' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: gold, textTransform: 'uppercase', textAlign: 'center', marginBottom: '0.5rem' }}>
            Nuestro Diagnóstico
          </h2>
          <p style={{ textAlign: 'center', color: '#8090a8', marginBottom: '2.5rem', fontSize: '0.9rem', letterSpacing: '0.08em' }}>Identificando el Problema</p>

          <div style={{ display: 'grid', gap: '1px', background: `${gold}30`, border: `1px solid ${gold}30`, borderRadius: 16, overflow: 'hidden' }}>
            {[
              { label: 'El Origen (1969)', text: 'El 21 de julio de 1969 nacimos con un propósito noble: unión, recreación y hermandad naval. Ese fue nuestro pilar de identidad.' },
              { label: 'La Realidad Actual', text: 'Ese propósito se ha desdibujado. Las últimas administraciones han carecido de visión corporativa y ética, generando un déficit financiero, moral y de confianza.' },
              { label: 'El Punto de Quiebre', text: 'Obligaciones pendientes, deudas, servicios deficientes, infraestructura abandonada, y una gestión desconectada de su propósito principal: servir al socio.' },
              { label: 'Nuestra Decisión', text: 'Esta elección no es sobre cargos; es sobre supervivencia institucional. Es momento de un giro de 180 grados.', highlight: true },
            ].map((row) => (
              <div key={row.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px,200px) 1fr', background: row.highlight ? `${gold}12` : '#0a1e50' }}>
                <div style={{ padding: '1.25rem 1.5rem', borderRight: `1px solid ${gold}30`, display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: gold, fontWeight: 700, fontSize: '0.9rem' }}>{row.label}</span>
                </div>
                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center' }}>
                  <p style={{ color: row.highlight ? '#e8d5a0' : '#c0d0e8', lineHeight: 1.7, margin: 0, fontWeight: row.highlight ? 600 : 400 }}>{row.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDENTIDAD */}
      <section style={{ padding: '4rem 1.5rem', background: navy }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: gold, textTransform: 'uppercase', textAlign: 'center', marginBottom: '0.5rem' }}>
            Identidad Corporativa
          </h2>
          <p style={{ textAlign: 'center', color: '#8090a8', marginBottom: '2.5rem', fontSize: '0.9rem', letterSpacing: '0.08em' }}>Definiendo el norte</p>

          <div style={{ background: `${gold}10`, border: `1px solid ${gold}40`, borderRadius: 14, padding: '1.5rem 2rem', marginBottom: '2rem' }}>
            <p style={{ color: '#8090a8', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>¿Qué es Horizonte 180?</p>
            <p style={{ color: '#e8d5a0', lineHeight: 1.8, margin: 0, fontWeight: 600, fontSize: '1.05rem' }}>
              Es un plan maestro de Administración Corporativa diseñado para fortalecer, sanear, modernizar y expandir nuestra Corporación, proyectándola hacia el crecimiento continuo y la autosostenibilidad.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { title: 'Misión', Icon: Target, text: 'Garantizar una gestión transparente y eficiente que asegure el desarrollo financiero y operativo de la Corporación, priorizando el bienestar de sus socios mediante servicios exclusivos, la restitución de derechos adquiridos y el fortalecimiento del sentido de pertenencia de la familia CORTRIP.' },
              { title: 'Visión', Icon: Compass, text: 'Posicionarnos como el modelo de Corporación militar más sólido, moderno y transparente del país y la región, reconocido por su integridad institucional y su capacidad de expansión continua.' },
            ].map((item) => (
              <div key={item.title} style={{ background: '#0d2060', border: `1px solid ${gold}30`, borderRadius: 14, padding: '1.75rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${gold}18`, border: `1px solid ${gold}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <item.Icon size={24} color={gold} strokeWidth={1.5} />
                </div>
                <h3 style={{ color: gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontSize: '1.1rem' }}>{item.title}</h3>
                <p style={{ color: '#c0d0e8', lineHeight: 1.8, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#0d2060', border: `2px solid ${gold}50`, borderRadius: 14, padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#8090a8', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>Objetivo General — Administración "Sangre Nueva"</p>
            <p style={{ color: '#e8d5a0', lineHeight: 1.9, margin: 0, fontStyle: 'italic', fontSize: '1.05rem' }}>
              "Transformar la Corporación de Tripulación de la Armada en una institución financieramente autosostenible, jurídicamente blindada y tecnológicamente avanzada; garantizando la restitución de derechos, el bienestar integral y el orgullo de la familia naval mediante un modelo de alta gerencia y transparencia absoluta."
            </p>
          </div>
        </div>
      </section>

      {/* MODELO DE GESTIÓN intro */}
      <section style={{ padding: '3rem 1.5rem 2rem', background: '#0a1e50', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: gold, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Modelo de Gestión
          </h2>
          <p style={{ color: '#8090a8', marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '0.08em' }}>Los 5 Pilares Estratégicos</p>
          <p style={{ color: '#c0d0e8', lineHeight: 1.8, maxWidth: 700, margin: '0 auto 2rem' }}>
            Para pasar de las promesas a los hechos, hemos consolidado nuestro modelo de gestión en <strong style={{ color: '#e8d5a0' }}>5 Pilares de Alta Gerencia</strong>, cada uno con objetivos claros, medibles y sustentables.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {pillars.map((p) => (
              <div key={p.number} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff08', border: `1px solid ${gold}30`, borderRadius: 999, padding: '0.4rem 1rem' }}>
                <span style={{ color: gold, fontWeight: 700, fontSize: '0.8rem' }}>{p.number}</span>
                <span style={{ color: '#c0d0e8', fontSize: '0.8rem' }}>{p.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section style={{ padding: '1rem 1.5rem 4rem', background: '#0a1e50' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {pillars.map((pilar) => (
            <div key={pilar.number} style={{ border: `1px solid ${gold}30`, borderRadius: 16, overflow: 'hidden' }}>

              {/* Banner */}
              <div style={{ display: 'grid', gridTemplateColumns: pilar.image ? '1fr 1.4fr' : '1fr', minHeight: 140 }}>
                {pilar.image && (
                  <div style={{ position: 'relative', minHeight: 140 }}>
                    <Image
                      src={pilar.image}
                      alt={`Pilar ${pilar.number} - ${pilar.title}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 70%, #0d2060 100%)' }} />
                  </div>
                )}
                <div style={{ background: 'linear-gradient(135deg, #0d2060, #0a1845)', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: navy, fontWeight: 900, fontSize: '1rem' }}>{pilar.number}</span>
                    </div>
                    <div>
                      <p style={{ color: gold, fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>Pilar Estratégico {pilar.number}</p>
                      <h3 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.2 }}>{pilar.title}</h3>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {pilar.tags.map((tag) => (
                      <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#ffffff10', border: `1px solid ${gold}40`, borderRadius: 999, padding: '0.2rem 0.6rem', fontSize: '0.6rem', letterSpacing: '0.1em', color: gold, textTransform: 'uppercase' }}>
                        <CheckIcon size={12} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div style={{ background: navy, padding: '2rem' }}>
                <p style={{ color: '#e8d5a0', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>
                  <strong>Objetivo:</strong> {pilar.objetivo}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {pilar.items.map((item, i) => (
                    <BulletItem key={i} title={item.title}>{item.body}</BulletItem>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PACTO FINAL */}
      <section style={{ overflow: 'hidden' }}>
        <div style={{ background: `linear-gradient(160deg, #0d2060 0%, #081539 100%)`, padding: '3rem 1.5rem 2rem', textAlign: 'center', borderTop: `1px solid ${gold}30` }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '0.5rem' }}>Nuestro Pacto de Cumplimiento</p>
          <h2 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(1.2rem, 3.5vw, 2rem)', color: '#fff', margin: 0, lineHeight: 1.3, textTransform: 'uppercase' }}>
            El Compromiso con el Socio
          </h2>
          <div style={{ width: 80, height: 2, background: gold, margin: '1rem auto 0' }} />
        </div>

        <div style={{ background: `linear-gradient(160deg, #0d2060, #050e25)`, padding: '3rem 1.5rem 4rem', borderTop: `1px solid ${gold}30` }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {[
                'No venimos a pedirte un voto de fe, venimos a firmar un contrato de resultados.',
                'Horizonte 180 está diseñado para ejecutarse a corto, mediano y largo plazo, reinvirtiendo cada ganancia para no afectar la economía del socio.',
                'Somos la "Sangre Nueva". Tenemos la capacidad técnica, la energía de un navío y, sobre todo, la integridad moral para devolverle la grandeza a nuestra Corporación.',
                'El cambio no es una opción, es una obligación.',
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <CheckIcon size={22} />
                  <p style={{ color: i === 3 ? '#e8d5a0' : '#c0d0e8', lineHeight: 1.8, margin: 0, fontWeight: i === 3 ? 700 : 400 }}>{text}</p>
                </div>
              ))}
            </div>

            <div style={{ background: `${gold}15`, border: `2px solid ${gold}60`, borderRadius: 14, padding: '1.5rem 2rem', textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ color: gold, fontWeight: 700, fontSize: '1.1rem', margin: 0, fontStyle: 'italic' }}>
                Únete a nuestra convicción. Vota por Horizonte 180. Vota por la Sangre Nueva.
              </p>
            </div>

            <div ref={ctaRef} style={{ textAlign: 'center' }}>
              <Link href="/cortrip" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: gold,
                color: navy,
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.04em',
                padding: '0.65rem 1.25rem',
                borderRadius: 999,
                textDecoration: 'none',
                boxShadow: `0 4px 20px rgba(201,162,39,0.5)`,
                whiteSpace: 'nowrap',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M12 7H2M6 3L2 7l4 4" stroke={navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Volver al resumen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '1.5rem', background: '#050e25', textAlign: 'center', borderTop: `1px solid ${gold}20` }}>
        <p style={{ color: '#5a6a82', fontSize: '0.75rem', margin: 0 }}>
          Horizonte 180 · Sangre Nueva · CORTRIP &nbsp;|&nbsp;
          <span style={{ color: gold }}>Hecho con ❤ por FrecDigital</span>
        </p>
      </footer>
    </div>
  );
}
