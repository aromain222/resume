---
name: Explore World campus
description: A warm low-poly personal campus for Avery Romain's work and life, scoped to Explore World.
colors:
  stage: "oklch(96.5% 0.006 302)"
  stage-raised: "oklch(99.3% 0.002 302)"
  bone: "oklch(20% 0.015 302)"
  bone-soft: "oklch(40% 0.018 302)"
  line: "oklch(0% 0 0 / 0.12)"
  maroon: "oklch(35% 0.11 25)"
  campus-air: "#b9c6bd"
  campus-loading: "#d1d8d4"
  campus-path: "#cbbda2"
  campus-ground: "#627d65"
  label-paper: "#f7f4ed"
  label-ink: "#293b36"
  label-active: "#fff5db"
  preview-paper: "#fcf6e9"
  preview-line: "#d8cab3"
typography:
  headline:
    fontFamily: "var(--font-archivo), system-ui, sans-serif"
    fontSize: "clamp(24px, 3vw, 40px)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "var(--font-archivo), system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "var(--font-archivo), system-ui, sans-serif"
    fontSize: "15px"
    lineHeight: 1.65
  label:
    fontFamily: "var(--font-archivo), system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
rounded:
  link: "4px"
  label: "5px"
  preview: "8px"
  viewport: "12px"
spacing:
  control-gap: "12px"
  map-padding: "20px"
  mobile-gutter: "24px"
  panel-gutter: "40px"
  desktop-gutter: "28px"
components:
  project-link:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.stage}"
    rounded: "{rounded.link}"
    padding: "12px 15px"
  project-link-hover:
    backgroundColor: "{colors.maroon}"
  campus-label:
    backgroundColor: "{colors.label-paper}"
    textColor: "{colors.label-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.label}"
    padding: "6px 9px"
  campus-label-active:
    backgroundColor: "{colors.label-active}"
  destination-preview:
    backgroundColor: "{colors.preview-paper}"
    textColor: "{colors.label-ink}"
    rounded: "{rounded.preview}"
    padding: "20px"
    width: "310px"
  destination-row:
    padding: "23px 0"
    width: "100%"
  detail-panel:
    backgroundColor: "{colors.stage-raised}"
    width: "min(520px, 100%)"
    padding: "24px 40px 40px"
  quick-navigation:
    padding: "24px 0 0"
---

# Design System: Explore World campus

## Overview

**Creative North Star: "A warm personal campus"**

This document governs only Explore World in `components/world/`, reached through `WorldView.tsx`. It does not redesign the portfolio or establish new global conventions. The approved personal campus brings Avery's work and life into warm low-poly places, with muted materials and dusk light.

Stone, wood, faceted foliage, and a small walking figure carry the atmosphere; the surrounding UI retains the portfolio's Archivo typography, understated confidence, and accessibility commitments. Distinctive landmark silhouettes do more identity work than interface decoration. Exploration is optional, and quiet controls leave room to see the campus.

**Key Characteristics:**

- Distinctive procedural landmarks in warm, muted dusk light.
- Existing Archivo typography and light portfolio surfaces.
- Work, experience, and small off-the-clock discoveries with equivalent direct access.
- Quiet initial state, one contextual preview, and readable docked details.

Evidence: `campus.module.css`, `CampusScene.tsx`, `CampusLandmarks.tsx`, `CampusExplorer.tsx`, `WorldView.tsx`, `../../lib/campus.ts`, and `../../app/globals.css`. This refresh follows the compact Clavius sign, single courtyard identity label, and title-first preview corrections. Source files remain authoritative; the documentation does not certify a visual-review verdict.

## Colors

### Primary

Portfolio maroon marks text hover, panel-link hover, and bullet markers. Keep the inherited CSS custom properties live; their existing names are intentionally counterintuitive: stage is the light background and bone is dark ink.

### Secondary

Campus ground is muted green and campus paths are sandy stone. Landmark-specific teal, ochre, slate, clay, and moss accents remain data-owned in `lib/campus.ts`, not a new site-wide semantic palette. Warm timber and varied stone surfaces distinguish pavilions, stepped architecture, offices, and exhibits without making every destination a bright marker.

