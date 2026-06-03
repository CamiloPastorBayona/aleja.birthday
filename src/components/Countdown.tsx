"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Countdown.module.css";

const TARGET = new Date("2027-02-06T20:00:00");

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

export default function Countdown() {
  // Evita desajuste de hidratación: arranca en null en el servidor.
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Días", value: time?.days },
    { label: "Horas", value: time?.hours },
    { label: "Min", value: time?.minutes },
    { label: "Seg", value: time?.seconds },
  ];

  return (
    <section className={styles.section} id="cuenta-regresiva">
      <div className={styles.clock} aria-hidden>
        <Image src="/images/reloj.png" alt="" fill sizes="(max-width:600px) 36vw, 180px" style={{ objectFit: "contain" }} />
      </div>

      <p className="eyebrow" style={{ textAlign: "center" }}>
        La magia comienza en
      </p>
      <h2 className={`${styles.heading} gold-text`}>Cuenta regresiva</h2>
      <p className={styles.sub}>Antes de que el reloj marque la medianoche ✨</p>

      <div className={styles.grid}>
        {units.map((u) => (
          <div key={u.label} className={`glass ${styles.unit}`}>
            <span className={styles.number}>
              {u.value == null ? "··" : String(u.value).padStart(2, "0")}
            </span>
            <span className={styles.label}>{u.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
