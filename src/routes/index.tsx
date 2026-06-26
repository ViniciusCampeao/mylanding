import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  MessageSquare,
  CalendarCheck,
  QrCode,
  Receipt,
  LayoutDashboard,
  Wand2,
  Globe,
  Sparkles,
  Check,
  Star,
} from "lucide-react";

import { Navbar } from "@/components/landing/navbar";
import { ScrollProgress } from "@/components/landing/scroll-progress";
import { Reveal } from "@/components/landing/reveal";
import { WhatsappDemo } from "@/components/landing/whatsapp-demo";
import { SegmentTabs } from "@/components/landing/segment-tabs";
import { ProcessTimeline } from "@/components/landing/process-timeline";
import { Faq } from "@/components/landing/faq";
import { FloatingWhatsapp } from "@/components/landing/floating-whatsapp";
import { MiniBarChart, StatsRow } from "@/components/landing/stats";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const WA = (msg: string) =>
  "https://wa.me/5514998077628?text=" + encodeURIComponent(msg);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fluxo — Tecnologia e automação para o seu negócio" },
      {
        name: "description",
        content:
          "Atendimento automático no WhatsApp, agenda, comanda digital, cardápio em QR Code, painel de gestão e sites sob medida. Tire o trabalho repetitivo das costas e pare de perder cliente.",
      },
      {
        property: "og:title",
        content: "Fluxo — Tecnologia e automação para o seu negócio",
      },
      {
        property: "og:description",
        content:
          "Soluções digitais sob medida que automatizam o atendimento e a operação do seu negócio.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <BackgroundGlows />
      <ScrollProgress />
      <Navbar />

      <Hero />

      <Section id="demo">
        <Reveal>
          <WhatsappDemo />
        </Reveal>
      </Section>

      <Section id="solucoes">
        <SectionHeader
          eyebrow="Soluções"
          title="Tudo que seu negócio precisa, em um lugar só."
          desc="Sem jargão, sem complicação. A gente monta o que faz sentido pra você."
        />
        <BentoGrid />
      </Section>

      <Section id="segmentos">
        <SectionHeader
          eyebrow="Para quem é"
          title="Feito do jeito do seu segmento."
          desc="Cada negócio tem um ritmo. A gente desenha a solução pensando no seu."
        />
        <SegmentTabs />
      </Section>

      <Section id="planos">
        <SectionHeader
          eyebrow="Planos"
          title="Comece simples, cresça no seu tempo."
          desc="Primeira semana grátis em todos os planos. Sem fidelidade — você fica porque vale a pena."
        />
        <Pricing />
      </Section>

      <Section id="processo">
        <SectionHeader
          eyebrow="Como funciona"
          title="Do papo inicial ao seu negócio rodando."
          desc="Sem promessa furada de prazo: a gente combina tudo conforme a complexidade do projeto."
        />
        <Reveal>
          <ProcessTimeline />
        </Reveal>
      </Section>

      <Section id="faq">
        <SectionHeader
          eyebrow="Dúvidas comuns"
          title="A gente respondeu antes de você perguntar."
        />
        <Reveal>
          <Faq />
        </Reveal>
      </Section>

      {/*
        TODO: REVISÃO — Seção "Quem somos" / time por trás da Fluxo.
        Descomentar e preencher quando o usuário pedir.

        <Section id="sobre">
          <SectionHeader
            eyebrow="Quem somos"
            title="Tecnologia com rosto e nome."
            desc="Somos uma equipe pequena e comprometida, focada em resolver o problema real do seu negócio."
          />
          <QuemSomos />
        </Section>
      */}

      <FinalCta />
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative px-4 pb-24 pt-36 sm:pt-44 lg:pt-52">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass-pill px-3.5 py-1.5 text-xs text-muted-foreground">
            <span className="relative grid h-1.5 w-1.5 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Atendendo negócios em todo o Brasil
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[76px]">
            Pare de perder cliente
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient">enquanto o telefone toca.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            A Fluxo cria soluções sob medida que automatizam o atendimento, a agenda e a
            operação do seu negócio. Você tira o trabalho repetitivo das costas e nenhuma
            mensagem fica sem resposta.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={WA("Olá! Quero falar com a Fluxo sobre automatizar meu atendimento.")}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              Falar agora
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#solucoes"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]"
            >
              Ver soluções
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Primeira semana grátis
            </li>
            <li className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Sem fidelidade
            </li>
            <li className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Suporte humano de verdade
            </li>
          </ul>
        </Reveal>

        <Reveal delay={420}>
          <div className="mx-auto mt-16 max-w-3xl">
            <StatsRow />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Background glows ---------------- */

function BackgroundGlows() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="glow-orb -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 animate-float-slow"
          style={{ background: "oklch(0.78 0.13 215 / 0.35)" }}
        />
        <div
          className="glow-orb top-1/3 -left-32 h-[420px] w-[420px]"
          style={{ background: "oklch(0.82 0.14 180 / 0.25)" }}
        />
        <div
          className="glow-orb top-1/2 -right-32 h-[460px] w-[460px]"
          style={{ background: "oklch(0.75 0.16 280 / 0.18)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(60% 50% at 50% 30%, black, transparent 75%)",
          }}
        />
      </div>
    </>
  );
}

