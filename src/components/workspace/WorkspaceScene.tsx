import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { workspaceSound } from "@/lib/workspace-audio";

export type MonitorId = "creative" | "technical" | "projects" | "profile" | "connect";

export interface MonitorMeta {
  id: MonitorId;
  title: string;
  category: string;
  badge: string;
  tagline: string;
  accentColor: string;
  previewItems: string[];
}

export const MONITORS_META: Record<MonitorId, MonitorMeta> = {
  projects: {
    id: "projects",
    title: "PROJECT ARCHIVE",
    category: "VERIFIED GITHUB REPOSITORIES",
    badge: "LEDGER // VERIFIED REPOS",
    tagline: "Strict source of truth from GitHub (ps06222005-oss).",
    accentColor: "#2563EB",
    previewItems: [
      "JARVIS — Autonomous Voice & OS Automation (Python)",
      "onlinestream — Media Streaming & Playback Web App (React/TS)",
      "Project---Gridshield- — Interactive AI Game Platform (Hackathon)",
      "Decodelabs-internship — Production Software Repository",
    ],
  },
  creative: {
    id: "creative",
    title: "CREATIVE STUDIO",
    category: "UI/UX & DESIGN SYSTEM",
    badge: "SYS_DESIGN // V2.4",
    tagline: "Ideas, visual balance, typography and digital interfaces.",
    accentColor: "#0EA5E9",
    previewItems: [
      "Arctic Minimal Design Tokens (#F8FAFC / #2563EB / #0EA5E9)",
      "Space Grotesk & Inter Typographic Hierarchy",
      "OnlineStream Media Player — Adaptive Canvas & UI",
      "GRIDSHIELD AI — Gamified Energy Cyber-Interface",
    ],
  },
  technical: {
    id: "technical",
    title: "TECHNICAL LAB",
    category: "AI/ML & CORE ENGINEERING",
    badge: "SYS_KERNEL // V3.8",
    tagline: "Programming, Python systems, neural intelligence and automation.",
    accentColor: "#2563EB",
    previewItems: [
      "JARVIS Voice Assistant — NLP intent engine & OS control",
      "DecodeLabs Internship — Industrial code delivery & APIs",
      "Project GridShield — AI-powered real-time game architecture",
      "Python, TypeScript, React 19 & Neural Pipeline Integration",
    ],
  },
  profile: {
    id: "profile",
    title: "PROFILE & ACADEMICS",
    category: "BACKGROUND & SPECIALIZATION",
    badge: "ACADEMIC // 2024-2028",
    tagline: "Aspiring Application Developer | CSE (AI & ML) Student.",
    accentColor: "#0284C7",
    previewItems: [
      "B.Tech Computer Science & Engineering (AI & ML)",
      "Sunderdeep Global University, Ghaziabad",
      "Status: Open to Internships",
      "Focus: Scalable Apps, Autonomous AI Agents & Creative Tech",
    ],
  },
  connect: {
    id: "connect",
    title: "CONNECT & COMMS",
    category: "COMMUNICATION CHANNELS",
    badge: "DISPATCH // LIVE",
    tagline: "Open to discussions, engineering roles and internship opportunities.",
    accentColor: "#38BDF8",
    previewItems: [
      "GitHub: github.com/ps06222005-oss",
      "LinkedIn: linkedin.com/in/prince-chauhan-3418a3288",
      "Email: ps06222005@gmail.com",
      "Location: Ghaziabad, Uttar Pradesh, India",
    ],
  },
};

interface WorkspaceSceneProps {
  activeMonitor: MonitorId | null;
  onSelectMonitor: (id: MonitorId) => void;
  audioEnabled: boolean;
  cameraPreset: "overview" | MonitorId;
  isDarkTheme: boolean;
  entryFrom?: "creative" | "technical" | null;
}

