/**
 * Librería de ilustraciones SVG originales con tema Cenicienta.
 * Hechas a mano (sin imágenes con copyright). Paleta celeste + dorado,
 * con filigranas, facetas, brillos y destellos para un acabado detallado.
 * Cada una acepta className para tamaño/animación.
 */
import type { SVGProps } from "react";

type Art = SVGProps<SVGSVGElement>;

const GOLD = "#d4af37";
const GOLD_L = "#f0d97a";

/* Destellos de estrella esparcidos (4 puntas) en coordenadas dadas. */
function Twinkles({
  points,
  color = GOLD_L,
}: {
  points: [number, number, number][]; // x, y, size
  color?: string;
}) {
  return (
    <g>
      {points.map(([x, y, s], i) => (
        <path
          key={i}
          d={`M${x} ${y - s} Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y} Q${
            x + s * 0.18
          } ${y + s * 0.18} ${x} ${y + s} Q${x - s * 0.18} ${y + s * 0.18} ${
            x - s
          } ${y} Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s}Z`}
          fill={color}
          opacity={0.85}
        />
      ))}
    </g>
  );
}

/* Carruaje de calabaza estilo Cenicienta — con filigrana y farol */
export function Carriage({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 360 250" fill="none" className={className} {...rest}>
      <defs>
        <radialGradient id="carBody" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="rgba(225,243,252,0.6)" />
          <stop offset="55%" stopColor="rgba(168,216,234,0.3)" />
          <stop offset="100%" stopColor="rgba(46,134,193,0.2)" />
        </radialGradient>
        <linearGradient id="carGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD_L} />
          <stop offset="50%" stopColor={GOLD} />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
        <radialGradient id="carWin" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(127,208,239,0.25)" />
        </radialGradient>
      </defs>

      {/* ruedas con rayos y cubo */}
      {[95, 255].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={190} r={34} stroke="url(#carGold)" strokeWidth={3.4} />
          <circle cx={cx} cy={190} r={27} stroke="url(#carGold)" strokeWidth={1.2} opacity={0.6} />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={cx + Math.cos(a) * 7}
                y1={190 + Math.sin(a) * 7}
                x2={cx + Math.cos(a) * 27}
                y2={190 + Math.sin(a) * 27}
                stroke="url(#carGold)"
                strokeWidth={1.1}
                opacity={0.8}
              />
            );
          })}
          <circle cx={cx} cy={190} r={6.5} fill="url(#carGold)" />
          <circle cx={cx} cy={190} r={2.5} fill="#fff7e0" />
        </g>
      ))}

      {/* cuerpo (calabaza) con doble contorno */}
      <path
        d="M68 150 Q56 66 180 58 Q304 66 292 150 Q300 186 180 190 Q60 186 68 150Z"
        fill="url(#carBody)"
        stroke="url(#carGold)"
        strokeWidth={2.6}
      />
      <path
        d="M76 150 Q66 76 180 68 Q294 76 284 150 Q291 180 180 184 Q69 180 76 150Z"
        stroke="url(#carGold)"
        strokeWidth={0.8}
        opacity={0.5}
      />

      {/* nervaduras de calabaza */}
      {[-50, -25, 0, 25, 50].map((off, i) => (
        <path
          key={i}
          d={`M${180 + off} 66 Q${180 + off * 1.25} 125 ${180 + off} 186`}
          stroke="url(#carGold)"
          strokeWidth={1}
          opacity={0.45}
        />
      ))}

      {/* filigrana inferior */}
      <path
        d="M120 178 Q150 196 180 184 Q210 196 240 178"
        stroke="url(#carGold)"
        strokeWidth={1.4}
        opacity={0.7}
        fill="none"
      />

      {/* ventana ovalada con marco y cortina */}
      <ellipse cx="180" cy="118" rx="40" ry="46" fill="url(#carWin)" stroke="url(#carGold)" strokeWidth={2.2} />
      <ellipse cx="180" cy="118" rx="33" ry="39" stroke="url(#carGold)" strokeWidth={0.8} opacity={0.6} />
      <path d="M150 96 Q180 108 210 96" stroke="url(#carGold)" strokeWidth={1.4} opacity={0.7} />
      {/* silueta de princesa insinuada */}
      <path d="M180 150 Q168 140 172 124 Q176 112 180 112 Q184 112 188 124 Q192 140 180 150Z" fill="rgba(240,217,122,0.3)" />
      <circle cx="180" cy="108" r="6" fill="rgba(255,247,224,0.5)" />

      {/* corona superior con joya */}
      <path d="M150 56 L162 36 L180 50 L198 36 L210 56" stroke="url(#carGold)" strokeWidth={2.4} fill="none" />
      <circle cx="162" cy="36" r="4" fill="url(#carGold)" />
      <circle cx="180" cy="48" r="6" fill="url(#carWin)" stroke="url(#carGold)" strokeWidth={1.4} />
      <circle cx="198" cy="36" r="4" fill="url(#carGold)" />

      {/* farol delantero */}
      <line x1="292" y1="120" x2="312" y2="112" stroke="url(#carGold)" strokeWidth={1.6} />
      <path d="M312 104 L320 104 L323 120 L309 120Z" fill="url(#carWin)" stroke="url(#carGold)" strokeWidth={1.4} />
      <circle cx="316" cy="112" r="3" fill={GOLD_L} opacity={0.8} />

      {/* timón curvo */}
      <path d="M68 168 Q38 172 20 184" stroke="url(#carGold)" strokeWidth={2.2} fill="none" />

      <Twinkles points={[[300, 60, 5], [50, 100, 4], [330, 150, 3.5], [40, 60, 3]]} />
    </svg>
  );
}

