/** @type {import('next').NextConfig} */

// ─────────────────────────────────────────────────────────────────────────────
// Headers de seguridad
// ─────────────────────────────────────────────────────────────────────────────
//
// CSP (Content-Security-Policy) restringe qué recursos puede cargar el
// navegador. Necesitamos permitir:
//  - Spline runtime (3D)            → prod.spline.design + scene blobs
//  - Firebase Auth                  → identitytoolkit + securetoken google
//  - Firebase Storage               → firebasestorage.googleapis.com (descarga APK)
//  - Backend Railway                → para llamadas /stats/me/*
//  - Cloudinary (avatares/videos)   → res.cloudinary.com
//  - Imágenes Next.js                → datos data: para PWA/SVG
//
// 'unsafe-inline' en style-src es necesario porque Tailwind/Next genera
// estilos inline en algunos componentes (es un compromiso aceptado por la
// comunidad Next; no hay forma de evitarlo sin Strict-Dynamic).

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://backendsignium-production.up.railway.app";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://res.cloudinary.com https://*.googleusercontent.com https://firebasestorage.googleapis.com",
  "font-src 'self' data:",
  `connect-src 'self' ${apiUrl} https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.firebaseio.com https://*.googleapis.com https://prod.spline.design https://*.spline.design wss://*.firebaseio.com`,
  "frame-src 'self' https://signium-96988.firebaseapp.com",
  "media-src 'self' https://res.cloudinary.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy",  value: csp },
  { key: "X-Frame-Options",          value: "DENY" },
  { key: "X-Content-Type-Options",   value: "nosniff" },
  { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control",   value: "on" },
];

const nextConfig = {
  // Strict mode desactivado: en dev monta dos veces los componentes y
  // el canvas WebGL de Spline parpadea. Producción no se ve afectada.
  reactStrictMode: false,

  // Quita el header `X-Powered-By: Next.js` (información innecesaria).
  poweredByHeader: false,

  // Compresión Brotli/gzip por defecto (Vercel ya lo hace pero lo dejamos
  // explícito por si se sirve en self-hosted).
  compress: true,

  // Optimiza imports de iconos para que el bundler solo incluya los
  // iconos realmente usados de lucide-react, no toda la librería.
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },

  // Quita los console.log/warn/error del bundle de producción.
  // Dejamos `error` y `warn` para no perder pistas críticas en runtime.
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  // Permite que <Image src> funcione con dominios remotos.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
