"use client";

/**
 * Decide si vale la pena cargar el fondo 3D (three.js).
 *  • En móviles de gama baja, con "ahorro de datos" o "menos movimiento",
 *    NO se carga three.js: se muestra un resplandor CSS liviano.
 *  • Si el equipo aguanta, three.js se importa de forma diferida tras el
 *    primer render (requestIdleCallback) para no bloquear la carga.
 */

import { useEffect, useState, type ComponentType } from "react";

let Scene3D: ComponentType | null = null;

export default function Scene3DLazy() {
  const [Comp, setComp] = useState<ComponentType | null>(null);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const lowMem = (nav.deviceMemory ?? 4) <= 2;
    const lowCpu = (navigator.hardwareConcurrency ?? 4) <= 4;
    const saveData = nav.connection?.saveData === true;
    const tinyScreen = Math.min(window.innerWidth, window.innerHeight) < 360;

    setDecided(true);

    if (reduced || saveData || tinyScreen || (lowMem && lowCpu)) {
      return; // se queda con el fallback CSS
    }

    const load = () => {
      if (Scene3D) {
        setComp(() => Scene3D!);
        return;
      }
      import("./Scene3D").then((mod) => {
        Scene3D = mod.default;
        setComp(() => mod.default);
      });
    };

    const idle =
      (window as unknown as {
        requestIdleCallback?: (cb: () => void) => number;
      }).requestIdleCallback;
    if (idle) idle(load);
    else setTimeout(load, 600);
  }, []);

  return (
    <div
      aria-hidden
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      {Comp ? <Comp /> : <CssFallback fade={decided} />}
    </div>
  );
}

function CssFallback({ fade }: { fade: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: fade ? 1 : 0,
        transition: "opacity 1s ease",
        background:
          "radial-gradient(circle at 50% 42%, rgba(91,175,214,0.35), transparent 55%), radial-gradient(circle at 50% 42%, rgba(212,175,55,0.18), transparent 40%)",
      }}
    />
  );
}