### Neutral

Stage and stage-raised support the existing portfolio and reading panels; bone, bone-soft, and line provide text and separators. Campus air supplies the canvas background and fog, while campus-loading is the separate loading-stage color. Label paper and label ink support compact names. Active labels become warm cream; the preview uses warmer paper and a sandy border.

The legacy global `.world` night-city tokens are not the visual authority for this CSS-module campus.

## Typography

Archivo is inherited from the portfolio; no new font asset is introduced. Headline and panel-title roles are sentence case, medium-heavy, tightly tracked, and balanced. The panel title reduces to 30px below 900px.

Panel descriptions use the body role; bullets use 14px with 1.75 line height. Directory titles are 20px at weight 600, descriptions 13px with 1.65 line height and a 65ch maximum. Preview titles are 22px at weight 600; preview bullets are 12px with 1.6 line height. The title leads the preview without a repeated category eyebrow.

Work destinations retain always-visible title labels and available official logos, as explicitly requested. Hobby titles appear when active. Active professional labels include role/date metadata; complete content remains in previews, details, and the directory. The courtyard carries its own identity sign. Clavius uses a short scene title and its full company name elsewhere. Buildings and labels remain pointer-interactive and work labels remain keyboard-accessible.

Four non-interactive area signs identify Entrepreneurship, Projects, Experience, and Hobbies. They use 12px bold uppercase lettering, 0.06em tracking, dark green on warm cream, and 7px by 12px padding. Their positions live in `campusDistricts`, beside the paths or above the rear row; they do not capture pointer input or add keyboard stops. Mobile retains the matching grouped directory headings. Projects labels the AML Sentinel, Transfer Portal, Stackr, and DataChat exhibits; Entrepreneurship groups Sanfoka, CapitalBase, basketball camp, and powerwashing.

## Layout

The section has an 1800px maximum width with `24px 28px 40px` desktop padding. A compact heading and toolbar precede the full-width scene, whose height is `clamp(560px, 80vh, 920px)`. Direct access sits below the scene in five initially collapsed native disclosure groups.

The current content inventory is 22 destinations: the arrival courtyard, Sanfoka and CapitalBase, four project exhibits, four employer buildings, two milestone markers, a powerwashing cart, and eight small hobbies. Navigation groups are About me, Entrepreneurship, Projects, Experience, and Hobbies. `CAMPUS_SPACING=1.6` expands authored landmark positions and ground dimensions without scaling buildings, footprints, or local doorway offsets. The island is 80 by 70.4 world units; project centers have 9.6-unit spacing. Employer buildings span x=-32 to x=30.4 along z=-28.8. Shared `campusPaths` routes the narrower connecting paths to actual entrances and also draws the map. The project courtyard's continuous paved slab is replaced with individual exhibit pads, paths, and grass gaps. Powerwashing has only the user's confirmed experience, without invented dates or outcomes. This inventory describes the current surface, not a fixed global limit. Copy is direct and first-person; hobby descriptions appear once rather than being repeated as bullets. The About destination includes Avery's stated interest in fashion.

The following camera uses a 40/44/40 offset with aspect-aware framing for narrower desktop views. Fog, ground-click bounds, and shadow coverage match the expanded island. The existing capped pixel density, lightweight procedural geometry, games, labels, and mobile directory behavior remain unchanged.

Districts are sectioned with muted lawn treatments: cool sage for Experience, warm olive for Entrepreneurship, lighter green for Projects, and deeper green for Hobbies. `campusZones` defines the same polygons for scene ground and map; every non-arrival destination lies within its own group's treatment. Hobbies retains smaller matching sports/overlook patches instead of relocating those destinations. Low hedge rows and narrow stone edging mark section boundaries. `campusGardenBorders` splits each row around all paths and landmarks, and supplies matching collision bounds. These boundaries are intentionally open, not full enclosures. The enlarged spacing, existing titles, camera, and mobile grouping stay unchanged.

