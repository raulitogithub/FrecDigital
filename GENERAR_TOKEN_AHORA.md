# ⚡ GENERAR REFRESH TOKEN - AHORA MISMO (3 minutos)

## 🚀 PASO 1: Ejecutar Script (AHORA)

Abre terminal en la carpeta del proyecto y ejecuta:

```bash
npm run generate:token
```

---

## 📋 QUÉ PASARÁ

1. Se abrirá una URL en tu navegador
2. Google te pedirá autorización
3. Haz clic en **"Permitir"** (Allow)
4. Se cerrará automáticamente y te dará el token
5. **Copia el token** que aparezca

---

## ✅ PASO 2: Pegar en .env.local (1 minuto)

1. Abre: `.env.local`
2. Encuentra: `GOOGLE_REFRESH_TOKEN=YOUR_REAL_REFRESH_TOKEN_HERE`
3. Reemplaza `YOUR_REAL_REFRESH_TOKEN_HERE` con el token que copiaste
4. Guarda el archivo

**Debe verse así:**
```env
GOOGLE_REFRESH_TOKEN=1//0gxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🧪 PASO 3: Probar (30 segundos)

```bash
npm run test:oauth
```

Deberías ver:
```
✅ ✅ ✅ TODAS LAS PRUEBAS PASARON ✅ ✅ ✅
```

---

## 📧 PASO 4: Probar Envío (1 minuto)

```bash
npm run test:email
```

Deberías ver:
```
✅ ✅ ✅ CORREO ENVIADO EXITOSAMENTE ✅ ✅ ✅
```

Y recibirás un email de prueba en: **fespinoza@frecdigital.com**

---

## 🎯 PASO 5: Verificar en la App

```bash
npm run dev
```

- Abre: http://localhost:3000
- Completa el formulario de contacto
- Haz clic en "Enviar"
- ✅ El email debe llegar

---

## ⏱️ TIEMPO TOTAL: 5 MINUTOS

**Vamos, hazlo ahora mismo:**

```bash
npm run generate:token
```

---

## 🆘 Si Algo Falla

**Error: "Cannot find module 'open'"**
→ No es crítico, solo copia la URL manualmente al navegador

**Error: "ECONNREFUSED"**
→ Puerto 3000 en uso. Cierra otras apps o ejecuta en puerto diferente

**No se abre navegador**
→ Copia la URL que aparece en terminal y abrela manualmente

**Error de Google: "Invalid client"**
→ Las credenciales son incorrectas. Verifica CLIENT_ID y SECRET

---

**Ahora ejecuta:**
```bash
npm run generate:token
```

¡Vamos a arreglarlo! 🚀
