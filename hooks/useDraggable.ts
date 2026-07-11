"use client";

import { useRef, useState } from "react";

/**
 * Makes an element draggable via its handle (the titlebar).
 * Pointer events = one code path for mouse AND touch.
 */
export function useDraggable(initial: { x: number; y: number }) {
  const [pos, setPos] = useState(initial);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    // don't start a drag when clicking the traffic-light buttons
    if ((e.target as HTMLElement).closest("button")) return;

    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };

    const move = (ev: PointerEvent) =>
      setPos({
        x: ev.clientX - offset.current.x,
        y: Math.max(0, ev.clientY - offset.current.y),
      });
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    e.preventDefault();
  };

  return { pos, setPos, onPointerDown };
}