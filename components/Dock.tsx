"use client";

import { APPS } from "@/lib/apps";
import { useWindows } from "@/lib/windowStore";

export default function Dock() {
  const openApps = useWindows((s) => s.openApps);
  const open = useWindows((s) => s.open);

  return (
    <div id="dock">
      {APPS.map((a) => (
        <button
          key={a.id}
          className={`dock-app ${openApps.includes(a.id) ? "open" : ""}`}
          onClick={() => open(a.id)}
        >
          <span className="label">{a.dockLabel}</span>
          <span className={`icon ${a.iconClass}`}>
            {a.icon.startsWith("/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.icon} alt={a.dockLabel} />
            ) : (
              a.icon
            )}
          </span>
          <span className="dot" />
        </button>
      ))}
    </div>
  );
}