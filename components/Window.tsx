"use client";

import { useRef, useState } from "react";
import type { AppDef } from "@/lib/apps";
import { useWindows } from "@/lib/windowStore";
import { useDraggable } from "@/hooks/useDraggable";
import { useResizable } from "@/hooks/useResizable";

const HANDLES = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const;

export default function Window({ app }: { app: AppDef }) {
  const openApps = useWindows((s) => s.openApps);
  const zOrder = useWindows((s) => s.zOrder);
  const close = useWindows((s) => s.close);
  const focus = useWindows((s) => s.focus);
  const { pos, setPos, onPointerDown } = useDraggable(app.initial);
  const [maximized, setMaximized] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { size, beginResize } = useResizable(
    sectionRef,
    { width: app.width, height: app.height ?? 400 },
    pos,
    setPos
  );

  if (!openApps.includes(app.id)) return null;

  const Body = app.component;

  return (
    <section
      ref={sectionRef}
      className={`window open ${maximized ? "maximized" : ""}`}
      style={
        maximized
          ? { zIndex: 100 + zOrder.indexOf(app.id) }
          : {
              left: pos.x,
              top: pos.y,
              width: size.width,
              height: size.height,
              zIndex: 100 + zOrder.indexOf(app.id),
            }
      }
      onPointerDown={() => focus(app.id)}
    >
      <div
        className="titlebar"
        onPointerDown={maximized ? undefined : onPointerDown}
        onDoubleClick={() => setMaximized((m) => !m)}
      >
        <div className="lights">
          <button
            className="light close"
            aria-label={`Close ${app.dockLabel}`}
            onClick={() => close(app.id)}
          />
          <button className="light min" aria-hidden="true" tabIndex={-1} />
          <button
            className="light max"
            aria-label={maximized ? `Restore ${app.dockLabel}` : `Expand ${app.dockLabel}`}
            onClick={() => setMaximized((m) => !m)}
          />
        </div>
        <span className="title">{app.title}</span>
      </div>
      <Body />

      {!maximized &&
        HANDLES.map((dir) => (
          <div
            key={dir}
            className={`resize-handle ${dir}`}
            onPointerDown={beginResize(dir)}
          />
        ))}
    </section>
  );
}