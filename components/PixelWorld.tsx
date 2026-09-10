"use client";

import {
  PALETTE,
  ITACHI,
  KILLER_BEE,
  INFERNAPE,
  LEBRON,
  POKEBALL,
  DUMBBELL,
  FOOTBALL,
  CONTROLLER,
  HOKAGE_FACE,
  LEGO_BONSAI,
  LEGO_PORSCHE,
  LEGO_BAMBOO,
} from "@/lib/pixel-sprites";

/* Scene colours are local to the illustration, not site tokens — this is
   imagery, not chrome. */
const SKY_HI = "#dce9f6";
const SKY_LO = "#c3dcef";
const CLOUD = "#eef5fb";
const SUN = "#f2c230";

const GRASS_HI = "#96c46e";
const GRASS = "#5c8f45";
const GRASS_DEEP = "#41682f";
const ROUTE = "#d8c08a";
const ROUTE_DEEP = "#bda269";
const COURT = "#b5713c";
const COURT_DEEP = "#8f552b";
const COURT_LINE = "#f0e6d6";
const GYMFLOOR = "#3f4348";
const GYMFLOOR_DEEP = "#2e3236";
const BASEPLATE = "#4f8f4a";
const BASEPLATE_DEEP = "#3d7239";
const RUG = "#7d5a7e";
const RUG_DEEP = "#5f4460";

const STONE = "#9aa3ad";
const STONE_DARK = "#7d858e";
const TRUNK = "#6b4a30";
const LEAF = "#4f7d3a";
const LEAF_HI = "#6a9c50";
const RIM = "#e2622f";
const POLE = "#8a8f98";
const BACKBOARD = "#f0ece4";
const METAL = "#6f747c";
const METAL_HI = "#9aa0a8";
const SCREEN = "#2b4a63";
const SCREEN_GLOW = "#7fd0e8";
const DEVICE = "#3a3a3f";

const GROUND_Y = 84;
const VIEW_W = 432;
const VIEW_H = 116;
/** [label, width]; offsets are derived so nothing drifts when one changes. */
const ZONE_SPANS = [80, 70, 76, 62, 80, 64];
const ZONE_X = ZONE_SPANS.reduce<number[]>((acc, _w, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + ZONE_SPANS[i - 1]);
  return acc;
}, []);

function px(x: number, y: number, w: number, h: number, fill: string, key?: string) {
  return <rect key={key} x={x} y={y} width={w} height={h} fill={fill} />;
}

/** Renders a sprite grid, merging horizontal runs of one colour into one rect. */
function Sprite({
  data,
  x,
  y,
  flip = false,
  scale = 1,
}: {
  data: string[];
  x: number;
  y: number;
  flip?: boolean;
  scale?: number;
}) {
  const rects: React.JSX.Element[] = [];
  const width = (data[0]?.length ?? 0) * scale;

  data.forEach((row, ry) => {
    let runChar: string | null = null;
    let runStart = 0;
    for (let cx = 0; cx <= row.length; cx += 1) {
      const ch = cx < row.length ? row[cx] : null;
      if (ch !== runChar) {
        if (runChar && runChar !== "." && PALETTE[runChar]) {
          rects.push(
            px(
              runStart * scale,
              ry * scale,
              (cx - runStart) * scale,
              scale,
              PALETTE[runChar],
              `${ry}-${runStart}`
            )
          );
        }
        runChar = ch;
        runStart = cx;
      }
    }
  });

  const transform = flip
    ? `translate(${x + width} ${y}) scale(-1 1)`
    : `translate(${x} ${y})`;

  return <g transform={transform}>{rects}</g>;
}

/** Positions a sprite, then animates it on an inner group — a CSS transform on
    an SVG node replaces its transform attribute rather than composing with it. */
