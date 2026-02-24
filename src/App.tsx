import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import { Environment } from './scene/Environment';

const xrStore = createXRStore();

export function App() {
  return (
    <div className="h-screen w-screen">
      <button
        className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
        onClick={() => xrStore.enterVR()}
      >
        Enter VR
      </button>
      <Canvas
        gl={{ antialias: true, alpha: false, toneMapping: 3, toneMappingExposure: 1.0 }}
        camera={{ fov: 70, near: 0.1, far: 200, position: [0, 1.6, 0] }}
      >
        <XR store={xrStore}>
          <Environment />
        </XR>
      </Canvas>
    </div>
  );
}
