type Project = {
  name: string;
  blurb: string;       // one-liner
  detail: string;      // the explanation: what it does, what you learned
  tags: string[];
  live?: string;       // deployed URL
  code?: string;       // GitHub repo
};

const PROJECTS: Project[] = [
  {
    name: "TrackaBull",
    blurb: "A USF Dining Hall Nutrition Tracking App.",
    detail:
      "USF dining halls post menus, but there's no easy way to know what eating there actually does to your macros — Track-A-Bull lets students with meal plans log food from all three dining halls and see their calorie and macro totals update in real time.",
    tags: ["React Native", "Expo", "Typescript", "Supabase"],
    code: "https://github.com/georgiangwai/track-a-bull",
  },
  {
    name: "Clothing Store Website",
    blurb: "A modern e-commerce platform for Geopa Designs.",
    detail:
      "a fast, mobile-friendly catalog website for a small Caribbean clothing business in Trinidad. Customers browse vibrant, tropical-styled product pages showcasing new stock, and order directly through pre-filled WhatsApp messages.",
    tags: ["Javascript", "HTML/CSS", "In-Progress"],
  },
  {
    name: "Nail Tone Assistant",
    blurb: "An app for selecting nail polish colors based on skin tone.",
    detail:
      "Nail Tone Assistant closes the gap between seeing a polish color online and knowing whether it suits you: it estimates a user's skin tone from a photo and recommends complementary shades. Built in Python with Streamlit for the UI, it uses OpenCV HSV filtering and color segmentation for detection and integrates The Color API and Color.pizza REST APIs for color naming and palette generation. It taught me classic computer vision — thoughtful pixel-level filtering can solve problems people assume need a trained model.",
    tags: ["Python", "OpenCV", "Streamlit", "REST APIs"],
    code: "https://github.com/georgiangwai/nail-tone-assistant",
  },
];

export default function Projects() {
  return (
    <div className="win-body">
      {PROJECTS.map((p) => (
        <article key={p.name} className="proj-row">
          <div className="proj-info">
            <h3>{p.name}</h3>
            <p className="proj-blurb">{p.blurb}</p>
            <p className="proj-detail">{p.detail}</p>
            <div className="p-tags">
              {p.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
            <div className="proj-links">
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer">🌐 Live</a>
              )}
              {p.code && (
                <a href={p.code} target="_blank" rel="noopener noreferrer">⌥ Code</a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}