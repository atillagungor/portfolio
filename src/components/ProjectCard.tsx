"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Props = {
  index: number;
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  gradient: string;
  viewLabel: string;
};

export default function ProjectCard({
  index,
  title,
  description,
  tags,
  href,
  gradient,
  viewLabel,
}: Props) {
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, rgba(124,92,255,0.16), transparent 70%)`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${viewLabel}: ${title}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      {/* Cursor-following light */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div className="relative">
        {/* Preview area (replace with a real screenshot later) */}
        <div
          className="relative mb-6 flex h-44 items-end overflow-hidden rounded-xl p-4 transition duration-500 group-hover:scale-[1.02]"
          style={{ background: gradient }}
        >
          <div className="absolute inset-0 bg-black/35" />
          <span className="relative font-mono text-6xl font-semibold text-white/30">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-white/50 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
        </div>

        <p className="mt-2 text-sm leading-relaxed text-white/65">{description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/75"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}