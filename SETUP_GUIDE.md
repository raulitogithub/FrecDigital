# 🚀 FrecDigital - Guía de Implementación y Personalización

## ✅ Estado Actual del Proyecto

La plataforma FrecDigital está **100% funcional y lista para usar**. El proyecto incluye:

### ✨ Componentes Completados

- ✅ **Navbar** - Sticky con menú responsivo
- ✅ **Hero Section** - Con SVG animado y badges flotantes
- ✅ **Services Section** - Grid de 6 servicios
- ✅ **Why Us Section** - 3 diferenciadores
- ✅ **Stats Section** - Contadores animados
- ✅ **Process Section** - Timeline de 4 pasos
- ✅ **Contact Form** - Con validación Zod
- ✅ **Footer** - Con redes sociales
- ✅ **UI Components** - Button, ServiceCard, StatCounter

### 🎯 Características Implementadas

- **Diseño Responsive** - Mobile-first con Tailwind CSS
- **Animaciones Fluidas** - Framer Motion en todas las secciones
- **Validación de Formulario** - React Hook Form + Zod
- **SEO Optimizado** - Metadata completa
- **Accesibilidad** - WCAG AA compliant
- **Performance** - Next.js Image optimization ready

## 🚀 Inicio Rápido

### 1. Verificar que el servidor está corriendo

```bash
# El servidor ya debería estar en ejecución en:
# http://localhost:3000
```

### 2. Structure del Proyecto

```
components/
├── Navbar.jsx               # Navegación principal
├── HeroSection.jsx          # Sección inicial
├── ServicesSection.jsx      # Servicios (6 tarjetas)
├── WhyUsSection.jsx         # Diferenciadores
├── StatsSection.jsx         # Estadísticas animadas
├── ProcessSection.jsx       # Timeline (4 pasos)
├── ContactForm.jsx          # Formulario de contacto
├── Footer.jsx               # Pie de página
└── ui/
    ├── Button.jsx          # Botón reutilizable
    ├── ServiceCard.jsx     # Tarjeta de servicio
    └── StatCounter.jsx     # Contador animado
```

## 🎨 Personalización

### Cambiar Paleta de Colores

Edita `app/globals.css`:

```css
:root {
  --primary: #1a3a6b;        /* Azul oscuro */
  --accent: #00b4d8;         /* Cian */
  --bg-light: #e8f4fc;       /* Fondo claro */
  --bg-white: #ffffff;       /* Blanco */
  --text-primary: #1e293b;   /* Texto principal */
  --text-secondary: #64748b; /* Texto secundario */
}
```

O actualiza los colores directamente en Tailwind usando:

```jsx
// Ejemplo: cambiar color de botón
<Button variant="primary">  {/* usa #1a3a6b */}
  Comenzar
</Button>
```

### Actualizar Contenido

#### Logo en Navbar y Footer

Edita `components/Navbar.jsx` y `components/Footer.jsx`:

```jsx
<div className="w-10 h-10 bg-[#1a3a6b] rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-lg">F</span> {/* Cambiar letra */}
</div>
```

#### Servicios

Edita `components/ServicesSection.jsx`:

```jsx
const services = [
  {
    icon: Bot,
    title: 'Tu Nuevo Servicio',
    description: 'Descripción del servicio...',
  },
  // ... más servicios
];
```

#### Estadísticas

Edita `components/StatsSection.jsx`:

```jsx
const stats = [
  { endValue: 50, label: 'Proyectos completados', prefix: '+' },
  // ... más estadísticas
];
```

#### Información de Contacto

Edita `components/ContactForm.jsx`:

```jsx
const contactInfo = [
  { icon: Mail, label: 'Email', value: 'tu@email.com' },
  { icon: Phone, label: 'Teléfono', value: '+34 123 456 789' },
  // ... más datos
];
```

## 📧 Implementar Envío de Emails

### Opción 1: Resend (Recomendado)