3D is enabled only at a minimum width of 900px with a fine pointer. Smaller screens, coarse pointers, explicit list mode, and renderer failure use the complete grouped directory. Below 900px, section padding becomes `64px 24px 40px`; the local heading resume link is hidden, without changing global navigation.

The map is a 290px scrollable overlay, inset 16px. One preview sits at the lower left (310px wide, 20px inset and padding); it is absent initially and hidden while the map or details are open. Details dock to the window's right edge as a fixed panel, at most 520px wide and full-width on narrower screens. Mobile panel padding is `18px 24px 32px`.

## Elevation & Depth

Scene depth comes from perspective, occlusion, rough materials, fog, and cast shadows. A warm directional light (`#ffd39a`, intensity 2), ambient light (0.6), and sky/ground hemisphere light (1.1) create dusk warmth. Ground lamps are small warm accents. Geometry is procedural, with local official company-logo assets on selected signs and existing project screenshots in detail panels.

UI shadows are structural: labels separate from geometry, a single preview lifts over the scene, the map overlays the grounds, and the reading panel sits above a tinted scrim. Exact shadow values are recorded in the sidecar. The unused legacy nearby-prompt CSS is not a current component.

## Shapes

Simple blocks, low-segment cylinders and spheres, and faceted trees form a shared material language. The circular arrival courtyard, open committee pavilion, stepped modeling building, tabletop side exhibits, and varied office roofs have distinct silhouettes. Milestones remain small markers. Hobbies are small props and places—a court, lifting rack, bench, patio, or overlook—not additional office buildings.

UI corners remain modest: the viewport and map use the viewport radius, labels the label radius, the preview the preview radius, and project links the link radius. Project screenshots have gently rounded corners (6px). The full-height reading panel stays square-edged.

## Components

- **Campus scene:** WASD/arrows move the figure after the scene is focused; clicking walkable ground sets a destination. Landmarks and labels open details. E opens the active destination; M opens the map. Walking is never the only access path.
- **Landmark labels:** Projects and Experience retain visible compact labels; Education, Entrepreneurship, and Hobbies reveal labels only on hover, keyboard focus, selection, or nearby discovery after engagement. Official local SoFi, Caprae, Murj, and Clavius logos identify their offices. Amherst's A and Menlo's tree emblem are mounted on school facades; their floating names remain discovery-only. Full identities stay available in accessible labels and reading surfaces.
- **Preview:** a title, role/date when present, up to three factual bullets, Open details, and an external Visit link when available. There is only one preview; pointer/focus can move into it without immediate dismissal (450ms release delay). No preview is preselected on arrival.
- **Map and direct navigation:** every destination remains reachable without walking. The grouped map relocates the figure; grouped disclosure navigation opens details directly. Escape closes an open map even when focus remains on its toolbar trigger.
- **Directory:** full-width, ruled rows pair title, role/date when present, and description with an arrow. The same six content groups organize desktop list mode, mobile, and renderer-error fallback; none omit destinations.
- **Detail panel:** group, full title, role/date, description, optional screenshot or explicitly illustrative workflow, factual bullets under Background/My role/What it does, a collapsed tools disclosure, and existing links. The wider desktop panel and 1.8-line-height intro leave more space between reading sections. Opening pauses movement, focuses the close button, traps Tab, and locks page scrolling; Escape, the scrim, close, or Continue exploring dismiss it. Illustrative workflows are not represented as live feeds.
- **Controls:** hover uses existing maroon; focus inherits the global 2px maroon-bright outline with 3px offset (4px on the scene region). Preserve labels on icon-only close controls.
- **Motion:** smooth exponential camera following and weighted avatar movement remain scene-local. Reduced motion removes avatar bob, leg swing, and the active entrance-ring bob, and makes camera following immediate. Opening the map or panel pauses walking; no new panel transition is prescribed.
- **Optional hobby games:** the basketball, Pokémon, LEGO, and cooking panels offer a text action that lazily opens a small activity. Nothing autoplays in the campus. Basketball has a five-shot timing challenge, labeled release zone, slower aim meter, continuous 900ms shot arc, a locked in-flight state, and an untimed keyboard-accessible slider; reduced motion uses untimed aiming and omits the shot animation. Pokémon uses six matching cards and a reset; LEGO uses a four-by-four bonsai pattern with labeled brick choices, undo, and reset. Cooking presents three ingredient-matching orders inspired by Avery's favorite dishes, with labeled order, ingredients, and plate areas; corrections, replay, and no timer. Closing the game or panel unmounts its state and cancels frame/timer work. No audio, account, external asset, or physics dependency is introduced. Game controls retain the warm material palette and existing focus styles.

