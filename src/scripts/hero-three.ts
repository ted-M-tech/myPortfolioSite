import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Orb = {
  mesh: THREE.Mesh;
  origin: THREE.Vector3;
  phase: number;
  amplitude: number;
  speed: number;
};

type GeometryView = {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  group: THREE.Group;
  orbs: Orb[];
  ring: THREE.Mesh | null;
  width: number;
  height: number;
};

const palette = [0xc9d2ea, 0xe7d8de, 0xd3e2df, 0xefe4cf] as const;

function createMaterial(viewIndex: number, orbIndex: number) {
  const isDark = (viewIndex + orbIndex) % 4 === 0;
  return new THREE.MeshPhysicalMaterial({
    color: isDark ? 0x111110 : palette[(viewIndex + orbIndex) % palette.length],
    roughness: isDark ? 0.07 : 0.2,
    metalness: isDark ? 0.5 : 0.03,
    clearcoat: 1,
    clearcoatRoughness: isDark ? 0.06 : 0.16,
    envMapIntensity: isDark ? 1.3 : 0.9,
  });
}

function createView(canvas: HTMLCanvasElement, viewIndex: number, compact: boolean): GeometryView {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x171716, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x171716);
  scene.fog = new THREE.FogExp2(0x171716, 0.048);

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
  camera.position.set(0, 0, compact ? 9.7 : 8.7);

  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(environment).texture;
  environment.dispose();
  pmrem.dispose();

  scene.add(new THREE.HemisphereLight(0xffffff, 0x242321, 2.35));

  const warm = new THREE.PointLight(0xf0d5c4, 30, 16, 1.55);
  warm.position.set(-3, 3, 4);
  scene.add(warm);

  const cool = new THREE.PointLight(0xc9d2ea, 26, 15, 1.6);
  cool.position.set(3, -1, 4);
  scene.add(cool);

  const group = new THREE.Group();
  scene.add(group);

  const sphereGeometry = new THREE.SphereGeometry(1, compact ? 30 : 44, compact ? 20 : 30);
  const orbs: Orb[] = [];
  const count = compact ? 5 : 7;

  for (let orbIndex = 0; orbIndex < count; orbIndex += 1) {
    const mesh = new THREE.Mesh(sphereGeometry, createMaterial(viewIndex, orbIndex));
    const angle = orbIndex * 1.82 + viewIndex * 0.9;
    const radius = 1.25 + (orbIndex % 3) * 0.72;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 1.28;
    const z = Math.cos(angle * 1.4) * 1.15;
    const scale = 0.55 + ((orbIndex * 0.37 + viewIndex * 0.16) % 1) * 0.72;

    mesh.position.set(x, y, z);
    mesh.scale.setScalar(scale);
    group.add(mesh);
    orbs.push({
      mesh,
      origin: new THREE.Vector3(x, y, z),
      phase: orbIndex * 0.78 + viewIndex,
      amplitude: 0.1 + (orbIndex % 3) * 0.045,
      speed: 0.13 + (orbIndex % 4) * 0.02,
    });
  }

  let ring: THREE.Mesh | null = null;
  if (viewIndex === 1) {
    ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.15, 0.19, 20, 80),
      new THREE.MeshPhysicalMaterial({
        color: 0xe7d8de,
        roughness: 0.18,
        metalness: 0.04,
        clearcoat: 1,
        clearcoatRoughness: 0.14,
        envMapIntensity: 0.9,
      }),
    );
    ring.position.set(0.7, 0.3, -0.35);
    ring.rotation.set(0.72, 0.18, 0.3);
    group.add(ring);
  }

  return {
    canvas,
    renderer,
    scene,
    camera,
    group,
    orbs,
    ring,
    width: 0,
    height: 0,
  };
}

/**
 * Three independent viewports move as coordinated puzzle pieces.
 * Keeping each pane structurally whole prevents the thin-line mask artifacts
 * that occurred when paper-colored overlays covered a single WebGL canvas.
 */
export function initHeroGeometry(canvases: HTMLCanvasElement[]) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const compact = innerWidth < 720;
  const views = canvases.map((canvas, index) => createView(canvas, index, compact));
  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  let raf = 0;
  let running = false;
  let startedAt = performance.now();
  let elapsedBeforePause = 0;

  const layoutView = (view: GeometryView) => {
    const rect = view.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    if (view.width === width && view.height === height) return;

    view.width = width;
    view.height = height;
    const dpr = Math.min(devicePixelRatio || 1, width < 360 ? 1.15 : 1.45);
    view.renderer.setPixelRatio(dpr);
    view.renderer.setSize(width, height, false);
    view.camera.aspect = width / height;
    view.camera.position.z = width < 300 ? 10.2 : 8.7;
    view.camera.updateProjectionMatrix();
  };

  const layout = () => views.forEach(layoutView);

  const render = () => {
    if (!running && !reduced) return;
    const elapsed = reduced
      ? 8
      : elapsedBeforePause + (performance.now() - startedAt) / 1000;

    pointer.lerp(pointerTarget, 0.035);
    views.forEach((view, viewIndex) => {
      view.camera.position.x = pointer.x * 0.18;
      view.camera.position.y = -pointer.y * 0.12;
      view.camera.lookAt(pointer.x * 0.07, pointer.y * -0.05, 0);

      view.orbs.forEach((orb, orbIndex) => {
        orb.mesh.position.x = orb.origin.x
          + Math.sin(elapsed * orb.speed + orb.phase) * orb.amplitude;
        orb.mesh.position.y = orb.origin.y
          + Math.cos(elapsed * orb.speed * 1.18 + orb.phase) * orb.amplitude;
        orb.mesh.rotation.y = elapsed * (0.02 + orbIndex * 0.001);
      });

      view.group.position.x = Math.sin(elapsed * 0.055 + viewIndex) * 0.16;
      view.group.position.y = Math.cos(elapsed * 0.07 + viewIndex) * 0.1;
      if (view.ring) {
        view.ring.rotation.x = 0.72 + Math.sin(elapsed * 0.1) * 0.14;
        view.ring.rotation.y = 0.18 + elapsed * 0.035;
      }
      view.renderer.render(view.scene, view.camera);
    });

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
  }).observe(canvases[0]);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
    else play();
  });

  play();
}
