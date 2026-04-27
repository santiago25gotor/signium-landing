import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-sm">
      <div className="container py-12 grid gap-8 md:grid-cols-3 items-start">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-signium-gradient shadow-signium-glow-cyan">
            <Image
              src="/logo.png"
              alt="SIGNIUM"
              fill
              sizes="40px"
              className="object-contain p-1"
            />
          </div>
          <div>
            <div className="font-bold tracking-tight text-slate-900">SIGNIUM</div>
            <div className="text-xs text-slate-500">Making hands speak</div>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed md:text-center">
          Construido con propósito por un equipo que cree que la accesibilidad
          es un derecho, no una opción.
        </p>

        <div className="md:text-right">
          <p className="text-sm italic signium-text-gradient font-semibold">
            Signium — Making hands speak
          </p>
          <p className="text-xs text-slate-500 mt-2">
            © {new Date().getFullYear()} SIGNIUM. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
