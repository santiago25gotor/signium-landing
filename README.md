# SIGNIUM Landing

Landing page + dashboard de usuario para SIGNIUM, construida con Next.js 14
(App Router) + Tailwind + Firebase Auth + Recharts.

## Desarrollo local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.local.example .env.local   # y rellena los valores

# 3. Arrancar
npm run dev   # http://localhost:3000
```

## Variables de entorno

Las variables se leen de `.env.local` en local y de **Project Settings →
Environment Variables** en Vercel.

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL del backend Railway | `https://backendsignium-production.up.railway.app` |
| `NEXT_PUBLIC_FIREBASE_*` | Config del SDK web (públicas por diseño) | ver `.env.local.example` |
| `NEXT_PUBLIC_APK_URL` | URL pública del APK en Firebase Storage | `https://firebasestorage.googleapis.com/...` |
| `NEXT_PUBLIC_APK_VERSION` | Versión del APK que se muestra en `/descargas` | `1.0.0` |

## Estructura

```
app/
  page.tsx           Home con hero + secciones del proyecto
  login/             Inicio de sesión (Firebase Auth)
  register/          Registro con verificación de email
  verify-email/      Pantalla de espera tras registro
  dashboard/         Panel con estadísticas (protegido)
  descargas/         Descarga del APK (Android)
components/
  sections/          Secciones de la home + Hero (server-rendered)
  ui/                Componentes compartidos (Card, Spotlight, HeroScene…)
  dashboard/         StatsCards, ContributionChart, YearHeatmap, skeletons
lib/
  firebase.ts        Cliente Firebase (eager init)
  auth-context.tsx   Provider con onAuthStateChanged
  api.ts             Wrapper de fetch con Bearer token + timeout
```

## Despliegue en Vercel

Ver [`docs/DEPLOY.md`](docs/DEPLOY.md) para la guía completa con APK,
reglas de Firebase y CORS del backend.

## Optimizaciones de rendimiento aplicadas

- **Spline** (runtime 3D, ~400 KB) se carga vía `next/dynamic` con
  `ssr: false`. El texto del hero es un Server Component y se renderiza
  al instante en HTML.
- **Recharts** (~120 KB) se carga dinámicamente solo cuando hay datos
  para mostrar en el dashboard.
- **lucide-react / recharts / framer-motion** usan `optimizePackageImports`
  en `next.config.mjs` — el bundler solo incluye lo que se importa.
- **Firebase Auth** se inicializa al importar el módulo (no en `useEffect`)
  para que la sesión esté lista en cuanto monta el `AuthProvider`.
- **Imágenes** usan `next/image` con AVIF/WebP automático.
- **Compresión Brotli/gzip** activa.
- **`removeConsole`** en producción (mantiene `error` y `warn`).

## Headers de seguridad

`next.config.mjs` añade a todas las respuestas:

- `Content-Security-Policy` restrictiva (solo `prod.spline.design`,
  Firebase, Cloudinary y el backend están permitidos)
- `X-Frame-Options: DENY` + `frame-ancestors 'none'` — anti-clickjacking
- `Strict-Transport-Security` con preload — fuerza HTTPS
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — bloquea cámara/micro/geolocalización
- `X-Content-Type-Options: nosniff`
