/**
 * ヒーローの軌道システム。
 *
 * 中央のコアを、扱う領域のノードが楕円軌道で周回する。コアとノードは線で結ばれ、
 * その上を光が中心へ流れる。背景には3層の楕円軌道に塵が散っている。
 *
 * ノードは DOM 要素（アイコンとラベルを持つカプセル）で、位置と奥行きだけを
 * canvas 側の計算で毎フレーム当てている。文字を canvas に描かないので、
 * 拡大しても滲まず、読み上げにも残る。
 *
 * WebGL は使っていない。ここで必要なのは楕円の透視投影だけで、
 * それは 2D canvas と三角関数で足りる。
 */

export type OrbitNode = { label: string; icon: string };

type Dust = {
  band: { rx: number; ry: number; rot: number; speed: number };
  angle: number;
  jitter: number;
  size: number;
  twinkle: number;
  tint: number;
};

type Star = { x: number; y: number; size: number; twinkle: number };

export function initHeroOrbit(canvas: HTMLCanvasElement, stage: HTMLElement, nodes: OrbitNode[]) {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(2, devicePixelRatio || 1);

  let w = 0;
  let h = 0;
  let cx = 0;
  let cy = 0;
  let coreR = 0;
  let dust: Dust[] = [];
  let stars: Star[] = [];
  let raf = 0;
  let looping = false;

  // ポインタで視点をわずかに振る
  let px = 0;
  let py = 0;
  let tx = 0;
  let ty = 0;

  const nodeEls = [...stage.querySelectorAll<HTMLElement>("[data-orbit-node]")];

  /** 接続線の上を流れる光。ノードごとに3つ持たせる */
  const flows = nodes.map(() => [Math.random(), Math.random(), Math.random()]);

  const buildDust = () => {
    dust = [];
    const bands = [
      { rx: coreR * 2.4, ry: coreR * 0.8, rot: -0.34, speed: 0.00016, n: 200 },
      { rx: coreR * 3.1, ry: coreR * 1.04, rot: 0.28, speed: -0.00012, n: 160 },
      { rx: coreR * 1.8, ry: coreR * 0.62, rot: 0.62, speed: 0.00022, n: 110 },
    ];
    for (const b of bands) {
      for (let i = 0; i < b.n; i++) {
        dust.push({
          band: b,
          angle: Math.random() * Math.PI * 2,
          jitter: 0.86 + Math.random() * 0.3,
          size: Math.random() * 1.5 + 0.3,
          twinkle: Math.random() * Math.PI * 2,
          tint: Math.random(),
        });
      }
    }
    stars = Array.from({ length: 100 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.1 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
    }));
  };

  const resize = () => {
    const rect = canvas.parentElement!.getBoundingClientRect();
    w = Math.round(rect.width);
    h = Math.round(rect.height);
    if (w === 0 || h === 0) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = w / 2;
    cy = h * 0.34;
    coreR = Math.min(h * 0.34, 290) / 2;
    buildDust();
  };

  /** 楕円上の点を、傾き rot で回した位置に投影する。d は奥行き（-1=奥, 1=手前） */
  const project = (rx: number, ry: number, rot: number, a: number) => {
    const ex = rx * Math.cos(a);
    const ey = ry * Math.sin(a);
    return {
      x: ex * Math.cos(rot) - ey * Math.sin(rot),
      y: ex * Math.sin(rot) + ey * Math.cos(rot),
      d: Math.sin(a),
    };
  };

  /** ノードの位置だけ計算して DOM に当てる。静止画のときも一度だけ呼ぶ */
  const placeNodes = (t: number, ox: number, oy: number) => {
    const rx = Math.min(w * 0.38, 500);
    const ry = rx * 0.3;
    const rot = -0.3;
    const positions = nodes.map((_, i) => {
      const a = (i / nodes.length) * Math.PI * 2 + t * 0.00009;
      const p = project(rx, ry, rot, a);
      return { x: cx + p.x + ox, y: cy + p.y + oy, depth: (p.d + 1) / 2 };
    });

    positions.forEach((p, i) => {
      const el = nodeEls[i];
      if (!el) return;
      const scale = 0.74 + p.depth * 0.26;
      el.style.transform = `translate(-50%,-50%) translate(${p.x}px,${p.y}px) scale(${scale})`;
      el.style.opacity = (0.4 + p.depth * 0.6).toFixed(3);
      el.style.zIndex = p.depth > 0.5 ? "8" : "1";
      el.style.filter = p.depth < 0.5 ? `blur(${((0.5 - p.depth) * 3).toFixed(2)}px)` : "none";
    });

    return positions;
  };

  const frame = (t: number) => {
    if (!looping) return;

    px += (tx - px) * 0.05;
    py += (ty - py) * 0.05;
    const ox = px * 22;
    const oy = py * 15;

    ctx.clearRect(0, 0, w, h);

    // --- 背景の星 ---
    for (const s of stars) {
      const alpha = (0.18 + 0.3 * (0.5 + 0.5 * Math.sin(t * 0.002 + s.twinkle))) * 0.5;
      ctx.fillStyle = `rgba(243,240,235,${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(s.x * w + ox * 0.4, s.y * h + oy * 0.4, s.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- 軌道上の塵 ---
    for (const p of dust) {
      p.angle += p.band.speed * 16;
      const pr = project(p.band.rx * p.jitter, p.band.ry * p.jitter, p.band.rot, p.angle);
      const depth = (pr.d + 1) / 2;
      const alpha = (0.1 + depth * 0.7) * (0.6 + 0.4 * Math.sin(t * 0.003 + p.twinkle));
      // ほとんどは紙色。ごく一部だけアクセントを混ぜて単調さを切る
      ctx.fillStyle =
        p.tint < 0.88
          ? `rgba(240,238,233,${alpha.toFixed(3)})`
          : `rgba(240,131,79,${(alpha * 0.85).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(cx + pr.x + ox, cy + pr.y + oy, p.size * (0.5 + depth * 0.85), 0, Math.PI * 2);
      ctx.fill();
    }

    // --- ノード位置 ---
    const positions = placeNodes(t, ox, oy);

    // --- コアとノードを結ぶ線、その上を流れる光 ---
    positions.forEach((p, i) => {
      const grad = ctx.createLinearGradient(cx + ox, cy + oy, p.x, p.y);
      grad.addColorStop(0, `rgba(240,238,233,${(0.04 + p.depth * 0.2).toFixed(3)})`);
      grad.addColorStop(1, `rgba(240,238,233,${(0.02 + p.depth * 0.1).toFixed(3)})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 0.5 + p.depth * 0.9;
      ctx.beginPath();
      ctx.moveTo(cx + ox, cy + oy);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      const lane = flows[i]!;
      lane.forEach((f, k) => {
        f -= 0.0045;
        lane[k] = f <= 0 ? 1 : f;
        const fx = p.x + (cx + ox - p.x) * (1 - f);
        const fy = p.y + (cy + oy - p.y) * (1 - f);
        ctx.fillStyle = `rgba(243,240,235,${((0.15 + p.depth * 0.5) * f).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(fx, fy, 1.5 * (0.5 + p.depth), 0, Math.PI * 2);
        ctx.fill();
      });
    });

    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (looping || reduced) return;
    looping = true;
    raf = requestAnimationFrame(frame);
  };

  const stop = () => {
    if (!looping) return;
    looping = false;
    cancelAnimationFrame(raf);
  };

  resize();

  if (reduced) {
    // 動かさない設定でも、静止した一枚は見せる
    placeNodes(0, 0, 0);
    frameOnce();
    addEventListener("resize", () => {
      resize();
      placeNodes(0, 0, 0);
      frameOnce();
    });
    return;
  }

  /** 動きを止める設定のときに、静止画を一度だけ描く */
  function frameOnce() {
    looping = true;
    frame(0);
    looping = false;
    cancelAnimationFrame(raf);
  }

  addEventListener("resize", resize, { passive: true });
  addEventListener(
    "pointermove",
    (e) => {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    },
    { passive: true },
  );

  new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop())).observe(canvas);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  start();
}
