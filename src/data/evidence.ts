export type EvidenceCategory = {
  area: "Frontend" | "Backend" | "AI systems" | "Data" | "Operations";
  items: string[];
};

export const evidence: EvidenceCategory[] = [
  {
    area: "Frontend",
    items: [
      "Next.js app routing (App Router, server actions, route handlers)",
      "Responsive UI with Tailwind and accessible primitives",
      "Project dashboards with loading, empty, and error states",
      "Animated transitions with Framer Motion (intentional, not decorative)",
    ],
  },
  {
    area: "Backend",
    items: [
      "API routes and server actions",
      "Postgres schemas with foreign keys and event tables",
      "Server-side validation (zod-style) at every boundary",
      "Webhook intake with signature verification + replay",
    ],
  },
  {
    area: "AI systems",
    items: [
      "RAG pipelines (semantic + graph hybrid)",
      "Agent workflows with plan → tool → verify loops",
      "Tool orchestration with structured output schemas",
      "Eval harnesses with pass / partial / fail bookkeeping",
    ],
  },
  {
    area: "Data",
    items: [
      "Knowledge graphs and ontology design",
      "Vector + relational hybrid stores",
      "Per-step retrieval traces",
      "Structured evidence logs per match",
    ],
  },
  {
    area: "Operations",
    items: [
      "Verification commands documented per project",
      "Failure handling per pipeline stage",
      "Deployment notes (Vercel, env, build)",
      "Logging and audit records preserved across actions",
    ],
  },
];
