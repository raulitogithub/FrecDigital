# 💻 EJEMPLOS DE CÓDIGO - Navbar y Hero

## 📦 Importación Completa (app/page.js)

```jsx
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyUsSection from '@/components/WhyUsSection';
import StatsSection from '@/components/StatsSection';
import ProcessSection from '@/components/ProcessSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar sticky en top */}
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section full viewport */}
        <HeroSection />
        
        {/* Resto de secciones */}
        <ServicesSection />
        <WhyUsSection />
        <StatsSection />
        <ProcessSection />
        <ContactForm />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
```

---

## 🎨 Estructura del Navbar (Simplificada)

```jsx
// Componentes principales del Navbar:

<nav className="sticky top-0 z-50">
  {/* Logo + Brand */}
  <Link href="/">
    <Logo className="w-8 h-8" />
    <span>
      <span>Frec</span>           {/* slate-900 */}
      <span>Digital</span>         {/* cyan-500 */}
    </span>
  </Link>

  {/* Desktop Navigation Links */}
  <div className="hidden md:flex gap-12">
    {navLinks.map(link => (
      <Link href={link.href}>
        {link.label}
        {/* Animated underline on active */}
        {isActive && <span className="h-0.5 bg-cyan-500" />}
      </Link>
    ))}
  </div>

  {/* CTA Button */}
  <button className="bg-cyan-500 text-white rounded-full">
    Comenzar ahora
    <ArrowRight size={16} />
  </button>

  {/* Mobile Menu Hamburger */}
  <button className="md:hidden">
    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
</nav>
```

---

## 🎨 Estructura del Hero (Simplificada)

```jsx
// Componentes principales del Hero:

<section className="min-h-screen bg-slate-900">
  {/* Background gradients */}
  <div className="absolute bg-gradient-to-r from-slate-900/90 to-slate-900/40" />
  <div className="absolute bg-cyan-500/10 blur-3xl" />

  {/* Content Container */}
  <div className="relative z-20">
    {/* Left Column */}
    <div>
      {/* Title */}
      <h1 className="text-white font-black text-7xl">
        Soluciones Inteligentes
      </h1>
      
      {/* Title with Left Bar */}
      <div className="flex gap-4">
        <div className="w-1.5 h-32 bg-cyan-500 rounded-full" />
        <h1 className="text-cyan-500 font-black text-7xl">
          Adaptadas a tu Empresa.
        </h1>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-lg max-w-xl">
        Aplicamos inteligencia artificial...
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4">
        <button className="bg-cyan-500 text-white rounded-full">
          Comenzar ahora <ArrowRight />
        </button>
        <button className="border-2 border-cyan-500/50 text-white rounded-full">
          Explorar Servicios
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-8 border-t border-white/10">
        <div>
          <p className="text-3xl font-black text-cyan-500">500+</p>
          <p className="text-sm text-gray-400">Empresas confían</p>
        </div>
        {/* ... más stats */}
      </div>
    </div>

    {/* Right Column (Desktop only) */}
    <div className="hidden lg:flex">
      {/* Decorative animated element */}
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8">
    <p>Desplázate</p>
    <div className="border-2 border-cyan-500/50">
      <div className="bg-cyan-500 animate-pulse" />
    </div>
  </div>
</section>
```

---

## 🎨 Personalización - Cambiar Color Primario

### De Cyan a Blue

**Navbar.jsx:**
```jsx
// ANTES:
className="bg-cyan-500 text-cyan-500 hover:bg-cyan-600"

// DESPUÉS:
className="bg-blue-500 text-blue-500 hover:bg-blue-600"
```

**HeroSection.jsx:**
```jsx
// ANTES:
className="text-cyan-500 bg-cyan-500 border-cyan-500"

// DESPUÉS:
className="text-blue-500 bg-blue-500 border-blue-500"
```

### De Cyan a Purple

```jsx
// ANTES:
className="bg-cyan-500 text-cyan-500 border-cyan-500"

// DESPUÉS:
className="bg-purple-500 text-purple-500 border-purple-500"
```

---

## 🎨 Personalización - Cambiar Tamaño de Título

**HeroSection.jsx:**

```jsx
// PEQUEÑO (default actual):
text-5xl sm:text-6xl lg:text-7xl

// MEDIANO:
text-4xl sm:text-5xl lg:text-6xl

// GRANDE:
text-6xl sm:text-7xl lg:text-8xl

// GIGANTE:
text-7xl sm:text-8xl lg:text-9xl
```

---

## 🎨 Personalización - Cambiar Velocidad de Animaciones

**HeroSection.jsx:**

