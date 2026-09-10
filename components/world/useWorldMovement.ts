"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WORLD_H, WORLD_W } from "@/lib/worldConfig";

const SPEED = 300; // world units per second
const MARGIN = 40;

const MOVE_KEYS: Record<string, [number, number]> = {
  w: [0, -1],
  arrowup: [0, -1],
  s: [0, 1],
  arrowdown: [0, 1],
  a: [-1, 0],
  arrowleft: [-1, 0],
  d: [1, 0],
  arrowright: [1, 0],
};

export function useWorldMovement(start: { x: number; y: number }, paused: boolean) {
  const [pos, setPos] = useState(start);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [moving, setMoving] = useState(false);

  const keysRef = useRef<Set<string>>(new Set());
  const clickTargetRef = useRef<{ x: number; y: number } | null>(null);
  const posRef = useRef(start);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) {
      keysRef.current.clear();
      clickTargetRef.current = null;
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key in MOVE_KEYS) {
        keysRef.current.add(key);
        clickTargetRef.current = null;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    const onBlur = () => keysRef.current.clear();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [paused]);

  useEffect(() => {
    if (paused) return;

    const tick = (t: number) => {
      const last = lastRef.current ?? t;
      const dt = Math.min((t - last) / 1000, 0.05);
      lastRef.current = t;

      let dx = 0;
      let dy = 0;
      for (const key of keysRef.current) {
        const [kx, ky] = MOVE_KEYS[key];
        dx += kx;
        dy += ky;
      }

      const target = clickTargetRef.current;
      if (dx === 0 && dy === 0 && target) {
        const tx = target.x - posRef.current.x;
        const ty = target.y - posRef.current.y;
        const dist = Math.hypot(tx, ty);
        if (dist < 4) {
          clickTargetRef.current = null;
        } else {
          dx = tx / dist;
          dy = ty / dist;
        }
      }

      const mag = Math.hypot(dx, dy);
      const isMoving = mag > 0.001;
      if (isMoving) {
        const nx = dx / mag;
        const ny = dy / mag;
        const next = {
          x: Math.min(Math.max(posRef.current.x + nx * SPEED * dt, MARGIN), WORLD_W - MARGIN),
          y: Math.min(Math.max(posRef.current.y + ny * SPEED * dt, MARGIN), WORLD_H - MARGIN),
        };
        posRef.current = next;
        setPos(next);
        if (Math.abs(nx) > 0.1) setFacing(nx > 0 ? 1 : -1);
      }
      setMoving((prev) => (prev === isMoving ? prev : isMoving));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [paused]);

  /* Both are stable across renders — they only touch refs and setState — so
     callers can depend on them without being rebuilt every animation frame,
     which would defeat the memoized buildings downstream. */

  /** Walk to a point, steering there over the next frames. */
  const moveTo = useCallback((x: number, y: number) => {
    clickTargetRef.current = { x, y };
  }, []);

  /** Jump straight to a point — what the teleport menu means by teleport. */
  const warpTo = useCallback((x: number, y: number) => {
    clickTargetRef.current = null;
    keysRef.current.clear();
    const next = {
      x: Math.min(Math.max(x, MARGIN), WORLD_W - MARGIN),
      y: Math.min(Math.max(y, MARGIN), WORLD_H - MARGIN),
    };
    posRef.current = next;
    setPos(next);
  }, []);

  return { pos, facing, moving, moveTo, warpTo };
}
