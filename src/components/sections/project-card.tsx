import { motion, AnimatePresence } from "motion/react";
import { useT } from "@/i18n/locale-context";
import type { Project } from "@/content/types";
import {
  X,
  Lock,
  Star,
  ChevronDown,
  Banknote,
  Building2,
  Pill,
  UtensilsCrossed,
  Clapperboard,
  Microscope,
  Server,
  Gauge,
  BatteryCharging,
  Activity,
  BrainCircuit,
  Sprout,
  Radio,
  Cpu,
  Bot,
  Box,
  Heart,
  Music,
  BarChart3,
  Camera,
  type LucideIcon,
} from "lucide-react";
import { ProjectDiagram } from "./project-diagram";

/* ─────────────────────────────────────────────────────────────
   Card de projeto — visual-first: ícone + título + uma linha de
   impacto. Texto longo (descrição, stack completa, papel) só
   aparece expandido, evitando poluição visual no grid.
   ───────────────────────────────────────────────────────────── */

const ICONS: Record<string, LucideIcon> = {
  Banknote,
  Building2,
  Pill,
  UtensilsCrossed,
  Clapperboard,
  Microscope,
  Server,
  Gauge,
  BatteryCharging,
  Activity,
  BrainCircuit,
  Sprout,
  Radio,
  Cpu,
  Bot,
  Heart,
  Music,
  BarChart3,
  Camera,
};

const STATUS_COLOR: Record<Project["status"], string> = {
  production: "#4ecb6b",
  active: "#4ab0e0",
  sporadic: "#c9a227",
  archived: "#6b7d66",
};

const STATUS_LABEL: Record<Project["status"], { pt: string; en: string }> = {
  production: { pt: "Em produção", en: "In production" },
  active: { pt: "Ativo", en: "Active" },
  sporadic: { pt: "Uso esporádico", en: "On and off" },
  archived: { pt: "Finalizado", en: "Completed" },
};

export function ProjectCard({
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
  const Icon = ICONS[project.icon] ?? Box;

  const statusLabel = t(STATUS_LABEL[project.status]);

  return (
    <motion.article
      layout
      layoutId={`proj-${project.id}`}
      id={`project-${project.id}`}
      onClick={expanded ? undefined : onExpand}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      className="relative overflow-hidden"
      style={{
        borderRadius: "6px",
        border: `1px solid ${project.color}${expanded ? "70" : "30"}`,
        background: "#060a08",
        cursor: expanded ? "default" : "pointer",
        gridColumn: expanded ? "1 / -1" : undefined,
      }}
      whileHover={
        expanded
          ? {}
          : { scale: 1.015, borderColor: `${project.color}60`, transition: { duration: 0.2 } }
      }
    >
      {/* Fundo radial do projeto */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 75% 65% at 15% 15%, ${project.color}1c, transparent 65%)`,
        }}
      />

      <div className="relative p-5 sm:p-7">
        {/* Cabeçalho: ícone + título + tagline, sempre visível */}
        <div className="flex items-start gap-4">
          <div
            className="flex flex-shrink-0 items-center justify-center"
            style={{
              width: expanded ? 60 : 48,
              height: expanded ? 60 : 48,
              borderRadius: "8px",
              background: `${project.color}1a`,
              border: `1px solid ${project.color}45`,
              transition: "width 0.2s, height 0.2s",
            }}
          >
            <Icon
              size={expanded ? 30 : 24}
              color={project.color}
              strokeWidth={1.6}
              style={{ transition: "all 0.2s" }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3
                className="font-display truncate tracking-wide uppercase"
                style={{
                  fontSize: expanded
                    ? "clamp(1.6rem, 4.5vw, 2.4rem)"
                    : "clamp(1.15rem, 3.6vw, 1.5rem)",
                  color: "#eef4e8",
                  lineHeight: 1.1,
                }}
              >
                {t(project.title)}
              </h3>
              {project.highlight && (
                <Star
                  size={14}
                  className="flex-shrink-0"
                  fill={project.color}
                  color={project.color}
                  strokeWidth={0}
                />
              )}
            </div>
            <p
              className="mt-1 leading-snug"
              style={{
                fontFamily: "var(--font-sans)",
                color: "#a9bfa1",
                fontSize: "clamp(0.88rem, 2.4vw, 0.98rem)",
                display: "-webkit-box",
                WebkitLineClamp: expanded ? undefined : 2,
                WebkitBoxOrient: "vertical",
                overflow: expanded ? "visible" : "hidden",
              }}
            >
              {t(project.tagline)}
            </p>
          </div>

          {expanded ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm transition-colors"
              style={{ border: `1px solid ${project.color}40`, color: "#c3d6bd" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#f0f5ec";
                (e.currentTarget as HTMLElement).style.borderColor = `${project.color}90`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#c3d6bd";
                (e.currentTarget as HTMLElement).style.borderColor = `${project.color}40`;
              }}
            >
              <X size={13} />
            </button>
          ) : (
            <ChevronDown size={16} className="mt-1 flex-shrink-0" color="#4a5a4a" />
          )}
        </div>

        {/* Status — discreto, sempre visível */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ background: STATUS_COLOR[project.status] }}
            />
            <span className="font-mono text-[10px] tracking-wide" style={{ color: "#7a8c76" }}>
              {statusLabel}
            </span>
          </div>
          {project.restricted && (
            <div className="flex items-center gap-1.5">
              <Lock size={10} className="flex-shrink-0" color="#7a8c76" />
              <span className="font-mono text-[10px] tracking-wide" style={{ color: "#7a8c76" }}>
                {t({ pt: "Divulgação restrita", en: "Restricted disclosure" })}
              </span>
            </div>
          )}
        </div>

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
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <p
                    className="leading-relaxed"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "#c1d1bb",
                      fontSize: "clamp(0.95rem, 2.4vw, 1.05rem)",
                    }}
                  >
                    {t(project.description)}
                  </p>
                  <p className="mt-3 font-mono text-xs" style={{ color: project.color }}>
                    {t(project.role)}
                  </p>
                </div>
                <div>
                  <p
                    className="mb-3 font-mono text-[10px] tracking-widest uppercase"
                    style={{ color: "#7a8c76" }}
                  >
                    {t({ pt: "Stack", en: "Stack" })}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs tracking-wide"
                        style={{
                          background: `${project.color}14`,
                          color: "#dce8d6",
                          border: `1px solid ${project.color}35`,
                          borderRadius: "2px",
                          padding: "4px 10px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {project.diagram && (
                <div className="mt-6">
                  <p
                    className="mb-3 font-mono text-[10px] tracking-widest uppercase"
                    style={{ color: "#7a8c76" }}
                  >
                    {t({ pt: "Arquitetura", en: "Architecture" })}
                  </p>
                  <ProjectDiagram diagram={project.diagram} color={project.color} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
