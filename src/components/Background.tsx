"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export default function Background() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 80, damping: 20 });
  const y = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    mx.set(window.innerWidth / 2);
    my.set(window.innerHeight / 2);

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgba(124,92,255,0.18), transparent 70%)`;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora blobs */}
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/25 blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, -90, 50, 0], y: [0, 70, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-48 -right-32 h-[36rem] w-[36rem] rounded-full bg-cyan-500/15 blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, 60, -60, 0], y: [0, 40, -50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/3 top-1/2 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-[130px]"
      />

      {/* Grid, fades out towards the edges */}
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Cursor spotlight */}
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />
    </div>
  );
}