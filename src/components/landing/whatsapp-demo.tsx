import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { from: "client" | "bot"; text: string };
type Convo = { id: string; label: string; sub: string; contact: string; messages: Msg[] };

const conversations: Convo[] = [
  {
    id: "restaurante",
    label: "Pedido em restaurante",
    sub: "Receba pedidos sem ninguém parar no caixa",
    contact: "Cantina da Esquina",
    messages: [
      { from: "client", text: "Oi! Vocês estão entregando hoje?" },
      { from: "bot", text: "Olá, Marcos! 👋 Sim, entregamos até 23h na sua região. Quer ver o cardápio?" },
      { from: "client", text: "Quero sim" },
      { from: "bot", text: "Aqui: cardapio.cantina.com.br\nQuando escolher é só me chamar 🍝" },
      { from: "client", text: "1 lasanha + 1 refri 2L" },
      { from: "bot", text: "Anotado! Total R$ 68,90. Pix ou cartão na entrega?" },
    ],
  },
  {
    id: "agenda",
    label: "Agendamento de serviço",
    sub: "Marca horários sozinho na sua agenda",
    contact: "Studio Bem-Estar",
    messages: [
      { from: "client", text: "Boa tarde, queria marcar pra amanhã" },
      { from: "bot", text: "Oi, Júlia! Tenho 10h, 14h30 e 17h livres amanhã ✨ Qual prefere?" },
      { from: "client", text: "14h30 tá ótimo" },
      { from: "bot", text: "Confirmado pra amanhã 14h30. Te lembro 1h antes! 💆" },
    ],
  },
  {
    id: "disponibilidade",
    label: "Consulta de disponibilidade",
    sub: "Responde dúvidas comuns 24h por dia",
    contact: "Pet Care",
    messages: [
      { from: "client", text: "Vocês fazem banho aos sábados?" },
      { from: "bot", text: "Sim! Aos sábados das 8h às 16h 🐶" },
      { from: "client", text: "Quanto fica banho de porte médio?" },
      { from: "bot", text: "R$ 65 com perfume e laço. Quer já reservar um horário?" },
    ],
  },
];

export function WhatsappDemo() {
  const [idx, setIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [typing, setTyping] = useState(false);
  const active = conversations[idx];
  const containerRef = useRef<HTMLDivElement>(null);

  // animate messages appearing one by one with typing indicator before bot messages
  useEffect(() => {
    setVisibleCount(0);
    setTyping(false);
    let cancelled = false;
    let i = 0;
    const step = async () => {
      while (!cancelled && i < active.messages.length) {
        const msg = active.messages[i];
        if (msg.from === "bot") {
          setTyping(true);
          await wait(900);
          if (cancelled) return;
          setTyping(false);
        } else {
          await wait(500);
        }
        if (cancelled) return;
        i += 1;
        setVisibleCount(i);
      }
      // hold then advance
      await wait(2600);
      if (!cancelled) setIdx((p) => (p + 1) % conversations.length);
    };
    step();
    return () => { cancelled = true; };
  }, [idx, active.messages]);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visibleCount, typing]);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/80">Demonstração</p>
        <h3 className="font-display text-3xl font-semibold sm:text-4xl">
          Veja como seu WhatsApp responde sozinho.
        </h3>
        <p className="max-w-xl text-muted-foreground">
          Toque em um cenário pra ver uma conversa real acontecendo. Funciona 24 horas, em segundos,
          do mesmo número que você já usa.
        </p>

        <ul className="mt-6 space-y-2">
          {conversations.map((c, i) => {
            const isActive = i === idx;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setIdx(i)}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-2xl border border-white/8 px-4 py-3 text-left transition-all",
                    isActive
                      ? "bg-white/[0.04] border-primary/40 shadow-[0_0_0_1px_oklch(0.78_0.13_215/0.25)]"
                      : "hover:bg-white/[0.03]",
                  )}
                  aria-pressed={isActive}
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-semibold transition-colors",
                      isActive ? "text-primary-foreground" : "bg-white/5 text-muted-foreground",
                    )}
                    style={isActive ? { background: "var(--gradient-primary)" } : undefined}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-foreground">{c.label}</span>
                    <span className="block truncate text-sm text-muted-foreground">{c.sub}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative mx-auto w-full max-w-[320px]">
        {/* glow */}
        <div className="glow-orb -left-10 top-10 h-56 w-56" style={{ background: "oklch(0.78 0.13 215 / 0.45)" }} />
        <div className="glow-orb -right-8 bottom-0 h-48 w-48" style={{ background: "oklch(0.78 0.14 180 / 0.35)" }} />

        <div
          className="relative rounded-[2.4rem] border border-white/10 p-2 shadow-2xl"
          style={{ background: "linear-gradient(160deg, oklch(0.24 0.013 260), oklch(0.18 0.012 260))" }}
        >
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/60" />
          <div className="overflow-hidden rounded-[2rem] bg-[oklch(0.16_0.012_260)]">
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/5 px-4 pb-3 pt-8">
              <div
                className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                {active.contact.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{active.contact}</p>
                <p className="text-[11px] text-emerald-400">online</p>
              </div>
            </div>
            {/* chat area */}
            <div
              ref={containerRef}
              className="h-[360px] space-y-2 overflow-y-auto px-3 py-4 scrollbar-thin"
              style={{
                backgroundImage:
                  "radial-gradient(oklch(1 0 0 / 0.025) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            >
              {active.messages.slice(0, visibleCount).map((m, i) => (
                <div
                  key={i}
                  className={cn("flex w-full", m.from === "bot" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed whitespace-pre-line",
                      m.from === "bot"
                        ? "rounded-br-md text-[oklch(0.12_0.012_260)]"
                        : "rounded-bl-md border border-white/10 bg-white/[0.05] text-foreground",
                    )}
                    style={
                      m.from === "bot"
                        ? { background: "linear-gradient(135deg, oklch(0.86 0.14 165), oklch(0.78 0.13 180))" }
                        : undefined
                    }
                  >
                    {m.text}
                    {m.from === "bot" && (
                      <span className="ml-1 inline-flex translate-y-0.5 align-middle text-[oklch(0.18_0.012_260)]/70">
                        <Check className="-mr-2 h-3 w-3" />
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-end">
                  <div className="flex items-center gap-1 rounded-2xl rounded-br-md bg-white/10 px-3 py-2">
                    <Dot delay={0} />
                    <Dot delay={150} />
                    <Dot delay={300} />
                  </div>
                </div>
              )}
            </div>
            {/* input */}
            <div className="flex items-center gap-2 border-t border-white/5 px-3 py-2.5">
              <div className="flex-1 rounded-full bg-white/5 px-3 py-1.5 text-xs text-muted-foreground">
                Mensagem
              </div>
              <div
                className="grid h-8 w-8 place-items-center rounded-full text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="block h-1.5 w-1.5 rounded-full bg-foreground/70 animate-typing"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
