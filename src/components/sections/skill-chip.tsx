import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Magnetic } from "@/components/ux/magnetic";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";

/* ─────────────────────────────────────────────────────────────
   Chip de skill ligado a um projeto — só informativo. Passar o
   mouse (ou tocar, no mobile) mostra qual projeto usa essa skill.
   Sem navegação: já teve um "ir direto pro projeto" aqui, mas o
   scroll/expand entre seções quebrava em produção — removido.
   ───────────────────────────────────────────────────────────── */

export function SkillChip({
  name,
  projectId,
  index,
  isMobile,
}: {
  name: string;
  projectId?: string;
  index: number;
  isMobile: boolean;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const project = content.portfolio.projects.find((p) => p.id === projectId);

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
    >
      <Magnetic strength={isMobile ? 0 : 0.28}>
        <motion.button
          type="button"
          onClick={() => isMobile && setOpen((v) => !v)}
          className="skill-chip cursor-pointer select-none font-mono text-xs tracking-widest uppercase"
          style={{
            color: "#c3d6bd",
            border: "1px solid #4a7a4a40",
            background: "rgb(10 18 10 / 0.55)",
            padding: "6px 14px",
            borderRadius: "2px",
            transition: "all 0.2s ease",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.035, duration: 0.5 }}
          whileHover={{
            color: "#e8f0e2",
            borderColor: "#4a7a4a90",
            background: "rgb(74 122 74 / 0.18)",
            y: -2,
          }}
        >
          {name}
        </motion.button>
      </Magnetic>

      <AnimatePresence>
        {open && project && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2"
            style={{
              borderRadius: "4px",
              border: `1px solid ${project.color}40`,
              background: "#020403f7",
              padding: "12px 14px",
              boxShadow: "0 8px 24px rgb(0 0 0 / 0.5)",
            }}
          >
            <p
              className="font-mono text-[9px] tracking-widest uppercase"
              style={{ color: project.color }}
            >
              {t({ pt: "Usado em", en: "Used in" })}
            </p>
            <p
              className="font-display mt-0.5 tracking-wide uppercase"
              style={{ color: "#f0f5ec", fontSize: "1rem" }}
            >
              {t(project.title)}
            </p>
            <p
              className="mt-1 leading-snug"
              style={{
                fontFamily: "var(--font-sans)",
                color: "#a3b89c",
                fontSize: "0.85rem",
              }}
            >
              {t(project.tagline)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
