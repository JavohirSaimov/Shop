import React from "react";
import {
  Cylinder,
  Torus,
  Sphere,
  RoundedBox,
  Cone,
  Ring,
} from "@react-three/drei";

/* ─────────────────────────────────────────────
   Shared helpers
   ───────────────────────────────────────────── */

/** Small decorative star made of flattened spheres */
function Star({
  position = [0, 0, 0] as [number, number, number],
  color = "#FDE047",
  size = 0.08,
}: {
  position?: [number, number, number];
  color?: string;
  size?: number;
}) {
  const points = 5;
  return (
    <group position={position}>
      {Array.from({ length: points }).map((_, i) => {
        const angle = (i * Math.PI * 2) / points - Math.PI / 2;
        return (
          <RoundedBox
            key={i}
            args={[size * 2.2, size * 0.55, size * 0.3]}
            radius={size * 0.12}
            position={[
              Math.cos(angle) * size * 0.55,
              Math.sin(angle) * size * 0.55,
              0,
            ]}
            rotation={[0, 0, angle]}
          >
            <meshStandardMaterial
              color={color}
              roughness={0.5}
              metalness={0.3}
              emissive={color}
              emissiveIntensity={0.15}
            />
          </RoundedBox>
        );
      })}
      <Sphere args={[size * 0.45, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.3}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </Sphere>
    </group>
  );
}

/** Decorative heart */
function Heart({
  position = [0, 0, 0] as [number, number, number],
  color = "#F472B6",
  size = 0.1,
}: {
  position?: [number, number, number];
  color?: string;
  size?: number;
}) {
  return (
    <group position={position} scale={size}>
      {/* Left bump */}
      <Sphere args={[0.5, 16, 16]} position={[-0.35, 0.25, 0]} scale={[1, 0.9, 0.5]}>
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.15} emissive={color} emissiveIntensity={0.1} />
      </Sphere>
      {/* Right bump */}
      <Sphere args={[0.5, 16, 16]} position={[0.35, 0.25, 0]} scale={[1, 0.9, 0.5]}>
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.15} emissive={color} emissiveIntensity={0.1} />
      </Sphere>
      {/* Bottom point */}
      <Cone args={[0.72, 0.9, 16]} position={[0, -0.25, 0]} rotation={[Math.PI, 0, 0]}>
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.15} emissive={color} emissiveIntensity={0.1} />
      </Cone>
    </group>
  );
}

