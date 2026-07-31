import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";
import type { Project } from "@/content/types";
import { X, Lock } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Grid de projetos com expansão inline.
   Todos os cards ficam visíveis. Clicar expande o card
   com animação layoutId, mostrando descrição completa.
   Intuitivo, sem carrossel, sem tela travada.
   ───────────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
  expanded,
  onExpand,
  onClose,
}: {
  project: Project;
  index: number;
  expanded: boolean;
  onExpand: () => void;
  onClose: () => void;
}) {
  const t = useT();

  return (
    <motion.article
      layout
      layoutId={`proj-${project.id}`}
      onClick={expanded ? undefined : onExpand}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      className="relative overflow-hidden"
      style={{
        borderRadius: "4px",
        border: `1px solid ${project.color}${expanded ? "60" : "28"}`,
        background: `#050808`,
        cursor: expanded ? "default" : "pointer",
        gridColumn: expanded ? "1 / -1" : undefined,
      }}
      whileHover={expanded ? {} : { scale: 1.01, transition: { duration: 0.2 } }}
    >
      {/* Fundo radial do projeto */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 20% 20%, ${project.color}14, transparent 65%)`,
        }}
      />

      <div className="relative p-6 sm:p-8">
        {/* Cabeçalho sempre visível */}
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: `${project.color}` }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.highlight && (
              <span
                className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5"
                style={{
                  background: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}25`,
                  borderRadius: "2px",
                }}
              >
                {t({ pt: "Destaque", en: "Featured" })}
              </span>
            )}
          </div>

          {expanded ? (
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="flex h-7 w-7 items-center justify-center rounded-sm transition-colors"
              style={{ border: `1px solid ${project.color}30`, color: `${project.color}80` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#e2ead9";
                (e.currentTarget as HTMLElement).style.borderColor = `${project.color}80`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = `${project.color}80`;
                (e.currentTarget as HTMLElement).style.borderColor = `${project.color}30`;
              }}
            >
              <X size={13} />
            </button>
          ) : null}
        </div>

        <h3
          className="font-display mb-1 tracking-wider uppercase"
          style={{ fontSize: expanded ? "clamp(2rem, 4vw, 2.8rem)" : "clamp(1.6rem, 3vw, 2.2rem)", color: "#e2ead9", lineHeight: 1 }}
        >
          {t(project.title)}
        </h3>
        <p
          className="mb-4"
          style={{
            fontFamily: "DM Serif Text, serif",
            fontStyle: "italic",
            color: "#8a9c84",
            fontSize: "1rem",
          }}
        >
          {t(project.tagline)}
        </p>

        {/* Detalhes — só aparece quando expandido */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p
                    className="mb-6 leading-relaxed"
                    style={{ fontFamily: "DM Serif Text, serif", color: "#9aab94", fontSize: "1rem" }}
                  >
                    {t(project.description)}
                  </p>
                  <div className="flex items-center gap-2 font-mono text-xs" style={{ color: "#5a7a56" }}>
                    <Lock size={11} />
                    <span>{t({ pt: "Código privado — projeto de cliente real", en: "Private code — real client project" })}</span>
                  </div>
                </div>
                <div>
                  <p className="mb-3 font-mono text-[10px] tracking-widest uppercase" style={{ color: `${project.color}80` }}>
                    {t({ pt: "Stack", en: "Stack" })}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs tracking-wide"
                        style={{
                          background: `${project.color}18`,
                          color: project.color,
                          border: `1px solid ${project.color}25`,
                          borderRadius: "2px",
                          padding: "4px 10px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 font-mono text-xs" style={{ color: `${project.color}90` }}>
                    {t(project.role)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer sempre visível (stack prévia + status) */}
        {!expanded && (
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs tracking-wide"
                  style={{
                    background: `${project.color}12`,
                    color: project.color,
                    border: `1px solid ${project.color}20`,
                    borderRadius: "2px",
                    padding: "3px 8px",
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="font-mono text-xs" style={{ color: "#6b7d66", borderRadius: "2px", padding: "3px 8px", border: "1px solid rgb(74 122 74 / 0.15)" }}>
                  +{project.stack.length - 4}
                </span>
              )}
            </div>
            <p className="font-mono text-sm" style={{ color: `${project.color}80` }}>
              {t(content.portfolio.viewProject)} →
            </p>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function PortfolioSection() {
  const t = useT();
  const [expanded, setExpanded] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setExpanded(null), []);

  return (
    <section id="portfolio" className="relative py-32" ref={containerRef}>
      <div className="glow-orb absolute bottom-0 left-1/3 h-80 w-80" style={{ background: "#1a6a8a", opacity: 0.12 }} />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest" style={{ color: "#3a9ab070" }}>03</span>
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
          style={{ fontFamily: "DM Serif Text, serif", fontStyle: "italic", color: "#8a9c9a" }}
        >
          {t(content.portfolio.sectionSubtitle)}
        </p>

        {/* Grid — 2 colunas desktop, 1 coluna mobile.
            Card expandido vai para coluna-full automaticamente via gridColumn. */}
        <motion.div
          layout
          className="grid gap-4 sm:grid-cols-2"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.portfolio.projects.map((project, i) => (
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
    </section>
  );
}
