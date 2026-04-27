import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, MessageSquareText, Globe2, Building2, HeartHandshake } from "lucide-react";

const future = [
  { icon: BookOpen, title: "Vocabulario ampliado", body: "Crecer continuamente la cobertura de signos LSE para reflejar conversaciones reales." },
  { icon: MessageSquareText, title: "Frases completas", body: "Pasar de signos aislados a oraciones gramaticales con prosodia natural." },
  { icon: Globe2, title: "Más lenguas de signos", body: "Adaptar la arquitectura para soportar variantes regionales e internacionales." },
  { icon: Building2, title: "Despliegue institucional", body: "Llevar SIGNIUM a hospitales, escuelas y servicios públicos donde la accesibilidad importa más." },
  { icon: HeartHandshake, title: "Impacto social", body: "Colaborar con la comunidad sorda y asociaciones para crecer con —no solo para— las personas a las que servimos." },
];

export function Vision() {
  return (
    <section id="vision" className="relative py-24 md:py-32 overflow-hidden">
      {/* Fondo decorativo claro */}
      <div className="absolute inset-0 bg-signium-soft" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-signium-cyan/20 blur-3xl" />

      <div className="container relative">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-signium-blue">
            Visión y futuro
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Hacia dónde va SIGNIUM.
          </h2>
          <p className="mt-5 text-slate-600 text-lg leading-relaxed">
            SIGNIUM nació con un vocabulario enfocado, en un solo móvil. La hoja de
            ruta es convertirlo en una plataforma completa de accesibilidad.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {future.map(({ icon: Icon, title, body }) => (
            <Card
              key={title}
              className="hover:-translate-y-1 hover:border-signium-cyan/40 transition duration-300"
            >
              <CardHeader>
                <div className="h-11 w-11 rounded-xl bg-white ring-1 ring-signium-cyan/30 flex items-center justify-center shadow-sm">
                  <Icon className="h-5 w-5 text-signium-blue" />
                </div>
                <CardTitle className="mt-5">{title}</CardTitle>
                <CardDescription className="mt-2">{body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
