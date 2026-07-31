import { useEffect, useState } from "react";
import { initGsapPlugins } from "@/lib/gsap";

/**
 * Garante que ScrollTrigger + DrawSVGPlugin estejam registrados
 * ANTES de qualquer filho montar e rodar useGSAP().
 *
 * No SSR: renderiza filhos normalmente (GSAP não existe no servidor).
 * No cliente: aguarda Promise de registro (resolve em ~1 microtask,
 * pois os chunks já estão no bundle) e só então monta os filhos.
 */
export function GsapProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initGsapPlugins().then(() => setReady(true));
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
