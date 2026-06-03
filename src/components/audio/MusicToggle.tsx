"use client";

import { useEffect, useState } from "react";
import { useAudio } from "./AudioProvider";
import styles from "@/styles/MusicToggle.module.css";

export default function MusicToggle() {
  const { playing, toggleMusic, playSfx } = useAudio();
  const [hint, setHint] = useState(true);

  // Oculta el globito de "toca para música" tras el primer clic o a los 9s.
  useEffect(() => {
    if (!playing) return;
    setHint(false);
  }, [playing]);

  useEffect(() => {
    const t = setTimeout(() => setHint(false), 9000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.wrap}>
      {hint && !playing && (
        <span className={styles.hint}>Toca para la música ✨</span>
      )}
      <button
        type="button"
        className={`${styles.btn} ${playing ? styles.on : ""}`}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
        aria-pressed={playing}
        onClick={() => {
          playSfx("click");
          toggleMusic();
        }}
      >
        <span className={styles.eq} aria-hidden>
          <i /><i /><i /><i />
        </span>
        <span className={styles.note} aria-hidden>
          {playing ? "♪" : "♫"}
        </span>
      </button>
    </div>
  );
}
