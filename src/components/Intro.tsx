"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { INTRO_DURATION, hasIntroPlayed, markIntroPlayed } from "@/lib/intro";

const STATUS = ["booting core", "loading assets", "compiling design", "ready"];

export default function Intro() {
  const [show, setShow] = useState(() => !hasIntroPlayed());

  const progress = useMotionValue(0);
  const width = useTransform(progress, (v) => `${v}%`);
  const percent = useTransform(
    progress,
    (v) => `${Math.round(v).toString().padStart(3, "0")}%`
  );
  const status = useTransform(
    progress,
    (v) => STATUS[Math.min(STATUS.length - 1, Math.floor((v / 100) * STATUS.length))]
  );

  useEffect(() => {
    if (hasIntroPlayed()) return;

    document.body.style.overflow = "hidden";
    const controls = animate(progress, 100, {
      duration: 3.5,
      delay: 0.3,
      ease: [0.65, 0, 0.35, 1],
    });
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      markIntroPlayed();
    }, INTRO_DURATION * 1000);

    return () => {
      controls.stop();
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          style={{
            borderBottomLeftRadius: "50% 8%",
            borderBottomRightRadius: "50% 8%",
          }}
        >
          {/* Soft neon glow behind the window */}
          <div className="absolute h-72 w-72 rounded-full bg-accent/20 blur-[110px]" />

          <motion.div
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="relative w-[min(380px,86vw)] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_60px_-15px_rgba(124,92,255,0.6)] backdrop-blur-xl"
          >
            {/* macOS-style title bar */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
              <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                atilla.dev
              </span>
            </div>

            <div className="px-5 pb-5 pt-6">
              <div className="mb-3 flex items-end justify-between font-mono text-xs">
                <span className="flex items-center gap-2 text-muted">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                  <motion.span>{status}</motion.span>
                </span>
                <motion.span className="tabular-nums text-foreground">
                  {percent}
                </motion.span>
              </div>

              {/* Neon progress bar */}
              <div className="relative h-1.5 w-full rounded-full bg-white/10">
                <motion.div
                  className="relative h-full rounded-full"
                  style={{
                    width,
                    background: "linear-gradient(90deg, var(--accent), #22d3ee)",
                    boxShadow: "0 0 14px rgba(124,92,255,0.9), 0 0 28px rgba(34,211,238,0.4)",
                  }}
                >
                  {/* Moving shine */}
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <motion.span
                      className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                      animate={{ x: ["-100%", "600%"] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                    />
                  </span>
                  {/* Glowing head */}
                  <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_4px_rgba(34,211,238,0.9)]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}