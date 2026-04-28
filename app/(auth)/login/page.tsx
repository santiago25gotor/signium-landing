"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { AuthShell, Field, inputClass, btnPrimaryClass } from "@/components/ui/auth-shell";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [err,         setErr]         = useState<string | null>(null);
  const [busy,        setBusy]        = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Si ya hay sesión verificada, redirigir sin mostrar el formulario
  useEffect(() => {
    if (!loading && user?.emailVerified) {
      setRedirecting(true);
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  // No renderizar el formulario si estamos redirigiendo o cargando
  // y ya sabemos que hay un usuario (evita el flash del formulario)
  if (redirecting || (!loading && user?.emailVerified)) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="inline-block h-4 w-4 rounded-full border-2 border-signium-blue border-t-transparent animate-spin" />
          Redirigiendo…
        </div>
      </main>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const cred = await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
      if (!cred.user.emailVerified) {
        try { await sendEmailVerification(cred.user); } catch { /* no crítico */ }
        router.replace("/verify-email");
        return;
      }
      router.replace("/dashboard");
    } catch (e: any) {
      setErr(parseFirebaseError(e?.code));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Bienvenido de nuevo"
      subtitle="Entra para ver tus estadísticas de contribución."
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="font-semibold text-signium-blue hover:underline">
            Regístrate
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Correo electrónico">
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="tu@correo.com"
            disabled={busy}
          />
        </Field>

        <Field label="Contraseña">
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-10`}
              placeholder="••••••••"
              disabled={busy}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              tabIndex={-1}
              aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>

        {err && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </div>
        )}

        <button type="submit" disabled={busy} className={btnPrimaryClass}>
          {busy
            ? <><span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" /> Entrando…</>
            : "Entrar"}
        </button>
      </form>
    </AuthShell>
  );
}

function parseFirebaseError(code?: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Credenciales incorrectas. Revisa el email y la contraseña.";
    case "auth/user-not-found":
      return "No encontramos ninguna cuenta con ese correo.";
    case "auth/invalid-email":
      return "El formato del correo no es válido.";
    case "auth/too-many-requests":
      return "Demasiados intentos fallidos. Espera unos minutos.";
    case "auth/user-disabled":
      return "Esta cuenta ha sido deshabilitada. Contacta con soporte.";
    case "auth/network-request-failed":
      return "Sin conexión. Comprueba tu red e inténtalo de nuevo.";
    default:
      return "No se pudo iniciar sesión. Inténtalo de nuevo.";
  }
}
