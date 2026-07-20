import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

type TechNode = {
  label: string;
  color: string;
  radiusX: number;
  radiusY: number;
  phase: number;
  speed: number;
  depth: number;
  importance: number;
  group: THREE.Group;
  sprite: THREE.Sprite;
};

const TAU = Math.PI * 2;

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.closePath();
}

function createLabel(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 152;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Unable to create technology label");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.shadowColor = color;
  ctx.shadowBlur = 24;
  roundedRect(ctx, 18, 24, 476, 104, 22);
  ctx.fillStyle = "rgba(10, 9, 8, .78)";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(56, 76, 8, 0, TAU);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.font = "600 31px Geist, Arial, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#f5f1eb";
  ctx.fillText(text.toUpperCase(), 84, 78);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    opacity: 0.9,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.9, 0.56, 1);
  return sprite;
}

function createOrbit(radiusX: number, radiusY: number, depth: number, color: number) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 160; i += 1) {
    const a = (i / 160) * TAU;
    points.push(new THREE.Vector3(
      Math.cos(a) * radiusX,
      Math.sin(a) * radiusY,
      Math.sin(a * 2.0 + depth) * depth,
    ));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.19,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  return new THREE.Line(geometry, material);
}

function createLaptop() {
  const laptop = new THREE.Group();
  const shell = new THREE.MeshStandardMaterial({
    color: 0x26221f,
    metalness: 0.82,
    roughness: 0.26,
  });
  const edge = new THREE.MeshStandardMaterial({
    color: 0xf05a24,
    emissive: 0xf05a24,
    emissiveIntensity: 1.8,
    metalness: 0.45,
    roughness: 0.3,
  });

  const base = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.08, 0.82), shell);
  base.rotation.x = -0.13;
  base.position.set(0, -0.3, 0.12);
  laptop.add(base);

  const screen = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.82, 0.07), shell);
  screen.position.set(0, 0.12, -0.28);
  screen.rotation.x = -0.08;
  laptop.add(screen);

  const displayCanvas = document.createElement("canvas");
  displayCanvas.width = 512;
  displayCanvas.height = 320;
  const ctx = displayCanvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 512, 320);
    gradient.addColorStop(0, "#080b18");
    gradient.addColorStop(1, "#17100c");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 320);
    ctx.font = "600 23px monospace";
    ctx.fillStyle = "#ff7c45";
    ctx.fillText("MAEPACE / BUILD", 34, 50);
    const rows = [
      ["#5669ff", 64, 98, 315],
      ["#eae6df", 64, 132, 230],
      ["#ff5b24", 64, 166, 352],
      ["#5669ff", 64, 200, 184],
      ["#eae6df", 64, 234, 288],
    ] as const;
    rows.forEach(([fill, x, y, width]) => {
      ctx.fillStyle = fill;
      ctx.globalAlpha = 0.82;
      ctx.fillRect(x, y, width, 8);
    });
    ctx.globalAlpha = 1;
  }
  const displayTexture = new THREE.CanvasTexture(displayCanvas);
  displayTexture.colorSpace = THREE.SRGBColorSpace;
  const display = new THREE.Mesh(
    new THREE.PlaneGeometry(1.13, 0.68),
    new THREE.MeshBasicMaterial({
      map: displayTexture,
      toneMapped: false,
    }),
  );
  display.position.set(0, 0.12, -0.241);
  display.rotation.x = -0.08;
  display.rotation.y = Math.PI;
  laptop.add(display);

  const status = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.014, 0.012), edge);
  status.position.set(0.41, -0.255, 0.54);
  laptop.add(status);
  return laptop;
}

function createFallbackEngineer() {
  const avatar = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xb87852, roughness: 0.72 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x171311, roughness: 0.88 });
  const hoodie = new THREE.MeshStandardMaterial({
    color: 0x242b3e,
    roughness: 0.58,
    metalness: 0.08,
  });
  const dark = new THREE.MeshStandardMaterial({ color: 0x121110, roughness: 0.76 });

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.15, 7, 16), hoodie);
  torso.scale.set(1, 1, 0.68);
  torso.position.y = 0.25;
  avatar.add(torso);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.39, 28, 20), skin);
  head.scale.set(0.88, 1.08, 0.9);
  head.position.set(0, 1.37, 0.02);
  avatar.add(head);

  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.405, 24, 14, 0, TAU, 0, Math.PI * 0.56),
    hair,
  );
  hairCap.scale.set(0.9, 0.66, 0.92);
  hairCap.position.set(0, 1.61, 0);
  avatar.add(hairCap);

  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 1.02, 6, 12), hoodie);
    arm.position.set(side * 0.63, 0.24, 0.02);
    arm.rotation.z = side * -0.2;
    avatar.add(arm);
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.19, 1.18, 6, 12), dark);
    leg.position.set(side * 0.25, -1.18, 0);
    avatar.add(leg);
  });
  return avatar;
}

