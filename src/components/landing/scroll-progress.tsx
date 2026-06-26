import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full origin-left"
        style={{
          width: `${p}%`,
          background: "linear-gradient(90deg, oklch(0.78 0.13 215), oklch(0.82 0.14 180))",
          boxShadow: "0 0 10px oklch(0.78 0.13 215 / 0.6)",
        }}
      />
    </div>
  );
}