function Actor({
  data,
  x,
  y,
  flip,
  animation,
  delay = 0,
  scale = 1,
}: {
  data: string[];
  x: number;
  y: number;
  flip?: boolean;
  animation?: string;
  delay?: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g
        className={animation}
        style={delay ? { animationDelay: `${delay}s` } : undefined}
      >
        <Sprite data={data} x={0} y={0} flip={flip} scale={scale} />
      </g>
    </g>
  );
}

function Cloud({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      {px(x, y, w, 3, CLOUD)}
      {px(x + 3, y - 2, w - 6, 2, CLOUD)}
      {px(x + 7, y - 4, w - 14, 2, CLOUD)}
    </g>
  );
}

function Tree({ x, base = GROUND_Y }: { x: number; base?: number }) {
  return (
    <g>
      {px(x + 4, base - 10, 2, 10, TRUNK)}
      {px(x, base - 22, 10, 4, LEAF)}
      {px(x - 2, base - 18, 14, 5, LEAF)}
      {px(x + 1, base - 21, 5, 2, LEAF_HI)}
      {px(x, base - 13, 10, 3, LEAF)}
    </g>
  );
}

/** Zone 1 backdrop: the Hokage rock. An irregular silhouette keeps it reading
    as stone rather than architecture; the faces are carved into its face. */
function HokageCliff() {
  const crest = [
    [0, 30], [4, 26], [8, 28], [12, 20], [16, 23], [20, 16], [24, 19],
    [28, 14], [32, 18], [36, 15], [40, 21], [44, 18], [48, 24], [52, 20],
    [56, 26], [60, 23], [64, 29], [68, 26], [72, 32], [76, 30],
  ];

  return (
    <g>
      {crest.map(([cx, cy]) => (
        <g key={cx}>
          {px(cx, cy, 4, GROUND_Y - cy, STONE)}
          {px(cx, cy, 4, 2, "#b3bac2")}
        </g>
      ))}

      {px(12, 42, 3, 14, STONE_DARK)}
      {px(46, 50, 2, 18, STONE_DARK)}
      {px(70, 46, 3, 14, STONE_DARK)}
      {px(0, 74, 80, 10, STONE_DARK)}

      {[5, 30, 55].map((fx) => (
        <Sprite key={fx} data={HOKAGE_FACE} x={fx} y={30} />
      ))}
    </g>
  );
}

/** Zone 3 backdrop: a regulation hoop, sized against a 32px player. */
function Hoop({ x }: { x: number }) {
  return (
    <g>
      {px(x + 11, 30, 4, GROUND_Y - 30, POLE)}
      {px(x + 9, 30, 2, GROUND_Y - 30, METAL_HI)}
      {px(x - 6, 10, 26, 20, BACKBOARD)}
      {px(x - 6, 10, 26, 3, METAL)}
      {px(x - 6, 27, 26, 3, METAL)}
      {px(x + 1, 17, 12, 8, "#e8e2d6")}
      {px(x + 2, 18, 10, 6, BACKBOARD)}
      {px(x - 2, 30, 18, 3, RIM)}
      {px(x - 1, 33, 3, 7, COURT_LINE)}
      {px(x + 4, 33, 3, 8, COURT_LINE)}
      {px(x + 9, 33, 3, 7, COURT_LINE)}
      {px(x + 1, 40, 12, 2, COURT_LINE)}
    </g>
  );
}

/** Zone 4: a squat rack with a loaded bar, sized to stay inside its zone. */
function SquatRack({ x }: { x: number }) {
  return (
    <g>
      {px(x, 34, 4, GROUND_Y - 34, METAL)}
      {px(x + 26, 34, 4, GROUND_Y - 34, METAL)}
      {px(x, 34, 30, 3, METAL_HI)}
      {px(x - 6, 44, 42, 3, METAL_HI)}
      {px(x - 10, 38, 6, 15, DEVICE)}
      {px(x + 34, 38, 6, 15, DEVICE)}
    </g>
  );
}

