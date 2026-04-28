"use client";

import { useState } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import {
  BarChart3,
  LineChart as LineIcon,
  PieChart as PieIcon,
  type LucideIcon,
} from "lucide-react";

type ChartType = "bar" | "line" | "pie";

interface DataPoint { label: string; count: number; }

interface Props {
  title: string;
  data: DataPoint[];
}

const PIE_COLORS = [
  "#00BFFF", "#1E90FF", "#0066FF", "#003B99",
  "#38BDF8", "#0EA5E9", "#3B82F6", "#2563EB",
  "#1D4ED8", "#1E40AF", "#60A5FA", "#7DD3FC",
];

const tooltipProps = {
  contentStyle: {
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    fontSize: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  } as const,
};

export function ContributionChart({ title, data }: Props) {
  const [type, setType] = useState<ChartType>("bar");

  // Cuando hay muchos puntos (ej: 12 meses) rotamos las etiquetas del eje X
  // para que no se solapan en pantallas pequeñas.
  const manyPoints = data.length > 8;
  const xAxisProps = manyPoints
    ? {
        dataKey: "label" as const,
        stroke: "#94a3b8",
        tick: { fontSize: 10, angle: -40, textAnchor: "end" as const, dy: 2 },
        height: 48,
        interval: 0,
      }
    : {
        dataKey: "label" as const,
        stroke: "#94a3b8",
        tick: { fontSize: 12 },
        height: 30,
        interval: 0,
      };

  const yAxisProps = {
    stroke: "#94a3b8",
    tick: { fontSize: 11 },
    width: 32,
    allowDecimals: false,
  };

  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur p-4 sm:p-5 shadow-sm">
      {/* Cabecera: apila en móvil, fila en sm+ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug">{title}</h3>
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 self-start sm:self-auto shrink-0">
          <TypeBtn active={type === "bar"}  onClick={() => setType("bar")}  Icon={BarChart3} label="Barras" />
          <TypeBtn active={type === "line"} onClick={() => setType("line")} Icon={LineIcon}  label="Líneas" />
          <TypeBtn active={type === "pie"}  onClick={() => setType("pie")}  Icon={PieIcon}   label="Donut"  />
        </div>
      </div>

      {/* Altura menor en móvil */}
      <div className="h-52 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="signium-bar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#00BFFF" />
                  <stop offset="100%" stopColor="#0066FF" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis {...xAxisProps} />
              <YAxis {...yAxisProps} />
              <Tooltip {...tooltipProps} />
              <Bar
                dataKey="count"
                name="Contribuciones"
                fill="url(#signium-bar)"
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          ) : type === "line" ? (
            <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis {...xAxisProps} />
              <YAxis {...yAxisProps} />
              <Tooltip {...tooltipProps} />
              <Line
                type="monotone"
                dataKey="count"
                name="Contribuciones"
                stroke="#0066FF"
                strokeWidth={2.5}
                dot={{ fill: "#0066FF", r: 3 }}
                activeDot={{ r: 5, fill: "#00BFFF" }}
              />
            </LineChart>
          ) : (
            <PieChart margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
              <Pie
                data={data.filter((d) => d.count > 0)}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="45%"
                innerRadius="35%"
                outerRadius="60%"
                paddingAngle={2}
              >
                {data
                  .filter((d) => d.count > 0)
                  .map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
              </Pie>
              <Tooltip {...tooltipProps} />
              <Legend
                wrapperStyle={{ fontSize: 11 }}
                iconSize={10}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TypeBtn({
  active,
  onClick,
  Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  Icon: LucideIcon;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
        active
          ? "bg-white text-signium-blue shadow-sm"
          : "text-slate-600 hover:text-slate-900"
      }`}
      aria-pressed={active}
      title={label}
    >
      <Icon size={14} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
