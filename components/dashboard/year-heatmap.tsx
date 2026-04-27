"use client";

// Heatmap estilo GitHub: 53 semanas × 7 días por año.
// Cada celda es un día. El color codifica el nº de contribuciones.

interface DayCell { date: string; count: number; }

interface Props {
  year: number;
  days: DayCell[];
}

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const DOW    = ["L", "M", "X", "J", "V", "S", "D"];

function colorFor(c: number): string {
  if (c === 0) return "bg-slate-100";
  if (c === 1) return "bg-signium-cyan/40";
  if (c <= 3)  return "bg-signium-cyan/70";
  if (c <= 6)  return "bg-signium-blue/80";
  return "bg-signium-deep";
}

export function YearHeatmap({ year, days }: Props) {
  // Convertimos a 7 filas (L-D) × N columnas (semanas).
  // weekday 0=lunes … 6=domingo. Date.getDay() devuelve 0=domingo.
  const toMon = (d: Date) => (d.getDay() + 6) % 7;

  const firstDay   = new Date(`${year}-01-01T00:00:00Z`);
  const firstWeekday = toMon(firstDay);

  // Alineamos: insertamos nulos al inicio para que la primera columna empiece en lunes.
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

  // Etiquetas de mes: para cada semana, si su primer día marca un cambio de mes, anotamos.
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

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Actividad en {year}</h3>
        <p className="text-xs text-slate-500">{total} contribuciones este año</p>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Mes labels */}
          <div className="flex pl-7 mb-1 h-4 text-[10px] text-slate-500 relative">
            {monthLabels.map(({ col, label }) => (
              <span
                key={col}
                className="absolute"
                style={{ left: `${28 + col * 14}px` }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-0.5">
            {/* Labels L-D */}
            <div className="flex flex-col gap-0.5 pr-1">
              {DOW.map((d, i) => (
                <div
                  key={i}
                  className="h-3 w-5 text-[9px] text-slate-400 flex items-center"
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
                    className={`h-3 w-3 rounded-sm ${
                      day ? colorFor(day.count) : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Leyenda */}
          <div className="flex items-center gap-1.5 mt-3 text-[10px] text-slate-500">
            <span>Menos</span>
            {[0, 1, 3, 6, 10].map((v) => (
              <div key={v} className={`h-3 w-3 rounded-sm ${colorFor(v)}`} />
            ))}
            <span>Más</span>
          </div>
        </div>
      </div>
    </div>
  );
}
