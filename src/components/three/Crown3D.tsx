"use client";

/**
 * Corona 3D de princesa, modelada de forma procedural con three.js.
 * Banda dorada metálica, puntas con finiales esféricos, gemas celestes y una
 * gema central. Gira lentamente con un leve cabeceo. Tiene su propio <Canvas>
 * pequeño (se ubica arriba en el Hero). Carga diferida vía Crown3DLazy.
 */

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GOLD = "#d4af37";
const GOLD_HI = "#f6e7a8";
const GEM = "#7fd0ef";

function GoldMat(props: { roughness?: number; emissive?: string }) {
  return (
    <meshStandardMaterial
      color={GOLD}
      metalness={0.95}
      roughness={props.roughness ?? 0.28}
      emissive={props.emissive ?? "#3a2c05"}
      emissiveIntensity={0.35}
    />
  );
}

function Gem({
  position,
  scale = 1,
  color = GEM,
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <mesh position={position} scale={scale}>
      <octahedronGeometry args={[0.12, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        metalness={0.3}
        roughness={0.05}
        flatShading
      />
    </mesh>
  );
}

function CrownModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.6;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.04;
  });

  const points = 8;
  const spikes = useMemo(
    () =>
      Array.from({ length: points }, (_, i) => {
        const a = (i / points) * Math.PI * 2;
        return { a, x: Math.cos(a), z: Math.sin(a) };
      }),
    []
  );

  return (
    <group ref={group} scale={1.05}>
      {/* Banda principal (cilindro abierto) */}
      <mesh>
        <cylinderGeometry args={[1, 1, 0.5, 48, 1, true]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={0.95}
          roughness={0.3}
          emissive="#3a2c05"
          emissiveIntensity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Rebordes superior e inferior (toros) */}
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.05, 16, 48]} />
        <GoldMat />
      </mesh>
      <mesh position={[0, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.02, 0.06, 16, 48]} />
        <GoldMat />
      </mesh>

      {/* Puntas con finiales (bolitas) y gemas en la base */}
      {spikes.map(({ a, x, z }, i) => {
        const isFront = i === 0;
        const h = isFront ? 0.75 : 0.5;
        const y = 0.25 + h / 2;
        return (
          <group key={i}>
            <mesh position={[x, y, z]} rotation={[0, -a, 0]}>
              <coneGeometry args={[0.13, h, 24]} />
              <GoldMat />
            </mesh>
            {/* finial esférico en la punta */}
            <mesh position={[x, 0.25 + h + 0.06, z]}>
              <sphereGeometry args={[0.08, 20, 20]} />
              <meshStandardMaterial
                color={GOLD_HI}
                metalness={0.95}
                roughness={0.2}
                emissive="#4a3a10"
                emissiveIntensity={0.4}
              />
            </mesh>
            {/* gema en la base de cada punta, sobre la banda */}
            <Gem position={[x * 0.98, 0.05, z * 0.98]} scale={isFront ? 1.4 : 1} />
          </group>
        );
      })}

      {/* Gema central frontal grande (zafiro) */}
      <Gem position={[1.0, 0.05, 0]} scale={1.8} color={GEM} />

      {/* Pequeñas perlas decorativas en el reborde inferior */}
      {spikes.map(({ x, z }, i) => (
        <mesh key={`p${i}`} position={[x * 1.02, -0.25, z * 1.02]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#fff7e0" metalness={0.2} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export default function Crown3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 3.6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 3, 4]} intensity={2.2} color="#fff3d0" />
      <pointLight position={[-3, 1, 2]} intensity={1.4} color="#7fd0ef" />
      <pointLight position={[0, -2, 3]} intensity={0.8} color="#f0d97a" />
      <spotLight position={[0, 4, 1]} intensity={1.2} angle={0.6} color="#ffffff" />
      <CrownModel />
    </Canvas>
  );
}
