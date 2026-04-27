"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { LogOut, AlertTriangle, RefreshCw } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { apiFetch } from "@/lib/api";
import { API_URL } from "@/lib/firebase";
import { StatsCards }   from "@/components/dashboard/stats-cards";
import { YearHeatmap }  from "@/components/dashboard/year-heatmap";
import {
  StatsSkeleton, ChartSkeleton, HeatmapSkeleton,
} from "@/components/dashboard/skeleton";

// Recharts pesa ~120 KB. Lo cargamos solo cuando el dashboard tiene datos
// que dibujar — mientras tanto se ven los skeletons. Esto reduce el
// First Load JS de /dashboard de ~255 KB a ~135 KB.
const ContributionChart = dynamic(
  () => import("@/components/dashboard/contribution-chart").then((m) => m.ContributionChart),
  { ssr: false, loading: () => <ChartSkeleton title="Cargando gráfico…" /> },
);

interface Summary {
  total: number; thisMonth: number; thisYear: number;
  streakDays: number; weekDays: boolean[]; weekCount: number;
}
interface MonthlyResp { year: number; data: { month: string; count: number }[]; }
interface YearlyResp  { data: { year: string; count: number }[]; }
interface HeatmapResp { year: number; days: { date: string; count: number }[]; total: number; }

type LoadState = "idle" | "loading" | "ok" | "error";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  const [year, setYear]         = useState<number>(new Date().getFullYear());
  const [summary, setSummary]   = useState<Summary | null>(null);
  const [monthly, setMonthly]   = useState<MonthlyResp | null>(null);
  const [yearly,  setYearly]    = useState<YearlyResp  | null>(null);
  const [heatmap, setHeatmap]   = useState<HeatmapResp | null>(null);
  const [state,   setState]     = useState<LoadState>("idle");
  const [err,     setErr]       = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user)               { router.replace("/login");        return; }
    if (!user.emailVerified) { router.replace("/verify-email"); return; }
  }, [user, loading, router]);

  async function fetchData(selectedYear: number) {
    setState("loading");
    setErr(null);
    try {
      const [s, m, y, h] = await Promise.all([
        apiFetch<Summary     & { success: boolean }>("/stats/me/summary"),
        apiFetch<MonthlyResp & { success: boolean }>(`/stats/me/monthly?year=${selectedYear}`),
        apiFetch<YearlyResp  & { success: boolean }>("/stats/me/yearly"),
        apiFetch<HeatmapResp & { success: boolean }>(`/stats/me/heatmap?year=${selectedYear}`),
      ]);
      setSummary(s); setMonthly(m); setYearly(y); setHeatmap(h);
      setState("ok");
    } catch (e: any) {
      setState("error");
      if (e?.message === "Failed to fetch" || e instanceof TypeError) {
        setErr(
          `No se pudo conectar con el backend. Comprueba que NEXT_PUBLIC_API_URL apunta a tu servidor Railway (ahora apunta a: ${API_URL}).`,
        );
      } else {
        setErr(e?.message ?? "Error cargando estadísticas.");
      }
    }
  }

  useEffect(() => {
    if (!user?.emailVerified) return;
    let cancelled = false;
    fetchData(year).catch(() => {});
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, year]);

  // Pantalla de carga inicial (antes de saber si hay usuario)
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="inline-block h-4 w-4 rounded-full border-2 border-signium-blue border-t-transparent animate-spin" />
          Comprobando sesión…
        </div>
      </main>
    );
  }

  if (!user) return null; // el useEffect hace el redirect

  const availableYears = yearly?.data.length
    ? yearly.data.map((d) => parseInt(d.year)).sort((a, b) => b - a)
    : [new Date().getFullYear()];

  const isLoading = state === "idle" || state === "loading";

  return (
    <main className="min-h-screen">
      {/* ── Cabecera ── */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-slate-200/60">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 rounded-lg overflow-hidden bg-signium-gradient shadow-signium-glow-cyan">
              <Image src="/logo.png" alt="SIGNIUM" fill sizes="36px" className="object-contain p-1" />
            </div>
            <span className="font-bold tracking-tight text-slate-900">SIGNIUM</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-slate-600">
              {user.displayName || user.email}
            </span>
            <button
              onClick={async () => { await logout(); router.replace("/"); }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              <LogOut size={15} />
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* ── Contenido ── */}
      <div className="container py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Tu panel</h1>
          <p className="text-slate-600 mt-1 text-sm">
            Visualiza tu impacto en la comunidad SIGNIUM.
          </p>
        </div>

        {/* Error con botón de reintento */}
        {state === "error" && err && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <AlertTriangle size={18} className="flex-shrink-0 mt-0.5 text-red-500" />
            <div className="flex-1 text-sm text-red-700 space-y-2">
              <p>{err}</p>
              <button
                onClick={() => fetchData(year)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 transition"
              >
                <RefreshCw size={12} /> Reintentar
              </button>
            </div>
          </div>
        )}

        {/* Cards de resumen */}
        {isLoading ? (
          <StatsSkeleton />
        ) : summary ? (
          <StatsCards
            total={summary.total}
            thisMonth={summary.thisMonth}
            thisYear={summary.thisYear}
            streakDays={summary.streakDays}
          />
        ) : null}

        {/* Selector de año */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-700">Año:</label>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            disabled={isLoading}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-signium-blue/40 disabled:opacity-50"
          >
            {availableYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Heatmap */}
        {isLoading ? (
          <HeatmapSkeleton />
        ) : heatmap ? (
          <YearHeatmap year={heatmap.year} days={heatmap.days} />
        ) : null}

        {/* Gráficos */}
        <div className="grid gap-6 lg:grid-cols-2">
          {isLoading ? (
            <>
              <ChartSkeleton title="Contribuciones por mes" />
              <ChartSkeleton title="Contribuciones por año" />
            </>
          ) : (
            <>
              {monthly && (
                <ContributionChart
                  title={`Contribuciones por mes — ${monthly.year}`}
                  data={monthly.data.map((d) => ({ label: d.month, count: d.count }))}
                />
              )}
              {yearly && (
                <ContributionChart
                  title="Contribuciones por año"
                  data={yearly.data.map((d) => ({ label: d.year, count: d.count }))}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
