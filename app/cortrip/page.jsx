'use client';

const gold = '#c9a227';
const navy = '#081539';

const CheckIcon = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: gold, flexShrink: 0 }}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7L5.5 10L11.5 4" stroke="#081539" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const SectionTitle = ({ children, center }) => (
  <h2 style={{
    fontFamily: "'Georgia', serif",
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
    color: gold,
    textAlign: center ? 'center' : 'left',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    marginBottom: '0.5rem',
    lineHeight: 1.2,
  }}>
    {children}
  </h2>
);

const Divider = ({ center }) => (
  <div style={{ display: 'flex', justifyContent: center ? 'center' : 'flex-start', marginBottom: '1.5rem' }}>
    <div style={{ width: 80, height: 3, background: `linear-gradient(90deg, ${gold}, transparent)` }} />
  </div>
);

export default function CortripPage() {
  return (
    <div style={{ background: navy, minHeight: '100vh', color: '#fff', fontFamily: "'Arial', sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{
        background: `linear-gradient(160deg, #0d2060 0%, #081539 50%, #050e25 100%)`,
        padding: '4rem 1.5rem 3rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative ring */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', border: `2px solid ${gold}22`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', border: `2px solid ${gold}15`, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            border: `1px solid ${gold}60`,
            borderRadius: 999,
            padding: '0.3rem 1.2rem',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: gold,
            marginBottom: '1.5rem',
          }}>
            Corporación de Tripulantes del Ecuador
          </div>

          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            color: gold,
            textTransform: 'uppercase',
            lineHeight: 1,
            marginBottom: '0.4rem',
          }}>
            Horizonte 180
          </h1>

          <p style={{
            fontFamily: "'Georgia', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#e8d5a0',
            marginBottom: '1.5rem',
            letterSpacing: '0.08em',
          }}>
            Sangre Nueva
          </p>

          <div style={{ width: 120, height: 2, background: gold, margin: '0 auto 2rem' }} />

          {/* Emblem placeholder */}
          <div style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            border: `4px solid ${gold}`,
            background: 'radial-gradient(circle at 40% 35%, #1a3a7a, #050e25)',
            margin: '0 auto 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 40px ${gold}40`,
          }}>
            <span style={{ fontSize: '2.5rem' }}>⚓</span>
            <p style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: gold, textTransform: 'uppercase', marginTop: 4, textAlign: 'center', lineHeight: 1.4 }}>
              SANGRE NUEVA<br />HORIZONTE 180
            </p>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            fontWeight: 700,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '0.5rem',
          }}>
            No más excusas.
          </h2>
          <p style={{ color: '#c0c8d8', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.9rem' }}>
            Llegó la hora de ordenar nuestra casa.
          </p>

          {/* Quote */}
          <div style={{
            marginTop: '2.5rem',
            background: '#ffffff08',
            border: `1px solid ${gold}30`,
            borderLeft: `4px solid ${gold}`,
            borderRadius: '0 12px 12px 0',
            padding: '1.2rem 1.5rem',
            maxWidth: 560,
            margin: '2.5rem auto 0',
            textAlign: 'left',
          }}>
            <p style={{ fontStyle: 'italic', color: '#e8d5a0', fontSize: '1rem', lineHeight: 1.7 }}>
              "La Corporación no necesita promesas. Necesita liderazgo, transparencia y resultados."
            </p>
          </div>
        </div>
      </section>

      {/* ── ¿POR QUÉ NACE SANGRE NUEVA? ── */}
      <section style={{ padding: '4rem 1.5rem', background: '#0a1e50' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <SectionTitle center>¿Por qué nace Sangre Nueva?</SectionTitle>
          <Divider center />
          <p style={{ color: '#c0d0e8', lineHeight: 1.9, fontSize: '1.05rem', textAlign: 'justify' }}>
            Después de escuchar durante años las necesidades de nuestros compañeros, entendimos que la
            Corporación necesita recuperar la confianza, fortalecer sus finanzas y volver a servir a sus socios.
            Sangre Nueva representa un liderazgo cercano, transparente y comprometido con resultados reales.
          </p>
        </div>
      </section>

      {/* ── PLAN DE ACCIÓN ── */}
      <section style={{ padding: '4rem 1.5rem', background: navy }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <SectionTitle center>Plan de Acción</SectionTitle>
          <Divider center />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '1rem' }}>

            {/* Bloque 1 */}
            <div style={{
              background: '#0d2060',
              border: `1px solid ${gold}40`,
              borderRadius: 16,
              padding: '2rem',
            }}>
              <div style={{
                background: gold,
                borderRadius: 8,
                padding: '0.6rem 1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8L6 12L14 4" stroke="#081539" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: navy, fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Recuperar la Confianza del Socio
                </span>
              </div>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Pondremos el cargo a disposición de la asamblea de socios si no alcanzamos nuestros objetivos.',
                  'Reduciremos inmediatamente las dietas, viáticos y comisiones de toda la directiva.',
                  'Disminuiremos los costos en servicios de bebidas y comida hasta un 20%.',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ color: gold, fontWeight: 700, fontSize: '1rem', lineHeight: 1.6, flexShrink: 0 }}>{i + 1}.</span>
                    <p style={{ color: '#c0d0e8', lineHeight: 1.7, margin: 0 }}>{item}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Bloque 2 */}
            <div style={{
              background: '#0d2060',
              border: `1px solid ${gold}40`,
              borderRadius: 16,
              padding: '2rem',
            }}>
              <div style={{
                background: gold,
                borderRadius: 8,
                padding: '0.6rem 1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8L6 12L14 4" stroke="#081539" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: navy, fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Administración Eficiente
                </span>
              </div>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Plan 180 Días: En 6 meses recuperaremos la estabilidad financiera de la CORTRIP y frenaremos el despilfarro.',
                  'Auditoría Forense: Rastrearemos tus aportes. Te entregaremos los números reales, sin excusas ni maquillaje.',
                  'Cero Impunidad: Si hubo fraude o malversación, habrá denuncia penal. Con tu dinero no se juega.',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ color: gold, fontWeight: 700, fontSize: '1rem', lineHeight: 1.6, flexShrink: 0 }}>{i + 4}.</span>
                    <p style={{ color: '#c0d0e8', lineHeight: 1.7, margin: 0 }}>{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPROMISOS ── */}
      <section style={{ padding: '4rem 1.5rem', background: '#0a1e50' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <SectionTitle center>Compromisos</SectionTitle>
          <Divider center />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
            {[
              'Tolerancia cero al fraude',
              'Rendición permanente de cuentas',
              'Transparencia total',
              'Actualización y registro de socios',
              'Reforma del estatuto',
            ].map((item) => (
              <div key={item} style={{
                background: '#ffffff08',
                border: `1px solid ${gold}40`,
                borderRadius: 12,
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textAlign: 'left',
              }}>
                <CheckIcon />
                <span style={{ color: '#e8d5a0', fontWeight: 600, fontSize: '0.95rem' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div style={{
            marginTop: '2.5rem',
            background: '#ffffff08',
            border: `1px solid ${gold}30`,
            borderLeft: `4px solid ${gold}`,
            borderRadius: '0 12px 12px 0',
            padding: '1.2rem 1.5rem',
            textAlign: 'left',
          }}>
            <p style={{ fontStyle: 'italic', color: '#e8d5a0', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
              "No te pedimos un voto de confianza, te presentamos un plan para ganarnos esa confianza."
            </p>
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS PARA LOS SOCIOS ── */}
      <section style={{ padding: '4rem 1.5rem', background: navy }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <SectionTitle center>Beneficios para los Socios</SectionTitle>
          <Divider center />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                title: 'Reactivación de beneficios sociales',
                desc: 'Reactivaremos inmediatamente el pago de los beneficios sociales mediante un cronograma efectivo, progresivo y responsable.',
                icon: '🏥',
              },
              {
                title: 'Fin a los bloqueos injustificados',
                desc: 'Levantaremos el bloqueo de los socios impedidos de ingresar a las instalaciones por deudas injustificadas.',
                icon: '🔓',
              },
              {
                title: 'Vuelve tu crédito de consumo',
                desc: 'Reactivaremos los créditos de consumo interno y te aumentaremos el cupo progresivamente.',
                icon: '💳',
              },
              {
                title: 'Agente virtual CORTRITO',
                desc: 'Presentaremos el Agente virtual CORTRITO para que los socios tengan la información de CORTRIP en sus manos desde el celular.',
                icon: '🤖',
              },
            ].map((benefit) => (
              <div key={benefit.title} style={{
                background: '#0d2060',
                border: `1px solid ${gold}30`,
                borderRadius: 16,
                padding: '1.75rem',
                transition: 'border-color 0.3s',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{benefit.icon}</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <CheckIcon />
                  <h3 style={{ color: gold, fontWeight: 700, fontSize: '1rem', margin: 0, lineHeight: 1.4 }}>
                    {benefit.title}
                  </h3>
                </div>
                <p style={{ color: '#c0d0e8', lineHeight: 1.7, margin: 0, fontSize: '0.92rem' }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '4rem 1.5rem',
        background: `linear-gradient(160deg, #0d2060 0%, #050e25 100%)`,
        textAlign: 'center',
        borderTop: `1px solid ${gold}30`,
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: gold,
            marginBottom: '0.75rem',
          }}>
            Antes de decidir tu voto
          </p>
          <h2 style={{
            fontFamily: "'Georgia', serif",
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            color: '#fff',
            marginBottom: '1.5rem',
            lineHeight: 1.3,
          }}>
            Conoce nuestro plan completo
          </h2>
          <p style={{ color: '#c0d0e8', lineHeight: 1.8, marginBottom: '2rem' }}>
            Escanea el código QR o comparte este enlace con tus compañeros socios.
            La CORTRIP merece un cambio real, con liderazgo, transparencia y resultados.
          </p>

          {/* QR Code */}
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: 12,
            display: 'inline-block',
            margin: '0 auto 2rem',
            boxShadow: `0 0 30px ${gold}30`,
          }}>
            <img
              src="/images/codigo-QR.jpeg"
              alt="Código QR - Escanea e interactúa"
              style={{ width: 160, height: 160, display: 'block' }}
            />
          </div>

          <p style={{ color: '#8090a8', fontSize: '0.8rem' }}>
            frecdigital.com/cortrip
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '1.5rem',
        background: '#050e25',
        textAlign: 'center',
        borderTop: `1px solid ${gold}20`,
      }}>
        <p style={{ color: '#5a6a82', fontSize: '0.75rem', margin: 0 }}>
          Horizonte 180 · Sangre Nueva · CORTRIP &nbsp;|&nbsp;
          <span style={{ color: gold }}>Hecho con ❤ por FrecDigital</span>
        </p>
      </footer>
    </div>
  );
}
