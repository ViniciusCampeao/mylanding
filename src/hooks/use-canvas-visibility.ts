import { useEffect, useRef, useState } from "react";

export function useCanvasVisibility(ref: React.RefObject<HTMLElement | null>) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);

    function onVisibility() {
      if (document.hidden) setPaused(true);
      else if (el && el.getBoundingClientRect().bottom > 0) setPaused(false);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);

  return paused;
}
