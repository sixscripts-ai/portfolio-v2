export const profile = {
  name: "Ashton Aschenbrener",
  role: "Full-stack AI Engineer",
  email: "sixscripts@proton.me",
  github: "https://github.com/sixscripts-ai",
  githubAlt: "https://github.com/sixscriptssoftware",
  linkedin: "https://www.linkedin.com/in/aaschenbrener/",
  resumePath: "/ashton-aschenbrener-resume.pdf",
  location: "California · Remote",
  hero: {
    title: "Ashton Aschenbrener",
    subtitle: "Full-stack AI Engineer",
    pitch:
      "I build retrieval systems, agentic workflows, and production-minded interfaces with Next.js, TypeScript, Python, and Postgres.",
    looking:
      "Looking for early-stage AI / product engineering roles where I can own frontend UI and backend AI orchestration.",
  },
  stack: [
    "Next.js",
    "TypeScript",
    "Python",
    "Postgres",
    "RAG",
    "Agentic workflows",
    "Tailwind",
    "Node.js",
  ],
} as const;

export type Profile = typeof profile;
