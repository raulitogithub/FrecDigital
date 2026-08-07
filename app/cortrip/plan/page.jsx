'use client';

import Link from 'next/link';

const gold = '#c9a227';
const navy = '#081539';

const CheckIcon = ({ size = 20 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, borderRadius: '50%', background: gold, flexShrink: 0 }}>
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 12 12" fill="none">
      <path d="M2 6L5 9L10 3" stroke="#081539" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const PillarHeader = ({ number, title, tags }) => (
  <div style={{ background: 'linear-gradient(135deg, #0d2060, #0a1845)', borderRadius: '16px 16px 0 0', padding: '1.5rem 2rem', marginBottom: 0 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ color: navy, fontWeight: 900, fontSize: '1.2rem' }}>{number}</span>
      </div>
      <div>
        <p style={{ color: gold, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0, marginBottom: '0.2rem' }}>
          Pilar Estratégico {number}
        </p>
        <h3 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </h3>
      </div>
    </div>
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
      {tags.map(tag => (
        <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#ffffff10', border: `1px solid ${gold}40`, borderRadius: 999, padding: '0.25rem 0.75rem', fontSize: '0.65rem', letterSpacing: '0.12em', color: gold, textTransform: 'uppercase' }}>
          <CheckIcon size={14} /> {tag}
        </span>
      ))}
    </div>
  </div>
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

export default function PlanMaestroPage() {
  return (
    <div style={{ background: navy, minHeight: '100vh', color: '#fff', fontFamily: "'Arial', sans-serif" }}>

      {/* NAV */}
      <div style={{ background: '#050e25', borderBottom: `1px solid ${gold}20`, padding: '0.75rem 1.5rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <Link href="/cortrip" style={{ color: gold, textDecoration: 'none' }}>← Sangre Nueva</Link>
          <span style={{ color: '#5a6a82' }}>/</span>
          <span style={{ color: '#c0d0e8' }}>Plan Maestro</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg, #0d2060 0%, #081539 60%, #050e25 100%)', padding: '3.5rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', border: `1px solid ${gold}60`, borderRadius: 999, padding: '0.3rem 1.2rem', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: gold, marginBottom: '1.2rem' }}>
            Estrategia integral de recuperación, modernización y expansión
          </div>
          <h1 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: gold, textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '0.5rem' }}>
            Plan Maestro
          </h1>
          <h2 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', color: '#e8d5a0', marginBottom: '0.5rem' }}>
            "Horizonte 180"
          </h2>
          <p style={{ color: '#8090a8', fontSize: '0.9rem', letterSpacing: '0.08em' }}>Presentado por el equipo de trabajo <strong style={{ color: gold }}>Sangre Nueva</strong></p>
          <div style={{ width: 100, height: 2, background: gold, margin: '1.5rem auto 0' }} />
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
              {
                label: 'El Origen (1969)',
                text: 'El 21 de julio de 1969 nacimos con un propósito noble: unión, recreación y hermandad naval. Ese fue nuestro pilar de identidad.',
              },
              {
                label: 'La Realidad Actual',
                text: 'Ese propósito se ha desdibujado. Las últimas administraciones han carecido de visión corporativa y ética, generando un déficit financiero, moral y de confianza.',
              },
              {
                label: 'El Punto de Quiebre',
                text: 'Obligaciones pendientes, deudas, servicios deficientes, infraestructura abandonada, y una gestión desconectada de su propósito principal: servir al socio.',
              },
              {
                label: 'Nuestra Decisión',
                text: 'Esta elección no es sobre cargos; es sobre supervivencia institucional. Es momento de un giro de 180 grados.',
                highlight: true,
              },
            ].map((row) => (
              <div key={row.label} style={{
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                background: row.highlight ? `${gold}12` : '#0a1e50',
              }}>
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

          {/* Qué es */}
          <div style={{ background: `${gold}10`, border: `1px solid ${gold}40`, borderRadius: 14, padding: '1.5rem 2rem', marginBottom: '2rem' }}>
            <p style={{ color: '#8090a8', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>¿Qué es Horizonte 180?</p>
            <p style={{ color: '#e8d5a0', lineHeight: 1.8, margin: 0, fontWeight: 600, fontSize: '1.05rem' }}>
              Es un plan maestro de Administración Corporativa diseñado para fortalecer, sanear, modernizar y expandir nuestra Corporación, proyectándola hacia el crecimiento continuo y la autosostenibilidad.
            </p>
          </div>

          {/* Misión y Visión */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              {
                title: 'Misión',
                icon: '🎯',
                text: 'Garantizar una gestión transparente y eficiente que asegure el desarrollo financiero y operativo de la Corporación, priorizando el bienestar de sus socios mediante servicios exclusivos, la restitución de derechos adquiridos y el fortalecimiento del sentido de pertenencia de la familia CORTRIP.',
              },
              {
                title: 'Visión',
                icon: '🔭',
                text: 'Posicionarnos como el modelo de Corporación militar más sólido, moderno y transparente del país y la región, reconocido por su integridad institucional y su capacidad de expansión continua.',
              },
            ].map((item) => (
              <div key={item.title} style={{ background: '#0d2060', border: `1px solid ${gold}30`, borderRadius: 14, padding: '1.75rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ color: gold, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontSize: '1.1rem' }}>{item.title}</h3>
                <p style={{ color: '#c0d0e8', lineHeight: 1.8, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Objetivo General */}
          <div style={{ background: '#0d2060', border: `2px solid ${gold}50`, borderRadius: 14, padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#8090a8', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>Objetivo General — Administración "Sangre Nueva"</p>
            <p style={{ color: '#e8d5a0', lineHeight: 1.9, margin: 0, fontStyle: 'italic', fontSize: '1.05rem' }}>
              "Transformar la Corporación de Tripulación de la Armada en una institución financieramente autosostenible, jurídicamente blindada y tecnológicamente avanzada; garantizando la restitución de derechos, el bienestar integral y el orgullo de la familia naval mediante un modelo de alta gerencia y transparencia absoluta."
            </p>
          </div>
        </div>
      </section>

      {/* MODELO DE GESTIÓN — intro */}
      <section style={{ padding: '3rem 1.5rem 1.5rem', background: '#0a1e50', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: gold, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Modelo de Gestión
          </h2>
          <p style={{ color: '#8090a8', marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '0.08em' }}>Los 5 Pilares Estratégicos</p>
          <p style={{ color: '#c0d0e8', lineHeight: 1.8, maxWidth: 700, margin: '0 auto 2rem' }}>
            Para pasar de las promesas a los hechos, hemos consolidado nuestro modelo de gestión en <strong style={{ color: '#e8d5a0' }}>5 Pilares de Alta Gerencia</strong>, cada uno con objetivos claros, medibles y sustentables.
          </p>
          {/* Índice visual */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {['Gobernanza Institucional', 'Sostenibilidad Financiera', 'Bienestar del Socio', 'Operaciones e Infraestructura', 'Innovación y Transformación Digital'].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ffffff08', border: `1px solid ${gold}30`, borderRadius: 999, padding: '0.4rem 1rem' }}>
                <span style={{ color: gold, fontWeight: 700, fontSize: '0.8rem' }}>{i + 1}</span>
                <span style={{ color: '#c0d0e8', fontSize: '0.8rem' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section style={{ padding: '2rem 1.5rem 4rem', background: '#0a1e50' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* PILAR 1 */}
          <div style={{ border: `1px solid ${gold}30`, borderRadius: 16, overflow: 'hidden' }}>
            <PillarHeader number={1} title="Gobernanza Institucional" tags={['Administración Gerencial', 'Gestión Transparente', 'Seguridad Jurídica']} />
            <div style={{ background: navy, padding: '2rem' }}>
              <p style={{ color: '#e8d5a0', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>
                Objetivo: Acabar con los secretos a puerta cerrada y proteger el patrimonio del socio con reglas claras. Nadie estará por encima de la Corporación.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <BulletItem>
                  Abriremos los libros contables reales y en nuestros primeros 3 meses sabrás exactamente qué pasó con el manejo de nuestros recursos. <strong style={{ color: '#e8d5a0' }}>Cero impunidad</strong>, el que le falló al socio, tendrá que responder ante los órganos competentes y la justicia penal civil.
                </BulletItem>
                <BulletItem>
                  Propondremos la reforma integral de nuestro estatuto, <strong style={{ color: '#e8d5a0' }}>a fin de fortalecerlo y blindarlo</strong> para proteger nuestro patrimonio y el derecho de los socios. Se acabó el abuso de autoridad y las decisiones de solo unos pocos.
                </BulletItem>
                <BulletItem>
                  Nadie hará <strong style={{ color: '#e8d5a0' }}>"negocios entre amigos"</strong> con el dinero de tu familia. Implementaremos reglas estrictas obligatorias para toda compra o contrato. Cerraremos todas las puertas a la corrupción.
                </BulletItem>
              </ul>
            </div>
          </div>

          {/* PILAR 2 */}
          <div style={{ border: `1px solid ${gold}30`, borderRadius: 16, overflow: 'hidden' }}>
            <PillarHeader number={2} title="Sostenibilidad Financiera" tags={['Reingeniería Económica', 'Autogestión Responsable', 'Crecimiento Sostenible']} />
            <div style={{ background: navy, padding: '2rem' }}>
              <p style={{ color: '#e8d5a0', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>
                Objetivo: Optimizar integralmente los recursos económicos y diversificar las fuentes de ingreso, garantizando la solvencia a largo plazo sin incrementar un solo centavo en la cuota mensual del socio.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <BulletItem title="Disminuiremos inmediatamente las dietas,">
                  viáticos y gastos innecesarios del Directorio. Ese porcentaje irá directamente al ingreso fijo de nuestra corporación. Ser directivo es un servicio, no un negocio.
                </BulletItem>
                <BulletItem title="Implementaremos un sistema contable moderno y transparente">
                  al final del primer semestre. Sabrás exactamente dónde está cada dólar, sin informes maquillados ni secretos a puerta cerrada.
                </BulletItem>
                <BulletItem>
                  Reactivaremos las sedes en provincias con modelos de autogestión. Al finalizar nuestra administración, cada filial podrá generar rentabilidad sostenible para mantenerse impecable.
                </BulletItem>
                <BulletItem>
                  Firmaremos alianzas, patrocinios y macro-eventos con marcas externas. Usaremos el sector privado para inyectar plata fresca a la Corporación sin tocar tu bolsillo.
                </BulletItem>
              </ul>
            </div>
          </div>

          {/* PILAR 3 */}
          <div style={{ border: `1px solid ${gold}30`, borderRadius: 16, overflow: 'hidden' }}>
            <PillarHeader number={3} title="Bienestar del Socio" tags={['Bienestar Integral', 'Beneficios Exclusivos', 'Restitución de Derechos', 'Desarrollo Socio-Cultural']} />
            <div style={{ background: navy, padding: '2rem' }}>
              <p style={{ color: '#e8d5a0', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>
                Objetivo: Que el club deje de ser una carga y se convierta en un respaldo real para tu bolsillo y tu familia.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <BulletItem title="Beneficios sin rogar:">
                  Reactivaremos de forma progresiva y responsable los créditos, pago de mortuorias y ayudas sociales que hoy te tienen retenidos. Lo que es tuyo, se paga rápido.
                </BulletItem>
                <BulletItem title="Cupos de Emergencia (Crédito automático):">
                  Activo por descuento de rol, sin papeleos: <strong style={{ color: '#e8d5a0' }}>$50 en Víveres, $50 en Farmacias y $20 para Combustible</strong>. Un salvavidas real para fin de mes, financiado con el dinero de la reducción de dietas del directorio.
                </BulletItem>
                <BulletItem title="Comida 20% más barata:">
                  Se acabó el abuso. Bajaremos los precios de los alimentos y bebidas del club. Venir con tu familia costará menos que comer en la calle.
                </BulletItem>
                <BulletItem title="Tu Corporación en tu celular (Cero filas):">
                  Ya no gastes tiempo ni pasajes. Todos tus trámites, préstamos y reservas serán 100% en línea. Capacitaremos al personal para garantizarte una atención digna y VIP.
                </BulletItem>
                <BulletItem>
                  Devolveremos la vida a nuestro club con espacios y experiencias de primer nivel. Planificaremos y organizaremos eventos financiados 100% mediante alianzas con auspiciantes, además de la reapertura de la discoteca Neptuno financiada con los nuevos ingresos del proyecto <strong style={{ color: '#e8d5a0' }}>"Operación Retorno"</strong>.
                </BulletItem>
                <BulletItem title="Delivery del Cortrip:">
                  Activaremos un WhatsApp exclusivo para llevar nuestros platos a tu casa, generando ingresos extra diarios.
                </BulletItem>
              </ul>
            </div>
          </div>

          {/* PILAR 4 */}
          <div style={{ border: `1px solid ${gold}30`, borderRadius: 16, overflow: 'hidden' }}>
            <PillarHeader number={4} title="Operaciones e Infraestructura" tags={['Seguridad Permanente', 'Infraestructura Moderna', 'Excelencia Operativa']} />
            <div style={{ background: navy, padding: '2rem' }}>
              <p style={{ color: '#e8d5a0', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>
                Objetivo: Construir infraestructura de primer nivel y entornos 100% seguros para nuestras familias.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <BulletItem title="Seguridad Total: Tu tranquilidad no es negociable.">
                  Blindaremos nuestras instalaciones implementando monitoreo 24/7 con Inteligencia Artificial, arcos detectores de metales y botones de pánico conectados directamente a la Policía Nacional.
                </BulletItem>
                <BulletItem title="Protección Vital: Cuidamos lo que más amas.">
                  Contarás con un paramédico permanente en el Club Campestre durante todos los fines de semana y feriados, listo para atender cualquier emergencia al instante.
                </BulletItem>
                <BulletItem title="Plan Expansión: Instalaciones que te darán orgullo.">
                  Haremos que tu inversión se note en cada rincón rehabilitando al 100% nuestras canchas y piscinas, construyendo salones de eventos modernos y proyectando el gran complejo recreacional del Club Campestre.
                </BulletItem>
              </ul>
            </div>
          </div>

          {/* PILAR 5 */}
          <div style={{ border: `1px solid ${gold}30`, borderRadius: 16, overflow: 'hidden' }}>
            <PillarHeader number={5} title="Innovación y Transformación Digital" tags={['Modernización Tecnológica', 'Digitalización de Vanguardia', 'Expansión Institucional']} />
            <div style={{ background: navy, padding: '2rem' }}>
              <p style={{ color: '#e8d5a0', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>
                Objetivo: Dar el salto tecnológico definitivo para erradicar la burocracia, garantizar transparencia total en los fondos y poner el control de todos tus beneficios directamente en la palma de tu mano.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <BulletItem title='App "CORTRITO": Tu club en el celular.'>
                  Olvídate de los trámites. Ingresa rápido tus datos, paga tus cuotas sin hacer filas y recibe alertas de eventos en tiempo real.
                </BulletItem>
                <BulletItem title="Reservas Inteligentes,">
                  sin esperas ni favoritismos. Separa canchas, áreas sociales y salones de eventos al instante, desde tu teléfono, con un sistema automático y 100% transparente para todos.
                </BulletItem>
                <BulletItem title="Transparencia Total:">
                  Diseñaremos un portal web que se actualice minuto a minuto para que puedas observar en tiempo real la gestión de nuestra Corporación.
                </BulletItem>
                <BulletItem title="Voto Electrónico:">
                  Implementaremos el voto electrónico para que votes desde cualquier lugar. Nunca más decidirán unos pocos. Participa y vota en nuestras asambleas desde tu celular, sin importar si estás en casa o navegando.
                </BulletItem>
                <BulletItem title="Atención 24/7 por WhatsApp: Cero burocracia.">
                  Un canal inteligente y siempre disponible para descargar tus estados de cuenta y resolver tus dudas.
                </BulletItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PACTO FINAL */}
      <section style={{ padding: '4rem 1.5rem', background: 'linear-gradient(160deg, #0d2060, #050e25)', textAlign: 'center', borderTop: `1px solid ${gold}30` }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: gold, marginBottom: '0.75rem' }}>
            Nuestro Pacto de Cumplimiento
          </p>
          <h2 style={{ fontFamily: "'Georgia', serif", fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#fff', marginBottom: '2rem', lineHeight: 1.3 }}>
            El Compromiso con el Socio
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem', textAlign: 'left' }}>
            {[
              'No venimos a pedirte un voto de fe, venimos a firmar un contrato de resultados.',
              'Horizonte 180 está diseñado para ejecutarse a corto, mediano y largo plazo, reinvirtiendo cada ganancia para no afectar la economía del socio.',
              'Somos la "Sangre Nueva". Tenemos la capacidad técnica, la energía de un navío y, sobre todo, la integridad moral para devolverle la grandeza a nuestra Corporación.',
              'El cambio no es una opción, es una obligación.',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckIcon size={22} />
                <p style={{ color: '#c0d0e8', lineHeight: 1.8, margin: 0, fontWeight: i === 3 ? 700 : 400, color: i === 3 ? '#e8d5a0' : '#c0d0e8' }}>{text}</p>
              </div>
            ))}
          </div>

          <div style={{ background: `${gold}15`, border: `2px solid ${gold}60`, borderRadius: 14, padding: '1.5rem 2rem' }}>
            <p style={{ color: gold, fontWeight: 700, fontSize: '1.1rem', margin: 0, fontStyle: 'italic', letterSpacing: '0.03em' }}>
              Únete a nuestra convicción. Vota por Horizonte 180. Vota por la Sangre Nueva.
            </p>
          </div>

          <Link href="/cortrip" style={{ display: 'inline-block', marginTop: '2.5rem', border: `1px solid ${gold}50`, borderRadius: 999, padding: '0.6rem 1.5rem', color: gold, textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em' }}>
            ← Volver al resumen
          </Link>
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
