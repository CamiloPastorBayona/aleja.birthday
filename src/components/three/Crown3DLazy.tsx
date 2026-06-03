"use client";

/**
 * Carga la corona 3D solo mientras el Hero está en pantalla (la desmonta al
 * hacer scroll). Mientras carga —o en dispositivos de gama baja / movimiento
 * reducido— muestra la ilustración SVG de la tiara.
 */

import { useEffect, useRef, useState, type ComponentType } from "react";
import { Tiara } from "@/components/illustrations/CinderellaArt";

let Crown3D: ComponentType | null = null;

export default function Crown3DLazy({ className }: { className?: string }) {
  const [Comp, setComp] = useState<ComponentType | null>(null);
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
    if (reduced || saveData || (lowMem && lowCpu)) return;

    const el = ref.current;
    if (!el) return;

    const mount = () => {
      if (Crown3D) return setComp(() => Crown3D!);
      import("./Crown3D").then((m) => {
        Crown3D = m.default;
        setComp(() => m.default);
      });
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) mount();
        else setComp(null);
      },
      { rootMargin: "150px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      {Comp ? <Comp /> : <Tiara style={{ width: "100%", height: "100%" }} />}
    </div>
  );
}
