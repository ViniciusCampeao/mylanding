import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Github, GraduationCap, FlaskConical } from "lucide-react";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function ManifestoText({ reduced }: { reduced: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const text = t(content.about.manifesto);

  useGSAP(() => {
    if (reduced || !containerRef.current) return;
    const words = containerRef.current.querySelectorAll(".manifesto-word");
    gsap.fromTo(
      words,
      { opacity: 0.08 },
      {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 35%",
          scrub: 1.0,
        },
      }
    );
  }, { scope: containerRef, dependencies: [text] });

  return (
    <div ref={containerRef} className="max-w-2xl">
      <p
        className="leading-tight"
        style={{
          fontFamily: "DM Serif Text, Georgia, serif",
          fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
          color: "#c8d4c0",
          lineHeight: 1.3,
        }}
      >
        {text.split(" ").map((word, i) => (
          <span
            key={i}
            className="manifesto-word mr-[0.25em] inline-block"
            style={{ opacity: 0.08 }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}

function IdentityCard() {
  const t = useT();
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 18 });
  const glowX = useTransform(springY, [-15, 15], ["0%", "100%"]);
  const glowY = useTransform(springX, [-15, 15], ["0%", "100%"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10);
    rotateX.set(-((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 10);
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
      className="glass-card relative overflow-hidden p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Glow dinâmico — verde não azul */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, #4a7a4a18, transparent 60%)`,
        }}
      />

      <div className="relative space-y-4">
        {/* Monograma */}
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center font-display text-2xl tracking-wider"
            style={{
              background: "linear-gradient(135deg, #0a0f0a, #1a3a1a)",
              border: "1px solid #4a7a4a30",
              borderRadius: "4px",
              color: "#4a7a4a",
            }}
          >
            VC
          </div>
          <div>
            <p
              className="font-display text-lg tracking-wider uppercase"
              style={{ color: "#c8d4c0" }}
            >
              {content.meta.name}
            </p>
            <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#4a7a4a" }}>
              {t(content.meta.tagline).split("•")[0].trim()}
            </p>
          </div>
        </div>

        <div className="hairline" />

        <div className="space-y-2">
          {[
            { icon: GraduationCap, text: t(content.meta.university) },
            {
              icon: Github,
              text: `@${content.meta.githubUsername}`,
              href: `https://github.com/${content.meta.githubUsername}`,
            },
          ].map(({ icon: Icon, text, href }) => (
            <div key={text} className="flex items-center gap-2 font-mono text-xs" style={{ color: "#6b7d66" }}>
              <Icon size={11} style={{ color: "#4a7a4a50" }} />
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className="transition-colors hover:text-[#c8d4c0]">{text}</a>
              ) : <span>{text}</span>}
            </div>
          ))}
        </div>

        <div className="hairline" />

        {/* IC research — destaque */}
        <div
          className="rounded p-3"
          style={{ background: "rgb(74 122 74 / 0.06)", border: "1px solid rgb(74 122 74 / 0.12)" }}
        >
          <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase" style={{ color: "#4a7a4a" }}>
            <FlaskConical size={11} />
            {t(content.about.researchTitle)}
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "#6b7d66" }}>
            {t(content.about.researchDescription)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const t = useT();
  const reduced = useReducedMotion();

  return (
    <section id="about" className="relative py-32">
      {/* Orbs floresta */}
      <div className="glow-orb absolute -top-40 left-1/4 h-96 w-96" style={{ background: "#4a7a4a" }} />
      <div className="glow-orb absolute top-1/2 right-0 h-64 w-64" style={{ background: "#2d1a3d" }} />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section index */}
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest" style={{ color: "#4a7a4a40" }}>01</span>
          <div className="hairline flex-1" />
        </div>

        <h2
          className="font-display mb-16 tracking-wider uppercase"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#c8d4c0" }}
        >
          {t(content.nav.about)}
        </h2>

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <ManifestoText reduced={reduced} />
          <div className="flex flex-col gap-6">
            <IdentityCard />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="leading-relaxed"
              style={{
                fontFamily: "DM Serif Text, Georgia, serif",
                fontStyle: "italic",
                color: "#6b7d66",
                fontSize: "0.95rem",
              }}
            >
              {t(content.meta.bio)}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