/** Single button with thread holes */
function Button({
  position = [0, 0, 0] as [number, number, number],
  color = "#ffffff",
  size = 0.07,
}: {
  position?: [number, number, number];
  color?: string;
  size?: number;
}) {
  return (
    <group position={position}>
      {/* Button body */}
      <Cylinder args={[size, size, size * 0.35, 24]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
      </Cylinder>
      {/* Button rim */}
      <Torus args={[size * 0.85, size * 0.1, 8, 24]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.25} />
      </Torus>
      {/* Thread holes */}
      {[
        [-size * 0.3, -size * 0.3],
        [size * 0.3, -size * 0.3],
        [-size * 0.3, size * 0.3],
        [size * 0.3, size * 0.3],
      ].map(([x, y], i) => (
        <Cylinder
          key={i}
          args={[size * 0.08, size * 0.08, size * 0.5, 8]}
          position={[x, y, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#333333" roughness={0.9} metalness={0} />
        </Cylinder>
      ))}
    </group>
  );
}

/** Decorative bow */
function Bow({
  position = [0, 0, 0] as [number, number, number],
  color = "#F472B6",
  size = 0.15,
}: {
  position?: [number, number, number];
  color?: string;
  size?: number;
}) {
  return (
    <group position={position} scale={size}>
      {/* Left loop */}
      <Sphere args={[0.55, 16, 16]} position={[-0.5, 0, 0]} scale={[1.2, 0.7, 0.4]}>
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </Sphere>
      {/* Right loop */}
      <Sphere args={[0.55, 16, 16]} position={[0.5, 0, 0]} scale={[1.2, 0.7, 0.4]}>
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </Sphere>
      {/* Center knot */}
      <Sphere args={[0.25, 16, 16]} scale={[1, 1, 0.5]}>
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </Sphere>
      {/* Left tail */}
      <RoundedBox args={[0.35, 0.7, 0.12]} radius={0.04} position={[-0.45, -0.45, 0]} rotation={[0, 0, 0.25]}>
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </RoundedBox>
      {/* Right tail */}
      <RoundedBox args={[0.35, 0.7, 0.12]} radius={0.04} position={[0.45, -0.45, 0]} rotation={[0, 0, -0.25]}>
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </RoundedBox>
    </group>
  );
}

/** Horizontal stitching line */
function StitchLine({
  position = [0, 0, 0] as [number, number, number],
  width = 0.8,
  color = "#00000022",
  rotation = [0, 0, 0] as [number, number, number],
}: {
  position?: [number, number, number];
  width?: number;
  color?: string;
  rotation?: [number, number, number];
}) {
  const dashCount = Math.floor(width / 0.08);
  return (
    <group position={position} rotation={rotation}>
      {Array.from({ length: dashCount }).map((_, i) => (
        <RoundedBox
          key={i}
          args={[0.04, 0.012, 0.012]}
          radius={0.003}
          position={[-width / 2 + i * (width / dashCount) + 0.02, 0, 0]}
        >
          <meshStandardMaterial
            color={color}
            roughness={1}
            metalness={0}
            transparent
            opacity={0.5}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────
   SHIRT
   ───────────────────────────────────────────── */

export function Shirt({ color = "#F472B6" }: { color?: string }) {
  // Slightly lighter/darker shade for accent
  return (
    <group>
      {/* ── Main Body ── */}
      <RoundedBox args={[1.3, 1.5, 0.45]} radius={0.18}>
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </RoundedBox>

      {/* Body side panels — subtle depth */}
      <RoundedBox args={[0.15, 1.35, 0.42]} radius={0.07} position={[-0.62, 0, 0]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} transparent opacity={0.85} />
      </RoundedBox>
      <RoundedBox args={[0.15, 1.35, 0.42]} radius={0.07} position={[0.62, 0, 0]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} transparent opacity={0.85} />
      </RoundedBox>

      {/* ── Left Sleeve ── */}
      <group position={[-0.85, 0.35, 0]} rotation={[0, 0, 0.45]}>
        <RoundedBox args={[0.55, 0.75, 0.38]} radius={0.12}>
          <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
        </RoundedBox>
        {/* Sleeve cuff */}
        <RoundedBox args={[0.57, 0.1, 0.4]} radius={0.04} position={[0, -0.38, 0]}>
          <meshStandardMaterial color={color} roughness={0.8} metalness={0.08} />
        </RoundedBox>
        {/* Sleeve hem stitch */}
        <StitchLine position={[0, -0.32, 0.2]} width={0.45} />
      </group>

      {/* ── Right Sleeve ── */}
      <group position={[0.85, 0.35, 0]} rotation={[0, 0, -0.45]}>
        <RoundedBox args={[0.55, 0.75, 0.38]} radius={0.12}>
          <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
        </RoundedBox>
        {/* Sleeve cuff */}
        <RoundedBox args={[0.57, 0.1, 0.4]} radius={0.04} position={[0, -0.38, 0]}>
          <meshStandardMaterial color={color} roughness={0.8} metalness={0.08} />
        </RoundedBox>
        <StitchLine position={[0, -0.32, 0.2]} width={0.45} />
      </group>

      {/* ── Collar (layered for richness) ── */}
      <Torus args={[0.38, 0.09, 20, 40]} position={[0, 0.75, 0.12]} rotation={[-0.3, 0, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.05} />
      </Torus>
      <Torus args={[0.33, 0.06, 16, 32]} position={[0, 0.78, 0.14]} rotation={[-0.25, 0, 0]}>
        <meshStandardMaterial color="#f0f0f0" roughness={0.6} metalness={0.08} />
      </Torus>

      {/* ── Front placket (button strip) ── */}
      <RoundedBox args={[0.14, 1.3, 0.06]} radius={0.03} position={[0, 0, 0.24]}>
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.05} transparent opacity={0.7} />
      </RoundedBox>

      {/* ── Buttons ── */}
      <Button position={[0, 0.4, 0.28]} color="#ffffff" size={0.055} />
      <Button position={[0, 0.1, 0.28]} color="#ffffff" size={0.055} />
      <Button position={[0, -0.2, 0.28]} color="#ffffff" size={0.055} />
      <Button position={[0, -0.5, 0.28]} color="#ffffff" size={0.055} />

      {/* ── Pocket with star decoration ── */}
      <group position={[-0.32, 0.15, 0.24]}>
        <RoundedBox args={[0.32, 0.32, 0.04]} radius={0.06}>
          <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0.05} transparent opacity={0.65} />
        </RoundedBox>
        {/* Pocket fold */}
        <RoundedBox args={[0.32, 0.06, 0.05]} radius={0.02} position={[0, 0.16, 0.01]}>
          <meshStandardMaterial color="#ffffff" roughness={0.75} metalness={0.08} transparent opacity={0.8} />
        </RoundedBox>
        {/* Star on pocket */}
        <Star position={[0, -0.02, 0.03]} color="#FDE047" size={0.065} />
      </group>

      {/* ── Bottom hem ── */}
      <RoundedBox args={[1.32, 0.08, 0.46]} radius={0.03} position={[0, -0.74, 0]}>
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.08} />
      </RoundedBox>
      <StitchLine position={[0, -0.68, 0.24]} width={1.1} />

      {/* ── Tag at back collar ── */}
      <RoundedBox args={[0.18, 0.22, 0.02]} radius={0.03} position={[0, 0.62, -0.22]}>
        <meshStandardMaterial color="#fef3c7" roughness={0.9} metalness={0} />
      </RoundedBox>
    </group>
  );
}

/* ─────────────────────────────────────────────
   PANTS
   ───────────────────────────────────────────── */

export function Pants({ color = "#60A5FA" }: { color?: string }) {
  return (
    <group>
      {/* ── Waistband ── */}
      <RoundedBox args={[1.25, 0.3, 0.52]} radius={0.1} position={[0, 0.9, 0]}>
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.08} />
      </RoundedBox>

      {/* Waistband inner fold */}
      <RoundedBox args={[1.22, 0.06, 0.5]} radius={0.02} position={[0, 1.05, 0]}>
        <meshStandardMaterial color={color} roughness={0.75} metalness={0.1} />
      </RoundedBox>

      {/* ── Belt loops ── */}
      {[-0.45, -0.15, 0.15, 0.45].map((x, i) => (
        <RoundedBox
          key={`loop-${i}`}
          args={[0.06, 0.2, 0.06]}
          radius={0.015}
          position={[x, 0.95, 0.27]}
        >
          <meshStandardMaterial color={color} roughness={0.85} metalness={0.06} />
        </RoundedBox>
      ))}

      {/* ── Hip section ── */}
      <RoundedBox args={[1.25, 0.45, 0.52]} radius={0.12} position={[0, 0.62, 0]}>
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </RoundedBox>

      {/* ── Left Leg ── */}
      <group position={[-0.33, -0.05, 0]}>
        <RoundedBox args={[0.55, 1.25, 0.48]} radius={0.12}>
          <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
        </RoundedBox>
        {/* Knee reinforcement patch */}
        <RoundedBox args={[0.35, 0.3, 0.06]} radius={0.08} position={[0, -0.05, 0.25]}>
          <meshStandardMaterial color={color} roughness={0.9} metalness={0.03} transparent opacity={0.6} />
        </RoundedBox>
        {/* Leg cuff */}
        <RoundedBox args={[0.57, 0.1, 0.5]} radius={0.04} position={[0, -0.62, 0]}>
          <meshStandardMaterial color={color} roughness={0.8} metalness={0.08} />
        </RoundedBox>
        <StitchLine position={[0, -0.55, 0.26]} width={0.45} />
      </group>

      {/* ── Right Leg ── */}
      <group position={[0.33, -0.05, 0]}>
        <RoundedBox args={[0.55, 1.25, 0.48]} radius={0.12}>
          <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
        </RoundedBox>
        {/* Knee reinforcement patch */}
        <RoundedBox args={[0.35, 0.3, 0.06]} radius={0.08} position={[0, -0.05, 0.25]}>
          <meshStandardMaterial color={color} roughness={0.9} metalness={0.03} transparent opacity={0.6} />
        </RoundedBox>
        {/* Leg cuff */}
        <RoundedBox args={[0.57, 0.1, 0.5]} radius={0.04} position={[0, -0.62, 0]}>
          <meshStandardMaterial color={color} roughness={0.8} metalness={0.08} />
        </RoundedBox>
        <StitchLine position={[0, -0.55, 0.26]} width={0.45} />
      </group>

      {/* ── Front fly detail ── */}
      <RoundedBox args={[0.08, 0.5, 0.04]} radius={0.02} position={[0, 0.6, 0.27]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.03} transparent opacity={0.5} />
      </RoundedBox>

      {/* ── Waist button ── */}
      <Button position={[0, 0.92, 0.28]} color="#c0c0c0" size={0.06} />

      {/* ── Drawstrings ── */}
      <Cylinder args={[0.018, 0.018, 0.45]} position={[-0.12, 0.88, 0.28]} rotation={[0.15, 0, 0.2]}>
        <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0.05} />
      </Cylinder>
      <Cylinder args={[0.018, 0.018, 0.45]} position={[0.12, 0.88, 0.28]} rotation={[0.15, 0, -0.2]}>
        <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0.05} />
      </Cylinder>
      {/* Drawstring tips */}
      <Cylinder args={[0.025, 0.018, 0.08]} position={[-0.2, 0.68, 0.3]} rotation={[0.15, 0, 0.2]}>
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.5} />
      </Cylinder>
      <Cylinder args={[0.025, 0.018, 0.08]} position={[0.2, 0.68, 0.3]} rotation={[0.15, 0, -0.2]}>
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.5} />
      </Cylinder>

      {/* ── Side seam stitching ── */}
      <StitchLine position={[-0.6, 0.3, 0.26]} width={0.02} rotation={[0, 0, Math.PI / 2]} />
      <StitchLine position={[0.6, 0.3, 0.26]} width={0.02} rotation={[0, 0, Math.PI / 2]} />

      {/* ── Small heart patch on back pocket area ── */}
      <Heart position={[0.3, 0.55, -0.28]} color="#F472B6" size={0.08} />
    </group>
  );
}

/* ─────────────────────────────────────────────
   SOCK
   ───────────────────────────────────────────── */

export function Sock({ color = "#FBCFE8" }: { color?: string }) {
  return (
    <group>
      {/* ── Main leg tube ── */}
      <Cylinder args={[0.28, 0.3, 0.95, 32]} position={[0, 0.47, 0]} rotation={[0.08, 0, 0]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
      </Cylinder>

      {/* ── Decorative stripes ── */}
      {[0.7, 0.55, 0.4].map((y, i) => (
        <Torus
          key={`stripe-${i}`}
          args={[0.29 + i * 0.003, 0.025, 12, 32]}
          position={[0, y, 0.02]}
          rotation={[Math.PI / 2 - 0.08, 0, 0]}
        >
          <meshStandardMaterial
            color={i % 2 === 0 ? "#ffffff" : color}
            roughness={0.85}
            metalness={0.05}
          />
        </Torus>
      ))}

      {/* ── Ribbed cuff (multiple rings) ── */}
      {[0, 0.06, 0.12, 0.18].map((offset, i) => (
        <Torus
          key={`cuff-${i}`}
          args={[0.31, 0.04, 10, 32]}
          position={[0, 0.9 + offset, 0.03]}
          rotation={[Math.PI / 2 - 0.08, 0, 0]}
        >
          <meshStandardMaterial
            color={i % 2 === 0 ? "#ffffff" : color}
            roughness={0.75}
            metalness={0.08}
          />
        </Torus>
      ))}

      {/* ── Heel ── */}
      <Sphere args={[0.3, 32, 32]} position={[0, 0, -0.04]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
      </Sphere>
      {/* Heel reinforcement (slightly different shade) */}
      <Sphere args={[0.26, 24, 24]} position={[0, 0.02, -0.1]} scale={[0.9, 0.9, 0.7]}>
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.08} transparent opacity={0.6} />
      </Sphere>

      {/* ── Foot ── */}
      <Cylinder args={[0.28, 0.26, 0.72, 32]} position={[0, -0.04, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
      </Cylinder>

      {/* ── Toe cap ── */}
      <Sphere args={[0.26, 32, 32]} position={[0, -0.04, 0.72]}>
        <meshStandardMaterial color="#ffffff" roughness={0.85} metalness={0.05} />
      </Sphere>
      {/* Inner toe smoothing */}
      <Sphere args={[0.22, 24, 24]} position={[0, -0.02, 0.68]}>
        <meshStandardMaterial color="#f8f8f8" roughness={0.9} metalness={0.03} />
      </Sphere>

      {/* ── Sole line stitch ── */}
      <StitchLine position={[0, -0.18, 0.35]} width={0.5} rotation={[Math.PI / 2, 0, 0]} />

      {/* ── Small star decoration on ankle ── */}
      <Star position={[0.22, 0.35, 0.18]} color="#FDE047" size={0.05} />
    </group>
  );
}

/* ─────────────────────────────────────────────
   BEANIE
   ───────────────────────────────────────────── */

export function Beanie({ color = "#93C5FD" }: { color?: string }) {
  return (
    <group>
      {/* ── Main dome ── */}
      <Sphere args={[0.68, 40, 40, 0, Math.PI * 2, 0, Math.PI / 2]} scale={[1, 1.25, 1]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
      </Sphere>

      {/* ── Knit panel lines (vertical ribs) ── */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        return (
          <RoundedBox
            key={`rib-${i}`}
            args={[0.02, 0.85, 0.02]}
            radius={0.005}
            position={[
              Math.cos(angle) * 0.66,
              0.4,
              Math.sin(angle) * 0.66,
            ]}
            rotation={[0, -angle, 0.15 * Math.cos(angle)]}
          >
            <meshStandardMaterial color={color} roughness={0.95} metalness={0.02} transparent opacity={0.4} />
          </RoundedBox>
        );
      })}

      {/* ── Decorative stripe rings ── */}
      {[0.35, 0.55].map((y, i) => (
        <Torus
          key={`ring-${i}`}
          args={[0.58 - i * 0.1, 0.04, 12, 40]}
          position={[0, y, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#ffffff" roughness={0.85} metalness={0.05} transparent opacity={0.7} />
        </Torus>
      ))}

      {/* ── Ribbed brim (multiple thick rings) ── */}
      {[0, 0.05, 0.1, 0.15, 0.2].map((offset, i) => (
        <Torus
          key={`brim-${i}`}
          args={[0.68 + offset * 0.02, 0.06, 12, 40]}
          position={[0, -offset * 0.15, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial
            color={i % 2 === 0 ? color : "#ffffff"}
            roughness={0.85}
            metalness={0.05}
          />
        </Torus>
      ))}

      {/* ── Fold-up brim ── */}
      <Cylinder args={[0.72, 0.7, 0.2, 40]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.06} />
      </Cylinder>

      {/* ── Pompom (fluffy cluster) ── */}
      <group position={[0, 0.88, 0]}>
        <Sphere args={[0.18, 24, 24]}>
          <meshStandardMaterial color="#ffffff" roughness={0.95} metalness={0} />
        </Sphere>
        {/* Fluffy bumps around pompom */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 6;
          return (
            <Sphere
              key={`pom-${i}`}
              args={[0.1, 12, 12]}
              position={[Math.cos(a) * 0.12, 0.05 * Math.sin(i), Math.sin(a) * 0.12]}
            >
              <meshStandardMaterial color="#f8f8f8" roughness={0.95} metalness={0} />
            </Sphere>
          );
        })}
      </group>

      {/* ── Small tag ── */}
      <RoundedBox args={[0.14, 0.1, 0.02]} radius={0.02} position={[0.55, 0.1, 0.35]} rotation={[0, -0.5, 0]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.6} metalness={0.2} />
      </RoundedBox>
    </group>
  );
}

/* ─────────────────────────────────────────────
   DRESS
   ───────────────────────────────────────────── */

export function Dress({ color = "#FDE047" }: { color?: string }) {
  return (
    <group>
      {/* ── Bodice / Top ── */}
      <RoundedBox args={[1.1, 0.85, 0.42]} radius={0.12} position={[0, 0.82, 0]}>
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </RoundedBox>

      {/* Bodice darts (subtle shaping) */}
      <RoundedBox args={[0.08, 0.6, 0.05]} radius={0.02} position={[-0.25, 0.82, 0.22]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.03} transparent opacity={0.4} />
      </RoundedBox>
      <RoundedBox args={[0.08, 0.6, 0.05]} radius={0.02} position={[0.25, 0.82, 0.22]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.03} transparent opacity={0.4} />
      </RoundedBox>

      {/* ── Skirt (layered for volume) ── */}
      <Cone args={[1.25, 1.55, 40]} position={[0, -0.32, 0]}>
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </Cone>
      {/* Inner skirt layer (peek-out) */}
      <Cone args={[1.15, 1.45, 40]} position={[0, -0.27, 0]}>
        <meshStandardMaterial color={color} roughness={0.88} metalness={0.03} transparent opacity={0.5} />
      </Cone>

      {/* ── Skirt ruffle layers ── */}
      {[-0.65, -0.35, -0.05].map((y, i) => (
        <Torus
          key={`ruffle-${i}`}
          args={[0.75 + i * 0.2, 0.06, 12, 40]}
          position={[0, y, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 1, 0.3]}
        >
          <meshStandardMaterial color={color} roughness={0.9} metalness={0.03} transparent opacity={0.55} />
        </Torus>
      ))}

      {/* ── Hem lace trim ── */}
      <Torus args={[1.22, 0.05, 10, 48]} position={[0, -1.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0.05} />
      </Torus>

      {/* ── Waist sash / belt ── */}
      <Torus args={[0.56, 0.1, 20, 40]} position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.5]}>
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.08} />
      </Torus>

      {/* ── Bow on the waist sash ── */}
      <Bow position={[0.45, 0.4, 0.22]} color="#F472B6" size={0.18} />

      {/* ── Shoulder straps ── */}
      <group position={[-0.35, 1.35, 0]}>
        <RoundedBox args={[0.16, 0.55, 0.1]} radius={0.05}>
          <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
        </RoundedBox>
        {/* Strap stitch */}
        <StitchLine position={[0, 0, 0.06]} width={0.12} rotation={[0, 0, Math.PI / 2]} />
      </group>
      <group position={[0.35, 1.35, 0]}>
        <RoundedBox args={[0.16, 0.55, 0.1]} radius={0.05}>
          <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
        </RoundedBox>
        <StitchLine position={[0, 0, 0.06]} width={0.12} rotation={[0, 0, Math.PI / 2]} />
      </group>

      {/* ── Neckline detail ── */}
      <Torus args={[0.4, 0.04, 12, 32]} position={[0, 1.15, 0.1]} rotation={[-0.2, 0, 0]} scale={[1.2, 0.6, 1]}>
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.08} />
      </Torus>

      {/* ── Flower decoration on bodice ── */}
      <group position={[-0.3, 1.0, 0.24]}>
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 5;
          return (
            <Sphere
              key={`petal-${i}`}
              args={[0.045, 12, 12]}
              position={[Math.cos(angle) * 0.055, Math.sin(angle) * 0.055, 0]}
              scale={[1, 1, 0.4]}
            >
              <meshStandardMaterial color="#F472B6" roughness={0.7} metalness={0.1} />
            </Sphere>
          );
        })}
        <Sphere args={[0.03, 12, 12]}>
          <meshStandardMaterial color="#FDE047" roughness={0.5} metalness={0.2} emissive="#FDE047" emissiveIntensity={0.15} />
        </Sphere>
      </group>

      {/* ── Small heart on skirt ── */}
      <Heart position={[0.35, -0.5, 0.65]} color="#F472B6" size={0.07} />
    </group>
  );
}

