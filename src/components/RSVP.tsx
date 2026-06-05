"use client";
import { useState } from "react";
import Image from "next/image";
import { useAudio } from "@/components/audio/AudioProvider";
import styles from "@/styles/RSVP.module.css";

// ─────────────────────────────────────────────────────────────
// CONFIGURA AQUÍ tu número de WhatsApp (formato internacional,
// sin "+", sin espacios). Ej. Colombia: 57 + número.
const WHATSAPP_NUMBER = "593967358137";
const HONOREE = "Kate Alejandra";
// URL del Web App de Google Apps Script (registra las confirmaciones en el Sheet)
const SHEET_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx-LLamL9PD4lrByD7Ck9FZvbDlnmouCuL7iGY1kLOHD-3zcqDg1EIXyBNvOUwaXO8Dyg/exec";
// ─────────────────────────────────────────────────────────────

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Registra la respuesta en el Google Sheet (fire-and-forget, sin bloquear).
function registrarEnSheet(data: {
  nombre: string;
  asistentes: number;
  estado: string;
}) {
  try {
    fetch(SHEET_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    }).catch(() => {});
  } catch {
    /* sin conexión: no pasa nada, igual abre WhatsApp */
  }
}

export default function RSVP() {
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const { playSfx } = useAudio();

  const who = name.trim() || "______";

  const confirmMsg =
    `¡Hola! Soy ${who} 🩵\n` +
    `Confirmo mi asistencia a los XV años de ${HONOREE}.\n` +
    `Asistiremos ${guests} ${guests === 1 ? "persona" : "personas"}. ¡Gracias por la invitación!`;

  const declineMsg =
    `¡Hola! Soy ${who}. Lamento mucho no poder asistir a los XV años de ${HONOREE}. ` +
    `Les deseo una noche maravillosa 🩵`;

  return (
    <section className={styles.section} id="rsvp">
      <div className={`glass ${styles.inner}`}>
        <div className={styles.slipper} aria-hidden>
          <Image src="/images/zapatilla.png" alt="" fill sizes="160px" style={{ objectFit: "contain" }} />
        </div>
        <p className="eyebrow">Confirma tu lugar</p>
        <h2 className={`${styles.heading} gold-text`}>¿Nos acompañas?</h2>

        <p className={styles.reserved}>
          Hemos reservado <strong>2 lugares</strong> para ti ✦
        </p>

        <p className={styles.text}>
          Escribe tu nombre y confirma si nos acompañarás en esta noche tan
          especial.
        </p>

        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="rsvp-name">
            Tu nombre
          </label>
          <input
            id="rsvp-name"
            type="text"
            className={styles.input}
            placeholder="Nombre y apellido"
            value={name}
            maxLength={60}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
                setGuests((g) => Math.min(2, g + 1));
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
            onClick={() => {
              playSfx("sparkle");
              registrarEnSheet({ nombre: who, asistentes: guests, estado: "Confirmado" });
            }}
            onMouseEnter={() => playSfx("hover")}
          >
            ✓ Confirmar por WhatsApp
          </a>
          <a
            className={styles.declineBtn}
            href={waLink(declineMsg)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              playSfx("click");
              registrarEnSheet({ nombre: who, asistentes: 0, estado: "No asiste" });
            }}
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
