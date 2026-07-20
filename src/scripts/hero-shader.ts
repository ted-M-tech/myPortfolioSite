/**
 * Hero WebGL scene.
 *
 * A single full-screen triangle and one fragment shader render the entire
 * scene. There are no models, textures, or runtime dependencies to download.
 * The shape is an analytically ray-traced sphere whose surface is displaced
 * with layered noise, then lit with MaePace's warm orange and a cool spectral
 * counterpoint. The result is real-time 3D while remaining very small.
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

    float hash(vec3 p) {
      p = fract(p * 0.3183099 + vec3(.1, .2, .3));
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(hash(i), hash(i + vec3(1.0,0.0,0.0)), f.x),
            mix(hash(i + vec3(0.0,1.0,0.0)), hash(i + vec3(1.0,1.0,0.0)), f.x), f.y),
        mix(mix(hash(i + vec3(0.0,0.0,1.0)), hash(i + vec3(1.0,0.0,1.0)), f.x),
            mix(hash(i + vec3(0.0,1.0,1.0)), hash(i + vec3(1.0,1.0,1.0)), f.x), f.y),
        f.z
      );
    }

    float fbm(vec3 p) {
      float v = 0.0;
      float a = 0.5;
      mat3 r = mat3(.00,.80,.60, -.80,.36,-.48, -.60,-.48,.64);
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = r * p * 2.03 + 0.17;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 frag = gl_FragCoord.xy;
      vec2 uv = (frag * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      float wide = smoothstep(1.0, 1.5, u_resolution.x / u_resolution.y);
      uv.x -= mix(0.0, 0.34, wide);

      vec2 mouse = (u_pointer - 0.5) * vec2(0.34, 0.22);
      vec3 ro = vec3(mouse, 3.15);
      vec3 rd = normalize(vec3(uv, -2.1));
      vec3 center = vec3(0.30 * wide, 0.04, 0.0);

      vec3 oc = ro - center;
      float b = dot(oc, rd);
      float c = dot(oc, oc) - 1.02;
      float h = b * b - c;

      vec3 bgA = vec3(0.028, 0.025, 0.023);
      vec3 bgB = vec3(0.095, 0.078, 0.066);
      float halo = exp(-2.4 * length(uv - vec2(.30 * wide, .04)));
      vec3 color = mix(bgA, bgB, halo * .62);

      float grain = hash(vec3(frag * .35, floor(u_time * 12.0)));
      color += (grain - .5) * .022;

      if (h > 0.0) {
        float t = -b - sqrt(h);
        vec3 p = ro + rd * t;
        vec3 n = normalize(p - center);

        float flow = fbm(n * 3.1 + vec3(0.0, u_time * .13, u_time * .08));
        float veins = fbm(n * 7.0 - vec3(u_time * .08, 0.0, u_time * .12));
        vec3 warped = normalize(n + .16 * vec3(
          fbm(n * 4.0 + u_time * .10),
          fbm(n.zxy * 4.0 - u_time * .08),
          fbm(n.yzx * 4.0 + u_time * .06)
        ) - .08);

        vec3 light = normalize(vec3(-.55, .75, .65));
        float diff = max(dot(warped, light), 0.0);
        float rim = pow(1.0 - max(dot(warped, -rd), 0.0), 2.4);
        float spec = pow(max(dot(reflect(-light, warped), -rd), 0.0), 42.0);

        vec3 ember = vec3(.94, .19, .035);
        vec3 apricot = vec3(1.0, .58, .26);
        vec3 electric = vec3(.18, .31, 1.0);
        vec3 violet = vec3(.48, .15, .92);

        vec3 surface = mix(ember, electric, smoothstep(.30, .78, flow));
        surface = mix(surface, apricot, smoothstep(.63, .92, veins) * .72);
        surface = mix(surface, violet, rim * .55);
        surface *= .22 + diff * 1.08;
        surface += spec * vec3(1.0, .86, .72) * 1.25;
        surface += rim * mix(electric, apricot, flow) * 1.4;

        float scan = smoothstep(.49, .51, fract((p.y + flow * .34 - u_time * .055) * 5.0));
        surface += scan * .035;

        float edge = smoothstep(0.0, .018, h);
        color = mix(color, surface, edge);
      }

      float vignette = 1.0 - smoothstep(.72, 1.75, length(uv * vec2(.84, .95)));
      color *= .66 + .34 * vignette;
      color = pow(color, vec3(.86));
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
  const dpr = Math.min(devicePixelRatio || 1, innerWidth < 720 ? 1.25 : 1.7);

  let width = 0;
  let height = 0;
  let mx = 0.5;
  let my = 0.5;
  let tx = 0.5;
  let ty = 0.5;
  let raf = 0;
  let running = false;
  let start = performance.now();

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
    gl.uniform1f(time, reduced ? 1.2 : (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduced) raf = requestAnimationFrame(render);
  };

  const play = () => {
    if (running || reduced) return;
    running = true;
    start = performance.now();
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
    render(1200);
    running = false;
    return;
  }

  new IntersectionObserver(([entry]) => entry?.isIntersecting ? play() : pause()).observe(canvas);
  document.addEventListener("visibilitychange", () => document.hidden ? pause() : play());
  play();
}
