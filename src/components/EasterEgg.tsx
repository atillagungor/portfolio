"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Deterministic burst so server and client render the same markup
const PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2;
  const distance = 140 + (i % 4) * 40;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    hue: (i * 360) / 28,
  };
});

const DURATION = 6000;

export default function EasterEgg() {
  const t = useTranslations("EasterEgg");
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  const progress = useRef(0);
  const running = useRef(false);
  const timers = useRef<{
    interval?: ReturnType<typeof setInterval>;
    timeout?: ReturnType<typeof setTimeout>;
  }>({});

  useEffect(() => {
    const root = document.documentElement;

    const stop = () => {
      clearInterval(timers.current.interval);
      clearTimeout(timers.current.timeout);
      root.style.removeProperty("--accent");
      running.current = false;
      setShow(false);
    };

    const trigger = () => {
      if (running.current) return;
      running.current = true;
      setShow(true);

      // Rainbow accent colour for a few seconds
      if (!reduce) {
        let hue = 260;
        timers.current.interval = setInterval(() => {
          hue = (hue + 8) % 360;
          root.style.setProperty("--accent", `hsl(${hue} 90% 65%)`);
        }, 60);
      }
      timers.current.timeout = setTimeout(stop, DURATION);
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[progress.current]) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          progress.current = 0;
          trigger();
        }
      } else {
        progress.current = key === KONAMI[0] ? 1 : 0;
      }
    };

    console.log(
      "%cPsst… ↑ ↑ ↓ ↓ ← → ← → B A",
      "color:#7c5cff;font-weight:bold;font-size:14px",
    );

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      stop();
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="relative flex items-center gap-4 rounded-2xl border border-amber-300/30 bg-[#111113]/95 px-5 py-4 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            {!reduce &&
              PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                  style={{ background: `hsl(${p.hue} 90% 65%)` }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.4 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              ))}

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300/80">
                {t("label")}
              </p>
              <p className="text-sm font-semibold text-white">{t("title")}</p>
              <p className="text-xs text-white/60">{t("description")}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
