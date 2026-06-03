"use client";

/**
 * Envuelve cualquier contenido para que aparezca con una animación elegante
 * al entrar en pantalla (scroll). Respeta "prefers-reduced-motion".
 */
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Dir = "up" | "down" | "left" | "right" | "scale";

const offset = 48;
const variants: Record<Dir, Variants> = {
  up: { hidden: { opacity: 0, y: offset }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -offset }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: offset }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -offset }, show: { opacity: 1, x: 0 } },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  },
};

export default function Reveal({
  children,
  dir = "up",
  delay = 0,
  className,
  as = "div",
  amount = 0.25,
}: {
  children: ReactNode;
  dir?: Dir;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  amount?: number;
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants[dir]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