// Generate procedural canvas texture for each holographic monitor with crisp typography
function createMonitorTexture(
  meta: MonitorMeta,
  isHovered: boolean,
  isSelected: boolean,
  isDark: boolean,
  maxAnisotropy = 4,
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 480;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);
  ctx.scale(0.75, 0.75);

  // Background gradient: dark translucent cybernetic glass for high readability
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 640);
  if (isSelected) {
    bgGrad.addColorStop(0, "#0a1931");
    bgGrad.addColorStop(1, "#030814");
  } else if (isHovered) {
    bgGrad.addColorStop(0, "#0c213f");
    bgGrad.addColorStop(1, "#050f1d");
  } else {
    bgGrad.addColorStop(0, isDark ? "#091222" : "#0c172a");
    bgGrad.addColorStop(1, isDark ? "#040812" : "#050b16");
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 640);

  // Precision background hairline grid
  ctx.strokeStyle = isSelected
    ? "rgba(56, 189, 248, 0.25)"
    : isHovered
      ? "rgba(56, 189, 248, 0.18)"
      : "rgba(148, 163, 184, 0.10)";
  ctx.lineWidth = 1;
  const gridSize = 32;
  for (let x = 0; x <= 1024; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 640);
    ctx.stroke();
  }
  for (let y = 0; y <= 640; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Header Bar (Solid backing to guarantee maximum contrast)
  ctx.fillStyle = isSelected ? "rgba(37, 99, 235, 0.45)" : "rgba(15, 23, 42, 0.85)";
  ctx.fillRect(20, 20, 984, 56);
  ctx.strokeStyle = meta.accentColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, 984, 56);

  // Header Telemetry (Space Grotesk / Monospace)
  ctx.fillStyle = meta.accentColor;
  ctx.font = "bold 22px 'Space Grotesk', monospace";
  ctx.fillText(meta.badge, 40, 56);

  ctx.fillStyle = "#94A3B8";
  ctx.font = "bold 15px 'Space Grotesk', monospace";
  ctx.textAlign = "right";
  ctx.fillText(meta.category, 980, 56);
  ctx.textAlign = "left";

  // Monitor Title (Space Grotesk)
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 46px 'Space Grotesk', sans-serif";
  ctx.fillText(meta.title, 40, 142);

  // Accent Underline
  ctx.strokeStyle = meta.accentColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(40, 162);
  ctx.lineTo(380, 162);
  ctx.stroke();

  // Tagline (Inter)
  ctx.fillStyle = "#E2E8F0";
  ctx.font = "500 22px 'Inter', sans-serif";
  ctx.fillText(meta.tagline, 40, 204);

  // Bullet items / Telemetry lines (Crisp high-contrast monospace)
  ctx.font = "20px monospace";
  meta.previewItems.forEach((item, idx) => {
    const y = 268 + idx * 60;

    // Bullet badge box
    ctx.fillStyle = isSelected ? meta.accentColor : "rgba(56, 189, 248, 0.35)";
    ctx.fillRect(40, y - 18, 14, 14);

    ctx.fillStyle = isSelected ? "#FFFFFF" : "#E2E8F0";
    ctx.fillText(item, 70, y - 5);

    // Subtle horizontal separator
    ctx.strokeStyle = "rgba(148, 163, 184, 0.16)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, y + 16);
    ctx.lineTo(984, y + 16);
    ctx.stroke();
  });

  // Footer status bar
  ctx.fillStyle = isSelected ? meta.accentColor : "#38BDF8";
  ctx.font = "bold 17px monospace";
  const actionText = isSelected
    ? "▶ ACTIVE MONITOR // CLICK TO OPEN FULL SECTION"
    : "▶ CLICK TO INSPECT MONITOR // ZOOM";
  ctx.fillText(actionText, 40, 595);

  // Corner tech reticles
  const r = 26;
  ctx.strokeStyle = meta.accentColor;
  ctx.lineWidth = 3;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(10, 10 + r);
  ctx.lineTo(10, 10);
  ctx.lineTo(10 + r, 10);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(1014 - r, 10);
  ctx.lineTo(1014, 10);
  ctx.lineTo(1014, 10 + r);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(10, 630 - r);
  ctx.lineTo(10, 630);
  ctx.lineTo(10 + r, 630);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(1014 - r, 630);
  ctx.lineTo(1014, 630);
  ctx.lineTo(1014, 630 - r);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(maxAnisotropy, 8);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export function WorkspaceScene({
  activeMonitor,
  onSelectMonitor,
  audioEnabled,
  cameraPreset,
  isDarkTheme,
  entryFrom = null,
}: WorkspaceSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const activeMonitorRef = useRef(activeMonitor);
  const cameraPresetRef = useRef(cameraPreset);
  const audioEnabledRef = useRef(audioEnabled);
  const isDarkRef = useRef(isDarkTheme);
  const onSelectMonitorRef = useRef(onSelectMonitor);
  const entryFromRef = useRef(entryFrom);

  activeMonitorRef.current = activeMonitor;
  cameraPresetRef.current = cameraPreset;
  audioEnabledRef.current = audioEnabled;
  isDarkRef.current = isDarkTheme;
  onSelectMonitorRef.current = onSelectMonitor;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanupScene: (() => void) | null = null;

    const initTimer = window.setTimeout(() => {
      if (cancelled) return;

      // 1. Safe Software WebGL Guard (no loseContext to prevent console errors)
      const isSoftwareGl = (() => {
        try {
          const gl = document.createElement("canvas").getContext("webgl2");
          if (!gl) return true;
          const ext = gl.getExtension("WEBGL_debug_renderer_info");
          const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
          const gpu = String(gl.getParameter(param));
          return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
        } catch {
          return true;
        }
      })();

      // 2. Scene, Camera, Renderer adhering to Palette 5
      const scene = new THREE.Scene();
      const isDark = isDarkRef.current;
      const initialBgColor = isDark ? 0x0f172a : 0xf8fafc;
      const bgColorObj = new THREE.Color(initialBgColor);
      scene.background = bgColorObj;
      scene.fog = new THREE.FogExp2(initialBgColor, 0.03);

      const width = Math.max(container.clientWidth || window.innerWidth, 320);
      const height = Math.max(container.clientHeight || window.innerHeight, 240);
      const isNarrowViewport = width < 768;

      const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 80);
      const getResponsiveOverviewZ = (aspect: number) => {
        if (aspect >= 1.35) return 6.2;
        const clamped = Math.max(aspect, 0.45);
        return Math.min(13.2, 6.2 * (1.35 / clamped));
      };
      const initialOverviewZ = getResponsiveOverviewZ(width / height);

      // Smooth entry sweep when arriving from Creative or Technical World
      const startX =
        entryFromRef.current === "creative" ? -3.4 : entryFromRef.current === "technical" ? 3.4 : 0;
      const startY = entryFromRef.current ? 3.15 : 2.7;
      camera.position.set(startX, startY, initialOverviewZ + (entryFromRef.current ? 1.4 : 0));
      camera.lookAt(0, 1.85, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: "high-performance",
        alpha: false,
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = isDark ? 1.15 : 1.05;
      renderer.setPixelRatio(
        isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, isNarrowViewport ? 1.5 : 1.75),
      );
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = !isSoftwareGl && !isNarrowViewport;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      container.appendChild(renderer.domElement);

      const onContextLost = (event: Event) => {
        event.preventDefault();
      };
      const onContextRestored = () => {
        renderer.setSize(
          Math.max(container.clientWidth || window.innerWidth, 320),
          Math.max(container.clientHeight || window.innerHeight, 240),
        );
      };
      renderer.domElement.addEventListener("webglcontextlost", onContextLost, false);
      renderer.domElement.addEventListener("webglcontextrestored", onContextRestored, false);

      const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

      // 3. Environment Map (PMREM RoomEnvironment)
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const envScene = new RoomEnvironment();
      const envRenderTarget = pmremGenerator.fromScene(envScene, 0.04);
      scene.environment = envRenderTarget.texture;
      envScene.dispose();
      pmremGenerator.dispose();

      // 4. Lighting Rig (Key + Hemisphere + Dual World Accents + Central Core)
      const keyLight = new THREE.DirectionalLight(0xfffbeb, isDark ? 1.6 : 1.9);
      keyLight.position.set(4, 6.5, 5);
      keyLight.castShadow = !isSoftwareGl && !isNarrowViewport;
      if (keyLight.castShadow) {
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        keyLight.shadow.camera.near = 0.5;
        keyLight.shadow.camera.far = 20;
        keyLight.shadow.bias = -0.0005;
        keyLight.shadow.normalBias = 0.02;
      }
      scene.add(keyLight);

      const hemiLight = new THREE.HemisphereLight(
        isDark ? 0x38bdf8 : 0x0ea5e9,
        isDark ? 0x0f172a : 0xe2e8f0,
        isDark ? 1.1 : 0.9,
      );
      scene.add(hemiLight);

      const cyanLight = new THREE.PointLight(0x0ea5e9, 2.2, 8);
      cyanLight.position.set(-3.4, 2.4, 0.5);
      scene.add(cyanLight);

      const blueLight = new THREE.PointLight(0x2563eb, 2.4, 8);
      blueLight.position.set(3.4, 2.4, 0.5);
      scene.add(blueLight);

      const centerCoreLight = new THREE.PointLight(0x38bdf8, 2.0, 5);
      centerCoreLight.position.set(0, 1.15, -0.2);
      scene.add(centerCoreLight);

      // 5. Procedural 3D Workstation Desk + Keyboard + Mouse + Holographic Core
      const deskGroup = new THREE.Group();

      // A. Main Sculpted Desk Top
      const deskTopGeo = new THREE.BoxGeometry(6.6, 0.12, 2.4);
      const deskTopMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x1e293b : 0xffffff,
        metalness: isDark ? 0.75 : 0.42,
        roughness: isDark ? 0.28 : 0.32,
      });
      const deskTopMesh = new THREE.Mesh(deskTopGeo, deskTopMat);
      deskTopMesh.position.set(0, 0.88, 0);
      deskTopMesh.receiveShadow = !isSoftwareGl && !isNarrowViewport;
      deskTopMesh.castShadow = !isSoftwareGl && !isNarrowViewport;
      deskGroup.add(deskTopMesh);

      // B. Bevelled Metallic Perimeter Trim
      const trimGeo = new THREE.BoxGeometry(6.68, 0.04, 2.48);
      const trimMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x334155 : 0xcbd5e1,
        metalness: 0.85,
        roughness: 0.22,
      });
      const trimMesh = new THREE.Mesh(trimGeo, trimMat);
      trimMesh.position.set(0, 0.84, 0);
      deskGroup.add(trimMesh);

      // C. Energy Conduit Track
      const conduitGeo = new THREE.BoxGeometry(5.8, 0.015, 0.08);
      const conduitMat = new THREE.MeshBasicMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: 0.85,
      });
      const conduitMesh = new THREE.Mesh(conduitGeo, conduitMat);
      conduitMesh.position.set(0, 0.945, -0.4);
      deskGroup.add(conduitMesh);

      // D. Dual World Convergence Core (Central emitter + dual orbital rings + floating octahedron)
      const emitterCoreGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.06, 32);
      const emitterCoreMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x1e293b : 0xe2e8f0,
        metalness: 0.8,
        roughness: 0.3,
        emissive: 0x0284c7,
        emissiveIntensity: 0.4,
      });
      const emitterCoreMesh = new THREE.Mesh(emitterCoreGeo, emitterCoreMat);
      emitterCoreMesh.position.set(0, 0.92, -0.4);
      deskGroup.add(emitterCoreMesh);

      const emitterRingGeo = new THREE.TorusGeometry(0.5, 0.02, 16, 48);
      const emitterRingMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.9,
      });
      const emitterRing = new THREE.Mesh(emitterRingGeo, emitterRingMat);
      emitterRing.rotation.x = Math.PI / 2;
      emitterRing.position.set(0, 0.955, -0.4);
      deskGroup.add(emitterRing);

      const outerOrbitGeo = new THREE.TorusGeometry(0.68, 0.012, 12, 48);
      const outerOrbitMat = new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.65,
      });
      const outerOrbitRing = new THREE.Mesh(outerOrbitGeo, outerOrbitMat);
      outerOrbitRing.rotation.x = Math.PI / 2.6;
      outerOrbitRing.position.set(0, 1.32, -0.4);
      deskGroup.add(outerOrbitRing);

      const holoCrystalGeo = new THREE.OctahedronGeometry(0.2, 0);
      const holoCrystalMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x2563eb,
        emissiveIntensity: 0.55,
        roughness: 0.15,
        metalness: 0.6,
        transparent: true,
        opacity: 0.85,
      });
      const holoCrystal = new THREE.Mesh(holoCrystalGeo, holoCrystalMat);
      holoCrystal.position.set(0, 1.34, -0.4);
      deskGroup.add(holoCrystal);

      const holoWireGeo = new THREE.EdgesGeometry(holoCrystalGeo);
      const holoWireMat = new THREE.LineBasicMaterial({
        color: 0x7dd3fc,
        transparent: true,
        opacity: 0.9,
      });
      const holoCrystalWire = new THREE.LineSegments(holoWireGeo, holoWireMat);
      holoCrystal.add(holoCrystalWire);

      // E. Realistic Workstation Desk Mat, Mechanical Keyboard & Wireless Mouse
      const matPadGeo = new THREE.BoxGeometry(2.35, 0.012, 0.92);
      const matPadMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x0f172a : 0xe2e8f0,
        roughness: 0.85,
        metalness: 0.1,
      });
      const matPadMesh = new THREE.Mesh(matPadGeo, matPadMat);
      matPadMesh.position.set(0.08, 0.946, 0.56);
      deskGroup.add(matPadMesh);

      const keyboardBodyGeo = new THREE.BoxGeometry(1.18, 0.055, 0.42);
      const keyboardBodyMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x1e293b : 0xf1f5f9,
        metalness: 0.65,
        roughness: 0.3,
      });
      const keyboardBody = new THREE.Mesh(keyboardBodyGeo, keyboardBodyMat);
      keyboardBody.position.set(-0.22, 0.98, 0.54);
      keyboardBody.rotation.x = 0.06;
      deskGroup.add(keyboardBody);

      const keyRowGeo = new THREE.BoxGeometry(1.06, 0.024, 0.055);
      const keyRowMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x334155 : 0xcbd5e1,
        metalness: 0.35,
        roughness: 0.45,
      });
      [-0.12, -0.04, 0.04, 0.12].forEach((zOff) => {
        const rowMesh = new THREE.Mesh(keyRowGeo, keyRowMat);
        rowMesh.position.set(-0.22, 1.015 - zOff * 0.06, 0.54 + zOff);
        rowMesh.rotation.x = 0.06;
        deskGroup.add(rowMesh);
      });

      const keyGlowStripGeo = new THREE.BoxGeometry(1.14, 0.012, 0.018);
      const keyGlowStripMat = new THREE.MeshBasicMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: 0.85,
      });
      const keyGlowStrip = new THREE.Mesh(keyGlowStripGeo, keyGlowStripMat);
      keyGlowStrip.position.set(-0.22, 0.99, 0.335);
      deskGroup.add(keyGlowStrip);

      const mouseBodyGeo = new THREE.CapsuleGeometry(0.085, 0.12, 8, 16);
      const mouseBodyMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x1e293b : 0xf8fafc,
        metalness: 0.55,
        roughness: 0.25,
      });
      const mouseBody = new THREE.Mesh(mouseBodyGeo, mouseBodyMat);
      mouseBody.rotation.x = Math.PI / 2;
      mouseBody.scale.set(1.0, 1.0, 0.58);
      mouseBody.position.set(0.74, 0.985, 0.56);
      deskGroup.add(mouseBody);

      const mouseWheelGeo = new THREE.BoxGeometry(0.018, 0.016, 0.045);
      const mouseWheelMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const mouseWheel = new THREE.Mesh(mouseWheelGeo, mouseWheelMat);
      mouseWheel.position.set(0.74, 1.032, 0.5);
      deskGroup.add(mouseWheel);

      // Central Monitor Riser Stand anchoring the workstation display
      const riserGeo = new THREE.BoxGeometry(0.14, 0.86, 0.1);
      const riserMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x334155 : 0xcbd5e1,
        metalness: 0.85,
        roughness: 0.25,
      });
      const riserMesh = new THREE.Mesh(riserGeo, riserMat);
      riserMesh.position.set(0, 1.36, -0.78);
      deskGroup.add(riserMesh);

      const riserFootGeo = new THREE.BoxGeometry(0.86, 0.03, 0.34);
      const riserFootMesh = new THREE.Mesh(riserFootGeo, riserMat);
      riserFootMesh.position.set(0, 0.955, -0.72);
      deskGroup.add(riserFootMesh);

      // F. Structural Cantilevered Pedestals
      const legGeo = new THREE.BoxGeometry(0.32, 0.84, 1.8);
      const legMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x0f172a : 0xe2e8f0,
        metalness: 0.7,
        roughness: 0.4,
      });
      const leftLeg = new THREE.Mesh(legGeo, legMat);
      leftLeg.position.set(-2.8, 0.42, 0);
      leftLeg.castShadow = !isSoftwareGl && !isNarrowViewport;
      leftLeg.receiveShadow = !isSoftwareGl && !isNarrowViewport;
      deskGroup.add(leftLeg);

      const rightLeg = new THREE.Mesh(legGeo, legMat);
      rightLeg.position.set(2.8, 0.42, 0);
      rightLeg.castShadow = !isSoftwareGl && !isNarrowViewport;
      rightLeg.receiveShadow = !isSoftwareGl && !isNarrowViewport;
      deskGroup.add(rightLeg);

      scene.add(deskGroup);

      // 6. Holographic Floor Grid (Palette 5 Grounding)
      const floorGeo = new THREE.PlaneGeometry(32, 32);
      const floorMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x09101f : 0xf1f5f9,
        roughness: 0.7,
        metalness: 0.3,
      });
      const floorMesh = new THREE.Mesh(floorGeo, floorMat);
      floorMesh.rotation.x = -Math.PI / 2;
      floorMesh.position.y = 0;
      floorMesh.receiveShadow = !isSoftwareGl && !isNarrowViewport;
      scene.add(floorMesh);

      const gridHelper = new THREE.GridHelper(
        28,
        56,
        isDark ? 0x0284c7 : 0x2563eb,
        isDark ? 0x1e293b : 0xcbd5e1,
      );
      gridHelper.position.y = 0.005;
      scene.add(gridHelper);

      // 6b. Lightweight Ambient Floating Particles (reduced count on mobile/softwareGL)
      const particleCount = isNarrowViewport || isSoftwareGl ? 32 : 72;
      const particlePositions = new Float32Array(particleCount * 3);
      const particleBaseY = new Float32Array(particleCount);
      const particlePhases = new Float32Array(particleCount);
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + (i % 7) * 0.45;
        const radius = 1.6 + (i % 9) * 0.55;
        particlePositions[i * 3] = Math.cos(angle) * radius;
        const py = 0.9 + ((i * 0.37) % 3.2);
        particlePositions[i * 3 + 1] = py;
        particlePositions[i * 3 + 2] = Math.sin(angle) * radius * 0.65 - 0.3;
        particleBaseY[i] = py;
        particlePhases[i] = i * 0.73;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

      const pCanvas = document.createElement("canvas");
      pCanvas.width = 32;
      pCanvas.height = 32;
      const pCtx = pCanvas.getContext("2d");
      if (pCtx) {
        const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
        pGrad.addColorStop(0, "rgba(56, 189, 248, 0.95)");
        pGrad.addColorStop(0.45, "rgba(37, 99, 235, 0.45)");
        pGrad.addColorStop(1, "rgba(37, 99, 235, 0)");
        pCtx.fillStyle = pGrad;
        pCtx.fillRect(0, 0, 32, 32);
      }
      const particleTex = new THREE.CanvasTexture(pCanvas);
      const particleMat = new THREE.PointsMaterial({
        size: isNarrowViewport ? 0.14 : 0.11,
        map: particleTex,
        transparent: true,
        opacity: isDark ? 0.75 : 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const ambientParticles = new THREE.Points(particleGeo, particleMat);
      scene.add(ambientParticles);

      // 7. Non-Overlapping Tiered Monitor Cockpit Configuration
      const monitorConfigs: Array<{
        id: MonitorId;
        pos: [number, number, number];
        rot: [number, number, number];
        size: [number, number];
      }> = [
        {
          id: "projects",
          pos: [0, 2.7, -0.6],
          rot: [0.02, 0, 0],
          size: [2.8, 1.7],
        },
        {
          id: "creative",
          pos: [-3.1, 2.45, 0.15],
          rot: [0, 0.36, 0],
          size: [2.3, 1.44],
        },
        {
          id: "technical",
          pos: [3.1, 2.45, 0.15],
          rot: [0, -0.36, 0],
          size: [2.3, 1.44],
        },
        {
          id: "profile",
          pos: [-1.6, 1.35, 0.35],
          rot: [-0.15, 0.18, 0],
          size: [1.7, 1.08],
        },
        {
          id: "connect",
          pos: [1.6, 1.35, 0.35],
          rot: [-0.15, -0.18, 0],
          size: [1.65, 1.08],
        },
      ];

      interface MonitorMeshBundle {
        id: MonitorId;
        meta: MonitorMeta;
        group: THREE.Group;
        screenMesh: THREE.Mesh;
        glowFrame: THREE.LineSegments;
        basePod: THREE.Mesh;
        beamMesh: THREE.Mesh;
        glassBackGeo: THREE.BoxGeometry;
        glassBackMat: THREE.Material;
        edgesGeo: THREE.EdgesGeometry;
        edgeMat: THREE.Material;
        podGeo: THREE.CylinderGeometry;
        podMat: THREE.Material;
        beamGeo: THREE.ConeGeometry;
        beamMat: THREE.Material;
        baseY: number;
        mat: THREE.MeshStandardMaterial;
        texNormal: THREE.CanvasTexture;
        texHover: THREE.CanvasTexture | null;
        texSelected: THREE.CanvasTexture | null;
      }

      const monitorBundles: MonitorMeshBundle[] = [];
      const raycastTargets: THREE.Object3D[] = [];

      monitorConfigs.forEach((cfg) => {
        const meta = MONITORS_META[cfg.id];
        const monGroup = new THREE.Group();
        monGroup.position.set(...cfg.pos);
        monGroup.rotation.set(...cfg.rot);

        const [w, h] = cfg.size;

        const texNormal = createMonitorTexture(meta, false, false, isDark, maxAnisotropy);

        const screenGeo = new THREE.PlaneGeometry(w, h);
        const screenMat = new THREE.MeshStandardMaterial({
          map: texNormal,
          roughness: 0.1,
          metalness: 0.15,
          transparent: true,
          opacity: 0.95,
          emissive: new THREE.Color(meta.accentColor),
          emissiveIntensity: 0.15,
          side: THREE.DoubleSide,
        });
        const screenMesh = new THREE.Mesh(screenGeo, screenMat);
        screenMesh.userData = { monitorId: cfg.id };
        screenMesh.castShadow = false;
        monGroup.add(screenMesh);
        raycastTargets.push(screenMesh);

        const glassBackGeo = new THREE.BoxGeometry(w + 0.08, h + 0.08, 0.03);
        const glassBackMat = new THREE.MeshStandardMaterial({
          color: isDark ? 0x0f172a : 0x1e293b,
          transparent: true,
          opacity: 0.35,
          roughness: 0.2,
          metalness: 0.8,
        });
        const glassBackMesh = new THREE.Mesh(glassBackGeo, glassBackMat);
        glassBackMesh.position.z = -0.02;
        monGroup.add(glassBackMesh);

        const edgesGeo = new THREE.EdgesGeometry(glassBackGeo);
        const edgeMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(meta.accentColor),
          transparent: true,
          opacity: 0.65,
        });
        const glowFrame = new THREE.LineSegments(edgesGeo, edgeMat);
        monGroup.add(glowFrame);

        const podGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.08, 16);
        const podMat = new THREE.MeshStandardMaterial({
          color: isDark ? 0x1e293b : 0xcbd5e1,
          metalness: 0.9,
          roughness: 0.2,
        });
        const basePod = new THREE.Mesh(podGeo, podMat);
        basePod.position.set(0, -h / 2 - 0.22, 0);
        monGroup.add(basePod);

        const beamGeo = new THREE.ConeGeometry(w * 0.45, 0.24, 16, 1, true);
        const beamMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(meta.accentColor),
          transparent: true,
          opacity: 0.14,
          side: THREE.DoubleSide,
        });
        const beamMesh = new THREE.Mesh(beamGeo, beamMat);
        beamMesh.position.set(0, -h / 2 - 0.1, 0);
        monGroup.add(beamMesh);

        scene.add(monGroup);

        monitorBundles.push({
          id: cfg.id,
          meta,
          group: monGroup,
          screenMesh,
          glowFrame,
          basePod,
          beamMesh,
          glassBackGeo,
          glassBackMat,
          edgesGeo,
          edgeMat,
          podGeo,
          podMat,
          beamGeo,
          beamMat,
          baseY: cfg.pos[1],
          mat: screenMat,
          texNormal,
          texHover: null,
          texSelected: null,
        });
      });

      // 8. Raycasting, Hover & Subtle Parallax Pointer Tracking
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(-999, -999);
      const clickMouse = new THREE.Vector2();
      const parallaxTarget = new THREE.Vector2(0, 0);
      const parallaxCurrent = new THREE.Vector2(0, 0);
      let hoveredMonitorId: MonitorId | null = null;

      const onPointerMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        mouse.x = nx;
        mouse.y = ny;
        parallaxTarget.x = Math.max(-1, Math.min(1, nx));
        parallaxTarget.y = Math.max(-1, Math.min(1, ny));
      };

      const onPointerLeave = () => {
        mouse.set(-999, -999);
        parallaxTarget.set(0, 0);
      };

      const onClick = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        clickMouse.set(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1,
        );
        raycaster.setFromCamera(clickMouse, camera);
        const intersects = raycaster.intersectObjects(raycastTargets, false);
        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          const monId = hit.userData?.monitorId as MonitorId | undefined;
          if (monId) {
            workspaceSound.click(audioEnabledRef.current);
            onSelectMonitorRef.current(monId);
          }
        }
      };

      container.addEventListener("mousemove", onPointerMove, { passive: true });
      container.addEventListener("mouseleave", onPointerLeave, { passive: true });
      container.addEventListener("click", onClick);

      // 9. Camera Choreography Targets with Clean Non-Colliding Angles
      const cameraTargets: Record<
        "overview" | MonitorId,
        { pos: [number, number, number]; lookAt: [number, number, number] }
      > = {
        overview: { pos: [0, 2.7, 6.2], lookAt: [0, 1.85, 0] },
        projects: { pos: [0, 2.7, 2.1], lookAt: [0, 2.7, -0.6] },
        creative: { pos: [-2.2, 2.45, 2.4], lookAt: [-3.1, 2.45, 0.15] },
        technical: { pos: [2.2, 2.45, 2.4], lookAt: [3.1, 2.45, 0.15] },
        profile: { pos: [-1.25, 1.6, 1.7], lookAt: [-1.6, 1.35, 0.35] },
        connect: { pos: [1.25, 1.6, 1.7], lookAt: [1.6, 1.35, 0.35] },
      };

      const currentLookAt = new THREE.Vector3(0, 1.85, 0);
      const targetLookAt = new THREE.Vector3(0, 1.85, 0);
      const targetCameraPos = new THREE.Vector3(0, 2.7, initialOverviewZ);

      // 10. Resize Observer
      const onResize = () => {
        if (!container) return;
        const w = Math.max(container.clientWidth || window.innerWidth, 320);
        const h = Math.max(container.clientHeight || window.innerHeight, 240);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // 11. Animation Loop with Exponential Damping & Software WebGL Pacing
      let animId = 0;
      let timerId = 0;
      let disposed = false;
      let lastAppliedDark: boolean | null = null;
      const startTimeMs = performance.now();
      let prevTimeMs = startTimeMs;

      function afterDraw(cb: () => void) {
        try {
          const gl = renderer.getContext() as WebGL2RenderingContext;
          const sync = gl.fenceSync?.(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
          gl.flush?.();
          const poll = () => {
            if (disposed) {
              if (sync) gl.deleteSync?.(sync);
              return;
            }
            const state = sync && gl.getSyncParameter?.(sync, gl.SYNC_STATUS);
            if (state === gl.UNSIGNALED) {
              timerId = window.setTimeout(poll, 5);
            } else {
              if (sync) gl.deleteSync?.(sync);
              timerId = window.setTimeout(cb, 80);
            }
          };
          timerId = window.setTimeout(poll, 5);
        } catch {
          timerId = window.setTimeout(cb, 80);
        }
      }

      const animate = () => {
        if (disposed) return;

        const nowMs = performance.now();
        const delta = Math.min((nowMs - prevTimeMs) / 1000, 0.1);
        prevTimeMs = nowMs;
        const time = (nowMs - startTimeMs) / 1000;

        // Dynamic theme sync (zero allocation)
        const currentDark = isDarkRef.current;
        if (currentDark !== lastAppliedDark) {
          lastAppliedDark = currentDark;
          const targetBg = currentDark ? 0x0f172a : 0xf8fafc;
          bgColorObj.setHex(targetBg);
          if (scene.fog) {
            scene.fog.color.setHex(targetBg);
          }
          deskTopMat.color.setHex(currentDark ? 0x1e293b : 0xffffff);
          trimMat.color.setHex(currentDark ? 0x334155 : 0xcbd5e1);
          legMat.color.setHex(currentDark ? 0x0f172a : 0xe2e8f0);
          floorMat.color.setHex(currentDark ? 0x09101f : 0xf1f5f9);
          matPadMat.color.setHex(currentDark ? 0x0f172a : 0xe2e8f0);
          keyboardBodyMat.color.setHex(currentDark ? 0x1e293b : 0xf1f5f9);
          keyRowMat.color.setHex(currentDark ? 0x334155 : 0xcbd5e1);
          mouseBodyMat.color.setHex(currentDark ? 0x1e293b : 0xf8fafc);
          riserMat.color.setHex(currentDark ? 0x334155 : 0xcbd5e1);
          particleMat.opacity = currentDark ? 0.75 : 0.55;
          renderer.toneMappingExposure = currentDark ? 1.15 : 1.05;
        }

        // Determine active target with responsive aspect framing & damped mouse parallax
        const activePresetKey: "overview" | MonitorId =
          activeMonitorRef.current || cameraPresetRef.current || "overview";
        const presetTarget = cameraTargets[activePresetKey] || cameraTargets.overview;
        const focusAspectScale =
          camera.aspect < 1.1 ? Math.min(1.65, 1.1 / Math.max(camera.aspect, 0.5)) : 1;

        const parallaxLerp = 1 - Math.exp(-3.5 * delta);
        parallaxCurrent.x += (parallaxTarget.x - parallaxCurrent.x) * parallaxLerp;
        parallaxCurrent.y += (parallaxTarget.y - parallaxCurrent.y) * parallaxLerp;

        const targetX = presetTarget.pos[0];
        const targetY = presetTarget.pos[1];
        let targetZ = presetTarget.pos[2];
        if (activePresetKey === "overview") {
          targetZ = getResponsiveOverviewZ(camera.aspect);
        } else if (focusAspectScale > 1) {
          targetZ =
            presetTarget.lookAt[2] +
            (presetTarget.pos[2] - presetTarget.lookAt[2]) * focusAspectScale;
        }

        const parallaxStrength = activePresetKey === "overview" ? 1 : 0.35;
        const mouseParallaxX = parallaxCurrent.x * 0.36 * parallaxStrength;
        const mouseParallaxY = parallaxCurrent.y * 0.2 * parallaxStrength;

        targetCameraPos.set(targetX + mouseParallaxX, targetY + mouseParallaxY, targetZ);
        targetLookAt.set(
          presetTarget.lookAt[0] + mouseParallaxX * 0.3,
          presetTarget.lookAt[1] + mouseParallaxY * 0.25,
          presetTarget.lookAt[2],
        );

        camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraPos.x, 3.8, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraPos.y, 3.8, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCameraPos.z, 3.8, delta);

        currentLookAt.x = THREE.MathUtils.damp(currentLookAt.x, targetLookAt.x, 4.2, delta);
        currentLookAt.y = THREE.MathUtils.damp(currentLookAt.y, targetLookAt.y, 4.2, delta);
        currentLookAt.z = THREE.MathUtils.damp(currentLookAt.z, targetLookAt.z, 4.2, delta);
        camera.lookAt(currentLookAt);

        // Raycast hover test
        if (mouse.x > -2 && mouse.y > -2) {
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(raycastTargets, false);
          if (intersects.length > 0) {
            const hit = intersects[0].object as THREE.Mesh;
            const monId = hit.userData?.monitorId as MonitorId | undefined;
            if (monId && monId !== hoveredMonitorId) {
              hoveredMonitorId = monId;
              workspaceSound.hover(audioEnabledRef.current);
              container.style.cursor = "pointer";
            }
          } else if (hoveredMonitorId !== null) {
            hoveredMonitorId = null;
            container.style.cursor = "default";
          }
        }

        // Update Monitors: Floating Animation, Glow Pulse & State Textures
        monitorBundles.forEach((bundle, idx) => {
          const isHovered = bundle.id === hoveredMonitorId;
          const isSelected = bundle.id === activeMonitorRef.current;

          const floatOffset = Math.sin(time * 1.35 + idx * 1.1) * 0.032;
          const hoverLift = isHovered || isSelected ? 0.075 : 0;
          bundle.group.position.y = bundle.baseY + floatOffset + hoverLift;

          if (isSelected) {
            if (!bundle.texSelected) {
              bundle.texSelected = createMonitorTexture(
                bundle.meta,
                false,
                true,
                currentDark,
                maxAnisotropy,
              );
            }
            if (bundle.mat.map !== bundle.texSelected) {
              bundle.mat.map = bundle.texSelected;
              bundle.mat.needsUpdate = true;
            }
            bundle.mat.emissiveIntensity = 0.36 + Math.sin(time * 2.8) * 0.04;
            (bundle.glowFrame.material as THREE.LineBasicMaterial).opacity = 1.0;
          } else if (isHovered) {
            if (!bundle.texHover) {
              bundle.texHover = createMonitorTexture(
                bundle.meta,
                true,
                false,
                currentDark,
                maxAnisotropy,
              );
            }
            if (bundle.mat.map !== bundle.texHover) {
              bundle.mat.map = bundle.texHover;
              bundle.mat.needsUpdate = true;
            }
            bundle.mat.emissiveIntensity = 0.28;
            (bundle.glowFrame.material as THREE.LineBasicMaterial).opacity = 0.9;
          } else {
            if (bundle.mat.map !== bundle.texNormal) {
              bundle.mat.map = bundle.texNormal;
              bundle.mat.needsUpdate = true;
            }
            bundle.mat.emissiveIntensity = 0.12 + Math.sin(time * 1.8 + idx) * 0.025;
            (bundle.glowFrame.material as THREE.LineBasicMaterial).opacity = 0.55;
          }
        });

        // Rotating Holographic Elements & Core Pulse
        emitterRing.rotation.z = time * 0.5;
        outerOrbitRing.rotation.z = -time * 0.38;
        outerOrbitRing.rotation.y = time * 0.24;
        holoCrystal.rotation.y = time * 0.65;
        holoCrystal.rotation.x = Math.sin(time * 0.8) * 0.25;
        holoCrystal.position.y = 1.34 + Math.sin(time * 1.9) * 0.06;

        // Ambient Floating Particles Drift
        const pPos = particleGeo.attributes.position as THREE.BufferAttribute;
        const pArr = pPos.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pArr[i * 3 + 1] = particleBaseY[i] + Math.sin(time * 0.85 + particlePhases[i]) * 0.14;
        }
        pPos.needsUpdate = true;
        ambientParticles.rotation.y = time * 0.045;

        renderer.render(scene, camera);

        if (isSoftwareGl) {
          afterDraw(animate);
        } else {
          animId = requestAnimationFrame(animate);
        }
      };

      animId = requestAnimationFrame(animate);

      cleanupScene = () => {
        disposed = true;
        cancelAnimationFrame(animId);
        window.clearTimeout(timerId);
        window.removeEventListener("resize", onResize);
        container.removeEventListener("mousemove", onPointerMove);
        container.removeEventListener("mouseleave", onPointerLeave);
        container.removeEventListener("click", onClick);
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
        renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);

        envRenderTarget.dispose();
        deskTopGeo.dispose();
        deskTopMat.dispose();
        trimGeo.dispose();
        trimMat.dispose();
        conduitGeo.dispose();
        conduitMat.dispose();
        emitterCoreGeo.dispose();
        emitterCoreMat.dispose();
        emitterRingGeo.dispose();
        emitterRingMat.dispose();
        outerOrbitGeo.dispose();
        outerOrbitMat.dispose();
        holoCrystalGeo.dispose();
        holoCrystalMat.dispose();
        holoWireGeo.dispose();
        holoWireMat.dispose();
        matPadGeo.dispose();
        matPadMat.dispose();
        keyboardBodyGeo.dispose();
        keyboardBodyMat.dispose();
        keyRowGeo.dispose();
        keyRowMat.dispose();
        keyGlowStripGeo.dispose();
        keyGlowStripMat.dispose();
        mouseBodyGeo.dispose();
        mouseBodyMat.dispose();
        mouseWheelGeo.dispose();
        mouseWheelMat.dispose();
        riserGeo.dispose();
        riserFootGeo.dispose();
        riserMat.dispose();
        legGeo.dispose();
        legMat.dispose();
        floorGeo.dispose();
        floorMat.dispose();
        gridHelper.geometry.dispose();
        if (Array.isArray(gridHelper.material)) {
          gridHelper.material.forEach((m) => m.dispose());
        } else {
          gridHelper.material.dispose();
        }
        particleGeo.dispose();
        particleMat.dispose();
        particleTex.dispose();

        monitorBundles.forEach((b) => {
          b.screenMesh.geometry.dispose();
          b.mat.dispose();
          b.glassBackGeo.dispose();
          b.glassBackMat.dispose();
          b.edgesGeo.dispose();
          b.edgeMat.dispose();
          b.podGeo.dispose();
          b.podMat.dispose();
          b.beamGeo.dispose();
          b.beamMat.dispose();
          b.texNormal.dispose();
          b.texHover?.dispose();
          b.texSelected?.dispose();
        });

        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(initTimer);
      cleanupScene?.();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 w-full h-full overflow-hidden select-none" />
  );
}
