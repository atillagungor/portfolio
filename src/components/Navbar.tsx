import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Nav");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#" className="font-mono text-sm font-semibold">
          atilla<span className="text-accent">.</span>dev
        </a>
        <div className="flex items-center gap-6 text-sm text-white/85">
          <a href="#about" className="transition-colors hover:text-white">{t("about")}</a>
          <a href="#projects" className="transition-colors hover:text-white">{t("projects")}</a>
          <a href="#contact" className="transition-colors hover:text-white">{t("contact")}</a>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}