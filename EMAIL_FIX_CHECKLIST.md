# ✅ CHECKLIST DE VERIFICACIÓN - ENVÍO DE CORREOS

## 🔴 PROBLEMAS ENCONTRADOS Y SOLUCIONADOS

### ✅ Problema 1: Refresh Token Placeholder
- **Archivo:** `.env.local`
- **Error:** `GOOGLE_REFRESH_TOKEN=TU_REFRESH_TOKEN_REAL` (placeholder)
- **Solución:** Reemplazado con comentario para token real
- **Estado:** ✅ CORREGIDO

### ✅ Problema 2: Redirect URI Indefinido  
- **Archivo:** `lib/gmail.js`
- **Error:** `process.env.GOOGLE_REDIRECT_URI` retorna undefined
- **Solución:** Agregado default fallback a `https://developers.google.com/oauthplayground`
- **Estado:** ✅ CORREGIDO

### ✅ Problema 3: Sin Validación de Variables de Entorno
- **Archivos:** `lib/gmail.js` y `app/actions/lib-email.js`
- **Error:** No valida si variables están definidas antes de usar
- **Solución:** Agregadas validaciones con mensajes claros
- **Estado:** ✅ CORREGIDO

### ✅ Problema 4: Manejo de Errores Insuficiente
- **Archivo:** `app/actions/lib-email.js`
- **Error:** Errores OAuth no diferenciados (invalid_grant, 403, etc)
- **Solución:** Agregados mensajes específicos para cada tipo de error
- **Estado:** ✅ CORREGIDO

---

## 📋 PASOS PARA COMPLETAR LA CONFIGURACIÓN

### PASO 1: Obtener Refresh Token Real ⚠️ CRÍTICO

**Opción A: Generar en OAuth Playground (RECOMENDADO)**

1. Ve a: https://developers.google.com/oauthplayground/
2. Click en ⚙️ (Settings) arriba a la derecha
3. Activa: "Use your own OAuth credentials"
4. Ingresa:
   - OAuth Client ID: `YOUR_GOOGLE_CLIENT_ID`
   - OAuth Client Secret: `YOUR_GOOGLE_CLIENT_SECRET`
5. En el lado izquierdo, busca "Gmail API v1"
6. Expande y selecciona: `https://www.googleapis.com/auth/gmail.send`
7. Click en "Authorize APIs"
8. Verifica tu cuenta Google
9. Click en "Exchange authorization code for tokens"
10. Copia el valor de `refresh_token`

**Opción B: Usar script de Node.js**

Si tienes node instalado, ejecuta:
```bash
npm run test:oauth-setup
```

---

### PASO 2: Actualizar .env.local ⚠️ CRÍTICO

1. Abre `.env.local`
2. Encuentra la línea: `GOOGLE_REFRESH_TOKEN=YOUR_REAL_REFRESH_TOKEN_HERE`
3. Reemplaza `YOUR_REAL_REFRESH_TOKEN_HERE` con el token real obtenido en PASO 1
4. **IMPORTANTE:** Asegúrate de que NO haya espacios en blanco al inicio o final
5. Guarda el archivo

```env
# Ejemplo (no copiar):
GOOGLE_REFRESH_TOKEN=1//0gXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### PASO 3: Probar Autenticación OAuth2

Ejecuta el script de prueba:

```bash
# Instalar dependencias si falta dotenv
npm install dotenv

