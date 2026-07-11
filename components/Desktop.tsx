"use client";

import { useState } from "react";
import LockScreen from "./LockScreen";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import { APPS } from "@/lib/apps";
import { useWindows } from "@/lib/windowStore";

export default function Desktop() {
  const [unlocked, setUnlocked] = useState(false);
  const open = useWindows((s) => s.open);

  const unlock = () => {
    if (unlocked) return;
    setUnlocked(true);
    // let the lock screen fade before the first window pops in
    setTimeout(() => open("about"), 700);
  };

  return (
    <div className={`os ${unlocked ? "unlocked" : ""}`}>
      <LockScreen gone={unlocked} onUnlock={unlock} />
      <MenuBar />
      <main id="desktop">
        <div className="desk-hint">
          <b>Welcome to IslandOS.</b>
          <br />
          Open apps from the dock below. Windows drag like the real thing. 🎧
        </div>
        {APPS.map((a) => (
          <Window key={a.id} app={a} />
        ))}
      </main>
      <Dock />
    </div>
  );
}