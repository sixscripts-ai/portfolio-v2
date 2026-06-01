export type ResumeBullet = string;

export type ResumeRole = {
  org: string;
  title: string;
  period: string;
  location?: string;
  bullets: ResumeBullet[];
};

export const summary =
  "Full-stack AI engineer focused on retrieval systems, agentic workflows, and product interfaces with Next.js, TypeScript, Python, and Postgres. Looking for early-stage product engineering roles where I can own frontend surfaces, backend workflows, and AI evaluation systems.";

export const projectsBullets: ResumeBullet[] = [
  "Built EvalBench, an AI evaluation dashboard for provider comparisons, custom assertions, regression detection, and evidence-backed model outputs using React, Express, Prisma, Neon Postgres, Gemini, Groq, and OpenRouter.",
  "Built Webhook Replay Lab, a backend reliability tool for webhook ingestion, replay attempts, retry/backoff behavior, dead-letter handling, signature verification, deduplication, and audit logs.",
  "Built GhostSSH, an agentic job-search workflow that extracts candidate evidence from GitHub, LinkedIn, and portfolio data, then ranks roles through structured matching logic.",
  "Designed ICT Knowledge Engine, an ontology-backed retrieval system that connects financial concepts, semantic search, and graph-based exploration.",
  "Built Campus Compass, a campus information assistant with semantic course search, source-aware retrieval, and prerequisite graph navigation.",
];

export const experience: ResumeRole[] = [
  {
    org: "Independent / Six Scripts Software",
    title: "Founder & Engineer",
    period: "2024 — Present",
    bullets: [
      "Ship full-stack AI products end-to-end: product direction, UI, backend, data model, AI workflow, and verification.",
      "Designed retrieval and agent systems with explicit failure handling and eval harnesses.",
      "Deployed full-stack projects on Vercel with Postgres-backed data layers, provider API integrations, and production environment configuration.",
    ],
  },
  {
    org: "MiraCosta College",
    title: "AI Engineering Student",
    period: "2024 — Present",
    bullets: [
      "Coursework focused on AI systems, data structures, and applied software engineering.",
      "Independent projects on retrieval, agents, and ontology-backed knowledge engines.",
    ],
  },
];

export const skillsGroups: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["TypeScript", "Python", "SQL", "JavaScript"] },
  { label: "Frontend", items: ["Next.js", "React", "Tailwind", "Framer Motion"] },
  { label: "Backend & Data", items: ["Node.js", "Express", "Postgres", "Neon", "Prisma", "Route handlers", "Server actions"] },
  { label: "AI", items: ["RAG", "Agentic workflows", "Tool orchestration", "Evals", "Provider comparisons", "Knowledge graphs"] },
  { label: "Infra", items: ["Vercel", "GitHub Actions", "Docker basics", "Neon Postgres"] },
];
