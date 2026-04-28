import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Smartphone, WifiOff, TrendingUp } from "lucide-react";

const objectives = [
  { icon: Zap, title: "Reconocimiento en tiempo real", body: "Detectar y clasificar gestos con la latencia suficiente para que la conversación fluya." },
  { icon: Smartphone, title: "Usabilidad móvil", body: "Una interfaz pensada para situaciones reales, en un solo móvil y con una mano libre para signar." },
  { icon: WifiOff, title: "Funciona offline", body: "La inferencia se ejecuta en el dispositivo: sin conexión y sin enviar vídeo a la nube." },
  { icon: TrendingUp, title: "Vocabulario escalable", body: "Hoy parte de un vocabulario base, diseñado para crecer hacia signos amplios y oraciones completas." },
];

export function Objectives() {
  return (
    <section className="py-24 md:py-32 container">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-signium-blue">Objetivos</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Para qué se construyó SIGNIUM.
        </h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {objectives.map(({ icon: Icon, title, body }) => (
          <Card
            key={title}
            className="group hover:-translate-y-1 hover:border-signium-cyan/40 transition duration-300"
          >
            <CardHeader>
              <div className="h-11 w-11 rounded-xl bg-signium-soft ring-1 ring-signium-cyan/20 flex items-center justify-center group-hover:bg-signium-gradient transition-colors">
                <Icon className="h-5 w-5 text-signium-blue group-hover:text-white transition-colors" />
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
