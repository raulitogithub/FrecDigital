# 🚀 FrecDigital - Quick Reference Guide

## ⚡ Quick Start

```bash
# 1. Navega a la carpeta del proyecto
cd c:\Users\Cristina\OneDrive\Imágenes\Escritorio\FrecDigital

# 2. El servidor ya está corriendo en:
http://localhost:3000

# 3. Si necesitas reiniciar:
npm run dev

# 4. Build para producción:
npm run build && npm start
```

## 📂 Dónde Editar Qué

| Necesidad | Archivo |
|-----------|---------|
| Cambiar logo | `components/Navbar.jsx` línea 38-42 |
| Cambiar servicios | `components/ServicesSection.jsx` línea 9-35 |
| Cambiar estadísticas | `components/StatsSection.jsx` línea 8-12 |
| Cambiar proceso | `components/ProcessSection.jsx` línea 8-26 |
| Cambiar colores | `app/globals.css` línea 10-17 |
| Cambiar info contacto | `components/ContactForm.jsx` línea 36-41 |
| Cambiar metadata SEO | `app/layout.js` línea 3-20 |
| Cambiar buttons | `components/ui/Button.jsx` línea 16-23 |

## 🎨 Paleta de Colores

```css
/* Primario (Azul Oscuro) */
#1a3a6b

/* Acento (Cian) */
#00b4d8

/* Fondo Claro */
#e8f4fc

/* Texto Principal */
#1e293b

/* Texto Secundario */
#64748b
```

## 🔧 Modificaciones Comunes

### Cambiar Título Principal
**Archivo:** `components/HeroSection.jsx` línea 67

```jsx
<motion.h1>
  Transforma tu negocio con
  <span className="text-[#00b4d8]">Inteligencia Artificial</span>
</motion.h1>
```

### Cambiar Descripción del Hero
**Archivo:** `components/HeroSection.jsx` línea 75

```jsx
<motion.p>
  Soluciones personalizadas con IA...
</motion.p>
```

### Agregar Nuevo Servicio
**Archivo:** `components/ServicesSection.jsx` línea 9

```jsx
const services = [
  // ... servicios existentes
  {
    icon: IconoDeLucide,
    title: 'Nuevo Servicio',
    description: 'Descripción aquí',
  },
];
```

### Cambiar Email de Contacto
**Archivo:** `components/ContactForm.jsx` línea 36

```jsx
{ icon: Mail, label: 'Email', value: 'nuevo@email.com' },
```

### Cambiar Teléfono
**Archivo:** `components/ContactForm.jsx` línea 37

```jsx
{ icon: Phone, label: 'Teléfono', value: '+34 123 456 789' },
```

## 🎬 Animaciones Disponibles

### Framer Motion
```jsx
// Fade in
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
/>

// Slide in
<motion.div
  initial={{ x: -20 }}
  whileInView={{ x: 0 }}
/>

// Scale
<motion.div
  whileHover={{ scale: 1.1 }}
/>
```

## 📋 Estructura de Componente Típica

```jsx
'use client';

import { motion } from 'framer-motion';
import { IconoDeLucide } from 'lucide-react';

export default function MiComponente() {
  return (
    <section id="mi-seccion" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Contenido */}
      </div>
    </section>
  );
}
```

## 🔗 Atajos de Navegación

```html
<!-- Estos links funcionan (smooth scroll) -->
<a href="#hero">Inicio</a>
<a href="#services">Servicios</a>
<a href="#why-us">Nosotros</a>
<a href="#contact">Contacto</a>
```

## 🛠️ Solución Rápida de Errores

### Error: "Module not found"
```bash
npm install
```

### Error: "Port already in use"
```bash
# Matar proceso que usa puerto 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

### Cambios no se ven
```bash
# 1. Guardar archivo (Ctrl+S)
# 2. Esperar unos segundos
# 3. Refrescar página (F5 o Ctrl+Shift+R)
```

## 📱 Responsive Breakpoints

```css
/* Tailwind Breakpoints */
sm: 640px   /* Tablets pequeñas */
md: 768px   /* Tablets */
lg: 1024px  /* Escritorio pequeño */
xl: 1280px  /* Escritorio normal */
2xl: 1536px /* Escritorio grande */
```

## 🎯 Agregar Nueva Sección

1. **Crear archivo:** `components/NuevaSeccion.jsx`

```jsx
'use client';

import { motion } from 'framer-motion';

export default function NuevaSeccion() {
  return (
    <section id="mi-seccion" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#1a3a6b]">
          Mi Sección
        </h2>
      </div>
    </section>
  );
}
```

2. **Importar en:** `app/page.js`

```jsx
import NuevaSeccion from '@/components/NuevaSeccion';
```

3. **Agregar en orden:** en el JSX dentro del `<main>`

```jsx
<NuevaSeccion />
```

## 🎨 Variantes de Button

```jsx
<Button variant="primary">Primario</Button>
<Button variant="accent">Acento</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

<Button size="sm">Pequeño</Button>
<Button size="md">Mediano</Button>
<Button size="lg">Grande</Button>
```

## 📧 Para Emailjs

```javascript
// Instalar
npm install @emailjs/browser

// En componente
import emailjs from '@emailjs/browser';

// Inicializar
emailjs.init('YOUR_PUBLIC_KEY');

// Enviar
await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
  to_email: 'dest@example.com',
  from_name: 'Usuario',
  message: 'Contenido',
});
```

## 💡 Tips

- 💾 Los cambios se guardan automáticamente en hot reload
- 🔄 Si no ves cambios, presiona Ctrl+Shift+R (clear cache)
- 📐 Los colores siguen la paleta definida en globals.css
- 🎬 Usa Framer Motion para animaciones suaves
- 📱 Prueba siempre en modo responsive (F12)
- 🔍 Usa React DevTools para inspeccionar componentes
- ⚡ Lucide tiene 1500+ íconos (https://lucide.dev)

## 🚨 Importante

- ✅ NO edites archivos en `.next` (se regeneran automáticamente)
- ✅ NO borres `node_modules` sin ejecutar `npm install` después
- ✅ SIEMPRE haz `npm install` después de agregar dependencias
- ✅ MANTÉN la estructura de carpetas consistente

---

**¿Problemas?** Consult la SETUP_GUIDE.md para más detalles.
