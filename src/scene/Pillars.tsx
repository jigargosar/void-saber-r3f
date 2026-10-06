import { useMemo } from 'react';
import { Color } from 'three';

const cyan = new Color().setHSL(185 / 360, 1.0, 0.55);
const magenta = new Color().setHSL(310 / 360, 1.0, 0.6);

const pillarSpacing = 6;
const pillarCount = 14;
const trackOffset = 3.5;
const pillarHeight = 8;
const pillarSize = 0.12;
const glowSize = 0.5;

type PillarData = {
  position: [number, number, number];
  color: Color;
  addLight: boolean;
};

export function Pillars() {
  const pillars = useMemo<PillarData[]>(() => {
    const result: PillarData[] = [];
    for (let i = 0; i < pillarCount; i++) {
      const z = -i * pillarSpacing - 4;
      result.push({
        position: [-trackOffset, pillarHeight / 2, z],
        color: cyan,
        addLight: i < 3 && i % 2 === 0,
      });
      result.push({
        position: [trackOffset, pillarHeight / 2, z],
        color: magenta,
        addLight: i < 3 && i % 2 === 0,
      });
    }
    return result;
  }, []);

  return (
    <group>
      {pillars.map((pillar, i) => (
        <group key={i} position={pillar.position}>
          {/* Solid neon bar */}
          <mesh>
            <boxGeometry args={[pillarSize, pillarHeight, pillarSize]} />
            <meshBasicMaterial color={pillar.color} />
          </mesh>

          {/* Soft glow halo */}
          <mesh>
            <boxGeometry args={[glowSize, pillarHeight, glowSize]} />
            <meshBasicMaterial
              color={pillar.color}
              transparent
              opacity={0.06}
              depthWrite={false}
            />
          </mesh>

          {/* Point light at base of nearby pillars */}
          {pillar.addLight && (
            <pointLight
              color={pillar.color}
              intensity={0.5}
              distance={4}
              decay={2}
              position={[0, -pillarHeight / 2, 0]}
            />
          )}
        </group>
      ))}
    </group>
  );
}
