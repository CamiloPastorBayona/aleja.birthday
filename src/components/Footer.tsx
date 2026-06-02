import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.stars} aria-hidden>✦ ✦ ✦</div>
      <p className={styles.name}>Kate Alejandra Reyes Tutillo</p>
      <p className={styles.date}>6 · Febrero · 2027</p>
      <p className={styles.family}>Con amor, Familia Reyes 💖</p>
    </footer>
  );
}
