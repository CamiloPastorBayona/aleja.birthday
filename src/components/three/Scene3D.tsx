"use client";

/**
 * Fondo 3D mágico con three.js (react-three-fiber).
 *  • Polvo de hadas dorado/celeste flotando en profundidad (partículas REDONDAS).
 *  • Un cristal central (gema dodecaedro de aristas limpias) girando lento,
 *    retraído y al ~60% para no competir con el texto.
 * Se carga de forma diferida (ver Scene3DLazy) para no pesar en el primer render.
 */

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Textura circular suave para que las partículas NO se vean cuadradas. */
function useRoundTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.25, "rgba(255,255,255,0.85)");
    grd.addColorStop(0.6, "rgba(255,255,255,0.25)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.beginPath();
    g.arc(32, 32, 32, 0, Math.PI * 2);
    g.fill();
    const t = new THREE.CanvasTexture(c);
    t.needsUpdate = true;
    return t;
  }, []);
}

function Dust({ count = 420 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const tex = useRoundTexture();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const gold = new THREE.Color("#f0d97a");
    const blue = new THREE.Color("#bfe3f5");
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = Math.random() > 0.5 ? gold : blue;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.025;
    ref.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        map={tex}
        alphaMap={tex}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function Rig() {
  useFrame((state) => {
    // Parallax muy sutil para que no se sienta "desfasado".
    const tx = state.pointer.x * 0.35;
    const ty = state.pointer.y * 0.22;
    state.camera.position.x += (tx - state.camera.position.x) * 0.03;
    state.camera.position.y += (ty - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <fog attach="fog" args={["#061528", 8, 18]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.1} color="#f0d97a" />
      <pointLight position={[-5, -3, 2]} intensity={0.7} color="#5bafd6" />
      <Dust />
      <Rig />
    </Canvas>
  );
}
