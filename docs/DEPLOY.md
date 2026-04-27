# Despliegue en Vercel

Guía completa para subir SIGNIUM Landing a producción.

---

## 1. Crear el proyecto en Vercel

1. Entra en <https://vercel.com/new>.
2. **Import Git Repository** → conecta tu cuenta de GitHub si no lo has hecho.
3. Selecciona el repo `signium-landing`.
4. Vercel detecta solo que es **Next.js** — no tienes que configurar nada del build.
5. Antes de hacer deploy, abre la pestaña **Environment Variables** y añade
   las del paso 2.
6. Pulsa **Deploy**.

A partir de ahí, **cada push a `main` se despliega automáticamente**.
Cada PR genera una preview URL única que puedes compartir.

---

## 2. Variables de entorno en Vercel

Ve a **Project → Settings → Environment Variables** y añade:

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL de tu backend en Railway, ej. `https://backendsignium-production.up.railway.app` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyAWa0IhqFKAFXpFOZoyekSi6cSdDhh0xyA` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `signium-96988.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `signium-96988` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `signium-96988.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `283963102145` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:283963102145:web:d6f9b75bb6a2a0be6b5540` |
| `NEXT_PUBLIC_APK_URL` | URL pública del APK (ver paso 4) |
| `NEXT_PUBLIC_APK_VERSION` | Versión del APK, ej. `1.0.0` |

> Aplica las variables a **Production**, **Preview** y **Development**
> (puedes seleccionar las tres a la vez).

Tras añadirlas, vuelve a la pestaña **Deployments** y pulsa
**Redeploy** en el último despliegue para que las recoja.

---

## 3. Configurar el backend (Railway)

Tu backend Railway necesita aceptar peticiones desde el dominio de Vercel.
Como ya configuramos `CORS(app, origins="*")` en `app.py`, **no hay que
cambiar nada en Railway**: la seguridad la garantiza la verificación del
ID token de Firebase en `@require_auth`.

> Si en el futuro quieres restringir CORS a un dominio concreto, añade en
> Railway → Service → Variables: `FRONTEND_ORIGINS=https://tu-dominio.vercel.app`
> y ajusta `app.py` para leer esa variable.

---

## 4. Subir el APK a Firebase Storage

El APK se aloja en el bucket de Firebase Storage del proyecto
`signium-96988`. Pasos:

### 4.1. Generar el APK firmado

En Android Studio (app SIGNIUM):

1. `Build` → `Generate Signed Bundle / APK…`
2. Elige **APK**.
3. Selecciona o crea tu keystore (**guárdalo bien, es irreemplazable**).
4. Variant: `release`.
5. El archivo se genera en `app/release/app-release.apk`.

### 4.2. Subirlo a Firebase Storage (consola web)

1. <https://console.firebase.google.com/> → proyecto `signium-96988`.
2. Menú **Build → Storage**.
3. Crea una carpeta `downloads/` (botón "Create folder").
4. Sube `app-release.apk` dentro y renómbralo a `signium-v1.0.0.apk`.
5. Haz clic en el archivo → pestaña **File location** → **copia la
   download URL**. Esa URL ya incluye un token y permite descarga sin
   autenticación.

### 4.3. Pegar la URL en Vercel

Vuelve a **Vercel → Settings → Environment Variables** y pega la URL en:

```
NEXT_PUBLIC_APK_URL=https://firebasestorage.googleapis.com/v0/b/signium-96988.firebasestorage.app/o/downloads%2Fsignium-v1.0.0.apk?alt=media&token=...
```

Redeploy y `/descargas` tendrá el botón funcionando.

---

## 5. Reglas de Firestore y Storage

Mínimas para no exponer datos:

```
// Firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /streaks/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
    }
    match /community_posts/{postId} {
      allow read:   if true;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.uid;
    }
  }
}
```

```
// Storage
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /downloads/{file=**} {
      allow read: if true;       // APK descargable
      allow write: if false;
    }
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

> Estas reglas no afectan al backend porque usa Firebase **Admin SDK**,
> que se las salta. Solo protegen los accesos directos desde el navegador.

---

## 6. Dominio personalizado (opcional)

1. Vercel → **Settings → Domains** → "Add Domain".
2. Vercel te dirá qué CNAME añadir en tu DNS.
3. Una vez propagado, Vercel emite el certificado HTTPS automáticamente.
4. Si usas un dominio nuevo, también añádelo en Firebase Auth →
   **Authentication → Settings → Authorized domains**.

---

## 7. Checklist final antes de abrir al público

- [ ] Variables de entorno aplicadas en Vercel (Prod + Preview + Dev).
- [ ] APK subido y `NEXT_PUBLIC_APK_URL` puesto.
- [ ] Reglas de Firestore + Storage publicadas.
- [ ] Backend Railway funcionando (probar `/auth/login` con Postman).
- [ ] Secretos del backend (`config.py`) **rotados** si el repo es público.
- [ ] Dominio personalizado configurado y verificado en Firebase Auth.
- [ ] Después del primer deploy, abre las **DevTools → Lighthouse** y haz
      una pasada de Performance + Best Practices. Apunta a >90 en ambas.
