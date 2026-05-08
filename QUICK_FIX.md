# 🎯 SOLUCIÓN RÁPIDA EN 5 PASOS

## 🔴 EL PROBLEMA

Tu app NO envía correos porque **el refresh token es un placeholder**.

```
.env.local:
GOOGLE_REFRESH_TOKEN=TU_REFRESH_TOKEN_REAL  ❌ FAKE TOKEN
```

Google rechaza esto con: **`invalid_grant`** error.

---

## ✅ LA SOLUCIÓN

### PASO 1️⃣: Obtén Token Real (10 min)
**URL:** https://developers.google.com/oauthplayground/

Pasos:
1. Arriba derecha → ⚙️ Settings
2. ☑️ "Use your own OAuth credentials"
3. Pega valores de Google Cloud:
   - **Client ID:** `YOUR_GOOGLE_CLIENT_ID`
   - **Client Secret:** `YOUR_GOOGLE_CLIENT_SECRET`
4. Izquierda → "Gmail API v1" → Expande
5. Selecciona: `https://www.googleapis.com/auth/gmail.send`
6. "Authorize APIs"
7. Verifica tu Gmail
8. "Exchange authorization code for tokens"
9. **Copia el `refresh_token` que aparece** ✅

---

### PASO 2️⃣: Actualiza .env.local (1 min)

Abre: **`.env.local`**

Reemplaza esta línea:
```env
GOOGLE_REFRESH_TOKEN=YOUR_REAL_REFRESH_TOKEN_HERE
```

Con el token del PASO 1 (sin espacios):
```env
GOOGLE_REFRESH_TOKEN=1//0g...xxxxx...xxxx
```

Guarda ✅

---

### PASO 3️⃣: Prueba Autenticación (2 min)

Abre terminal y ejecuta:
```bash
npm run test:oauth
```

Si ves esto = ✅ BIEN:
```
✅ ✅ ✅ TODAS LAS PRUEBAS PASARON ✅ ✅ ✅
Tu configuración OAuth2 es válida
```

Si ves error = ❌ MAL:
```
❌ ERROR: invalid_grant
```
→ Repite PASO 1 (token expiró)

---

### PASO 4️⃣: Prueba Envío de Email (2 min)

Ejecuta:
```bash
npm run test:email
```

Si ves esto = ✅ BIEN:
```
✅ ✅ ✅ CORREO ENVIADO EXITOSAMENTE ✅ ✅ ✅
ID del mensaje: 0a1b2c3d...
```

Ve a tu bandeja: **fespinoza@frecdigital.com**
Deberías recibir un email de prueba ✅

---

### PASO 5️⃣: Prueba en la App (5 min)

Ejecuta:
```bash
npm run dev
```

Abre browser: http://localhost:3000

1. Completa el formulario de contacto
2. Click en "Enviar"
3. Deberías ver: ✅ "¡Gracias por tu mensaje!"
4. Ve a tu email: **fespinoza@frecdigital.com**
5. Deberías recibir el correo ✅

---

## ⏱️ RESUMEN

| Paso | Acción | Tiempo | Status |
|------|--------|--------|--------|
| 1 | Obtener token | 10 min | 🔴 TO DO |
| 2 | Actualizar .env | 1 min | 🔴 TO DO |
| 3 | `npm run test:oauth` | 2 min | ⏳ Después paso 2 |
| 4 | `npm run test:email` | 2 min | ⏳ Después paso 3 |
| 5 | Probar en app | 5 min | ⏳ Después paso 4 |
| **TOTAL** | **✅ EMAILS FUNCIONAN** | **20 min** | 🟡 EN PROGRESO |

---

## 📚 MÁS DETALLES

- 📖 **Guía completa:** [EMAIL_FIX_CHECKLIST.md](EMAIL_FIX_CHECKLIST.md)
- 📊 **Resumen técnico:** [REPORTE_TECNICO.md](REPORTE_TECNICO.md)
- 💻 **Cambios en código:** [CODE_CHANGES.md](CODE_CHANGES.md)

---

## 🆘 PROBLEMAS COMUNES

### ❌ Error: `invalid_grant`
**Significa:** Token expirado o inválido
**Solución:** Repite PASO 1

### ❌ Error: `GOOGLE_REFRESH_TOKEN is not defined`
**Significa:** No actualizaste `.env.local`
**Solución:** Haz PASO 2

### ❌ Error: `403 Forbidden`
**Significa:** Gmail API no habilitada
**Solución:** Ve a Google Cloud Console → Habilita Gmail API

### ❌ No recibo email
**Soluciona:**
1. Verifica spam/promotions en Gmail
2. Ejecuta `npm run test:email` nuevamente
3. Comprueba que .env.local esté correcto

---

## ✅ VERIFICACIÓN FINAL

- [ ] Ejecuté PASO 1 ✅
- [ ] Ejecuté PASO 2 ✅
- [ ] Ejecuté PASO 3: `npm run test:oauth` ✅
- [ ] Ejecuté PASO 4: `npm run test:email` ✅
- [ ] Recibí email de prueba ✅
- [ ] Ejecuté PASO 5 ✅
- [ ] Formulario envía emails ✅

**Si tienes todos ✅ = LISTO!**

---

## 🚀 YA ESTÁ!

Tu aplicación ahora envía emails correctamente.

Los cambios en el código ya están hechos:
- ✅ Validación de variables
- ✅ Mejor error handling
- ✅ Fallback para URLs
- ✅ Logging mejorado

Solo necesitabas el token real. ¡Lo tenías como placeholder!

---

**¿Preguntas?**
Consulta: [EMAIL_FIX_CHECKLIST.md](EMAIL_FIX_CHECKLIST.md)
