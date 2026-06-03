import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { GlassSlipper } from "@/components/illustrations/CinderellaArt";
import styles from "@/styles/EventDetails.module.css";

const details = [
  {
    icon: "📅",
    label: "Fecha",
    value: "Sábado 6 de febrero",
    extra: "2027",
  },
  {
    icon: "🕗",
    label: "Recepción",
    value: "8:00 p. m.",
    extra: "Puntualidad mágica ✨",
  },
  {
    icon: "📍",
    label: "Lugar",
    value: "Salón Azul",
    extra: "Te esperamos",
  },
];

export default function EventDetails() {
  return (
    <section className={styles.section} id="detalles">
      <SectionHeading
        eyebrow="Cuándo y dónde"
        title="Detalles del evento"
        subtitle="Todo listo para una noche de cuento"
      />

      <div className={styles.grid}>
        {details.map((d, i) => (
          <Reveal key={d.label} dir="up" delay={i * 0.12} className={styles.cell}>
            <div className={`glass ${styles.card}`}>
              <span className={styles.icon}>{d.icon}</span>
              <p className={styles.label}>{d.label}</p>
              <p className={styles.value}>{d.value}</p>
              <p className={styles.extra}>{d.extra}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal dir="up" delay={0.2} className={styles.dressWrap}>
        <p className={styles.dressLabel}>Código de vestimenta</p>
        <p className={styles.dressValue}>Etiqueta · Formal de gala</p>
      </Reveal>

      <GlassSlipper className={styles.slipper} aria-hidden />
    </section>
  );
}