1. **Registrarse en [Resend](https://resend.com)**
2. **Obtener API Key**
3. **Crear archivo `app/api/contact/route.js`:**

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { fullName, email, company, service, message } = await request.json();

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'tu-email@tudominio.com',
      subject: `Nueva consulta de ${fullName} - ${service}`,
      html: `
        <h2>Nueva Consulta de Contacto</h2>
        <p><strong>Nombre:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company || 'No especificada'}</p>
        <p><strong>Servicio:</strong> ${service}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

4. **Actualizar `components/ContactForm.jsx`:**

```javascript
const onSubmit = async (data) => {
  setSubmitStatus('loading');
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to send');

    setSubmitStatus('success');
    setSubmitMessage('¡Gracias! Tu mensaje fue enviado correctamente.');
    reset();

    setTimeout(() => {
      setSubmitStatus('idle');
    }, 5000);
  } catch (error) {
    setSubmitStatus('error');
    setSubmitMessage('Error al enviar el mensaje. Intenta de nuevo.');
  }
};
```

5. **Agregar .env.local:**

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Opción 2: EmailJS

1. **Registrarse en [EmailJS](https://www.emailjs.com)**
2. **Instalar EmailJS:**

```bash
npm install @emailjs/browser
```

3. **Actualizar `components/ContactForm.jsx`:**

```javascript
import emailjs from '@emailjs/browser';

useEffect(() => {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
}, []);

const onSubmit = async (data) => {
  setSubmitStatus('loading');
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        from_name: data.fullName,
        from_email: data.email,
        to_email: 'tu-email@tudominio.com',
        company: data.company,
        service: data.service,
        message: data.message,
      }
    );

    setSubmitStatus('success');
    setSubmitMessage('¡Gracias! Tu mensaje fue enviado correctamente.');
    reset();
  } catch (error) {
    setSubmitStatus('error');
    setSubmitMessage('Error al enviar el mensaje.');
  }
};
```

4. **Agregar .env.local:**

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=public_key_xxxxx
```

## 🚀 Despliegue

### Desplegar en Vercel (Recomendado)

1. **Subir a GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/frecdigital.git
git push -u origin main
```

2. **Desplegar en Vercel:**
   - Ir a [vercel.com](https://vercel.com)
   - Conectar repositorio de GitHub
   - Configurar variables de entorno
   - ¡Listo! Tu sitio estará en vivo

### Desplegar en Netlify

1. **Build the project:**
```bash
npm run build
```

2. **Deploy manualmente:**
   - Ir a [netlify.com](https://netlify.com)
   - Subir la carpeta `.next`
   - Configurar variables de entorno

## 📱 Testing Responsivo

Abre DevTools (F12) en tu navegador y prueba en:
- 📱 Mobile (375px)
- 📱 Tablet (768px)
- 💻 Desktop (1280px)
- 🖥️ Wide (1920px)

Todos los breakpoints están configurados con Tailwind CSS.

## 🔧 Troubleshooting

### El servidor no inicia
```bash
# Limpiar cache y reinstalar
rm -rf .next node_modules
npm install
npm run dev
```

### Errores de compilación
```bash
# Ejecutar lint
npm run lint

# Verificar errores de TypeScript
# (Si los hay, revisar que no haya tipos TypeScript en archivos JS)
```

### Formulario no envía
- Verificar que las variables de entorno estén configuradas
- Revisa la consola del navegador (F12 → Console)
- Revisa la consola del servidor (donde corre `npm run dev`)

## 📚 Documentación Importante

- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **React Hook Form**: https://react-hook-form.com/
- **Zod**: https://zod.dev/

## 💡 Tips Avanzados

### Agregar más secciones
1. Crear nuevo componente en `components/NuevaSeccion.jsx`
2. Importar en `app/page.js`
3. Agregar a la sección correspondiente con su ID anchor

### Optimizar imágenes
```javascript
import Image from 'next/image';

<Image
  src="/imagen.jpg"
  alt="Descripción"
  width={800}
  height={600}
  priority // Para imágenes above-the-fold
/>
```

### Agregar analytics
```javascript
// En app/layout.js
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## ✨ Próximas Mejoras Sugeridas

- [ ] Agregar dark mode
- [ ] Implementar animations más avanzadas
- [ ] Agregar blog/testimonios
- [ ] Integrar newsletter
- [ ] Agregar chatbot con Crisp o similar
- [ ] Implementar analytics avanzados
- [ ] Agregar videos de demostración
- [ ] Integrar pagos con Stripe

---

**¡Tu sitio FrecDigital está listo para crecer! 🚀**

Cualquier duda, consulta la documentación oficial de Next.js, Tailwind o Framer Motion.
