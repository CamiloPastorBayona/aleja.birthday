"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import MagicAura from "@/components/effects/MagicAura";
import { Castle } from "@/components/illustrations/CinderellaArt";
import styles from "@/styles/Invitation.module.css";

function Corner({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path d="M6 32 C6 17 17 6 32 6" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 32 C14 23 23 14 32 14" stroke="#f0d97a" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <path d="M6 32 q8 0 11 -7 q3 7 -4 11 q-4 2 -7 -4" stroke="#d4af37" strokeWidth="1.2" fill="none" />
      <circle cx="32" cy="6" r="2.2" fill="#f0d97a" />
      <circle cx="6" cy="32" r="2.2" fill="#f0d97a" />
    </svg>
  );
}

let burstId = 0;

export default function Invitation() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 5).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 6).toFixed(2)}deg`);
  };
  const reset = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  const onTap = (e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    const id = ++burstId;
    setBursts((b) => [...b, { id, x, y }]);
    setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 900);
  };

  return (
    <section className={styles.section} id="invitacion">
      <Reveal dir="scale" className={styles.cardWrap}>
        {/* Luces mágicas alrededor de la invitación */}
        <div className={styles.aura} aria-hidden>
          <MagicAura scale={1.25} density={0.9} />
        </div>

        <div
          ref={cardRef}
          className={styles.card}
          onPointerMove={onMove}
          onPointerLeave={reset}
          onPointerDown={onTap}
        >
          <div className={styles.frame} aria-hidden />
          <Corner className={`${styles.corner} ${styles.tl}`} />
          <Corner className={`${styles.corner} ${styles.tr}`} />
          <Corner className={`${styles.corner} ${styles.br}`} />
          <Corner className={`${styles.corner} ${styles.bl}`} />

          <Castle className={styles.castle} aria-hidden />
          <div className={styles.cameo} aria-hidden>
            <Image src="/images/cara.png" alt="" fill sizes="150px" style={{ objectFit: "cover", objectPosition: "top center" }} />
          </div>

          <p className="eyebrow">Nuestra invitación</p>
          <p className={styles.greeting}>Estimados familiares y amigos:</p>

          <p className={styles.body}>
            Tenemos el honor de invitarlos a celebrar los
          </p>

          <h2 className={styles.highlight}>
            <span className={styles.xv}>XV años de</span>
            <span className={`${styles.who} gold-text`}>
              Kate Alejandra Reyes Tutillo
            </span>
          </h2>

          <div className="divider-gold" />

          <div className={styles.signature}>
            <p>Con cariño,</p>
            <p className={styles.family}>Familia Reyes Tutillo</p>
          </div>

          <span className={styles.hint} aria-hidden>✦ tócame</span>

          {bursts.map((b) => (
            <span
              key={b.id}
              className={styles.burst}
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              aria-hidden
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <i key={i} style={{ "--a": `${(i / 12) * 360}deg` } as React.CSSProperties} />
              ))}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
