/**
 * ヒーローの粒子場。
 *
 * ロゴの意味（歩幅の軌跡と、まだ踏んでいない前方の一歩）を空間に置き換えている。
 * 粒子は奥から手前へ流れ、右前方の一点に向かって収束していく。
 *
 * WebGL は使っていない。ここで欲しいのは奥行きの気配だけで、
 * ライブラリを足すほどの絵は要らない。2D canvas の透視投影で足りる。
 */

type Particle = {
  /** 収束点まわりの角度 */
  a: number;
  /** 収束点からの距離。1 で外周、0 で収束点 */
  r: number;
  /** 手前へ寄る速さ */
  speed: number;
  size: number;
  tint: number;
};

const COUNT_DESKTOP = 200;
const COUNT_MOBILE = 90;

export function initHeroField(canvas: HTMLCanvasElement) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const dpr = Math.min(2, devicePixelRatio || 1);
  let w = 0;
  let h = 0;
  let particles: Particle[] = [];
  let raf = 0;
  /** rAF を二重に回さないための旗。IntersectionObserver が複数回発火しても増えない */
  let looping = false;

  // ポインタで視点をわずかに振る。追従を緩めて酔わせない
  let px = 0;
  let py = 0;
  let tx = 0;
  let ty = 0;

  const spawn = (): Particle => ({
    a: Math.random() * Math.PI * 2,
    r: 0.35 + Math.random() * 0.75,
    // 1秒でおよそ 4〜10% ぶん収束点へ寄る速さ
    speed: 0.04 + Math.random() * 0.06,
    size: 0.5 + Math.random() * 1.6,
    tint: Math.random(),
  });

  const build = () => {
    const count = w < 720 ? COUNT_MOBILE : COUNT_DESKTOP;
    particles = Array.from({ length: count }, spawn);
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    w = Math.round(rect.width);
    h = Math.round(rect.height);
    if (w === 0 || h === 0) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  };

  let last = 0;

  const frame = (now: number) => {
    if (!looping) return;

    // 経過秒。タブ復帰直後の巨大な差分で粒子が飛ばないよう上限を設ける
    const dt = last === 0 ? 0.016 : Math.min(0.05, (now - last) / 1000);
    last = now;

    if (w === 0 || h === 0) {
      raf = requestAnimationFrame(frame);
      return;
    }

    px += (tx - px) * 0.05;
    py += (ty - py) * 0.05;

    ctx.clearRect(0, 0, w, h);

    // 収束先 = ロゴの「前方の正方形」に対応する点
    const cx = w * 0.72 + px * 26;
    const cy = h * 0.44 + py * 18;
    const spreadX = w * 0.66;
    const spreadY = h * 0.5;

    for (const p of particles) {
      p.r -= p.speed * dt;
      if (p.r <= 0.02) {
        // 収束点に着いたら外周へ戻す。歩き続けている感じを保つ
        Object.assign(p, spawn(), { r: 1.1 });
      }

      const x = cx + Math.cos(p.a) * spreadX * p.r;
      const y = cy + Math.sin(p.a) * spreadY * p.r;

      // 収束点に近いほど明るく大きい = 前に出るほど像が定まる、という含意
      const near = 1 - p.r;
      const alpha = Math.max(0, Math.min(0.85, near * 0.8 + 0.06));
      const radius = p.size * (0.4 + near * 0.9);

      ctx.fillStyle =
        p.tint < 0.86
          ? `rgba(243, 240, 235, ${alpha.toFixed(3)})`
          : `rgba(240, 131, 79, ${(alpha * 0.9).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (looping) return;
    looping = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  };

  const stop = () => {
    if (!looping) return;
    looping = false;
    cancelAnimationFrame(raf);
  };

  const onPointer = (e: PointerEvent) => {
    tx = (e.clientX / innerWidth - 0.5) * 2;
    ty = (e.clientY / innerHeight - 0.5) * 2;
  };

  // 見えていないものを回し続ける理由がない
  const visibility = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) start();
    else stop();
  });

  // 裏タブでも止める
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (canvas.getBoundingClientRect().bottom > 0) start();
  });

  resize();
  addEventListener("resize", resize, { passive: true });
  addEventListener("pointermove", onPointer, { passive: true });
  visibility.observe(canvas);
  start();
}
