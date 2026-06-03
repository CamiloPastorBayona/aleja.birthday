"use client";
import { useState } from "react";
import { useAudio } from "@/components/audio/AudioProvider";
import styles from "@/styles/RSVP.module.css";

// ─────────────────────────────────────────────────────────────
// CONFIGURA AQUÍ tu número de WhatsApp (formato internacional,
// sin "+", sin espacios). Ej. Colombia: 57 + número.
const WHATSAPP_NUMBER = "573001234567";
const HONOREE = "Kate Alejandra";
// ─────────────────────────────────────────────────────────────

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function RSVP() {
  const [guests, setGuests] = useState(1);
  const { playSfx } = useAudio();

  const confirmMsg =
    `¡Hola! Confirmo mi asistencia a los XV años de ${HONOREE} 🩵\n` +
    `Asistiremos ${guests} ${guests === 1 ? "persona" : "personas"}. ¡Gracias por la invitación!`;

  const declineMsg =
    `¡Hola! Lamento mucho no poder asistir a los XV años de ${HONOREE}. ` +
    `Les deseo una noche maravillosa 🩵`;

  return (
    <section className={styles.section} id="rsvp">
      <div className={`glass ${styles.inner}`}>
        <span className={styles.envelope}>💌</span>
        <p className="eyebrow">Confirma tu lugar</p>
        <h2 className={`${styles.heading} gold-text`}>¿Nos acompañas?</h2>
        <p className={styles.text}>
          Tu presencia es el mejor regalo. Ayúdanos a preparar cada detalle
          confirmando si nos acompañarás en esta noche tan especial.
        </p>

        <div className={styles.counter}>
          <span className={styles.counterLabel}>Asistentes</span>
          <div className={styles.counterControls}>
            <button
              type="button"
              className={styles.counterBtn}
              aria-label="Quitar un asistente"
              onClick={() => {
                playSfx("hover");
                setGuests((g) => Math.max(1, g - 1));
              }}
            >
              −
            </button>
            <span className={styles.counterValue}>{guests}</span>
            <button
              type="button"
              className={styles.counterBtn}
              aria-label="Agregar un asistente"
              onClick={() => {
                playSfx("hover");
                setGuests((g) => Math.min(20, g + 1));
              }}
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.actions}>
          <a
            className={styles.confirmBtn}
            href={waLink(confirmMsg)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSfx("sparkle")}
            onMouseEnter={() => playSfx("hover")}
          >
            ✓ Confirmar por WhatsApp
          </a>
          <a
            className={styles.declineBtn}
            href={waLink(declineMsg)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSfx("click")}
          >
            No podré asistir
          </a>
        </div>

        <div className="divider-gold" />

        <p className={styles.giftTitle}>Lluvia de sobres</p>
        <p className={styles.text}>
          Si deseas hacernos llegar un detalle, agradecemos tu generosidad con
          mucho cariño en una lluvia de sobres.
        </p>

        <p className={styles.closing}>
          Su compañía hará de esta celebración un momento inolvidable para
          nuestra familia. ¡Esperamos contar con su presencia!
        </p>
      </div>
    </section>
  );
}
