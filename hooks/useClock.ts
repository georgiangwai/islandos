"use client";

import { useEffect, useState } from "react";

/**
 * Live clock. Starts as null on purpose: the server can't know the
 * visitor's local time, so rendering it during SSR would cause a
 * hydration mismatch. We render nothing until the first client tick.
 */
export function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function fmtTime(d: Date) {
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return { short: `${h}:${m}`, long: `${h}:${m} ${ap}` };
}

export function fmtDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}