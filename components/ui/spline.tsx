"use client";
import { memo, useEffect, useRef } from "react";
import { Application, type SPEObject } from "@splinetool/runtime";

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: (app: Application) => void;
}

/**
 * Wrapper minimalista sobre @splinetool/runtime.
 *
 * Por qué NO usamos @splinetool/react-spline:
 * Su package.json declara `"type": "module"` y un `exports` field que sólo
 * expone la condición `import`. El resolver de Webpack en Next 14 rechaza
 * tanto la raíz como la subruta `./next` en bastantes combinaciones,
 * lanzando "Package path ... is not exported". Saltarse el wrapper y
 * controlar el <canvas> nosotros mismos elimina el problema de raíz.
 *
 * Ventajas adicionales: bundle más pequeño, control total del ciclo de
 * vida y posibilidad real de buscar objetos por nombre y emitir eventos
 * (clave para el efecto de "saludo").
 */
function SplineSceneInner({ scene, className, onLoad }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<Application | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let cancelled = false;
    const app = new Application(canvasRef.current);
    appRef.current = app;

    app
      .load(scene)
      .then(() => {
        if (cancelled) return;
        // Oculta el loader con un fade
        if (loadingRef.current) {
          loadingRef.current.style.opacity = "0";
          setTimeout(() => {
            if (loadingRef.current) loadingRef.current.style.display = "none";
          }, 300);
        }
        onLoad?.(app);
      })
      .catch((err) => {
        if (!cancelled) console.error("[Spline] failed to load scene:", err);
      });

    return () => {
      cancelled = true;
      try {
        app.dispose();
      } catch {
        /* runtime ya liberado */
      }
      appRef.current = null;
    };
    // scene es una URL estable; onLoad memoizado en el padre
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  return (
    <div className={`relative w-full h-full ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        // Evita el "flash" de tamaño 0 antes de que runtime ajuste el canvas
        style={{ display: "block" }}
      />
      {/* Loader de marca encima del canvas hasta que la escena cargue */}
      <div
        ref={loadingRef}
        className="absolute inset-0 flex items-center justify-center bg-signium-gradient transition-opacity duration-300"
        style={{ opacity: 1 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-white/40 border-t-white animate-spin" />
          <span className="text-xs uppercase tracking-widest text-white/80">
            Cargando experiencia
          </span>
        </div>
      </div>
    </div>
  );
}

export const SplineScene = memo(SplineSceneInner);

// Re-exportamos tipos útiles para los consumidores (p.ej. el hero).
export type { Application, SPEObject };
