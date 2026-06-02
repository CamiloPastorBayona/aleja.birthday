"use client";
import { useEffect, useRef } from "react";
import styles from "@/styles/Sparkles.module.css";

export default function Sparkles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sparkleCount = 60;
    for (let i = 0; i < sparkleCount; i++) {
      const s = document.createElement("span");
      s.className = styles.sparkle;
      s.style.left = `${Math.random() * 100}vw`;
      s.style.animationDelay = `${Math.random() * 8}s`;
      s.style.animationDuration = `${4 + Math.random() * 6}s`;
      s.style.width = `${2 + Math.random() * 4}px`;
      s.style.height = s.style.width;
      s.style.opacity = `${0.3 + Math.random() * 0.7}`;
      container.appendChild(s);
    }
    return () => { container.innerHTML = ""; };
  }, []);

  return <div ref={containerRef} className={styles.container} aria-hidden />;
}
