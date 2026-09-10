/**
 * Hand-drawn pixel sprites, authored as character grids the way real sprite
 * work is done: one character per pixel, mapped through PALETTE. The renderer
 * merges horizontal runs of the same colour into single rects, so a 16x20
 * sprite costs a few dozen DOM nodes instead of 320.
 */

export const PALETTE: Record<string, string> = {
  K: "#1a1a1e", // near-black: hair, cloak, outline
  k: "#33333a", // dark gray
  G: "#a8adb8", // headband metal
  g: "#7c8290", // metal shadow
  W: "#f2ece2", // white / cream
  w: "#d8d0c2", // cream shadow
  R: "#c0392b", // red: akatsuki clouds, sharingan
  r: "#8c2820", // deep red
  S: "#c48a5a", // light skin
  s: "#a06e42", // skin shadow
  D: "#7a4a28", // brown skin
  d: "#5c3419", // brown skin shadow
  N: "#2b3a4a", // navy cloth
  O: "#e07a2f", // orange body
  o: "#b85c1c", // orange shadow
  B: "#2f6fbf", // blue
  F: "#f26722", // flame orange
  f: "#ffc93c", // flame yellow
  P: "#5a2d82", // purple jersey
  p: "#3f1f5c", // purple shadow
  Y: "#f2c230", // gold
  y: "#d9a91c", // gold shadow
  T: "#6b4a30", // wood / trunk
  L: "#4f7d3a", // leaf green
  l: "#6a9c50", // leaf highlight
  A: "#8a8f98", // asphalt / gray prop
  C: "#c9c9cf", // light gray
  E: "#3a3a3f", // device body
  M: "#5a5a5a", // mid gray metal
  n: "#e8a0b8", // blossom pink
  m: "#cf7f9b", // blossom pink deep
  V: "#1f5c3d", // porsche green
  v: "#17482f", // porsche green shadow
  Q: "#8fb8cc", // window glass
  z: "#7fa855", // bamboo stalk
  Z: "#3d6b9e", // vase blue
  j: "#2c4f78", // vase blue deep
  I: "#fbfbf9", // pure white (car body)
  i: "#d3d3cf", // white shadow
  X: "#3f4753", // sword steel
  H: "#bcc4cc", // carved stone (lit)
  h: "#69717a", // carved stone (shadow)
};

/** Itachi — slashed leaf plate, Sharingan, tear troughs, Akatsuki cloak.
    48x64, rendered at half scale. */
