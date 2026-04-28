"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene, type Application as SplineApp } from "@/components/ui/spline";

/**
 * Solo el lado derecho del hero (escena Spline + interacción de hover).
 * El texto y CTA del lado izquierdo viven en `hero-content.tsx` (server
 * component) para que se rendericen al instante sin esperar al runtime
 * 3D, que es lo que más pesa del bundle inicial.
 */
const WAVE_NAMES = ["Wave", "Saludar", "Hello", "Hola", "Greet", "Greeting", "Hand"];

export function HeroScene() {
  const splineAppRef = useRef<SplineApp | null>(null);
  const detectedWaveTargetRef = useRef<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleSplineLoad = useCallback((app: SplineApp) => {
    splineAppRef.current = app;
    try {
      const all = app.getAllObjects?.() ?? [];
      const names = all.map((o) => o.name).filter(Boolean);
      const match = names.find((n) =>
        WAVE_NAMES.some((w) => n.toLowerCase() === w.toLowerCase()),
      );
      if (match) detectedWaveTargetRef.current = match;
    } catch {
      // No imprimimos nada en producción para no contaminar la consola del usuario
    }
  }, []);

  const triggerWave = useCallback(() => {
    const app = splineAppRef.current;
    if (!app) return;
    const target = detectedWaveTargetRef.current;
    if (target) {
      try { app.emitEvent("mouseHover", target); } catch {}
      try { app.emitEvent("mouseDown", target); } catch {}
      try { app.emitEvent("start", target); } catch {}
    } else {
      for (const n of WAVE_NAMES) {
        try { app.emitEvent("mouseHover", n); } catch {}
        try { app.emitEvent("mouseDown", n); } catch {}
      }
    }
  }, []);

  const stopWave = useCallback(() => {
    const app = splineAppRef.current;
    if (!app) return;
    const target = detectedWaveTargetRef.current;
    if (target) {
      try { app.emitEventReverse?.("mouseHover", target); } catch {}
    }
  }, []);

  useEffect(() => () => { splineAppRef.current = null; }, []);

  return (
    <div
      onMouseEnter={() => { setIsHovering(true);  triggerWave(); }}
      onMouseLeave={() => { setIsHovering(false); stopWave(); }}
      className="relative min-h-[340px] md:min-h-full"
    >
      {/* Fondo sólido detrás del canvas (evita flashes) */}
      <div className="absolute inset-0 bg-signium-gradient" />

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#ffffff" />

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="absolute inset-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
          onLoad={handleSplineLoad}
        />
      </div>

      <div
        className={`pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-medium text-signium-blue shadow-lg transition-opacity duration-500 ${
          isHovering ? "opacity-0" : "opacity-100"
        }`}
      >
        Pasa el cursor para que el robot reaccione
      </div>

      <div className="md:hidden absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-signium-blue/30 to-transparent pointer-events-none" />
    </div>
  );
}
