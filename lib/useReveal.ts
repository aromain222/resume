"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-once with a failsafe.
 *
 * A mask-slide hides its own content until the reveal fires, so an
 * IntersectionObserver that never fires — hidden tab, headless renderer,
 * a scroll that jumps past the trigger — would ship the section blank.
 * This flips to revealed on intersection OR after `failsafeMs`, whichever
 * comes first, so the text is never permanently hidden.
 */
export function useReveal<T extends HTMLElement>(failsafeMs = 1200) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;

    const node = ref.current;
    const timer = window.setTimeout(() => setRevealed(true), failsafeMs);

    if (!node || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setRevealed(true);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [failsafeMs, revealed]);

  return { ref, revealed };
}