/* Zapatilla de cristal — tacón alto (court shoe) de perfil */
export function GlassSlipper({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className} {...rest}>
      <defs>
        <linearGradient id="slip" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="rgba(247,253,255,0.9)" />
          <stop offset="42%" stopColor="rgba(180,224,240,0.55)" />
          <stop offset="100%" stopColor="rgba(91,175,214,0.34)" />
        </linearGradient>
        <linearGradient id="slipGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD_L} />
          <stop offset="100%" stopColor={GOLD} />
        </linearGradient>
      </defs>

      {/* sombra en el piso */}
      <ellipse cx="98" cy="120" rx="80" ry="6" fill="rgba(212,175,55,0.15)" />

      {/* tacón de aguja */}
      <path
        d="M150 92 C160 102 172 112 182 118 C184 119.5 181 122 177 119.5
           C168 113 156 104 146 98 C146 95 148 92 150 92 Z"
        fill="url(#slip)"
        stroke="url(#slipGold)"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />

      {/* cuerpo del zapato (court shoe) */}
      <path
        d="M22 104
           C20 76 40 64 66 64
           C112 64 138 56 170 70
           C178 74 176 90 168 96
           C124 110 74 108 52 108
           C40 108 28 108 22 104 Z"
        fill="url(#slip)"
        stroke="url(#slipGold)"
        strokeWidth={2.2}
        strokeLinejoin="round"
      />

      {/* escote (abertura del pie) */}
      <path
        d="M70 66 C104 60 134 62 166 74"
        stroke="url(#slipGold)"
        strokeWidth={1.4}
        fill="none"
        opacity={0.75}
      />
      <ellipse cx="116" cy="70" rx="46" ry="7" fill="rgba(7,26,48,0.28)" transform="rotate(-6 116 70)" />

      {/* suela */}
      <path d="M24 104 C70 114 130 110 168 96" stroke="url(#slipGold)" strokeWidth={1} fill="none" opacity={0.55} />

      {/* facetas de cristal */}
      <path d="M34 96 L58 70 L66 100 Z" fill="rgba(255,255,255,0.16)" />
      <path d="M66 100 L92 70 L112 92 Z" fill="rgba(127,208,239,0.16)" />

      {/* lazo en el empeine */}
      <g>
        <path d="M86 72 Q74 64 66 72 Q74 78 86 74 Z" fill="rgba(255,255,255,0.5)" stroke="url(#slipGold)" strokeWidth={1.1} />
        <path d="M86 72 Q98 64 106 72 Q98 78 86 74 Z" fill="rgba(255,255,255,0.5)" stroke="url(#slipGold)" strokeWidth={1.1} />
        <circle cx="86" cy="73" r="3" fill={GOLD_L} stroke="url(#slipGold)" strokeWidth={0.8} />
      </g>

      {/* brillo */}
      <ellipse cx="56" cy="86" rx="12" ry="6" fill="rgba(255,255,255,0.55)" transform="rotate(-22 56 86)" />

      <Twinkles points={[[150, 52, 5], [40, 60, 4], [184, 96, 3.4], [104, 118, 3]]} />
    </svg>
  );
}

