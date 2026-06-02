export type EvidenceCategory = {
  area: "Frontend" | "Backend" | "AI systems" | "Data" | "Operations";
  tagline: string;
  items: string[];
};

export const evidence: EvidenceCategory[] = [
  {
    area: "Frontend",
    tagline: "App routing, responsive UI, accessible components",
    items: [
      "Next.js app routing (App Router, server actions, route handlers)",
      "Responsive UI with Tailwind and accessible primitives",
      "Project dashboards with loading, empty, and error states",
      "Animated transitions with Framer Motion (intentional, not decorative)",
    ],
  },
  {
    area: "Backend",
    tagline: "API routes, Postgres schemas, validation at every boundary",
    items: [
      "API routes and server actions",
      "Postgres schemas with foreign keys and event tables",
      "Server-side validation (zod-style) at every boundary",
      "Webhook intake with signature verification + replay",
    ],
  },
  {
    area: "AI systems",
    tagline: "RAG pipelines, agent loops, structured output schemas",
    items: [
      "RAG pipelines (semantic + graph hybrid)",
      "Agent workflows with plan → tool → verify loops",
      "Tool orchestration with structured output schemas",
      "Eval harnesses with pass / partial / fail bookkeeping",
    ],
  },
  {
    area: "Data",
    tagline: "Knowledge graphs, vector stores, structured evidence logs",
    items: [
      "Knowledge graphs and ontology design",
      "Vector + relational hybrid stores",
      "Per-step retrieval traces",
      "Structured evidence logs per match",
    ],
  },
  {
    area: "Operations",
    tagline: "Verification commands, failure handling, deployment notes",
    items: [
      "Verification commands documented per project",
      "Failure handling per pipeline stage",
      "Deployment notes (Vercel, env, build)",
      "Logging and audit records preserved across actions",
    ],
  },
];
