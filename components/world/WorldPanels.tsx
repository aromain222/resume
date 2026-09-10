"use client";

import type { WorldLocation } from "@/lib/worldConfig";
import ProjectPanel from "./ProjectPanel";
import ExperiencePanel from "./ExperiencePanel";
import PlazaPanel from "./PlazaPanel";

/** Renders whichever panel matches the currently open location — shared by
    the desktop canvas and the mobile list so panel content is defined once. */
export default function WorldPanels({
  location,
  onClose,
}: {
  location: WorldLocation | null;
  onClose: () => void;
}) {
  if (!location) return null;
  if (location.kind === "project") return <ProjectPanel project={location.project} onClose={onClose} />;
  if (location.kind === "experience") return <ExperiencePanel stop={location.stop} onClose={onClose} />;
  if (location.kind === "plaza-node" && location.action.type === "panel") {
    return <PlazaPanel onClose={onClose} />;
  }
  return null;
}