/* Castillo de cuento — torres, almenas, ventanas y estrellas */
export function Castle({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 320 280" fill="none" className={className} {...rest}>
      <defs>
        <linearGradient id="cas" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(220,240,250,0.45)" />
          <stop offset="100%" stopColor="rgba(46,134,193,0.2)" />
        </linearGradient>
        <linearGradient id="casGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD_L} />
          <stop offset="100%" stopColor={GOLD} />
        </linearGradient>
        <radialGradient id="casWin" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(240,217,122,0.85)" />
          <stop offset="100%" stopColor="rgba(212,175,55,0.3)" />
        </radialGradient>
      </defs>

      {/* base con almenas */}
      <path d="M74 170 H246 V262 H74Z" fill="url(#cas)" stroke="url(#casGold)" strokeWidth={1.6} />
      {[74, 94, 114, 206, 226, 246].map((x, i) => (
        <rect key={i} x={x - 6} y={162} width={12} height={10} fill="url(#cas)" stroke="url(#casGold)" strokeWidth={1.2} />
      ))}

      {/* torres laterales */}
      {[[48, 132], [224, 132]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={48} height={130} fill="url(#cas)" stroke="url(#casGold)" strokeWidth={1.6} />
          <path d={`M${x - 6} ${y} L${x + 24} ${y - 52} L${x + 54} ${y}Z`} fill="url(#cas)" stroke="url(#casGold)" strokeWidth={1.6} />
          <line x1={x + 24} y1={y - 52} x2={x + 24} y2={y - 72} stroke="url(#casGold)" strokeWidth={1.4} />
          <path d={`M${x + 24} ${y - 72} L${x + 40} ${y - 67} L${x + 24} ${y - 62}Z`} fill="url(#casGold)" />
        </g>
      ))}

      {/* torre central alta */}
      <rect x="130" y="84" width="60" height="178" fill="url(#cas)" stroke="url(#casGold)" strokeWidth={1.6} />
      <path d="M124 84 L160 26 L196 84Z" fill="url(#cas)" stroke="url(#casGold)" strokeWidth={1.6} />
      <line x1="160" y1="26" x2="160" y2="4" stroke="url(#casGold)" strokeWidth={1.4} />
      <path d="M160 4 L178 9 L160 14Z" fill="url(#casGold)" />

      {/* franjas de ladrillo sutiles */}
      {[200, 220, 240].map((y, i) => (
        <line key={i} x1={74} y1={y} x2={246} y2={y} stroke="url(#casGold)" strokeWidth={0.5} opacity={0.3} />
      ))}

      {/* portón ojival */}
      <path d="M142 262 V214 Q160 192 178 214 V262Z" fill="rgba(212,175,55,0.22)" stroke="url(#casGold)" strokeWidth={1.6} />
      <line x1="160" y1="200" x2="160" y2="262" stroke="url(#casGold)" strokeWidth={0.8} opacity={0.6} />

      {/* ventanas iluminadas */}
      {[
        [160, 110], [160, 150], [60, 160], [248, 160], [88, 200], [232, 200], [148, 230], [172, 230],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 5} y={y} width={10} height={16} rx={5} fill="url(#casWin)" stroke="url(#casGold)" strokeWidth={0.9} />
      ))}

      <Twinkles points={[[40, 40, 5], [280, 50, 4.5], [300, 130, 3.5], [20, 110, 3], [160, 50, 3]]} />
    </svg>
  );
}

