import Link from "next/link";
import Image from "next/image";
import { Download, Smartphone, Apple, Monitor, ShieldCheck, type LucideIcon } from "lucide-react";

export const metadata = {
  title: "Descargas — SIGNIUM",
  description: "Descarga la app SIGNIUM para Android.",
};

export default function DescargasPage() {
  const apkUrl     = process.env.NEXT_PUBLIC_APK_URL ?? "";
  const apkVersion = process.env.NEXT_PUBLIC_APK_VERSION ?? "1.0.0";
  const available  = apkUrl.length > 0;

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-slate-200/60">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 rounded-lg overflow-hidden bg-signium-gradient shadow-signium-glow-cyan">
              <Image src="/logo.png" alt="SIGNIUM" fill sizes="36px" className="object-contain p-1" />
            </div>
            <span className="font-bold tracking-tight text-slate-900">SIGNIUM</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-signium-blue transition"
          >
            ← Volver
          </Link>
        </div>
      </header>

      <div className="container py-12 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Descarga <span className="signium-text-gradient">SIGNIUM</span>
        </h1>
        <p className="mt-3 text-slate-600">
          De momento, la app solo está disponible para Android. Estamos trabajando
          para traerla a más plataformas muy pronto.
        </p>

        <div className="mt-10 rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur p-8 shadow-signium-glow">
          <div className="flex items-start gap-4">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-signium-gradient text-white shadow-signium-glow-cyan">
              <Smartphone size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">Android</h2>
              <p className="text-sm text-slate-500">APK versión {apkVersion}</p>
            </div>
          </div>

          <p className="mt-5 text-sm text-slate-600">
            Descarga el APK directamente desde nuestros servidores. Al instalar
            desde un archivo, Android puede pedirte permitir la instalación de
            apps de «orígenes desconocidos».
          </p>

          <div className="mt-6">
            {available ? (
              <a
                href={apkUrl}
                download
                className="inline-flex items-center gap-2 rounded-full bg-signium-gradient px-6 py-3 text-sm font-semibold text-white shadow-signium-glow hover:shadow-signium-glow-cyan transition"
              >
                <Download size={16} />
                Descargar APK
              </a>
            ) : (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                El enlace de descarga aún no está configurado.{" "}
                <span className="font-medium">
                  Define la variable de entorno <code>NEXT_PUBLIC_APK_URL</code> en Vercel.
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-start gap-2 text-xs text-slate-500">
            <ShieldCheck size={16} className="flex-shrink-0 mt-0.5 text-signium-blue" />
            <p>
              El APK se descarga por HTTPS desde Firebase Storage. Verifica
              siempre que la URL apunte al dominio oficial antes de instalar.
            </p>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <UnavailableCard Icon={Apple}   title="iOS"     note="En desarrollo" />
          <UnavailableCard Icon={Monitor} title="Desktop" note="Próximamente" />
        </div>
      </div>
    </main>
  );
}

function UnavailableCard({
  Icon, title, note,
}: {
  Icon: LucideIcon;
  title: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/60 bg-white/60 p-5 opacity-70">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-slate-100 text-slate-500">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-semibold text-slate-800">{title}</p>
          <p className="text-xs text-slate-500">{note}</p>
        </div>
      </div>
    </div>
  );
}
