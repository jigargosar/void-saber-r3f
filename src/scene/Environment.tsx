import { Color, FogExp2 } from 'three';

const cyan = new Color().setHSL(185 / 360, 1.0, 0.55);
const magenta = new Color().setHSL(310 / 360, 1.0, 0.6);
const backgroundColor = new Color().setHSL(240 / 360, 0.2, 0.05);
const fog = new FogExp2(backgroundColor, 0.04);
const gridMainColor = new Color().setHSL(185 / 360, 1.0, 0.15);
const gridDimColor = new Color().setHSL(185 / 360, 1.0, 0.07);

export function Environment() {
  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      <primitive object={fog} attach="fog" />

      <ambientLight intensity={0.15} />

      <pointLight color={cyan} intensity={4} distance={30} position={[-3, 3, -8]} />
      <pointLight color={magenta} intensity={4} distance={30} position={[3, 3, -8]} />

      <gridHelper args={[40, 40, gridMainColor, gridDimColor]} />
    </>
  );
}
