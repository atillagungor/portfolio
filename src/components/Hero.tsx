"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import TypedRole from "./TypedRole";
import { useIntroDelay } from "@/lib/intro";

const ease = [0.22, 1, 0.36, 1] as const;
const gradient =
  "bg-[linear-gradient(90deg,var(--accent),#22d3ee)] bg-clip-text text-transparent";

export default function Hero() {
  const t = useTranslations("Hero");
  const delay = useIntroDelay();
  const ready = delay !== null;
  const base = delay ?? 0;
  const words = t("title").split(" ");

  const fade = (offset: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, ease, delay: base + offset },
  });

  return (
    <section className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6">
      <motion.p {...fade(0)} className="mb-6 font-mono text-sm text-accent">
        <TypedRole />
      </motion.p>

      <h1 className="text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.95] tracking-tighter">
        {words.map((word, i) => (
          <span
            key={i}
            className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className={`inline-block ${i === words.length - 1 ? gradient : ""}`}
              initial={{ y: "110%", rotate: 6 }}
              animate={ready ? { y: 0, rotate: 0 } : {}}
              transition={{ duration: 1, ease, delay: base + 0.1 + i * 0.12 }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p {...fade(0.6)} className="mt-8 max-w-xl text-lg text-muted">
        {t("subtitle")}
      </motion.p>

      <motion.div {...fade(0.75)} className="mt-10 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:scale-105"
        >
          {t("cta")}
        </a>
        <a
          href="#contact"
          className="rounded-full border border-border px-6 py-3 text-sm transition hover:border-accent hover:text-accent"
        >
          {t("contact")}
        </a>
        <a
          href="/cv/Atilla-Gungor-CV.pdf"
          download
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition hover:border-accent hover:text-accent"
        >
          <Download className="h-4 w-4" />
          {t("cv")}
        </a>
      </motion.div>

      <motion.div
        {...fade(1)}
        className="absolute bottom-10 left-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted"
      >
        <span className="relative block h-12 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-accent"
            animate={{ y: [-16, 48] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        {t("scroll")}
      </motion.div>
    </section>
  );
}
