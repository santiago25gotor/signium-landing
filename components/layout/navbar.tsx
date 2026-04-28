"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const links = [
  { href: "/#about",      label: "Proyecto" },
  { href: "/#technology", label: "Tecnología" },
  { href: "/#team",       label: "Equipo" },
  { href: "/#vision",     label: "Visión" },
  { href: "/descargas",   label: "Descargas" },
];

export function Navbar() {
  const { user, loading } = useAuth();
  const isLogged = !!user?.emailVerified;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-slate-200/60">
      {/* ── Barra principal ── */}
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <div className="relative h-9 w-9 rounded-lg overflow-hidden bg-signium-gradient shadow-signium-glow-cyan">
            <Image
              src="/logo.png"
              alt="SIGNIUM"
              fill
              sizes="36px"
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="font-bold tracking-tight text-slate-900">SIGNIUM</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 hover:text-signium-blue transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Auth desktop */}
        <div className="hidden md:flex items-center gap-3">
          {!loading && (
            isLogged ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center rounded-full bg-signium-gradient px-4 py-2 text-sm font-semibold text-white shadow-signium-glow hover:shadow-signium-glow-cyan transition"
              >
                Mi panel
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-signium-blue transition"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center rounded-full bg-signium-gradient px-4 py-2 text-sm font-semibold text-white shadow-signium-glow hover:shadow-signium-glow-cyan transition"
                >
                  Registrarse
                </Link>
              </>
            )
          )}
        </div>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="md:hidden p-2 -mr-1 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Menú móvil desplegable ── */}
      {open && (
        <div className="md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-md shadow-lg">
          <nav className="container py-4 flex flex-col gap-1">
            {/* Links de navegación */}
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-signium-blue transition-colors"
              >
                {l.label}
              </Link>
            ))}

            {/* Auth en móvil */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
              {!loading && (
                isLogged ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center rounded-full bg-signium-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-signium-glow"
                  >
                    Mi panel
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-full bg-signium-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-signium-glow"
                    >
                      Registrarse
                    </Link>
                  </>
                )
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
