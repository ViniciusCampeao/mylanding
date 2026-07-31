import { useState } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Copy, Check, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Magnetic } from "@/components/ux/magnetic";
import { LanguageToggle } from "@/components/ux/language-toggle";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";

export function ContactSection() {
  const t = useT();
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(content.meta.email);
    setCopied(true);
    toast.success(t(content.contact.copied));
    setTimeout(() => setCopied(false), 2000);
  }

  const whatsappUrl = `https://wa.me/${content.meta.whatsapp}?text=${encodeURIComponent(
    t(content.contact.whatsappMsg)
  )}`;

  return (
    <section id="contact" className="relative overflow-hidden py-32">
      {/* Orbs */}
      <div className="glow-orb absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2"
        style={{ background: "#4a7a4a", opacity: 0.12 }} />
      <div className="glow-orb absolute -bottom-20 right-1/4 h-64 w-64"
        style={{ background: "#2d1a3d", opacity: 0.25 }} />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-4 flex items-center justify-center">
          <span className="font-mono text-xs tracking-widest" style={{ color: "#4a7a4a40" }}>05</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mb-10 tracking-wider uppercase"
          style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)", color: "#c8d4c0", lineHeight: 0.9 }}
        >
          {t(content.contact.sectionTitle)}
        </motion.h2>

        {/* CTA magnético → WhatsApp. Área de atração ampliada com padding invisível */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mb-10 flex justify-center"
        >
          <Magnetic strength={0.5} radius={2.4} className="inline-flex p-10 -m-10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-12 py-6 transition-all duration-300"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "1.75rem",
                letterSpacing: "0.12em",
                color: "#050808",
                background: "linear-gradient(135deg, #5a9a5a, #2d6a2d)",
                borderRadius: "3px",
                boxShadow: "0 0 40px rgb(74 122 74 / 0.25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 70px #4a7a4a55, 0 0 140px #4a7a4a25";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgb(74 122 74 / 0.25)";
              }}
            >
              <MessageCircle size={22} />
              {t(content.contact.cta)}
            </a>
          </Magnetic>
        </motion.div>

        {/* Email copy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="font-mono text-sm" style={{ color: "#8a9c84" }}>
            {content.meta.email}
          </span>
          <button
            onClick={copyEmail}
            className="flex h-7 w-7 items-center justify-center rounded-sm transition-all"
            style={{ border: "1px solid #4a7a4a50", color: "#8a9c84" }}
            title={t(content.contact.copyEmail)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#4a7a4a80";
              (e.currentTarget as HTMLElement).style.color = "#4a7a4a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#4a7a4a30";
              (e.currentTarget as HTMLElement).style.color = "#4a7a4a60";
            }}
          >
            {copied ? <Check size={12} style={{ color: "#4a7a4a" }} /> : <Copy size={12} />}
          </button>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { href: whatsappUrl, icon: MessageCircle },
            { href: `https://github.com/${content.meta.githubUsername}`, icon: Github },
            { href: content.meta.linkedinUrl, icon: Linkedin },
          ].map(({ href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-sm transition-all duration-300"
              style={{ border: "1px solid #4a7a4a45", color: "#8a9c84" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#4a7a4a80";
                (e.currentTarget as HTMLElement).style.color = "#e2ead9";
                (e.currentTarget as HTMLElement).style.background = "rgb(74 122 74 / 0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#4a7a4a45";
                (e.currentTarget as HTMLElement).style.color = "#8a9c84";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative mx-auto mt-20 max-w-6xl px-6 pt-8"
        style={{ borderTop: "1px solid rgb(74 122 74 / 0.10)" }}>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-mono text-xs" style={{ color: "#7a9074" }}>
            <span style={{ color: "#7aaa7a" }}>vinicius@vps</span>
            <span style={{ color: "#5a7a56" }}>:~$</span>{" "}
            {t(content.contact.footer)}
          </p>
          <div className="flex items-center gap-4">
            <p className="font-mono text-xs" style={{ color: "#6b7d66" }}>
              {t(content.contact.builtWith)}
            </p>
            <LanguageToggle />
          </div>
        </div>
        <p className="mt-4 text-center font-mono text-xs" style={{ color: "#5a7a56" }}>
          © {new Date().getFullYear()} {content.meta.name}
        </p>
      </footer>
    </section>
  );
}
