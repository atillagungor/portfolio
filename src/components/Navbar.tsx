"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const SECTIONS = ["about", "projects", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

export default function Navbar() {
  const t = useTranslations("Nav");
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    // Track which section crosses the middle band of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Clear the highlight when the user scrolls back to the hero.
    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-3">
      <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 py-1.5 pl-4 pr-1.5 shadow-lg shadow-black/30 backdrop-blur-xl sm:gap-2 sm:pl-5">
        <a href="#" className="mr-1 font-mono text-sm font-semibold text-white sm:mr-3">
          <span className="sm:hidden">a</span>
          <span className="hidden sm:inline">atilla</span>
          <span className="text-accent">.</span>
          <span className="hidden sm:inline">dev</span>
        </a>

        {SECTIONS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="relative rounded-full px-3 py-1.5 text-xs text-white/85 transition-colors hover:text-white sm:px-4 sm:text-sm"
          >
            {active === id && (
              <motion.span
                layoutId="nav-active-pill"
                className="absolute inset-0 rounded-full bg-accent/25 ring-1 ring-accent/50"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{t(id)}</span>
          </a>
        ))}

        <LanguageSwitcher />
      </nav>
    </header>
  );
}