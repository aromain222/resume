"use client";

import { useCallback } from "react";
import { useResume } from "../ResumeContext";
import { useTabNavigation } from "../TabNavigationContext";
import type { WorldLocation } from "@/lib/worldConfig";

/** Shared by the desktop canvas and the mobile list — what happens when a
    location is activated. Project/experience locations open a panel; plaza
    nodes either open a panel or fire their action (resume modal, external
    link, tab jump) directly, so nothing important sits behind two clicks. */
export function useLocationAction(setOpenLocation: (location: WorldLocation | null) => void) {
  const { setOpen: setResumeOpen } = useResume();
  const { goTo } = useTabNavigation();

  return useCallback(
    (location: WorldLocation) => {
      if (location.kind === "project" || location.kind === "experience") {
        setOpenLocation(location);
        return;
      }
      const { action } = location;
      if (action.type === "panel") setOpenLocation(location);
      else if (action.type === "resume") setResumeOpen(true);
      else if (action.type === "goto") goTo(action.tab);
      else if (action.type === "external") window.open(action.href, "_blank", "noopener,noreferrer");
    },
    [goTo, setResumeOpen, setOpenLocation]
  );
}
