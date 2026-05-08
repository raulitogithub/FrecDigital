# 🆘 ALTERNATIVA: Generar Token Manualmente en 2 minutos

Si el script `npm run generate:token` no funciona, usa este método directo:

---

## 🔗 PASO 1: Ir a OAuth Playground

https://developers.google.com/oauthplayground/

---

## ⚙️ PASO 2: Configurar Credenciales

**Arriba a la derecha:** Click en ⚙️ (Settings)

**Activa:** "Use your own OAuth credentials"

**Llena:**
- **OAuth Client ID:** 
  ```
  YOUR_GOOGLE_CLIENT_ID
  ```

- **OAuth Client Secret:** 
  ```
  YOUR_GOOGLE_CLIENT_SECRET
  ```

**Click:** Close

---

## 📧 PASO 3: Seleccionar Gmail

**Izquierda:** Gmail API v1 → Expande

**Selecciona:**
```
https://www.googleapis.com/auth/gmail.send
https://www.googleapis.com/auth/gmail.readonly
https://www.googleapis.com/auth/gmail.modify
```

(Marca las 3 opciones)

---

## 🔐 PASO 4: Autorizar

**Click:** "Authorize APIs"

**Se abrirá Google:**
1. Inicia sesión con tu cuenta Google
2. Haz clic en "Permitir"

---

## 🔄 PASO 5: Obtener Tokens

**Vuelve a OAuth Playground**

**Click:** "Exchange authorization code for tokens"

**En la respuesta, busca:**
```json
{
  ...
  "refresh_token": "1//0g7xxxxxxxxxxxxxxxx...",
  ...
}
```

**Copia el valor de `refresh_token`** (es un string largo)

---

## 📝 PASO 6: Actualizar .env.local

**Abre:** `.env.local`

**Reemplaza:**
```env
GOOGLE_REFRESH_TOKEN=YOUR_REAL_REFRESH_TOKEN_HERE
```

**Con:**
```env
GOOGLE_REFRESH_TOKEN=1//0g7xxxxxxxxxxxxxxxx...
```

(El token que copiaste en PASO 5)

**Guarda el archivo**

---

## ✅ PASO 7: Probar

```bash
npm run test:oauth
```

Deberías ver: `✅ TODAS LAS PRUEBAS PASARON`

---

## 📧 PASO 8: Probar Envío

```bash
npm run test:email
```

Deberías recibir email en: `fespinoza@frecdigital.com`

---

**Tiempo total: 5 minutos**

**¡Inténtalo ahora!**
