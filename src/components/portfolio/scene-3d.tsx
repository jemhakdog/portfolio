"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useSyncExternalStore, useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { sound } from "@/lib/audio-engine";

const emptySubscribe = () => () => {};

/**
 * R3F v9 still constructs THREE.Clock, which three.js 0.186 deprecates, so every
 * visitor gets a console warning this app cannot fix. Filtered once at module
 * scope because the Clock is built while the Canvas mounts — too early for an
 * effect in the parent.
 * ponytail: a targeted global console filter, widened only if another upstream
 * warning turns up. Delete when R3F moves to THREE.Timer.
 */
if (typeof window !== "undefined") {
  const warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    warn(...args);
  };
}

/** Low-poly interactive CRT Developer Terminal */
function TerminalDesk() {
  const groupRef = useRef<Group>(null);
  const screenRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle idle sway + mouse tracking
      const targetY = (state.pointer.x * Math.PI) / 6;
      const targetX = (-state.pointer.y * Math.PI) / 8;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.08;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
    }
    if (screenRef.current) {
      const mat = screenRef.current.material as unknown as { opacity: number };
      if (mat) {
        mat.opacity = 0.85 + Math.sin(state.clock.elapsedTime * 6) * 0.1;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        sound.playPop();
        setClicked((prev) => !prev);
      }}
      scale={clicked ? 1.08 : 1}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Monitor Housing */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[2.4, 1.8, 1.2]} />
          <meshStandardMaterial
            color={hovered ? "#2a303c" : "#1a202c"}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>

        {/* Monitor Screen (Glowing Phosphor CRT) */}
        <mesh ref={screenRef} position={[0, 0.1, 0.61]}>
          <planeGeometry args={[2.0, 1.4]} />
          <meshBasicMaterial
            color={hovered ? "#39bf45" : "#22c55e"}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Floating Screen Text */}
        <Text
          position={[-0.8, 0.45, 0.62]}
          fontSize={0.14}
          color="#0d1218"
          anchorX="left"
          anchorY="middle"
        >
          $ python app.py
        </Text>
        <Text
          position={[-0.8, 0.22, 0.62]}
          fontSize={0.11}
          color="#123d19"
          anchorX="left"
          anchorY="middle"
        >
          {`> DB: SQLite (offline)\n> Signal: 0% OK\n> Status: Running 200 OK`}
        </Text>

        {/* Monitor Stand */}
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.3, 0.5, 0.4, 16]} />
          <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -1.1, 0.1]}>
          <boxGeometry args={[1.4, 0.12, 1.1]} />
          <meshStandardMaterial color="#1a202c" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Keyboard */}
        <mesh position={[0, -1.05, 1.1]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[1.8, 0.08, 0.7]} />
          <meshStandardMaterial color="#2d3748" metalness={0.3} roughness={0.7} />
        </mesh>

        {/* Floating Database Node (Supabase / SQLite) */}
        <Float speed={3} rotationIntensity={0.8} floatIntensity={0.8}>
          <group position={[1.6, 0.8, -0.3]}>
            <mesh>
              <cylinderGeometry args={[0.4, 0.4, 0.5, 16]} />
              <meshStandardMaterial
                color={hovered ? "#fcab79" : "#aa2d00"}
                metalness={0.7}
                roughness={0.2}
                wireframe
              />
            </mesh>
          </group>
        </Float>
      </Float>
    </group>
  );
}

/**
 * WebGL is client-only, so the canvas waits for mount. This is the
 * `useSyncExternalStore` hydration probe rather than a `useEffect` + setState —
 * the repo's eslint config rejects synchronous setState in an effect
 * (react-hooks/set-state-in-effect), and `next/dynamic` with `ssr: false` is not
 * allowed from the server component that renders this.
 */
export default function Scene3D() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const hostRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  /*
   * R3F's default frameloop is "always": this canvas renders 60fps even while
   * scrolled far off screen, competing with the fullscreen fluid shader for the
   * same GPU. Nothing here animates on its own terms (drei <Float> is
   * render-driven), so stopping the loop off-screen costs no visual fidelity.
   */
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center rounded-[14px] border border-hairline/20 bg-surface-dark-elevated font-mono text-[11px] text-canvas/40">
        Loading WebGL...
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      className="relative h-[250px] w-full overflow-hidden rounded-[14px] border border-hairline/20 bg-surface-dark-elevated shadow-md"
    >
      <div className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded bg-black/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-canvas/70 backdrop-blur-xs">
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>3D Sandbox (R3F)</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        dpr={[1, window.matchMedia("(max-width: 768px)").matches ? 1 : 1.5]}
        frameloop={inView ? "always" : "never"}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 6, 4]} intensity={1.4} />
        <pointLight position={[-4, -2, -2]} color="#fcab79" intensity={0.5} />
        <TerminalDesk />
      </Canvas>

      <div className="pointer-events-none absolute bottom-2 right-3 font-mono text-[9px] text-canvas/40">
        Drag to rotate · Click monitor
      </div>
    </div>
  );
}