/* Reloj de medianoche (el hechizo termina) — con ornamentos */
export function MidnightClock({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 170 210" fill="none" className={className} {...rest}>
      <defs>
        <radialGradient id="clk" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="rgba(225,243,252,0.55)" />
          <stop offset="100%" stopColor="rgba(46,134,193,0.22)" />
        </radialGradient>
        <linearGradient id="clkGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD_L} />
          <stop offset="100%" stopColor={GOLD} />
        </linearGradient>
      </defs>

      {/* cúpula con remate */}
      <path d="M50 48 Q85 6 120 48" stroke="url(#clkGold)" strokeWidth={2.4} fill="rgba(168,216,234,0.15)" />
      <line x1="85" y1="14" x2="85" y2="4" stroke="url(#clkGold)" strokeWidth={1.4} />
      <circle cx="85" cy="10" r="4.5" fill="url(#clkGold)" />

      {/* cuerpo con molduras */}
      <rect x="44" y="48" width="82" height="120" rx="14" fill="url(#clk)" stroke="url(#clkGold)" strokeWidth={2.2} />
      <rect x="50" y="54" width="70" height="108" rx="10" stroke="url(#clkGold)" strokeWidth={0.8} opacity={0.5} />

      {/* esfera */}
      <circle cx="85" cy="90" r="30" fill="rgba(7,26,48,0.55)" stroke="url(#clkGold)" strokeWidth={2.2} />
      <circle cx="85" cy="90" r="30" stroke="url(#clkGold)" strokeWidth={0.6} opacity={0.5} />
      {/* todas las marcas horarias */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const big = i % 3 === 0;
        return (
          <line
            key={i}
            x1={85 + Math.sin(a) * 26}
            y1={90 - Math.cos(a) * 26}
            x2={85 + Math.sin(a) * (big ? 21 : 23)}
            y2={90 - Math.cos(a) * (big ? 21 : 23)}
            stroke="url(#clkGold)"
            strokeWidth={big ? 1.8 : 1}
          />
        );
      })}
      {/* manecillas a medianoche (12:00) */}
      <line x1="85" y1="90" x2="85" y2="70" stroke={GOLD_L} strokeWidth={2.2} strokeLinecap="round" />
      <line x1="85" y1="90" x2="85" y2="72" stroke={GOLD_L} strokeWidth={2.6} strokeLinecap="round" />
      <circle cx="85" cy="90" r="3" fill="url(#clkGold)" />

      {/* péndulo */}
      <line x1="85" y1="122" x2="85" y2="150" stroke="url(#clkGold)" strokeWidth={1.4} />
      <circle cx="85" cy="152" r="9" fill="rgba(240,217,122,0.4)" stroke="url(#clkGold)" strokeWidth={1.6} />
      <circle cx="85" cy="152" r="4" fill={GOLD_L} opacity={0.7} />

      {/* base con patas */}
      <rect x="54" y="168" width="62" height="12" rx="3" fill="url(#clk)" stroke="url(#clkGold)" strokeWidth={1.6} />
      <rect x="58" y="180" width="8" height="8" fill="url(#clkGold)" />
      <rect x="104" y="180" width="8" height="8" fill="url(#clkGold)" />

      <Twinkles points={[[30, 60, 4.5], [140, 70, 4], [145, 140, 3.5], [25, 120, 3]]} />
    </svg>
  );
}

/* Varita mágica — con destello radial */
export function MagicWand({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 130 130" fill="none" className={className} {...rest}>
      <defs>
        <linearGradient id="wandGold" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_L} />
        </linearGradient>
        <radialGradient id="wandGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(246,231,168,0.9)" />
          <stop offset="100%" stopColor="rgba(246,231,168,0)" />
        </radialGradient>
      </defs>
      <line x1="22" y1="106" x2="74" y2="54" stroke="url(#wandGold)" strokeWidth={4.5} strokeLinecap="round" />
      <line x1="22" y1="106" x2="74" y2="54" stroke="#fff7e0" strokeWidth={1.4} strokeLinecap="round" opacity={0.6} />
      <circle cx="84" cy="42" r="26" fill="url(#wandGlow)" />
      <g transform="translate(84,42)">
        <path
          d="M0 -20 L6 -6 L20 -6 L9 4 L13 19 L0 10 L-13 19 L-9 4 L-20 -6 L-6 -6 Z"
          fill="url(#wandGold)"
          stroke="#fff7e0"
          strokeWidth={0.8}
        />
        <circle r="3" fill="#fff7e0" />
      </g>
      <Twinkles points={[[104, 22, 5], [60, 40, 3.5], [92, 64, 3.5], [108, 50, 2.6], [44, 70, 3]]} />
    </svg>
  );
}

