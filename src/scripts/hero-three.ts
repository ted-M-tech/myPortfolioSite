import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

type ArchitectureNode = {
  group: THREE.Group;
  origin: THREE.Vector3;
  target: THREE.Vector3;
  rotation: THREE.Euler;
  delay: number;
  core: boolean;
};

type Connection = {
  from: ArchitectureNode;
  to: ArchitectureNode;
  line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  signal: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  offset: number;
};

type GeometryView = {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  group: THREE.Group;
  nodes: ArchitectureNode[];
  connections: Connection[];
  halo: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial> | null;
  generative: {
    form: THREE.Mesh<THREE.TorusKnotGeometry, THREE.MeshPhysicalMaterial>;
    rings: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>[];
    particles: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>[];
  } | null;
  width: number;
  height: number;
};

type ModuleDefinition = {
  title: string;
  meta: string;
};

const moduleSets: readonly (readonly ModuleDefinition[])[] = [
  [
    { title: "AGENT 01", meta: "ANALYZE" },
    { title: "ROUTER", meta: "ORCHESTRATE" },
    { title: "AGENT 02", meta: "CHALLENGE" },
    { title: "AGENT 03", meta: "VERIFY" },
    { title: "SYNTHESIS", meta: "DECIDE" },
  ],
  [
    { title: "AUTH", meta: "GUARD" },
    { title: "API", meta: "ROUTE" },
    { title: "QUEUE", meta: "EVENT" },
    { title: "DATA", meta: "STORE" },
    { title: "CACHE", meta: "SPEED" },
  ],
  [
    { title: "TEST", meta: "VERIFY" },
    { title: "CI / CD", meta: "AUTOMATE" },
    { title: "CLOUD", meta: "RUNTIME" },
    { title: "OBSERVE", meta: "MEASURE" },
    { title: "LIVE", meta: "SHIP" },
  ],
] as const;

const colors = [
  [0xe5d9df, 0xe7b99e, 0xd7e2df, 0xcdd7eb, 0x1d1d1b],
  [0xcbd6ea, 0xe5d9df, 0xd8e3df, 0x1d1d1b, 0xefe4cf],
  [0xd5e3de, 0xefd8c9, 0xcbd6ea, 0x1d1d1b, 0xe7dce1],
] as const;

const targets = [
  new THREE.Vector3(-1.42, 1.15, -0.12),
  new THREE.Vector3(0, 0.08, 0.22),
  new THREE.Vector3(1.42, 1.15, -0.08),
  new THREE.Vector3(-1.42, -1.18, 0.02),
  new THREE.Vector3(1.42, -1.18, 0),
] as const;

const origins = [
  new THREE.Vector3(-4.8, 2.7, 1.6),
  new THREE.Vector3(0.2, 4.1, -1.8),
  new THREE.Vector3(4.9, 2.5, 1.3),
  new THREE.Vector3(-4.5, -3.1, -1.2),
  new THREE.Vector3(4.6, -3.2, 1.5),
] as const;

const connectionPairs = [
  [0, 1],
  [1, 2],
  [1, 3],
  [1, 4],
] as const;

const clamp01 = (value: number) => THREE.MathUtils.clamp(value, 0, 1);
const ease = (value: number) => {
  const clamped = clamp01(value);
  return 1 - Math.pow(1 - clamped, 4);
};

