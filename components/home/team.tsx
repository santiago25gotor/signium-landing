import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const team = [
  {
    name: "Sergi Fernández",
    role: "IA · Backend · Android",
    body: "Lidera el pipeline de IA, los servicios backend y la implementación nativa Android que une todas las piezas.",
    initials: "SF",
  },
  {
    name: "Santiago Gotor",
    role: "IA · Backend · Android · Análisis de datos",
    body: "Trabaja sobre los modelos de IA, el backend y la capa Android, y dirige el análisis de datos que da forma a cómo aprende SIGNIUM.",
    initials: "SG",
  },
  {
    name: "Cindy Tot",
    role: "Diseño e Identidad Visual",
    body: "Crea el lenguaje visual de SIGNIUM — desde el logo y la paleta hasta las superficies que el usuario realmente vive.",
    initials: "CT",
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 md:py-32 container">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-signium-blue">Equipo</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
          Las personas detrás de SIGNIUM.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {team.map((m) => (
          <Card
            key={m.name}
            className="group relative hover:-translate-y-1 hover:border-signium-cyan/40 transition duration-300"
          >
            {/* Borde superior con degradado del logo */}
            <div className="absolute inset-x-0 top-0 h-1 bg-signium-gradient" />

            <CardHeader>
              <div className="h-16 w-16 rounded-2xl bg-signium-gradient flex items-center justify-center text-white font-bold text-xl shadow-signium-glow-cyan">
                {m.initials}
              </div>
              <CardTitle className="mt-5 text-xl">{m.name}</CardTitle>
              <p className="text-sm font-semibold text-signium-blue">{m.role}</p>
              <CardDescription className="mt-3">{m.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
