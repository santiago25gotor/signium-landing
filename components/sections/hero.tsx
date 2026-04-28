import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

// ─── Visual estático (sin Spline, sin JS extra) ───────────────────────────────
// Se renderiza en el servidor → carga instantánea, sin errores de canvas.
function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center py-10 md:py-0 overflow-hidden">
      {/* Patrón de puntos decorativo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Anillos decorativos */}
      <div className="absolute w-72 h-72 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute w-48 h-48 rounded-full border border-white/20 pointer-events-none" />

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6">
        {/* Mano en lengua de signos */}
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white/20 border border-white/30 backdrop-blur-sm shadow-2xl flex items-center justify-center">
            <span
              className="text-6xl md:text-7xl select-none"
              role="img"
              aria-label="Seña 'te quiero' en LSE"
            >
              🤟
            </span>
          </div>
          {/* Anillo pulsante sutil */}
          <div className="absolute -inset-2 rounded-[2rem] border border-white/15 animate-pulse pointer-events-none" />
        </div>

        {/* Card de traducción */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-5 py-3.5 shadow-xl w-56 md:w-64">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
            Traduciendo ahora…
          </p>
          <p className="text-white font-bold text-base mt-1">
            "Hola, ¿cómo estás?"
          </p>
          <div className="mt-2.5 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-4/5 bg-white/70 rounded-full" />
          </div>
        </div>

        {/* Badges de características */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { emoji: "⚡", label: "<100 ms" },
            { emoji: "📶", label: "Offline" },
            { emoji: "🤖", label: "On-device AI" },
          ].map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 backdrop-blur-sm rounded-full px-3 py-1.5"
            >
              <span className="text-sm">{b.emoji}</span>
              <span className="text-white text-xs font-semibold">{b.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero principal ────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section className="relative">
      <div
        className="relative w-full overflow-hidden rounded-3xl bg-signium-gradient shadow-signium-glow"
        style={{ contain: "layout paint" }}
      >
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
          {/* ── Izquierda: texto + CTA ── */}
          <div className="p-8 md:p-14 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              IA · Lengua de Signos Española en tiempo real
            </div>

            {/* Logo + título */}
            <div className="mt-8 flex items-center gap-4">
              <div className="relative h-14 w-14 rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur-sm overflow-hidden shrink-0">
                <Image
                  src="/logo.png"
                  alt="SIGNIUM logo"
                  fill
                  sizes="56px"
                  className="object-contain p-1.5"
                  priority
                />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                SIGNIUM
              </h1>
            </div>

            {/* Descripción */}
            <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-white/90">
              Una aplicación móvil con inteligencia artificial que traduce la{" "}
              <span className="font-semibold text-white">
                Lengua de Signos Española
              </span>{" "}
              a voz en tiempo real. Diseñada para derribar barreras de
              comunicación y devolverle protagonismo a cada gesto.
            </p>

            {/* CTAs */}
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

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { k: "Tiempo real", v: "<100ms" },
                { k: "Funciona",    v: "Offline" },
                { k: "Plataforma",  v: "Android" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="text-xl md:text-2xl font-bold text-white">
                    {s.v}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-white/70 mt-1">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Derecha: visual estático ── */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
