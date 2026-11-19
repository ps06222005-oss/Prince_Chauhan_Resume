import { useEffect, useRef, useState, memo } from "react";
import * as THREE from "three";

interface HeroCinematicCanvasProps {
  mousePos: { x: number; y: number };
  scrollYProgress?: number;
  shouldReduceMotion?: boolean;
  className?: string;
}

function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

function createParticleTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(0.2, "rgba(219, 234, 254, 0.88)");
    gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.32)");
    gradient.addColorStop(0.8, "rgba(56, 189, 248, 0.06)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center, center, center, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function HeroCanvasFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background"
    >
      {/* Ambient Electric Blue glow */}
      <div
        className="absolute top-1/4 -right-16 h-[28rem] sm:h-[36rem] w-[28rem] sm:w-[36rem] rounded-full opacity-25 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, #3B82F6 0%, rgba(37,99,235,0.12) 60%, transparent 80%)",
        }}
      />
      {/* Ambient Sky Cyan glow */}
      <div
        className="absolute bottom-1/4 -left-16 h-[28rem] sm:h-[36rem] w-[28rem] sm:w-[36rem] rounded-full opacity-25 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, #38BDF8 0%, rgba(56,189,248,0.12) 60%, transparent 80%)",
        }}
      />
      {/* Precision Stitch architectural hairline grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #60a5fa 1px, transparent 1px),
            linear-gradient(to bottom, #60a5fa 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent" />
    </div>
  );
}

/**
 * HeroCinematicCanvas — Stitch Blue Generative 3D Neural Field
 *
 * - Electric Blue (#3B82F6), Royal Cobalt (#2563EB), and Sky Cyan (#38BDF8) harmonic spectrum
 * - Deep Midnight Navy (#070B14) atmospheric depth
 * - Interactive pointer deflection and gentle parallax inertia
 */
export const HeroCinematicCanvas = memo(function HeroCinematicCanvas({
  mousePos,
  scrollYProgress = 0,
  shouldReduceMotion = false,
  className = "",
}: HeroCinematicCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [webGLReady, setWebGLReady] = useState<boolean | null>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    scrollRef.current = scrollYProgress;
  }, [scrollYProgress]);

  useEffect(() => {
    if (shouldReduceMotion || !isWebGLAvailable()) {
      setWebGLReady(false);
      return;
    }
    setWebGLReady(true);

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b14, isMobile ? 0.026 : 0.022);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 120);
    camera.position.set(0, 3.2, 12.5);
    camera.lookAt(0, -0.4, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const gridX = isMobile ? 38 : 62;
    const gridZ = isMobile ? 32 : 52;
    const spacingX = 0.58;
    const spacingZ = 0.58;
    const totalPoints = gridX * gridZ;

    const positions = new Float32Array(totalPoints * 3);
    const basePositions = new Float32Array(totalPoints * 3);
    const colors = new Float32Array(totalPoints * 3);

    // Stitch Blue Color Palette Tokens
    const colorBlue = new THREE.Color("#3B82F6"); // Electric Blue
    const colorSky = new THREE.Color("#38BDF8"); // Sky Cyan
    const colorWhite = new THREE.Color("#EFF6FF"); // Ice White
    const colorNavy = new THREE.Color("#0F172A"); // Deep Navy Slate

    const startX = -((gridX - 1) * spacingX) / 2;
    const startZ = -((gridZ - 1) * spacingZ) / 2;

    let idx = 0;
    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridZ; j++) {
        const x = startX + i * spacingX;
        const z = startZ + j * spacingZ;
        const y = 0;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        basePositions[idx * 3] = x;
        basePositions[idx * 3 + 1] = y;
        basePositions[idx * 3 + 2] = z;

        const distFromCenter = Math.sqrt(x * x + z * z);
        const normX = (x / (gridX * spacingX * 0.5) + 1) * 0.5;
        const ptColor = new THREE.Color();

        if (distFromCenter < 5.0) {
          ptColor.lerpColors(colorSky, colorBlue, normX);
          ptColor.lerp(colorWhite, 0.28);
        } else if (distFromCenter < 12.0) {
          const t = (distFromCenter - 5.0) / 7.0;
          ptColor.lerpColors(normX > 0.5 ? colorBlue : colorSky, colorNavy, t * 0.6);
        } else {
          ptColor.copy(colorNavy);
        }

        colors[idx * 3] = ptColor.r;
        colors[idx * 3 + 1] = ptColor.g;
        colors[idx * 3 + 2] = ptColor.b;

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleTexture = createParticleTexture();

    const pointsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.22 : 0.26,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });

    const pointsMesh = new THREE.Points(geometry, pointsMaterial);
    scene.add(pointsMesh);

    const maxLines = isMobile ? 120 : 240;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    const cosmicCount = isMobile ? 60 : 140;
    const cosmicPositions = new Float32Array(cosmicCount * 3);
    const cosmicColors = new Float32Array(cosmicCount * 3);

    for (let c = 0; c < cosmicCount; c++) {
      cosmicPositions[c * 3] = (Math.random() - 0.5) * 32;
      cosmicPositions[c * 3 + 1] = (Math.random() - 0.5) * 12 + 1.5;
      cosmicPositions[c * 3 + 2] = (Math.random() - 0.5) * 20;

      const isElectric = Math.random() > 0.5;
      const cColor = isElectric
        ? colorBlue.clone().lerp(colorWhite, 0.4)
        : colorSky.clone().lerp(colorWhite, 0.3);
      cosmicColors[c * 3] = cColor.r;
      cosmicColors[c * 3 + 1] = cColor.g;
      cosmicColors[c * 3 + 2] = cColor.b;
    }

    const cosmicGeometry = new THREE.BufferGeometry();
    cosmicGeometry.setAttribute("position", new THREE.BufferAttribute(cosmicPositions, 3));
    cosmicGeometry.setAttribute("color", new THREE.BufferAttribute(cosmicColors, 3));

    const cosmicMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.32 : 0.42,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.6,
    });

    const cosmicMesh = new THREE.Points(cosmicGeometry, cosmicMaterial);
    scene.add(cosmicMesh);

    let animationFrameId = 0;
    const clock = new THREE.Clock();
    let isVisible = true;

    let targetCamX = 0;
    let targetCamY = 3.2;
    let targetCamZ = 12.5;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = clock.getElapsedTime();
      const currentMouse = mouseRef.current;
      const currentScroll = scrollRef.current;

      targetCamX = currentMouse.x * 1.8;
      targetCamY = 3.2 - currentMouse.y * 1.4;
      targetCamZ = 12.5 + currentScroll * 4.0;

      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.position.z += (targetCamZ - camera.position.z) * 0.04;
      camera.lookAt(0, -0.4 - currentScroll * 1.2, 0);

      const pointerWorldX = currentMouse.x * 9.0;
      const pointerWorldZ = -currentMouse.y * 5.0;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      let pIdx = 0;
      for (let i = 0; i < gridX; i++) {
        for (let j = 0; j < gridZ; j++) {
          const bx = basePositions[pIdx * 3];
          const bz = basePositions[pIdx * 3 + 2];

          const wave1 = Math.sin(bx * 0.22 + time * 0.7) * Math.cos(bz * 0.26 + time * 0.55) * 1.4;
          const wave2 = Math.sin((bx + bz) * 0.16 + time * 0.85) * 0.65;
          const wave3 = Math.cos(bx * 0.38 - time * 0.45) * 0.35;
          const targetY = wave1 + wave2 + wave3;

          const dx = bx - pointerWorldX;
          const dz = bz - pointerWorldZ;
          const distSq = dx * dx + dz * dz;
          const radiusSq = 20.0;

          let deflectionY = 0;
          if (distSq < radiusSq) {
            const factor = 1.0 - Math.sqrt(distSq) / Math.sqrt(radiusSq);
            deflectionY = Math.sin(factor * Math.PI) * 1.2;
          }

          const currentY = posArray[pIdx * 3 + 1];
          const finalTargetY = targetY + deflectionY;
          posArray[pIdx * 3 + 1] = currentY + (finalTargetY - currentY) * 0.08;

          pIdx++;
        }
      }
      posAttr.needsUpdate = true;

      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const lineColAttr = lineGeometry.attributes.color as THREE.BufferAttribute;
      const lPos = linePosAttr.array as Float32Array;
      const lCol = lineColAttr.array as Float32Array;

      let lineCount = 0;
      const step = isMobile ? 6 : 4;

      for (let i = 0; i < gridX - step && lineCount < maxLines; i += step) {
        for (let j = 0; j < gridZ - step && lineCount < maxLines; j += step) {
          const p1 = (i * gridZ + j) * 3;
          const p2 = ((i + step) * gridZ + j) * 3;

          const p1x = posArray[p1];
          const p1y = posArray[p1 + 1];
          const p1z = posArray[p1 + 2];

          const p2x = posArray[p2];
          const p2y = posArray[p2 + 1];
          const p2z = posArray[p2 + 2];

          const dist = Math.hypot(p2x - p1x, p2y - p1y, p2z - p1z);
          if (dist < 3.8) {
            const baseIdx = lineCount * 6;
            lPos[baseIdx] = p1x;
            lPos[baseIdx + 1] = p1y;
            lPos[baseIdx + 2] = p1z;
            lPos[baseIdx + 3] = p2x;
            lPos[baseIdx + 4] = p2y;
            lPos[baseIdx + 5] = p2z;

            const lineCol = lineCount % 2 === 0 ? colorSky : colorBlue;
            lCol[baseIdx] = lineCol.r * 0.6;
            lCol[baseIdx + 1] = lineCol.g * 0.6;
            lCol[baseIdx + 2] = lineCol.b * 0.6;
            lCol[baseIdx + 3] = lineCol.r * 0.3;
            lCol[baseIdx + 4] = lineCol.g * 0.3;
            lCol[baseIdx + 5] = lineCol.b * 0.3;

            lineCount++;
          }
        }
      }
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      const cPosAttr = cosmicGeometry.attributes.position as THREE.BufferAttribute;
      const cArray = cPosAttr.array as Float32Array;
      for (let c = 0; c < cosmicCount; c++) {
        cArray[c * 3 + 1] += Math.sin(time * 0.4 + c) * 0.003;
      }
      cPosAttr.needsUpdate = true;

      pointsMesh.rotation.y = time * 0.015;
      linesMesh.rotation.y = time * 0.015;
      cosmicMesh.rotation.y = -time * 0.01;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.5));
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.02 },
    );
    observer.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      geometry.dispose();
      pointsMaterial.dispose();
      particleTexture.dispose();

      lineGeometry.dispose();
      lineMaterial.dispose();

      cosmicGeometry.dispose();
      cosmicMaterial.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [shouldReduceMotion]);

  if (webGLReady === false) {
    return <HeroCanvasFallback />;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {/* Ambient Radial Lighting Conduits: Electric Blue & Sky Cyan */}
      <div
        className="pointer-events-none absolute top-1/4 right-[10%] h-[32rem] sm:h-[42rem] w-[32rem] sm:w-[42rem] rounded-full opacity-22 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, #3B82F6 0%, rgba(37,99,235,0.16) 50%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-[8%] h-[32rem] sm:h-[42rem] w-[32rem] sm:w-[42rem] rounded-full opacity-20 blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, #38BDF8 0%, rgba(56,189,248,0.15) 50%, transparent 75%)",
        }}
      />
      {/* Precision Micro-Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #60a5fa 1px, transparent 1px),
            linear-gradient(to bottom, #60a5fa 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/90 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
});
