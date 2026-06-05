"use client";

/**
 * Portada de apertura: un sobre sellado en celeste/dorado rodeado de polvo de
 * hadas que gira y brilla. Al tocarlo, el sello se rompe, la solapa se abre
 * lentamente, la carta se eleva y la cortina se desvanece para revelar la web.
 * Ese toque también inicia la música (gesto de usuario requerido por el navegador).
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/audio/AudioProvider";
import MagicAura from "@/components/effects/MagicAura";
import styles from "@/styles/EnvelopeIntro.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function EnvelopeIntro() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);
  const { playSfx, toggleMusic, playing } = useAudio();

  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    playSfx("sparkle");
    if (!playing) toggleMusic();
    // Animación más lenta y elegante antes de revelar la web.
    window.setTimeout(() => setGone(true), 4200);
  };

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 1.5, delay: open ? 2.4 : 0, ease: "easeInOut" }}
          aria-hidden={open}
        >
          <div className={styles.glow} aria-hidden />

          <motion.button
            type="button"
            className={styles.scene}
            onClick={handleOpen}
            aria-label="Abrir la invitación"
            initial={{ scale: 0.92, opacity: 0, y: 18 }}
            animate={
              open
                ? { scale: 1.55, opacity: 0, y: -36 }
                : { scale: 1, opacity: 1, y: 0 }
            }
            transition={{
              duration: open ? 1.9 : 1.1,
              delay: open ? 1.3 : 0.2,
              ease: EASE,
            }}
          >
            <div className={styles.envelopeArea}>
              {/* Polvo de hadas girando alrededor (muy sutil) */}
              <div className={styles.magic} aria-hidden>
                <MagicAura boost={open} scale={0.7} density={0.4} />
              </div>

              <div className={styles.envelope}>
                {/* Carta que se eleva desde el interior */}
                <motion.div
                  className={styles.letter}
                  initial={false}
                  animate={
                    open
                      ? { y: "-58%", scale: 1.04, opacity: 1 }
                      : { y: "8%", scale: 1, opacity: 0 }
                  }
                  transition={{ duration: 1.5, delay: open ? 1.1 : 0, ease: EASE }}
                >
                  <span className={styles.letterMono}>K · A</span>
                  <span className={styles.letterText}>Estás invitada</span>
                  <span className={styles.letterFlourish}>✦</span>
                </motion.div>

                {/* Cuerpo / bolsillo frontal del sobre */}
                <div className={styles.front}>
                  <svg viewBox="0 0 440 290" className={styles.frontArt} aria-hidden>
                    <defs>
                      <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#143a5c" />
                        <stop offset="55%" stopColor="#0e2c47" />
                        <stop offset="100%" stopColor="#0a2138" />
                      </linearGradient>
                      <radialGradient id="envSheen" cx="50%" cy="0%" r="80%">
                        <stop offset="0%" stopColor="rgba(168,216,234,0.22)" />
                        <stop offset="60%" stopColor="rgba(168,216,234,0)" />
                      </radialGradient>
                      <linearGradient id="envGold" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#eef2f8" />
                        <stop offset="50%" stopColor="#aab3c3" />
                        <stop offset="100%" stopColor="#8c96a7" />
                      </linearGradient>
                    </defs>

                    <rect x="3" y="3" width="434" height="284" rx="18" fill="url(#envBody)" stroke="url(#envGold)" strokeWidth="2.5" />
                    <rect x="3" y="3" width="434" height="284" rx="18" fill="url(#envSheen)" />
                    <rect x="12" y="12" width="416" height="266" rx="13" fill="none" stroke="url(#envGold)" strokeWidth="0.8" opacity="0.4" />

                    {/* dobleces en V */}
                    <path d="M14 278 L220 150 L426 278" fill="none" stroke="url(#envGold)" strokeWidth="1.6" opacity="0.75" />
                    <path d="M14 14 L220 150 L426 14" fill="none" stroke="url(#envGold)" strokeWidth="0.8" opacity="0.3" />

                    {/* filigrana ornamental en las esquinas */}
                    {[
                      "M30 52 q0 -22 22 -22 q-14 6 -12 22 q10 -10 22 -6",
                      "M410 52 q0 -22 -22 -22 q14 6 12 22 q-10 -10 -22 -6",
                      "M30 238 q0 22 22 22 q-14 -6 -12 -22 q10 10 22 6",
                      "M410 238 q0 22 -22 22 q14 -6 12 -22 q-10 10 -22 6",
                    ].map((d, i) => (
                      <path key={i} d={d} stroke="url(#envGold)" strokeWidth="1.3" fill="none" opacity="0.7" strokeLinecap="round" />
                    ))}
                  </svg>
                </div>

                {/* Solapa que se abre */}
                <motion.div
                  className={styles.flap}
                  initial={false}
                  animate={{ rotateX: open ? -176 : 0 }}
                  transition={{ duration: 1.3, delay: open ? 0.5 : 0, ease: EASE }}
                >
                  <svg viewBox="0 0 440 175" className={styles.flapArt} aria-hidden>
                    <defs>
                      <linearGradient id="flapBody" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#18486a" />
                        <stop offset="100%" stopColor="#0d2e4a" />
                      </linearGradient>
                      <linearGradient id="flapGold" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#eef2f8" />
                        <stop offset="100%" stopColor="#8c96a7" />
                      </linearGradient>
                    </defs>
                    <path d="M3 3 L437 3 L220 170 Z" fill="url(#flapBody)" stroke="url(#flapGold)" strokeWidth="2.5" />
                    {/* swag de filigrana */}
                    <path d="M40 16 q180 64 360 0" stroke="url(#flapGold)" strokeWidth="1.1" fill="none" opacity="0.5" />
                    <path d="M70 20 q150 44 300 0" stroke="url(#flapGold)" strokeWidth="0.7" fill="none" opacity="0.3" />
                  </svg>
                </motion.div>

                {/* Sello de cera con corona repujada (centrado en el cruce) */}
                <div className={styles.seal}>
                <motion.div
                  className={styles.sealInner}
                  initial={false}
                  animate={
                    open
                      ? { scale: 0, opacity: 0, rotate: -28 }
                      : { scale: 1, opacity: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.7, ease: "backIn" }}
                >
                  <svg viewBox="0 0 100 100" aria-hidden>
                    <defs>
                      <radialGradient id="wax" cx="38%" cy="32%" r="72%">
                        <stop offset="0%" stopColor="#f6e6a0" />
                        <stop offset="42%" stopColor="#c3cbd9" />
                        <stop offset="78%" stopColor="#97a1b3" />
                        <stop offset="100%" stopColor="#79839a" />
                      </radialGradient>
                      <linearGradient id="crown" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#eef2f8" />
                        <stop offset="100%" stopColor="#79839a" />
                      </linearGradient>
                    </defs>
                    {/* cera (forma orgánica) */}
                    <path
                      d="M50 3 C63 3 70 11 77 21 C83 29 97 34 97 50 C97 65 85 70 80 79 C74 88 64 97 50 97 C36 97 27 88 21 80 C15 71 3 65 3 50 C3 35 16 30 21 21 C27 11 37 3 50 3 Z"
                      fill="url(#wax)"
                      stroke="#626c84"
                      strokeWidth="1"
                    />
                    {/* anillo repujado */}
                    <circle cx="50" cy="50" r="37" fill="none" stroke="#6f7990" strokeWidth="2" opacity="0.6" />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="#eef2f8" strokeWidth="0.8" opacity="0.5" />
                    {/* perlas del anillo */}
                    {Array.from({ length: 24 }).map((_, i) => {
                      const a = (i / 24) * Math.PI * 2;
                      return (
                        <circle
                          key={i}
                          cx={50 + Math.cos(a) * 40}
                          cy={50 + Math.sin(a) * 40}
                          r={1}
                          fill="#6f7990"
                          opacity="0.55"
                        />
                      );
                    })}
                    {/* corona repujada */}
                    <g>
                      <path d="M33 60 L40 41 L50 53 L60 41 L67 60 Z" fill="url(#crown)" stroke="#626c84" strokeWidth="0.8" />
                      <rect x="33" y="60" width="34" height="6" rx="2" fill="url(#crown)" stroke="#626c84" strokeWidth="0.8" />
                      <circle cx="40" cy="41" r="2.4" fill="#eef2f8" stroke="#626c84" strokeWidth="0.5" />
                      <circle cx="50" cy="38" r="2.8" fill="#eef2f8" stroke="#626c84" strokeWidth="0.5" />
                      <circle cx="60" cy="41" r="2.4" fill="#eef2f8" stroke="#626c84" strokeWidth="0.5" />
                      <circle cx="50" cy="63" r="2" fill="#626c84" opacity="0.7" />
                      {/* brillo superior */}
                      <path d="M35 44 q15 -8 30 0" stroke="#f6f9ff" strokeWidth="0.8" fill="none" opacity="0.5" />
                    </g>
                  </svg>
                </motion.div>
                </div>
              </div>
            </div>

            {/* Indicación */}
            <motion.p
              className={styles.prompt}
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.promptMain}>Toca para abrir</span>
              <span className={styles.promptSub}>tu invitación</span>
            </motion.p>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
