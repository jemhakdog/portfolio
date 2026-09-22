"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useSyncExternalStore, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { sound } from "@/lib/audio-engine";

const emptySubscribe = () => () => {};

// Silence THREE.Clock deprecation warning until R3F upstream adopts THREE.Timer
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    originalWarn.apply(console, args);
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

export default function Scene3D() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [liteMode, setLiteMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio_3d_mode") === "lite";
    }
    return false;
  });

  const toggleMode = () => {
    sound.playClick();
    const next = !liteMode;
    setLiteMode(next);
    localStorage.setItem("portfolio_3d_mode", next ? "lite" : "3d");
  };

  if (!mounted) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center rounded-[14px] border border-hairline/20 bg-surface-dark-elevated font-mono text-[11px] text-canvas/40">
        Loading WebGL...
      </div>
    );
  }

  return (
    <div className="relative h-[250px] w-full overflow-hidden rounded-[14px] border border-hairline/20 bg-surface-dark-elevated shadow-md">
      {/* Top Header Badge and Mode Switcher */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-canvas/70 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{liteMode ? "Lite View (2D)" : "3D Sandbox (R3F)"}</span>
        </div>

        <button
          type="button"
          onClick={toggleMode}
          className="pointer-events-auto cursor-pointer rounded border border-hairline/30 bg-surface-dark/80 px-2 py-0.5 font-mono text-[10px] text-canvas/80 hover:text-canvas hover:border-hairline transition-colors backdrop-blur-xs focus-visible:outline-2 focus-visible:outline-ring"
          title="Toggle between 3D interactive Canvas and Lite 2D SVG illustration"
        >
          {liteMode ? "⚡ Switch to 3D" : "🔋 Lite View"}
        </button>
      </div>

      {liteMode ? (
        /* Lite 2D View: High performance, zero GPU load */
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-surface-dark to-surface-dark-elevated p-6 text-center font-mono">
          <div className="relative mb-3 flex size-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/40 text-2xl shadow-inner">
            💻
            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-emerald-400" />
          </div>
          <div className="text-[13px] font-semibold text-canvas">
            Pangasinan Local Station
          </div>
          <div className="mt-1 text-[11px] text-canvas/60 max-w-[28ch]">
            app.py running offline on SQLite · Zero GPU mode active
          </div>
        </div>
      ) : (
        /* 3D WebGL Canvas */
        <Canvas
          camera={{ position: [0, 0, 4.6], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 6, 4]} intensity={1.4} />
          <pointLight position={[-4, -2, -2]} color="#fcab79" intensity={0.5} />
          <TerminalDesk />
        </Canvas>
      )}

      {/* Hint at bottom */}
      {!liteMode && (
        <div className="pointer-events-none absolute bottom-2 right-3 font-mono text-[9px] text-canvas/40">
          Drag to rotate · Click monitor
        </div>
      )}
    </div>
  );
}
