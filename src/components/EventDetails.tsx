import styles from "@/styles/EventDetails.module.css";

const details = [
  { icon: "📅", label: "Fecha", value: "6 de febrero de 2027" },
  { icon: "📍", label: "Lugar", value: "Salón Azul" },
  { icon: "🕗", label: "Hora", value: "20:00" },
];

export default function EventDetails() {
  return (
    <section className={styles.section} id="detalles">
      <h2 className={styles.heading}>Detalles del evento</h2>
      <div className={styles.grid}>
        {details.map((d) => (
          <div key={d.label} className={styles.card}>
            <span className={styles.icon}>{d.icon}</span>
            <p className={styles.label}>{d.label}</p>
            <p className={styles.value}>{d.value}</p>
          </div>
        ))}
      </div>

      {/* Glass slipper decoration */}
      <div className={styles.slipperWrap} aria-hidden>
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.slipper}>
          <path d="M10 90 Q30 40 90 35 Q130 32 150 50 Q175 65 185 80 Q190 90 170 95 Q140 100 80 98 Q30 96 10 90Z"
            fill="rgba(168,216,234,0.3)" stroke="#d4af37" strokeWidth="1.5"/>
          <path d="M90 35 Q95 10 110 8 Q125 6 130 20 Q133 30 130 35"
            fill="rgba(168,216,234,0.2)" stroke="#d4af37" strokeWidth="1.5"/>
          <path d="M10 90 Q50 88 80 98" stroke="#d4af37" strokeWidth="1" strokeDasharray="3 3"/>
          <ellipse cx="150" cy="65" rx="12" ry="8" fill="rgba(255,255,255,0.3)" transform="rotate(-20 150 65)"/>
        </svg>
      </div>
    </section>
  );
}
