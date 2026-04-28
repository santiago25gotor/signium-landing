"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendEmailVerification, reload } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { AuthShell, btnPrimaryClass } from "@/components/ui/auth-shell";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [msg, setMsg]   = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    // Sondeo ligero: cada 4s comprobamos si el usuario ya verificó.
    const t = setInterval(async () => {
      try {
        await reload(user);
        if (user.emailVerified) {
          clearInterval(t);
          router.replace("/dashboard");
        }
      } catch { /* ignoramos errores transitorios */ }
    }, 4000);
    return () => clearInterval(t);
  }, [user, router]);

  async function resend() {
    if (!user) return;
    setBusy(true);
    setMsg(null);
    try {
      await sendEmailVerification(user);
      setMsg("Email reenviado. Revisa tu bandeja.");
    } catch {
      setMsg("No se pudo reenviar. Inténtalo más tarde.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Verifica tu email"
      subtitle={user ? `Hemos enviado un enlace a ${user.email}.` : "Cargando…"}
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Abre el correo y haz clic en el enlace. Esta página se actualizará sola
          en cuanto detecte la verificación.
        </p>
        {msg && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {msg}
          </div>
        )}
        <button onClick={resend} disabled={busy} className={btnPrimaryClass}>
          {busy ? "Enviando…" : "Reenviar email"}
        </button>
        <button
          onClick={async () => { await logout(); router.replace("/login"); }}
          className="w-full text-sm text-slate-500 hover:text-slate-700 underline"
        >
          Cerrar sesión
        </button>
      </div>
    </AuthShell>
  );
}
