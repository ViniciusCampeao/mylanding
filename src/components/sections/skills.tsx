import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { Magnetic } from "@/components/ux/magnetic";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile as useMobile } from "@/hooks/use-mobile";

// Paleta floresta: nível 1=névoa, 2=musgo, 3=dossel
const levelStyle = {
  1: { color: "#4a6a4a80", border: "#4a7a4a18", bg: "transparent" },
  2: { color: "#7aaa7a",   border: "#4a7a4a35", bg: "rgb(74 122 74 / 0.05)" },
  3: { color: "#c8d4c0",   border: "#4a7a4a60", bg: "rgb(74 122 74 / 0.08)" },
} as const;

function SkillChip({
  name,
  level,
  index,
  isMobile,
}: {
  name: string;
  level: 1 | 2 | 3;
  index: number;
  isMobile: boolean;
}) {
  const s = levelStyle[level];
  return (
    <Magnetic strength={isMobile ? 0 : 0.28}>
      <motion.div
        className="skill-chip cursor-default select-none font-mono text-xs tracking-widest uppercase"
        style={{
          color: s.color,
          border: `1px solid ${s.border}`,
          background: s.bg,
          padding: "6px 14px",
          borderRadius: "2px",
          transition: "all 0.2s ease",
        }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.035, duration: 0.5 }}
        whileHover={{
          color: "#c8d4c0",
          borderColor: "#4a7a4a80",
          background: "rgb(74 122 74 / 0.12)",
          y: -2,
        }}
      >
        {name}
        {level === 3 && (
          <span
            className="ml-2 inline-block h-1 w-1 rounded-full"
            style={{ background: "#4a7a4a", verticalAlign: "middle" }}
          />
        )}
      </motion.div>
    </Magnetic>
  );
}

export function SkillsSection() {
  const t = useT();
  const isMobile = useMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="relative py-32">
      <div className="glow-orb absolute top-0 right-0 h-72 w-72" style={{ background: "#2d1a3d", opacity: 0.3 }} />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest" style={{ color: "#4a7a4a40" }}>02</span>
          <div className="hairline flex-1" />
        </div>

        <h2
          className="font-display mb-16 tracking-wider uppercase"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#c8d4c0" }}
        >
          {t(content.skills.sectionTitle)}
        </h2>

        <div ref={containerRef} className="space-y-10">
          {content.skills.groups.map((group, gi) => (
            <div key={group.id}>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.08, duration: 0.5 }}
                className="mb-4 flex items-center gap-3"
              >
                <span
                  className="font-mono text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: "#4a7a4a50" }}
                >
                  / {t(group.label)}
                </span>
                <div className="h-px flex-1" style={{ background: "rgb(74 122 74 / 0.10)" }} />
              </motion.div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => (
                  <SkillChip
                    key={item.name}
                    name={item.name}
                    level={item.level}
                    index={gi * 7 + ii}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé — frase com barra de "profundidade" animada (tema mar) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "#7aaa7a" }}>
              {t({ pt: "Profundidade por ferramenta", en: "Depth per tool" })}
            </span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgb(74 122 74 / 0.4), transparent)" }} />
          </div>
          <p
            className="max-w-xl leading-relaxed"
            style={{ fontFamily: "DM Serif Text, serif", fontStyle: "italic", color: "#8a9c84", fontSize: "0.95rem" }}
          >
            {t({
              pt: "O ponto que brilha marca onde eu mergulho fundo — do primeiro contato ao domínio em produção.",
              en: "The glowing dot marks where I dive deep — from first touch to production mastery.",
            })}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[9px] tracking-[0.2em] uppercase">
            {[
              { dot: "#4a6a4a", label: t({ pt: "Superfície", en: "Surface" }) },
              { dot: "#7aaa7a", label: t({ pt: "Meia-água", en: "Mid-water" }) },
              { dot: "#b6f0c0", label: t({ pt: "Abissal", en: "Abyssal" }) },
            ].map(({ dot, label }) => (
              <span key={label} className="flex items-center gap-1.5" style={{ color: "#7a9074" }}>
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: dot, boxShadow: dot === "#b6f0c0" ? `0 0 8px ${dot}` : "none" }}
                />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