export const ITACHI = [
  "................KKKKKKKKKKKKKKKK................",
  "..............KKKKKKKKKKKKKKKKKKKK..............",
  "............KKKKKKKKKKKKKKKKKKKKKKKK............",
  "...........KKKKKKKKKKKKKKKKKKKKKKKKKK...........",
  "...........KKKKKKKKKKKKKKKKKKKKKKKKKK...........",
  "...........KKKKKKKKKKKKKKKKKKKKKKKKKK...........",
  "...........KKKKKKKKKKKKKKKKKKKKKKKKKK...........",
  "...........KKKKKKKKKKKKKKKKKKKKKKKKKK...........",
  "...........KKKKKKKKKKKKKKKKKKKKKKKKKK...........",
  "...........KKKKKKKKKKKKKKKKKKKKKKKKKK...........",
  "..........KKKKKKKKKKKKKKKKKKKKKKKKKKKK..........",
  "..........KKKKKKKKKKKKKKKKKKKKKKKKKKKK..........",
  "..........KKggggggggggggggggggkkkgggKK..........",
  "..........KKGGGCCCCCCCCCkkkkkkgggGGGKK..........",
  "..........KKGGGCCCkkkkkkggggggCCCGGGKK..........",
  "..........KKGGGkkkggggggCCCCCCCCCGGGKK..........",
  "..........KKGGGgggGGGGGGGGGGGGGGGGGGKK..........",
  "..........KKKKKSSSSSSSSSSSSSSSSSSKKKKK..........",
  "..........KKKKKSSSSSSSSSSSSSSSSSSKKKKK..........",
  "..........KKKKKSSkkkkkSSSSkkkkkSSKKKKK..........",
  "..........KKKKKSSRRRRRSSSSRRRRRSSKKKKK..........",
  "..........KKKKKSSKRKRKSSSSKRKRKSSKKKKK..........",
  "..........KKKKKSSRRKRRSSSSRRKRRSSKKKKK..........",
  "..........KKKKKSSRRRRRSSSSRRRRRSSKKKKK..........",
  "..........KKKKKSSSSSSSSSSSSSSSSSSKKKKK..........",
  "..........KKKKKSSSsSSSSssSSSSsSSSKKKKK..........",
  "..........KKKKKSSSsSSSSssSSSSsSSSKKKKK..........",
  "..........KKKKKSSSsSSSSssSSSSsSSSKKKKK..........",
  "..........KKKKKSSSsSSSSSSSSSSsSSSKKKKK..........",
  "..........KKKKKSSSSSSSSSSSSSSSSSSKKKKK..........",
  "..........KKKKKSSSSSSkkkkkkSSSSSSKKKKK..........",
  "..........KKKKKSSSSSSSSSSSSSSSSSSKKKKK..........",
  "..........KKKKKKSSSSSSSSSSSSSSSSKKKKKK..........",
  "..........KKKKKKKSSSSSSSSSSSSSSKKKKKKK..........",
  "..........KKKKKKKKKKKKKKKKKKKKKKKKKKKK..........",
  "..........KKKKKKKKKKKKKKKKKKKKKKKKKKKK..........",
  ".........KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.........",
  ".........KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.........",
  ".........KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.........",
  ".........KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.........",
  ".........KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.........",
  ".......KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.......",
  ".......KKKKKKKWWWKKKKKKKKKKKKKKWWWKKKKKKK.......",
  ".......KKKKKWWWRWWWKKKKKKKKKKWWWRWWWKKKKK.......",
  ".......KKKKWRRRRRRRWKKKKKKKKWRRRRRRRWKKKK.......",
  ".......KKKWRRRRRRRRRWKKKKKKWRRRRRRRRRWKKK.......",
  ".......KKKKWRRRRRRRWKKKKKKKKWRRRRRRRWKKKK.......",
  ".......KKKKKWWWRWWWKKKKKKKKKKWWWRWWWKKKKK.......",
  ".......KKKKKKKWWWKKKKKKKKKKKKKKWWWKKKKKKK.......",
  ".......KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKKKKKWWWKKKKKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKKKWWWRWWWKKKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKKWRRRRRRRWKKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKWRRRRRRRRRWKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKKWRRRRRRRWKKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKKKWWWRWWWKKKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKKKKKWWWKKKKKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.......",
  ".......KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK.......",
  "...........KKKKKKKKKK......KKKKKKKKKK...........",
  "...........KKKKKKKKKK......KKKKKKKKKK...........",
];

/** Killer Bee — platinum spikes, cloud plate, wraparound shades, goatee,
    blades fanned behind the shoulders. 48x64, rendered at half scale. */