/* Tiara / corona (fallback) — con engastes y perlas */
export function Tiara({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 210 120" fill="none" className={className} {...rest}>
      <defs>
        <linearGradient id="tiara" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD_L} />
          <stop offset="100%" stopColor={GOLD} />
        </linearGradient>
        <radialGradient id="tiaraGem" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(127,208,239,0.4)" />
        </radialGradient>
      </defs>
      <path
        d="M20 92 Q26 52 44 66 Q56 30 76 62 Q92 18 108 58 Q124 18 140 62 Q160 30 172 66 Q190 52 196 92 Z"
        fill="rgba(212,175,55,0.16)"
        stroke="url(#tiara)"
        strokeWidth={2.6}
        strokeLinejoin="round"
      />
      {/* engastes */}
      <circle cx="108" cy="46" r="8" fill="url(#tiaraGem)" stroke="url(#tiara)" strokeWidth={1.6} />
      <circle cx="76" cy="58" r="5" fill="url(#tiaraGem)" stroke="url(#tiara)" strokeWidth={1.2} />
      <circle cx="140" cy="58" r="5" fill="url(#tiaraGem)" stroke="url(#tiara)" strokeWidth={1.2} />
      <circle cx="44" cy="64" r="3.5" fill="url(#tiara)" />
      <circle cx="172" cy="64" r="3.5" fill="url(#tiara)" />
      {/* banda inferior con perlas */}
      <rect x="18" y="92" width="178" height="6" rx="3" fill="url(#tiara)" />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={28 + i * 20} cy={104} r={3} fill="#fff7e0" />
      ))}
      <Twinkles points={[[108, 30, 5], [55, 50, 3.5], [160, 50, 3.5]]} />
    </svg>
  );
}

/* Vestido de gala — con corpiño detallado y volados */
export function Gown({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 170 240" fill="none" className={className} {...rest}>
      <defs>
        <linearGradient id="gown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(225,243,252,0.7)" />
          <stop offset="100%" stopColor="rgba(91,175,214,0.35)" />
        </linearGradient>
        <linearGradient id="gownGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={GOLD_L} />
          <stop offset="100%" stopColor={GOLD} />
        </linearGradient>
      </defs>
      {/* hombros / tirantes */}
      <path d="M64 32 Q72 22 85 24 Q98 22 106 32" stroke="url(#gownGold)" strokeWidth={1.6} fill="none" />
      {/* corpiño */}
      <path d="M64 32 Q85 26 106 32 L102 82 Q85 92 68 82 Z" fill="url(#gown)" stroke="url(#gownGold)" strokeWidth={1.8} />
      <path d="M76 34 Q85 48 94 34" stroke="url(#gownGold)" strokeWidth={1} opacity={0.6} />
      {/* falda amplia con volados */}
      <path d="M68 80 Q44 152 18 216 Q85 234 152 216 Q124 152 102 80 Q85 92 68 80Z" fill="url(#gown)" stroke="url(#gownGold)" strokeWidth={1.8} />
      {/* pliegues */}
      {[-30, -14, 0, 14, 30].map((off, i) => (
        <path
          key={i}
          d={`M${85 + off * 0.5} 88 Q${85 + off} 150 ${85 + off * 1.4} 214`}
          stroke="url(#gownGold)"
          strokeWidth={0.9}
          opacity={0.4}
        />
      ))}
      {/* borde inferior festoneado */}
      <path d="M18 216 Q35 226 52 218 Q68 228 85 220 Q102 228 118 218 Q135 226 152 216" stroke="url(#gownGold)" strokeWidth={1.2} opacity={0.7} fill="none" />
      {/* cinturón con flor */}
      <path d="M68 80 Q85 90 102 80" stroke="url(#gownGold)" strokeWidth={2.6} fill="none" />
      <circle cx="85" cy="84" r="4.5" fill="url(#gownGold)" />
      <circle cx="85" cy="84" r="1.8" fill="#fff7e0" />
      <Twinkles points={[[40, 120, 4.5], [130, 120, 4], [85, 200, 3.5], [30, 180, 3]]} />
    </svg>
  );
}

/* Estrella de 4 puntas reutilizable (destello) */
export function Sparkle4({ className, ...rest }: Art) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} {...rest}>
      <path d="M20 0 Q23 16 40 20 Q23 24 20 40 Q17 24 0 20 Q17 16 20 0Z" fill={GOLD_L} />
    </svg>
  );
}
