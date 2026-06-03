"use client";

/**
 * Aura de polvo de hadas reutilizable: partículas que giran y brillan alrededor
 * del contenedor padre (órbita elíptica que sigue su forma) + "cometas" con
 * estela. Resplandor aditivo en dorado/celeste/blanco.
 *
 * Props:
 *  • boost   → intensifica (más rápido y brillante), p. ej. al abrir el sobre.
 *  • scale   → multiplica el tamaño de los brillos (luces más grandes).
 *  • density → multiplica la cantidad de partículas.
 */
import { useEffect, useRef } from "react";

type RGB = [number, number, number];
interface Orbit {
  ang: number; rad: number; spd: number; size: number; col: RGB; tw: number; twSpd: number;
}
interface Comet {
  ang: number; rad: number; spd: number; size: number; col: RGB; trail: { x: number; y: number }[];
}

const GOLD: RGB = [240, 217, 122];
const WHITE: RGB = [235, 247, 255];
const CELESTE: RGB = [150, 210, 240];
const palette: RGB[] = [GOLD, GOLD, WHITE, CELESTE];

export default function MagicAura({
  boost = false,
  scale = 1,
  density = 1,
}: {
  boost?: boolean;
  scale?: number;
  density?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const boostRef = useRef(boost);
  boostRef.current = boost;

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0, b = 0;
    let orbits: Orbit[] = [];
    let comets: Comet[] = [];

    const rand = (a: number, c: number) => a + Math.random() * (c - a);
    const pick = () => palette[(Math.random() * palette.length) | 0];

    const build = () => {
      const small = Math.min(w, h) < 320;
      const nOrbit = Math.round((small ? 46 : 78) * density);
      const nComet = Math.round((small ? 7 : 12) * density);
      orbits = Array.from({ length: nOrbit }, () => ({
        ang: rand(0, Math.PI * 2),
        rad: rand(0.3, 0.52),           // fracción del contenedor (elíptica)
        spd: rand(0.002, 0.011) * (Math.random() > 0.5 ? 1 : -1),
        size: rand(1.2, 3.6) * scale,   // luces más grandes
        col: pick(),
        tw: rand(0, Math.PI * 2),
        twSpd: rand(0.02, 0.06),
      }));
      comets = Array.from({ length: nComet }, () => ({
        ang: rand(0, Math.PI * 2),
        rad: rand(0.32, 0.5),
        spd: rand(0.012, 0.024) * (Math.random() > 0.5 ? 1 : -1),
        size: rand(1.8, 3.4) * scale,
        col: pick(),
        trail: [],
      }));
    };

    const resize = () => {
      const r = parent.getBoundingClientRect();
      w = r.width; h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const draw = () => {
      const target = boostRef.current ? 1 : 0;
      b += (target - b) * 0.06;
      const speedK = 1 + b * 2.4;
      const radK = 1 + b * 0.3;
      const cx = w / 2, cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const c of comets) {
        c.ang += c.spd * speedK;
        const x = cx + Math.cos(c.ang) * c.rad * w * radK;
        const y = cy + Math.sin(c.ang) * c.rad * h * radK;
        c.trail.push({ x, y });
        if (c.trail.length > 10) c.trail.shift();
        for (let i = 0; i < c.trail.length; i++) {
          const p = c.trail[i];
          const a = (i / c.trail.length) * 0.55;
          const s = c.size * (0.3 + (i / c.trail.length) * 0.7);
          ctx.beginPath();
          ctx.fillStyle = `rgba(${c.col[0]},${c.col[1]},${c.col[2]},${a})`;
          ctx.shadowColor = `rgba(${c.col[0]},${c.col[1]},${c.col[2]},0.95)`;
          ctx.shadowBlur = 12;
          ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const o of orbits) {
        o.ang += o.spd * speedK;
        o.tw += o.twSpd;
        const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(o.tw));
        const x = cx + Math.cos(o.ang) * o.rad * w * radK;
        const y = cy + Math.sin(o.ang) * o.rad * h * radK;
        const s = o.size * tw * (1 + b * 0.6);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${o.col[0]},${o.col[1]},${o.col[2]},${0.9 * tw})`;
        ctx.shadowColor = `rgba(${o.col[0]},${o.col[1]},${o.col[2]},0.95)`;
        ctx.shadowBlur = 10;
        ctx.arc(x, y, s, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    if (!reduced) raf = requestAnimationFrame(draw);
    else {
      // un cuadro estático
      ctx.globalCompositeOperation = "lighter";
      for (const o of orbits) {
        const x = w / 2 + Math.cos(o.ang) * o.rad * w;
        const y = h / 2 + Math.sin(o.ang) * o.rad * h;
        ctx.fillStyle = `rgba(${o.col[0]},${o.col[1]},${o.col[2]},0.8)`;
        ctx.beginPath();
        ctx.arc(x, y, o.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [scale, density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  );
}
