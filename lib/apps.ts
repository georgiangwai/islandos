import type { ComponentType } from "react";
import Terminal from "@/components/apps/Terminal";
import About from "@/components/apps/About";
import Projects from "@/components/apps/Projects";
import Music from "@/components/apps/Music";
import Mail from "@/components/apps/Mail";

export type AppDef = {
  id: string;            // unique key — the store, terminal commands, and menu bar all use this
  title: string;         // text in the window's titlebar
  dockLabel: string;     // hover tooltip in the dock
  icon: string;          // path to the icon image, e.g. "/icons/Mail.png"
  iconClass: string;     // CSS class for the icon's gradient background
  component: ComponentType; // which app component the window renders
  initial: { x: number; y: number }; // starting window position
  width: number;
  height?: number;       // optional — omit to let content set the height
};

// Add a new app = add one entry here + one component file. That's it.
export const APPS: AppDef[] = [
  {
    id: "about",
    title: "georgiangwai — zsh — about.sh",
    dockLabel: "Terminal",
    icon: "/icons/Terminal.png",
    iconClass: "ic-about",
    component: Terminal,
    initial: { x: 60, y: 50 },
    width: 560,
    height: 400,
  },
  {
    id: "aboutme",
    title: "About Georgia",
    dockLabel: "About",
    icon: "/icons/about.png",
    iconClass: "ic-aboutme",
    component: About,
    initial: { x: 120, y: 70 },
    width: 480,
    height: 520,
  },
  {
    id: "proj",
    title: "Projects",
    dockLabel: "Projects",
    icon: "/icons/projects.png",
    iconClass: "ic-proj",
    component: Projects,
    initial: { x: 300, y: 90 },
    width: 620,
    height: 460,
  },
  {
    id: "music",
    title: "Music",
    dockLabel: "Spotify",
    icon: "/icons/Spotify.png",
    iconClass: "ic-music",
    component: Music,
    initial: { x: 150, y: 140 },
    width: 480,
    height: 460,
  },
  {
    id: "mail",
    title: "New Message — Mail",
    dockLabel: "Contact",
    icon: "/icons/Mail.png",
    iconClass: "ic-mail",
    component: Mail,
    initial: { x: 260, y: 180 },
    width: 520,
    height: 500,
  },
];