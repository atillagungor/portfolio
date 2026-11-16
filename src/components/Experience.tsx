"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

const items = [
  { key: "mercanlar", type: "work" },
  { key: "etstur", type: "work" },
  { key: "anadolu", type: "education" },
  { key: "kocaeli", type: "education" },
] as const;

export default function Experience() {
  const t = useTranslations("Experience");
  const ref = useRef<HTMLUListElement>(null);

  // The accent line fills as the user scrolls through the timeline
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-40">
      <div className="grid gap-16 md:grid-cols-[1fr_1.5fr]">
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal>
            <p className="mb-6 font-mono text-sm text-accent">{t("label")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {t("heading")}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-sm text-lg text-white/70">{t("subtitle")}</p>
          </Reveal>
        </div>

        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/10">
            <motion.div style={{ height: fill }} className="w-full bg-accent" />
          </div>

          <ul ref={ref} className="space-y-14">
            {items.map(({ key, type }) => {
              const bullets = t.raw(`items.${key}.bullets`) as string[];

              return (
                <li key={key} className="relative pl-10">
                  <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background" />

                  <Reveal>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-accent">
                        {t(`items.${key}.period`)}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/60">
                        {t(`types.${type}`)}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {t(`items.${key}.role`)}
                    </h3>
                    <p className="mt-1 text-white/60">{t(`items.${key}.org`)}</p>

                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/70">
                      {bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}