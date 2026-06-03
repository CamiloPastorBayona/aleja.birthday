import Reveal from "@/components/Reveal";
import styles from "@/styles/SectionHeading.module.css";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className={styles.wrap}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`${styles.title} gold-text`}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className="divider-gold" />
    </Reveal>
  );
}
