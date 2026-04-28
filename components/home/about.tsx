import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accessibility, Languages, Sparkles } from "lucide-react";

const items = [
  {
    icon: Languages,
    title: "Traducción LSE en tiempo real",
    body: "Reconoce gestos de la Lengua de Signos Española y los verbaliza al instante, con latencia mínima.",
  },
  {
    icon: Accessibility,
    title: "Pensado para incluir",
    body: "Diseñado junto a las necesidades de personas sordas y con discapacidad auditiva, eliminando fricción en el día a día.",
  },
  {
    icon: Sparkles,
    title: "IA en el dispositivo",
    body: "Visión por computador e inferencia local: sin servidores, sin esperar a la nube, con privacidad por diseño.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 container">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-signium-blue">
          Sobre el proyecto
        </p>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Un puente entre el signo y la voz.
        </h2>
        <p className="mt-5 text-slate-600 text-lg leading-relaxed">
          SIGNIUM es una aplicación móvil que traduce la Lengua de Signos Española
          a voz en tiempo real, usando visión por computador e inteligencia
          artificial entrenada para reconocer gestos manuales. Nuestro objetivo es
          simple: hacer accesible la comunicación cotidiana para todo el mundo.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <Card
            key={title}
            className="hover:-translate-y-1 hover:shadow-signium-glow-cyan/20 hover:shadow-lg hover:border-signium-cyan/40 transition duration-300"
          >
            <CardHeader>
              <div className="h-11 w-11 rounded-xl bg-signium-gradient flex items-center justify-center shadow-signium-glow-cyan">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="mt-5">{title}</CardTitle>
              <CardDescription className="mt-2">{body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
