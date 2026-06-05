"use client";

/**
 * Decide si vale la pena cargar el fondo 3D (three.js) y lo monta SOLO mientras
 * el Hero está en pantalla (lo desmonta al hacer scroll para liberar GPU/CPU).
 *  • En móviles de gama baja / "ahorro de datos" / "menos movimiento" NO se
 *    carga: se muestra un resplandor CSS liviano.
 */

import { useEffect, useRef, useState, type ComponentType } from "react";

let Scene3D: ComponentType | null = null;

export default function Scene3DLazy() {
  const [Comp, setComp] = useState<ComponentType | null>(null);
  const [decided, setDecided] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowMem = (nav.deviceMemory ?? 4) <= 2;
    const lowCpu = (navigator.hardwareConcurrency ?? 4) <= 4;
    const saveData = nav.connection?.saveData === true;
    const tinyScreen = Math.min(window.innerWidth, window.innerHeight) < 360;

    setDecided(true);
    if (reduced || saveData || tinyScreen || (lowMem && lowCpu)) return;

    const el = ref.current;
    if (!el) return;

    const mount = () => {
      if (Scene3D) return setComp(() => Scene3D!);
      import("./Scene3D").then((m) => {
        Scene3D = m.default;
        setComp(() => m.default);
      });
    };

    // Monta el 3D solo cuando el Hero está (cerca de) visible.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) mount();
        else setComp(null); // desmonta al salir de pantalla
      },
      { rootMargin: "150px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0 }}>
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
          "radial-gradient(circle at 50% 42%, rgba(91,175,214,0.35), transparent 55%), radial-gradient(circle at 50% 42%, rgba(170,179,195,0.18), transparent 40%)",
      }}
    />
  );
}
