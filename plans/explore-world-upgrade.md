# Explore World: personal campus

## Scope

Local implementation in `components/world/`. Entry remains `WorldView.tsx` → `CampusExplorer.tsx` → lazy `CampusScene.tsx`, with procedural landmarks in `CampusLandmarks.tsx`. Existing portfolio tabs, routes, resume, links, and unrelated worktree changes are preserved. No deployment, backend, live feed, audio, or physics engine.

## Content and layout

`lib/campus.ts` is the source for scene selections, previews, detail panels, map, and mobile directory. Each destination records kind, group, visual type, position, explicit entrance, footprint, and optional role/date/logo/screenshot/workflow metadata.

21 destinations:
- Arrival courtyard: Avery Romain, Amherst, #93, resume and contact.
- Featured work: circular Sanfoka investment committee and stepped CapitalBase modeling studio, each combining its founder experience.
- Side Projects: four separate open exhibits for AML Sentinel, Transfer Portal, Stackr, and DataChat.
- Experience: Clavius, SoFi, Caprae, Murj; smaller Menlo School and basketball camp markers. CapitalBase/Sanfoka are not duplicated.
- Off the clock: anime, Pokémon, basketball, lifting, LEGO, gaming, cooking, hiking.

Names, roles, dates, claims, and links derive from `lib/portfolioData.ts`, `components/FunFacts.tsx`, `components/FunFact.tsx`, `components/PixelWorld.tsx`, and the user's approved #93/name choices. World display aliases Sanfoka and Stackr preserve the user's requested wording without rewriting shared portfolio source identifiers Sankofa and Stackwise. CapitalBase contains financial modeling only, not Murj.

Local official logo sources and Clavius fallback rationale: `public/world/logos/SOURCES.md`. Existing screenshots are reused, with source provenance metadata added without pixel changes.

## Quiet interaction

- No preview opens automatically on arrival. Once engaged, proximity opens the nearest destination.
- Hover/focus takes precedence over proximity. One preview shows concise bullets and an available external link; a short leave grace period lets the pointer enter it.
- Scene names remain compact; full company identity, role and date live in active labels, preview, details and directory.
- Hobby labels appear only when active. Direct navigation and the mobile directory expose all hobbies without discovery.
- Click or E pins details. The panel remains selected until explicit close/another selection, traps keyboard focus, locks page scroll, and restores focus.
- WASD/arrows move relative to the camera. Ground-click walks toward a target; manual input cancels it. This is not automatic obstacle pathfinding.
- M opens the map; map travel uses authored entrances. Escape closes maps and details.
- Desktop can switch to a grouped list. Narrow/coarse-pointer devices and graphics failures receive the same 21 destinations.
- Switching portfolio tabs unmounts the renderer and its listeners. Reduced motion disables bob/leg swing/local pulse and interpolated camera follow.

## Performance

Shared unit box geometry and a finite material palette, capped DPR 1.5, one 1024-square shadow-casting directional light, no postprocessing. Other shapes use low segment counts. The frame loop mutates movement/camera refs; React selection changes only when needed. Screenshots and company assets are local. Dependency-level Three.Clock deprecation warnings remain in development; browser checks reported no page errors.

## Verification

Repeatable layout suite: `node scripts/test-campus.mjs`.
- 21 unique destinations, four open exhibits, eight hobbies.
- All image/logo files exist; links have supported schemes.
- Solid destination centers collide; all entrances are walkable.
- Grid flood confirms every entrance connects to the arrival area.
- Employer/founder role/date metadata and CapitalBase/Murj separation.

Browser checks at 1440×1000 and 390×844:
- Hover AML → enter preview → wait → click details: selected destination remains stable.
- Focus DataChat label + E pins DataChat; Escape closes it.
- Map travel to Sanfoka, CapitalBase, Transfer Portal, Murj, and overlook matches exact authored coordinates and expected proximity preview.
- Keyboard movement, map Escape, mobile taps, panel Tab wrap, no horizontal overflow.
- Mobile and simulated WebGL failure both expose all 21 destinations.
- Reduced-motion media mode works; switching tabs removes canvas and returning mounts one canvas.

External project URLs checked successfully (HTTP 200, redirects allowed):
- AML Sentinel → login
- Transfer Portal → dashboard
- Stackr → home
- DataChat → home

