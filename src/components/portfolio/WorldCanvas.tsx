import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type WorldSection =
  "home" | "about" | "projects" | "skills" | "github" | "certifications" | "contact";

interface WorldCanvasProps {
  className?: string;
  activeSection?: string;
}

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
 * Phase 6.5 — Living Multi-Mode Spatial World Canvas
 *
 * An ambient, non-intrusive WebGL environmental system that continuously
 * transforms its mathematical topology as the visitor journeys through the experience:
 *
 * - HERO: Organic / fluid neural manifold with pointer deflection
 * - ABOUT: Calm / architectural planar grid with subtle orthogonal depth
 * - PROJECTS: Structured / computational pipeline matrix with active data conduits
 * - SKILLS / EVIDENCE: Linear / directional stream with interconnected particles
 * - CONTACT: Minimal / quiet cosmic luminescence
 *
 * Restrained color ratio: 90% deep graphite/obsidian (#07080a), subtle chalk whites (#f4f4f2),
 * with selective amber (#f59e0b) and cyan (#38bdf8) luminescence when energized.
 */
export function WorldCanvas({ className = "" }: WorldCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isWebGLAvailable() || prefersReducedMotion) {
      setHasWebGL(false);
      return;
    }
    setHasWebGL(true);

    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090c, 0.022);

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      120,
    );
    camera.position.set(0, 4.2, 13);
    camera.lookAt(0, -0.6, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    const isMobile = window.innerWidth < 768;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // 2. Geometry & Particles
    const gridX = isMobile ? 36 : 56;
    const gridZ = isMobile ? 30 : 44;
    const spacingX = 0.58;
    const spacingZ = 0.58;
    const totalPoints = gridX * gridZ;

    const positions = new Float32Array(totalPoints * 3);
    const originalPositions = new Float32Array(totalPoints * 3);
    const colors = new Float32Array(totalPoints * 3);

    const colorGraphite = new THREE.Color("#11131a");
    const colorChalk = new THREE.Color("#f5f5f7");
    const colorViolet = new THREE.Color("#8b5cf6");
    const colorIce = new THREE.Color("#38bdf8");

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

        const dist = Math.sqrt(x * x + z * z);
        const ptColor = new THREE.Color();
        if (dist < 4.5) {
          ptColor.lerpColors(colorChalk, colorViolet, 0.35);
        } else if (dist < 9) {
          ptColor.lerpColors(colorChalk, colorGraphite, 0.65);
        } else {
          ptColor.copy(colorGraphite);
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

    // Particle sprite texture (circular glow with soft falloff)
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 64;
    textureCanvas.height = 64;
    const pctx = textureCanvas.getContext("2d");
    if (pctx) {
      const grad = pctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      grad.addColorStop(0.25, "rgba(245, 245, 247, 0.6)");
      grad.addColorStop(0.6, "rgba(139, 92, 246, 0.12)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      pctx.fillStyle = grad;
      pctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(textureCanvas);

    const pointsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.12 : 0.16,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointsField = new THREE.Points(geometry, pointsMaterial);
    scene.add(pointsField);

    // 3. Grid Filaments / Lines
    const lineIndices: number[] = [];
    for (let i = 0; i < gridX; i++) {
      for (let j = 0; j < gridZ; j++) {
        const current = i * gridZ + j;
        if (i < gridX - 1) lineIndices.push(current, (i + 1) * gridZ + j);
        if (j < gridZ - 1) lineIndices.push(current, i * gridZ + (j + 1));
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    linesGeometry.setIndex(lineIndices);

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // 4. Subtle Floating Starlight Field (Deep Perspective)
    const starCount = isMobile ? 80 : 160;
    const starPositions = new Float32Array(starCount * 3);
    for (let s = 0; s < starCount; s++) {
      starPositions[s * 3] = (Math.random() - 0.5) * 36;
      starPositions[s * 3 + 1] = Math.random() * 14 - 3;
      starPositions[s * 3 + 2] = (Math.random() - 0.5) * 28 - 2;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const starsField = new THREE.Points(starsGeo, starsMat);
    scene.add(starsField);

    // 5. Interaction Tracking & Scroll Modes
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const raycaster = new THREE.Raycaster();
    const planeIntersect = new THREE.Vector3();

    const onPointerMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onPointerMove, { passive: true });

    // Detect active section through scroll position
    let currentScrollRatio = 0;
    let targetScrollRatio = 0;
    let activeMode = 0; // 0: hero, 1: about, 2: projects, 3: skills, 4: contact

    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetScrollRatio = Math.min(1, Math.max(0, scrollY / docHeight));

      // Calculate section boundaries
      const projectsEl = document.getElementById("projects");
      const skillsEl = document.getElementById("skills");
      const aboutEl = document.getElementById("about");
      const contactEl = document.getElementById("contact");

      const pTop = projectsEl?.offsetTop ?? window.innerHeight * 2;
      const sTop = skillsEl?.offsetTop ?? window.innerHeight * 3.5;
      const aTop = aboutEl?.offsetTop ?? window.innerHeight;
      const cTop = contactEl?.offsetTop ?? window.innerHeight * 5;

      if (scrollY < aTop - 120) {
        activeMode = 0; // HERO
      } else if (scrollY < pTop - 120) {
        activeMode = 1; // ABOUT
      } else if (scrollY < sTop - 120) {
        activeMode = 2; // PROJECTS
      } else if (scrollY < cTop - 180) {
        activeMode = 3; // SKILLS & GITHUB
      } else {
        activeMode = 4; // CONTACT
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 6. Responsive Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // 7. Render Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();
    let currentModeLerp = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Interpolations
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      currentScrollRatio += (targetScrollRatio - currentScrollRatio) * 0.05;
      currentModeLerp += (activeMode - currentModeLerp) * 0.04;

      // Dynamic camera choreographies across sections:
      // Hero: monumental expansive perspective with organic neural wave
      // Transition Hero -> About: camera swoops down, geometry surges into foreground
      // About: deep quiet architectural perspective
      // Projects: close-up computational perspective with dynamic filament brightness
      // Skills: directional oblique perspective
      // Contact: deep receding celestial horizon

      // Calculate smooth transition spikes between chapters to bring geometry into foreground (Section 8)
      const distToTransition = Math.min(
        Math.abs(currentModeLerp - 0.5),
        Math.abs(currentModeLerp - 1.5),
        Math.abs(currentModeLerp - 2.5),
        Math.abs(currentModeLerp - 3.5),
      );
      const takeoverFactor = Math.max(0, 1 - distToTransition * 2.5); // Spikes at .5, 1.5, 2.5, 3.5

      const baseCameraY = 4.2 - currentModeLerp * 0.45 - takeoverFactor * 1.8;
      const baseCameraZ = 13 - currentModeLerp * 1.2 - takeoverFactor * 3.5;

      camera.position.x = mouse.x * (0.8 + takeoverFactor * 0.5);
      camera.position.y = baseCameraY + mouse.y * 0.4;
      camera.position.z = baseCameraZ;
      camera.lookAt(mouse.x * 0.3, -0.6 - currentModeLerp * 0.15 + takeoverFactor * 0.4, 0);

      // Raycast pointer intersection on floor plane
      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
      raycaster.ray.intersectPlane(plane, planeIntersect);

      // Deform positions depending on section mode
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Mode weights
      const isHero = Math.max(0, 1 - Math.abs(currentModeLerp - 0));
      const isAbout = Math.max(0, 1 - Math.abs(currentModeLerp - 1));
      const isProjects = Math.max(0, 1 - Math.abs(currentModeLerp - 2));
      const isSkills = Math.max(0, 1 - Math.abs(currentModeLerp - 3));
      const isContact = Math.max(0, 1 - Math.abs(currentModeLerp - 4));

      for (let p = 0; p < totalPoints; p++) {
        const ox = originalPositions[p * 3];
        const oz = originalPositions[p * 3 + 2];

        // Mode 0: Hero - Organic wave
        const waveHero =
          (Math.sin(ox * 0.45 + elapsedTime * 0.8) * Math.cos(oz * 0.45 + elapsedTime * 0.7) * 0.8 +
            Math.sin(Math.sqrt(ox * ox + oz * oz) * 0.5 - elapsedTime * 0.9) * 0.4) *
          isHero;

        // Mode 1: About - Architectural orthogonal stillness with microscopic drift
        const waveAbout = Math.sin(ox * 0.2 + oz * 0.2 + elapsedTime * 0.3) * 0.12 * isAbout;

        // Mode 2: Projects - Structured computational data grid with rhythmic pulses
        const waveProjects =
          (Math.sin(ox * 1.4 + elapsedTime * 2.2) * 0.2 +
            Math.cos(oz * 1.4 + elapsedTime * 1.8) * 0.2) *
          isProjects;

        // Mode 3: Skills - Interconnected directional stream
        const waveSkills = Math.sin(ox * 0.6 - oz * 0.6 + elapsedTime * 1.5) * 0.3 * isSkills;

        // Mode 4: Contact - Minimal breathing horizon
        const waveContact = Math.sin(elapsedTime * 0.5 + oz * 0.3) * 0.1 * isContact;

        let y = waveHero + waveAbout + waveProjects + waveSkills + waveContact;

        // Pointer proximity deflection
        const dx = ox - planeIntersect.x;
        const dz = oz - planeIntersect.z;
        const distSq = dx * dx + dz * dz;

        if (distSq < 15) {
          const force = (1 - distSq / 15) * 0.75;
          y += Math.sin(elapsedTime * 3.5) * force * 0.25 + force * 0.45;
        }

        posArray[p * 3 + 1] = y;
      }

      posAttr.needsUpdate = true;
      linesGeometry.attributes.position.needsUpdate = true;

      // Slow ambient drift
      pointsField.rotation.y = elapsedTime * 0.012;
      linesMesh.rotation.y = elapsedTime * 0.012;
      starsField.rotation.y = -elapsedTime * 0.005;

      // Adjust line opacity depending on mode and chapter transition takeover
      linesMaterial.opacity = 0.03 + isProjects * 0.06 + isHero * 0.02 + takeoverFactor * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      geometry.dispose();
      linesGeometry.dispose();
      starsGeo.dispose();
      pointsMaterial.dispose();
      linesMaterial.dispose();
      starsMat.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (hasWebGL === false) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-30"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden ${className}`}
    />
  );
}
