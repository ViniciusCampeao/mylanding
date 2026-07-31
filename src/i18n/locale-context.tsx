import { createContext, useContext, useEffect, useState } from "react";
import type { L, Locale } from "@/content/types";

interface LocaleContext {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (s: L) => string;
}

const Ctx = createContext<LocaleContext>({
  locale: "pt",
  setLocale: () => {},
  t: (s) => s.pt,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored === "pt" || stored === "en") {
      setLocaleState(stored);
    } else if (!navigator.language.startsWith("pt")) {
      setLocaleState("en");
    }
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem("locale", l);
    document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  }

  const t = (s: L) => s[locale];

  return <Ctx.Provider value={{ locale, setLocale, t }}>{children}</Ctx.Provider>;
}

export const useLocale = () => useContext(Ctx);
export const useT = () => useContext(Ctx).t;
