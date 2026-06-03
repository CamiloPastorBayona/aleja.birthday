"use client";

/**
 * Indicación de scroll fija abajo, siempre visible para que la gente sepa que
 * debe seguir bajando. Se oculta sola al llegar cerca del final de la página.
 */
import { useEffect, useState } from "react";
import styles from "@/styles/ScrollCue.module.css";

export default function ScrollCue() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 260;
      setHidden(nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={`${styles.cue} ${hidden ? styles.hidden : ""}`} aria-hidden>
      <span className={styles.text}>Desliza</span>
      <span className={styles.chev}>
        <i />
        <i />
      </span>
    </div>
  );
}
