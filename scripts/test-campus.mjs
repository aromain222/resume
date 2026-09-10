// Run with node scripts/test-campus.mjs. Uses the project's TypeScript compiler.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const bundle = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  new Function("require", "module", "exports", source)(
    (name) => load(path.resolve(path.dirname(file), name + ".ts")),
    bundle,
    bundle.exports,
  );
  cache.set(file, bundle.exports);
  return bundle.exports;
}
const {
  campus,
  campusDistricts,
  campusPaths,
  campusStartPath,
  campusZones,
  campusGardenBorders,
  CAMPUS_BOUNDS,
  canWalk,
  PLAYER_START,
} = load(path.resolve(__dirname, "../lib/campus.ts"));
assert.equal(campus.length, 23);
assert.deepEqual(campus.filter((stop) => stop.group === "Education").map((stop) => stop.id).sort(), ["amherst", "menlo"]);
assert(campus.filter((stop) => ["Education", "Entrepreneurship", "Hobbies"].includes(stop.group) && !["investment", "finance"].includes(stop.id)).every((stop) => stop.discoveryOnly));
assert(campus.filter((stop) => ["investment", "finance"].includes(stop.id)).every((stop) => !stop.discoveryOnly));
assert.equal(campus.find((stop) => stop.id === "investment").title, "Sankofa");
assert(canWalk(0, 2.8), "Removed name-sign stand leaves no invisible collision");
assert(campus.filter((stop) => ["Projects", "Experience"].includes(stop.group)).every((stop) => !stop.discoveryOnly));
assert.equal(campus.find((stop) => stop.id === "clavius").logo, "/world/logos/clavius.png");
assert(campus.find((stop) => stop.id === "finance").position[0] < -19.2);
const projectSign = campusDistricts.find((sign) => sign.label === "Projects");
assert(Math.hypot(projectSign.position[0] - 17.6, projectSign.position[2] - 8) < 1);
assert.equal(new Set(campusDistricts.map((sign) => sign.style)).size, 4);
for (const sign of campusDistricts) {
  assert(!canWalk(sign.position[0], sign.position[2]), sign.label + ": sign collision");
  const halfX = Math.abs(Math.cos(sign.rotation)) * sign.width / 2 + 0.3;
  const halfZ = Math.abs(Math.sin(sign.rotation)) * sign.width / 2 + 0.3;
  for (const path of campusPaths) {
    const pathX = (path.from[0] + path.to[0]) / 2;
    const pathZ = (path.from[1] + path.to[1]) / 2;
    const width = Math.abs(path.to[0] - path.from[0]) / 2 + path.width / 2;
    const depth = Math.abs(path.to[1] - path.from[1]) / 2 + path.width / 2;
    assert(Math.abs(sign.position[0] - pathX) > halfX + width || Math.abs(sign.position[2] - pathZ) > halfZ + depth, sign.label + ": sign overlaps a path");
  }
}
const amherst = campus.find((stop) => stop.id === "amherst");
assert.equal(amherst.title, "Amherst College");
assert(Math.hypot(...campusStartPath.at(-1).to.map((value, i) => value - amherst.entrance[i])) < 0.001);
for (const path of campusStartPath) {
  for (let step = 0; step <= 100; step++) {
    const point = path.from.map((value, i) => value + (path.to[i] - value) * step / 100);
    assert(canWalk(...point), "Start-here route must remain walkable");
  }
}
function insideZone([x, z], polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, zi] = polygon[i],
      [xj, zj] = polygon[j];
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi)
      inside = !inside;
  }
  return inside;
}
for (const stop of campus.filter((s) => s.kind !== "about"))
  assert(
    campusZones.some(
      (zone) =>
        zone.group === stop.group && insideZone(stop.position, zone.polygon),
    ),
    stop.id + ": ground treatment matches its section",
  );
