import Reveal from "@/components/Reveal";
import { MagicWand } from "@/components/illustrations/CinderellaArt";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Reveal dir="scale">
        <MagicWand className={styles.wand} aria-hidden />
        <div className={styles.stars} aria-hidden>✦ ✦ ✦</div>
        <p className={`${styles.name} gold-text`}>Kate Alejandra Reyes Tutillo</p>
        <p className={styles.date}>06 · Febrero · 2027</p>
        <p className={styles.family}>Con amor, Familia Reyes 💖</p>
        <p className={styles.credit}>Una noche de ensueño · estilo Cenicienta</p>
      </Reveal>
    </footer>
  );
}
