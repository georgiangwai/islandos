import { NextResponse } from "next/server";

// Server-side only — these never reach the browser.
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

async function getAccessToken() {
  // Trade the long-lived refresh token for a short-lived access token
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    cache: "no-store",
  });
  const data = await res.json();
  return data.access_token as string;
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
    );

    // 204 = authenticated fine, but nothing is playing
    if (res.status === 204) {
      return NextResponse.json({ isPlaying: false });
    }
    if (!res.ok) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await res.json();
    if (!song?.item) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((a: any) => a.name).join(", "),
      album: song.item.album.name,
      albumArt: song.item.album.images?.[1]?.url ?? song.item.album.images?.[0]?.url ?? null,
      url: song.item.external_urls.spotify,
      progressMs: song.progress_ms,
      durationMs: song.item.duration_ms,
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}