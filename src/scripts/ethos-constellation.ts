/**
 * Obsidian-like knowledge graph.
 *
 * 180 small data nodes form six fuzzy knowledge clusters. Those clusters feed
 * the MaePace concept node, and the resolved signal travels into one output.
 * Pointer proximity reveals local relationships; scroll progress reveals the
 * overall idea from fragments to point of view to masterpiece.
 */

type GraphNode = {
  x: number;
  y: number;
  r: number;
  cluster: number;
  phase: number;
  strength: number;
};

type Edge = {
  a: number;
  b: number;
  strength: number;
};

const COLORS = [
  [111, 131, 255],
  [255, 117, 64],
  [216, 155, 255],
  [99, 214, 184],
  [255, 183, 91],
  [116, 161, 255],
] as const;

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
  let pointerX = -9999;
  let pointerY = -9999;
  let pointerActive = false;

  const random = mulberry32(91427);

  function layout() {
    const mobile = w < 660;
    const clusterLayout = mobile
      ? [
          [.16, .18], [.48, .12], [.15, .58],
          [.43, .78], [.48, .34], [.78, .22],
        ]
      : [
          [.13, .24], [.31, .14], [.18, .70],
          [.43, .79], [.43, .36], [.70, .20],
        ];

    hubPoints = clusterLayout.map(([x, y]) => ({ x: x! * w, y: y! * h }));
    corePoint = mobile ? { x: w * .37, y: h * .50 } : { x: w * .60, y: h * .53 };
    outputPoint = mobile ? { x: w * .73, y: h * .68 } : { x: w * .84, y: h * .54 };

    nodes = [];
    const count = mobile ? 118 : 180;
    for (let i = 0; i < count; i++) {
      const cluster = i % hubPoints.length;
      const hub = hubPoints[cluster]!;
      const angle = random() * Math.PI * 2;
      const distance = Math.pow(random(), .64) * (mobile ? 112 : 158);
      const spreadX = mobile ? .74 : 1.12;
      const spreadY = mobile ? 1.05 : .68;
      nodes.push({
        x: clamp(hub.x + Math.cos(angle) * distance * spreadX, 16, w - 16),
        y: clamp(hub.y + Math.sin(angle) * distance * spreadY, 36, h - 34),
        r: i < hubPoints.length ? 3.2 : .65 + random() * 1.65,
        cluster,
        phase: random() * Math.PI * 2,
        strength: .24 + random() * .76,
      });
    }

    // Place one canvas anchor under every visible knowledge label.
    hubPoints.forEach((point, index) => {
      const anchor = nodes[index];
      if (!anchor) return;
      anchor.x = point.x;
      anchor.y = point.y;
      anchor.r = 4;
      anchor.cluster = index;
      anchor.strength = 1;
    });

    edges = [];
    for (let i = 0; i < nodes.length; i++) {
      const near: { index: number; distance: number }[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const a = nodes[i]!;
        const b = nodes[j]!;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const limit = a.cluster === b.cluster ? 104 : 62;
        if (distance < limit) near.push({ index: j, distance });
      }
      near.sort((a, b) => a.distance - b.distance);
      const links = 1 + (i % 4 === 0 ? 1 : 0);
      near.slice(0, links).forEach(({ index, distance }) => {
        if (index > i) edges.push({
          a: i,
          b: index,
          strength: 1 - distance / 112,
        });
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
    progress += (target - progress) * (reduced ? 1 : .065);
    const fragmentIn = ease((progress - .02) / .30);
    const relationsIn = ease((progress - .18) / .34);
    const conceptIn = ease((progress - .48) / .25);
    const outputIn = ease((progress - .70) / .24);

    ctx.clearRect(0, 0, w, h);

    const offsets = nodes.map((node, index) => {
      const idle = reduced ? 0 : Math.sin(time * .00022 + node.phase) * (1.2 + node.strength * 1.6);
      let x = node.x + Math.cos(node.phase) * idle;
      let y = node.y + Math.sin(node.phase) * idle;

      if (pointerActive) {
        const dx = x - pointerX;
        const dy = y - pointerY;
        const distance = Math.hypot(dx, dy);
        if (distance < 124 && distance > .1) {
          const force = (1 - distance / 124) * 13;
          x += dx / distance * force;
          y += dy / distance * force;
        }
      }
      return { x, y, index };
    });

    // Fine Obsidian-like relationships.
    for (const edge of edges) {
      const a = offsets[edge.a]!;
      const b = offsets[edge.b]!;
      const closeToPointer = pointerActive &&
        (Math.hypot(a.x - pointerX, a.y - pointerY) < 118 ||
         Math.hypot(b.x - pointerX, b.y - pointerY) < 118);
      const alpha = (.028 + Math.max(0, edge.strength) * .11 + (closeToPointer ? .18 : 0)) * relationsIn;
      ctx.strokeStyle = `rgba(202,207,221,${alpha.toFixed(3)})`;
      ctx.lineWidth = closeToPointer ? .9 : .55;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    // Six knowledge domains converge into the point of view.
    hubPoints.forEach((hub, index) => {
      const bendX = (hub.x + corePoint.x) / 2 + Math.sin(index * 2.1) * 24;
      const bendY = (hub.y + corePoint.y) / 2 + Math.cos(index * 1.8) * 28;
      const gradient = ctx.createLinearGradient(hub.x, hub.y, corePoint.x, corePoint.y);
      const color = COLORS[index % COLORS.length]!;
      gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${(.14 * conceptIn).toFixed(3)})`);
      gradient.addColorStop(1, `rgba(255,117,64,${(.52 * conceptIn).toFixed(3)})`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(hub.x, hub.y);
      ctx.quadraticCurveTo(bendX, bendY, corePoint.x, corePoint.y);
      ctx.stroke();

      if (conceptIn > .35 && !reduced) {
        const travel = (time * .00011 + index * .147) % 1;
        const point = quadraticPoint(hub, { x: bendX, y: bendY }, corePoint, travel);
        ctx.fillStyle = `rgba(255,154,105,${(.3 + travel * .65).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.2 + travel * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // The resolved idea is rendered into one output through several parallel
    // signal lanes — a small visual "compiler", not a decorative connector.
    for (let lane = -2; lane <= 2; lane++) {
      const offset = lane * 4.5;
      const alpha = (.12 + (2 - Math.abs(lane)) * .045) * outputIn;
      ctx.strokeStyle = `rgba(255,135,80,${alpha.toFixed(3)})`;
      ctx.lineWidth = lane === 0 ? 1.3 : .7;
      ctx.beginPath();
      ctx.moveTo(corePoint.x, corePoint.y + offset);
      ctx.bezierCurveTo(
        corePoint.x + (outputPoint.x - corePoint.x) * .34,
        corePoint.y + offset * 2,
        corePoint.x + (outputPoint.x - corePoint.x) * .72,
        outputPoint.y - offset,
        outputPoint.x,
        outputPoint.y + offset * .35,
      );
      ctx.stroke();
    }

    if (outputIn > .25 && !reduced) {
      for (let i = 0; i < 5; i++) {
        const travel = (time * .00016 + i * .19) % 1;
        const point = cubicPoint(
          corePoint,
          { x: corePoint.x + (outputPoint.x - corePoint.x) * .34, y: corePoint.y },
          { x: corePoint.x + (outputPoint.x - corePoint.x) * .72, y: outputPoint.y },
          outputPoint,
          travel,
        );
        ctx.fillStyle = `rgba(255,191,154,${(.28 + travel * .72).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.3 + travel * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Data nodes sit above edges as in Obsidian's graph view.
    offsets.forEach((point) => {
      const node = nodes[point.index]!;
      const color = COLORS[node.cluster % COLORS.length]!;
      const nearPointer = pointerActive && Math.hypot(point.x - pointerX, point.y - pointerY) < 94;
      const alpha = (.16 + node.strength * .54 + (nearPointer ? .28 : 0)) * fragmentIn;
      const radius = node.r * (.72 + fragmentIn * .28) + (nearPointer ? 1.1 : 0);
      if (node.r > 2.8 || nearPointer) {
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${(.09 * fragmentIn).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius * 4.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    hubs.forEach((hub, index) => {
      const point = hubPoints[index]!;
      const appear = ease((progress - (.10 + index * .035)) / .22);
      hub.style.opacity = appear.toFixed(3);
      hub.style.transform =
        `translate(-50%,-50%) translate(${point.x}px,${point.y}px) scale(${(.88 + appear * .12).toFixed(3)})`;
    });

    const pulse = reduced ? 1 : 1 + Math.sin(time * .0018) * .018;
    center.style.opacity = conceptIn.toFixed(3);
    center.style.transform =
      `translate(-50%,-50%) translate(${corePoint.x}px,${corePoint.y}px) scale(${((.84 + conceptIn * .16) * pulse).toFixed(3)})`;

    const outputPulse = reduced ? 1 : 1 + Math.sin(time * .0015 + 1.2) * .012;
    output.style.opacity = outputIn.toFixed(3);
    output.style.transform =
      `translate(-50%,-50%) translate(${outputPoint.x}px,${outputPoint.y}px) scale(${((.82 + outputIn * .18) * outputPulse).toFixed(3)})`;

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
    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;
    pointerActive = true;
  }, { passive: true });
  stage.addEventListener("pointerleave", () => { pointerActive = false; }, { passive: true });

  resize();
  addEventListener("resize", resize, { passive: true });
  addEventListener("scroll", measure, { passive: true });
  measure();

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
