"use client";

import { useEffect, useState } from "react";

export const INTRO_DURATION = 2.5; // seconds until the curtain starts leaving

// Lives as long as the page load: a refresh replays the intro,
// a language switch (client-side navigation) does not.
let introPlayed = false;
export const hasIntroPlayed = () => introPlayed;
export const markIntroPlayed = () => {
  introPlayed = true;
};

/** Delay (s) page content waits for the intro; null until known on the client. */
export function useIntroDelay() {
  const [delay, setDelay] = useState<number | null>(null);

  useEffect(() => {
    setDelay(hasIntroPlayed() ? 0 : INTRO_DURATION + 0.2);
  }, []);

  return delay;
}