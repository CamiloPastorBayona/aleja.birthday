"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/Reveal";
import { MagicWand } from "@/components/illustrations/CinderellaArt";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  // Parallax: el castillo se desplaza más lento que el scroll.
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "10%"]);

  return (
    <footer ref={ref} className={styles.footer}>
      {/* Castillo de fondo con parallax */}
      <div className={styles.castleWrap} aria-hidden>
        <motion.div className={styles.castleInner} style={{ y }}>
          <Image
            src="/images/castillo.png"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </motion.div>
      </div>

      <Reveal dir="scale" className={styles.inner}>
        <MagicWand className={styles.wand} aria-hidden />
        <div className={styles.stars} aria-hidden>✦ ✦ ✦</div>
        <p className={`${styles.name} gold-text`}>Kate Alejandra Reyes Tutillo</p>
        <p className={styles.date}>06 · Febrero · 2027</p>
        <p className={styles.family}>Con amor, Familia Reyes Tutillo</p>
        <p className={styles.credit}>Una noche de ensueño · estilo Cenicienta</p>
      </Reveal>
    </footer>
  );
}
