import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github } from "lucide-react";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";
import type { Project } from "@/content/types";
import { getLenis } from "@/components/providers/smooth-scroll";

interface ProjectOverlayProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  const t = useT();

  useEffect(() => {
    const lenis = getLenis();
    if (project) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => lenis?.start();
  }, [project]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Scrim */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            layoutId={`project-card-${project.id}`}
            className="fixed inset-4 z-50 overflow-auto rounded-3xl bg-surface md:inset-8 lg:inset-16"
            style={{ border: `1px solid ${project.color}30` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header glow */}
            <div
              className="absolute inset-x-0 top-0 h-64 opacity-20"
              style={{
                background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${project.color}, transparent)`,
              }}
            />

            <div className="relative p-8 md:p-12">
              <button
                onClick={onClose}
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                aria-label={t(content.portfolio.close)}
              >
                <X size={18} />
              </button>

              <div className="mb-2 flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: project.color }}
                />
                <span className="font-mono text-xs" style={{ color: project.color }}>
                  {project.status === "production"
                    ? t({ pt: "Em produção", en: "In production" })
                    : t({ pt: "Ativo", en: "Active" })}
                </span>
              </div>

              <h2 className="font-display mb-2 text-3xl font-bold md:text-5xl">
                {t(project.title)}
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">{t(project.tagline)}</p>

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-mono mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {t({ pt: "Descrição", en: "Description" })}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{t(project.description)}</p>

                  <h3 className="font-mono mb-3 mt-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {t({ pt: "Meu papel", en: "My role" })}
                  </h3>
                  <p className="text-foreground/80">{t(project.role)}</p>
                </div>

                <div>
                  <h3 className="font-mono mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {t(content.portfolio.techStack)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          background: `${project.color}20`,
                          color: project.color,
                          border: `1px solid ${project.color}30`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.port && (
                    <div className="mt-6">
                      <h3 className="font-mono mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        {t({ pt: "Porta / Deploy", en: "Port / Deploy" })}
                      </h3>
                      <p className="font-mono text-sm text-primary">
                        :{project.port} → VPS → Cloudflare Tunnel
                      </p>
                    </div>
                  )}

                  <div className="mt-8 flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-pill flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors hover:text-foreground"
                      >
                        <Github size={14} />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        <ExternalLink size={14} />
                        {t(content.portfolio.viewProject)}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
