import { useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";
import { ProjectCard } from "./project-card";

/* ─────────────────────────────────────────────────────────────
   Grid de projetos, agrupado por categoria, com expansão inline.
   Todos os cards ficam visíveis. Clicar expande o card
   com animação layoutId, mostrando descrição completa.
   Intuitivo, sem carrossel, sem tela travada.
   ───────────────────────────────────────────────────────────── */

export function PortfolioSection() {
  const t = useT();
  const [expanded, setExpanded] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setExpanded(null), []);

  return (
    <section id="portfolio" className="relative py-32" ref={containerRef}>
      <div
        className="glow-orb absolute bottom-0 left-1/3 h-80 w-80"
        style={{ background: "#1a6a8a", opacity: 0.12 }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest" style={{ color: "#3a9ab070" }}>
            02
          </span>
          <div className="hairline flex-1" />
        </div>
        <h2
          className="font-display mb-3 tracking-wider uppercase"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#d3e2e4" }}
        >
          {t(content.portfolio.sectionTitle)}
        </h2>
        <p
          className="mb-10 max-w-lg"
          style={{
            fontFamily: "var(--font-sans)",
            color: "#a9bfa1",
            fontSize: "clamp(0.95rem, 2.4vw, 1.05rem)",
          }}
        >
          {t(content.portfolio.sectionSubtitle)}
        </p>

        {/* Uma subseção por categoria — cada uma com sua própria grid.
            Card expandido vai para coluna-full automaticamente via gridColumn. */}
        <div className="space-y-16">
          {content.portfolio.categories.map((category) => {
            const projects = content.portfolio.projects.filter((p) => p.category === category.id);
            if (projects.length === 0) return null;

            return (
              <div key={category.id}>
                <div className="mb-5 flex min-w-0 items-center gap-2 sm:gap-3">
                  <span
                    className="flex-shrink-0 font-mono text-xs tracking-[0.2em] sm:tracking-[0.3em]"
                    style={{ color: "#3a9ab0" }}
                  >
                    {category.number}
                  </span>
                  <h3
                    className="truncate font-mono text-[11px] tracking-[0.15em] uppercase sm:text-xs sm:tracking-[0.3em]"
                    style={{ color: "#7a9c9a" }}
                  >
                    {t(category.label)}
                  </h3>
                  <div className="hairline min-w-4 flex-1" style={{ opacity: 0.5 }} />
                </div>

                <motion.div
                  layout
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {projects.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                      expanded={expanded === project.id}
                      onExpand={() => setExpanded(project.id)}
                      onClose={handleClose}
                    />
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
