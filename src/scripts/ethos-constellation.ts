/**
 * Knowledge graph — light field.
 *
 * Fragments of knowledge start scattered across the field. As the section comes
 * into view they reorganize into six loose domains, the domains resolve into one
 * point of view (the MaePace mark), and that resolved signal renders into a
 * single output.
 *
 * Deliberately quiet: hairline edges, small dots, low-contrast ink on paper.
 * The hero owns the loud motion on this page — this section must not compete.
 * Nodes drift and converge; they never jitter, and nothing glows.
 */

type GraphNode = {
  /** Where the fragment sits before it belongs to anything. */
  sx: number;
  sy: number;
  /** Where it settles once its domain forms. */
  x: number;
  y: number;
  r: number;
  cluster: number;
  phase: number;
  /** 0 = far, 1 = near. Drives size, opacity and parallax. */
  depth: number;
};

type Edge = { a: number; b: number; strength: number };

/**
 * Domain colours. Muted derivatives of the pastel tokens, darkened just enough
 * to hold their own against paper without turning into signal lights.
 */
const COLORS = [
  [123, 138, 178],
  [174, 141, 154],
  [124, 165, 156],
  [181, 158, 111],
  [148, 137, 176],
  [193, 133, 105],
] as const;

const INK = "20,17,15";

