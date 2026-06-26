import { MessageCircle } from "lucide-react";

const HREF =
  "https://wa.me/5514998077628?text=" +
  encodeURIComponent("Oi, vim pelo site da Fluxo e quero saber mais sobre as soluções.");

export function FloatingWhatsapp() {
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full text-primary-foreground shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] animate-pulse-ring sm:bottom-6 sm:right-6"
      style={{ background: "linear-gradient(135deg, oklch(0.78 0.16 160), oklch(0.7 0.18 150))" }}
    >
      <MessageCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full glass-pill px-3 py-1.5 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100 md:block">
        Fale agora no WhatsApp
      </span>
    </a>
  );
}
