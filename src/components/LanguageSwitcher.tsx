"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const locales = ["en", "tr"] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex rounded-full border border-border bg-white/5 p-1 backdrop-blur"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            aria-pressed={active}
            onClick={() => router.replace(pathname, { locale: l })}
            className={`relative z-10 rounded-full px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
              active ? "text-background" : "text-muted hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {l}
          </button>
        );
      })}
    </div>
  );
}