"use client";

/**
 * "Detalles del evento" como un LIBRO de varias páginas.
 * Con el scroll se van pasando las páginas (giro 3D con sombra de pliegue) y
 * cada página revela una parte de la información. Texto grande y legible.
 */

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Tiara } from "@/components/illustrations/CinderellaArt";
import styles from "@/styles/EventBook.module.css";

function InfoPage({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className={styles.info}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={`${styles.infoValue} gold-text`}>{value}</span>
      {sub && <span className={styles.infoSub}>{sub}</span>}
      <span className={styles.infoFlourish}>✦</span>
    </div>
  );
}

/* Una hoja que se voltea (giro horizontal, con sombra de pliegue) */
function Leaf({
  rotate,
  z,
  front,
}: {
  rotate: MotionValue<number>;
  z: number;
  front: ReactNode;
}) {
  const opacity = useTransform(rotate, [-118, -160], [1, 0.12]);
  const curl = useTransform(rotate, [0, -85, -160], [0, 0.55, 0.08]);
  return (
    <motion.div className={styles.leaf} style={{ rotateY: rotate, opacity, zIndex: z }}>
      <div className={styles.front}>
        {front}
        <motion.div className={styles.curl} style={{ opacity: curl }} aria-hidden />
      </div>
      <div className={styles.back} aria-hidden>
        <span>✦</span>
      </div>
    </motion.div>
  );
}

export default function EventBook() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 4 giros de página: portada→Fecha→Recepción→Lugar→Vestimenta
  const ry0 = useTransform(scrollYProgress, [0.08, 0.26], [0, -160]);
  const ry1 = useTransform(scrollYProgress, [0.29, 0.47], [0, -160]);
  const ry2 = useTransform(scrollYProgress, [0.5, 0.68], [0, -160]);
  const ry3 = useTransform(scrollYProgress, [0.71, 0.89], [0, -160]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.06, 0.18], [1, 1, 0]);

  return (
    <section ref={ref} className={styles.section} id="detalles">
      <div className={styles.sticky}>
        <div className={styles.book}>
          <div className={styles.spine} aria-hidden />
          <div className={styles.edges} aria-hidden />

          {/* Última página (base): Vestimenta */}
          <div className={styles.base}>
            <InfoPage
              label="Vestimenta"
              value="Etiqueta"
              sub="Formal de gala"
            />
          </div>

          {/* Hojas que se voltean (de la más abajo a la portada) */}
          <Leaf rotate={ry3} z={37} front={<InfoPage label="Lugar" value="Salón Azul" sub="Te esperamos" />} />
          <Leaf rotate={ry2} z={38} front={<InfoPage label="Recepción" value="8:00 p. m." sub="Puntualidad mágica" />} />
          <Leaf rotate={ry1} z={39} front={<InfoPage label="Fecha" value="6 de febrero, 2027" sub="Sábado" />} />
          <Leaf
            rotate={ry0}
            z={40}
            front={
              <div className={styles.cover}>
                <Tiara className={styles.coverTiara} aria-hidden />
                <span className={styles.coverEyebrow}>Mis XV años</span>
                <span className={`${styles.coverTitle} gold-text`}>
                  Detalles del evento
                </span>
                <span className={styles.coverHint}>Desliza para pasar las páginas</span>
              </div>
            }
          />
        </div>

        <motion.p className={styles.hint} style={{ opacity: hintOpacity }}>
          Desliza para abrir el libro ↓
        </motion.p>
      </div>
    </section>
  );
}
