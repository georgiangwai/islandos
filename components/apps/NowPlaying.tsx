"use client";

import { useEffect, useState } from "react";

type NowPlayingData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string | null;
  url?: string;
  progressMs?: number;
  durationMs?: number;
};

function fmtMs(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  // local progress so the bar moves smoothly between polls
  const [progress, setProgress] = useState(0);

  // poll Spotify every 30s
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setProgress(json.progressMs ?? 0);
        }
      } catch {
        if (!cancelled) setData({ isPlaying: false });
      }
    };

    load();
    const t = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  // tick the progress bar forward once per second between polls
  useEffect(() => {
    if (!data?.isPlaying || !data.durationMs) return;
    const t = setInterval(() => {
      setProgress((p) => Math.min(p + 1000, data.durationMs!));
    }, 1000);
    return () => clearInterval(t);
  }, [data]);

  if (!data) {
    return <div className="now-playing">♪ checking Spotify…</div>;
  }

  if (!data.isPlaying) {
    return (
      <div className="now-playing">♪ not currently listening to music</div>
    );
  }

  const pct = data.durationMs ? (progress / data.durationMs) * 100 : 0;

  return (
    <a
      className="np-card"
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="np-live">
        <span className="np-bars">
          <span />
          <span />
          <span />
        </span>
        NOW PLAYING
      </span>

      {data.albumArt ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="np-art" src={data.albumArt} alt={data.album ?? ""} />
      ) : (
        <span className="np-art np-art-fallback">♪</span>
      )}

      <span className="np-title">{data.title}</span>
      <span className="np-artist">{data.artist}</span>

      <span className="np-progress">
        <span className="np-time">{fmtMs(progress)}</span>
        <span className="np-progress-track">
          <span className="np-progress-fill" style={{ width: `${pct}%` }} />
          <span className="np-progress-dot" style={{ left: `${pct}%` }} />
        </span>
        <span className="np-time">{fmtMs(data.durationMs ?? 0)}</span>
      </span>
    </a>
  );
}