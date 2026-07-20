import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const TAU = Math.PI * 2;

type OrbitBand = {
  points: THREE.Points;
  line: THREE.Line;
  speed: number;
  phase: number;
};

function createLaptop() {
  const laptop = new THREE.Group();
  const shell = new THREE.MeshStandardMaterial({
    color: 0x18191c,
    metalness: 0.72,
    roughness: 0.32,
  });

  const base = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.055, 0.74), shell);
  base.rotation.x = -0.12;
  base.position.set(0, -0.32, 0.1);
  laptop.add(base);

  const lid = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.78, 0.045), shell);
  lid.position.set(0, 0.08, -0.25);
  lid.rotation.x = -0.08;
  laptop.add(lid);

  const displayCanvas = document.createElement("canvas");
  displayCanvas.width = 512;
  displayCanvas.height = 320;
  const ctx = displayCanvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 512, 320);
    gradient.addColorStop(0, "#090b11");
    gradient.addColorStop(1, "#160c08");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 320);
    ctx.fillStyle = "#ff7440";
    ctx.fillRect(40, 38, 92, 4);
    ctx.fillStyle = "rgba(241,238,232,.72)";
    ctx.fillRect(40, 66, 248, 4);
    ctx.fillStyle = "rgba(85,112,255,.82)";
    ctx.fillRect(40, 104, 344, 5);
    ctx.fillStyle = "rgba(241,238,232,.36)";
    ctx.fillRect(40, 136, 210, 4);
    ctx.fillStyle = "rgba(255,116,64,.72)";
    ctx.fillRect(40, 168, 292, 5);
    ctx.fillStyle = "rgba(241,238,232,.28)";
    ctx.fillRect(40, 200, 166, 4);
  }

  const displayTexture = new THREE.CanvasTexture(displayCanvas);
  displayTexture.colorSpace = THREE.SRGBColorSpace;
  const display = new THREE.Mesh(
    new THREE.PlaneGeometry(1.1, 0.66),
    new THREE.MeshBasicMaterial({
      map: displayTexture,
      toneMapped: false,
    }),
  );
  display.position.set(0, 0.08, -0.226);
  display.rotation.x = -0.08;
  display.rotation.y = Math.PI;
  laptop.add(display);

  return laptop;
}

function createFallbackEngineer() {
  const avatar = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xa96f50, roughness: 0.76 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x151311, roughness: 0.9 });
  const top = new THREE.MeshStandardMaterial({
    color: 0x222936,
    roughness: 0.64,
    metalness: 0.04,
  });
  const bottom = new THREE.MeshStandardMaterial({ color: 0x111317, roughness: 0.8 });

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.52, 1.08, 7, 16), top);
  torso.scale.set(1, 1, 0.68);
  torso.position.y = 0.25;
  avatar.add(torso);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.37, 24, 18), skin);
  head.scale.set(0.88, 1.08, 0.9);
  head.position.set(0, 1.34, 0.02);
  avatar.add(head);

  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.385, 20, 12, 0, TAU, 0, Math.PI * 0.56),
    hair,
  );
  hairCap.scale.set(0.9, 0.67, 0.92);
  hairCap.position.set(0, 1.56, 0);
  avatar.add(hairCap);

  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.98, 6, 12), top);
    arm.position.set(side * 0.61, 0.22, 0.02);
    arm.rotation.z = side * -0.2;
    avatar.add(arm);

    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 1.14, 6, 12), bottom);
    leg.position.set(side * 0.24, -1.16, 0);
    avatar.add(leg);
  });

  return avatar;
}

function createOrbitLine(radiusX: number, radiusY: number, depth: number, color: number) {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i <= 240; i += 1) {
    const angle = (i / 240) * TAU;
    positions.push(new THREE.Vector3(
      Math.cos(angle) * radiusX,
      Math.sin(angle) * radiusY,
      Math.sin(angle * 2.0) * depth,
    ));
  }

  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(positions),
    new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
}