/** Zone 6: a TV showing a fantasy lineup, on a stand. */
function Television({ x }: { x: number }) {
  return (
    <g>
      {px(x, 22, 36, 26, DEVICE)}
      {px(x + 3, 25, 30, 20, SCREEN)}
      {px(x + 6, 28, 12, 2, SCREEN_GLOW)}
      {px(x + 6, 32, 24, 2, "#4c7fa0")}
      {px(x + 6, 36, 19, 2, "#4c7fa0")}
      {px(x + 6, 40, 21, 2, "#4c7fa0")}
      {px(x + 26, 28, 4, 2, RIM)}
      {px(x + 15, 48, 6, 5, DEVICE)}
      {px(x + 8, 53, 20, 3, METAL)}
    </g>
  );
}

/** Ground band per zone, so each area reads as its own place. */
function Zones() {
  const bands: { top: string; body: string; deep: string }[] = [
    { top: GRASS_HI, body: GRASS, deep: GRASS_DEEP },
    { top: "#e6d3a4", body: ROUTE, deep: ROUTE_DEEP },
    { top: "#c9834a", body: COURT, deep: COURT_DEEP },
    { top: "#4c5157", body: GYMFLOOR, deep: GYMFLOOR_DEEP },
    { top: "#5fa055", body: BASEPLATE, deep: BASEPLATE_DEEP },
    { top: "#8d6a8e", body: RUG, deep: RUG_DEEP },
  ];

  return (
    <g>
      {bands.map(({ top, body, deep }, i) => {
        const x = ZONE_X[i];
        const w = ZONE_SPANS[i];
        return (
          <g key={x}>
            {px(x, GROUND_Y, w, 3, top)}
            {px(x, GROUND_Y + 3, w, 17, body)}
            {px(x, GROUND_Y + 20, w, 6, deep)}
          </g>
        );
      })}

      {/* route grit */}
      {[86, 100, 116, 132].map((gx) => px(gx, GROUND_Y + 8, 3, 2, ROUTE_DEEP, `g${gx}`))}

      {/* court lines */}
      {px(ZONE_X[2], GROUND_Y + 9, ZONE_SPANS[2], 1, COURT_LINE)}
      {px(188, GROUND_Y + 3, 1, 12, COURT_LINE)}

      {/* gym tile seams */}
      {[234, 248, 262, 276].map((gx) =>
        px(gx, GROUND_Y + 3, 1, 17, GYMFLOOR_DEEP, `t${gx}`)
      )}

      {/* baseplate studs */}
      {Array.from({ length: 12 }).map((_, i) =>
        px(292 + i * 6, GROUND_Y + 5, 3, 2, "#ffffff2e", `bp${i}`)
      )}

      {/* rug weave */}
      {[372, 384, 396, 408, 420].map((gx) =>
        px(gx, GROUND_Y + 10, 6, 2, RUG_DEEP, `r${gx}`)
      )}
    </g>
  );
}

