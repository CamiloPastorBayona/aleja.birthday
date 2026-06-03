"use client";

/**
 * Carga la corona 3D de forma diferida. Mientras carga —o en dispositivos de
 * gama baja / movimiento reducido— muestra la ilustración SVG de la tiara.
 */

import { useEffect, useState, type ComponentType } from "react";
import { Tiara } from "@/components/illustrations/CinderellaArt";

let Crown3D: ComponentType | null = null;

export default function Crown3DLazy({ className }: { className?: string }) {
  const [Comp, setComp] = useState<ComponentType | null>(null);

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

    if (reduced || saveData || (lowMem && lowCpu)) return;

    const load = () => {
      if (Crown3D) return setComp(() => Crown3D!);
      import("./Crown3D").then((m) => {
        Crown3D = m.default;
        setComp(() => m.default);
      });
    };
    const idle = (window as unknown as {
      requestIdleCallback?: (cb: () => void) => number;
    }).requestIdleCallback;
    if (idle) idle(load);
    else setTimeout(load, 500);
  }, []);

  return (
    <div className={className} aria-hidden>
      {Comp ? <Comp /> : <Tiara style={{ width: "100%", height: "100%" }} />}
    </div>
  );
}