function createOrbitBand(
  radiusX: number,
  radiusY: number,
  depth: number,
  count: number,
  colorA: THREE.Color,
  colorB: THREE.Color,
  speed: number,
  phase: number,
): OrbitBand {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const progress = i / count;
    const angle = progress * TAU;
    const wave = Math.sin(angle * 17 + phase) * 0.5 + 0.5;
    const jitter = (Math.random() - 0.5) * 0.095;
    const radialJitter = 1 + (Math.random() - 0.5) * 0.045;
    const zJitter = (Math.random() - 0.5) * 0.14;

    positions[i * 3] = Math.cos(angle + jitter) * radiusX * radialJitter;
    positions[i * 3 + 1] = Math.sin(angle + jitter) * radiusY * radialJitter;
    positions[i * 3 + 2] = Math.sin(angle * 2 + phase) * depth + zJitter;

    const color = colorA.clone().lerp(colorB, wave);
    const brightness = 0.55 + Math.random() * 0.45;
    colors[i * 3] = color.r * brightness;
    colors[i * 3 + 1] = color.g * brightness;
    colors[i * 3 + 2] = color.b * brightness;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.025,
      transparent: true,
      opacity: 0.64,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  );

  const line = createOrbitLine(radiusX, radiusY, depth, colorA.getHex());
  return { points, line, speed, phase };
}

function createDataField(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const orange = new THREE.Color(0xff6b35);
  const blue = new THREE.Color(0x6078ff);

  for (let i = 0; i < count; i += 1) {
    const radius = 3.2 + Math.pow(Math.random(), 0.56) * 8.4;
    const angle = Math.random() * TAU;
    const height = (Math.random() - 0.5) * 8.8;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = height;
    positions[i * 3 + 2] = Math.sin(angle) * radius - 2.4;

    const color = blue.clone().lerp(orange, Math.random() * 0.22);
    const brightness = 0.28 + Math.random() * 0.54;
    colors[i * 3] = color.r * brightness;
    colors[i * 3 + 1] = color.g * brightness;
    colors[i * 3 + 2] = color.b * brightness;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.022,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  );
}

/**
 * A cinematic but restrained Three.js hero. The imported GLB remains the core;
 * thousands of lightweight GPU points express data moving around the engineer.
 */
