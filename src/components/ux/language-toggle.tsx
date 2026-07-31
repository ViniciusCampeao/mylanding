import { motion } from "motion/react";
import { useLocale } from "@/i18n/locale-context";
import type { Locale } from "@/content/types";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  function toggle() {
    setLocale(locale === "pt" ? "en" : "pt");
  }

  return (
    <button
      onClick={toggle}
      className={`relative flex h-7 w-16 cursor-pointer items-center overflow-hidden rounded-sm px-1 ${className}`}
      style={{ background: "rgb(74 122 74 / 0.08)", border: "1px solid rgb(74 122 74 / 0.20)" }}
      aria-label="Toggle language"
    >
      <motion.div
        className="absolute inset-y-0.5 w-7 rounded-sm"
        style={{ background: "rgb(74 122 74 / 0.25)" }}
        animate={{ x: locale === "pt" ? 2 : 30 }}
        transition={{ type: "spring", stiffness: 500, damping: 38 }}
      />
      <div className="relative flex w-full justify-between px-1 font-mono text-[10px] font-medium tracking-widest uppercase">
        <span style={{ color: locale === "pt" ? "#c8d4c0" : "#4a7a4a60" }}>PT</span>
        <span style={{ color: locale === "en" ? "#c8d4c0" : "#4a7a4a60" }}>EN</span>
      </div>
    </button>
  );
}
