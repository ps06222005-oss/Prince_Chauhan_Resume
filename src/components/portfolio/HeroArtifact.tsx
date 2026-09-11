import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

interface HeroArtifactProps {
  mousePos: { x: number; y: number };
  shouldReduceMotion?: boolean;
  className?: string;
}

/**
 * LiquidSculptureMesh — React Three Fiber liquid-metal abstract sculptural form
 *
 * Visual Characteristics:
 * - Dynamic organic liquid-metal surface distortion (MeshDistortMaterial)
 * - Interlocking brushed chrome ribbon ring rotating on multi-axes
 * - Realistic metallic lighting with soft specular reflections and ultraviolet rim light
 * - Cursor parallax reactivity with smooth damping
 * - Automatically scales and adapts geometry resolution on mobile breakpoints
 */
function LiquidSculptureMesh({
  mousePos,
  shouldReduceMotion = false,
}: {
  mousePos: { x: number; y: number };
  shouldReduceMotion?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const ringRef = useRef<THREE.Mesh | null>(null);
  const innerCoreRef = useRef<THREE.Mesh | null>(null);

  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  // Track smoothed mouse for smooth rotational inertia
  const targetRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    targetRot.current = {
      x: mousePos.y * 0.45,
      y: mousePos.x * 0.65,
    };
  }, [mousePos]);

  useFrame((state, delta) => {
    if (!shouldReduceMotion) {
      const t = state.clock.getElapsedTime();

      // Liquid core rotation + mouse lag
      if (meshRef.current) {
        meshRef.current.rotation.x = THREE.MathUtils.damp(
          meshRef.current.rotation.x,
          t * 0.2 + targetRot.current.x,
          3,
          delta,
        );
        meshRef.current.rotation.y = THREE.MathUtils.damp(
          meshRef.current.rotation.y,
          t * 0.35 + targetRot.current.y,
          3,
          delta,
        );
      }

      // Outer liquid ribbon counter-rotation
      if (ringRef.current) {
        ringRef.current.rotation.x = t * 0.35;
        ringRef.current.rotation.y = -t * 0.25;
        ringRef.current.rotation.z = Math.sin(t * 0.5) * 0.3;
      }

      // Inner core pulse
      if (innerCoreRef.current) {
        innerCoreRef.current.rotation.y = -t * 0.5;
        const pulse = 1 + Math.sin(t * 2) * 0.05;
        innerCoreRef.current.scale.set(pulse, pulse, pulse);
      }
    }
  });

  const baseScale = isMobile ? 1.35 : 1.85;

  return (
    <Float
      speed={shouldReduceMotion ? 0 : 2}
      rotationIntensity={shouldReduceMotion ? 0 : 0.6}
      floatIntensity={shouldReduceMotion ? 0 : 0.8}
      floatingRange={[-0.1, 0.1]}
    >
      <group scale={baseScale}>
        {/* =================================================================
            1. CENTRAL LIQUID-METAL SCULPTURE WITH ORGANIC DISTORTION
            ================================================================= */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <sphereGeometry args={[1, isMobile ? 64 : 128, isMobile ? 64 : 128]} />
          <MeshDistortMaterial
            color="#f1f5f9"
            metalness={0.96}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
            distort={shouldReduceMotion ? 0.05 : isMobile ? 0.32 : 0.44}
            speed={shouldReduceMotion ? 0.2 : 2.2}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* =================================================================
            2. INTERTWINED CHROME ORBITAL KNOT / FLUID RIBBON
            ================================================================= */}
        <mesh ref={ringRef} castShadow>
          <torusGeometry args={[1.52, 0.045, 24, isMobile ? 64 : 100]} />
          <meshStandardMaterial
            color="#e2e8f0"
            metalness={0.98}
            roughness={0.15}
            envMapIntensity={1.8}
          />
        </mesh>

        {/* Second Intersecting Ribbon */}
        <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
          <torusGeometry args={[1.42, 0.03, 20, isMobile ? 48 : 80]} />
          <meshStandardMaterial
            color="#a78bfa"
            metalness={0.9}
            roughness={0.2}
            emissive="#4c1d95"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* =================================================================
            3. INTERNAL ULTRAVIOLET LUMINESCENT CORE
            ================================================================= */}
        <mesh ref={innerCoreRef}>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshBasicMaterial color="#8b5cf6" wireframe opacity={0.35} transparent />
        </mesh>

        {/* Localized Core Glow Point Light */}
        <pointLight color="#8b5cf6" intensity={isMobile ? 2.5 : 4} distance={4} />
      </group>
    </Float>
  );
}

/**
 * Lighting & Environment Rig for Studio Realism
 */
function StudioLighting() {
  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={0.4} />

      {/* Main Studio Key Light (Pure White / Platinum) */}
      <directionalLight position={[6, 8, 5]} intensity={2.4} color="#ffffff" castShadow />

      {/* Rim Specular Light (Electric Ultraviolet) */}
      <spotLight position={[-6, -4, -4]} intensity={3.2} color="#8b5cf6" angle={0.6} penumbra={1} />

      {/* Soft Fill Light (Ice / Cool White) */}
      <directionalLight position={[-4, 4, 3]} intensity={1.2} color="#38bdf8" />

      {/* Realistic Environment Reflections */}
      <Environment preset="city" environmentIntensity={0.65} />
    </>
  );
}

/**
 * HeroArtifact — Canvas Wrapper with Responsive Sizing & WebGL Safety
 */
export function HeroArtifact({
  mousePos,
  shouldReduceMotion = false,
  className = "",
}: HeroArtifactProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    // Elegant fallback if client has no WebGL support
    return (
      <div
        className={`relative grid place-items-center w-full h-full min-h-[340px] rounded-3xl border border-white/[0.08] bg-[#0c0e16] p-8 overflow-hidden ${className}`}
      >
        <div className="h-48 w-48 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-500 to-sky-300 blur-2xl opacity-40 animate-pulse" />
        <div className="absolute font-mono text-xs text-white/60 tracking-wider">
          AUTONOMOUS SYSTEM SCULPTURE
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label="3D Liquid-Metal Sculpture"
      className={`relative w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] flex items-center justify-center select-none ${className}`}
    >
      {/* Background Soft Ultraviolet Specular Blur Behind Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="h-48 sm:h-72 w-48 sm:w-72 rounded-full bg-violet-600/15 blur-[90px] sm:blur-[120px]" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 2]} // Crisp rendering up to Retina 2x
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="relative z-10 w-full h-full"
      >
        <Suspense fallback={null}>
          <StudioLighting />
          <LiquidSculptureMesh mousePos={mousePos} shouldReduceMotion={shouldReduceMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
