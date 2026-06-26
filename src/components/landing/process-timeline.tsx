import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "A gente conversa pra entender seu negócio",
    desc: "Uma conversa direta, sem enrolação técnica. Você conta como funciona hoje e onde aperta o sapato.",
  },
  {
    title: "Montamos a solução do seu jeito",
    desc: "Desenhamos o que faz sentido pro seu dia a dia — nada genérico, nada além do necessário.",
  },
  {
    title: "Você testa e aprova com calma",
    desc: "A gente afina os detalhes com você antes de colocar pra rodar de verdade.",
  },
  {
    title: "Colocamos no ar e acompanhamos de perto",
    desc: "Suporte humano pra ajustar o que precisar. O prazo é combinado conforme o tamanho do projeto.",
  },
];

export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const [activated, setActivated] = useState<boolean[]>(() => steps.map(() => false));

  useEffect(() => {
    const items = ref.current?.querySelectorAll<HTMLLIElement>("[data-step]");
    if (!items) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActivated((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.55 },
    );
    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <ol ref={ref} className="relative">
      {/* vertical line */}
      <span
        aria-hidden
        className="absolute left-[15px] top-2 bottom-2 w-px md:left-1/2 md:-translate-x-1/2"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(1 0 0 / 0.12) 10%, oklch(1 0 0 / 0.12) 90%, transparent)",
        }}
      />
      {steps.map((s, i) => {
        const on = activated[i];
        const isRight = i % 2 === 1;
        return (
          <li
            key={i}
            data-step
            data-idx={i}
            className={cn(
              "relative grid grid-cols-[32px_1fr] items-start gap-5 pb-12 last:pb-0 md:grid-cols-2 md:gap-12",
            )}
          >
            {/* dot */}
            <span
              className={cn(
                "relative z-10 mt-1.5 grid h-8 w-8 place-items-center rounded-full md:absolute md:left-1/2 md:-translate-x-1/2",
                "timeline-dot",
                on && "timeline-dot-on",
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full transition-colors duration-700",
                  on ? "bg-primary-foreground" : "bg-foreground/40",
                )}
              />
            </span>

            <div
              className={cn(
                "md:col-span-1",
                isRight ? "md:col-start-2 md:pl-10" : "md:col-start-1 md:pr-10 md:text-right",
              )}
            >
              <div
                className={cn(
                  "reveal transition-all",
                  on && "reveal-in",
                )}
                style={{ transitionDelay: `${i * 80 + 80}ms` }}
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                  Passo {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
              </div>
            </div>
            {/* empty side spacer */}
            <div className="hidden md:block" />
          </li>
        );
      })}
    </ol>
  );
}
