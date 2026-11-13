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

const STATUS = ["Starting up…", "Loading assets…", "Almost there…", "Ready"];

// XP-style segmented fill: 10px blocks with 3px gaps
const blockMask =
  "repeating-linear-gradient(90deg, #000 0 10px, transparent 10px 13px)";

export default function Intro() {
  const [show, setShow] = useState(() => !hasIntroPlayed());

  const progress = useMotionValue(0);
  const width = useTransform(progress, (v) => `${v}%`);
  const percent = useTransform(progress, (v) => `${Math.round(v)}%`);
  const status = useTransform(
    progress,
    (v) => STATUS[Math.min(STATUS.length - 1, Math.floor((v / 100) * STATUS.length))]
  );

  useEffect(() => {
    if (hasIntroPlayed()) return;

    document.body.style.overflow = "hidden";
    const controls = animate(progress, 100, {
      duration: INTRO_DURATION - 1,
      delay: 0.4,
      ease: [0.45, 0, 0.25, 1],
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
          <motion.div
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className="w-[340px] max-w-[92vw] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            {/* macOS-style title bar */}
            <div className="relative flex items-center border-b border-white/10 px-4 py-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="absolute inset-x-0 text-center text-xs text-white/50">
                atilla.dev
              </span>
            </div>

            <div className="px-6 pb-6 pt-7">
              <div className="mb-3 flex items-center justify-between text-xs">
                <motion.span className="text-white/60">{status}</motion.span>
                <motion.span className="tabular-nums text-white">{percent}</motion.span>
              </div>

              {/* XP-style bar */}
              <div className="rounded-md border border-white/15 bg-black/30 p-[3px]">
                <div className="h-3.5 overflow-hidden rounded-[3px]">
                  <motion.div
                    className="h-full"
                    style={{
                      width,
                      background:
                        "linear-gradient(180deg, #c4b5ff 0%, #8b6cff 45%, #6247e8 55%, #9d86ff 100%)",
                      maskImage: blockMask,
                      WebkitMaskImage: blockMask,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}