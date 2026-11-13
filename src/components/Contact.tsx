"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Email", value: "atillaagungorr@gmail.com", href: "mailto:atillaagungorr@gmail.com" },
  { label: "GitHub", value: "github.com/atillagungor", href: "https://github.com/atillagungor" },
  { label: "LinkedIn", value: "in/atilla-gungor", href: "https://tr.linkedin.com/in/atilla-gungor" },
];

const gradient =
  "bg-[linear-gradient(90deg,var(--accent),#22d3ee)] bg-clip-text text-transparent";

export default function Contact() {
  const t = useTranslations("Contact");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Headline flies towards the viewer and out of the screen
  const textScale = useTransform(p, [0, 0.45], [1, 14]);
  const textOpacity = useTransform(p, [0.2, 0.42], [1, 0]);
  const textBlur = useTransform(p, [0.2, 0.45], ["blur(0px)", "blur(14px)"]);

  // Links arrive from far away right behind it
  const panelOpacity = useTransform(p, [0.42, 0.58], [0, 1]);
  const panelScale = useTransform(p, [0.42, 0.7], [0.7, 1]);
  const panelEvents = useTransform(p, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <section
      id="contact"
      ref={ref}
      className={reduce ? "scroll-mt-24 py-40" : "relative h-[280vh]"}
    >
      <div
        className={
          reduce
            ? ""
            : "sticky top-0 flex h-screen items-center justify-center overflow-hidden"
        }
      >
        {/* Zoom headline: skipped when the user prefers reduced motion */}
        {!reduce && (
          <motion.h2
            style={{ scale: textScale, opacity: textOpacity, filter: textBlur }}
            className="absolute px-6 text-center text-[clamp(3rem,11vw,10rem)] font-semibold leading-[0.95] tracking-tighter will-change-transform"
          >
            {t("line1")}
            <br />
            <span className={gradient}>{t("line2")}</span>
          </motion.h2>
        )}

        <motion.div
          style={
            reduce
              ? undefined
              : { opacity: panelOpacity, scale: panelScale, pointerEvents: panelEvents }
          }
          className="mx-auto w-full max-w-3xl px-6"
        >
          <p className="mb-2 font-mono text-sm text-accent">{t("label")}</p>
          <p className="mb-10 max-w-md text-white/70">{t("subtitle")}</p>

          <ul className="border-t border-white/10">
            {links.map((link) => (
              <li key={link.label} className="border-b border-white/10">
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-6 transition-colors hover:text-accent"
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                      {link.label}
                    </span>
                    <span className="text-xl font-semibold tracking-tight sm:text-3xl">
                      {link.value}
                    </span>
                  </span>
                  <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}