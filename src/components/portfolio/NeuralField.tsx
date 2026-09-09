import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface NeuralFieldProps {
  className?: string;
}

/**
 * Check if WebGL context can be acquired safely.
 */
function isWebGLAvailable(): boolean {
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

/**
 * Architectural CSS/SVG fallback when WebGL is unavailable or prefers-reduced-motion is true.
 */
function NeuralFieldFallback() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(1 0 0 / 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(1 0 0 / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 20%, transparent 75%)",
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.16 55 / 0.25) 0%, oklch(0.76 0.11 215 / 0.12) 50%, transparent 70%)",
        }}
      />
    </div>
  );
}

/**
 * Phase 5: Continuous 3D Neural Tensor & Spatial Architecture Manifold
 *
 * An interactive, multidimensional vector field that transitions smoothly from an
 * organic neural tensor wave in the Hero scene into an ordered, high-speed computational
 * system lattice as the user scrolls through the experience:
 * [PERSON] -> [INTELLIGENCE] -> [ENGINEERING].
 *
 * Core Performance & Architecture Safeguards:
 * - Window scroll interpolation to drive camera pitch and geometry topology.
 * - Progressive enhancement with WebGL support check and prefers-reduced-motion.
 * - Device-aware rendering: DPR capped at 1.6 on desktop, 1.2 on mobile.
 * - IntersectionObserver to halt rendering loop when scrolled off viewport.
 * - Complete disposal of Three.js geometries, materials, and renderer contexts on unmount.
 */
