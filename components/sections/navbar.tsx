"use client";

import Image from "next/image";
import Link from "next/link";
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

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-slate-200/60">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
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

        <div className="flex items-center gap-3">
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
                  className="hidden sm:inline text-sm font-medium text-slate-600 hover:text-signium-blue transition"
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
      </div>
    </header>
  );
}
