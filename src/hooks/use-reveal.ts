import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px", ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible } as const;
}

export function useCountUp(target: number, durationMs = 1600, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setValue(target); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);
  return value;
}
