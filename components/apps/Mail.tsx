"use client";

import { useState } from "react";

const ME = { name: "Georgia", email: "georgiangwai@gmail.com" };

// Get this from formspree.io: create a form pointed at your email,
// then paste its ID here (the part after /f/ in the endpoint URL).
const FORMSPREE_ID = "mojgajrj";

type Status = "idle" | "sending" | "sent" | "error";

export default function Mail() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const send = async () => {
    if (!FORMSPREE_ID) {
      // Fallback: opens the visitor's mail app with everything pre-filled
      const url =
        `mailto:${ME.email}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body + (from ? `\n\nFrom: ${from}` : ""))}`;
      window.location.href = url;
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: from, subject, message: body }),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus("sent");
      setFrom("");
      setSubject("");
      setBody("");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2500);
  };

  const sendLabel = {
    idle: "Send",
    sending: "Sending…",
    sent: FORMSPREE_ID ? "Sent ✓" : "Opening…",
    error: "Failed — try again",
  }[status];

  return (
    <div className="mail-app">
      <div className="mail-toolbar">
        <button className="mail-send" onClick={send} disabled={status === "sending"}>
          ➤ {sendLabel}
        </button>
        <span className="mail-newmsg">New Message</span>
      </div>

      <div className="mail-field">
        <label>To:</label>
        <span className="mail-to">
          {ME.name} <em>&lt;{ME.email}&gt;</em>
        </span>
      </div>

      <div className="mail-field">
        <label htmlFor="m-from">From:</label>
        <input
          id="m-from"
          type="email"
          placeholder="youremail@example.com"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>

      <div className="mail-field">
        <label htmlFor="m-subj">Subject:</label>
        <input
          id="m-subj"
          value={subject}
          placeholder= "Let's Connect!"
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <textarea
        className="mail-body"
        placeholder="Write your message…"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="mail-footer">
        <a href={`mailto:${ME.email}`} className="mail-chip">✉ {ME.email}</a>
        <a href="https://github.com/georgiangwai" target="_blank" rel="noopener noreferrer" className="mail-chip">
          ⌘ github.com/georgiangwai
        </a>
      </div>
    </div>
  );
}