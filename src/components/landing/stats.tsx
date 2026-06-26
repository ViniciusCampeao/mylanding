import { useEffect, useRef, useState } from "react";
import { useCountUp, useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function StatsRow() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const a = useCountUp(100, 1400, visible);
  const b = useCountUp(24, 1200, visible);
  const c = useCountUp(8, 1400, visible);

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-3">
      <Stat value={`${a}%`} label="Menos mensagens deixadas sem resposta" />
      <Stat value={`${b}h`} label="Atendimento ativo todos os dias" />
      <Stat value={`${c}×`} label="Mais agilidade no primeiro contato" />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-card flex flex-col gap-1 p-5">
      <span className="font-display text-3xl font-semibold text-gradient">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export function MiniBarChart({ active }: { active: boolean }) {
  const values = [0.3, 0.55, 0.42, 0.7, 0.6, 0.85, 0.95];
  return (
    <div className="flex h-20 items-end gap-1.5">
      {values.map((v, i) => (
        <span
          key={i}
          className="flex-1 origin-bottom rounded-t-sm transition-transform duration-700"
          style={{
            height: `${v * 100}%`,
            background: "var(--gradient-primary)",
            transform: active ? "scaleY(1)" : "scaleY(0)",
            transitionDelay: `${i * 70}ms`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}
