"use client";

import { useEffect, useState } from "react";

function formatNow() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(new Date());
}

export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatNow());
    const id = setInterval(() => setTime(formatNow()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      Amherst, MA{time ? ` · ${time} ET` : ""}
    </span>
  );
}
