"use client";

import { useState } from "react";

const ME = { name: "Georgia", email: "georgiangwai@gmail.com" };

export default function Mail() {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  const send = () => {
    // Level 1: opens the visitor's mail app with everything pre-filled
    const url =
      `mailto:${ME.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body + (from ? `\n\nFrom: ${from}` : ""))}`;
    window.location.href = url;

    // Level 2 (replace the two lines above once you have a Formspree ID):
    // await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: from, subject, message: body }),
    // });

    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="mail-app">
      <div className="mail-toolbar">
        <button className="mail-send" onClick={send}>
          ➤ {sent ? "Opening…" : "Send"}
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