export default function PixelWorld() {
  return (
    <figure className="m-0">
      <div className="overflow-hidden border border-line bg-stage-raised">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span aria-hidden className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
            <span className="h-2 w-2 rounded-full bg-line" />
          </span>
          <span className="type-label text-[10px] text-bone-faint">
            interests.world
          </span>
          <span className="type-label ml-auto text-[9px] text-bone-faint sm:hidden">
            scroll →
          </span>
        </div>

        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            shapeRendering="crispEdges"
            role="img"
            aria-label="A pixel-art world in six areas: the Hidden Leaf village with Itachi and Killer Bee below the Hokage cliff, a Pokémon route with Infernape and a Poké Ball, a basketball court with LeBron James, a gym with a squat rack and dumbbell, a Lego baseplate holding a bonsai, a Porsche 911, and lucky bamboo, and a den with a television, controller, and football."
            className="block h-auto w-full min-w-[880px]"
          >
            {px(0, 0, VIEW_W, 56, SKY_HI)}
            {px(0, 56, VIEW_W, 28, SKY_LO)}
            {px(398, 8, 8, 8, SUN)}

            <g className="animate-[pixel-drift_26s_linear_infinite]">
              <Cloud x={92} y={16} w={22} />
              <Cloud x={196} y={10} w={18} />
              <Cloud x={300} y={18} w={24} />
              <Cloud x={-56} y={13} w={20} />
            </g>

            <HokageCliff />
            <Zones />

            {/* Zone 1 — the Hidden Leaf */}
            <Tree x={64} />
            <Actor
              data={ITACHI}
              scale={0.5}
              x={4}
              y={GROUND_Y - 32}
              animation="animate-[pixel-bob_1.8s_steps(2)_infinite]"
            />
            <Actor
              data={KILLER_BEE}
              scale={0.5}
              x={34}
              y={GROUND_Y - 32}
              animation="animate-[pixel-bob_1.8s_steps(2)_infinite]"
              delay={0.6}
            />

            {/* Zone 2 — the route */}
            {[82, 140].map((gx) => (
              <g key={`tg${gx}`}>
                {px(gx, GROUND_Y - 6, 9, 6, LEAF)}
                {px(gx + 1, GROUND_Y - 8, 2, 3, LEAF_HI)}
                {px(gx + 6, GROUND_Y - 8, 2, 3, LEAF_HI)}
              </g>
            ))}
            <g transform={`translate(86 ${GROUND_Y - 32})`}>
              <g
                className="animate-[pixel-patrol_7s_steps(20)_infinite]"
                style={{ transformOrigin: "12px 16px" }}
              >
                <g className="animate-[pixel-bob_1.4s_steps(2)_infinite]">
                  <Sprite data={INFERNAPE} x={0} y={0} />
                  <g className="animate-[pixel-flame_0.45s_steps(2)_infinite]">
                    {px(7, -2, 2, 3, "#ffe08a")}
                  </g>
                </g>
              </g>
            </g>
            <Actor
              data={POKEBALL}
              scale={1.6}
              x={126}
              y={GROUND_Y - 16}
              animation="animate-[pixel-bob_2.2s_steps(2)_infinite]"
              delay={0.3}
            />

            {/* Zone 3 — the court */}
            <Hoop x={200} />
            <Actor
              data={LEBRON}
              x={154}
              y={GROUND_Y - 32}
              animation="animate-[pixel-bob_1.6s_steps(2)_infinite]"
              delay={0.2}
            />
            <g transform={`translate(186 ${GROUND_Y - 14})`}>
              <g className="animate-[pixel-dribble_0.9s_ease-in-out_infinite]">
                {px(3, 0, 6, 2, "#8f4a1e")}
                {px(1, 2, 10, 2, RIM)}
                {px(0, 4, 12, 4, RIM)}
                {px(1, 8, 10, 2, RIM)}
                {px(3, 10, 6, 2, "#8f4a1e")}
                {px(5, 2, 2, 8, "#8f4a1e")}
                {px(1, 5, 10, 2, "#8f4a1e")}
              </g>
            </g>

            {/* Zone 4 — the gym */}
            <SquatRack x={250} />
            <Sprite data={DUMBBELL} x={228} y={GROUND_Y - 12} scale={1.5} />

            {/* Zone 5 — the baseplate: bonsai, 911, lucky bamboo */}
            <Sprite data={LEGO_BONSAI} x={289} y={GROUND_Y - 20} />
            <Sprite data={LEGO_PORSCHE} x={311} y={GROUND_Y - 17} />
            <Sprite data={LEGO_BAMBOO} x={352} y={GROUND_Y - 20} />

            {/* Zone 6 — the screens */}
            <Television x={386} />
            <Sprite data={CONTROLLER} x={368} y={GROUND_Y - 11} scale={1.5} />
            <Sprite data={FOOTBALL} x={416} y={GROUND_Y - 11} scale={1.5} />
          </svg>
        </div>
      </div>
      <figcaption className="mt-3 text-[13px] leading-[1.6] text-bone-faint">
        Pixel art drawn by hand. Characters are fan tributes to their
        respective creators.
      </figcaption>
    </figure>
  );
}
