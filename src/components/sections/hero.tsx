import { lazy, Suspense, useRef } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const HeroCanvas = lazy(() => import("@/components/three/hero-canvas"));

function HeroFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 40% 30%, #0a2a3a20 0%, #04121c14 50%, transparent 75%), #04070c",
      }}
    />
  );
}

const ease = "circOut" as const;

export function HeroSection() {
  const t = useT();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Scroll hint some conforme rola (primeira "tela" de scroll)
  const { scrollY } = useScroll();
  const hintOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const hintY = useTransform(scrollY, [0, 200], [0, 24]);

  function fadeUp(delay: number) {
    return {
      initial: { opacity: 0, y: reduced ? 0 : 32 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 1.0, ease, delay: reduced ? 0 : delay },
    };
  }

  return (
    <section
      ref={wrapperRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      <ClientOnly fallback={<HeroFallback />}>
        <Suspense fallback={<HeroFallback />}>
          <HeroCanvas wrapperRef={wrapperRef} />
        </Suspense>
      </ClientOnly>

      {/* Scrim de contraste radial — garante que o texto seja sempre legível */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgb(5 8 8 / 0.72) 0%, rgb(5 8 8 / 0.35) 45%, transparent 75%)",
        }}
      />

      {/* Fade para o preto no fundo */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56"
        style={{ background: "linear-gradient(to bottom, transparent, #050808)" }}
      />

      {/* Conteúdo */}
      <div className="relative z-20 mx-auto w-full max-w-5xl px-6 text-center">
        <div className="flex flex-col items-center">

          {/* Eyebrow mono */}
          <motion.p
            {...fadeUp(0.2)}
            className="mb-4 font-mono text-[11px] tracking-[0.35em] uppercase sm:text-xs"
            style={{ color: "#3a9ab0" }}
          >
            {t(content.hero.greeting)}
          </motion.p>

          {/* Nome — Bebas Neue máximo. Cada linha com caixa de altura fixa
              (leading-[0.85] + line-height reservada) pra nunca colidir */}
          <motion.h1
            {...fadeUp(0.4)}
            className="font-display tracking-wider uppercase"
            style={{ fontSize: "clamp(3rem, 12vw, 10.5rem)", lineHeight: 0.86 }}
          >
            <span
              className="block"
              style={{ color: "#d3e2e4", textShadow: "0 0 120px #1a6a8a25" }}
            >
              {content.meta.name.split(" ")[0]}
            </span>
            <span className="block text-gradient">
              {content.meta.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          {/* Role — DM Serif italic */}
          <motion.p
            {...fadeUp(0.65)}
            className="mt-6 max-w-md text-base leading-snug sm:mt-5"
            style={{
              fontFamily: "DM Serif Text, Georgia, serif",
              fontStyle: "italic",
              color: "#7a94a0",
            }}
          >
            {t(content.meta.tagline)}
          </motion.p>

          {/* Tags */}
          <motion.div
            {...fadeUp(0.8)}
            className="mt-4 flex flex-wrap justify-center gap-2"
          >
            {["React", "Node.js", "Docker", "VPS", "UTFPR"].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-widest uppercase"
                style={{
                  color: "#3a9ab0aa",
                  padding: "3px 10px",
                  border: "1px solid #2a7a9030",
                  borderRadius: "2px",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Scroll hint — some conforme rola */}
          <motion.div
            {...fadeUp(1.1)}
            className="mt-8 sm:mt-12"
            style={{ opacity: reduced ? 1 : hintOpacity, y: reduced ? 0 : hintY }}
          >
            <motion.div
              animate={reduced ? {} : { y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
              style={{ color: "#3a9ab080" }}
            >
              <div
                style={{
                  width: 1,
                  height: 40,
                  background: "linear-gradient(to bottom, #3a9ab080, transparent)",
                }}
              />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase">
                {t(content.hero.scrollHint)}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
