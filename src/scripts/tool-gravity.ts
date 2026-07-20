type Body = {
  element: HTMLElement;
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
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/**
 * A compact deterministic 2D physics loop for the tool tokens.
 * Rectangles are treated as circles for collision response, which keeps the
 * motion soft and legible while avoiding a heavyweight physics dependency.
 */
export function initToolGravity(stage: HTMLElement) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const elements = [...stage.querySelectorAll<HTMLElement>("[data-tool-token]")];
  if (!elements.length) return;

  let width = 1;
  let height = 1;
  let floor = 1;
  let raf = 0;
  let running = false;
  let last = performance.now();
  let cycleStarted = performance.now();
  const bodies: Body[] = elements.map((element, index) => ({
    element,
    x: 0,
    y: -160,
    vx: 0,
    vy: 0,
    angle: 0,
    spin: 0,
    width: 80,
    height: 64,
    radius: 40,
    delay: index * 135,
  }));

  const measure = () => {
    const rect = stage.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    floor = height - 34;

    bodies.forEach((body, index) => {
      const box = body.element.getBoundingClientRect();
      body.width = box.width;
      body.height = box.height;
      body.radius = Math.max(box.width, box.height) * 0.43;
      if (!running) {
        const start = Number(body.element.dataset.index ?? index);
        body.x = clamp((start * 0.173 % 1) * width, body.radius, width - body.radius);
      }
    });
  };

  const reset = () => {
    cycleStarted = performance.now();
    bodies.forEach((body, index) => {
      const lane = (index * 0.61803398875) % 1;
      body.x = clamp(lane * width, body.radius, width - body.radius);
      body.y = -body.height - index * 18;
      body.vx = ((index % 5) - 2) * 0.22;
      body.vy = 0;
      body.angle = ((index % 7) - 3) * 0.08;
      body.spin = ((index % 5) - 2) * 0.0015;
      body.delay = index * 135;
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
    const minimum = a.radius + b.radius;
    if (distance >= minimum) return;

    const nx = dx / distance;
    const ny = dy / distance;
    const overlap = minimum - distance;
    a.x -= nx * overlap * 0.5;
    a.y -= ny * overlap * 0.5;
    b.x += nx * overlap * 0.5;
    b.y += ny * overlap * 0.5;

    const relativeX = b.vx - a.vx;
    const relativeY = b.vy - a.vy;
    const velocityAlongNormal = relativeX * nx + relativeY * ny;
    if (velocityAlongNormal > 0) return;

    const impulse = -(1.42 * velocityAlongNormal) * 0.5;
    a.vx -= impulse * nx;
    a.vy -= impulse * ny;
    b.vx += impulse * nx;
    b.vy += impulse * ny;
    a.spin -= nx * 0.003;
    b.spin += nx * 0.003;
  };

  const frame = (now: number) => {
    if (!running) return;
    const delta = Math.min(2, Math.max(0.55, (now - last) / 16.667));
    last = now;
    const sinceReset = now - cycleStarted;

    bodies.forEach((body) => {
      if (sinceReset < body.delay) return;

      body.vy += 0.19 * delta;
      body.vx *= Math.pow(0.998, delta);
      body.vy *= Math.pow(0.999, delta);

      body.x += body.vx * delta;
      body.y += body.vy * delta;
      body.angle += body.spin * delta;

      if (body.x < 0) {
        body.x = 0;
        body.vx = Math.abs(body.vx) * 0.72;
        body.spin *= -0.7;
      } else if (body.x + body.width > width) {
        body.x = width - body.width;
        body.vx = -Math.abs(body.vx) * 0.72;
        body.spin *= -0.7;
      }

      if (body.y + body.height > floor) {
        body.y = floor - body.height;
        if (Math.abs(body.vy) > 0.7) body.vy *= -0.52;
        else body.vy = 0;
        body.vx *= 0.92;
        body.spin *= 0.88;
      }
    });

    for (let i = 0; i < bodies.length; i += 1) {
      for (let j = i + 1; j < bodies.length; j += 1) collide(bodies[i], bodies[j]);
    }

    bodies.forEach((body) => {
      body.element.style.transform =
        `translate3d(${body.x.toFixed(2)}px, ${body.y.toFixed(2)}px, 0) rotate(${body.angle.toFixed(4)}rad)`;
    });

    if (sinceReset > 14_500) reset();
    raf = requestAnimationFrame(frame);
  };

  const play = () => {
    if (running) return;
    running = true;
    last = performance.now();
    reset();
    raf = requestAnimationFrame(frame);
  };

  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  addEventListener("resize", measure, { passive: true });
  measure();

  new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) play();
    else pause();
  }, { threshold: 0.08 }).observe(stage);
}
