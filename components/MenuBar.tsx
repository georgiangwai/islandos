"use client";

import { useWindows } from "@/lib/windowStore";
import { useClock, fmtTime } from "@/hooks/useClock";

export default function MenuBar() {
  const open = useWindows((s) => s.open);
  const now = useClock();

  return (
    <nav id="menubar">
      <span className="logo">🌴</span>
      <span className="app-name">IslandOS</span>
      <span className="item hide-m" onClick={() => open("about")}>
        Terminal
      </span>
      <span className="item hide-m" onClick={() => open("aboutme")}>
        About
      </span>
      <span className="item hide-m" onClick={() => open("proj")}>
        Projects
      </span>
      <span className="item hide-m" onClick={() => open("music")}>
        Spotify
      </span>
      <span className="item hide-m" onClick={() => open("mail")}>
        Contact
      </span>
      <span className="spacer" />
      <span className="item">🇹🇹</span>
      <span id="bar-clock">{now ? fmtTime(now).long : ""}</span>
    </nav>
  );
}