"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useIntroDelay } from "@/lib/intro";

export default function TypedRole() {
  const t = useTranslations("Hero");
  const roles = t.raw("roles") as string[];
  const reduce = useReducedMotion();
  const introDelay = useIntroDelay();

  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Wait for the intro curtain before the first keystroke
  useEffect(() => {
    if (introDelay === null) return;
    const id = setTimeout(() => setStarted(true), introDelay * 1000 + 300);
    return () => clearTimeout(id);
  }, [introDelay]);

  useEffect(() => {
    if (!started || reduce) return;

    const full = roles[index];
    let delay = deleting ? 35 : 75;
    if (!deleting && text === full) delay = 1600; // pause on the full word
    if (deleting && text === "") delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      } else {
        setText(full.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [started, reduce, text, deleting, index, roles]);

  return (
    <span className="inline-flex min-h-[1.5rem] items-center">
      <span>{reduce ? roles[0] : text}</span>
      <span className="ml-1 h-4 w-[2px] animate-pulse bg-accent" />
    </span>
  );
}