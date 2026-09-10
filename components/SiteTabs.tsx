"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "./Navbar";
import Hero from "./Hero";
import WhatImBuilding from "./WhatImBuilding";
import Experience from "./Experience";
import About from "./About";
import Ideas from "./Ideas";
import Contact from "./Contact";
import WorldView from "./world/WorldView";
import CampusDirectory from "./world/CampusDirectory";
import { TabNavigationProvider } from "./TabNavigationContext";

const ease = [0.16, 1, 0.3, 1] as const;

export const TABS = [
  { id: "home", label: "Home", Panel: Hero },
  { id: "world", label: "Explore World", Panel: WorldView },
  { id: "directory", label: "Directory", Panel: CampusDirectory },
  { id: "work", label: "Work", Panel: WhatImBuilding },
  { id: "path", label: "Path", Panel: Experience },
  { id: "about", label: "About", Panel: About },
  { id: "writing", label: "Writing", Panel: Ideas },
  { id: "contact", label: "Contact", Panel: Contact },
] as const;

export type TabId = (typeof TABS)[number]["id"];

const isTabId = (value: string): value is TabId =>
  TABS.some((tab) => tab.id === value);

export default function SiteTabs() {
  const [active, setActive] = useState<TabId>("home");
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* The hash keeps deep links, the back button, and old #work anchors working. */
  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (isTabId(hash)) setActive(hash);
      else if (hash === "") setActive("home");
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = useCallback((id: TabId, { focus = false } = {}) => {
    setActive(id);
    if (typeof window !== "undefined") {
      const next = id === "home" ? " " : `#${id}`;
      window.history.replaceState(null, "", id === "home" ? window.location.pathname : next);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    if (focus) tabRefs.current[id]?.focus();
  }, []);

  /* Arrow keys walk the tablist, as a real tab widget should. */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = TABS.findIndex((tab) => tab.id === active);
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const next = TABS[(index + delta + TABS.length) % TABS.length];
      select(next.id, { focus: true });
    }
    if (event.key === "Home") {
      event.preventDefault();
      select(TABS[0].id, { focus: true });
    }
    if (event.key === "End") {
      event.preventDefault();
      select(TABS[TABS.length - 1].id, { focus: true });
    }
  };

  const ActivePanel = TABS.find((tab) => tab.id === active)!.Panel;

  return (
    <TabNavigationProvider active={active} goTo={select}>
      <Navbar
        active={active}
        onSelect={select}
        onKeyDown={onKeyDown}
        tabRefs={tabRefs}
      />

      <motion.div
        key={active}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.2, ease }}
        id={`panel-${active}`}
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        tabIndex={-1}
        className={active === "home" ? "" : "pt-24 sm:pt-28"}
      >
        <ActivePanel />
      </motion.div>
    </TabNavigationProvider>
  );
}
