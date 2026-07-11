"use client";

import { useEffect } from "react";
import { useClock, fmtTime, fmtDate } from "@/hooks/useClock";

export default function LockScreen({
  gone,
  onUnlock,
}: {
  gone: boolean;
  onUnlock: () => void;
}) {
  const now = useClock();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") onUnlock();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onUnlock]);

  return (
    <div id="lock" className={gone ? "gone" : ""} onClick={onUnlock}>
      <div className="clock">{now ? fmtTime(now).short : "\u00A0"}</div>
      <div className="date">{now ? fmtDate(now) : "\u00A0"}</div>
      <div className="avatar">
        <img src="/grad.jpg" alt="Georgia" />
      </div>
      <div className="name">Georgia Ng Wai</div>
      <div className="hint">Click or press Enter to unlock</div>
    </div>
  );
}