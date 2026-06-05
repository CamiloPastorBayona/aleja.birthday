"use client";

/**
 * Storytelling cinematográfico por scroll.
 * Una sección alta con un lienzo "pegado" (sticky) al centro; cada frase de la
 * leyenda aparece y se desvanece a medida que avanza el scroll, estilo
 * conmemorativo y elegante, con detalles dorados.
 */

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import styles from "@/styles/Legend.module.css";

const beats: { text: string; gold?: boolean }[] = [
  { text: "Hay momentos que se viven una sola vez en la vida…" },
  { text: "y este es uno de ellos.", gold: true },
  {
    text:
      "Nosotros, José Luis Reyes y Raiza Tutillo, con el corazón lleno de alegría, queremos compartir contigo un día que soñamos durante mucho tiempo.",
  },
  { text: "Celebramos los XV años de nuestra hija, Kate Alejandra.", gold: true },
  {
    text:
      "Será una noche de cuento, con luces, música y recuerdos que deseamos vivir junto a las personas que más queremos.",
  },
  { text: "Y queremos que tú seas parte de ella.", gold: true },
];

function Beat({
  text,
  gold,
  index,
  total,
  progress,
}: {
  text: string;
  gold?: boolean;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Ventana de visibilidad de cada frase dentro del progreso [0,1].
  const span = 1 / total;
  const start = index * span;
  const inAt = start + span * 0.18;
  const peak = start + span * 0.5;
  const outAt = start + span * 0.82;

  const opacity = useTransform(
    progress,
    [start, inAt, peak, outAt, start + span],
    [0, 1, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, peak, start + span],
    [40, 0, -40]
  );
  const blur = useTransform(
    progress,
    [start, inAt, outAt, start + span],
    [8, 0, 0, 8]
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.p
      className={`${styles.beat} ${gold ? styles.gold : ""}`}
      style={{ opacity, y, filter }}
    >
      {text}
    </motion.p>
  );
}

export default function Legend() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Barra de progreso dorada.
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className={styles.section} aria-label="Una pequeña historia">
      <div className={styles.sticky}>
        <div className={styles.frame} aria-hidden />
        {/* Carrusel abajo (móvil y PC) */}
        <div className={styles.carousel} aria-hidden>
          <Image src="/images/carrusel.png" alt="" fill sizes="(max-width:720px) 69vw, 345px" style={{ objectFit: "contain", objectPosition: "bottom center" }} />
        </div>
        {beats.map((b, i) => (
          <Beat
            key={i}
            text={b.text}
            gold={b.gold}
            index={i}
            total={beats.length}
            progress={scrollYProgress}
          />
        ))}
        <div className={styles.barTrack} aria-hidden>
          <motion.div className={styles.bar} style={{ scaleX: barScale }} />
        </div>
      </div>
    </section>
  );
}
