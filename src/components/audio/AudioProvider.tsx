"use client";

/**
 * Motor de audio de la invitación.
 *  • Música de fondo: /public/audio/music.mp3 (en bucle, con fundido suave).
 *  • Efecto de sonido de botones/click: /public/audio/shine.mp3
 *    (decodificado con Web Audio para baja latencia y que pueda solaparse).
 *
 * El navegador exige un gesto del usuario para reproducir audio: ese gesto es
 * el toque del sobre de apertura (o el botón flotante de música).
 */

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const MUSIC_SRC = "/audio/music.mp3";
const SHINE_SRC = "/audio/shine.mp3";
const MUSIC_VOLUME = 0.55;

type Sfx = "hover" | "click" | "sparkle" | "open";

interface AudioApi {
  ready: boolean;
  playing: boolean;
  toggleMusic: () => void;
  playSfx: (type: Sfx) => void;
}

const AudioCtx = createContext<AudioApi | null>(null);

export const useAudio = () => {
  const ctx = useContext(AudioCtx);
  if (!ctx) {
    return {
      ready: false,
      playing: false,
      toggleMusic: () => {},
      playSfx: () => {},
    } as AudioApi;
  }
  return ctx;
};

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  // Web Audio para el efecto "shine".
  const acRef = useRef<AudioContext | null>(null);
  const shineBufRef = useRef<AudioBuffer | null>(null);
  const lastSfxRef = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  // Prepara el <audio> de la música (sin descargarla entera hasta reproducir).
  useEffect(() => {
    const el = new Audio(MUSIC_SRC);
    el.loop = true;
    el.preload = "metadata";
    el.volume = 0;
    musicRef.current = el;
    setReady(true);
    return () => {
      el.pause();
      if (fadeRef.current) window.clearInterval(fadeRef.current);
    };
  }, []);

  const ensureContext = useCallback(() => {
    if (acRef.current) return acRef.current;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ac = new AC();
    acRef.current = ac;
    // Carga y decodifica el efecto una sola vez.
    fetch(SHINE_SRC)
      .then((r) => r.arrayBuffer())
      .then((buf) => ac.decodeAudioData(buf))
      .then((decoded) => {
        shineBufRef.current = decoded;
      })
      .catch(() => {});
    return ac;
  }, []);

  // Fundido de volumen de la música.
  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const el = musicRef.current;
    if (!el) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    const step = (target - el.volume) / 24;
    fadeRef.current = window.setInterval(() => {
      const next = el.volume + step;
      if (
        (step > 0 && next >= target) ||
        (step < 0 && next <= target) ||
        Math.abs(target - el.volume) < 0.02
      ) {
        el.volume = Math.max(0, Math.min(1, target));
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        fadeRef.current = null;
        onDone?.();
      } else {
        el.volume = Math.max(0, Math.min(1, next));
      }
    }, 40);
  }, []);

  const startMusic = useCallback(() => {
    const el = musicRef.current;
    if (!el) return;
    ensureContext();
    el.volume = 0;
    el.play()
      .then(() => {
        setPlaying(true);
        fadeTo(MUSIC_VOLUME);
      })
      .catch(() => {});
  }, [ensureContext, fadeTo]);

  const stopMusic = useCallback(() => {
    const el = musicRef.current;
    if (!el) return;
    fadeTo(0, () => el.pause());
    setPlaying(false);
  }, [fadeTo]);

  const toggleMusic = useCallback(() => {
    if (playing) stopMusic();
    else startMusic();
  }, [playing, startMusic, stopMusic]);

  // Pausa la música cuando se bloquea el cel / se oculta la pestaña, y la
  // reanuda al volver (si estaba sonando).
  useEffect(() => {
    const onVisibility = () => {
      const el = musicRef.current;
      if (!el) return;
      if (document.hidden) {
        el.pause();
      } else if (playing) {
        el.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onVisibility);
    };
  }, [playing]);

  // Reproduce el efecto "shine" (con un pequeño throttle para que no se sature).
  const playSfx = useCallback(
    (type: Sfx) => {
      const ac = ensureContext();
      if (ac.state === "suspended") ac.resume();
      const buf = shineBufRef.current;
      if (!buf) return;

      const now = ac.currentTime;
      // Evita disparos en ráfaga (p. ej. al pasar rápido sobre tarjetas).
      if (now - lastSfxRef.current < 0.06) return;
      lastSfxRef.current = now;

      const src = ac.createBufferSource();
      src.buffer = buf;
      const g = ac.createGain();
      // El hover suena más sutil que el click.
      g.gain.value = type === "hover" ? 0.3 : 0.85;
      src.connect(g);
      g.connect(ac.destination);
      src.start();
    },
    [ensureContext]
  );

  return (
    <AudioCtx.Provider value={{ ready, playing, toggleMusic, playSfx }}>
      {children}
    </AudioCtx.Provider>
  );
}