/* ---------------- Section helpers ---------------- */

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary/80">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={140}>
          <p className="mt-4 text-balance text-muted-foreground">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Bento ---------------- */

function BentoGrid() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="grid auto-rows-[minmax(180px,_auto)] grid-cols-1 gap-4 md:grid-cols-6">
      {/* Large feature */}
      <BentoCard
        className="md:col-span-4 md:row-span-2"
        icon={MessageSquare}
        title="Atendimento automático no WhatsApp"
        desc="Responde dúvida, fecha pedido, marca horário e cobra Pix. 24 horas por dia, no número que você já usa, com o jeitinho do seu negócio."
        visual={
          <div className="absolute inset-0 flex items-end justify-end p-6">
            <div className="w-full max-w-sm space-y-2">
              <Bubble side="left" delay={150} visible={visible}>
                Oi! Vocês têm horário hoje?
              </Bubble>
              <Bubble side="right" delay={400} visible={visible}>
                Tenho 14h e 16h livres ✨
              </Bubble>
              <Bubble side="left" delay={650} visible={visible}>
                Pode ser 16h
              </Bubble>
              <Bubble side="right" delay={900} visible={visible}>
                Marcado! Te lembro 1h antes 💚
              </Bubble>
            </div>
          </div>
        }
      />
      <BentoCard
        className="md:col-span-2"
        icon={CalendarCheck}
        title="Agenda inteligente"
        desc="Seu cliente escolhe o horário sozinho. Confirmações e lembretes automáticos."
      />
      <BentoCard
        className="md:col-span-2"
        icon={QrCode}
        title="Cardápio em QR Code"
        desc="Pedido vai direto pra cozinha. Sem caderno, sem grito, sem confusão."
      />
      <BentoCard
        className="md:col-span-3"
        icon={Receipt}
        title="Comanda digital"
        desc="Controle de mesas, divisão de conta e fechamento em segundos, no celular ou tablet."
      />
      <BentoCard
        className="md:col-span-3"
        icon={LayoutDashboard}
        title="Painel de gestão"
        desc="Atendimentos, pedidos e agenda em uma tela só. Simples de entender, fácil de acompanhar."
        visual={
          <div className="absolute bottom-5 right-5 w-40">
            <MiniBarChart active={visible} />
          </div>
        }
      />
      <BentoCard
        className="md:col-span-2"
        icon={Globe}
        title="Sites e presença online"
        desc="Páginas modernas, rápidas e que vendem por você."
      />
      <BentoCard
        className="md:col-span-2"
        icon={Wand2}
        title="Integrações sob medida"
        desc="Conectamos as ferramentas que você já usa, sem retrabalho."
      />
      <BentoCard
        className="md:col-span-2"
        icon={Sparkles}
        title="Tudo personalizado"
        desc="Cada solução é montada pra encaixar exatamente no seu negócio."
      />
    </div>
  );
}

