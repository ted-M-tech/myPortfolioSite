type Body = {
  element: HTMLElement;
  index: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  width: number;
  height: number;
  radius: number;
  delay: number;
  appeared: boolean;
  floating: boolean;
  floatedAt: number;
  phase: number;
  drift: number;
};

type SafeZone = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/**
 * Each tool falls under gravity, hits the floor once, then keeps the momentum
 * from that bounce as gravity dissolves into a loose zero-gravity drift.
 * The motion is deterministic but deliberately irregular: no rows, no fixed
 * orbits and no final pile.
 */
export function initToolGravity(stage: HTMLElement) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const elements = [...stage.querySelectorAll<HTMLElement>("[data-tool-token]")];
  if (!elements.length) return;

  let width = 1;
  let height = 1;
  let floor = 1;
  let safeZone: SafeZone | null = null;
  let raf = 0;
  let running = false;
  let hasStarted = false;
  let last = performance.now();
  let started = performance.now();
  const pointer = { x: 0, y: 0, active: false };

  const bodies: Body[] = elements.map((element, index) => ({
    element,
    index,
    x: 0,
    y: -180,
    vx: 0,
    vy: 0,
    angle: ((index % 7) - 3) * 0.06,
    spin: ((index % 5) - 2) * 0.0015,
    width: 96,
    height: 72,
    radius: 42,
    delay: index * 82,
    appeared: false,
    floating: false,
    floatedAt: 0,
    phase: index * 1.618,
    drift: 0.72 + (index % 5) * 0.11,
  }));

  const measure = () => {
    const rect = stage.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    // 狭い画面ではマークが下辺のメタ表示（受付状況 / 拠点）の上に積もるので、
    // 床をその分だけ持ち上げて重ならないようにする。
    floor = height - (width < 720 ? 104 : 42);

    const copy = stage.parentElement?.querySelector<HTMLElement>("[data-tools-copy]");
    if (copy) {
      const copyRect = copy.getBoundingClientRect();
      safeZone = {
        left: copyRect.left - rect.left - (width < 720 ? 10 : 42),
        top: copyRect.top - rect.top - 28,
        right: copyRect.right - rect.left + (width < 720 ? 10 : 42),
        bottom: copyRect.bottom - rect.top + 28,
      };
    }

    bodies.forEach((body) => {
      const box = body.element.getBoundingClientRect();
      body.width = box.width;
      body.height = box.height;
      // カードだった頃は名前の余白が緩衝材になっていて、多少重なっても
      // 平気だった。マークだけになると重なりがそのまま団子に見えるので、
      // 当たり判定を実寸へ近づけて離す。
      body.radius = Math.max(box.width, box.height) * 0.54;
      if (hasStarted) {
        body.x = clamp(body.x, 4, width - body.width - 4);
        body.y = clamp(body.y, 54, floor - body.height);
      }
    });
  };

  const reset = () => {
    started = performance.now();
    bodies.forEach((body) => {
      const lane = (body.index * 0.61803398875 + 0.08) % 1;
      body.x = clamp(lane * (width - body.width), 4, width - body.width - 4);
      body.y = -body.height - (body.index % 5) * 26;
      body.vx = ((body.index % 7) - 3) * 0.16;
      body.vy = 0;
      body.angle = ((body.index % 7) - 3) * 0.06;
      body.spin = ((body.index % 5) - 2) * 0.0015;
      body.appeared = false;
      body.floating = false;
      body.floatedAt = 0;
      body.element.style.opacity = "0";
    });
  };

  const collide = (a: Body, b: Body) => {
    const ax = a.x + a.width * 0.5;
    const ay = a.y + a.height * 0.5;
    const bx = b.x + b.width * 0.5;
    const by = b.y + b.height * 0.5;
    const dx = bx - ax;
    const dy = by - ay;
    const distance = Math.hypot(dx, dy) || 0.001;
    const minimum = (a.radius + b.radius) * 0.86;
    if (distance >= minimum) return;

    const nx = dx / distance;
    const ny = dy / distance;
    const overlap = minimum - distance;
    a.x -= nx * overlap * 0.5;
    a.y -= ny * overlap * 0.5;
    b.x += nx * overlap * 0.5;
    b.y += ny * overlap * 0.5;

    const relative = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
    if (relative >= 0) return;
    const impulse = -relative * 0.64;
    a.vx -= impulse * nx;
    a.vy -= impulse * ny;
    b.vx += impulse * nx;
    b.vy += impulse * ny;
    a.spin = clamp(a.spin - ny * 0.00012, -0.0018, 0.0018);
    b.spin = clamp(b.spin + ny * 0.00012, -0.0018, 0.0018);
  };

  const keepCopyClear = (body: Body, delta: number) => {
    if (!safeZone || !body.floating) return;
    const right = body.x + body.width;
    const bottom = body.y + body.height;
    if (
      right <= safeZone.left ||
      body.x >= safeZone.right ||
      bottom <= safeZone.top ||
      body.y >= safeZone.bottom
    ) return;

    const exits = [
      { distance: right - safeZone.left, x: -1, y: 0 },
      { distance: safeZone.right - body.x, x: 1, y: 0 },
      { distance: bottom - safeZone.top, x: 0, y: -1 },
      { distance: safeZone.bottom - body.y, x: 0, y: 1 },
    ];
    const exit = exits.reduce((nearest, candidate) =>
      candidate.distance < nearest.distance ? candidate : nearest
    );
    const force = clamp(exit.distance * 0.016, 0.12, 0.7);
    body.vx += exit.x * force * delta;
    body.vy += exit.y * force * delta;
  };

  const frame = (now: number) => {
    if (!running) return;
    const delta = Math.min(1.8, Math.max(0.55, (now - last) / 16.667));
    const elapsed = (now - started) / 1000;
    const sinceStart = now - started;
    last = now;

    bodies.forEach((body) => {
      if (sinceStart < body.delay) return;
      if (!body.appeared) {
        body.appeared = true;
        body.element.style.opacity = "1";
      }

      if (!body.floating) {
        body.vy += 0.2 * delta;
        body.vx *= Math.pow(0.998, delta);
        body.vy *= Math.pow(0.999, delta);
      } else {
        const time = elapsed * body.drift + body.phase;
        const floatAge = (now - body.floatedAt) / 1000;
        body.vx += (
          Math.sin(time * 1.13) +
          Math.sin(time * 0.47 + body.index) * 0.55
        ) * 0.0085 * delta;
        body.vy += (
          Math.cos(time * 0.91) +
          Math.sin(time * 0.39 + body.phase) * 0.62
        ) * 0.0075 * delta;

        if (pointer.active) {
          const dx = body.x + body.width * 0.5 - pointer.x;
          const dy = body.y + body.height * 0.5 - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          if (distance < 170) {
            const force = (1 - distance / 170) * 0.19;
            body.vx += (dx / distance) * force * delta;
            body.vy += (dy / distance) * force * delta;
          }
        }

        keepCopyClear(body, delta);
        const floatDamping = floatAge < 1.1 ? 0.992 : 0.982;
        body.vx *= Math.pow(floatDamping, delta);
        body.vy *= Math.pow(floatDamping, delta);
        if (floatAge > 1.1) {
          body.vx = clamp(body.vx, -0.68, 0.68);
          body.vy = clamp(body.vy, -0.58, 0.58);
        }
      }

      body.x += body.vx * delta;
      body.y += body.vy * delta;
      body.spin = clamp(body.spin, -0.0018, 0.0018);
      body.angle += body.spin * delta;
      body.angle = clamp(body.angle, -0.14, 0.14);

      if (body.x < 4 || body.x + body.width > width - 4) {
        body.x = clamp(body.x, 4, width - body.width - 4);
        body.vx *= -0.78;
        body.spin *= -0.86;
      }

      if (!body.floating && body.y + body.height >= floor) {
        body.y = floor - body.height;
        body.vy = -(5.5 + (body.index % 5) * 0.62);
        body.vx += ((body.index * 17) % 9 - 4) * 0.42;
        body.spin = clamp(
          body.spin + ((body.index % 7) - 3) * 0.00016,
          -0.0018,
          0.0018
        );
        body.floating = true;
        body.floatedAt = now;
      } else if (body.floating) {
        const top = width < 720 ? 54 : 58;
        const bottom = floor;
        if (body.y < top || body.y + body.height > bottom) {
          body.y = clamp(body.y, top, bottom - body.height);
          body.vy *= -0.8;
          body.spin *= -0.92;
        }
      }
    });

    for (let i = 0; i < bodies.length; i += 1) {
      for (let j = i + 1; j < bodies.length; j += 1) collide(bodies[i], bodies[j]);
    }

    bodies.forEach((body) => {
      body.element.style.transform =
        `translate3d(${body.x.toFixed(2)}px, ${body.y.toFixed(2)}px, 0) rotate(${body.angle.toFixed(4)}rad)`;
    });

    raf = requestAnimationFrame(frame);
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = stage.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active =
      pointer.x >= 0 && pointer.x <= rect.width &&
      pointer.y >= 0 && pointer.y <= rect.height;
  };

  const play = () => {
    if (running) return;
    running = true;
    last = performance.now();
    if (!hasStarted) {
      hasStarted = true;
      reset();
    }
    raf = requestAnimationFrame(frame);
  };

  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerleave", () => { pointer.active = false; }, { passive: true });
  addEventListener("resize", measure, { passive: true });
  measure();

  new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) play();
    else pause();
  }, { threshold: 0.08 }).observe(stage);
}
