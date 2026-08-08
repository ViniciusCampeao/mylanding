import { motion } from "motion/react";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";
import { useIsMobile as useMobile } from "@/hooks/use-mobile";
import { SkillChip } from "./skill-chip";

export function SkillsSection() {
  const t = useT();
  const isMobile = useMobile();

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div
        className="glow-orb absolute top-0 right-0 h-72 w-72"
        style={{ background: "#2d1a3d", opacity: 0.3 }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest" style={{ color: "#4a7a4a40" }}>
            04
          </span>
          <div className="hairline flex-1" />
        </div>

        <h2
          className="font-display mb-3 tracking-wider uppercase"
          style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)", color: "#c8d4c0" }}
        >
          {t(content.skills.sectionTitle)}
        </h2>
        <p
          className="mb-10 max-w-lg sm:mb-12"
          style={{
            fontFamily: "DM Serif Text, serif",
            fontStyle: "italic",
            color: "#8a9c84",
            fontSize: "clamp(0.9rem, 2.6vw, 1rem)",
          }}
        >
          {t(content.skills.sectionSubtitle)}
        </p>

        <div className="space-y-8 sm:space-y-10">
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
                  className="font-mono text-[9px] tracking-[0.25em] uppercase sm:tracking-[0.3em]"
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
                    projectId={item.projectId}
                    index={gi * 3 + ii}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
