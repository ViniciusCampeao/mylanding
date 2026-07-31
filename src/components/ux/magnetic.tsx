import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  /** multiplicador do raio de atração relativo ao tamanho do elemento (default 1.2) */
  radius?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.4, radius = 1.2, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const pull = Math.max(rect.width, rect.height) * radius;

    if (dist < pull) {
      // atração decai com a distância (mais natural)
      const falloff = 1 - dist / pull;
      x.set(dx * strength * (0.5 + falloff * 0.5));
      y.set(dy * strength * (0.5 + falloff * 0.5));
    }
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
