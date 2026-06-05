"use client";
import { useState } from "react";
import Image from "next/image";
import { useAudio } from "@/components/audio/AudioProvider";
import styles from "@/styles/RSVP.module.css";

// URL del Web App de Google Apps Script (registra las confirmaciones en el Sheet)
const SHEET_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx-LLamL9PD4lrByD7Ck9FZvbDlnmouCuL7iGY1kLOHD-3zcqDg1EIXyBNvOUwaXO8Dyg/exec";

type Estado = "Confirmado" | "No asiste";

export default function RSVP() {
  const [guests, setGuests] = useState(2);
  const [names, setNames] = useState(["", ""]);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [estadoFinal, setEstadoFinal] = useState<Estado>("Confirmado");
  const [error, setError] = useState("");
  const { playSfx } = useAudio();

  const setName = (i: number, v: string) =>
    setNames((prev) => {
      const n = [...prev];
      n[i] = v;
      return n;
    });

  const enviar = async (estado: Estado) => {
    setError("");
    const requeridos = estado === "Confirmado" ? guests : 1;
    const completos = names.slice(0, requeridos).every((n) => n.trim());
    if (!completos) {
      setError(
        estado === "Confirmado"
          ? "Por favor escribe el nombre de cada asistente."
          : "Por favor escribe tu nombre."
      );
      return;
    }

    playSfx(estado === "Confirmado" ? "sparkle" : "click");
    setStatus("sending");

    const nombre =
      estado === "Confirmado"
        ? names
            .slice(0, guests)
            .map((n) => n.trim())
            .filter(Boolean)
            .join(" · ")
        : names[0].trim();

    try {
      await fetch(SHEET_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          nombre,
          asistentes: estado === "Confirmado" ? guests : 0,
          estado,
        }),
      });
    } catch {
      /* aunque falle la red, mostramos el agradecimiento */
    }

    setEstadoFinal(estado);
    setStatus("done");
  };

  return (
    <section className={styles.section} id="rsvp">
      <div className={`glass ${styles.inner}`}>
        <div className={styles.slipper} aria-hidden>
          <Image src="/images/zapatilla.png" alt="" fill sizes="160px" style={{ objectFit: "contain" }} />
        </div>
        <p className="eyebrow">Confirma tu lugar</p>
        <h2 className={`${styles.heading} gold-text`}>¿Nos acompañas?</h2>

        {status === "done" ? (
          <div className={styles.success}>
            <span className={styles.successIcon}>
              {estadoFinal === "Confirmado" ? "🩵" : "💌"}
            </span>
            <p className={styles.successText}>
              {estadoFinal === "Confirmado"
                ? "¡Gracias! Tu asistencia quedó registrada. Nos vemos en la fiesta ✦"
                : "Gracias por avisarnos con cariño. Te vamos a extrañar 🩵"}
            </p>
          </div>
        ) : (
          <>
            <p className={styles.reserved}>
              Hemos reservado <strong>2 lugares</strong> para ti ✦
            </p>
            <p className={styles.text}>
              Indica cuántos asistirán y escribe sus nombres para confirmar.
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
                    setGuests((g) => Math.min(2, g + 1));
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.fields}>
              {Array.from({ length: guests }).map((_, i) => (
                <div key={i} className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor={`rsvp-name-${i}`}>
                    {guests === 1 ? "Tu nombre" : `Invitado ${i + 1}`}
                  </label>
                  <input
                    id={`rsvp-name-${i}`}
                    type="text"
                    className={styles.input}
                    placeholder="Nombre y apellido"
                    value={names[i]}
                    maxLength={60}
                    autoComplete="name"
                    onChange={(e) => setName(i, e.target.value)}
                  />
                </div>
              ))}
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.confirmBtn}
                disabled={status === "sending"}
                onClick={() => enviar("Confirmado")}
                onMouseEnter={() => playSfx("hover")}
              >
                {status === "sending" ? "Enviando…" : "✓ Confirmar asistencia"}
              </button>
              <button
                type="button"
                className={styles.declineBtn}
                disabled={status === "sending"}
                onClick={() => enviar("No asiste")}
              >
                No podré asistir
              </button>
            </div>
          </>
        )}

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