export const KILLER_BEE = [
  "................................................",
  "................................................",
  "......................wWW.......................",
  "..................wW..wWW..wW...................",
  "..............wWW.wW..wWW..wW..wWW..............",
  "..............wWWWwWWWwWWWWwWWWwWW..............",
  "..............wWWWwWWWwWWWWwWWWwWW..............",
  ".............WWWWWWWWWWWWWWWWWWWWWW.............",
  ".............WWWWWWWWWWWWWWWWWWWWWW.............",
  ".............wwwwWWWWWWWWWWWWWWwwww.............",
  ".............wwwwWWWWWWWWWWWWWWwwww.............",
  "...........WWWWWWWWWWWWWWWWWWWWWWWWWW...........",
  "...........WWWWWWWWWWWWWWWWWWWWWWWWWW...........",
  "...........gggggggggggggggggggggggggg...........",
  "...........GGGGGCCCCCCCCCCCCCCCCGGGGG...........",
  "...........GGGGGCCCCCCCCCCCCCCCCGGGGG...........",
  "...........GGGGGGGGGGGGGGGGGGGGGGGGGG...........",
  "..............DDDDDDDDDDDDDDDDDDDD..............",
  "..............DDDDDDDDDDDDDDDDDDDD..............",
  "..............DDDDDDDDDDDDDDDDDDDD..............",
  "..........XX.kkkkkkkkkkkkkkkkkkkkkk..XX.........",
  "..........XX.KKkkkkkKKKKKKKKkkkkkKK..XX.........",
  "..........XX.KKkkkkkKKKKKKKKkkkkkKK..XX.........",
  "...........XXKKKKKKKKKKKKKKKKKKKKKK.XX..........",
  "....XX.....XXKKKKKKKKKKKKKKKKKKKKKK.XX.....XX...",
  ".....XX....XX.DDDDDDDDDDDDDDDDDDDD..XX....XX....",
  ".....XX....XX.DDDDDDDDDDDDDDDDDDDD..XX....XX....",
  "......XX....XXDDKKKDDDDDDDDDDDDDDD.XX....XX.....",
  ".......XX...XXDDDDDDDDDDDDDDDDDDDD.XX...XX......",
  ".......XX...XXDDDDDDDddddddDDDDDDD.XX...XX......",
  "........XX..XXDDDDDDDDDDDDDDDDDDDD.XX..XX.......",
  ".........XX..XDDDDDDDKKKKKKDDDDDDDXX..XX........",
  ".........XX..XDDDDDDDKKKKKKDDDDDDDXX..XX........",
  "..........XX.XXDDDDDDKKKKKKDDDDDD.XX.XX.........",
  "...........XXXX..DDDDDDKKKDDDDD...XXXX..........",
  "..........RRRRRRRRRRRRRRRRRRRRRRRRRRRR..........",
  "..........RRRRRRRRRRRRRRRRRRRRRRRRRRRR..........",
  "..........NNNNNNNNNNNNNNNNNNNNNNNNNNNN..........",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "......DDDDDNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDD......",
  "..........NNNNNNNNNNNNNNNNNNNNNNNNNNNN..........",
  "...........NNNNNNNNNNNN..NNNNNNNNNNNN...........",
  "...........NNNNNNNNNNNN..NNNNNNNNNNNN...........",
  "...........NNNNNNNNNNNN..NNNNNNNNNNNN...........",
  "...........NNNNNNNNNNNN..NNNNNNNNNNNN...........",
  "...........NNNNNNNNNNNN..NNNNNNNNNNNN...........",
  "...........NNNNNNNNNNNN..NNNNNNNNNNNN...........",
  "...........NNNNNNNNNNNN..NNNNNNNNNNNN...........",
  "...........NNNNNNNNNNNN..NNNNNNNNNNNN...........",
  "...........KKKKKKKKKKKK..KKKKKKKKKKKK...........",
  "...........KKKKKKKKKKKK..KKKKKKKKKKKK...........",
];

/** Infernape — tall crown flame, gold brow ridge, blue eye markings. */
export const INFERNAPE = [
  "..........f.f...........",
  ".........fFffF..........",
  "........fFFFFFf.........",
  "........FFFFFFF.........",
  ".......FFFFFFFFF........",
  "........FFFFFFF.........",
  ".......YYYYYYYYY........",
  "......OOOOOOOOOOO.......",
  ".....OOWWWWWWWWWOO......",
  "....OOWWWWWWWWWWWOO.....",
  "....OWWWWWWWWWWWWWO.....",
  "....OWWBBWWWWWBBWWWO....",
  "....OWWBKBWWWBKBWWWO....",
  "....OWWBBWWWWWBBWWWO....",
  "....OWWWWWBBBWWWWWWO....",
  ".....OWWWWWWWWWWWWO.....",
  "......OOWWWWWWWOO.......",
  ".......OOOOOOOOO........",
  "......OOOWWWWWOOO.......",
  ".....OOOOWWWWWOOOO......",
  "....OOOOOWWWWWOOOOO.....",
  "...OOOOOOWWWWWOOOOOO....",
  "...OOOOOOWWWWWOOOOOO....",
  "...OOOOOOOOOOOOOOOOO....",
  "..OOOO..OOOOOOO..OOOO...",
  ".OOOO...OOOOOOO...OOOO..",
  "........OOOOOOO.........",
  ".......OOOO.OOOO........",
  "......OOOO...OOOO.......",
  "......OOOO...OOOO.......",
  ".....OOOOO...OOOOO......",
  ".....OOOOO...OOOOO......",
];