/**
 * A true Three.js hero: a GLB engineer avatar at the center of a live,
 * dimensional technology system. The imported model is CC0 by Quaternius.
 */
export function initHeroThree(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x090807, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x090807);
  scene.fog = new THREE.FogExp2(0x090807, 0.055);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0.2, 9.2);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.72, 0.68, 0.24));

  scene.add(new THREE.HemisphereLight(0xaab8ff, 0x1c0d08, 2.25));

  const key = new THREE.SpotLight(0xff6a2c, 120, 22, Math.PI / 4, 0.72, 1.4);
  key.position.set(5.5, 6.5, 6);
  scene.add(key);

  const rim = new THREE.PointLight(0x4968ff, 56, 16, 1.8);
  rim.position.set(-2.8, 1.2, -3.5);
  scene.add(rim);

  const world = new THREE.Group();
  scene.add(world);

  const engineer = new THREE.Group();
  world.add(engineer);

  const halo = new THREE.Mesh(
    new THREE.RingGeometry(1.58, 1.63, 128),
    new THREE.MeshBasicMaterial({
      color: 0xff5b24,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  halo.position.z = -0.7;
  engineer.add(halo);

  const coreGlow = new THREE.PointLight(0xff5b24, 33, 7, 1.5);
  coreGlow.position.set(0, 0.5, 1.25);
  engineer.add(coreGlow);

  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 1.48, 0.08, 72),
    new THREE.MeshStandardMaterial({
      color: 0x161311,
      emissive: 0x5f1607,
      emissiveIntensity: 0.72,
      metalness: 0.72,
      roughness: 0.24,
      transparent: true,
      opacity: 0.88,
    }),
  );
  pedestal.position.y = -2.08;
  engineer.add(pedestal);

  const laptop = createLaptop();
  laptop.position.set(0, -0.03, 1.05);
  laptop.rotation.y = Math.PI;
  engineer.add(laptop);

  let avatarObject: THREE.Object3D | null = null;
  const loader = new GLTFLoader();
  loader.load(
    "/models/engineer-avatar.glb",
    (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.castShadow = false;
        child.receiveShadow = false;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial) {
            material.roughness = Math.min(0.78, material.roughness + 0.08);
            material.metalness = Math.max(0.03, material.metalness);
          }
        });
      });
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const scale = 3.72 / Math.max(size.y, 0.01);
      model.scale.setScalar(scale);
      const scaledBounds = new THREE.Box3().setFromObject(model);
      const center = scaledBounds.getCenter(new THREE.Vector3());
      model.position.sub(center);
      model.rotation.y = Math.PI;
      avatarObject = model;
      engineer.add(model);
    },
    undefined,
    () => {
      const fallback = createFallbackEngineer();
      avatarObject = fallback;
      engineer.add(fallback);
    },
  );

  const orbitRoot = new THREE.Group();
  world.add(orbitRoot);
  orbitRoot.add(
    createOrbit(3.55, 1.43, 0.62, 0xff6a2c),
    createOrbit(3.06, 1.86, 0.86, 0x6d7fff),
    createOrbit(2.52, 1.14, 1.06, 0xf3eee8),
  );
  orbitRoot.rotation.x = -0.09;
  orbitRoot.rotation.z = -0.07;

  const specs = [
    ["Generative AI", "#ff6a2c", 3.55, 1.43, 0.15, 0.105, 0.62, 1.18],
    ["TypeScript", "#f3eee8", 3.06, 1.86, 0.87, 0.082, 0.86, 1.12],
    ["React", "#6982ff", 2.52, 1.14, 1.62, 0.118, 1.06, 1.08],
    ["Azure", "#5271ff", 3.55, 1.43, 2.32, 0.076, 0.62, 1.12],
    ["Python", "#ff8250", 3.06, 1.86, 3.02, 0.092, 0.86, 1.04],
    ["Docker", "#8d9dff", 2.52, 1.14, 3.73, 0.112, 1.06, 0.94],
    ["PostgreSQL", "#f3eee8", 3.55, 1.43, 4.36, 0.069, 0.62, 0.92],
    ["SwiftUI", "#ff8250", 3.06, 1.86, 5.02, 0.087, 0.86, 0.9],
    ["C#", "#8d9dff", 2.52, 1.14, 5.58, 0.108, 1.06, 0.88],
    ["Next.js", "#f3eee8", 3.55, 1.43, 5.93, 0.073, 0.62, 0.98],
  ] as const;

  const techNodes: TechNode[] = specs.map((spec) => {
    const [label, color, radiusX, radiusY, phase, speed, depth, importance] = spec;
    const group = new THREE.Group();
    const sprite = createLabel(label, color);
    group.add(sprite);

    const dot = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.105, 1),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      }),
    );
    dot.position.x = -1.08;
    group.add(dot);
    orbitRoot.add(group);
    return { label, color, radiusX, radiusY, phase, speed, depth, importance, group, sprite };
  });

  const connections = new THREE.BufferGeometry();
  const connectionPositions = new Float32Array(techNodes.length * 6);
  connections.setAttribute("position", new THREE.BufferAttribute(connectionPositions, 3));
  const connectionLines = new THREE.LineSegments(
    connections,
    new THREE.LineBasicMaterial({
      color: 0xff7040,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  orbitRoot.add(connectionLines);

  const particleCount = innerWidth < 720 ? 260 : 620;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    const radius = 2.4 + Math.random() * 6.8;
    const angle = Math.random() * TAU;
    particlePositions[i * 3] = Math.cos(angle) * radius;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 7.6;
    particlePositions[i * 3 + 2] = Math.sin(angle) * radius - 1.8;
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particles = new THREE.Points(
    particlesGeometry,
    new THREE.PointsMaterial({
      color: 0x6d7fff,
      size: 0.027,
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  );
  world.add(particles);

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  let width = 1;
  let height = 1;
  let raf = 0;
  let running = false;
  let startedAt = performance.now();
  let elapsedBeforePause = 0;
  let engineerBaseY = 0;

  const layout = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(devicePixelRatio || 1, width < 720 ? 1.25 : 1.7);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    composer.setPixelRatio(dpr);
    composer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = width < 700 ? 11.4 : width < 980 ? 10.4 : 9.2;
    camera.updateProjectionMatrix();

    const mobile = width < 900;
    const x = mobile ? 0 : 2.12;
    const y = mobile ? 1.7 : 0.04;
    engineerBaseY = y;
    engineer.position.set(x, y, 0);
    orbitRoot.position.set(x, y, 0);
    particles.position.x = mobile ? 0 : 1.45;
  };

  const positionNode = (node: TechNode, elapsed: number, index: number) => {
    const angle = node.phase + elapsed * node.speed;
    const x = Math.cos(angle) * node.radiusX;
    const y = Math.sin(angle) * node.radiusY;
    const z = Math.sin(angle * 2 + index * 0.39) * node.depth;
    node.group.position.set(x, y, z);

    const front = THREE.MathUtils.clamp((z + node.depth) / (node.depth * 2), 0, 1);
    const scale = node.importance * (0.82 + front * 0.28);
    node.sprite.scale.set(1.9 * scale, 0.56 * scale, 1);
    const material = node.sprite.material as THREE.SpriteMaterial;
    material.opacity = 0.48 + front * 0.48;
    node.group.renderOrder = Math.round(front * 10);

    const p = index * 6;
    connectionPositions[p] = x;
    connectionPositions[p + 1] = y;
    connectionPositions[p + 2] = z;
    connectionPositions[p + 3] = 0;
    connectionPositions[p + 4] = 0;
    connectionPositions[p + 5] = 0.22;
  };

  const render = () => {
    if (!running && !reduced) return;
    const elapsed = reduced
      ? 8.4
      : elapsedBeforePause + (performance.now() - startedAt) / 1000;
    pointer.lerp(pointerTarget, 0.045);
    camera.position.x = pointer.x * 0.52;
    camera.position.y = 0.2 - pointer.y * 0.32;
    camera.lookAt(0.65, 0.08, 0);

    techNodes.forEach((node, index) => positionNode(node, elapsed, index));
    (connections.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;

    orbitRoot.rotation.y = Math.sin(elapsed * 0.12) * 0.1 + pointer.x * 0.16;
    engineer.rotation.y = Math.sin(elapsed * 0.32) * 0.045 + pointer.x * 0.1;
    engineer.position.y = engineerBaseY + Math.sin(elapsed * 0.72) * 0.022;
    halo.rotation.z = elapsed * 0.045;
    laptop.rotation.z = Math.sin(elapsed * 0.58) * 0.018;
    particles.rotation.y = elapsed * 0.012;
    particles.rotation.z = elapsed * 0.006;
    coreGlow.intensity = 29 + Math.sin(elapsed * 1.35) * 4;
    if (avatarObject) avatarObject.rotation.x = pointer.y * 0.025;

    composer.render();
    if (!reduced) raf = requestAnimationFrame(render);
  };

  const play = () => {
    if (running || reduced) return;
    running = true;
    startedAt = performance.now();
    raf = requestAnimationFrame(render);
  };

  const pause = () => {
    if (running) elapsedBeforePause += (performance.now() - startedAt) / 1000;
    running = false;
    cancelAnimationFrame(raf);
  };

  layout();
  addEventListener("resize", layout, { passive: true });
  addEventListener("pointermove", (event) => {
    pointerTarget.x = (event.clientX / innerWidth - 0.5) * 2;
    pointerTarget.y = (event.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  if (reduced) {
    running = true;
    render();
    running = false;
    return;
  }

  new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) play();
    else pause();
  }).observe(canvas);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
    else play();
  });
  play();
}
