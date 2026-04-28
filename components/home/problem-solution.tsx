import Image from "next/image";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function ProblemSolution() {
  return (
    <section className="py-20 md:py-28 container">
      <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 items-center">
        {/* Imagen */}
        <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-signium-glow ring-1 ring-slate-200">
          <Image
            src="/signing.jpg"
            alt="Dos personas conversando en lengua de signos"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Overlay con tinte del logo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-signium-blue/30 via-transparent to-signium-cyan/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />

          {/* Cita superpuesta */}
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 backdrop-blur-md p-5 shadow-lg">
            <p className="text-sm md:text-base text-slate-800 leading-relaxed">
              <span className="text-signium-blue font-semibold">"Cada conversación cuenta."</span>{" "}
              Por eso construimos una herramienta que devuelve el diálogo donde antes
              había silencio.
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-rose-50 ring-1 ring-rose-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-rose-500" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-rose-500">
                El problema
              </span>
            </div>
            <h3 className="mt-4 text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
              La comunicación todavía tiene muros invisibles.
            </h3>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              Millones de personas sordas y con discapacidad auditiva se comunican
              cada día en lengua de signos, pero la mayoría de personas oyentes no
              la entienden. El resultado es fricción constante en sanidad,
              educación, servicios públicos y momentos cotidianos.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-signium-gradient flex items-center justify-center shadow-signium-glow-cyan">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-signium-blue">
                Nuestra solución
              </span>
            </div>
            <h3 className="mt-4 text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
              Un traductor con IA que cabe en un bolsillo.
            </h3>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              SIGNIUM utiliza la cámara del móvil para detectar gestos, los
              clasifica con modelos de IA entrenados en LSE y los convierte en voz
              al instante. Sin hardware especializado y sin necesidad de conexión
              a internet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
