// Pantalla de carga entre navegaciones de página (Next.js App Router).
// Se muestra automáticamente mientras se carga el código de una ruta nueva.

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-signium-blue border-t-transparent animate-spin" />
        <span className="text-sm text-slate-400 tracking-wide">Cargando…</span>
      </div>
    </main>
  );
}
