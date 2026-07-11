"use client";

import { useEffect, useState } from "react";

// alternate sides as you scroll: "right", "left", "right"...
const SECTIONS = [
  {
    text: (
      <>
        I&apos;ve loved <b>building things </b> for as long as I can remember. Taking stuff apart, figuring out how it works, putting it back
        together better. These days that means code. I&apos;m originallyfrom{" "}
        <b>Trinidad &amp; Tobago</b> 🇹🇹, and a lot of who I am comes from
        home. 
      </>
    ),
    img: "/photos/one.jpg",
    side: "right",
  },
  {
    text: (
      <>
        I just graduated from <b>University of South Florida</b> with a bachelor of Science in <b>Computer Science</b> and a minor in <b>Astronomy</b>. 
        My goal is to become a <b>Software Engineer</b> and continue to build things that people need and learn as much as possible.
      </>
    ),
    img: "/photos/two.jpg",
    side: "left",
  },
  {
    text: (
      <>
        Outside of code: I love exploring new places,learning about space, meeting new people and trying new hobbies! 
        My main ones are going to the gym, running, reading and playing the guitar.  
      </>
    ),
    img: "/photos/three.jpg",
    side: "right",
  },
  {
    text: (
      <>
        Overall, I love the process of getting better at things and learning new skills. 
        I&apos;m always looking for ways to improve myself and the world around me.
      </>
    ),
    img: "/photos/four.jpg",
    side: "left",
  },
];

const TAGS = [
  "CS Graduate",
  "Trinidad & Tobago",
  "React / Next.js",
  "Music",
  "Gym",
];

const ROLES = [
    "Software Engineer",
    "CS Graduate from USF",
    "Space Enthusiast",

];

export default function About() {
  // typewriter for the role line — same trick as the terminal boot
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    const role = ROLES[roleIdx];
    if (typed < role.length) {
      const t = setTimeout(() => setTyped((c) => c + 1), 65);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setRoleIdx((i) => (i + 1) % ROLES.length);
      setTyped(0);
    }, 1800);
    return () => clearTimeout(t);
  }, [typed, roleIdx]);

  return (
    <div className="win-body about-body">
      <header className="about-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="about-avatar" src="/Grad.jpg" alt="Georgia" />
        <div>
          <h1>Georgia</h1>
          <p className="about-role">
            {ROLES[roleIdx].slice(0, typed)}
            <span className="about-caret">|</span>
          </p>
        </div>
      </header>

      {SECTIONS.map((s, i) => (
        <section key={i} className={`about-block ${s.side}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="about-pic" src={s.img} alt="" loading="lazy" />
          <p>{s.text}</p>
        </section>
      ))}

      <div className="about-tags">
        {TAGS.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}