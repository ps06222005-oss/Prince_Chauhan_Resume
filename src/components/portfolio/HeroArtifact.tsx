import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
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
 * - Cursor parallax reactivity with smooth damping across the entire sculpture assembly
 * - Automatically scales and adapts geometry resolution on mobile breakpoints
 */
function LiquidSculptureMesh({
  mousePos,
  shouldReduceMotion = false,
}: {
  mousePos: { x: number; y: number };
  shouldReduceMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group | null>(null);
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
    // Parallax tilt on the whole sculpture
    if (groupRef.current && !shouldReduceMotion) {
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRot.current.x,
        4,
        delta,
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRot.current.y,
        4,
        delta,
      );
    }

    if (!shouldReduceMotion) {
      const t = state.clock.getElapsedTime();

      // Liquid core continuous rotation
      if (meshRef.current) {
        meshRef.current.rotation.x = t * 0.2;
        meshRef.current.rotation.y = t * 0.35;
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

  const baseScale = isMobile ? 1.15 : 1.75;

  return (
    <Float
      speed={shouldReduceMotion ? 0 : 2}
      rotationIntensity={shouldReduceMotion ? 0 : 0.6}
      floatIntensity={shouldReduceMotion ? 0 : 0.8}
      floatingRange={[-0.08, 0.08]}
    >
      <group ref={groupRef} scale={baseScale}>
        {/* =================================================================
            1. CENTRAL LIQUID-METAL SCULPTURE WITH ORGANIC DISTORTION
            ================================================================= */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <sphereGeometry args={[1, isMobile ? 48 : 96, isMobile ? 48 : 96]} />
          <MeshDistortMaterial
            color="#f8fafc"
            metalness={0.96}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
            distort={shouldReduceMotion ? 0.04 : isMobile ? 0.28 : 0.42}
            speed={shouldReduceMotion ? 0.1 : 2.0}
          />
        </mesh>

        {/* =================================================================
            2. INTERTWINED CHROME ORBITAL KNOT / FLUID RIBBON
            ================================================================= */}
        <mesh ref={ringRef} castShadow>
          <torusGeometry args={[1.52, 0.042, 16, isMobile ? 48 : 80]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.15} />
        </mesh>

        {/* Second Intersecting Ribbon */}
        <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
          <torusGeometry args={[1.42, 0.028, 16, isMobile ? 40 : 64]} />
          <meshStandardMaterial
            color="#c4b5fd"
            metalness={0.92}
            roughness={0.2}
            emissive="#4c1d95"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* =================================================================
            3. INTERNAL ULTRAVIOLET LUMINESCENT CORE
            ================================================================= */}
        <mesh ref={innerCoreRef}>
          <sphereGeometry args={[0.38, 24, 24]} />
          <meshBasicMaterial color="#8b5cf6" wireframe opacity={0.35} transparent />
        </mesh>

        {/* Localized Core Glow Point Light */}
        <pointLight color="#8b5cf6" intensity={isMobile ? 2.5 : 4} distance={4} />
      </group>
    </Float>
  );
}

/**
 * High-definition Studio Lighting Rig
 * Pure procedural lights for zero network latency and 100% offline reliability.
 */
function StudioLighting() {
  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={0.5} />

      {/* Main Studio Key Light (Pure White / Platinum) */}
      <directionalLight position={[6, 8, 5]} intensity={2.8} color="#ffffff" castShadow />

      {/* Rim Specular Light (Electric Ultraviolet) */}
      <spotLight position={[-6, -4, -4]} intensity={3.5} color="#8b5cf6" angle={0.6} penumbra={1} />

      {/* Soft Fill Light (Ice / Cool White) */}
      <directionalLight position={[-5, 4, 3]} intensity={1.5} color="#38bdf8" />

      {/* Top Specular Accent */}
      <directionalLight position={[0, 6, -2]} intensity={1.2} color="#ffffff" />

      {/* Under-glow Violet Accent */}
      <directionalLight position={[0, -5, 2]} intensity={0.8} color="#4c1d95" />
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
        className={`relative grid place-items-center w-full h-full min-h-[260px] rounded-3xl border border-white/[0.08] bg-[#0c0e16] p-8 overflow-hidden ${className}`}
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
      className={`relative w-full h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[480px] flex items-center justify-center select-none ${className}`}
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
