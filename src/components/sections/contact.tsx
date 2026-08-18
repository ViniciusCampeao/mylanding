import { useState } from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Copy, Check, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";
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
    t(content.contact.whatsappMsg),
  )}`;
  const mailtoUrl = `mailto:${content.meta.email}`;

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      {/* Orbs */}
      <div
        className="glow-orb absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 sm:h-[500px] sm:w-[500px]"
        style={{ background: "#4a7a4a", opacity: 0.12 }}
      />
      <div
        className="glow-orb absolute -bottom-20 right-1/4 h-48 w-48 sm:h-64 sm:w-64"
        style={{ background: "#2d1a3d", opacity: 0.25 }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-4 flex items-center justify-center">
          <span className="font-mono text-xs tracking-widest" style={{ color: "#4a7a4a40" }}>
            06
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mb-3 tracking-wider uppercase"
          style={{ fontSize: "clamp(2.75rem, 12vw, 9rem)", color: "#c8d4c0", lineHeight: 0.9 }}
        >
          {t(content.contact.sectionTitle)}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8 font-mono text-sm sm:mb-10"
          style={{ color: "#8a9c84" }}
        >
          {t(content.contact.ctaSubtitle)}
        </motion.p>

        {/* CTA principal → e-mail direto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <a
            href={mailtoUrl}
            className="group inline-flex items-center gap-3 px-8 py-5 text-lg transition-shadow duration-300 sm:px-12 sm:py-6 sm:text-2xl"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.1em",
              color: "#050808",
              background: "linear-gradient(135deg, #5a9a5a, #2d6a2d)",
              borderRadius: "3px",
              boxShadow: "0 0 40px rgb(74 122 74 / 0.25)",
            }}
          >
            <Mail size={20} className="flex-shrink-0" />
            <span className="whitespace-nowrap">{t(content.contact.cta)}</span>
          </a>
        </motion.div>

        {/* Email copy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="break-all font-mono text-sm" style={{ color: "#8a9c84" }}>
            {content.meta.email}
          </span>
          <button
            onClick={copyEmail}
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm transition-all"
            style={{ border: "1px solid #4a7a4a50", color: "#8a9c84" }}
            title={t(content.contact.copyEmail)}
          >
            {copied ? <Check size={12} style={{ color: "#4a7a4a" }} /> : <Copy size={12} />}
          </button>
        </motion.div>

        {/* WhatsApp — card secundário, estático */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-10 flex justify-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card flex w-full max-w-xs flex-col items-center gap-1 px-6 py-4 transition-colors sm:w-auto"
          >
            <span className="flex items-center gap-3">
              <MessageCircle size={18} style={{ color: "#7aaa7a" }} className="flex-shrink-0" />
              <span className="font-mono text-sm tracking-wide" style={{ color: "#dce8d6" }}>
                {t(content.contact.whatsappCta)}
              </span>
            </span>
            <span className="font-mono text-xs" style={{ color: "#8a9c84" }}>
              {content.meta.whatsappDisplay}
            </span>
          </a>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          {[
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
      <footer
        className="relative mx-auto mt-16 max-w-6xl px-6 pt-8 sm:mt-20"
        style={{ borderTop: "1px solid rgb(74 122 74 / 0.10)" }}
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center font-mono text-xs" style={{ color: "#7a9074" }}>
            <span style={{ color: "#7aaa7a" }}>vinicius@vps</span>
            <span style={{ color: "#5a7a56" }}>:~$</span> {t(content.contact.footer)}
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