# Ejecutar prueba
node lib/test-oauth.js
```

**Resultado esperado:**
```
✅ ✅ ✅ TODAS LAS PRUEBAS PASARON ✅ ✅ ✅
Tu configuración OAuth2 es válida y lista para enviar correos.
```

**Si falla con "invalid_grant":**
- El refresh token expiró o es incorrecto
- Repite el PASO 1
- Verifica que no haya espacios en `.env.local`

---

### PASO 4: Probar Envío de Correo

Ejecuta el script de envío:

```bash
node lib/test-send-email.js
```

**Resultado esperado:**
```
✅ ✅ ✅ CORREO ENVIADO EXITOSAMENTE ✅ ✅ ✅
ID del mensaje: 0a1b2c3d4e5f...
```

Verifica que el correo llegó a: `fespinoza@frecdigital.com`

---

### PASO 5: Probar Formulario en la App

1. Inicia el servidor: `npm run dev`
2. Ve a http://localhost:3000
3. Llena el formulario de contacto
4. Envía
5. Verifica que el correo llegue a `fespinoza@frecdigital.com`

---

## 🔍 CHECKLIST DE VERIFICACIÓN FINAL

### Variables de Entorno
- [ ] `.env.local` contiene `GOOGLE_REFRESH_TOKEN` con valor real (no placeholder)
- [ ] No hay espacios en blanco antes/después del token
- [ ] `GOOGLE_REDIRECT_URI` está definido (o usa default)
- [ ] `GOOGLE_CLIENT_ID` es correcto
- [ ] `GOOGLE_CLIENT_SECRET` es correcto

### Código
- [ ] `lib/gmail.js` valida variables de entorno
- [ ] `lib/gmail.js` tiene fallback para GOOGLE_REDIRECT_URI
- [ ] `app/actions/lib-email.js` valida token con `.trim()`
- [ ] `app/actions/lib-email.js` tiene mensajes de error específicos
- [ ] Access token se obtiene correctamente

### Permisos de Google Cloud
- [ ] Gmail API está habilitada en Google Cloud Console
- [ ] El refresh token tiene scope: `gmail.send`
- [ ] El refresh token tiene scope: `gmail.readonly` (para lecturas)
- [ ] La app NO está en "Testing" mode (testing restringido a 100 usuarios)

### Tests
- [ ] `node lib/test-oauth.js` pasa sin errores
- [ ] `node lib/test-send-email.js` envía un correo de prueba
- [ ] Se recibe correo en `fespinoza@frecdigital.com`

### Formulario
- [ ] Llenar formulario y enviar funciona
- [ ] Se ve mensaje de éxito
- [ ] Correo llega a bandeja

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### Error: `invalid_grant`
**Causa:** Refresh token expirado o inválido  
**Solución:** Repite PASO 1 para generar nuevo token

### Error: `403 Forbidden`
**Causa:** Gmail API no habilitada o scopes insuficientes  
**Solución:**
1. Ve a Google Cloud Console
2. Activa "Gmail API"
3. Regenera refresh token con scope `gmail.send`

### Error: `GOOGLE_REFRESH_TOKEN is not defined`
**Causa:** Token no está en `.env.local`  
**Solución:** Verifica que `.env.local` existe en raíz del proyecto

### Error: `undefined` en constructor de OAuth2
**Causa:** Variables de entorno no se cargan  
**Solución:** 
- Reinicia el servidor con `npm run dev`
- Verifica que `.env.local` no empiece con punto (debe estar en raíz)

### Correo no llega
**Verificar:**
- [ ] Spam o carpeta de promociones
- [ ] Email "From" coincide con cuenta autenticada
- [ ] Verifica logs en consola por errores silenciosos
- [ ] Ejecuta `node lib/test-send-email.js` para confirmar

---

## 📚 ARCHIVOS MODIFICADOS

1. ✅ `.env.local` - Agregado GOOGLE_REDIRECT_URI
2. ✅ `lib/gmail.js` - Validación y fallback
3. ✅ `app/actions/lib-email.js` - Mejor error handling y logging
4. ✅ `lib/test-oauth.js` - NUEVO: Script de prueba OAuth2
5. ✅ `lib/test-send-email.js` - NUEVO: Script de envío de prueba

---

## 🎯 RESUMEN

| Problema | Solución | Archivo |
|----------|----------|---------|
| Token placeholder | Agregar comentario y instrucciones | `.env.local` |
| Redirect URI undefined | Agregar fallback | `lib/gmail.js` |
| Sin validación | Agregar validaciones | `lib/gmail.js`, `app/actions/lib-email.js` |
| Errores genéricos | Mensajes específicos | `app/actions/lib-email.js` |
| Falta testing | Scripts de prueba | `lib/test-oauth.js`, `lib/test-send-email.js` |

---

## ✅ PRÓXIMAS ACCIONES

1. ✅ Obtener refresh token real en https://developers.google.com/oauthplayground/
2. ✅ Actualizar `.env.local` con el token
3. ✅ Ejecutar `node lib/test-oauth.js`
4. ✅ Ejecutar `node lib/test-send-email.js`
5. ✅ Probar formulario en la app
6. ✅ Verificar que correo llega a `fespinoza@frecdigital.com`

**Tiempo estimado:** 15-20 minutos

---

**Último actualizado:** 2026-04-20
