import { Color, FogExp2 } from 'three';
import { Track } from './Track';
import { Pillars } from './Pillars';

const backgroundColor = new Color().setHSL(240 / 360, 0.08, 0.02);
const fog = new FogExp2(backgroundColor, 0.04);
const skyColor = new Color().setHSL(240 / 360, 0.1, 0.08);
const groundColor = new Color().setHSL(240 / 360, 0.05, 0.02);

export function Environment() {
  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      <primitive object={fog} attach="fog" />

      <hemisphereLight args={[skyColor, groundColor, 0.15]} />

      <Track />
      <Pillars />
    </>
  );
}