## Do's and Don'ts

### Spatial hierarchy — September 2026 refinement

**Discovery-dot affordance:** Each discovery-only destination has a static 9px cream-ringed green dot inside the same 28px minimum button target. Hover/focus/proximity replaces the dot with the existing name label and preview; clicking opens details. One button per destination preserves keyboard focus and avoids overlapping controls. Existing visible titles/logos remain unchanged; the removed central name marker stays removed. Dots have no animation and mobile Directory content is unchanged.

**Final label adjustment:** Remove the central Avery/Amherst name sign and its stand/collision, preserving the courtyard and benches. Sankofa (corrected spelling) and CapitalBase titles are always visible; the other Education, Entrepreneurship, and Hobbies destinations remain discovery-only. About content remains available through the courtyard, map, and Directory.

**Education/discovery revision (current):** Five procedural wooden district signs remain visible. Education is a landscaped green with two school-inspired models: brick/white-tower Amherst and pale, columned Menlo. School facade logos are visible, but floating names in Education, Entrepreneurship, and Hobbies are discovery-only. CapitalBase sits beside Sanfoka in the west entrepreneurship courtyard. The Projects sign sits in the middle of the four exhibits, with the central path diverted around its footprint. Shared district metadata owns position, yaw, width, and style; collision and path-clearance tests cover signs. Breadcrumbs derive from the shared Amherst route rather than duplicated coordinates. The plaza, all 23 destinations, mobile Directory parity, and controls remain intact. No unvisited dimming. This revision supersedes earlier visibility rules below.

The latest hierarchy supersedes earlier always-visible destination signage: arrival shows only the unchanged plaza identity and four unboxed, uppercase district headers (18px, weight 800, tracking .1em). Individual labels remain keyboard-focusable but reveal only on hover, focus, proximity, or selection. Verified logos stand alone in the common cream placard; unbranded destinations show a small title and single-line description. Full copy remains in preview/details and the directory. Clavius and Amherst use readable names because no verified local logo is available.

The campus has 23 destinations, including Amherst College. Ground zones lead navigation; the top-nav Directory provides flat search and expandable content without loading the scene. Existing direct portfolio tabs remain independent. An optional static lit route connects the plaza to Amherst; visits subtly restore building saturation and brightness without unlocking or gating content. Distance reduces building scale by at most 10% and saturation by at most 18%; edge mist and restrained fog soften the boundary. Shared materials are never tinted globally: per-landmark clones are disposed on cleanup. Work-model foundations share a 0.2-unit cream platform treatment, preserving distinct silhouettes. Controls and reduced-motion behavior are unchanged.

### Do:

- Do keep this design guidance scoped to Explore World.
- Do preserve the full destination set in direct navigation, map, and grouped directory.
- Do let distinct landmark shapes carry identity while keeping the initial interface quiet.
- Do keep hobby discoveries small and optional, with one contextual preview at a time.
- Do keep factual copy and links sourced from the existing campus and portfolio data.
- Do preserve visible keyboard focus, readable panel text, and reduced-motion behavior.

### Don't:

- Don't apply the campus palette or geometry to unrelated portfolio sections.
- Don't replace subtle evening warmth with neon, a dark gaming HUD, or sports-broadcast decoration.
- Don't require walking, WebGL, or fine-pointer input to read the work.
- Don't replace distinct landmarks with identical buildings differentiated only by labels.
- Don't invent a company logo or imply an illustrative workflow is a live feed.
