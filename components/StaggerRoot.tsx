"use client";

import { useEffect, useState } from "react";

export default function StaggerRoot({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return <div className={ready ? "stagger-ready" : undefined}>{children}</div>;
}
