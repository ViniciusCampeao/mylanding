// GSAP core + useGSAP — seguros para SSR (não tocam DOM na importação)
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export { gsap, useGSAP };

/**
 * Registra ScrollTrigger + DrawSVGPlugin.
 * Deve ser chamado UMA vez, síncronamente, dentro de useEffect
 * (garantindo que window exista). Como é síncrono dentro do useEffect
 * do GsapProvider que monta ANTES dos filhos, não há race condition.
 *
 * Os imports dinâmicos já estão nos chunks do bundle (Vite os inclui
 * no cliente) — o `await` resolve quasi-imediatamente (microtask).
 */
let _ready = false;

export async function initGsapPlugins() {
  if (_ready || typeof window === "undefined") return;

  const [{ default: ScrollTrigger }, { default: DrawSVGPlugin }] =
    await Promise.all([
      import("gsap/ScrollTrigger"),
      import("gsap/DrawSVGPlugin"),
    ]);

  gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);
  gsap.defaults({ ease: "power3.out" });
  _ready = true;
}
