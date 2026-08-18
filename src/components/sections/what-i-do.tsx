import { motion } from "motion/react";
import { Code2, Server, Workflow, Cpu, type LucideIcon } from "lucide-react";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";

const ICONS: Record<string, LucideIcon> = {
  Code2,
  Server,
  Workflow,
  Cpu,
};

export function WhatIDoSection() {
  const t = useT();

  return (
    <section id="what-i-do" className="relative py-24 sm:py-32">
      <div
        className="glow-orb absolute -top-24 right-1/4 h-72 w-72"
        style={{ background: "#3a9ab0", opacity: 0.15 }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest" style={{ color: "#4a7a4a40" }}>
            01
          </span>
          <div className="hairline flex-1" />
        </div>

        <h2
          className="font-display mb-3 tracking-wider uppercase"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", color: "#c8d4c0" }}
        >
          {t(content.whatIDo.sectionTitle)}
        </h2>
        <p
          className="mb-10 max-w-lg sm:mb-14"
          style={{
            fontFamily: "DM Serif Text, serif",
            fontStyle: "italic",
            color: "#8a9c84",
            fontSize: "clamp(0.9rem, 2.6vw, 1rem)",
          }}
        >
          {t(content.whatIDo.sectionSubtitle)}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.whatIDo.groups.map((group, gi) => {
            const Icon = ICONS[group.icon];
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.08, duration: 0.5 }}
                className="glass-card flex flex-col gap-4 p-5 sm:p-6"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-md"
                  style={{
                    background: "rgb(74 122 74 / 0.10)",
                    border: "1px solid rgb(74 122 74 / 0.25)",
                  }}
                >
                  {Icon && <Icon size={18} style={{ color: "#7aaa7a" }} strokeWidth={1.7} />}
                </div>

                <p
                  className="font-mono text-xs tracking-[0.2em] uppercase"
                  style={{ color: "#c8d4c0" }}
                >
                  {t(group.label)}
                </p>

                <ul className="flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm leading-snug" style={{ color: "#9aab94" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
