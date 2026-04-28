import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const stack = [
  { name: "MediaPipe Hands", body: "Tracking robusto de landmarks de la mano que alimenta la detección de gestos desde la cámara." },
  { name: "Clasificación con IA", body: "Modelos propios entrenados para reconocer signos de la LSE a partir de secuencias de keypoints." },
  { name: "Optimización en GPU", body: "Inferencia acelerada con delegados GPU para conseguir rendimiento fluido en tiempo real." },
  { name: "Firebase", body: "Autenticación, analítica y configuración remota para evolucionar el producto sin fricción." },
  { name: "Android · Kotlin", body: "App nativa Android en Kotlin: control fino sobre cámara, sensores y threading." },
  { name: "Dataset y data augmentation", body: "Un dataset de LSE curado y pipelines de aumento construidos específicamente para este proyecto." },
];

export function Technology() {
  return (
    <section
      id="technology"
      className="relative py-24 md:py-32"
    >
      {/* Banda decorativa con tinte del logo */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signium-cyan/40 to-transparent" />

      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-signium-blue">
            Tecnología e innovación
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            El stack detrás de la traducción.
          </h2>
          <p className="mt-5 text-slate-600 text-lg leading-relaxed">
            Cada capa de SIGNIUM se eligió buscando equilibrio entre precisión,
            rendimiento en tiempo real y la capacidad de funcionar de forma
            privada en el dispositivo del usuario.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stack.map((s) => (
            <Card
              key={s.name}
              className="hover:-translate-y-1 hover:border-signium-cyan/40 transition duration-300"
            >
              <CardHeader>
                <div className="h-1.5 w-10 rounded-full bg-signium-gradient mb-4" />
                <CardTitle className="text-slate-900">{s.name}</CardTitle>
                <CardDescription className="mt-2">{s.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
