"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const lenis = useLenis();

  const toTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-white/50 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Atilla Güngör. {t("rights")}
        </p>
        <p className="font-mono text-xs">{t("built")}</p>
        <button
          type="button"
          onClick={toTop}
          className="group inline-flex items-center gap-2 transition-colors hover:text-white"
        >
          {t("top")}
          <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}