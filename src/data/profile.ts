export const profile = {
  name: "Ashton Aschenbrener",
  role: "Full-stack AI Engineer",
  email: "sixscripts@proton.me",
  github: "https://github.com/sixscripts-ai",
  linkedin: "https://www.linkedin.com/in/aaschenbrener/",
  resumePath: "/ashton-aschenbrener-resume.pdf",
  location: "California · Remote",
  hero: {
    title: "Ashton Aschenbrener",
    subtitle: "Full-stack AI Engineer",
    pitch:
      "I design and ship production retrieval systems, agentic workflows, and end-to-end features using Next.js, TypeScript, Python, and Postgres.",
    looking:
      "Currently open to early-stage roles where I can own features end-to-end — from UI to AI orchestration.",
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
