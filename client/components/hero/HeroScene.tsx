import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import modelUrl from "@/assets/models/dolphin-duo.glb?url";

const DRAG_TO_ROTATE = false; // enable in a future iteration

function DolphinModel() {
  const { scene } = useGLTF(modelUrl);
  const group = useRef<THREE.Group>(null);
  const cloned = useMemo(() => scene.clone(), [scene]);

  useFrame((_, delta) => {
    if (!group.current || DRAG_TO_ROTATE) return;
    group.current.rotation.y += delta * 0.35;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.PI / 12,
      0.08
    );
  });

  // drag scaffolding (disabled by default)
  const [dragState] = useState(() => ({ dragging: false, lastX: 0 }));
  const onPointerDown = (e: any) => {
    if (!DRAG_TO_ROTATE) return;
    dragState.dragging = true;
    dragState.lastX = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerUp = (e: any) => {
    if (!DRAG_TO_ROTATE) return;
    dragState.dragging = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: any) => {
    if (!DRAG_TO_ROTATE || !dragState.dragging || !group.current) return;
    const dx = (e.clientX - dragState.lastX) * 0.005;
    group.current.rotation.y += dx;
    dragState.lastX = e.clientX;
  };

  return (
    <group
      ref={group}
      scale={1.6}              // back to previous size
      position={[0, -0.05, 0]} // centered nicely
      dispose={null}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    >
      <primitive object={cloned} />
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="relative mx-auto w-full max-w-[1200px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-14 bottom-2 z-[1] h-20 rounded-full bg-black/30 blur-[70px] opacity-45 mix-blend-multiply sm:inset-x-16 lg:inset-x-20"
      />
      <div className="relative aspect-[16/9]">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 34 }}
          gl={{ alpha: true }}
          className="absolute inset-0 !bg-transparent"
          aria-hidden="true"
          role="img"
        >
          {/* three-point lighting for highlights + depth */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[6, 8, 6]} intensity={2.2} color={"#ffe9cf"} castShadow />
          <directionalLight position={[-6, 5, 3]} intensity={0.9} color={"#dfe9ff"} />
          <directionalLight position={[0, 3, -6]} intensity={1.3} color={"#ffffff"} />

          <Suspense fallback={<mesh><planeGeometry args={[0, 0]} /></mesh>}>
            <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.55} floatingRange={[0, 0.28]}>
              <DolphinModel />
            </Float>
            <Environment preset="studio" />
          </Suspense>

          <ContactShadows position={[0, -2.2, 0]} opacity={0.3} scale={14} blur={4.6} far={5.2} />

          <ErrorBoundary fallback={null}><></></ErrorBoundary>
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload(modelUrl);