export function initEthosConstellation(
  stage: HTMLElement,
  canvas: HTMLCanvasElement,
  hubs: HTMLElement[],
  center: HTMLElement,
  output: HTMLElement,
) {
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;
  const ctx = context;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(2, devicePixelRatio || 1);

  let w = 0;
  let h = 0;
  let nodes: GraphNode[] = [];
  let edges: Edge[] = [];
  let hubPoints: { x: number; y: number }[] = [];
  let corePoint = { x: 0, y: 0 };
  let outputPoint = { x: 0, y: 0 };
  let raf = 0;
  let looping = false;
  let target = 0;
  let progress = 0;
  /** Parallax lean, in the range -1..1. Eased towards the pointer. */
  let leanX = 0;
  let leanY = 0;
  let leanTargetX = 0;
  let leanTargetY = 0;

  const random = mulberry32(91427);

  function layout() {
    const mobile = w < 660;
    const clusterLayout = mobile
      ? [
          [.17, .17], [.50, .11], [.15, .55],
          [.44, .78], [.49, .33], [.79, .18],
        ]
      : [
          [.12, .25], [.30, .13], [.17, .71],
          [.40, .82], [.42, .37], [.66, .16],
        ];

    hubPoints = clusterLayout.map(([x, y]) => ({ x: x! * w, y: y! * h }));
    corePoint = mobile ? { x: w * .38, y: h * .49 } : { x: w * .60, y: h * .53 };
    outputPoint = mobile ? { x: w * .74, y: h * .70 } : { x: w * .85, y: h * .55 };

    nodes = [];
    const count = mobile ? 110 : 176;
    for (let i = 0; i < count; i++) {
      const cluster = i % hubPoints.length;
      const hub = hubPoints[cluster]!;
      const angle = random() * Math.PI * 2;
      const distance = Math.pow(random(), .64) * (mobile ? 104 : 150);
      const spreadX = mobile ? .74 : 1.12;
      const spreadY = mobile ? 1.05 : .68;
      const depth = random();
      nodes.push({
        sx: 20 + random() * (w - 40),
        sy: 30 + random() * (h - 60),
        x: clamp(hub.x + Math.cos(angle) * distance * spreadX, 16, w - 16),
        y: clamp(hub.y + Math.sin(angle) * distance * spreadY, 32, h - 30),
        r: .7 + depth * 1.5,
        cluster,
        phase: random() * Math.PI * 2,
        depth,
      });
    }

    // One canvas anchor under every visible domain label, always in the front plane.
    hubPoints.forEach((point, index) => {
      const anchor = nodes[index];
      if (!anchor) return;
      anchor.x = point.x;
      anchor.y = point.y;
      anchor.sx = point.x;
      anchor.sy = point.y;
      anchor.r = 2.6;
      anchor.cluster = index;
      anchor.depth = 1;
    });

    edges = [];
    for (let i = 0; i < nodes.length; i++) {
      const near: { index: number; distance: number }[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const a = nodes[i]!;
        const b = nodes[j]!;
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        const limit = a.cluster === b.cluster ? 100 : 58;
        if (distance < limit) near.push({ index: j, distance });
      }
      near.sort((a, b) => a.distance - b.distance);
      near.slice(0, 1 + (i % 4 === 0 ? 1 : 0)).forEach(({ index, distance }) => {
        if (index > i) edges.push({ a: i, b: index, strength: 1 - distance / 108 });
      });
    }
  }

  function resize() {
    const rect = stage.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layout();
  }

  const measure = () => {
    const rect = stage.getBoundingClientRect();
    target = clamp((innerHeight * .9 - rect.top) / (innerHeight * .72), 0, 1);
  };

  const draw = (time: number) => {
    if (!looping) return;
    progress += (target - progress) * (reduced ? 1 : .06);
    leanX += (leanTargetX - leanX) * (reduced ? 1 : .05);
    leanY += (leanTargetY - leanY) * (reduced ? 1 : .05);

    /** Fragments appear → gather into domains → relate → resolve → render. */
    const fragmentIn = ease((progress - .02) / .26);
    const gatherIn = ease((progress - .10) / .42);
    const relationsIn = ease((progress - .34) / .30);
    const conceptIn = ease((progress - .52) / .24);
    const outputIn = ease((progress - .72) / .24);

    ctx.clearRect(0, 0, w, h);

    const points = nodes.map((node, index) => {
      const drift = reduced ? 0 : Math.sin(time * .00016 + node.phase) * (.8 + node.depth * 1.4);
      const px = node.sx + (node.x - node.sx) * gatherIn;
      const py = node.sy + (node.y - node.sy) * gatherIn;
      return {
        index,
        x: px + Math.cos(node.phase) * drift + leanX * (2 + node.depth * 14),
        y: py + Math.sin(node.phase) * drift + leanY * (2 + node.depth * 10),
      };
    });

    // Hairline relationships. Only meaningful once the domains have formed.
    for (const edge of edges) {
      const a = points[edge.a]!;
      const b = points[edge.b]!;
      const alpha = (.07 + Math.max(0, edge.strength) * .13) * relationsIn;
      ctx.strokeStyle = `rgba(${INK},${alpha.toFixed(3)})`;
      ctx.lineWidth = .7;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    // Six domains resolve into one point of view.
    hubPoints.forEach((hub, index) => {
      const from = points[index] ?? hub;
      const bendX = (from.x + corePoint.x) / 2 + Math.sin(index * 2.1) * 26;
      const bendY = (from.y + corePoint.y) / 2 + Math.cos(index * 1.8) * 30;
      const color = COLORS[index % COLORS.length]!;
      const gradient = ctx.createLinearGradient(from.x, from.y, corePoint.x, corePoint.y);
      gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${(.34 * conceptIn).toFixed(3)})`);
      gradient.addColorStop(1, `rgba(${INK},${(.16 * conceptIn).toFixed(3)})`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = .9;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.quadraticCurveTo(bendX, bendY, corePoint.x, corePoint.y);
      ctx.stroke();

      // One sparse signal per domain, staggered so they never pulse in unison.
      if (conceptIn > .3 && !reduced) {
        const travel = (time * .00007 + index * .167) % 1;
        const point = quadraticPoint(from, { x: bendX, y: bendY }, corePoint, travel);
        const fade = Math.sin(travel * Math.PI);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${(fade * .7 * conceptIn).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // The resolved point of view renders into one output.
    const controlA = { x: corePoint.x + (outputPoint.x - corePoint.x) * .36, y: corePoint.y };
    const controlB = { x: corePoint.x + (outputPoint.x - corePoint.x) * .7, y: outputPoint.y };
    for (let lane = -1; lane <= 1; lane++) {
      const offset = lane * 5;
      const alpha = (lane === 0 ? .5 : .2) * outputIn;
      ctx.strokeStyle = `rgba(198,72,26,${alpha.toFixed(3)})`;
      ctx.lineWidth = lane === 0 ? 1.2 : .7;
      ctx.beginPath();
      ctx.moveTo(corePoint.x, corePoint.y + offset);
      ctx.bezierCurveTo(
        controlA.x, controlA.y + offset * 2,
        controlB.x, controlB.y - offset,
        outputPoint.x, outputPoint.y + offset * .35,
      );
      ctx.stroke();
    }

    if (outputIn > .2 && !reduced) {
      for (let i = 0; i < 2; i++) {
        const travel = (time * .00011 + i * .5) % 1;
        const point = cubicPoint(corePoint, controlA, controlB, outputPoint, travel);
        const fade = Math.sin(travel * Math.PI);
        ctx.fillStyle = `rgba(198,72,26,${(fade * .8 * outputIn).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Fragments sit above their relationships, as in a graph view.
    points.forEach((point) => {
      const node = nodes[point.index]!;
      const color = COLORS[node.cluster % COLORS.length]!;
      // Far nodes stay pale; near nodes carry the colour. That is the depth cue.
      const alpha = (.2 + node.depth * .5) * fragmentIn;
      ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, node.r * (.7 + fragmentIn * .3), 0, Math.PI * 2);
      ctx.fill();
    });

    hubs.forEach((hub, index) => {
      const point = points[index] ?? hubPoints[index]!;
      const appear = ease((progress - (.12 + index * .035)) / .24);
      hub.style.opacity = appear.toFixed(3);
      hub.style.transform =
        `translate(-50%,-50%) translate(${point.x}px,${point.y}px) scale(${(.92 + appear * .08).toFixed(3)})`;
    });

    center.style.opacity = conceptIn.toFixed(3);
    center.style.transform =
      `translate(-50%,-50%) translate(${corePoint.x}px,${corePoint.y}px) scale(${(.9 + conceptIn * .1).toFixed(3)})`;

    output.style.opacity = outputIn.toFixed(3);
    output.style.transform =
      `translate(-50%,-50%) translate(${outputPoint.x}px,${outputPoint.y}px) scale(${(.9 + outputIn * .1).toFixed(3)})`;

    raf = requestAnimationFrame(draw);
  };

  const start = () => {
    if (looping) return;
    looping = true;
    raf = requestAnimationFrame(draw);
  };

  const stop = () => {
    looping = false;
    cancelAnimationFrame(raf);
  };

  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();
    leanTargetX = clamp((event.clientX - rect.left) / rect.width - .5, -.5, .5) * 2;
    leanTargetY = clamp((event.clientY - rect.top) / rect.height - .5, -.5, .5) * 2;
  }, { passive: true });
  stage.addEventListener("pointerleave", () => {
    leanTargetX = 0;
    leanTargetY = 0;
  }, { passive: true });

  resize();
  addEventListener("resize", resize, { passive: true });
  addEventListener("scroll", measure, { passive: true });
  measure();

  // Reduced motion gets the finished picture, not a faster animation.
  if (reduced) {
    target = 1;
    progress = 1;
    looping = true;
    draw(0);
    looping = false;
    cancelAnimationFrame(raf);
    return;
  }

  new IntersectionObserver(([entry]) => entry?.isIntersecting ? start() : stop()).observe(stage);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  start();
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function ease(value: number) {
  const x = clamp(value, 0, 1);
  return 1 - Math.pow(1 - x, 3);
}

function quadraticPoint(
  a: { x: number; y: number },
  b: { x: number; y: number },
  c: { x: number; y: number },
  t: number,
) {
  const mt = 1 - t;
  return {
    x: mt * mt * a.x + 2 * mt * t * b.x + t * t * c.x,
    y: mt * mt * a.y + 2 * mt * t * b.y + t * t * c.y,
  };
}

function cubicPoint(
  a: { x: number; y: number },
  b: { x: number; y: number },
  c: { x: number; y: number },
  d: { x: number; y: number },
  t: number,
) {
  const mt = 1 - t;
  return {
    x: mt ** 3 * a.x + 3 * mt * mt * t * b.x + 3 * mt * t * t * c.x + t ** 3 * d.x,
    y: mt ** 3 * a.y + 3 * mt * mt * t * b.y + 3 * mt * t * t * c.y + t ** 3 * d.y,
  };
}