/** LeBron — headband, full beard, gold jersey with a purple 23. */
export const LEBRON = [
  "........DDDDDDDD........",
  "......DDDDDDDDDDDD......",
  ".....DDDDDDDDDDDDDD.....",
  ".....YYYYYYYYYYYYYY.....",
  ".....YYYYYYYYYYYYYY.....",
  ".....DDDDDDDDDDDDDD.....",
  ".....DDDDDDDDDDDDDD.....",
  ".....DDKKDDDDDDKKDD.....",
  ".....DDDDDDDDDDDDDD.....",
  "......DDDDDDDDDDDD......",
  "......DDKKKKKKKKDD......",
  "......DDKKKKKKKKDD......",
  ".......DKKKKKKKKD.......",
  "........KKKKKKKK........",
  "......DDDDDDDDDDDD......",
  "...YYYYYYYYYYYYYYYYYY...",
  "..DYYYYYYYYYYYYYYYYYYD..",
  "..DYYYYYPPPYPPPYYYYYYD..",
  "..DYYYYYYYPYYYPYYYYYYD..",
  "..DYYYYYPPPYPPPYYYYYYD..",
  "..DYYYYYPYYYYYPYYYYYYD..",
  "..DYYYYYPPPYPPPYYYYYYD..",
  "..DYYYYYYYYYYYYYYYYYYD..",
  "...YYYYYYYYYYYYYYYYYY...",
  "...PPPPPPPPPPPPPPPPPP...",
  "...PPPPPPPPPPPPPPPPPP...",
  "...PPPPPPPP..PPPPPPPP...",
  "...PPPPPPPP..PPPPPPPP...",
  "....DDDDDD....DDDDDD....",
  "....DDDDDD....DDDDDD....",
  "...WWWWWWW...WWWWWWW....",
  "...WWWWWWW...WWWWWWW....",
];

/* ---------- props ---------- */

export const POKEBALL = [
  "..KKKKKK..",
  ".KRRRRRRK.",
  "KRRRRRRRRK",
  "KRRRRRRRRK",
  "KKKKKKKKKK",
  "KKKWWWWKKK",
  "KWWWKKWWWK",
  "KWWWKKWWWK",
  ".KWWWWWWK.",
  "..KKKKKK..",
];

export const DUMBBELL = [
  "..KK......KK..",
  ".KMMK....KMMK.",
  ".KMMKKKKKKMMK.",
  ".KMMKAAAAKMMK.",
  ".KMMKAAAAKMMK.",
  ".KMMKKKKKKMMK.",
  ".KMMK....KMMK.",
  "..KK......KK..",
];

export const BRICK = [
  ".YY..YY..YY..YY.",
  ".YY..YY..YY..YY.",
  "YYYYYYYYYYYYYYYY",
  "YYYYYYYYYYYYYYYY",
  "YyyyyyyyyyyyyyyY",
  "YyyyyyyyyyyyyyyY",
  "YYYYYYYYYYYYYYYY",
];

export const FOOTBALL = [
  "...TTTT...",
  ".TTTTTTTT.",
  "TTTTWTTTTT",
  "TTTWWWTTTT",
  "TTTTWTTTTT",
  ".TTTTTTTT.",
  "...TTTT...",
];

export const CONTROLLER = [
  "..EEEEEEEEEE..",
  ".EEEEEEEEEEEE.",
  "EECEEEEEEEREE.",
  "ECCCEEEEERREEE",
  "EECEEEEEEEREE.",
  ".EEEEEEEEEEEE.",
  "..EE......EE..",
];

