import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
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

        {/* Número 404 */}
        <div className="text-8xl sm:text-9xl font-extrabold signium-text-gradient mb-4 leading-none">
          404
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Página no encontrada
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Esta página no existe o ha sido movida.
          ¿Buscabas algo concreto?
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-signium-gradient px-6 py-3 text-sm font-semibold text-white shadow-signium-glow hover:shadow-signium-glow-cyan transition"
        >
          <ArrowLeft size={14} />
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