/* ─────────────────────────────────────────────
   SHOE
   ───────────────────────────────────────────── */

export function Shoe({ color = "#F87171" }: { color?: string }) {
  return (
    <group>
      {/* ── Sole (multi-layered) ── */}
      {/* Outsole */}
      <RoundedBox args={[0.64, 0.08, 1.28]} radius={0.03} position={[0, -0.28, 0]}>
        <meshStandardMaterial color="#333333" roughness={0.95} metalness={0.02} />
      </RoundedBox>
      {/* Midsole */}
      <RoundedBox args={[0.62, 0.08, 1.25]} radius={0.04} position={[0, -0.2, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.05} />
      </RoundedBox>
      {/* Sole side stripe */}
      <RoundedBox args={[0.65, 0.03, 1.26]} radius={0.01} position={[0, -0.22, 0]}>
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} transparent opacity={0.7} />
      </RoundedBox>

      {/* ── Tread pattern (bottom of sole) ── */}
      {Array.from({ length: 6 }).map((_, i) => (
        <RoundedBox
          key={`tread-${i}`}
          args={[0.5, 0.02, 0.06]}
          radius={0.005}
          position={[0, -0.32, -0.45 + i * 0.18]}
        >
          <meshStandardMaterial color="#444444" roughness={1} metalness={0} />
        </RoundedBox>
      ))}

      {/* ── Main Body (upper) ── */}
      <RoundedBox args={[0.58, 0.42, 1.12]} radius={0.12} position={[0, 0.05, -0.02]}>
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.08} />
      </RoundedBox>

      {/* ── Tongue ── */}
      <RoundedBox args={[0.35, 0.35, 0.08]} radius={0.06} position={[0, 0.22, 0.15]} rotation={[0.3, 0, 0]}>
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </RoundedBox>

      {/* ── Toe cap ── */}
      <Sphere args={[0.29, 32, 32]} position={[0, 0.02, 0.55]} scale={[1, 0.75, 1]}>
        <meshStandardMaterial color="#ffffff" roughness={0.7} metalness={0.08} />
      </Sphere>
      {/* Toe cap stitch */}
      <Torus args={[0.27, 0.01, 8, 32]} position={[0, 0.05, 0.45]} rotation={[0.3, 0, 0]} scale={[1, 0.8, 1]}>
        <meshStandardMaterial color="#cccccc" roughness={0.9} metalness={0} />
      </Torus>

      {/* ── Heel counter ── */}
      <RoundedBox args={[0.55, 0.3, 0.18]} radius={0.06} position={[0, 0.05, -0.5]}>
        <meshStandardMaterial color={color} roughness={0.75} metalness={0.1} />
      </RoundedBox>
      {/* Heel pull tab */}
      <RoundedBox args={[0.12, 0.15, 0.04]} radius={0.03} position={[0, 0.22, -0.58]}>
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.15} />
      </RoundedBox>

      {/* ── Collar / Opening padding ── */}
      <Torus args={[0.24, 0.06, 12, 24]} position={[0, 0.25, -0.2]} rotation={[Math.PI / 2 + 0.1, 0, 0]} scale={[1.3, 1.6, 1]}>
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.05} />
      </Torus>

      {/* ── Laces ── */}
      {[-0.08, 0.04, 0.16, 0.28].map((z, i) => (
        <group key={`lace-${i}`}>
          {/* Cross lace left */}
          <Cylinder
            args={[0.012, 0.012, 0.28]}
            position={[-0.06, 0.25 - i * 0.02, z]}
            rotation={[0.3 + i * 0.03, 0.5, Math.PI / 2]}
          >
            <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0.05} />
          </Cylinder>
          {/* Eyelet */}
          <Torus args={[0.025, 0.008, 8, 16]} position={[-0.18, 0.24 - i * 0.02, z]} rotation={[0, Math.PI / 2, 0]}>
            <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.7} />
          </Torus>
          <Torus args={[0.025, 0.008, 8, 16]} position={[0.18, 0.24 - i * 0.02, z]} rotation={[0, Math.PI / 2, 0]}>
            <meshStandardMaterial color="#c0c0c0" roughness={0.3} metalness={0.7} />
          </Torus>
        </group>
      ))}

      {/* ── Side swoosh / stripe ── */}
      <RoundedBox args={[0.04, 0.12, 0.6]} radius={0.015} position={[0.3, 0.08, 0.1]} rotation={[0, 0.05, -0.15]}>
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.15} />
      </RoundedBox>
      <RoundedBox args={[0.04, 0.12, 0.6]} radius={0.015} position={[-0.3, 0.08, 0.1]} rotation={[0, -0.05, 0.15]}>
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.15} />
      </RoundedBox>

      {/* ── Star decoration on side ── */}
      <Star position={[0.31, 0.12, -0.15]} color="#FDE047" size={0.045} />

      {/* ── Inner sole visible ── */}
      <RoundedBox args={[0.5, 0.02, 1.0]} radius={0.02} position={[0, -0.14, 0]}>
        <meshStandardMaterial color="#f5f5f5" roughness={0.9} metalness={0} />
      </RoundedBox>
    </group>
  );
}
