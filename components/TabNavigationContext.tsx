"use client";

/**
 * Lets nested content (the world layer, Hero CTAs) switch tabs without every
 * Panel component threading a `navigate` prop through. Mirrors the existing
 * ResumeContext pattern. Provided once by SiteTabs, which owns the real
 * `active` state and hash-sync logic — this context just exposes it.
 */

import { createContext, useContext } from "react";
import type { TabId } from "./SiteTabs";

type TabNavigationContextType = {
  active: TabId;
  goTo: (id: TabId) => void;
};

const TabNavigationContext = createContext<TabNavigationContextType>({
  active: "home",
  goTo: () => {},
});

export function TabNavigationProvider({
  active,
  goTo,
  children,
}: {
  active: TabId;
  goTo: (id: TabId) => void;
  children: React.ReactNode;
}) {
  return (
    <TabNavigationContext.Provider value={{ active, goTo }}>
      {children}
    </TabNavigationContext.Provider>
  );
}

export function useTabNavigation() {
  return useContext(TabNavigationContext);
}
