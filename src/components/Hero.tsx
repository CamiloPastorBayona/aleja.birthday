"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Scene3DLazy from "@/components/three/Scene3DLazy";
import Crown3DLazy from "@/components/three/Crown3DLazy";
import { Carriage, GlassSlipper } from "@/components/illustrations/CinderellaArt";
import styles from "@/styles/Hero.module.css";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: el contenido sube y se desvanece al hacer scroll.
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section ref={ref} className={styles.hero}>
      {/* Fondo 3D (three.js con carga diferida) */}
      <Scene3DLazy />
      <div className={styles.vignette} aria-hidden />

      {/* Corona 3D arriba (three.js) + ilustraciones flotantes */}
      <Crown3DLazy className={styles.crown} />
      <Carriage className={styles.carriage} aria-hidden />
      <GlassSlipper className={styles.slipper} aria-hidden />

      <motion.div className={styles.content} style={{ y, opacity, scale }}>
        <motion.p
          className={`eyebrow ${styles.eyebrow}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Te invito a celebrar
        </motion.p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.mis}>Mis</span>
          <span className={`${styles.xv} gold-text`}>XV</span>
          <span className={styles.anos}>Años</span>
        </motion.h1>

        <motion.div
          className={styles.divider}
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <span>✦</span><span>✦</span><span>✦</span>
        </motion.div>

        <motion.p
          className={styles.name}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
        >
          Kate Alejandra
        </motion.p>
        <motion.p
          className={styles.lastname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
        >
          Reyes Tutillo
        </motion.p>

        <motion.p
          className={styles.date}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
        >
          06 · Febrero · 2027
        </motion.p>
      </motion.div>

      <div className={styles.scrollHint} aria-hidden>
        <span className={styles.scrollText}>Desliza</span>
        <span className={styles.scrollArrow}>↓</span>
      </div>
    </section>
  );
}
