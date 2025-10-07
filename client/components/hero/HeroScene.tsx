// src/components/HeroScene.tsx
import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// For project pages (username.github.io/portfolio/), BASE_URL resolves to "/portfolio/"
// Ensure vite.config.ts has: export default defineConfig({ base: '/portfolio/' })
const DOLPHIN_URL = `${import.meta.env.BASE_URL}models/dolphin-duo.glb`;

function DolphinModel() {
  const { scene } = useGLTF(DOLPHIN_URL);
  const group = useRef<THREE.Group>(null);

  // Clone to avoid mutating the cached glTF scene across mounts
  const cloned = useMemo(() => scene.clone(), [scene]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.4;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.PI / 12,
      0.08
    );
  });

  return (
    <group ref={group} scale={1.18} position={[0, -0.2, 0]} dispose={null}>
      <primitive object={cloned} />
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="relative w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[660px]">
      {/* soft ground shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 bottom-3 h-16 rounded-full bg-black/20 blur-[48px] opacity-30 mix-blend-multiply sm:inset-x-12 lg:inset-x-14 lg:h-20"
      />
      {/* aspect box ensures the Canvas has layout; parent is relative so three can compute scroll offset */}
      <div className="relative aspect-[4/3]">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5.1], fov: 38 }}
          gl={{ alpha: true }}
          className="absolute inset-0 !bg-transparent"
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 9, 8]} intensity={1.6} castShadow />

          <Suspense fallback={null}>
            <Float
              speed={1.05}
              rotationIntensity={0.32}
              floatIntensity={0.5}
              floatingRange={[0, 0.25]}
            >
              <DolphinModel />
            </Float>
            <Environment preset="studio" />
          </Suspense>

          <ContactShadows
            position={[0, -2.3, 0]}
            opacity={0.18}
            scale={10}
            blur={3.2}
            far={4.6}
          />
          <ErrorBoundary fallback={null /* or a small skeleton */}>
            <Canvas>{/* lights, model, etc. */}</Canvas>
          </ErrorBoundary>
        </Canvas>
      </div>
    </div>
  );
}

// Preload the model once
useGLTF.preload(DOLPHIN_URL);