TypeScript, focused ESLint, and the final production build passed. The raster provenance scan passed: five images, zero missing records.

Independent finish review: three localized findings (Clavius/SoFi overlap, duplicated courtyard identity, preview eyebrow) corrected. Verdict pass scored all three resolved, ship at that scope. The one detector run found advisory differences from the prior design documentation; scoped documentation is refreshed to the built surface.

Evidence: `.impeccable/review/personal-campus-{desktop,preview,mobile,mobile-panel}.png`.

## Local testing

Open http://localhost:3000/#world (existing dev server). Click any exhibit or use Map; browse as a list for immediate access. This change was not deployed.

## Follow-up: clearer voice and optional games (2026-09-08)

At the user's request, simplified the header, group names, destination titles, and descriptions; added the stated love of fashion to About. Hobby panels no longer repeat the same sentence in a bullet list. Cooking moved to its own west-path patio at [-19, 7], entrance [-19, 9], separating it from both the basketball court and the earlier basketball-camp marker.

The user's newer request supersedes the earlier no-minigames choice. Basketball, Pokémon, and LEGO now offer small optional activities inside the existing details panel, without adding a campus HUD or backend:

- Basketball: five-shot timing round, score and replay; untimed range input for keyboard access and reduced motion.
- Pokémon: three matching pairs, a turn count, mismatch recovery and shuffle/reset.
- LEGO: four-by-four bonsai build, selectable bricks/eraser, undo, and start over.

Games load only when opened and reset on close. Pending frames and mismatch timers are cleaned up on unmount. Browser-hidden timing pauses without consuming a shot. The games use authored geometric UI, not new raster assets or dependencies.

Verification: TypeScript, focused ESLint, production build, and extended `node scripts/test-campus.mjs` passed. Browser checks completed a scored basketball round (3 of 5), all Pokémon pairs plus reset, and the bonsai plus undo; mobile had no horizontal overflow. Layout tests retain all 21 connected entrances and assert patio separation and exactly three optional game assignments.

Final checks also confirmed reduced-motion basketball can score using keyboard-only aiming with zero SVG animations, closing/reopening resets a game, the fashion note is visible, and map travel reaches Cooking at [-19, 9]. No browser page errors occurred. Existing Three.Clock dependency deprecation warnings remain.

Screenshots: `.impeccable/review/games-campus-{desktop,mobile}.png`, `games-basketball-{desktop,mobile}.png`, `games-pokemon-mobile.png`, and `games-lego-mobile.png`. The earlier independent campus review remains historical, not a claim that it reviewed these new games.

## Follow-up: smoother basketball, cooking, and spacing (2026-09-08)

Basketball now uses a slower aiming meter and one continuous 900ms ball trajectory. Scoring waits for landing, repeat shots are guarded during flight, and the primary control retains keyboard focus so Escape still closes details. Reduced motion skips flight and keeps manual aiming. LEGO remains available with clearer Reference, Your build, and Brick color labels.

Cooking now offers three untimed ingredient-matching orders, grounded in the existing favorite-dishes note. Wrong plates get explicit corrections; editing clears stale corrections; serving all three enables replay. This is a small optional game, not cooking guidance. All four games remain lazily loaded inside their destination panels.

The Impeccable animate/polish pass widened desktop details to 520px, increased gutters and text spacing, labeled content sections, and collapsed Tools & technologies by default. No additional campus labels or HUD clutter were added.

Verification: TypeScript, focused ESLint, production build, and campus/game tests passed. Browser checks at 1440×1000 and 390×844 verified moving ball transforms, delayed single scoring, in-flight lock, retained Escape behavior, reduced-motion scoring, LEGO placement/undo, all three cooking orders plus correction/replay, mobile overflow, expandable tools, and game unmount on tab switch. No browser errors; the existing Three.Clock warning remains. The bounded visual review checked desktop basketball/details and mobile cooking; the one detector pass reported no material findings.

Evidence: `.impeccable/review/smooth-basketball-desktop.png`, `spaced-details-desktop.png`, and `cooking-mobile.png`. Available locally at http://localhost:3000/#world; not deployed.

## Follow-up: quiet scene labeling (2026-09-08)

The user's screenshot showed always-visible building titles competing with area signs. Kept the four area signs, replaced individual nameplates with small focusable markers, and reveal a title/logo only for the active destination. Removed tiny scene role/date duplication; all content remains in previews, details, map, and directory. The toolbar explains discovery. Buildings, markers, keyboard focus, and approach remain supported entry points.