function createLabelTexture(title: string, meta: string, lightText: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 240;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create architecture label");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = lightText ? "#f5f2ed" : "#171716";
  context.font = "600 58px Inter, Arial, sans-serif";
  context.fillText(title, 320, 100);
  context.globalAlpha = 0.52;
  context.font = "500 24px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.letterSpacing = "5px";
  context.fillText(meta, 320, 170);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

function createModule(
  definition: ModuleDefinition,
  color: number,
  index: number,
  viewIndex: number,
) {
  const dark = color === 0x1d1d1b;
  const group = new THREE.Group();
  const geometry = new RoundedBoxGeometry(1.62, 0.76, 0.34, 5, 0.13);
  const material = new THREE.MeshPhysicalMaterial({
    color,
    roughness: dark ? 0.16 : 0.24,
    metalness: dark ? 0.32 : 0.02,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
    envMapIntensity: dark ? 1.15 : 0.82,
  });
  const box = new THREE.Mesh(geometry, material);
  box.castShadow = false;
  box.receiveShadow = false;
  group.add(box);

  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(1.45, 0.56),
    new THREE.MeshBasicMaterial({
      map: createLabelTexture(definition.title, definition.meta, dark),
      transparent: true,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  label.position.z = 0.181;
  group.add(label);

  const indicator = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 18, 12),
    new THREE.MeshBasicMaterial({
      color: index === 1 ? 0xff7a45 : 0xf6f1eb,
      toneMapped: false,
    }),
  );
  indicator.position.set(-0.68, 0.25, 0.19);
  group.add(indicator);

  const origin = origins[index].clone();
  origin.x += (viewIndex - 1) * 0.36;
  origin.y += ((index + viewIndex) % 2 === 0 ? 0.35 : -0.25);
  const target = targets[index].clone();
  const rotation = new THREE.Euler(
    ((index % 3) - 1) * 0.44,
    ((index % 2) * 2 - 1) * 0.58,
    ((index % 4) - 1.5) * 0.24,
  );

  group.position.copy(origin);
  group.rotation.copy(rotation);

  return {
    group,
    origin,
    target,
    rotation,
    delay: index * 0.28 + viewIndex * 0.12,
    core: index === 1,
  } satisfies ArchitectureNode;
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
  renderer.toneMappingExposure = 1.02;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x171716);
  scene.fog = new THREE.FogExp2(0x171716, 0.055);

  const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 40);
  camera.position.set(0, 0, compact ? 9.7 : 8.5);

  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(environment).texture;
  environment.dispose();
  pmrem.dispose();

  scene.add(new THREE.HemisphereLight(0xffffff, 0x242321, 2.15));

  const warm = new THREE.PointLight(0xf2c2a8, 24, 15, 1.7);
  warm.position.set(-3, 3, 4);
  scene.add(warm);

  const cool = new THREE.PointLight(0xb7c9ee, 22, 15, 1.7);
  cool.position.set(3, -1, 4);
  scene.add(cool);

  const group = new THREE.Group();
  scene.add(group);

  const definitions = viewIndex === 2 ? [] : (moduleSets[viewIndex] ?? moduleSets[0]);
  const viewColors = colors[viewIndex] ?? colors[0];
  const nodes = definitions.map((definition, index) => {
    const node = createModule(definition, viewColors[index], index, viewIndex);
    group.add(node.group);
    return node;
  });

  const pairs = viewIndex === 2 ? [] : connectionPairs;
  const connections = pairs.map(([fromIndex, toIndex], index) => {
    const from = nodes[fromIndex];
    const to = nodes[toIndex];
    const geometry = new THREE.BufferGeometry().setFromPoints([from.target, to.target]);
    const line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: index === 0 ? 0xe99468 : 0xbcc9e2,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    );
    line.position.z = -0.2;
    group.add(line);

    const signal = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 18, 12),
      new THREE.MeshBasicMaterial({
        color: index === 0 ? 0xff8a54 : 0xdce6ff,
        transparent: true,
        opacity: 0,
        toneMapped: false,
        depthWrite: false,
      }),
    );
    signal.position.copy(from.target);
    signal.position.z = 0.35;
    group.add(signal);

    return {
      from,
      to,
      line,
      signal,
      offset: index * 0.23 + viewIndex * 0.09,
    } satisfies Connection;
  });

  let halo: GeometryView["halo"] = null;
  if (viewIndex === 0) {
    halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.02, 0.018, 12, 100),
      new THREE.MeshBasicMaterial({
        color: 0xf28b5b,
        transparent: true,
        opacity: 0,
        toneMapped: false,
        depthWrite: false,
      }),
    );
    halo.position.copy(nodes[1].target);
    halo.position.z = -0.08;
    halo.rotation.x = 0.18;
    group.add(halo);
  }

  let generative: GeometryView["generative"] = null;
  if (viewIndex === 2) {
    const form = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.08, 0.22, 180, 22, 2, 3),
      new THREE.MeshPhysicalMaterial({
        color: 0xe7dce6,
        roughness: 0.18,
        metalness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        transmission: 0.12,
        envMapIntensity: 1.2,
      }),
    );
    form.rotation.set(0.62, 0.15, -0.28);
    group.add(form);

    const rings = [1.62, 2.04, 2.42].map((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.012, 8, 120),
        new THREE.MeshBasicMaterial({
          color: index === 1 ? 0xf28b5b : 0x9eb3e9,
          transparent: true,
          opacity: index === 1 ? 0.48 : 0.26,
          toneMapped: false,
        }),
      );
      ring.rotation.set(1.12 + index * 0.19, index * 0.42, index * 0.31);
      group.add(ring);
      return ring;
    });

    const particles = Array.from({ length: 28 }, (_, index) => {
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(index % 7 === 0 ? 0.065 : 0.035, 14, 10),
        new THREE.MeshBasicMaterial({
          color: index % 5 === 0 ? 0xff8a54 : 0xdce6ff,
          transparent: true,
          opacity: index % 3 === 0 ? 0.92 : 0.52,
          toneMapped: false,
        }),
      );
      group.add(particle);
      return particle;
    });

    generative = { form, rings, particles };
  }

  return {
    canvas,
    renderer,
    scene,
    camera,
    group,
    nodes,
    connections,
    halo,
    generative,
    width: 0,
    height: 0,
  };
}

