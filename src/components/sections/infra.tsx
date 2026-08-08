import { motion } from "motion/react";
import { Shield, Server, Globe, DatabaseBackup, Wifi } from "lucide-react";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";
import { InfraDiagram } from "./infra-diagram";

const highlights = [
  {
    icon: Globe,
    label: { pt: "Cloudflare Tunnel", en: "Cloudflare Tunnel" },
    desc: { pt: "Zero portas abertas ao mundo", en: "Zero ports exposed to the world" },
  },
  {
    icon: Shield,
    label: { pt: "UFW + Fail2Ban + Tailscale", en: "UFW + Fail2Ban + Tailscale" },
    desc: { pt: "Três camadas de segurança", en: "Three layers of security" },
  },
  {
    icon: Server,
    label: { pt: "Docker Compose Networks", en: "Docker Compose Networks" },
    desc: { pt: "Serviços isolados por rede", en: "Services isolated by network" },
  },
  {
    icon: DatabaseBackup,
    label: { pt: "Backup na AWS", en: "AWS Backup" },
    desc: { pt: "Cópia externa do banco de dados", en: "Off-site database copy" },
  },
  {
    icon: Wifi,
    label: { pt: "Link Redundante", en: "Redundant Link" },
    desc: { pt: "Segundo provedor em failover", en: "Second ISP as failover" },
  },
] as const;

export function InfraSection() {
  const t = useT();

  return (
    <section id="infra" className="relative py-32">
      <div
        className="glow-orb absolute bottom-16 right-0 h-80 w-80"
        style={{ background: "#4a7a4a", opacity: 0.12 }}
      />
      <div
        className="glow-orb absolute top-32 left-0 h-64 w-64"
        style={{ background: "#2d1a3d", opacity: 0.2 }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest" style={{ color: "#4a7a4a40" }}>
            03
          </span>
          <div className="hairline flex-1" />
        </div>

        <h2
          className="font-display mb-4 tracking-wider uppercase"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#c8d4c0" }}
        >
          {t(content.infra.sectionTitle)}
        </h2>

        <p
          className="mb-3 max-w-xl text-lg"
          style={{ fontFamily: "DM Serif Text, serif", fontStyle: "italic", color: "#6b7d66" }}
        >
          {t(content.infra.sectionSubtitle)}
        </p>

        <p
          className="mb-12 max-w-2xl font-mono text-sm leading-relaxed"
          style={{ color: "#7a9074" }}
        >
          {t(content.infra.description)}
        </p>

        {/* Highlight cards */}
        <div className="mb-10 flex flex-wrap gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card flex items-center gap-3 px-4 py-3"
            >
              <h.icon size={16} style={{ color: "#7aaa7a", flexShrink: 0 }} />
              <div>
                <p
                  className="font-mono text-sm tracking-widest uppercase"
                  style={{ color: "#e8efe2" }}
                >
                  {t(h.label as { pt: string; en: string })}
                </p>
                <p className="font-mono text-xs" style={{ color: "#8a9c84" }}>
                  {t(h.desc as { pt: string; en: string })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <InfraDiagram />
        </motion.div>

        {/* Experiência */}
        <div className="mt-24">
          <div className="mb-8 flex items-center gap-4">
            <span
              className="font-mono text-sm tracking-widest uppercase"
              style={{ color: "#7aaa7a" }}
            >
              {t(content.experience.sectionTitle)}
            </span>
            <div className="hairline flex-1" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {content.experience.entries.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="glass-card p-5"
              >
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  <h3
                    className="font-display tracking-wider uppercase"
                    style={{ fontSize: "1.6rem", color: "#e8efe2" }}
                  >
                    {exp.company}
                  </h3>
                  {t(exp.period) && (
                    <span
                      className="font-mono text-xs tracking-wider flex-shrink-0"
                      style={{ color: "#7aaa7a" }}
                    >
                      {t(exp.period)}
                    </span>
                  )}
                </div>
                <p
                  className="mb-3 font-mono text-sm tracking-widest uppercase"
                  style={{ color: "#7aaa7a" }}
                >
                  {t(exp.role)}
                </p>
                <ul className="space-y-1.5">
                  {exp.description.map((d, di) => (
                    <li key={di} className="text-sm leading-relaxed" style={{ color: "#9aab94" }}>
                      · {t(d)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