/** A face carved into the Hokage rock — hair mass, brow, eyes, nose, mouth. */
export const HOKAGE_FACE = [
  "...hhhhhhhh...",
  ".hhhhhhhhhhhh.",
  "hhhhhhhhhhhhhh",
  "hhHHHHHHHHHHhh",
  "hHHHHHHHHHHHHh",
  "hHHhhHHHHhhHHh",
  "hHHhhHHHHhhHHh",
  "hHHHHHHHHHHHHh",
  "hHHHHHhhHHHHHh",
  "hHHHHHhhHHHHHh",
  "hHHHHHHHHHHHHh",
  "hHHHhhhhhhHHHh",
  ".hHHHHHHHHHHh.",
  ".hhHHHHHHHHhh.",
  "..hhhHHHHhhh..",
  "....hhhhhh....",
];

/* ---------- the Lego shelf ---------- */
/* Drawn at native size and rendered at scale 1: a fractional scale on a
   crispEdges SVG lands rects on half-pixels and opens seams. */

/** Botanical bonsai: blossom canopy, bare trunk, rectangular planter. */
export const LEGO_BONSAI = [
  "......nnnnnnnn......",
  "....nnnnnnnnnnnn....",
  "..nnnnnnnnnnnnnnnn..",
  ".nnnnnnnnnnnnnnnnnn.",
  "nnnnmmnnnnnnnnmmnnnn",
  ".nnnnnnnnnnnnnnnnnn.",
  "..nnnnnnnnnnnnnnnn..",
  "...nnnnnnTTnnnnnn...",
  "....nnnn.TT.nnnn....",
  ".........TT.........",
  "........TTTT........",
  ".......TTTTTT.......",
  "......TT....TT......",
  "....................",
  "..WWWWWWWWWWWWWWWW..",
  "..WWWWWWWWWWWWWWWW..",
  "..WWWWWWWWWWWWWWWW..",
  "..wwwwwwwwwwwwwwww..",
  "...WWWWWWWWWWWWWW...",
  "...TTTTTTTTTTTTTT...",
];

/** The 911 in white. What carries it: a round lamp set into a raised front
    fender, a hood dipping one row below that crown, a cabin set back with the
    roof falling in one arc to a long rear deck. */
export const LEGO_PORSCHE = [
  "..................IIIIIIIII...........",
  "................IIIIIIIIIIIII.........",
  "..............IIQQQQQQQQQQQQIII.......",
  ".............IIQQQQQQQQQQQQQQIII......",
  "............IIQQQQQQQQQQQQQQQQIII.....",
  "..IIIIII....IIIIIIIIIIIIIIIIIIIIIIII..",
  ".IIYYIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII..",
  ".IYYYIIIIIIIIIIIIIIIIIIIIIIIIIIIIIRR..",
  ".IIYYIIIIIIIIIIIIIIIIIIIIIIIIIIIIIRR..",
  ".IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII..",
  ".IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII..",
  ".iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii..",
  "..iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii...",
  "....KKKKKKKK.............KKKKKKKK.....",
  "...KKKCCCCKKK...........KKKCCCCKKK....",
  "...KKKCCCCKKK...........KKKCCCCKKK....",
  "....KKKKKKKK.............KKKKKKKK.....",
];

/** Lucky bamboo: three stalks, leaf sprays, glazed vase. */
export const LEGO_BAMBOO = [
  ".......L......",
  "......LLL.....",
  "....L..z..L...",
  "...LLL.z.LLL..",
  "....z..z..z...",
  "....z..z..z...",
  "....z..z..z...",
  "....z..z..z...",
  "....z..z..z...",
  "....z..z..z...",
  "....z..z..z...",
  "....z..z..z...",
  "....zzzzzzz...",
  ".....zzzzz....",
  "..ZZZZZZZZZZ..",
  "..ZZZZZZZZZZ..",
  "..ZZZZZZZZZZ..",
  "..jjjjjjjjjj..",
  "...ZZZZZZZZ...",
  "...jjjjjjjj...",
];