/**
 * Three architecture slices assemble from loose modules into a working system.
 * Once locked, signals move AI → API/data → production to show software in motion.
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
    view.camera.position.z = width < 300 ? 10.6 : 8.5;
    view.camera.updateProjectionMatrix();
  };

  const layout = () => views.forEach(layoutView);

  const render = () => {
    if (!running && !reduced) return;
    const elapsed = reduced
      ? 5.5
      : elapsedBeforePause + (performance.now() - startedAt) / 1000;
    const cycle = reduced ? 5.5 : elapsed % 12;

    pointer.lerp(pointerTarget, 0.035);
    views.forEach((view, viewIndex) => {
      view.camera.position.x = pointer.x * 0.16;
      view.camera.position.y = -pointer.y * 0.1;
      view.camera.lookAt(pointer.x * 0.06, pointer.y * -0.04, 0);

      let systemProgress = 1;
      view.nodes.forEach((node, nodeIndex) => {
        const enter = ease((cycle - 0.35 - node.delay) / 1.45);
        const leave = ease((cycle - 9.65 - nodeIndex * 0.08) / 1.15);
        const progress = enter * (1 - leave);
        systemProgress = Math.min(systemProgress, progress);

        node.group.position.lerpVectors(node.origin, node.target, progress);
        node.group.rotation.set(
          node.rotation.x * (1 - progress),
          node.rotation.y * (1 - progress),
          node.rotation.z * (1 - progress),
        );

        const breathe = node.core && progress > 0.98
          ? 1 + Math.sin(elapsed * 2.4 + viewIndex) * 0.018
          : 0.84 + progress * 0.16;
        node.group.scale.setScalar(breathe);
      });

      const live = THREE.MathUtils.smoothstep(systemProgress, 0.72, 1);
      view.connections.forEach((connection, index) => {
        connection.line.material.opacity = live * (index === 0 ? 0.62 : 0.34);
        connection.signal.material.opacity = live;
        const progress = (elapsed * (0.2 + viewIndex * 0.018) + connection.offset) % 1;
        connection.signal.position.lerpVectors(
          connection.from.target,
          connection.to.target,
          progress,
        );
        connection.signal.position.z = 0.36;
        const pulse = 0.78 + Math.sin(elapsed * 5 + index) * 0.18;
        connection.signal.scale.setScalar(pulse);
      });

      if (view.halo) {
        view.halo.material.opacity = live * 0.52;
        view.halo.rotation.z = elapsed * 0.08;
        const haloPulse = 1 + Math.sin(elapsed * 1.7) * 0.035;
        view.halo.scale.setScalar(haloPulse);
      }

      if (view.generative) {
        const { form, rings, particles } = view.generative;
        form.rotation.x = 0.62 + Math.sin(elapsed * 0.31) * 0.12;
        form.rotation.y = elapsed * 0.22;
        form.rotation.z = -0.28 + Math.cos(elapsed * 0.27) * 0.1;
        const formPulse = 0.94 + Math.sin(elapsed * 0.72) * 0.05;
        form.scale.setScalar(formPulse);

        rings.forEach((ring, index) => {
          ring.rotation.z += (0.0008 + index * 0.00035) * (index % 2 ? -1 : 1);
          ring.rotation.y += 0.00045 * (index + 1);
        });

        particles.forEach((particle, index) => {
          const lane = index % 3;
          const angle = elapsed * (0.18 + lane * 0.035) + index * 0.82;
          const radius = 1.46 + lane * 0.48 + Math.sin(index * 2.1) * 0.12;
          particle.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle * (1.2 + lane * 0.08)) * (0.82 + lane * 0.2),
            Math.sin(angle) * 0.62,
          );
          const pulse = 0.72 + Math.sin(elapsed * 2.2 + index) * 0.25;
          particle.scale.setScalar(pulse);
        });
      }

      view.group.rotation.y = pointer.x * 0.025;
      view.group.rotation.x = pointer.y * 0.018;
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
