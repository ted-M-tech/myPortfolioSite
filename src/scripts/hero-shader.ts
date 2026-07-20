/**
 * Hero data forge.
 *
 * Dozens of live signals converge into one bright square: the MaePace idea of
 * turning many inputs into a distinct next step. The scene is rendered by one
 * fragment shader with no models, textures, or runtime dependencies.
 */
export function initHeroShader(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: false,
    depth: false,
    powerPreference: "high-performance",
  });
  if (!gl) return;

  const vertex = `#version 300 es
    in vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragment = `#version 300 es
    precision highp float;

    uniform vec2 u_resolution;
    uniform vec2 u_pointer;
    uniform float u_time;
    out vec4 outColor;

    float hash(float n) {
      return fract(sin(n * 91.3458) * 47453.5453);
    }

    float hash2(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float sdBox(vec2 p, vec2 b) {
      vec2 d = abs(p) - b;
      return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
    }

    void main() {
      vec2 frag = gl_FragCoord.xy;
      vec2 uv = (frag * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      float aspect = u_resolution.x / u_resolution.y;
      float wide = smoothstep(1.05, 1.55, aspect);

      vec2 pointer = (u_pointer - .5) * vec2(.16, .11);
      vec2 focus = vec2(mix(.08, .56, wide), .03) + pointer;
      vec2 p = uv - focus;

      vec3 ink = vec3(.022, .020, .018);
      vec3 warm = vec3(1.0, .31, .10);
      vec3 apricot = vec3(1.0, .68, .43);
      vec3 cobalt = vec3(.15, .31, 1.0);
      vec3 paper = vec3(.95, .93, .90);

      float halo = exp(-3.2 * length(p * vec2(.72, 1.0)));
      vec3 color = ink + warm * halo * .035;

      // A barely visible technical grid gives the signals a measured space.
      vec2 gridUv = abs(fract((uv + pointer * .18) * 8.0) - .5);
      float grid = 1.0 - smoothstep(.474, .5, min(gridUv.x, gridUv.y));
      color += paper * grid * .017;

      float lineField = 0.0;
      float warmField = 0.0;
      float nodeField = 0.0;
      float pulseField = 0.0;

      // Every curve passes through p=0. The inputs stay diverse; the point of
      // view is singular. Long, low-alpha filaments avoid the "glowing ball"
      // silhouette and read as a living network instead.
      for (int i = 0; i < 30; i++) {
        float fi = float(i);
        float seed = hash(fi + 2.7);
        float slope = mix(-1.28, 1.28, seed);
        float freq = mix(1.35, 3.7, hash(fi + 11.2));
        float amp = mix(.025, .15, hash(fi + 26.4));
        float phase = hash(fi + 42.9) * 6.28318;

        float x = p.x;
        float wave = sin(x * freq + phase + u_time * mix(.06, .18, seed));
        float taper = smoothstep(0.0, .58, abs(x));
        float curve = slope * x + wave * amp * taper;
        float d = abs(p.y - curve);

        float strand = exp(-d * mix(105.0, 175.0, seed));
        float soft = exp(-d * 24.0);
        float reach = smoothstep(1.82, 1.12, abs(x));
        lineField += strand * reach * mix(.22, .78, seed);
        warmField += soft * reach * smoothstep(.70, .08, abs(x)) * .042;

        float travel = fract(u_time * mix(.028, .065, seed) + seed);
        float nx = mix(1.45, -.02, travel);
        float nWave = sin(nx * freq + phase + u_time * mix(.06, .18, seed));
        float ny = slope * nx + nWave * amp * smoothstep(0.0, .58, abs(nx));
        float nd = length(p - vec2(nx, ny));
        float node = exp(-nd * 150.0);
        float nodeGlow = exp(-nd * 32.0);
        nodeField += node;
        pulseField += nodeGlow * (1.0 - travel);
      }

      float rightMask = smoothstep(-.68, -.12, uv.x);
      float mobileMask = mix(.84, 1.0, wide);
      color += paper * lineField * .24 * rightMask * mobileMask;
      color += warm * warmField * rightMask;
      color += mix(cobalt, apricot, .68) * nodeField * .9 * rightMask;
      color += warm * pulseField * .14 * rightMask;

      // Data points that do not belong to a visible filament yet: unresolved
      // observations waiting to be connected.
      vec2 cell = floor((uv + vec2(u_time * .004, 0.0)) * 13.0);
      vec2 local = fract((uv + vec2(u_time * .004, 0.0)) * 13.0) - .5;
      vec2 jitter = vec2(hash2(cell), hash2(cell + 17.3)) - .5;
      float dust = exp(-length(local - jitter * .54) * 52.0);
      color += mix(paper, cobalt, hash2(cell + 5.0)) * dust * .28 * rightMask;

      // The outcome is the brand's "next step": a precise square, not a
      // decorative orb. Multiple outlines show the idea being resolved.
      float box = abs(sdBox(p, vec2(.115)));
      float box2 = abs(sdBox(p, vec2(.16)));
      float box3 = abs(sdBox(p, vec2(.215)));
      float edge = exp(-box * 210.0);
      float outer = exp(-box2 * 72.0) + exp(-box3 * 38.0) * .45;
      float coreGlow = exp(-length(p) * 8.5);
      float inside = 1.0 - smoothstep(-.105, -.075, sdBox(p, vec2(.105)));

      color += warm * outer * .5;
      color += apricot * edge * 1.65;
      color += warm * coreGlow * .42;
      color = mix(color, mix(vec3(.035, .027, .022), warm * .17, halo), inside * .88);

      // A single scan passes across the resolved square like a final render.
      float scanY = fract(u_time * .12) * .22 - .11;
      float scan = exp(-abs(p.y - scanY) * 150.0) * inside;
      color += paper * scan * .54;

      float grain = hash2(frag + floor(u_time * 12.0));
      color += (grain - .5) * .018;
      float vignette = 1.0 - smoothstep(.78, 1.85, length(uv * vec2(.72, .9)));
      color *= .64 + .36 * vignette;
      color = pow(max(color, 0.0), vec3(.86));
      outColor = vec4(color, 1.0);
    }
  `;

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vs = compile(gl.VERTEX_SHADER, vertex);
  const fs = compile(gl.FRAGMENT_SHADER, fragment);
  if (!vs || !fs) return;

  const program = gl.createProgram();
  if (!program) return;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const resolution = gl.getUniformLocation(program, "u_resolution");
  const pointer = gl.getUniformLocation(program, "u_pointer");
  const time = gl.getUniformLocation(program, "u_time");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(devicePixelRatio || 1, innerWidth < 720 ? 1.2 : 1.55);

  let width = 0;
  let height = 0;
  let mx = 0.5;
  let my = 0.5;
  let tx = 0.5;
  let ty = 0.5;
  let raf = 0;
  let running = false;
  let startedAt = performance.now();

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width * dpr));
    height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };

  const render = (now: number) => {
    if (!running && !reduced) return;
    mx += (tx - mx) * 0.045;
    my += (ty - my) * 0.045;
    gl.uniform2f(resolution, width, height);
    gl.uniform2f(pointer, mx, 1 - my);
    gl.uniform1f(time, reduced ? 3.8 : (now - startedAt) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduced) raf = requestAnimationFrame(render);
  };

  const play = () => {
    if (running || reduced) return;
    running = true;
    startedAt = performance.now();
    raf = requestAnimationFrame(render);
  };

  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  resize();
  addEventListener("resize", resize, { passive: true });
  addEventListener("pointermove", (event) => {
    tx = event.clientX / innerWidth;
    ty = event.clientY / innerHeight;
  }, { passive: true });

  if (reduced) {
    running = true;
    render(3800);
    running = false;
    return;
  }

  new IntersectionObserver(([entry]) => entry?.isIntersecting ? play() : pause()).observe(canvas);
  document.addEventListener("visibilitychange", () => document.hidden ? pause() : play());
  play();
}
