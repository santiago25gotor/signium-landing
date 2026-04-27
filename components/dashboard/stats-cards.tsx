"use client";

import { Flame, TrendingUp, Calendar, Trophy } from "lucide-react";

interface Props {
  total: number;
  thisMonth: number;
  thisYear: number;
  streakDays: number;
}

export function StatsCards({ total, thisMonth, thisYear, streakDays }: Props) {
  const items = [
    { label: "Total histórico", value: total, Icon: Trophy,     tint: "from-signium-cyan to-signium-blue" },
    { label: "Este mes",        value: thisMonth, Icon: Calendar,   tint: "from-signium-sky to-signium-deep" },
    { label: "Este año",        value: thisYear,  Icon: TrendingUp, tint: "from-signium-blue to-signium-deep" },
    { label: "Racha (días)",    value: streakDays, Icon: Flame,     tint: "from-orange-400 to-red-500" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(({ label, value, Icon, tint }) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur p-5 shadow-sm"
        >
          <div className={`inline-flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br ${tint} text-white shadow-signium-glow-cyan`}>
            <Icon className="h-4.5 w-4.5" size={18} />
          </div>
          <p className="mt-3 text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        </div>
      ))}
    </div>
  );
}
