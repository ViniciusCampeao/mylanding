import { useEffect, useRef, useState } from "react";

/**
 * Cursor "vagalume": um ponto neon verde que segue o mouse com inércia,
 * deixa um halo pulsante e um rastro suave. Desativado em toque/reduced-motion.
 */
export function FireflyCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: target.x, y: target.y };
    const halo = { x: target.x, y: target.y };
    let raf = 0;
    let hidden = true;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (hidden) {
        hidden = false;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (haloRef.current) haloRef.current.style.opacity = "1";
      }
    };

    const onLeave = () => {
      hidden = true;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (haloRef.current) haloRef.current.style.opacity = "0";
    };

    // cresce sobre elementos interativos
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("a,button,[role=button],input,textarea,select,label");
      const scale = el ? 2.2 : 1;
      if (haloRef.current) haloRef.current.style.setProperty("--ff-scale", String(scale));
    };

    const tick = () => {
      // inércia: o ponto segue rápido, o halo arrasta atrás (vagalume)
      dot.x += (target.x - dot.x) * 0.28;
      dot.y += (target.y - dot.y) * 0.28;
      halo.x += (target.x - halo.x) * 0.12;
      halo.y += (target.y - halo.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${halo.x}px, ${halo.y}px, 0) translate(-50%, -50%) scale(var(--ff-scale, 1))`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Halo pulsante que arrasta atrás */}
      <div
        ref={haloRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(90,220,150,0.28) 0%, rgba(74,180,140,0.12) 40%, transparent 70%)",
          filter: "blur(2px)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          transition: "opacity 0.3s ease",
          animation: "firefly-pulse 2.2s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />
      {/* Núcleo neon */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "9999px",
          background: "#7fffc4",
          boxShadow:
            "0 0 8px 2px rgba(90,255,180,0.9), 0 0 20px 6px rgba(60,220,150,0.5), 0 0 40px 12px rgba(40,180,120,0.25)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          transition: "opacity 0.3s ease",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
