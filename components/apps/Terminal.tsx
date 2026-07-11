"use client";

import { useEffect, useRef, useState } from "react";
import { useWindows } from "@/lib/windowStore";

type Line = { cls: string; text: string; prompt?: boolean };

const BOOT: Line[] = [
  { cls: "t-cmd", text: "./about.sh", prompt: true },
  { cls: "t-out", text: "" },
  { cls: "t-accent", text: "  Hi, I'm Georgia!" },
  { cls: "t-out", text: "  Aspiring Software Engineer, originally from Trinidad & Tobago, living in the US." },
  { cls: "t-out", text: "  I love building things, music," },
  { cls: "t-out", text: "  working out, and coffee." },
  { cls: "t-out", text: "" },
  { cls: "t-out", text: "  Type `help` to see commands." },
  { cls: "t-out", text: "" },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  // typed = how many characters of BOOT[0] are visible so far
  const [typed, setTyped] = useState(0);
  const [booted, setBooted] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const open = useWindows((s) => s.open);

  /* ── Typewriter boot ─────────────────────────────────────────
     Phase 1: reveal BOOT[0] one character at a time (setInterval).
     Phase 2: once it's fully typed, reveal the remaining lines one
     at a time (chained setTimeout via the same interval).
     The cleanup function stops the timer if the component unmounts
     mid-animation — that's the part beginners forget.            */
  useEffect(() => {
    const first = BOOT[0].text;
    let i = 0;
    let lineIdx = 1;

    const iv = setInterval(() => {
      if (i < first.length) {
        i++;
        setTyped(i); // phase 1: typing the command
      } else if (lineIdx < BOOT.length) {
        const next = BOOT[lineIdx++]; // phase 2: printing output
        setLines((ls) => [...ls, next]);
      } else {
        clearInterval(iv);
        setBooted(true);
        inputRef.current?.focus();
      }
    }, 45);

    return () => clearInterval(iv); // cleanup!
  }, []);

  // keep scrolled to the bottom as lines are added
  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  }, [lines]);

  const COMMANDS: Record<string, () => string[]> = {
    help: () => [
      "  help      — this list",
      "  whoami    — who am I",
      "  about     — open About",
      "  projects  — open Projects",
      "  spotify   — open Spotify",
      "  contact   — open Mail",
      "  clear     — clear screen",
    ],
    whoami: () => ["  Aspiring Software Engineer/ Web Developer. Coffee Addict. Taylor Swift Fan."],
    about: () => {
      open("aboutme");
      return ["  Opening About…"];
    },
    projects: () => {
      open("proj");
      return ["  Opening Projects…"];
    },
    spotify: () => {
      open("music");
      return ["  Opening Music… "];
    },
    contact: () => {
      open("mail");
      return ["  Opening Mail…"];
    },
  };

  const run = () => {
    const v = value.trim();
    setValue("");
    if (!v) return;

    if (v.toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    const fn = COMMANDS[v.toLowerCase()];
    const echo: Line = { cls: "t-cmd", text: v, prompt: true };
    const out: Line[] = (
      fn ? fn() : [`  zsh: command not found: ${v} — try \`help\``]
    ).map((t) => ({ cls: "t-out", text: t }));

    setLines((ls) => [...ls, echo, ...out]);
  };

  return (
    <div
      ref={bodyRef}
      className="win-body"
      id="terminal"
      onClick={() => inputRef.current?.focus()}
    >
      <div>
        {/* the boot command, revealed character by character */}
        <div className="t-line">
          <span className="t-prompt">georgia@islandos ~ % </span>
          <span className="t-cmd">{BOOT[0].text.slice(0, typed)}</span>
        </div>

        {/* everything else: boot output + your session */}
        {lines.map((l, i) => (
          <div className={`t-line ${l.prompt ? "" : l.cls}`} key={i}>
            {l.prompt && <span className="t-prompt">georgia@islandos ~ % </span>}
            {l.prompt ? <span className={l.cls}>{l.text}</span> : l.text}
          </div>
        ))}
      </div>

      {/* input row only appears after boot finishes */}
      {booted && (
        <div id="t-input-row">
          <span className="t-prompt">georgia@islandos&nbsp;~&nbsp;%&nbsp;</span>
          <input
            ref={inputRef}
            id="t-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      )}
    </div>
  );
}