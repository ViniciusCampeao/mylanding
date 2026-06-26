import { useState } from "react";
import { cn } from "@/lib/utils";
import { Utensils, HeartPulse, Scissors, ShoppingBag, PawPrint, Wrench } from "lucide-react";

type Seg = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  benefits: string[];
  mockup: React.ReactNode;
};

const segments: Seg[] = [
  {
    id: "alimentacao",
    label: "Alimentação",
    icon: Utensils,
    headline: "Mais pedidos, menos correria na cozinha.",
    benefits: [
      "Cardápio em QR Code no celular do cliente",
      "Pedido cai direto na cozinha, sem caderno",
      "Atendimento no WhatsApp tira dúvida e fecha pedido",
    ],
    mockup: <MockMenu />,
  },
  {
    id: "saude",
    label: "Saúde / Clínicas",
    icon: HeartPulse,
    headline: "Sua agenda cheia sem você pegar no telefone.",
    benefits: [
      "Marcação e remarcação automáticas",
      "Lembretes que reduzem o paciente que não aparece",
      "Atendimento 24h sem deixar mensagem sem resposta",
    ],
    mockup: <MockAgenda />,
  },
  {
    id: "beleza",
    label: "Beleza / Salões",
    icon: Scissors,
    headline: "Foque no cliente da cadeira, não no celular.",
    benefits: [
      "Agendamento direto no WhatsApp",
      "Confirmações automáticas no dia anterior",
      "Histórico do cliente em um lugar só",
    ],
    mockup: <MockAgenda />,
  },
  {
    id: "comercio",
    label: "Comércio / Varejo",
    icon: ShoppingBag,
    headline: "Tire dúvida, mostre produto e venda no chat.",
    benefits: [
      "Catálogo de produtos no WhatsApp",
      "Cobrança e envio do Pix de forma automática",
      "Painel pra acompanhar pedidos em tempo real",
    ],
    mockup: <MockPanel />,
  },
  {
    id: "pet",
    label: "Pet",
    icon: PawPrint,
    headline: "Banho, tosa e consulta marcados sem ligação.",
    benefits: [
      "Cliente escolhe horário sozinho",
      "Lembretes carinhosos pro tutor não esquecer",
      "Ficha rápida do pet acessível no atendimento",
    ],
    mockup: <MockAgenda />,
  },
  {
    id: "servicos",
    label: "Serviços em geral",
    icon: Wrench,
    headline: "Orçamentos respondidos enquanto você trabalha.",
    benefits: [
      "Primeiro contato e qualificação automáticos",
      "Você só pega o WhatsApp quando vale a pena",
      "Tudo organizado num painel simples",
    ],
    mockup: <MockPanel />,
  },
];

export function SegmentTabs() {
  const [active, setActive] = useState(segments[0].id);
  const seg = segments.find((s) => s.id === active)!;

  return (
    <div>
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto inline-flex min-w-full justify-start gap-2 rounded-full border border-white/8 bg-white/[0.03] p-1.5 backdrop-blur md:justify-center">
          {segments.map((s) => {
            const Icon = s.icon;
            const isOn = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition-all",
                  isOn
                    ? "text-primary-foreground shadow-[0_8px_30px_-12px_oklch(0.78_0.13_215/0.6)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
                style={isOn ? { background: "var(--gradient-primary)" } : undefined}
                aria-pressed={isOn}
              >
                <Icon className="h-4 w-4" />
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div key={seg.id} className="animate-[fade-in_0.5s_ease-out_both]">
          <h3 className="font-display text-3xl font-semibold sm:text-4xl">{seg.headline}</h3>
          <ul className="mt-6 space-y-3">
            {seg.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/90">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div key={seg.id + "-m"} className="relative animate-[fade-in_0.6s_ease-out_both]">
          <div className="glow-orb -left-10 top-10 h-56 w-56" style={{ background: "oklch(0.78 0.13 215 / 0.3)" }} />
          {seg.mockup}
        </div>
      </div>
    </div>
  );
}

/* ---------- Mock visuals ---------- */

function MockMenu() {
  const items = [
    { name: "Lasanha bolonhesa", price: "R$ 42,00" },
    { name: "Risoto de funghi", price: "R$ 48,00" },
    { name: "Filé ao molho de mostarda", price: "R$ 56,00" },
    { name: "Brownie com sorvete", price: "R$ 18,00" },
  ];
  return (
    <div className="glass-card relative overflow-hidden p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary/80">Cardápio digital</p>
          <p className="font-display text-lg font-semibold">Cantina da Esquina</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
          <div className="grid h-7 w-7 grid-cols-3 grid-rows-3 gap-px">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className={cn("rounded-[1px]", [0,2,4,6,8].includes(i) ? "bg-foreground" : "bg-foreground/40")} />
            ))}
          </div>
        </div>
      </div>
      <ul className="mt-5 space-y-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm"
          >
            <span className="text-foreground">{it.name}</span>
            <span className="text-muted-foreground">{it.price}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/[0.08] px-4 py-3 text-sm">
        <span className="text-foreground">2 itens no pedido</span>
        <span className="font-medium text-primary">Enviar pra cozinha →</span>
      </div>
    </div>
  );
}

function MockAgenda() {
  const slots = ["09:00", "10:30", "13:00", "14:30", "16:00", "17:30"];
  return (
    <div className="glass-card relative overflow-hidden p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary/80">Agenda do dia</p>
          <p className="font-display text-lg font-semibold">Quinta-feira</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">8 marcações</span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {slots.map((s, i) => {
          const filled = [0, 1, 3, 5].includes(i);
          return (
            <div
              key={s}
              className={cn(
                "rounded-2xl border px-3 py-3 text-center text-sm transition-colors",
                filled
                  ? "border-primary/40 bg-primary/10 text-foreground"
                  : "border-white/8 bg-white/[0.025] text-muted-foreground",
              )}
            >
              <div className="font-medium">{s}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider">
                {filled ? "Confirmado" : "Livre"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MockPanel() {
  const rows = [
    { label: "Atendimentos hoje", val: "48", bar: 0.8 },
    { label: "Pedidos em andamento", val: "12", bar: 0.55 },
    { label: "Agendamentos da semana", val: "37", bar: 0.7 },
  ];
  return (
    <div className="glass-card relative overflow-hidden p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary/80">Painel</p>
          <p className="font-display text-lg font-semibold">Visão geral</p>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-400">tudo certo</span>
      </div>
      <div className="mt-5 space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="rounded-2xl border border-white/8 bg-white/[0.025] p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{r.label}</span>
              <span className="font-medium">{r.val}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full origin-left animate-[fade-in_0.6s_ease-out]"
                style={{
                  width: `${r.bar * 100}%`,
                  background: "var(--gradient-primary)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
