import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { LanguageToggle } from "@/components/ux/language-toggle";
import { getLenis } from "@/components/providers/smooth-scroll";
import { useT } from "@/i18n/locale-context";
import { content } from "@/content/content";

const sections = [
  { id: "what-i-do", label: content.nav.whatIDo },
  { id: "about", label: content.nav.about },
  { id: "portfolio", label: content.nav.portfolio },
  { id: "infra", label: content.nav.infra },
  { id: "skills", label: content.nav.skills },
  { id: "contact", label: content.nav.contact },
];

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -60 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }

  function scrollToTop() {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled ? "rgb(5 8 8 / 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgb(74 122 74 / 0.12)" : "1px solid transparent",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo — VC em Bebas */}
          <button
            onClick={scrollToTop}
            className="font-display text-2xl tracking-widest uppercase transition-opacity hover:opacity-70"
            style={{ color: "#c8d4c0" }}
          >
            VC<span style={{ color: "#4a7a4a" }}>.</span>
          </button>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-8 md:flex">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="font-mono text-xs tracking-widest uppercase transition-colors"
                style={{ color: "#6b7d66" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c8d4c0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7d66")}
              >
                {t(s.label)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              className="flex items-center justify-center rounded-sm p-2 transition-colors md:hidden"
              style={{ color: "#6b7d66" }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
            style={{ background: "rgb(5 8 8 / 0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="font-display text-5xl tracking-widest uppercase"
                style={{ color: "#c8d4c080" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.07 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c8d4c0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#c8d4c080")}
              >
                {t(s.label)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
