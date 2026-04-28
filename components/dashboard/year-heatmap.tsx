"use client";

// Heatmap estilo GitHub: 53 semanas × 7 días por año.
// En móvil el heatmap se desplaza horizontalmente con un fade visual
// que indica que hay más contenido.

interface DayCell { date: string; count: number; }

interface Props {
  year: number;
  days: DayCell[];
}

const MONTHS = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const DOW    = ["L","M","X","J","V","S","D"];

function colorFor(c: number): string {
  if (c === 0) return "bg-slate-100";
  if (c === 1) return "bg-signium-cyan/40";
  if (c <= 3)  return "bg-signium-cyan/70";
  if (c <= 6)  return "bg-signium-blue/80";
  return "bg-signium-deep";
}

export function YearHeatmap({ year, days }: Props) {
  const toMon = (d: Date) => (d.getDay() + 6) % 7;

  const firstDay     = new Date(`${year}-01-01T00:00:00Z`);
  const firstWeekday = toMon(firstDay);

  const padded: (DayCell | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...days,
  ];

  const weeks: (DayCell | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  while (weeks[weeks.length - 1]!.length < 7) {
    weeks[weeks.length - 1]!.push(null);
  }

  const monthLabels: { col: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((w, col) => {
    const firstReal = w.find((d) => d !== null) as DayCell | undefined;
    if (!firstReal) return;
    const m = new Date(firstReal.date).getUTCMonth();
    if (m !== lastMonth) {
      monthLabels.push({ col, label: MONTHS[m] });
      lastMonth = m;
    }
  });

  const total = days.reduce((s, d) => s + d.count, 0);

  // Anchura aproximada del heatmap: 53 semanas × 14px = 742px + 28px labels = 770px
  const CELL = 12; // px — h-3 w-3
  const GAP  = 2;  // gap-0.5
  const LABEL_W = 28; // pl-7

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur p-4 sm:p-5 shadow-sm">
      {/* Cabecera */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h3 className="font-semibold text-slate-900 text-sm">
          Actividad en {year}
        </h3>
        <p className="text-xs text-slate-500">{total} contribuciones este año</p>
      </div>

      {/* Aviso de scroll (solo visible cuando la pantalla es más estrecha que el heatmap) */}
      <p className="text-[10px] text-slate-400 mb-2 sm:hidden">
        ← Desliza para ver todo el año →
      </p>

      {/* Contenedor con scroll horizontal y fade derecho */}
      <div className="relative">
        {/* Fade en el borde derecho — indica que hay más contenido */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/80 to-transparent z-10 sm:hidden" />

        <div className="overflow-x-auto pb-1">
          <div
            className="inline-block"
            style={{ minWidth: `${LABEL_W + weeks.length * (CELL + GAP)}px` }}
          >
            {/* Etiquetas de mes */}
            <div
              className="flex mb-1 h-4 text-[10px] text-slate-500 relative"
              style={{ paddingLeft: `${LABEL_W}px` }}
            >
              {monthLabels.map(({ col, label }) => (
                <span
                  key={col}
                  className="absolute"
                  style={{ left: `${LABEL_W + col * (CELL + GAP)}px` }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex gap-0.5">
              {/* Labels L–D */}
              <div className="flex flex-col gap-0.5 pr-1" style={{ width: `${LABEL_W}px` }}>
                {DOW.map((d, i) => (
                  <div
                    key={i}
                    className="h-3 text-[9px] text-slate-400 flex items-center justify-end pr-1"
                  >
                    {i % 2 === 1 ? d : ""}
                  </div>
                ))}
              </div>

              {/* Celdas */}
              {weeks.map((week, ci) => (
                <div key={ci} className="flex flex-col gap-0.5">
                  {week.map((day, ri) => (
                    <div
                      key={ri}
                      title={day ? `${day.date}: ${day.count}` : undefined}
                      className={`h-3 w-3 rounded-sm transition-colors ${
                        day ? colorFor(day.count) : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Leyenda */}
            <div className="flex items-center gap-1.5 mt-3 text-[10px] text-slate-400">
              <span>Menos</span>
              {[0, 1, 3, 6, 10].map((v) => (
                <div key={v} className={`h-3 w-3 rounded-sm ${colorFor(v)}`} />
              ))}
              <span>Más</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
