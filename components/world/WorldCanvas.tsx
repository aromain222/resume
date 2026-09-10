"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  INTERACT_RADIUS,
  PLAYER_START,
  WORLD_H,
  WORLD_W,
  buildCouriers,
  buildWorld,
  type WorldLocation,
} from "@/lib/worldConfig";
import { useWorldMovement } from "./useWorldMovement";
import { useLocationAction } from "./useLocationAction";
import Player from "./Player";
import Building from "./Building";
import Environment from "./Environment";
import AmbientLayer from "./AmbientLayer";
import InteractionPrompt from "./InteractionPrompt";
import WorldPanels from "./WorldPanels";
import TeleportMenu from "./TeleportMenu";
import WorldHUD from "./WorldHUD";

const VIEW_W = 900;
const VIEW_H = 560;
/** Where the player stands to read a building: in front of its door. */
const DOOR_OFFSET = 44;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export default function WorldCanvas() {
  const locations = useMemo(() => buildWorld(), []);
  const couriers = useMemo(() => buildCouriers(locations), [locations]);

  const [openLocation, setOpenLocation] = useState<WorldLocation | null>(null);
  const [teleportOpen, setTeleportOpen] = useState(false);
  const paused = !!openLocation || teleportOpen;

  const { pos, facing, moving, moveTo, warpTo } = useWorldMovement(PLAYER_START, paused);
  const runAction = useLocationAction(setOpenLocation);
  const svgRef = useRef<SVGSVGElement>(null);

  const camX = clamp(pos.x - VIEW_W / 2, 0, WORLD_W - VIEW_W);
  const camY = clamp(pos.y - VIEW_H / 2, 0, WORLD_H - VIEW_H);

  const active = useMemo(() => {
    let closest: WorldLocation | null = null;
    let closestDist = INTERACT_RADIUS;
    for (const loc of locations) {
      const d = Math.hypot(loc.x - pos.x, loc.y - pos.y);
      if (d < closestDist) {
        closest = loc;
        closestDist = d;
      }
    }
    return closest;
  }, [locations, pos]);

  /* The movement loop sets state every frame. Mirroring the frame-varying
     values into a ref keeps every callback below stable, so the memoized
     buildings don't re-render 60 times a second. Written after commit rather
     than during render — event handlers only ever read it once committed. */
  const frame = useRef({ pos, active, camX, camY, paused });
  useEffect(() => {
    frame.current = { pos, active, camX, camY, paused };
  });

  const handleSelect = useCallback(
    (location: WorldLocation) => {
      const { pos: at } = frame.current;
      const d = Math.hypot(location.x - at.x, location.y - at.y);
      if (d < INTERACT_RADIUS) runAction(location);
      else moveTo(location.x, location.y + DOOR_OFFSET);
    },
    [runAction, moveTo]
  );

  const handleGroundClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const { camX: cx, camY: cy, paused: isPaused } = frame.current;
      if (isPaused) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      moveTo(cx + px * VIEW_W, cy + py * VIEW_H);
    },
    [moveTo]
  );

  /* Interact keys live on window, the same as the movement keys — otherwise
     WASD would work on load but E and M would silently do nothing until the
     canvas happened to have focus. */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "escape") {
        setOpenLocation(null);
        setTeleportOpen(false);
        return;
      }
      if (frame.current.paused) return;

      /* Enter belongs to whatever control is focused, if any. */
      const onControl =
        e.target instanceof HTMLElement &&
        e.target.closest("button, a, input, textarea, select");

      if ((key === "e" || key === "enter") && !onControl) {
        const near = frame.current.active;
        if (near) {
          e.preventDefault();
          runAction(near);
        }
      } else if (key === "m" && !onControl) {
        e.preventDefault();
        setTeleportOpen((v) => !v);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [runAction]);

  const teleport = useCallback(
    (location: WorldLocation) => {
      setTeleportOpen(false);
      warpTo(location.x, location.y + DOOR_OFFSET);
    },
    [warpTo]
  );

  /* Re-sorted only when the player crosses a building's depth, not every
     frame, so the draw order is stable while walking down a street. */
  const drawOrder = useMemo(() => {
    const items: ({ kind: "building"; location: WorldLocation } | { kind: "player" })[] = [
      ...locations.map((location) => ({ kind: "building" as const, location })),
      { kind: "player" as const },
    ];
    return items.sort((a, b) => {
      const ay = a.kind === "player" ? pos.y : a.location.y;
      const by = b.kind === "player" ? pos.y : b.location.y;
      return ay - by;
    });
  }, [locations, pos.y]);

  const closePanel = useCallback(() => setOpenLocation(null), []);
  const closeTeleport = useCallback(() => setTeleportOpen(false), []);
  const openTeleport = useCallback(() => setTeleportOpen(true), []);

  return (
    <div className="world">
      <WorldHUD onOpenMap={openTeleport} />

      <div className="relative mx-auto aspect-[900/560] w-full max-w-[1240px] overflow-hidden border border-line bg-[var(--world-ground-deep)]">
        <svg
          ref={svgRef}
          viewBox={`${camX} ${camY} ${VIEW_W} ${VIEW_H}`}
          shapeRendering="crispEdges"
          className="block h-full w-full"
          onClick={handleGroundClick}
          role="img"
          aria-label="An explorable map of Avery's projects and experience"
        >
          <defs>
            <radialGradient id="world-lightpool">
              <stop offset="0%" stopColor="var(--world-glow)" stopOpacity={0.22} />
              <stop offset="100%" stopColor="var(--world-glow)" stopOpacity={0} />
            </radialGradient>
          </defs>

          <rect x={0} y={0} width={WORLD_W} height={WORLD_H} fill="var(--world-ground)" />
          <GroundGrid />
          <Environment locations={locations} />
          <AmbientLayer couriers={couriers} />

          {/* Painter's algorithm: anything further up the map is further away,
              so it is drawn first and the nearer volumes overlap it. The
              player is sorted into the same pass, which is what stops them
              standing on top of a building they are behind. */}
          {drawOrder.map((item) =>
            item.kind === "player" ? (
              <Player key="player" x={pos.x} y={pos.y} facing={facing} moving={moving} />
            ) : (
              <Building
                key={item.location.id}
                location={item.location}
                active={active?.id === item.location.id}
                onSelect={handleSelect}
              />
            )
          )}
        </svg>

        {/* Ambient falloff toward the edges, so the lit centre carries focus. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 70%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {active && (
          <InteractionPrompt
            label={active.label}
            camX={camX}
            camY={camY}
            viewW={VIEW_W}
            viewH={VIEW_H}
            x={active.x}
            y={active.y}
          />
        )}
      </div>

      <WorldPanels location={openLocation} onClose={closePanel} />

      {teleportOpen && (
        <TeleportMenu locations={locations} onSelect={teleport} onClose={closeTeleport} />
      )}
    </div>
  );
}

const GroundGrid = memoGrid();

/** The grid never changes, so it is built once at module scope. */
function memoGrid() {
  const step = 80;
  const lines: React.JSX.Element[] = [];

  for (let x = 0; x <= WORLD_W; x += step) {
    lines.push(
      <line key={`v${x}`} x1={x} y1={0} x2={x} y2={WORLD_H} stroke="var(--world-grid)" strokeWidth={1} />
    );
  }
  for (let y = 0; y <= WORLD_H; y += step) {
    lines.push(
      <line key={`h${y}`} x1={0} y1={y} x2={WORLD_W} y2={y} stroke="var(--world-grid)" strokeWidth={1} />
    );
  }

  const grid = <g>{lines}</g>;
  return function GroundGrid() {
    return grid;
  };
}
