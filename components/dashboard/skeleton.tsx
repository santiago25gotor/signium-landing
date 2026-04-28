// Skeletons para el dashboard: se muestran mientras cargan los datos
// evitando la pantalla en blanco que hace que el usuario piense que algo falla.

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm animate-pulse">
      <div className="h-9 w-9 rounded-lg bg-slate-200" />
      <div className="mt-3 h-3 w-20 rounded bg-slate-200" />
      <div className="mt-2 h-7 w-12 rounded bg-slate-200" />
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}

export function ChartSkeleton({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <div className="h-8 w-32 rounded-lg bg-slate-100" />
      </div>
      <div className="h-72 flex items-end gap-2 px-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-slate-200"
            style={{ height: `${20 + Math.random() * 60}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function HeatmapSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 sm:p-5 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-40 rounded bg-slate-200" />
        <div className="h-4 w-28 rounded bg-slate-200" />
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-0.5 pl-7" style={{ minWidth: "742px" }}>
          {Array.from({ length: 53 }).map((_, ci) => (
            <div key={ci} className="flex flex-col gap-0.5">
              {Array.from({ length: 7 }).map((_, ri) => (
                <div key={ri} className="h-3 w-3 rounded-sm bg-slate-200" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
