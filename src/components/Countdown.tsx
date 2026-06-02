"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/Countdown.module.css";

const TARGET = new Date("2027-02-06T20:00:00");

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Días", value: time.days },
    { label: "Horas", value: time.hours },
    { label: "Minutos", value: time.minutes },
    { label: "Segundos", value: time.seconds },
  ];

  return (
    <section className={styles.section} id="cuenta-regresiva">
      <h2 className={styles.heading}>Cuenta regresiva</h2>
      <p className={styles.sub}>Para la noche más mágica ✨</p>
      <div className={styles.grid}>
        {units.map((u) => (
          <div key={u.label} className={styles.unit}>
            <span className={styles.number}>{String(u.value).padStart(2, "0")}</span>
            <span className={styles.label}>{u.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
