/**
 * Ethos の星座。
 *
 * スクロール量に応じて、外周のノード → コアへのスポーク → ノード同士を結ぶ環、
 * の順に描かれていく。組み上がると、外周から中心へ光が流れ始める。
 *
 * 「ぜんぶが繋がって、前へ進む速度になる」を、そのまま図にしている。
 */

type Node = { el: HTMLElement };

export function initEthosConstellation(
  stage: HTMLElement,
  canvas: HTMLCanvasElement,
  outer: HTMLElement[],
  center: HTMLElement,
) {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(2, devicePixelRatio || 1);
  const nodes: Node[] = outer.map((el) => ({ el }));

  let w = 0;
  let h = 0;
  let raf = 0;
  let looping = false;

  /** 実際の進捗と、そこへ追いつく表示上の進捗。追従を緩めて滑らかにする */
  let target = 0;
  let progress = 0;

  const glints = outer.map(() => Math.random());

  const resize = () => {
    const r = stage.getBoundingClientRect();
    w = Math.round(r.width);
    h = Math.round(r.height);
    if (w === 0 || h === 0) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
  /** 全体進捗 p のうち、a〜b の区間だけを 0..1 に切り出す */
  const segment = (p: number, a: number, b: number) => easeOut((p - a) / (b - a));

  const measure = () => {
    const r = stage.getBoundingClientRect();
    // ステージが下から上がってくる間を 0→1 に写す
    target = Math.min(1, Math.max(0, (innerHeight * 0.88 - r.top) / (innerHeight * 0.75)));
  };

  const draw = (t: number) => {
    if (!looping) return;

    progress += (target - progress) * 0.07;
    const p = progress;

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const rx = Math.min(w * 0.4, 420);
    const ry = Math.min(h * 0.4, 210);

    // 外周ノードの座標。わずかに揺らして生きている感じを出す
    const pts = nodes.map((_, i) => {
      const a = -Math.PI / 2 + i * ((Math.PI * 2) / nodes.length);
      return {
        x: cx + Math.cos(a) * rx + Math.sin(t * 0.0006 + i * 1.7) * 7,
        y: cy + Math.sin(a) * ry + Math.cos(t * 0.0007 + i * 2.3) * 6,
      };
    });

    /** 始点から終点へ q(0..1) の割合だけ線を引く */
    const line = (x1: number, y1: number, x2: number, y2: number, q: number, alpha: number) => {
      if (q <= 0) return;
      const g = ctx.createLinearGradient(x1, y1, x2, y2);
      g.addColorStop(0, `rgba(194,65,12,${alpha})`);
      g.addColorStop(1, `rgba(107,99,92,${alpha})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 + (x2 - x1) * q, y1 + (y2 - y1) * q);
      ctx.stroke();
    };

    // 中心から外へスポーク
    pts.forEach((pt, i) => line(cx, cy, pt.x, pt.y, segment(p, 0.3 + i * 0.05, 0.55 + i * 0.05), 0.4));
    // 外周をつなぐ環
    pts.forEach((pt, i) => {
      const next = pts[(i + 1) % pts.length]!;
      line(pt.x, pt.y, next.x, next.y, segment(p, 0.55 + i * 0.05, 0.78 + i * 0.05), 0.22);
    });

    // 組み上がったら中心へ光が流れる
    if (p > 0.9) {
      glints.forEach((f, i) => {
        f -= 0.005;
        glints[i] = f <= 0 ? 1 : f;
        const pt = pts[i]!;
        ctx.fillStyle = `rgba(194,65,12,${(0.5 * f * (p - 0.9) * 10).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.x + (cx - pt.x) * (1 - f), pt.y + (cy - pt.y) * (1 - f), 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // ノードを配置
    pts.forEach((pt, i) => {
      const q = segment(p, 0.04 + i * 0.06, 0.26 + i * 0.06);
      const el = nodes[i]!.el;
      el.style.opacity = q.toFixed(3);
      el.style.transform =
        `translate(-50%,-50%) translate(${pt.x}px,${pt.y}px) ` +
        `scale(${(0.82 + q * 0.18).toFixed(3)}) translateY(${((1 - q) * 18).toFixed(1)}px)`;
    });

    // 中心。組み上がるにつれ現れ、わずかに脈打つ
    const cq = segment(p, 0.72, 0.95);
    const pulse = 1 + Math.sin(t * 0.0018) * 0.02 * cq;
    center.style.opacity = cq.toFixed(3);
    center.style.transform =
      `translate(-50%,-50%) translate(${cx}px,${cy}px) scale(${((0.8 + cq * 0.2) * pulse).toFixed(3)})`;

    raf = requestAnimationFrame(draw);
  };

  const start = () => {
    if (looping) return;
    looping = true;
    raf = requestAnimationFrame(draw);
  };
  const stop = () => {
    if (!looping) return;
    looping = false;
    cancelAnimationFrame(raf);
  };

  resize();

  if (reduced) {
    // 動かさない設定では、組み上がった状態を一度だけ描く
    target = 1;
    progress = 1;
    looping = true;
    draw(0);
    looping = false;
    cancelAnimationFrame(raf);
    addEventListener("resize", () => {
      resize();
      progress = 1;
      looping = true;
      draw(0);
      looping = false;
      cancelAnimationFrame(raf);
    });
    return;
  }

  addEventListener("resize", resize, { passive: true });
  addEventListener("scroll", measure, { passive: true });
  measure();

  new IntersectionObserver(([e]) => (e?.isIntersecting ? start() : stop())).observe(stage);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  start();
}
