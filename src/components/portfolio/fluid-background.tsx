"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_mouse_vel;
uniform float u_time;
uniform float u_dark;

// Fast ALU polynomial noise - zero sin() transcendentals
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm2(vec2 p) {
  return 0.65 * noise(p) + 0.35 * noise(p * 2.05 + 1.6);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 uv = st;
  uv.x *= aspect;

  vec2 mouse = u_mouse / u_resolution.xy;
  mouse.x *= aspect;

  // Fluid cursor interaction
  vec2 toMouse = uv - mouse;
  float dist = length(toMouse);
  float mouseWave = exp(-dist * 3.4);
  vec2 mouseDir = normalize(toMouse + 0.0001);
  vec2 mouseWake = (mouseDir * 0.45 + u_mouse_vel * 0.85) * mouseWave;

  float t = u_time * 0.18;

  // 1st Domain Warp: broad currents
  vec2 q = vec2(
    fbm2(uv * 1.15 + vec2(0.0, t * 0.4) + mouseWake),
    fbm2(uv * 1.15 + vec2(5.2, -t * 0.35) + mouseWake)
  );

  // 2nd Domain Warp: vortices
  vec2 r = vec2(
    fbm2(uv * 1.6 + 2.2 * q + vec2(1.7, 9.2) + t * 0.5),
    fbm2(uv * 1.6 + 2.2 * q + vec2(8.3, 2.8) - t * 0.45)
  );

  // Parallax displacement across viewport
  vec2 parallax = (mouse - vec2(aspect * 0.5, 0.5)) * 0.28;
  float f = fbm2(uv * 1.25 + 2.6 * r + parallax);

  // Smoke density fields (multi-scale contrast bands)
  float smokePrimary = smoothstep(-0.45, 0.55, f);
  float smokeVein = clamp(1.0 - abs(f) * 2.0, 0.0, 1.0);
  float smokeCurl = smoothstep(0.15, 0.85, length(q));
  float smokeSwirl = clamp((r.x + 0.55) * (r.y + 0.55), 0.0, 1.0);

  // -----------------------------------------------------------------
  // LIGHT MODE:
  // High-contrast Japanese sumi-e watercolor ribbons on ivory canvas.
  // Unmistakably visible, rich, sculptural, and organic.
  // -----------------------------------------------------------------
  vec3 lightPaper   = vec3(0.965, 0.958, 0.948); // Clean warm paper
  vec3 lightCharcoal= vec3(0.32, 0.36, 0.44);   // Deep slate / smoky charcoal
  vec3 lightCoral   = vec3(0.76, 0.32, 0.20);   // Warm terracotta coral plume
  vec3 lightTeal    = vec3(0.24, 0.48, 0.56);   // Deep periwinkle / ocean eddy
  vec3 lightAmber   = vec3(0.85, 0.62, 0.34);   // Warm amber highlight

  vec3 lightCol = lightPaper;
  // Blend smoke plumes with rich opacity
  lightCol = mix(lightCol, lightCharcoal, smokePrimary * 0.55);
  lightCol = mix(lightCol, lightCoral, smokeCurl * 0.48);
  lightCol = mix(lightCol, lightTeal, smokeSwirl * 0.40);
  lightCol = mix(lightCol, lightAmber, smokeVein * 0.35);

  // -----------------------------------------------------------------
  // DARK MODE:
  // Luminous bioluminescent liquid smoke trails in obsidian void.
  // -----------------------------------------------------------------
  vec3 darkVoid     = vec3(0.040, 0.048, 0.065); // Deep space obsidian
  vec3 darkCyan     = vec3(0.10, 0.65, 0.82);   // Bioluminescent electric cyan
  vec3 darkRuby     = vec3(0.72, 0.18, 0.38);   // Glowing ruby / magenta ember
  vec3 darkSapphire = vec3(0.14, 0.28, 0.68);   // Deep midnight sapphire stream
  vec3 darkGold     = vec3(0.95, 0.68, 0.22);   // Radiant aureate filament

  vec3 darkCol = darkVoid;
  darkCol = mix(darkCol, darkSapphire, smokePrimary * 0.80);
  darkCol = mix(darkCol, darkRuby, smokeCurl * 0.70);
  darkCol = mix(darkCol, darkCyan, smokeSwirl * 0.65);
  darkCol = mix(darkCol, darkGold, smokeVein * 0.45);

  vec3 finalCol = mix(lightCol, darkCol, u_dark);
  gl_FragColor = vec4(finalCol, 1.0);
}
`;

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      powerPreference: "low-power",
      alpha: false,
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vert = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const frag = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Fullscreen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uMouseVel = gl.getUniformLocation(program, "u_mouse_vel");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uDark = gl.getUniformLocation(program, "u_dark");

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let lastX = mouseX;
    let lastY = mouseY;
    let velX = 0;
    let velY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = window.innerHeight - e.clientY;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    /*
     * This shader is fill-rate bound: 5 fbm calls x 4 octaves x 4 hash = ~80
     * sin() per pixel, every frame, forever. On a phone that is tens of
     * millions of transcendentals per frame and the whole page drops frames
     * while scrolling. Two levers, both here: fewer pixels and fewer frames.
     * The smoke drifts at 0.18 speed, so 30fps and a sub-native buffer are
     * visually indistinguishable from full quality.
     * ponytail: quality tier picked once from viewport width + core count, not
     * from a live GPU benchmark. Upgrade to a measured tier if a real device
     * turns up struggling above these thresholds.
     */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minFrameMs = reduced ? 100 : 1000 / 60;

    const resize = () => {
      // 10x lighter buffer: max 480px width at 0.3x DPR — GPU linear filtering keeps fluid smoke silky smooth
      const width = Math.max(320, Math.min(480, Math.floor(window.innerWidth * 0.3)));
      const height = Math.max(180, Math.floor((width * window.innerHeight) / window.innerWidth));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let animId: number;
    const start = performance.now();
    let lastPaint = 0;
    let darkVal = document.documentElement.classList.contains("dark") ? 1.0 : 0.0;

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      if (document.hidden || now - lastPaint < minFrameMs) return;
      lastPaint = now;

      const elapsed = reduced ? 0 : (now - start) * 0.001;

      // Snappy mouse interpolation (eliminated 0.08 sluggish drag)
      mouseX += (targetMouseX - mouseX) * 0.32;
      mouseY += (targetMouseY - mouseY) * 0.32;

      // Mouse velocity calculation for fluid wake
      const dx = (mouseX - lastX) / Math.max(window.innerWidth, 1);
      const dy = (mouseY - lastY) / Math.max(window.innerHeight, 1);
      lastX = mouseX;
      lastY = mouseY;
      velX += (dx * 18.0 - velX) * 0.35;
      velY += (dy * 18.0 - velY) * 0.35;

      const targetDark = document.documentElement.classList.contains("dark") ? 1.0 : 0.0;
      darkVal += (targetDark - darkVal) * 0.08;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(
        uMouse,
        (mouseX / window.innerWidth) * canvas.width,
        (mouseY / window.innerHeight) * canvas.height
      );
      gl.uniform2f(uMouseVel, velX, velY);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uDark, darkVal);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-100"
    />
  );
}
