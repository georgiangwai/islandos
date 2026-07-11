"use client";

import { useState } from "react";

const ME = { name: "Georgia", email: "georgiangwai@gmail.com" };

const FORMSPREE_ID = "mojgajrj";

const TEMPLATES = [
  {
    label: "💼 I have a role for you",
    subject: "Role opportunity — let's talk",
    body: "Hi Georgia! I came across your portfolio and think you'd be a great fit for a role at ___. Here's the posting: ___. Would love to set up a chat!",
  },
  {
    label: "🤝 Let's collaborate",
    subject: "Collab idea",
    body: "Hey Georgia! I'm working on ___ and think we could build something cool together. Interested?",
  },
  {
    label: "👋 Just saying hi",
    subject: "Loved the portfolio",
    body: "Hi Georgia — clicked around IslandOS and had to say: ___ was my favorite part. Keep building!",
  },
  {
    label: "☕ Coffee chat",
    subject: "Quick chat?",
    body: "Hey Georgia! I'd love to pick your brain about ___ — got 15 minutes sometime this week?",
  },
];

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
      <div className="mail-templates">
        <span className="mail-templates-hint">Not sure what to say? Start with one:</span>
        {TEMPLATES.map((t) => (
          <button
            key={t.label}
            className="mail-template-chip"
            onClick={() => {
              setSubject(t.subject);
              setBody(t.body);
            }}
          >
            {t.label}
          </button>
        ))}
        <a
          className="mail-template-chip"
          href="https://linkedin.com/in/georgia-ngwai"
          target="_blank"
          rel="noopener noreferrer"
        >
          in&nbsp;LinkedIn
        </a>
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