function BentoCard({
  className,
  icon: Icon,
  title,
  desc,
  visual,
}: {
  className?: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  visual?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group glass-card relative overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-0.5",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(closest-side, oklch(0.78 0.13 215 / 0.35), transparent)" }}
      />
      <div
        className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-primary"
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{desc}</p>
      {visual}
    </div>
  );
}

function Bubble({
  side,
  children,
  delay,
  visible,
}: {
  side: "left" | "right";
  children: React.ReactNode;
  delay: number;
  visible: boolean;
}) {
  return (
    <div
      className={cn(
        "flex transition-all duration-700",
        side === "right" ? "justify-end" : "justify-start",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        className={cn(
          "max-w-[80%] rounded-2xl px-3 py-2 text-xs",
          side === "right"
            ? "rounded-br-md text-[oklch(0.12_0.012_260)]"
            : "rounded-bl-md border border-white/10 bg-white/[0.06] text-foreground",
        )}
        style={
          side === "right"
            ? { background: "linear-gradient(135deg, oklch(0.86 0.14 165), oklch(0.78 0.13 180))" }
            : undefined
        }
      >
        {children}
      </span>
    </div>
  );
}

/* ---------------- Pricing ---------------- */

type Plan = {
  name: string;
  price: string;
  priceSuffix?: string;
  setup?: string;
  features: string[];
  highlight?: boolean;
  cta: string;
};

type PlanGroup = {
  icon: string;
  title: string;
  desc: string;
  plans: Plan[];
};

const groups: PlanGroup[] = [
  {
    icon: "🤖",
    title: "Atendimento no WhatsApp",
    desc: "Seu negócio respondendo sozinho, com o jeitinho que você define.",
    plans: [
      {
        name: "Essencial",
        price: "R$ 100",
        priceSuffix: "/mês",
        setup: "Setup R$ 150",
        features: [
          "Respostas automáticas pras dúvidas mais comuns",
          "Atendimento 24h no seu número",
          "Ideal pra começar a economizar tempo",
        ],
        cta: "Quero o Essencial",
      },
      {
        name: "Profissional",
        price: "R$ 199",
        priceSuffix: "/mês",
        setup: "Setup R$ 200",
        highlight: true,
        features: [
          "Tudo do Essencial",
          "Marcação de horários direto no chat",
          "Confirmações e lembretes automáticos",
          "Painel com histórico de conversas",
        ],
        cta: "Quero o Profissional",
      },
      {
        name: "Avançado",
        price: "R$ 349",
        priceSuffix: "/mês",
        features: [
          "Tudo do Profissional",
          "Fluxos personalizados pro seu negócio",
          "Integração com sua agenda e ferramentas",
          "Suporte prioritário e ajustes mensais",
        ],
        cta: "Quero o Avançado",
      },
    ],
  },
  {
    icon: "🌐",
    title: "Sites & Presença Online",
    desc: "Uma vitrine bonita, rápida e que trabalha por você.",
    plans: [
      {
        name: "Página Única",
        price: "R$ 400",
        priceSuffix: " único",
        setup: "+ R$ 40/mês de manutenção",
        features: [
          "Uma página com tudo que importa",
          "Visual moderno e responsivo",
          "Pronta pra aparecer no Google",
        ],
        cta: "Quero uma Página Única",
      },
      {
        name: "Site Completo",
        price: "R$ 800",
        priceSuffix: " único",
        setup: "+ R$ 40/mês de manutenção",
        highlight: true,
        features: [
          "Várias páginas (serviços, sobre, contato...)",
          "Visual personalizado e premium",
          "Blog ou catálogo conforme a necessidade",
          "Otimizado pra carregar rápido",
        ],
        cta: "Quero o Site Completo",
      },
    ],
  },
  {
    icon: "⚙️",
    title: "Soluções sob medida",
    desc: "Quando o seu negócio precisa de algo único, a gente desenha do zero.",
    plans: [
      {
        name: "Projeto personalizado",
        price: "Sob consulta",
        highlight: true,
        features: [
          "Comanda digital e cardápio QR Code",
          "App ou sistema desenhado pra sua rotina",
          "Automações e integrações com ferramentas que você já usa",
          "Gestão de redes sociais com foco em atrair cliente",
        ],
        cta: "Conversar sobre meu projeto",
      },
    ],
  },
];

function Pricing() {
  return (
    <div className="space-y-16">
      {groups.map((g) => (
        <Reveal key={g.title}>
          <div>
            <div className="mb-6 flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary/80">
                  <span className="mr-2">{g.icon}</span>Categoria
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
                  {g.title}
                </h3>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">{g.desc}</p>
            </div>

            <div className={cn(
              "grid gap-4",
              g.plans.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
              g.plans.length === 4 && "lg:grid-cols-4",
            )}>
              {g.plans.map((p) => (
                <PlanCard key={p.name} plan={p} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border p-6 transition-transform hover:-translate-y-0.5",
        plan.highlight
          ? "border-primary/50 bg-white/[0.04]"
          : "glass-card",
      )}
      style={
        plan.highlight
          ? { boxShadow: "0 30px 60px -30px oklch(0.78 0.13 215 / 0.4), 0 0 0 1px oklch(0.78 0.13 215 / 0.25)" }
          : undefined
      }
    >
      {plan.highlight && (
        <span
          className="absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-medium text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Star className="h-3 w-3" /> Mais escolhido
        </span>
      )}
      <h4 className="font-display text-lg font-semibold">{plan.name}</h4>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-display text-3xl font-semibold text-foreground">{plan.price}</span>
        {plan.priceSuffix && <span className="text-sm text-muted-foreground">{plan.priceSuffix}</span>}
      </div>
      {plan.setup && (
        <p className="mt-1 text-xs text-muted-foreground">{plan.setup}</p>
      )}
      <ul className="mt-5 space-y-2.5 text-sm">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-foreground/90">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={WA(`Olá! Tenho interesse no plano "${plan.name}" da Fluxo.`)}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.02]",
          plan.highlight
            ? "text-primary-foreground"
            : "border border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08]",
        )}
        style={plan.highlight ? { background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" } : undefined}
      >
        {plan.cta} <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCta() {
  return (
    <section className="px-4 pb-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/10 p-10 text-center sm:p-16"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.22 0.013 260), oklch(0.18 0.012 260))",
            }}
          >
            <div className="glow-orb -top-20 left-1/2 h-80 w-80 -translate-x-1/2" style={{ background: "oklch(0.78 0.13 215 / 0.45)" }} />
            <div className="glow-orb bottom-0 right-0 h-72 w-72" style={{ background: "oklch(0.82 0.14 180 / 0.35)" }} />

            <p className="relative text-xs font-medium uppercase tracking-[0.22em] text-primary/80">
              Modernize seu negócio
            </p>
            <h2 className="relative mt-3 font-display text-3xl font-semibold leading-tight sm:text-5xl">
              Pronto pra parar de perder cliente?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
              Primeira semana grátis. A gente conversa, entende sua rotina e monta a solução
              que faz sentido — sem pressa, sem promessa furada.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={WA("Olá! Quero começar com a Fluxo e aproveitar a primeira semana grátis.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
              >
                Quero minha primeira semana grátis
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#planos"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-foreground hover:bg-white/[0.08]"
              >
                Rever planos
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-sm font-bold text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            F
          </span>
          <div>
            <p className="font-display text-base font-semibold">Fluxo</p>
            <p className="text-xs text-muted-foreground">Tecnologia que tira trabalho das suas costas.</p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#solucoes" className="hover:text-foreground">Soluções</a>
          <a href="#planos" className="hover:text-foreground">Planos</a>
          <a href="#processo" className="hover:text-foreground">Como funciona</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
          {/* TODO: REVISÃO — Adicionar link do Instagram profissional quando criar o perfil. Ex: <a href="https://instagram.com/SEU_PERFIL" ...><Instagram /> Instagram</a> */}
        </nav>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Fluxo. Feito com cuidado.</p>
      </div>
    </footer>
  );
}
