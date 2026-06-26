import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#segmentos", label: "Segmentos" },
  { href: "#planos", label: "Planos" },
  { href: "#processo", label: "Processo" },
  { href: "#faq", label: "FAQ" },
];

const WA = "https://wa.me/5514998077628?text=" + encodeURIComponent("Olá! Quero conhecer as soluções da Fluxo.");

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5">
      <nav
        className={cn(
          "flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-white/8 px-3 py-2 transition-all duration-500",
          scrolled
            ? "glass-pill shadow-[0_10px_40px_-20px_rgba(0,0,0,0.7)]"
            : "bg-transparent border-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2 pl-2 pr-1">
          <span
            className="grid h-7 w-7 place-items-center rounded-lg text-[13px] font-bold text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            F
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">Fluxo</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] sm:inline-flex"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            Falar agora
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={cn("absolute left-0 right-0 top-0 h-px bg-foreground transition", open && "translate-y-1.5 rotate-45")} />
              <span className={cn("absolute left-0 right-0 top-1.5 h-px bg-foreground transition", open && "opacity-0")} />
              <span className={cn("absolute left-0 right-0 top-3 h-px bg-foreground transition", open && "-translate-y-1.5 -rotate-45")} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-x-3 top-20 z-40 rounded-3xl glass-pill p-3 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-foreground hover:bg-white/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="px-1 pt-2">
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full px-4 py-3 text-center text-sm font-medium text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                Falar agora
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
