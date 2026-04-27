import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles } from "lucide-react";

// El hero está partido en dos:
// 1. Esta zona (server component) — texto + CTA — se renderiza al instante
//    desde el HTML del servidor: 0 JS necesario para verlo.
// 2. <HeroScene /> (client) — solo el canvas Spline. Se carga de forma
//    diferida con next/dynamic + ssr:false; el placeholder visible durante
//    su descarga es el mismo gradiente del fondo, así que no se nota.
const HeroScene = dynamic(
  () => import("@/components/ui/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="relative min-h-[340px] md:min-h-full bg-signium-gradient">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            <span className="text-xs uppercase tracking-widest text-white/80">
              Cargando experiencia
            </span>
          </div>
        </div>
      </div>
    ),
  },
);

export function Hero() {
  return (
    <section className="relative">
      <div
        className="relative w-full overflow-hidden rounded-3xl bg-signium-gradient shadow-signium-glow"
        style={{ contain: "layout paint" }}
      >
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[640px] md:min-h-[720px]">
          {/* Lado izquierdo: contenido (server-rendered, instantáneo) */}
          <div className="p-8 md:p-14 flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              IA · Lengua de Signos Española en tiempo real
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="relative h-14 w-14 rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur-sm overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="SIGNIUM logo"
                  fill
                  sizes="56px"
                  className="object-contain p-1.5"
                  priority
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                SIGNIUM
              </h1>
            </div>

            <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-white/90">
              Una aplicación móvil con inteligencia artificial que traduce la{" "}
              <span className="font-semibold text-white">
                Lengua de Signos Española
              </span>{" "}
              a voz en tiempo real. Diseñada para derribar barreras de comunicación
              y devolverle protagonismo a cada gesto.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#about"
                className="group inline-flex items-center gap-2 rounded-full bg-white text-signium-blue px-5 py-3 text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-xl hover:scale-[1.02] transition"
              >
                Descubre el proyecto
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#technology"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 backdrop-blur-md transition"
              >
                Ver cómo funciona
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "Tiempo real", v: "<100ms" },
                { k: "Funciona", v: "Offline" },
                { k: "Plataforma", v: "Android" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="text-2xl font-bold text-white">{s.v}</div>
                  <div className="text-xs uppercase tracking-wider text-white/70 mt-1">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lado derecho: escena 3D (client-only, lazy) */}
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
