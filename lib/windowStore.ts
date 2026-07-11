// lib/windowStore.ts
import { create } from "zustand";

type WinState = {
  openApps: string[];
  zOrder: string[];              // last item = focused window
  open: (id: string) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
};

export const useWindows = create<WinState>((set) => ({
  openApps: [],
  zOrder: [],
  open: (id) => set((s) => ({
    openApps: s.openApps.includes(id) ? s.openApps : [...s.openApps, id],
    zOrder: [...s.zOrder.filter(x => x !== id), id],
  })),
  close: (id) => set((s) => ({
    openApps: s.openApps.filter(x => x !== id),
    zOrder: s.zOrder.filter(x => x !== id),
  })),
  focus: (id) => set((s) => ({
    zOrder: [...s.zOrder.filter(x => x !== id), id],
  })),
}));