export type ResumeBullet = string;

export type ResumeRole = {
  org: string;
  title: string;
  period: string;
  location?: string;
  bullets: ResumeBullet[];
};

export const summary =
  "Full-stack AI engineer focused on evidence-first AI systems: agent workflows, retrieval infrastructure, eval harnesses, and product interfaces with Next.js, TypeScript, Python, and Postgres.";

export const projectsBullets: ResumeBullet[] = [
  "Built Agent Skill Registry, a portable SKILL.md registry, builder, console, and runtime for versioned agent capabilities with trust-tier governance, multi-provider routing, and a Librarian AI workflow.",
  "Built EvalBench, an AI evaluation dashboard for provider comparisons, custom assertions, regression detection, and evidence-backed model outputs using React, Express, Prisma, Neon Postgres, Gemini, Groq, and OpenRouter.",
  "Built GhostSSH, an agentic job-search workflow that extracts candidate evidence from GitHub, LinkedIn, and portfolio data, then ranks roles through structured matching logic and missing-evidence checks.",
  "Designed ICT Knowledge Engine, an ontology-backed retrieval system that connects financial concepts, semantic search, graph-based exploration, and source-cited answers.",
  "Built SignalForge, a data import and validation platform with CSV/JSON upload, Zod schema validation, deduplication, audit trails, RBAC-ready data modeling, and quality analytics.",
];

export const experience: ResumeRole[] = [
  {
    org: "Independent / Six Scripts Software",
    title: "Founder & Engineer",
    period: "2024 - Present",
    bullets: [
      "Ship full-stack AI products end-to-end: product direction, UI, backend, data model, AI workflow, verification, and deployment.",
      "Designed retrieval and agent systems with explicit failure handling, traceable outputs, source grounding, and eval harnesses.",
      "Deployed production-facing projects on Vercel with Postgres-backed data layers, provider API integrations, Prisma/Drizzle schemas, and environment configuration.",
    ],
  },
  {
    org: "MiraCosta College",
    title: "AI Engineering Student",
    period: "2024 - Present",
    bullets: [
      "Coursework focused on AI systems, data structures, and applied software engineering.",
      "Independent projects on retrieval, agents, ontology-backed knowledge engines, and evaluation infrastructure.",
    ],
  },
];

export const skillsGroups: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["TypeScript", "Python", "SQL", "JavaScript"] },
  { label: "Frontend", items: ["Next.js", "React", "Tailwind", "Framer Motion", "shadcn-style UI"] },
  { label: "Backend & Data", items: ["Node.js", "Express", "Postgres", "Neon", "Prisma", "Drizzle", "Zod", "route handlers", "server actions"] },
  { label: "AI", items: ["RAG", "agentic workflows", "tool orchestration", "evals", "provider comparisons", "hybrid retrieval", "knowledge graphs"] },
  { label: "Infra", items: ["Vercel", "GitHub Actions", "Docker basics", "Neon Postgres", "Clerk", "Vitest"] },
];
