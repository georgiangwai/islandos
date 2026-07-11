"use client";

import { useRef, useState } from "react";

type Pos = { x: number; y: number };
type Size = { width: number; height: number };
type Dir = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const MIN_W = 280;
const MIN_H = 160;

/**
 * Makes an element resizable from any edge or corner.
 * Reads the live box size from `boxRef` at drag-start so it works
 * whether or not the caller has set an explicit size yet.
 */
export function useResizable(
  boxRef: React.RefObject<HTMLElement | null>,
  initial: Size,
  pos: Pos,
  setPos: (p: Pos) => void
) {
  const [size, setSize] = useState<Size>(initial);
  const start = useRef({ x: 0, y: 0, w: 0, h: 0, px: 0, py: 0 });

  const beginResize = (dir: Dir) => (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const rect = boxRef.current?.getBoundingClientRect();
    start.current = {
      x: e.clientX,
      y: e.clientY,
      w: rect?.width ?? size.width,
      h: rect?.height ?? size.height,
      px: pos.x,
      py: pos.y,
    };

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - start.current.x;
      const dy = ev.clientY - start.current.y;
      const { w, h, px, py } = start.current;

      let newW = w;
      let newH = h;
      let newX = px;
      let newY = py;

      if (dir.includes("e")) newW = Math.max(MIN_W, w + dx);
      if (dir.includes("s")) newH = Math.max(MIN_H, h + dy);
      if (dir.includes("w")) {
        newW = Math.max(MIN_W, w - dx);
        newX = px + (w - newW);
      }
      if (dir.includes("n")) {
        newH = Math.max(MIN_H, h - dy);
        newY = py + (h - newH);
      }

      setSize({ width: newW, height: newH });
      if (newX !== px || newY !== py) setPos({ x: newX, y: Math.max(0, newY) });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return { size, beginResize };
}
