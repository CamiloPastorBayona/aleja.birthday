import styles from "@/styles/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      {/* Carriage SVG decorative */}
      <div className={styles.carriageWrap} aria-hidden>
        <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.carriage}>
          {/* wheels */}
          <circle cx="85" cy="145" r="28" stroke="#d4af37" strokeWidth="3" fill="none"/>
          <circle cx="85" cy="145" r="18" stroke="#d4af37" strokeWidth="1.5" fill="none" strokeDasharray="4 4"/>
          <circle cx="85" cy="145" r="5" fill="#d4af37"/>
          <circle cx="235" cy="145" r="28" stroke="#d4af37" strokeWidth="3" fill="none"/>
          <circle cx="235" cy="145" r="18" stroke="#d4af37" strokeWidth="1.5" fill="none" strokeDasharray="4 4"/>
          <circle cx="235" cy="145" r="5" fill="#d4af37"/>
          {/* carriage body */}
          <path d="M55 115 Q60 60 160 55 Q260 60 265 115 Q270 140 160 142 Q50 140 55 115Z"
            fill="rgba(168,216,234,0.25)" stroke="#d4af37" strokeWidth="2"/>
          {/* windows */}
          <ellipse cx="120" cy="100" rx="22" ry="26" fill="rgba(168,216,234,0.4)" stroke="#d4af37" strokeWidth="1.5"/>
          <ellipse cx="200" cy="100" rx="22" ry="26" fill="rgba(168,216,234,0.4)" stroke="#d4af37" strokeWidth="1.5"/>
          {/* door */}
          <path d="M148 78 Q160 72 172 78 L176 125 Q160 130 144 125 Z"
            fill="rgba(168,216,234,0.3)" stroke="#d4af37" strokeWidth="1.5"/>
          {/* top crown */}
          <path d="M130 58 L140 42 L160 52 L180 42 L190 58" stroke="#d4af37" strokeWidth="2" fill="none"/>
          <circle cx="140" cy="42" r="4" fill="#d4af37"/>
          <circle cx="160" cy="50" r="5" fill="#d4af37"/>
          <circle cx="180" cy="42" r="4" fill="#d4af37"/>
          {/* shaft */}
          <line x1="55" y1="135" x2="10" y2="140" stroke="#d4af37" strokeWidth="2"/>
        </svg>
      </div>

      <div className={styles.content}>
        <p className={styles.subtitle}>Mis</p>
        <h1 className={styles.title}>XV Años</h1>
        <div className={styles.divider}>
          <span>✦</span><span>✦</span><span>✦</span>
        </div>
        <p className={styles.name}>Kate Alejandra</p>
        <p className={styles.lastname}>Reyes Tutillo</p>
        <p className={styles.date}>6 · Febrero · 2027</p>
      </div>

      <div className={styles.scrollHint} aria-hidden>
        <span>↓</span>
      </div>
    </section>
  );
}