export function initHeroThree(canvas: HTMLCanvasElement) {
  const mobileAtStart = innerWidth < 720;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x080807, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080807);
  scene.fog = new THREE.FogExp2(0x080807, 0.05);

  const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 100);
  camera.position.set(0, 0.15, 9.6);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.58, 0.72, 0.34);
  composer.addPass(bloom);

  scene.add(new THREE.HemisphereLight(0xa9b7dd, 0x160c08, 1.55));

  const key = new THREE.SpotLight(0xffa176, 58, 22, Math.PI / 4, 0.82, 1.45);
  key.position.set(5, 6.5, 6);
  scene.add(key);

  const rim = new THREE.PointLight(0x5874ff, 36, 15, 1.85);
  rim.position.set(-3.4, 1.6, -3.2);
  scene.add(rim);

  const system = new THREE.Group();
  scene.add(system);

  const engineer = new THREE.Group();
  system.add(engineer);

  const haloMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6933,
    transparent: true,
    opacity: 0.24,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const halo = new THREE.Mesh(new THREE.RingGeometry(1.58, 1.595, 160), haloMaterial);
  halo.position.z = -0.64;
  engineer.add(halo);

  const innerHalo = new THREE.Mesh(
    new THREE.RingGeometry(1.31, 1.318, 160),
    haloMaterial.clone(),
  );
  innerHalo.position.z = -0.68;
  innerHalo.rotation.z = 0.36;
  engineer.add(innerHalo);

  const coreGlow = new THREE.PointLight(0xff6633, 14, 6, 1.65);
  coreGlow.position.set(0, 0.35, 1.1);
  engineer.add(coreGlow);

  const laptop = createLaptop();
  laptop.position.set(0, -0.05, 1.02);
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
          if (!(material instanceof THREE.MeshStandardMaterial)) return;
          material.roughness = Math.min(0.86, material.roughness + 0.18);
          material.metalness = Math.min(0.12, material.metalness);
          material.envMapIntensity = 0.28;
        });
      });

      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      model.scale.setScalar(3.68 / Math.max(size.y, 0.01));
      const scaledBounds = new THREE.Box3().setFromObject(model);
      model.position.sub(scaledBounds.getCenter(new THREE.Vector3()));
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
  orbitRoot.rotation.set(-0.08, 0, -0.06);
  system.add(orbitRoot);

  const orbitCount = mobileAtStart ? 620 : 1480;
  const orange = new THREE.Color(0xff6933);
  const blue = new THREE.Color(0x5973ff);
  const paper = new THREE.Color(0xe8e4de);
  const bands = [
    createOrbitBand(3.62, 1.42, 0.7, orbitCount, orange, paper, 0.03, 0.2),
    createOrbitBand(3.13, 1.88, 0.9, Math.round(orbitCount * 0.82), blue, paper, -0.022, 1.8),
    createOrbitBand(2.58, 1.12, 1.1, Math.round(orbitCount * 0.68), orange, blue, 0.038, 3.4),
  ];
  bands.forEach((band) => orbitRoot.add(band.points, band.line));

  const dataField = createDataField(mobileAtStart ? 420 : 980);
  scene.add(dataField);

  const pointer = new THREE.Vector2();
  const pointerTarget = new THREE.Vector2();
  const systemTarget = new THREE.Vector3();
  const systemPosition = new THREE.Vector3();
  let targetScale = 1;
  let width = 1;
  let height = 1;
  let raf = 0;
  let running = false;
  let startedAt = performance.now();
  let elapsedBeforePause = 0;

  const setTargets = (introActive: boolean) => {
    const mobile = width < 900;
    if (introActive) {
      systemTarget.set(0, mobile ? 0.15 : 0.04, 0);
      targetScale = mobile ? 1.08 : 1.18;
    } else {
      systemTarget.set(mobile ? 0 : 2.48, mobile ? 1.68 : 0.02, 0);
      targetScale = mobile ? 0.78 : 0.92;
    }
  };

  const layout = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(devicePixelRatio || 1, width < 720 ? 1.15 : 1.55);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    composer.setPixelRatio(dpr);
    composer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = width < 700 ? 11.7 : width < 980 ? 10.6 : 9.6;
    camera.updateProjectionMatrix();
    setTargets(document.documentElement.classList.contains("intro-active"));
    if (!running) {
      system.position.copy(systemTarget);
      system.scale.setScalar(targetScale);
    }
  };

  const render = () => {
    if (!running && !reduced) return;
    const elapsed = reduced
      ? 8.4
      : elapsedBeforePause + (performance.now() - startedAt) / 1000;
    const introActive = document.documentElement.classList.contains("intro-active");
    setTargets(introActive);

    pointer.lerp(pointerTarget, 0.04);
    systemPosition.copy(system.position).lerp(systemTarget, introActive ? 0.055 : 0.035);
    system.position.copy(systemPosition);
    const nextScale = THREE.MathUtils.lerp(system.scale.x, targetScale, introActive ? 0.05 : 0.035);
    system.scale.setScalar(nextScale);

    camera.position.x = pointer.x * (introActive ? 0.22 : 0.42);
    camera.position.y = 0.15 - pointer.y * (introActive ? 0.14 : 0.25);
    camera.lookAt(introActive ? 0 : 0.72, 0.06, 0);

    const motion = introActive ? 2.4 : 1;
    bands.forEach((band, index) => {
      band.points.rotation.z = elapsed * band.speed * motion + band.phase * 0.015;
      band.line.rotation.z = elapsed * band.speed * motion;
      const material = band.points.material as THREE.PointsMaterial;
      material.opacity = introActive ? 0.82 : 0.46 - index * 0.06;
    });

    orbitRoot.rotation.y = Math.sin(elapsed * 0.11) * 0.08 + pointer.x * 0.12;
    engineer.rotation.y = Math.sin(elapsed * 0.29) * 0.035 + pointer.x * 0.07;
    engineer.position.y = Math.sin(elapsed * 0.68) * 0.018;
    halo.rotation.z = elapsed * 0.035;
    innerHalo.rotation.z = -elapsed * 0.028 + 0.36;
    laptop.rotation.z = Math.sin(elapsed * 0.52) * 0.012;
    dataField.rotation.y = elapsed * 0.007;
    dataField.rotation.z = elapsed * 0.003;
    coreGlow.intensity = (introActive ? 18 : 10.5) + Math.sin(elapsed * 1.2) * 1.8;
    bloom.strength = THREE.MathUtils.lerp(
      bloom.strength,
      introActive ? 0.78 : 0.48,
      0.025,
    );
    if (avatarObject) avatarObject.rotation.x = pointer.y * 0.018;

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
