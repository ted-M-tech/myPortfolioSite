import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Orb = {
  mesh: THREE.Mesh;
  origin: THREE.Vector3;
  phase: number;
  amplitude: number;
  speed: number;
};

const palette = [
  0xc9d2ea,
  0xe7d8de,
  0xd3e2df,
  0xefe4cf,
] as const;

function createOrbMaterial(index: number) {
  const isDark = index % 5 === 0;
  return new THREE.MeshPhysicalMaterial({
    color: isDark ? 0x111110 : palette[index % palette.length],
    roughness: isDark ? 0.08 : 0.22,
    metalness: isDark ? 0.48 : 0.04,
    clearcoat: 1,
    clearcoatRoughness: isDark ? 0.08 : 0.18,
    envMapIntensity: isDark ? 1.25 : 0.85,
  });
}

/**
 * A restrained geometric hero inspired by editorial WebGL work:
 * glossy spheres, the MaePace pastel palette, and slow cinematic movement.
 */
export function initHeroGeometry(canvas: HTMLCanvasElement) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileAtStart = innerWidth < 720;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x171716, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x171716);
  scene.fog = new THREE.FogExp2(0x171716, 0.035);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  camera.position.set(0, 0, 11);

  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(environment).texture;
  environment.dispose();
  pmrem.dispose();

  scene.add(new THREE.HemisphereLight(0xffffff, 0x252321, 2.2));

  const warm = new THREE.PointLight(0xf0d5c4, 32, 20, 1.5);
  warm.position.set(-4, 3, 5);
  scene.add(warm);

  const cool = new THREE.PointLight(0xc9d2ea, 28, 18, 1.6);
  cool.position.set(5, -1, 4);
  scene.add(cool);

  const group = new THREE.Group();
  scene.add(group);

  const count = mobileAtStart ? 11 : 17;
  const orbs: Orb[] = [];
  const sphereGeometry = new THREE.SphereGeometry(1, mobileAtStart ? 36 : 52, mobileAtStart ? 24 : 36);

  for (let index = 0; index < count; index += 1) {
    const mesh = new THREE.Mesh(sphereGeometry, createOrbMaterial(index));
    const column = index % 6;
    const row = Math.floor(index / 6);
    const x = -6.2 + column * 2.45 + (row % 2) * 0.8;
    const y = 2.3 - row * 2.5 + Math.sin(index * 1.7) * 0.65;
    const z = Math.cos(index * 1.31) * 1.7 - 0.4;
    const scale = 0.52 + (index * 0.37 % 1) * 0.78;

    mesh.position.set(x, y, z);
    mesh.scale.setScalar(scale);
    group.add(mesh);
    orbs.push({
      mesh,
      origin: new THREE.Vector3(x, y, z),
      phase: index * 0.74,
      amplitude: 0.12 + (index % 4) * 0.045,
      speed: 0.14 + (index % 5) * 0.018,
    });
  }

  const ringMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xe7d8de,
    roughness: 0.18,
    metalness: 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.14,
    envMapIntensity: 0.9,
  });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.22, 24, 96), ringMaterial);
  ring.position.set(3.25, 1.1, -0.6);
  ring.rotation.set(0.72, 0.18, 0.3);
  group.add(ring);

  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  let width = 1;
  let height = 1;
  let raf = 0;
  let running = false;
  let startedAt = performance.now();
  let elapsedBeforePause = 0;

  const layout = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(devicePixelRatio || 1, width < 720 ? 1.2 : 1.55);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = width < 620 ? 13.8 : width < 960 ? 12.3 : 11;
    camera.updateProjectionMatrix();
  };

  const render = () => {
    if (!running && !reduced) return;
    const elapsed = reduced
      ? 8
      : elapsedBeforePause + (performance.now() - startedAt) / 1000;

    pointer.lerp(pointerTarget, 0.035);
    camera.position.x = pointer.x * 0.32;
    camera.position.y = -pointer.y * 0.2;
    camera.lookAt(pointer.x * 0.12, pointer.y * -0.08, 0);

    orbs.forEach((orb, index) => {
      orb.mesh.position.x = orb.origin.x + Math.sin(elapsed * orb.speed + orb.phase) * orb.amplitude;
      orb.mesh.position.y = orb.origin.y + Math.cos(elapsed * (orb.speed * 1.2) + orb.phase) * orb.amplitude;
      orb.mesh.rotation.y = elapsed * (0.025 + index * 0.0008);
    });

    group.position.x = Math.sin(elapsed * 0.055) * 0.32;
    group.position.y = Math.cos(elapsed * 0.07) * 0.12;
    ring.rotation.x = 0.72 + Math.sin(elapsed * 0.1) * 0.16;
    ring.rotation.y = 0.18 + elapsed * 0.04;
    renderer.render(scene, camera);

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
