"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { AuthShell, Field, inputClass, btnPrimaryClass } from "@/components/ui/auth-shell";
import { Eye, EyeOff, Check, X } from "lucide-react";

// Reglas alineadas con backend validators.py
function passwordRules(p: string) {
  return {
    length:    p.length >= 8,
    uppercase: /[A-Z]/.test(p),
    number:    /[0-9]/.test(p),
    special:   /[^a-zA-Z0-9]/.test(p),
  };
}

function validateUsername(u: string): string | null {
  const t = u.trim();
  if (t.length < 3) return "Mínimo 3 caracteres.";
  if (t.length > 30) return "Máximo 30 caracteres.";
  if (!/^[\w\s\-áéíóúÁÉÍÓÚüÜñÑ]+$/.test(t))
    return "Solo letras, números y espacios.";
  return null;
}

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [username,    setUsername]    = useState("");
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [err,         setErr]         = useState<string | null>(null);
  const [busy,        setBusy]        = useState(false);

  // Redirigir si ya hay sesión activa
  useEffect(() => {
    if (!loading && user?.emailVerified) router.replace("/dashboard");
  }, [user, loading, router]);

  if (!loading && user?.emailVerified) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <span className="inline-block h-4 w-4 rounded-full border-2 border-signium-blue border-t-transparent animate-spin" />
          Redirigiendo…
        </div>
      </main>
    );
  }

  const rules = passwordRules(password);
  const allRulesOk = Object.values(rules).every(Boolean);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const uErr = validateUsername(username);
    if (uErr) { setErr(uErr); return; }
    if (!allRulesOk) { setErr("La contraseña no cumple todos los requisitos."); return; }

    setBusy(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        getFirebaseAuth(), email.trim(), password,
      );
      await updateProfile(cred.user, { displayName: username.trim() });
      await sendEmailVerification(cred.user);
      router.replace("/verify-email");
    } catch (e: any) {
      setErr(parseError(e?.code));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Crea tu cuenta"
      subtitle="Empieza a contribuir con tus signos a la comunidad SIGNIUM."
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-semibold text-signium-blue hover:underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Nombre de usuario">
          <input
            type="text"
            autoComplete="nickname"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
            placeholder="Tu nombre"
            disabled={busy}
          />
        </Field>

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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPassFocused(true)}
              onBlur={() => setPassFocused(false)}
              className={`${inputClass} pr-10`}
              placeholder="Mín 8 caracteres"
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

          {/* Indicador de requisitos — visible cuando el campo tiene foco o hay texto */}
          {(passFocused || password.length > 0) && (
            <ul className="mt-2 space-y-1">
              <RuleItem ok={rules.length}    label="Mínimo 8 caracteres" />
              <RuleItem ok={rules.uppercase} label="Una letra mayúscula" />
              <RuleItem ok={rules.number}    label="Un número" />
              <RuleItem ok={rules.special}   label="Un carácter especial (!@#…)" />
            </ul>
          )}
        </Field>

        {err && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </div>
        )}

        <button
          type="submit"
          disabled={busy || !allRulesOk}
          className={btnPrimaryClass}
        >
          {busy
            ? <><span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" /> Creando cuenta…</>
            : "Crear cuenta"}
        </button>
      </form>
    </AuthShell>
  );
}

function RuleItem({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className={`flex items-center gap-1.5 text-xs transition-colors ${ok ? "text-green-600" : "text-slate-500"}`}>
      {ok
        ? <Check size={12} className="text-green-500 flex-shrink-0" />
        : <X     size={12} className="text-slate-400 flex-shrink-0" />}
      {label}
    </li>
  );
}

function parseError(code?: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Ya existe una cuenta con ese correo. ¿Olvidaste la contraseña?";
    case "auth/invalid-email":
      return "El formato del correo no es válido.";
    case "auth/weak-password":
      return "La contraseña es demasiado débil.";
    case "auth/network-request-failed":
      return "Sin conexión. Comprueba tu red.";
    default:
      return "No se pudo crear la cuenta. Inténtalo de nuevo.";
  }
}