export function NeuralField({ className = "" }: NeuralFieldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Accessibility & Capability checks
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const webglSupported = isWebGLAvailable();

    if (!webglSupported || prefersReducedMotion) {
      setHasWebGL(false);
      return;
    }
    setHasWebGL(true);

    const container = containerRef.current;
    if (!container) return;

    // 2. Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090a0d, 0.024);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 4.2, 11.5);
    camera.lookAt(0, -0.6, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    const isMobile = window.innerWidth < 768;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.6);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 3. Procedural Tensor Manifold Grid Geometry
    const gridX = isMobile ? 32 : 50;
    const gridZ = isMobile ? 26 : 40;
    const spacingX = 0.54;
    const spacingZ = 0.54;
    const totalPoints = gridX * gridZ;

    const positions = new Float32Array(totalPoints * 3);
    const originalPositions = new Float32Array(totalPoints * 3);
    const colors = new Float32Array(totalPoints * 3);

    // Controlled color tokens: Solar Amber (#f59e0b) & Quantum Cyan (#38bdf8) with Obsidian depth
    const colorAmber = new THREE.Color("#f59e0b");
    const colorCyan = new THREE.Color("#38bdf8");
    const colorObsidian = new THREE.Color("#131720");

    let idx = 0;
    const startX = -((gridX - 1) * spacingX) / 2;
    const startZ = -((gridZ - 1) * spacingZ) / 2;

    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridZ; j++) {
        const x = startX + i * spacingX;
        const z = startZ + j * spacingZ;
        const y = 0;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        originalPositions[idx * 3] = x;
        originalPositions[idx * 3 + 1] = y;
        originalPositions[idx * 3 + 2] = z;

        // Radial factor for color distribution
        const distFromCenter = Math.sqrt(x * x + z * z);
        const lerpFactor = Math.min(distFromCenter / 12, 1);
        const pointColor = new THREE.Color();

        if (distFromCenter < 5.5) {
          pointColor.lerpColors(colorAmber, colorCyan, (x + 6) / 12);
        } else {
          pointColor.lerpColors(colorCyan, colorObsidian, lerpFactor);
        }

        colors[idx * 3] = pointColor.r;
        colors[idx * 3 + 1] = pointColor.g;
        colors[idx * 3 + 2] = pointColor.b;

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material with luminous texture
    const pointTextureCanvas = document.createElement("canvas");
    pointTextureCanvas.width = 64;
    pointTextureCanvas.height = 64;
    const pctx = pointTextureCanvas.getContext("2d");
    if (pctx) {
      const grad = pctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      grad.addColorStop(0.2, "rgba(245, 158, 11, 0.7)");
      grad.addColorStop(0.5, "rgba(56, 189, 248, 0.15)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      pctx.fillStyle = grad;
      pctx.fillRect(0, 0, 64, 64);
    }
    const pointTexture = new THREE.CanvasTexture(pointTextureCanvas);

    const pointsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.13 : 0.18,
      map: pointTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointsField = new THREE.Points(geometry, pointsMaterial);
    scene.add(pointsField);

    // 4. Synaptic Filaments (Line Network)
    const lineIndices: number[] = [];
    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridZ; j++) {
        const currentIdx = i * gridZ + j;
        if (i < gridX - 1) {
          lineIndices.push(currentIdx, (i + 1) * gridZ + j);
        }
        if (j < gridZ - 1) {
          lineIndices.push(currentIdx, i * gridZ + (j + 1));
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    linesGeometry.setIndex(lineIndices);

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xd97706,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // 5. Cursor Interaction & Vector Deflection
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const raycaster = new THREE.Raycaster();
    const planeIntersect = new THREE.Vector3();

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = nx;
      mouse.targetY = ny;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    // 6. Scroll Progress Tracking (Continuous Spatial Storytelling)
    let currentScroll = 0;
    let targetScroll = 0;

    const onScroll = () => {
      const maxScroll = Math.max(1, window.innerHeight * 1.5);
      targetScroll = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // 7. Responsive Resize Observer
    const resize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // 8. IntersectionObserver to freeze frame loop when scrolled off
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    // 9. Animation Render Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth cursor interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Smooth scroll progress interpolation
      currentScroll += (targetScroll - currentScroll) * 0.05;

      // Scroll-driven camera dynamics:
      // In Hero: high perspective camera
      // As scroll advances: camera swoops forward and downward into the network lattice
      camera.position.x = mouse.x * 0.8;
      camera.position.y = 4.2 - currentScroll * 1.8 + mouse.y * 0.4;
      camera.position.z = 11.5 - currentScroll * 3.2;
      camera.lookAt(mouse.x * 0.25, -0.6 - currentScroll * 0.5, 0);

      // Raycast to find cursor point on ground plane
      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
      raycaster.ray.intersectPlane(plane, planeIntersect);

      // Deform positions:
      // Organic tensor wave -> gradually flattens into structured computational matrix
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Matrix order factor: 0 = fluid wave, 1 = structured computational lattice
      const latticeFactor = currentScroll;
      const waveAmplitude = 1 - latticeFactor * 0.65;

      for (let p = 0; p < totalPoints; p++) {
        const ox = originalPositions[p * 3];
        const oz = originalPositions[p * 3 + 2];

        // Wave dynamics
        const wave1 =
          Math.sin(ox * 0.45 + elapsedTime * 0.85) *
          Math.cos(oz * 0.45 + elapsedTime * 0.75) *
          0.75 *
          waveAmplitude;
        const wave2 =
          Math.sin(Math.sqrt(ox * ox + oz * oz) * 0.5 - elapsedTime * 0.95) * 0.45 * waveAmplitude;

        // Structured pulse when scrolling into system mode
        const pulse =
          latticeFactor > 0.1 ? Math.sin(ox * 1.2 + elapsedTime * 2.5) * 0.15 * latticeFactor : 0;

        let y = wave1 + wave2 + pulse;

        // Cursor magnetic deflection
        const dx = ox - planeIntersect.x;
        const dz = oz - planeIntersect.z;
        const distSq = dx * dx + dz * dz;

        if (distSq < 14) {
          const force = (1 - distSq / 14) * 0.85;
          y += Math.sin(elapsedTime * 3.5) * force * 0.35 + force * 0.55;
        }

        posArray[p * 3 + 1] = y;
      }

      posAttr.needsUpdate = true;
      linesGeometry.attributes.position.needsUpdate = true;

      // Subtle ambient rotation
      pointsField.rotation.y = elapsedTime * 0.018;
      linesMesh.rotation.y = elapsedTime * 0.018;

      // Line opacity increases when entering system lattice
      linesMaterial.opacity = 0.08 + currentScroll * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      geometry.dispose();
      linesGeometry.dispose();
      pointsMaterial.dispose();
      linesMaterial.dispose();
      pointTexture.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (hasWebGL === false) {
    return <NeuralFieldFallback />;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    />
  );
}
