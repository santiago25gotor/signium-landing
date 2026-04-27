import Link from "next/link";
import Image from "next/image";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-signium-gradient shadow-signium-glow-cyan">
            <Image src="/logo.png" alt="SIGNIUM" fill sizes="40px" className="object-contain p-1" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">SIGNIUM</span>
        </Link>

        <div className="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur p-8 shadow-signium-glow">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>

        {footer && <div className="mt-6 text-center text-sm text-slate-600">{footer}</div>}
      </div>
    </main>
  );
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1.5">{label}</span>
      {children}
      {error && <span className="block mt-1 text-xs text-red-600">{error}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 " +
  "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-signium-blue/40 " +
  "focus:border-signium-blue transition";

export const btnPrimaryClass =
  "w-full inline-flex items-center justify-center rounded-lg bg-signium-gradient " +
  "px-4 py-2.5 text-sm font-semibold text-white shadow-signium-glow " +
  "hover:shadow-signium-glow-cyan transition disabled:opacity-60 disabled:cursor-not-allowed";