```jsx
// LENTA (default: 0.6s):
transition={{ duration: 1, ease: 'easeOut' }}

// NORMAL:
transition={{ duration: 0.5, ease: 'easeOut' }}

// RÁPIDA:
transition={{ duration: 0.3, ease: 'easeOut' }}

// MUY RÁPIDA:
transition={{ duration: 0.15, ease: 'easeOut' }}
```

---

## 🎨 Personalización - Cambiar Altura del Hero

**HeroSection.jsx:**

```jsx
// ACTUAL (full screen):
className="min-h-screen"

// MÁS CORTO:
className="min-h-[600px]"

// MÁS LARGO:
className="min-h-[900px]"

// AUTO:
className="h-auto"
```

---

## 🎨 Personalización - Agregar Textura de Fondo

**HeroSection.jsx:**

```jsx
{/* Agregar después del overlay gradient */}
<div 
  className="absolute inset-0 opacity-5 z-10"
  style={{
    backgroundImage: "url('data:image/svg+xml...')",
    backgroundRepeat: "repeat",
  }}
/>
```

---

## 🔗 Integración con ContactForm

Para que los botones CTA funcionen, asegúrate de que existe `#contact`:

**app/page.js:**
```jsx
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />      {/* Botón "Comenzar ahora" → #contact */}
      <main>
        <HeroSection /> {/* Botón "Comenzar ahora" → #contact */}
        {/* ... otras secciones */}
        <ContactForm /> {/* id="contact" automático */}
      </main>
    </div>
  );
}
```

**ContactForm.jsx debe tener:**
```jsx
<section id="contact" className="...">
  {/* Formulario */}
</section>
```

---

## 🔗 Integración con ServicesSection

**HeroSection.jsx** → Botón "Explorar Servicios":
```jsx
onClick={() => {
  const servicesSection = document.querySelector('#services');
  servicesSection?.scrollIntoView({ behavior: 'smooth' });
}}
```

**ServicesSection.jsx debe tener:**
```jsx
<section id="services" className="...">
  {/* Servicios */}
</section>
```

---

## 📱 Responsive Breakpoints

### Tailwind CSS Breakpoints

```
sm: 640px   - Tablets pequeños
md: 768px   - Tablets / Laptop pequeño
lg: 1024px  - Desktop
xl: 1280px  - Desktop grande
2xl: 1536px - Ultra-wide
```

### Aplicado en Componentes

**Navbar:**
```jsx
<div className="hidden md:flex"> {/* Oculto en móvil, visible en md+ */}
  {/* Desktop navigation */}
</div>

<button className="md:hidden"> {/* Visible en móvil, oculto en md+ */}
  {/* Mobile menu button */}
</button>
```

**Hero:**
```jsx
<h1 className="text-5xl sm:text-6xl lg:text-7xl">
  {/* 5xl en móvil → 6xl en sm → 7xl en lg */}
</h1>

<div className="hidden lg:flex">
  {/* Decorativo solo en desktop */}
</div>
```

---

## ⚙️ Motion Variants (Framer Motion)

```jsx
// Stagger effect (aplica delay a cada hijo)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,      // 150ms entre items
      delayChildren: 0.2,          // Esperar 200ms antes de empezar
    },
  },
};

// Item animation (aplicar a cada elemento)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },   // Comienza invisible y 20px abajo
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Uso:
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>Elemento 1</motion.div>
  <motion.div variants={itemVariants}>Elemento 2</motion.div>
  <motion.div variants={itemVariants}>Elemento 3</motion.div>
</motion.div>
```

---

## 🎯 Testing Checklist

```
NAVBAR:
[ ] Logo visible y clickeable
[ ] Links centrados en desktop
[ ] Link activo tiene subrayado cyan
[ ] Botón CTA es cyan con flecha
[ ] Menú hamburger visible en móvil
[ ] Menú móvil abre/cierra
[ ] Elementos menú móvil tienen animación stagger

HERO:
[ ] Fondo es slate-900
[ ] Título split: "Soluciones" blanco + "Adaptadas" cyan
[ ] Barra vertical cyan a la izquierda del título
[ ] Descripción es gris claro
[ ] Dos botones CTA
[ ] Stats en cyan-500
[ ] Responsive en móvil (botones apilados)
[ ] Scroll indicator en bottom
[ ] Elementos decorativos flotantes

INTERACCIÓN:
[ ] Botón CTA navega a #contact
[ ] Botón Explorar navega a #services
[ ] Links navbar navegan a secciones
[ ] Scroll smooth en todas partes
[ ] Menú móvil se cierra al hacer click
```

---

**Fecha:** 22 de abril de 2026  
**Versión:** 1.0  
**Estado:** ✅ Completado
