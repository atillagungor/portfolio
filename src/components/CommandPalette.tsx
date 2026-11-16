"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Copy,
  Download,
  ExternalLink,
  Folder,
  Languages,
  Mail,
  Search,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { author } from "@/lib/site";
import { useLenis } from "lenis/react";

const EMAIL = "atillaagungorr@gmail.com";
const CV_PATH = "/cv/Atilla-Gungor-CV.pdf";

type Command = {
  id: string;
  group: "navigate" | "actions";
  label: string;
  keywords: string;
  icon: LucideIcon;
  run: () => void;
};

export default function CommandPalette() {
  const t = useTranslations("Palette");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  // Global shortcuts: Ctrl/Cmd + K toggles, Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setActive(0);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (id: string) => {
    close();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) lenis.scrollTo(el);
      else el.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const openLink = (url: string) => {
    close();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const downloadCv = () => {
    close();
    const a = document.createElement("a");
    a.href = CV_PATH;
    a.download = "";
    a.click();
  };

  const switchLang = () => {
    close();
    router.replace(pathname, { locale: locale === "tr" ? "en" : "tr" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {}
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      close();
    }, 900);
  };

  const commands: Command[] = [
    {
      id: "about",
      group: "navigate",
      label: t("items.about"),
      keywords: "about hakkımda ben me",
      icon: User,
      run: () => goTo("about"),
    },
    {
      id: "experience",
      group: "navigate",
      label: t("items.experience"),
      keywords: "experience deneyim work iş education eğitim timeline",
      icon: Briefcase,
      run: () => goTo("experience"),
    },
    {
      id: "projects",
      group: "navigate",
      label: t("items.projects"),
      keywords: "projects projeler portfolio work",
      icon: Folder,
      run: () => goTo("projects"),
    },
    {
      id: "contact",
      group: "navigate",
      label: t("items.contact"),
      keywords: "contact iletişim mail reach",
      icon: Mail,
      run: () => goTo("contact"),
    },
    {
      id: "email",
      group: "actions",
      label: copied ? t("items.copied") : t("items.copyEmail"),
      keywords: "email mail e-posta kopyala copy",
      icon: Copy,
      run: copyEmail,
    },
    {
      id: "github",
      group: "actions",
      label: t("items.github"),
      keywords: "github git code kod",
      icon: ExternalLink,
      run: () => openLink(author.github),
    },
    {
      id: "linkedin",
      group: "actions",
      label: t("items.linkedin"),
      keywords: "linkedin profile profil",
      icon: ExternalLink,
      run: () => openLink(author.linkedin),
    },
    {
      id: "cv",
      group: "actions",
      label: t("items.cv"),
      keywords: "cv resume özgeçmiş download indir pdf",
      icon: Download,
      run: downloadCv,
    },
    {
      id: "lang",
      group: "actions",
      label: t("items.switchLang"),
      keywords: "language dil türkçe english ingilizce turkish tr en",
      icon: Languages,
      run: switchLang,
    },
  ];

  const q = query.trim().toLowerCase();
  const filtered = commands.filter(
    (c) => !q || `${c.label} ${c.keywords}`.toLowerCase().includes(q),
  );
  const current = Math.min(active, Math.max(filtered.length - 1, 0));

  // Keep the highlighted item visible while navigating with arrow keys
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [current, open]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const count = Math.max(filtered.length, 1);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((current + 1) % count);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((current - 1 + count) % count);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[current]?.run();
    }
  };

  return (
    <>
      {/* Floating trigger (also the entry point on touch devices) */}
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setQuery("");
          setActive(0);
        }}
        aria-label={t("open")}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2.5 text-xs text-white/80 shadow-lg shadow-black/30 backdrop-blur-xl transition hover:border-accent/50 hover:text-white"
      >
        <Search className="h-4 w-4" />
        <span className="hidden font-mono sm:inline">Ctrl K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="palette"
            data-lenis-prevent
            className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t("title")}
              onMouseDown={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#111113]/95 shadow-2xl shadow-black/60"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4">
                <Search className="h-4 w-4 shrink-0 text-white/50" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  placeholder={t("placeholder")}
                  className="h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                />
                <kbd className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/50">
                  Esc
                </kbd>
              </div>

              <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-white/50">
                    {t("empty")}
                  </p>
                )}

                {filtered.map((c, i) => {
                  const Icon = c.icon;
                  const showHeading =
                    i === 0 || filtered[i - 1].group !== c.group;
                  return (
                    <div key={c.id}>
                      {showHeading && (
                        <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
                          {t(`groups.${c.group}`)}
                        </p>
                      )}
                      <button
                        type="button"
                        data-active={i === current}
                        onMouseMove={() => setActive(i)}
                        onClick={c.run}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                          i === current
                            ? "bg-white/10 text-white"
                            : "text-white/70"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-accent" />
                        <span className="flex-1">{c.label}</span>
                        {i === current && (
                          <span className="font-mono text-xs text-white/40">
                            ↵
                          </span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-white/40">
                {t("footer")}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
