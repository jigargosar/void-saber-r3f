import { Canvas, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { Environment } from './scene/Environment';

function XRSetup() {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    gl.xr.enabled = true;
    const button = VRButton.createButton(gl);
    document.getElementById('vr-button-container')!.appendChild(button);
    return () => {
      button.remove();
    };
  }, [gl]);

  return null;
}

export function App() {
  return (
    <div className="h-screen w-screen">
      <div id="vr-button-container" className="fixed bottom-0 left-0 w-full z-50" />
      <Canvas
        flat
        gl={{ antialias: true, alpha: false }}
        camera={{ fov: 70, near: 0.1, far: 200, position: [0, 1.6, 0] }}
      >
        <XRSetup />
        <Environment />
      </Canvas>
    </div>
  );
}