Browser checks confirmed zero idle nameplates, one nameplate on hover, stable hover-to-preview travel, keyboard focus + E selection, Escape, and all five mobile directory headings. TypeScript, focused lint, and campus tests passed. Visual evidence: `.impeccable/review/quiet-labels-{desktop,hover,mobile}.png`. Local only.

## Follow-up: visible labels, full-width experience row, and entrepreneurship

Supersedes the quiet-label experiment at the user's request: restored always-visible work titles/logos and active-only hobby labels. The four employer buildings now sit at x=-20, -7, 6, and 19 along z=-18. Entrances and approach paths follow their new positions. Area signs use Entrepreneurship, Projects, Experience, and Hobbies; Projects now identifies AML Sentinel, Transfer Portal, Stackr, and DataChat.

Entrepreneurship groups Sanfoka, CapitalBase, basketball camp, and a new small powerwashing cart. The new powerwashing content uses only the user's confirmation of the experience; no dates, company name, revenue, or role claims were invented. A non-blocking question requests that information. Menlo remains on the Experience path. Map and mobile directory share the same updated grouping.

Verification: TypeScript, focused ESLint, production build, and the extended campus suite passed (22 destinations, four project exhibits, four entrepreneurship stops, eight hobbies, connected entrances, and at least 12 units between employer centers). Browser tests reached all four exact office entrances and the new Powerwashing entrance, opened its detail panel via E, and closed via Escape. Desktop/laptop/mobile visual checks identified sign collisions; the experience heading, camp location, and powerwashing label height were adjusted. Mobile contains all five groups without horizontal overflow. No portfolio browser errors; existing dependency warnings remain.

Current local URL: http://localhost:3001/#world. Port 3000 belongs to another app and was left untouched. No deployment.

## Follow-up: enlarged grounds and breathing room

Increased authored ground spacing by 60% while retaining building dimensions and local entrance offsets. The island grows from 50×44 to 80×70.4 world units. Project centers now have 9.6 units between them instead of 6; the continuous project paving is replaced by individual exhibit pads and connecting paths. Grass buffers separate the destinations and four named areas. All work labels/logos remain visible.

The surface uses up to 1800px of width and an 80vh scene, with an aspect-aware following camera. Walkable bounds, click targets, scenery positions, fog, and shadow coverage expand with the island. The map and scene now share `campusPaths`; connectors meet the same entrance coordinates used for map travel. No extra backend, games, assets, or dependencies.

TypeScript, focused lint, and the extended layout/game suite passed. Browser visual checks at 1440×1000 and 1100×820 reported no idle label overlaps; the camera correction kept every work/area label inside the scene at both sizes. The mobile directory retains all five groups. Evidence: `.impeccable/review/roomy-final-{1440,1100}.png` and `roomy-mobile.png`. This layout pass follows the user's preference for visible labels and uses physical space rather than hiding content. Local testing remains on port 3001; no deployment.

Final verification: production build passed. Browser map travel reached Murj, AML Sentinel, Powerwashing, and Hiking at their exact expanded entrances; E opened Hiking and Escape closed it. Mobile Powerwashing details opened correctly with no horizontal overflow. The QA browser was closed; the portfolio dev server remains available on port 3001.

## Follow-up: clearer district boundaries (2026-09-09)

Kept the approved enlarged layout and visible labels. Added shared district ground polygons with four restrained lawn colors, plus low hedge rows with stone edging and openings at path crossings. Experience, Entrepreneurship, Projects, and Hobbies now read as distinct areas; dispersed hobby destinations retain matching small lawn patches. The map uses the same polygons. No destinations, camera settings, factual content, or mobile grouping changed.

Validation: every work/hobby destination belongs to its correctly labeled zone; every hedge has matching collision geometry and clears all path widths and entrances. Flood reachability still passes for all 22 destinations. TypeScript, focused lint, production build, desktop/laptop/mobile review, map display, map travel to AML Sentinel, E selection, and Escape passed. Evidence: `.impeccable/review/sections-final.png`, `sections-1100.png`, `sections-map.png`, and `sections-mobile.png`. The Impeccable layout pass clarified groups through landscaping while preserving the approved composition. Local only at http://localhost:3001/#world.
