"use client";

/**
 * "La magia de Cenicienta" — storytelling por capítulos.
 * Cada capítulo presenta un objeto del cuento como una ESCENA nocturna
 * ilustrada (cielo, luna, foco de luz, estrellas que titilan y destellos),
 * con parallax 3D al mover el cursor/dedo y un estallido de brillos + sonido
 * al tocarla. Aparecen con animación a medida que se hace scroll.
 */

import { useMemo, useRef, useState, type ComponentType, type SVGProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { useAudio } from "@/components/audio/AudioProvider";
import {
  Castle,
  Gown,
  Carriage,
  GlassSlipper,
  MidnightClock,
  Tiara,
} from "@/components/illustrations/CinderellaArt";
import styles from "@/styles/Story.module.css";

type Variant = "castle" | "gown" | "carriage" | "slipper" | "midnight" | "crown";

interface Chapter {
  key: string;
  no: string;
  title: string;
  text: string;
  Art: ComponentType<SVGProps<SVGSVGElement>>;
  variant: Variant;
}

const chapters: Chapter[] = [
  {
    key: "castle",
    no: "Capítulo I",
    title: "Un sueño",
    text:
      "Todo gran cuento comienza con un sueño… y el de Kate Alejandra brilla como un castillo entre las estrellas.",
    Art: Castle,
    variant: "castle",
  },
  {
    key: "gown",
    no: "Capítulo II",
    title: "El vestido",
    text:
      "Cada hilo dorado fue tejido para su gran noche: un vestido digno de una verdadera princesa.",
    Art: Gown,
    variant: "gown",
  },
  {
    key: "carriage",
    no: "Capítulo III",
    title: "El carruaje",
    text:
      "Una calabaza convertida en carruaje de ensueño la llevará hacia la noche más esperada.",
    Art: Carriage,
    variant: "carriage",
  },
  {
    key: "slipper",
    no: "Capítulo IV",
    title: "La zapatilla",
    text:
      "De cristal y hecha a su medida, guarda el secreto de un destino escrito en las estrellas.",
    Art: GlassSlipper,
    variant: "slipper",
  },
  {
    key: "midnight",
    no: "Capítulo V",
    title: "La medianoche",
    text:
      "Cuando el reloj se acerca a las doce, la magia alcanza su instante más deslumbrante.",
    Art: MidnightClock,
    variant: "midnight",
  },
  {
    key: "crown",
    no: "Capítulo VI",
    title: "La corona",
    text:
      "Porque esta noche, Kate Alejandra es la princesa de su propio cuento de hadas.",
    Art: Tiara,
    variant: "crown",
  },
];

let burstId = 0;

function StoryScene({ chapter, index }: { chapter: Chapter; index: number }) {
  const { Art, variant } = chapter;
  const right = index % 2 === 1;
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { playSfx } = useAudio();
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  // Estrellas titilantes generadas una vez por escena.
  const stars = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: 6 + Math.random() * 88,
        top: 6 + Math.random() * 64,
        size: 1 + Math.random() * 2.4,
        delay: Math.random() * 3,
        gold: Math.random() > 0.7,
        key: i,
      })),
    []
  );

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
    el.style.setProperty("--px", `${(px * 16).toFixed(1)}px`);
    el.style.setProperty("--py", `${(py * 12).toFixed(1)}px`);
  };

  const resetTilt = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
  };

  const onActivate = (e: React.PointerEvent) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    const id = ++burstId;
    setBursts((b) => [...b, { id, x, y }]);
    setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 900);
    playSfx("sparkle");
  };

  return (
    <div className={`${styles.chapter} ${right ? styles.right : ""}`}>
      {/* Escena ilustrada */}
      <Reveal dir={right ? "left" : "right"} className={styles.stageCol}>
        <div
          ref={stageRef}
          className={`${styles.stage} ${styles[variant]}`}
          onPointerMove={onPointerMove}
          onPointerLeave={resetTilt}
          onPointerDown={onActivate}
          role="img"
          aria-label={chapter.title}
        >
          <div className={styles.sky} aria-hidden />
          <div className={styles.moon} aria-hidden />
          <div className={styles.spotlight} aria-hidden />

          {/* estrellas titilantes */}
          {stars.map((s) => (
            <span
              key={s.key}
              className={`${styles.star} ${s.gold ? styles.starGold : ""}`}
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
              }}
              aria-hidden
            />
          ))}

          {/* ilustración con flotación + parallax */}
          <div className={styles.artWrap} aria-hidden>
            <Art className={styles.art} />
          </div>

          <div className={styles.glasswork} aria-hidden />

          {/* estallidos de brillos al tocar */}
          {bursts.map((b) => (
            <span
              key={b.id}
              className={styles.burst}
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              aria-hidden
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <i
                  key={i}
                  style={
                    {
                      "--a": `${(i / 10) * 360}deg`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </span>
          ))}

          <span className={styles.hint} aria-hidden>
            ✦ tócame
          </span>
        </div>
      </Reveal>

      {/* Texto del capítulo */}
      <Reveal dir={right ? "right" : "left"} delay={0.1} className={styles.copy}>
        <span className={styles.chapNo}>{chapter.no}</span>
        <h3 className={`${styles.chapTitle} gold-text`}>{chapter.title}</h3>
        <p className={styles.chapText}>{chapter.text}</p>
        <span className={styles.rule} aria-hidden />
      </Reveal>
    </div>
  );
}

export default function Story() {
  return (
    <section className={styles.section} id="historia">
      <SectionHeading
        eyebrow="Un cuento hecho realidad"
        title="La magia de Cenicienta"
        subtitle="Desliza y descubre, capítulo a capítulo, la historia de esta noche"
      />

      <motion.div className={styles.chapters}>
        {chapters.map((c, i) => (
          <StoryScene key={c.key} chapter={c} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
