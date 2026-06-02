import styles from "@/styles/Invitation.module.css";

export default function Invitation() {
  return (
    <section className={styles.section} id="invitacion">
      <div className={styles.card}>
        <div className={styles.cornerTL} aria-hidden />
        <div className={styles.cornerTR} aria-hidden />
        <div className={styles.cornerBL} aria-hidden />
        <div className={styles.cornerBR} aria-hidden />

        <p className={styles.greeting}>Estimados familiares y amigos:</p>

        <p className={styles.body}>
          Con inmensa alegría, queremos invitarlos a compartir con nosotros
          un momento muy especial: la celebración de los
        </p>

        <h2 className={styles.highlight}>
          XV años de<br />
          <span>Kate Alejandra Reyes Tutillo</span>
        </h2>

        <p className={styles.body}>
          Será una noche llena de emociones, alegría, música y hermosos
          recuerdos que deseamos vivir junto a las personas que más apreciamos.
        </p>

        <div className={styles.signature}>
          <p>Con cariño,</p>
          <p className={styles.family}>Familia Reyes 💖</p>
        </div>
      </div>
    </section>
  );
}
