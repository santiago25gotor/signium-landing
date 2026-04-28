"use client";

// Error boundary global — captura cualquier error de runtime en las rutas.
// Sin este archivo, Next.js muestra la pantalla blanca de "Application error".

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // En producción aquí conectarías Sentry u otro servicio de logging.
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm w-full">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center justify-center gap-2.5 mb-10">
          <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-signium-gradient shadow-signium-glow-cyan">
            <Image
              src="/logo.png"
              alt="SIGNIUM"
              fill
              sizes="44px"
              className="object-contain p-1.5"
              priority
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">SIGNIUM</span>
        </Link>

        {/* Icono de error */}
        <div className="mx-auto mb-5 h-16 w-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
          <span className="text-3xl" role="img" aria-label="Error">⚠️</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Algo salió mal
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Ha ocurrido un error inesperado. Puedes intentar recargar la página
          o volver al inicio.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-signium-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-signium-glow hover:shadow-signium-glow-cyan transition"
          >
            <RefreshCw size={14} />
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Home size={14} />
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
