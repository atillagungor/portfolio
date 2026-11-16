"use client";

import { useMemo } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  const options = useMemo(
    () => ({ lerp: 0.1, anchors: !reduce, smoothWheel: !reduce }),
    [reduce]
  );

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={options}>
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}