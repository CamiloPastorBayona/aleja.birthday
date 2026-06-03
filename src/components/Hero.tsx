"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Scene3DLazy from "@/components/three/Scene3DLazy";
import Crown3DLazy from "@/components/three/Crown3DLazy";
import styles from "@/styles/Hero.module.css";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Suavizado tipo "Apple": el scroll se sigue con inercia para un movimiento
  // premium y con peso (no brusco).
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.5,
  });

  // El contenido sube bastante y se desvanece (capa más cercana = más rápida).
  const y = useTransform(smooth, [0, 1], ["0%", "-46%"]);
  const opacity = useTransform(smooth, [0, 0.75], [1, 0]);
  const scale = useTransform(smooth, [0, 1], [1, 0.88]);
  const blur = useTransform(smooth, [0, 0.8], [0, 6]);
  const contentFilter = useTransform(blur, (b) => `blur(${b}px)`);

  // El castillo (capa lejana) se mueve poco y hace un zoom muy sutil → profundidad.
  const castleY = useTransform(smooth, [0, 1], ["0%", "-14%"]);
  const castleScale = useTransform(smooth, [0, 1], [1, 1.12]);
  const castleOpacity = useTransform(smooth, [0, 0.9], [0.72, 0.3]);

  return (
    <section ref={ref} className={styles.hero}>
      {/* Castillo de fondo completo (capa lejana) con parallax */}
      <motion.div
        className={styles.castleBg}
        style={{ y: castleY, scale: castleScale, opacity: castleOpacity }}
        aria-hidden
      >
        <Image
          src="/images/castillo-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "contain",
            objectPosition: "center bottom",
            filter: "saturate(0.7) brightness(0.9)",
          }}
        />
      </motion.div>
      <div className={styles.castleTint} aria-hidden />

      {/* Fondo 3D (three.js con carga diferida) */}
      <Scene3DLazy />
      <div className={styles.vignette} aria-hidden />

      {/* Corona 3D arriba (three.js) */}
      <Crown3DLazy className={styles.crown} />

      <motion.div className={styles.content} style={{ y, opacity, scale, filter: contentFilter }}>
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
    </section>
  );
}
