# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Void Saber — a Beat Saber clone for WebXR (Quest browser + desktop Chrome). Declarative approach using React Three Fiber. Same game design as void-saber, rebuilt with R3F for immutable/declarative scene management.

## Ignored Files: do not use as a source of standards or patterns

- docs\build-Instructions\VOID-SABER-BUILD-INSTRUCTIONS.md
- docs\build-Instructions\VOID-SABER-CODE-ARCHITECTURE.md

## Commands

```bash
pnpm dev        # HTTPS dev server (SSL required for WebXR)
pnpm build      # vite build
pnpm preview    # serve production build
pnpm typecheck  # tsc --noEmit
```

No test framework or linter configured.

## Stack

- **React** — UI and component architecture
- **React Three Fiber (R3F)** — declarative Three.js renderer
- **@react-three/xr** — WebXR session, controllers, hand tracking
- **@react-three/drei** — utility components (controls, loaders, helpers)
- **Three.js** — underlying 3D engine (accessed via R3F, raw when needed)
- **Raw Web Audio API** — `AudioContext`, `OscillatorNode`, `GainNode` (no Tone.js)
- **Vite** — build tool, HTTPS via `@vitejs/plugin-basic-ssl`
- **TypeScript** — strict mode, `noUnusedLocals`, `noUnusedParameters`
- **Tailwind v4** — UI styling (VR button, overlays)
- **pnpm** — package manager

## Build Phases

15 phases in `docs/build-Instructions/PHASE-*.md`. Follow the same feature goals but implement with R3F patterns instead of raw Three.js.

### R3F Translation Guide

```
Raw Three.js                →  R3F
scene.add(mesh)             →  <mesh> in JSX
new THREE.Mesh(geo, mat)    →  <mesh><boxGeometry /><meshStandardMaterial /></mesh>
renderer.xr                 →  @react-three/xr (createXRStore, <XR>)
setAnimationLoop / rAF      →  useFrame((state, delta) => {})
factory fn returning root   →  React component
manual dispose()            →  automatic on unmount
state machine class         →  React state / zustand
scene.background / fog      →  <color attach="background"> / <primitive attach="fog">
pass scene as argument      →  React context or props
event listeners             →  R3F event props (onClick, onPointerOver)
```

### Low-Level Escape Hatches

- `useThree()` — access raw `gl` (renderer), `scene`, `camera`, `clock`
- `useFrame()` — per-frame render loop with `state` and `delta`
- `<primitive object={threeObj} />` — mount any raw Three.js object
- `extend({ Custom })` — register custom Three.js class as JSX element
- `gl.xr` — direct WebXR manager access

## Key Rules

- **HSL colors only** — never hex. `hsl()` in CSS, `new THREE.Color().setHSL()` in JS
- **Theme**: cyan left (`hsl(185, 100%, 55%)`), magenta right (`hsl(310, 100%, 60%)`), dark void environment
- **Audio is source of truth** — beat clock reads `AudioContext.currentTime`, never `Date.now()`
- **XR-first, desktop-second** — same code path for both
- **Declarative first** — use JSX scene graph; drop to imperative only when R3F can't express it
- **Explicit dispose** — R3F handles most cleanup on unmount; manual dispose only for resources created outside React

## Anti-Patterns

- Imperative `scene.add()` / `scene.remove()` — use JSX mounting/unmounting
- `useEffect` for Three.js object creation — use JSX or `useMemo`
- Global mutable state — use React state, zustand, or context
- `setTimeout` for game timing — `AudioContext.currentTime` via beat clock
- `any` types — explicit interfaces at every boundary

## Design Reference

`design-playground.html` from void-saber — standalone HTML file with theme colors, typography, button states, panel styling.
