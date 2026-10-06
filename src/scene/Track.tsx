import { Color, FrontSide } from 'three';

const surfaceColor = new Color().setHSL(240 / 360, 0.08, 0.03);
const cyan = new Color().setHSL(185 / 360, 1.0, 0.55);
const magenta = new Color().setHSL(310 / 360, 1.0, 0.6);
const gridLineColor = new Color().setHSL(185 / 360, 0.5, 0.15);

const trackWidth = 4;
const trackLength = 200;
const edgeX = trackWidth / 2;
const gridSpacing = 2;
const gridLineCount = Math.floor(trackLength / gridSpacing);

export function Track() {
  return (
    <group>
      {/* Dark track surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -trackLength / 2]}>
        <planeGeometry args={[trackWidth, trackLength]} />
        <meshStandardMaterial color={surfaceColor} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Cyan edge line (left) */}
      <mesh position={[-edgeX, 0.01, -trackLength / 2]}>
        <boxGeometry args={[0.03, 0.02, trackLength]} />
        <meshBasicMaterial color={cyan} />
      </mesh>

      {/* Cyan edge glow (left) */}
      <mesh position={[-edgeX, 0.005, -trackLength / 2]}>
        <boxGeometry args={[0.3, 0.01, trackLength]} />
        <meshBasicMaterial color={cyan} transparent opacity={0.08} depthWrite={false} />
      </mesh>

      {/* Magenta edge line (right) */}
      <mesh position={[edgeX, 0.01, -trackLength / 2]}>
        <boxGeometry args={[0.03, 0.02, trackLength]} />
        <meshBasicMaterial color={magenta} />
      </mesh>

      {/* Magenta edge glow (right) */}
      <mesh position={[edgeX, 0.005, -trackLength / 2]}>
        <boxGeometry args={[0.3, 0.01, trackLength]} />
        <meshBasicMaterial color={magenta} transparent opacity={0.08} depthWrite={false} />
      </mesh>

      {/* Grid lines across track */}
      {Array.from({ length: gridLineCount }, (_, i) => (
        <mesh key={i} position={[0, 0.005, -i * gridSpacing - gridSpacing]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[trackWidth, 0.02]} />
          <meshBasicMaterial
            color={gridLineColor}
            transparent
            opacity={0.15}
            depthWrite={false}
            side={FrontSide}
          />
        </mesh>
      ))}
    </group>
  );
}
