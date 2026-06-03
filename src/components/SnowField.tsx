"use client";

/**
 * Nieve global tipo Cenicienta — Canvas 2D.
 * Dibuja cristales de nieve REALES de 6 puntas (con ramas y simetría hexagonal)
 * pre-renderizados como sprites para que sea muy fluido. Mezcla cristales
 * detallados con pequeños destellos suaves para dar profundidad.
 * Cubre toda la web (fixed), no bloquea clics y se pausa en pestañas ocultas
 * o si el usuario pidió menos movimiento.
 */
import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  size: number; // tamaño dibujado en px
  speed: number;
  drift: number;
  phase: number;
  opacity: number;
  rot: number;
  spin: number;
  sprite: HTMLCanvasElement;
}

/* Dibuja un cristal de nieve de 6 puntas, centrado, en un canvas cuadrado. */
function makeSnowflakeSprite(px: number, gold: boolean): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = px;
  c.height = px;
  const ctx = c.getContext("2d")!;
  const cx = px / 2;
  const cy = px / 2;
  const R = px * 0.42;

  const main = gold ? "rgba(244, 226, 150, 0.95)" : "rgba(238, 248, 255, 0.95)";
  const glow = gold ? "rgba(240, 217, 122, 0.9)" : "rgba(206, 232, 250, 0.9)";

  ctx.translate(cx, cy);
  ctx.strokeStyle = main;
  ctx.fillStyle = main;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = glow;
  ctx.shadowBlur = px * 0.12;
  ctx.lineWidth = Math.max(1, px * 0.035);

  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 3);

    // tallo principal
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -R);
    ctx.stroke();

    // ramas laterales (dos pares a distintas alturas)
    const branch = (atY: number, len: number) => {
      ctx.beginPath();
      ctx.moveTo(0, atY);
      ctx.lineTo(Math.sin(Math.PI / 3) * len, atY - Math.cos(Math.PI / 3) * len);
      ctx.moveTo(0, atY);
      ctx.lineTo(-Math.sin(Math.PI / 3) * len, atY - Math.cos(Math.PI / 3) * len);
      ctx.stroke();
    };
    branch(-R * 0.55, R * 0.32);
    branch(-R * 0.8, R * 0.2);

    // pequeños cristalitos en la punta
    ctx.beginPath();
    ctx.moveTo(-R * 0.08, -R * 0.92);
    ctx.lineTo(0, -R);
    ctx.lineTo(R * 0.08, -R * 0.92);
    ctx.stroke();

    ctx.restore();
  }

  // núcleo central (hexágono pequeño)
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 - Math.PI / 2;
    const r = R * 0.12;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();

  return c;
}

/* Destello suave redondo (para los copos lejanos pequeños). */
function makeGlintSprite(px: number, gold: boolean): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = px;
  c.height = px;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
  const col = gold ? "240, 217, 122" : "232, 245, 255";
  g.addColorStop(0, `rgba(${col}, 0.95)`);
  g.addColorStop(0.4, `rgba(${col}, 0.5)`);
  g.addColorStop(1, `rgba(${col}, 0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(px / 2, px / 2, px / 2, 0, Math.PI * 2);
  ctx.fill();
  return c;
}

export default function SnowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Paleta de sprites pre-renderizados (varios cristales + destellos).
    const crystals = [
      makeSnowflakeSprite(64, false),
      makeSnowflakeSprite(64, false),
      makeSnowflakeSprite(56, true),
    ];
    const glints = [makeGlintSprite(40, false), makeGlintSprite(40, true)];

    let w = 0;
    let h = 0;
    let flakes: Flake[] = [];
    let raf = 0;
    let running = true;

    const spawn = (anywhere: boolean): Flake => {
      // ~70% cristales detallados, ~30% destellos pequeños y lejanos.
      const isCrystal = Math.random() < 0.7;
      const sprite = isCrystal
        ? crystals[(Math.random() * crystals.length) | 0]
        : glints[(Math.random() * glints.length) | 0];
      const size = isCrystal
        ? 10 + Math.random() * 22
        : 3 + Math.random() * 7;
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : -size,
        size,
        speed: (0.25 + Math.random() * 0.6) * (size / 16 + 0.4),
        drift: 0.3 + Math.random() * 1,
        phase: Math.random() * Math.PI * 2,
        opacity: (isCrystal ? 0.45 : 0.3) + Math.random() * 0.45,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.012,
        sprite,
      };
    };

    const makeFlakes = () => {
      // Densidad reducida (mejor rendimiento), aún más baja en móvil.
      const small = Math.min(w, h) < 540;
      const count = Math.min(small ? 46 : 78, Math.round((w * h) / 26000));
      flakes = Array.from({ length: count }, () => spawn(true));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeFlakes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y += f.speed;
        f.phase += 0.01;
        f.x += Math.sin(f.phase) * f.drift * 0.4;
        f.rot += f.spin;

        if (f.y > h + f.size) Object.assign(f, spawn(false));

        ctx.globalAlpha = f.opacity;
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rot);
        ctx.drawImage(f.sprite, -f.size / 2, -f.size / 2, f.size, f.size);
        ctx.rotate(-f.rot);
        ctx.translate(-f.x, -f.y);
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduced) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) draw();
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 3,
      }}
    />
  );
}
