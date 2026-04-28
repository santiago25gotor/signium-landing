import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

// ── URL base del sitio ─────────────────────────────────────────────────────────
// En Vercel, VERCEL_URL se inyecta automáticamente con el dominio del deploy.
// En local cae a localhost:3000.
// Cuando tengas dominio propio, añade NEXT_PUBLIC_SITE_URL en Vercel → Settings
// → Environment Variables y se usará como prioridad.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "SIGNIUM — Making hands speak",
    template: "%s — SIGNIUM",
  },
  description:
    "Aplicación móvil con IA que traduce la Lengua de Signos Española a voz " +
    "en tiempo real. Diseñada para eliminar barreras de comunicación.",

  // Favicon — Next.js lo inyecta en el <head> automáticamente
  icons: {
    icon:     "/logo.png",
    shortcut: "/logo.png",
    apple:    "/logo.png",
  },

  // Open Graph — redes sociales / previews de enlace
  openGraph: {
    title:       "SIGNIUM — Making hands speak",
    description:
      "Traductor de Lengua de Signos Española a voz en tiempo real, con IA " +
      "en el dispositivo. Sin conexión. Sin servidores. Privacidad por diseño.",
    url:         siteUrl,
    siteName:    "SIGNIUM",
    locale:      "es_ES",
    type:        "website",
  },

  // Twitter card
  twitter: {
    card:        "summary",
    title:       "SIGNIUM — Making hands speak",
    description: "Traductor de LSE a voz en tiempo real con IA.",
  },

  // Robots
  robots: {
    index:  true,
    follow: true,
  },
};

// ── Viewport (separado de metadata en Next 14) ─────────────────────────────────
export const viewport: Viewport = {
  width:               "device-width",
  initialScale:        1,
  themeColor:          "#0066FF",
};

// ── Root layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