assert.deepEqual([...new Set(campusZones.map((zone) => zone.group))].sort(), [
  "Education",
  "Entrepreneurship",
  "Experience",
  "Hobbies",
  "Projects",
]);
assert(
  campusGardenBorders.length > 0 && campusGardenBorders.length < 50,
  "Lightweight section landscaping",
);
for (const border of campusGardenBorders) {
  assert(
    !canWalk(...border.position),
    "Hedges must have matching collision geometry",
  );
  for (const stop of campus)
    assert(
      Math.abs(stop.entrance[0] - border.position[0]) >
        border.size[0] / 2 + 0.6 ||
        Math.abs(stop.entrance[1] - border.position[1]) >
          border.size[1] / 2 + 0.6,
      "Entrance remains clear: " + stop.id,
    );
  for (const path of campusPaths)
    assert(
      border.position[0] + border.size[0] / 2 <
        Math.min(path.from[0], path.to[0]) - path.width / 2 ||
        border.position[0] - border.size[0] / 2 >
          Math.max(path.from[0], path.to[0]) + path.width / 2 ||
        border.position[1] + border.size[1] / 2 <
          Math.min(path.from[1], path.to[1]) - path.width / 2 ||
        border.position[1] - border.size[1] / 2 >
          Math.max(path.from[1], path.to[1]) + path.width / 2,
      "Hedge leaves the whole path open",
    );
}
assert(
  CAMPUS_BOUNDS.x > 38 && CAMPUS_BOUNDS.z > 33,
  "The island has substantially expanded",
);
for (const stop of campus.filter((s) => s.kind !== "about")) {
  assert(
    campusPaths.some(
      (path) =>
        path.from[0] === stop.entrance[0] && path.from[1] === stop.entrance[1],
    ),
    stop.id + ": path meets its actual entrance",
  );
}
for (const path of campusPaths) {
  assert(
    path.from[0] === path.to[0] || path.from[1] === path.to[1],
    "Rendered paths must be axis aligned",
  );
  for (const [x, z] of [path.from, path.to])
    assert(Math.abs(x) < CAMPUS_BOUNDS.x && Math.abs(z) < CAMPUS_BOUNDS.z);
}
const projectStops = campus.filter((s) => s.group === "Projects");
for (let i = 0; i < projectStops.length; i++) {
  for (const other of projectStops.slice(i + 1))
    assert(
      Math.hypot(
        projectStops[i].position[0] - other.position[0],
        projectStops[i].position[1] - other.position[1],
      ) >= 9.5,
      "Projects have generous separation",
    );
}
assert.deepEqual(
  campusDistricts.map((area) => area.label),
  ["Entrepreneurship", "Projects", "Experience", "Hobbies", "Education"],
);
for (const area of campusDistricts) {
  assert(campus.some((stop) => stop.group === area.label));
  assert(area.position.every(Number.isFinite));
}
assert.equal(new Set(campus.map((s) => s.id)).size, campus.length);
assert.equal(campus.filter((s) => s.group === "Projects").length, 4);
assert.deepEqual(
  campus
    .filter((s) => s.group === "Entrepreneurship")
    .map((s) => s.id)
    .sort(),
  ["camp", "finance", "investment", "powerwashing"],
);
const offices = campus.filter((s) => s.visual === "office");
assert.equal(offices.length, 4);
assert(
  offices.at(-1).position[0] - offices[0].position[0] >= 38,
  "Experience spans the rear edge",
);
for (let i = 1; i < offices.length; i++) {
  assert(
    offices[i].position[0] - offices[i - 1].position[0] >= 12,
    "Office spacing leaves room for visible signs",
  );
}
assert.equal(campus.filter((s) => s.kind === "hobby").length, 8);
assert(canWalk(...PLAYER_START), "Arrival courtyard must be walkable");
for (const stop of campus) {
  assert(
    canWalk(...stop.entrance),
    stop.id + ": entrance overlaps an obstacle",
  );
  if (stop.footprint.every(Boolean))
    assert(!canWalk(...stop.position), stop.id + ": missing collision");
  if (["finance", "investment"].includes(stop.id) || stop.visual === "office")
    assert(stop.role && stop.period);
  for (const link of stop.links)
    assert(/^(https:\/\/|mailto:|\/resume|#work|#path|#about)/.test(link.href));
  for (const asset of [stop.logo, stop.image].filter(Boolean))
    assert(fs.existsSync(path.resolve(__dirname, "../public" + asset)), asset);
}
// A bounded grid flood proves each entrance connects to the common arrival area.
const floodStart = PLAYER_START.map((value) => Math.round(value * 2) / 2);
const queue = [floodStart],
  visited = new Set([floodStart.join(",")]);
for (let i = 0; i < queue.length; i++) {
  const [x, z] = queue[i];
  for (const [dx, dz] of [
    [0.5, 0],
    [-0.5, 0],
    [0, 0.5],
    [0, -0.5],
  ]) {
    const next = [x + dx, z + dz],
      key = next.join(",");
    if (!visited.has(key) && canWalk(...next)) {
      visited.add(key);
      queue.push(next);
    }
  }
}
for (const stop of campus)
  assert(
    queue.some(
      ([x, z]) => Math.hypot(x - stop.entrance[0], z - stop.entrance[1]) < 0.6,
    ),
    stop.id + ": unreachable entrance",
  );
assert(
  !campus
    .find((s) => s.id === "finance")
    .bullets.join(" ")
    .includes("Murj"),
);
console.log(
  "PASS: 23 destinations, 4 project exhibits, 4 entrepreneurship stops, 8 hobbies; valid assets, spaced offices, collision boundaries, connected entrances, role/date metadata.",
);
const games = load(path.resolve(__dirname, "../lib/campusGames.ts"));
assert.equal(games.shotScores(50), true);
assert.equal(games.shotScores(41), true);
assert.equal(games.shotScores(59), true);
assert.equal(games.shotScores(40), false);
assert.equal(games.shotScores(60), false);
const deck = games.shuffledPairs(() => 0.25);
assert.equal(deck.length, 6);
for (const name of games.pokemonPairs)
  assert.equal(deck.filter((card) => card === name).length, 2);
assert.equal(games.bonsaiComplete(games.bonsaiPattern), true);
assert.equal(games.bonsaiComplete(Array(16).fill(0)), false);
assert.equal(games.bonsaiComplete([]), false);
assert.deepEqual(
  campus
    .filter((stop) => stop.game)
    .map((stop) => stop.game)
    .sort(),
  ["basketball", "cooking", "lego", "pokemon"],
);
assert(
  campus
    .find((stop) => stop.id === "about")
    .bullets.some((text) => text.includes("love fashion")),
);
const cooking = campus.find((stop) => stop.id === "cooking").position;
for (const id of ["basketball", "camp"]) {
  const target = campus.find((stop) => stop.id === id).position;
  assert(
    Math.hypot(cooking[0] - target[0], cooking[1] - target[1]) > 6,
    "Grill needs a separate setting from " + id,
  );
}
console.log(
  "PASS: shot boundaries, shuffled pairs, bonsai completion, optional game mapping, fashion note and grill separation.",
);
for (const made of [true, false]) {
  assert.deepEqual(games.shotPoint(0, made), { x: 42, y: 138 });
  assert.equal(games.shotPoint(0.78, made).y, 64);
  const before = games.shotPoint(0.77999, made),
    after = games.shotPoint(0.78001, made);
  assert(
    Math.hypot(after.x - before.x, after.y - before.y) < 0.1,
    "Flight remains continuous at rim",
  );
  assert.equal(games.shotPoint(1, made).y, 138);
}
for (const order of games.cookingOrders) {
  assert(
    games.orderMatches([...order.ingredients].reverse(), order.ingredients),
  );
  assert(!games.orderMatches(order.ingredients.slice(1), order.ingredients));
  assert(
    !games.orderMatches(
      [...order.ingredients, order.extras[0]],
      order.ingredients,
    ),
  );
  assert(
    !games.orderMatches(Array(4).fill(order.ingredients[0]), order.ingredients),
  );
}
console.log("PASS: continuous shot trajectory and cooking order validation.");
