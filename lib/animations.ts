import { useState, useEffect, useRef } from "react";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#@$%";

export function useTextScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!trigger) return;
    frameRef.current = 0;
    const totalFrames = text.length + 14;

    function tick() {
      frameRef.current++;
      const f = frameRef.current;
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (f > totalFrames - text.length + i) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (f < totalFrames) {
        rafRef.current = setTimeout(tick, 28);
      } else {
        setDisplay(text);
      }
    }

    tick();
    return () => {
      if (rafRef.current) clearTimeout(rafRef.current);
    };
  }, [trigger, text]);

  return display;
}

export function useCountUp(target: number, trigger: boolean, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();

    function frame(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }, [trigger, target, duration]);

  return count;
}
