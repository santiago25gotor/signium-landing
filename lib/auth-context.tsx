"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { getFirebaseAuth } from "./firebase";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Intentamos leer currentUser sincrónico: si Firebase ya resolvió la
  // sesión (módulo importado antes de que el componente monte), evitamos
  // el flash de "Cargando…".
  function getInitial(): { user: User | null; loading: boolean } {
    if (typeof window === "undefined") return { user: null, loading: true };
    try {
      const u = getFirebaseAuth().currentUser;
      return u ? { user: u, loading: false } : { user: null, loading: true };
    } catch {
      return { user: null, loading: true };
    }
  }

  const init = getInitial();
  const [user,    setUser]    = useState<User | null>(init.user);
  const [loading, setLoading] = useState(init.loading);

  useEffect(() => {
    const auth  = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(getFirebaseAuth());
  };

  return (
    <Ctx.Provider value={{ user, loading, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
