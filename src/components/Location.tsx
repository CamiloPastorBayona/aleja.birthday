import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import styles from "@/styles/Location.module.css";

const MAPS_URL = "https://maps.app.goo.gl/aQFghqWAoDMtEgsX7?g_st=iwb";

const colors = [
  { name: "Lila", swatch: "linear-gradient(135deg, #d7b8ef, #b487dc)" },
  { name: "Celeste", swatch: "linear-gradient(135deg, #d6eef8, #5bafd6)" },
  { name: "Plateado", swatch: "linear-gradient(135deg, #f2f5fa, #aab3c3 60%, #8c96a7)" },
];

export default function Location() {
  return (
    <section className={styles.section} id="ubicacion">
      <SectionHeading
        eyebrow="Dónde será"
        title="Ubicación"
        subtitle="Te esperamos en una noche de cuento"
      />

      <Reveal dir="scale" className={styles.cardWrap}>
        <div className={`glass ${styles.card}`}>
          <span className={styles.pin}>📍</span>
          <p className={styles.venue}>Salón Trattoria Piccolo Mondo</p>
          <p className={styles.address}>Piso 2 · Guayaquil – Ecuador</p>

          <a
            className={styles.mapsBtn}
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo llegar
          </a>
        </div>
      </Reveal>

      <Reveal dir="up" delay={0.1} className={styles.colorsWrap}>
        <p className="eyebrow" style={{ textAlign: "center" }}>
          Código de vestimenta
        </p>
        <p className={styles.colorsTitle}>Colores reservados</p>
        <div className={styles.colors}>
          {colors.map((c) => (
            <div key={c.name} className={styles.color}>
              <span className={styles.swatch} style={{ background: c.swatch }} />
              <span className={styles.colorName}>{c.name}</span>
            </div>
          ))}
        </div>
        <p className={styles.colorsNote}>
          Reservados para la festejada — te pedimos evitarlos con cariño ✦
        </p>
      </Reveal>
    </section>
  );
}
