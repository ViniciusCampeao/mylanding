import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Suprime aviso benigno do Three.js 0.185 sobre THREE.Clock deprecado
// (usado internamente pelo R3F — não há nada a corrigir do nosso lado)
if (typeof window !== "undefined") {
  const _warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    _warn(...args);
  };
}
import "./aurora-material";
import { useCanvasVisibility } from "@/hooks/use-canvas-visibility";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile as useMobile } from "@/hooks/use-mobile";

function AuroraPlane({ reduced }: { reduced: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial & {
    u_time: number;
    u_mouse: THREE.Vector2;
    u_scroll: number;
    u_quality: number;
  }>(null);

  const mouse = useRef(new THREE.Vector2(0, 0));
  const mouseLerped = useRef(new THREE.Vector2(0, 0));
  const isMobile = useMobile();

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouse.current.set(
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2
      );
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!matRef.current || reduced) return;
    matRef.current.u_time += delta;

    mouseLerped.current.lerp(mouse.current, 0.04);
    matRef.current.u_mouse.copy(mouseLerped.current);

    const scroll = window.scrollY / window.innerHeight;
    matRef.current.u_scroll = Math.min(scroll, 1);
    matRef.current.u_quality = isMobile ? 0 : 1;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      {/* @ts-ignore - custom shader material */}
      <auroraMaterial ref={matRef} u_quality={isMobile ? 0 : 1} />
    </mesh>
  );
}

interface HeroCanvasProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroCanvas({ wrapperRef }: HeroCanvasProps) {
  const paused = useCanvasVisibility(wrapperRef);
  const reduced = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={paused ? "never" : "always"}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
      }}
      camera={{ position: [0, 0, 1], fov: 75 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <AuroraPlane reduced={reduced} />
    </Canvas>
  );
}
