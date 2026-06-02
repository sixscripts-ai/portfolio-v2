export type ProjectLink = {
  label: "GitHub" | "Live demo" | "Case notes" | "Architecture" | "Evaluation" | "Screenshots";
  href: string;
};

export type DataModelEntity = {
  name: string;
  fields: string[];
};

export type EvalCase = {
  name: string;
  input: string;
  expected: string;
  actual: string;
  status: "pass" | "partial" | "fail";
  notes?: string;
};

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  description: string;
  built: string[];
  owned: string[];
  stack: string[];
  tags: string[];
  status: "shipped" | "active" | "concept";
  accent: "volt" | "cyan" | "magenta" | "amber";
  links: ProjectLink[];
  problem?: string;
  architecture?: { nodes: { id: string; label: string; lane: 0 | 1 | 2 }[]; edges: { from: string; to: string; label?: string }[] };
  agentWorkflow?: string[];
  dataModel?: DataModelEntity[];
  failureHandling?: { case: string; behavior: string }[];
  verification?: string[];
  evals?: EvalCase[];
  screenshots?: { src: string; alt: string }[];
  nextImprovements?: string[];
};

export const projects: Project[] = [
  {
    slug: "ghostssh",
    name: "GhostSSH",
    oneLiner:
      "Agentic job application system that scrapes candidate profiles, normalizes unstructured data, and scores role fit through traceable, evidence-based reasoning.",
    description:
      "GhostSSH ingests candidate evidence from GitHub, LinkedIn, and portfolio data, normalizes it into a structured candidate profile, then ranks roles through an evidence-first matching workflow. The agent loop reasons in steps, cites the evidence behind each match, and surfaces missing-evidence gaps recruiters care about.",
    built: [
      "Profile extraction pipeline",
      "Role matching workflow",
      "Multi-step agent loop",
      "Evidence-based scoring",
    ],
    owned: [
      "Product direction",
      "Frontend UI",
      "Backend architecture",
      "Data model",
      "AI workflow design",
      "Verification strategy",
    ],
    stack: ["Next.js", "TypeScript", "Python", "Postgres", "LLM orchestration", "GitHub/LinkedIn data"],
    tags: ["agentic", "rag", "fullstack"],
    status: "active",
    accent: "volt",
    links: [
      { label: "Live demo", href: "https://dashboard-tau-three-30.vercel.app/" },
      { label: "GitHub", href: "https://github.com/sixscripts-ai/ghostssh" },
      { label: "Architecture", href: "/projects/ghostssh#architecture" },
      { label: "Case notes", href: "/projects/ghostssh#case" },
      { label: "Evaluation", href: "/projects/ghostssh#evals" },
    ],
    problem:
      "Candidate evidence is scattered across GitHub, LinkedIn, and personal sites. Job-matching tools rank on keywords, not evidence. GhostSSH closes the gap by extracting structured evidence, normalizing it, and matching roles with explicit reasoning and missing-evidence callouts.",
    architecture: {
      nodes: [
        { id: "ui", label: "Next.js UI", lane: 0 },
        { id: "api", label: "API / Server actions", lane: 0 },
        { id: "extract", label: "Extraction pipeline\n(GitHub / LinkedIn / portfolio)", lane: 1 },
        { id: "norm", label: "Profile normalizer", lane: 1 },
        { id: "pg", label: "Postgres\n(profiles, roles, events)", lane: 1 },
        { id: "agent", label: "Agent loop\n(reason → tool → verify)", lane: 2 },
        { id: "match", label: "Role matcher\n+ evidence scorer", lane: 2 },
        { id: "log", label: "Evidence log\n(per match)", lane: 2 },
      ],
      edges: [
        { from: "ui", to: "api" },
        { from: "api", to: "extract", label: "ingest" },
        { from: "extract", to: "norm" },
        { from: "norm", to: "pg" },
        { from: "api", to: "agent", label: "match" },
        { from: "agent", to: "match" },
        { from: "match", to: "pg" },
        { from: "match", to: "log" },
        { from: "log", to: "ui", label: "render" },
      ],
    },
    agentWorkflow: [
      "Plan: read role spec, list required evidence types (skills, projects, ownership signals).",
      "Retrieve: pull candidate evidence from normalized Postgres profile.",
      "Score: rate each requirement against evidence, with citations.",
      "Verify: cross-check claims against raw source records (commit history, README, role bullets).",
      "Decide: produce a ranked match with confidence, reasoning, and missing-evidence list.",
    ],
    dataModel: [
      { name: "CandidateProfile", fields: ["id", "source", "skills", "projects", "experience", "evidence_items"] },
      { name: "RoleMatch", fields: ["id", "role_title", "company", "match_score", "reasoning", "missing_evidence", "status"] },
      { name: "ApplicationEvent", fields: ["id", "role_match_id", "event_type", "timestamp", "notes"] },
    ],
    failureHandling: [
      { case: "Extraction fails on a profile source", behavior: "Skip source, mark partial coverage, persist error in event log, continue with remaining sources." },
      { case: "LLM returns malformed JSON", behavior: "Validate against schema; on fail, retry once with stricter prompt; if still bad, fall back to rule-based scoring." },
      { case: "Role spec is ambiguous", behavior: "Agent emits clarification request; UI prompts the user instead of hallucinating requirements." },
      { case: "No evidence matches a requirement", behavior: "Mark requirement as missing-evidence with severity, do not fabricate matches." },
    ],
    verification: [
      "Snapshot tests on extractor output for fixture profiles.",
      "Eval harness with hand-labeled (role, candidate) → expected match cases.",
      "Schema validation on every LLM response with retry budget.",
      "Per-match evidence log retained for audit.",
    ],
    evals: [
      {
        name: "Strong match — full-stack AI role",
        input: "Candidate has React, Next.js, Python, Postgres, RAG project experience.",
        expected: "High match with reasoning tied to project evidence.",
        actual: "High match. Cited GhostSSH, ICT Knowledge Engine, Aqentix as evidence.",
        status: "pass",
      },
      {
        name: "Partial match — Kubernetes ownership required",
        input: "Same candidate vs role requiring Kubernetes production ownership.",
        expected: "Partial match with explicit missing-evidence on Kubernetes.",
        actual: "Partial match. Listed Kubernetes ownership as missing-evidence with severity=high.",
        status: "partial",
      },
      {
        name: "Hallucination guard — fabricated framework",
        input: "Role mentions a framework the candidate has never used.",
        expected: "Mark missing, do not invent a match.",
        actual: "Marked missing-evidence; reasoning string contained no false claim.",
        status: "pass",
      },
    ],
    screenshots: [
      { src: "/screenshots/ghostssh-agent-flow.svg", alt: "GhostSSH agent flow diagram" },
    ],
    nextImprovements: [
      "Persistent eval dashboard with regression tracking.",
      "Auth and team workspace model for shared candidate libraries.",
      "Background job queue for extraction (Inngest or BullMQ).",
      "Observability and per-step trace logging (OpenTelemetry).",
      "Production deployment notes and runbook.",
    ],
  },
  {
    slug: "ict-knowledge-engine",
    name: "ICT Knowledge Engine",
    oneLiner:
      "Ontology-driven knowledge engine for financial concepts — combines semantic search with graph-based exploration and source-cited answers.",
    description:
      "An ontology-driven knowledge engine for ICT trading concepts. Ingests source material, extracts concepts, links them in an ontology, and serves retrieval-augmented Q&A grounded in cited sources.",
    built: [
      "Concept ontology with typed edges",
      "Hybrid retrieval (semantic + graph)",
      "Source-cited answer composer",
      "Coverage eval harness",
    ],
    owned: ["Ontology design", "Retrieval pipeline", "Eval harness", "Frontend graph view"],
    stack: ["Next.js", "TypeScript", "Python", "Postgres", "pgvector", "Knowledge graph"],
    tags: ["rag", "knowledge-graph"],
    status: "active",
    accent: "cyan",
    links: [
      { label: "Live demo", href: "https://ict-knowledge-engine.vercel.app/" },
      { label: "GitHub", href: "https://github.com/sixscripts-ai/openai-ict-kg" },
      { label: "Architecture", href: "/projects/ict-knowledge-engine#architecture" },
      { label: "Evaluation", href: "/projects/ict-knowledge-engine#evals" },
    ],
    problem:
      "Trading knowledge is fragmented and contradictory across sources. Naïve RAG returns surface-level matches without context. The engine grounds answers in an ontology so retrieval reflects how concepts actually relate.",
    architecture: {
      nodes: [
        { id: "ui", label: "Next.js UI\n(query + graph view)", lane: 0 },
        { id: "api", label: "API", lane: 0 },
        { id: "ingest", label: "Ingest + chunker", lane: 1 },
        { id: "extract", label: "Concept extractor", lane: 1 },
        { id: "graph", label: "Ontology\n(nodes + typed edges)", lane: 1 },
        { id: "vec", label: "pgvector store", lane: 2 },
        { id: "rag", label: "Hybrid retriever\n(semantic + graph walk)", lane: 2 },
        { id: "compose", label: "Answer composer\n+ source citation", lane: 2 },
      ],
      edges: [
        { from: "ui", to: "api" },
        { from: "api", to: "ingest" },
        { from: "ingest", to: "extract" },
        { from: "extract", to: "graph" },
        { from: "ingest", to: "vec" },
        { from: "api", to: "rag", label: "query" },
        { from: "rag", to: "vec" },
        { from: "rag", to: "graph" },
        { from: "rag", to: "compose" },
        { from: "compose", to: "ui" },
      ],
    },
    dataModel: [
      { name: "OntologyNode", fields: ["id", "label", "type", "description"] },
      { name: "OntologyEdge", fields: ["source_id", "target_id", "relationship_type"] },
      { name: "KnowledgeChunk", fields: ["id", "content", "source", "embedding_id", "ontology_node_id"] },
    ],
    failureHandling: [
      { case: "Concept extractor low confidence", behavior: "Send to a manual review queue rather than auto-link." },
      { case: "Empty retrieval", behavior: "Refuse to answer; surface 'no source found' instead of hallucinating." },
      { case: "Conflicting sources", behavior: "Show both citations and tag the response as contested." },
    ],
    verification: [
      "Coverage eval over a fixed query set with expected concepts.",
      "Retrieval traces logged per query for offline audit.",
      "Citation correctness check (cited chunk must contain claimed text).",
    ],
    evals: [
      {
        name: "Concept coverage",
        input: "Query: 'What is a fair value gap?'",
        expected: "Retrieves FVG concept node + canonical source.",
        actual: "Retrieved FVG node, 3 supporting chunks, 1 canonical source.",
        status: "pass",
      },
      {
        name: "No-source guard",
        input: "Query: out-of-corpus term.",
        expected: "Refuses with 'no source' message.",
        actual: "Refused. No fabricated definition.",
        status: "pass",
      },
    ],
    nextImprovements: [
      "Add provenance scoring per source.",
      "Add user-curated overrides for contested edges.",
      "Cache hot subgraphs for low-latency reads.",
    ],
  },
  {
    slug: "evalbench",
    name: "EvalBench",
    oneLiner:
      "Cross-provider AI evaluation platform that runs test suites, scores outputs against custom assertions, and surfaces regressions automatically.",
    description:
      "Full-stack eval platform with a React + Vite frontend, an Express API on Vercel serverless, and Neon Postgres via Prisma. Runs test cases against real LLM providers (Gemini, Groq, OpenRouter) — or a deterministic simulated fallback when keys are missing — scores outputs against 10 configurable assertion types, and surfaces regressions and provider disagreements across runs.",
    built: [
      "Full-stack eval platform",
      "Custom assertion rule builder",
      "Multi-provider runs (Gemini · Groq · OpenRouter)",
      "Regression detection + provider comparison",
    ],
    owned: [
      "Product direction",
      "Eval workflow + assertion design",
      "Full-stack implementation (React · Express · Prisma)",
      "Provider integration (Gemini · Groq · OpenRouter)",
      "Shipped product framing",
      "Test / compare / regress narrative",
    ],
    stack: [
      "React",
      "Vite",
      "Tailwind",
      "Express",
      "Node.js",
      "Zod",
      "Neon Postgres",
      "Prisma 7",
      "Gemini · Groq · OpenRouter",
      "Vercel serverless",
    ],
    tags: ["evals", "ai-qa", "fullstack"],
    status: "shipped",
    accent: "magenta",
    links: [
      { label: "Live demo", href: "https://ai-evaluation-dashboard.vercel.app/" },
      { label: "GitHub", href: "https://github.com/sixscripts-ai/AI-Evaluation-Dashboard" },
      { label: "Architecture", href: "/projects/evalbench#architecture" },
      { label: "Evaluation", href: "/projects/evalbench#evals" },
    ],
    problem:
      "AI quality work usually means ad-hoc prompt testing, and regressions slip through unnoticed. EvalBench turns that into structured evaluation: suites of test cases run against real LLM providers (or a simulated fallback when keys are missing), scored by configurable assertion rules, and tracked across runs so score drops, status downgrades, evidence loss, and latency spikes surface as named regressions instead of vibes.",
    architecture: {
      nodes: [
        { id: "ui", label: "React client\n(Vite bundle)", lane: 0 },
        { id: "view", label: "Dashboard / suite / run\n+ assertion builder", lane: 0 },
        { id: "api", label: "Express API\n(Vercel serverless)", lane: 1 },
        { id: "validate", label: "Zod request validation", lane: 1 },
        { id: "engine", label: "Assertion engine\n+ regression detector", lane: 1 },
        { id: "providers", label: "Provider clients\n(Gemini · Groq · OpenRouter)", lane: 1 },
        { id: "db", label: "Neon Postgres\n(via Prisma ORM)", lane: 2 },
        { id: "compare", label: "Provider comparison\nreport", lane: 2 },
      ],
      edges: [
        { from: "ui", to: "api", label: "fetch /api/*" },
        { from: "view", to: "ui" },
        { from: "api", to: "validate" },
        { from: "validate", to: "engine" },
        { from: "engine", to: "providers", label: "real runs" },
        { from: "providers", to: "engine", label: "response" },
        { from: "engine", to: "db", label: "persist" },
        { from: "api", to: "db", label: "CRUD" },
        { from: "db", to: "compare" },
        { from: "compare", to: "view", label: "render" },
      ],
    },
    dataModel: [
      { name: "EvalCase", fields: ["id", "suiteId", "input", "expectedOutput", "assertionRules", "evidenceSourceIds"] },
      { name: "EvalRun", fields: ["id", "suiteId", "modelProvider", "modelName", "runDate", "status", "score"] },
      { name: "EvalResult", fields: ["id", "runId", "caseId", "actualOutput", "latencyMs", "tokenUsage", "score", "assertionResults"] },
      { name: "Regression", fields: ["id", "runId", "previousRunId", "caseId", "type", "severity"] },
    ],
    failureHandling: [
      { case: "Provider call fails or times out", behavior: "Result marked failed with providerError; the run continues with remaining cases instead of aborting the whole sweep." },
      { case: "No provider API keys configured", behavior: "Server detects missing keys and falls back to deterministic simulated mode so the dashboard still produces results and assertions still score." },
      { case: "Database connection drops", behavior: "/api/health returns ok:false with database:disconnected; UI surfaces a status banner instead of a broken page." },
      { case: "Invalid request body (Zod)", behavior: "Request rejected with 400 + schema details; no partial writes, no half-persisted runs." },
    ],
    verification: [
      "curl /api/health on the live URL returns { ok: true, database: 'connected', latencyMs < 50 }.",
      "curl the root URL and confirm the <title> matches the live dashboard.",
      "Locally: npm run dev → dashboard, /suites, /runs, and the assertion builder all render with seed data.",
      "Run a real-provider evaluation (Gemini or Groq) and confirm results persist across reloads via Prisma + Neon.",
      "Trigger the documented regression scenario: run a suite, tighten assertions, re-run, confirm at least one Regression card surfaces in the new run detail.",
    ],
    evals: [
      {
        name: "Recruiter-facing summary",
        input: "Summarize this project for a recruiter.",
        expected: "Concise summary focused on AI evaluation, custom assertions, and shipped full-stack deployment.",
        actual: "Produces a clear recruiter-facing summary of EvalBench covering multi-provider runs, custom assertion rules, regression detection, and provider comparison.",
        status: "pass",
      },
      {
        name: "Expected vs actual compare",
        input: "Compare expected and actual model output for a test case.",
        expected: "Highlights whether the output passed, partially passed, or failed.",
        actual: "Supports structured comparison using 10 custom assertion types (outputIncludes, regexMatch, latencyLessThanMs, etc.) with per-rule pass/fail and explanations.",
        status: "pass",
      },
      {
        name: "Multi-run regression tracking",
        input: "Use the dashboard as a regression tracker across multiple model runs.",
        expected: "Tracks repeated runs over time and surfaces regressions automatically.",
        actual: "Detects status downgrades, score drops ≥15 pts, evidence loss, and latency spikes ≥50% — surfaces them as Regression cards in run detail.",
        status: "pass",
      },
      {
        name: "Provider comparison",
        input: "Compare multiple model providers side-by-side on the same suite.",
        expected: "Side-by-side report with score, latency, and disagreement detection.",
        actual: "Provider Comparison Report renders multiple runs together and flags status downgrades, score gaps, and latency spikes automatically.",
        status: "pass",
      },
    ],
    nextImprovements: [
      "Add LLM-as-judge assertion mode for non-deterministic scoring.",
      "Add export / import for suite definitions as JSON.",
      "Add authentication and multi-user workspace support.",
      "Add scheduled eval runs (cron / on-merge triggers).",
      "Upgrade provider comparison to statistical benchmarking instead of run-level.",
    ],
    screenshots: [
      { src: "https://raw.githubusercontent.com/sixscripts-ai/AI-Evaluation-Dashboard/main/docs/images/dashboard.png", alt: "EvalBench dashboard with suite count, assertion status, average latency, and recent runs" },
      { src: "https://raw.githubusercontent.com/sixscripts-ai/AI-Evaluation-Dashboard/main/docs/images/assertion-builder.png", alt: "Custom assertion builder UI for defining test rules" },
      { src: "https://raw.githubusercontent.com/sixscripts-ai/AI-Evaluation-Dashboard/main/docs/images/run-detail.png", alt: "Run detail page with per-case results, assertion explanations, and regression summary" },
      { src: "https://raw.githubusercontent.com/sixscripts-ai/AI-Evaluation-Dashboard/main/docs/images/provider-comparison.png", alt: "Provider comparison report showing side-by-side model performance" },
    ],
  },
  {
    slug: "aqentix",
    name: "Aqentix",
    oneLiner:
      "Multi-location inventory intelligence concept with reorder workflows, trend visualization, and integration-ready data modeling.",
    description:
      "A concept platform for multi-location inventory: per-store stock signals, reorder workflows, trend visualization, and a data model designed for downstream integrations (POS, supplier APIs).",
    built: ["Multi-tenant data model", "Reorder workflow", "Trend dashboards"],
    owned: ["Data model", "Frontend dashboards", "Reorder logic"],
    stack: ["Next.js", "TypeScript", "Postgres", "Tailwind"],
    tags: ["fullstack", "ops"],
    status: "concept",
    accent: "amber",
    links: [
      { label: "Live demo", href: "https://aqentix.me/" },
      { label: "GitHub", href: "https://github.com/sixscripts-ai/aqentix" },
      { label: "Architecture", href: "/projects/aqentix#architecture" },
      { label: "Case notes", href: "/projects/aqentix#case" },
    ],
    problem:
      "Operators juggle spreadsheets across stores. Aqentix unifies the signal surface and lets reorder happen on a schedule, not a panic.",
    architecture: {
      nodes: [
        { id: "ui", label: "Next.js dashboards", lane: 0 },
        { id: "api", label: "API / Server actions", lane: 0 },
        { id: "rules", label: "Reorder rules engine", lane: 1 },
        { id: "pg", label: "Postgres\n(tenants, locations, items)", lane: 1 },
        { id: "trend", label: "Trend aggregator", lane: 2 },
        { id: "evt", label: "Event log", lane: 2 },
      ],
      edges: [
        { from: "ui", to: "api" },
        { from: "api", to: "rules" },
        { from: "rules", to: "pg" },
        { from: "api", to: "pg" },
        { from: "pg", to: "trend" },
        { from: "trend", to: "ui" },
        { from: "rules", to: "evt" },
      ],
    },
    dataModel: [
      { name: "Tenant", fields: ["id", "name", "plan"] },
      { name: "Location", fields: ["id", "tenant_id", "label", "address"] },
      { name: "Item", fields: ["id", "tenant_id", "sku", "name", "reorder_point"] },
      { name: "ReorderEvent", fields: ["id", "item_id", "qty", "status", "created_at"] },
    ],
    failureHandling: [
      { case: "Tenant isolation breach", behavior: "All queries scope by tenant_id; schema enforces RLS-equivalent filter at the application layer." },
      { case: "Reorder rule evaluation timeout", behavior: "Fall back to manual reorder workflow; log timeout with context for debugging." },
      { case: "Concurrent reorder on same item", behavior: "Optimistic locking on ReorderEvent creation; second writer receives conflict and retries." },
    ],
    verification: [
      "Multi-tenant data isolation: tenant A queries never return tenant B items (verified in integration tests).",
      "Reorder workflow: trigger reorder for an item below threshold and confirm ReorderEvent is created with correct qty.",
      "Trend aggregation: aggregate sales data across locations and confirm totals match raw input sums.",
    ],
    screenshots: [
      { src: "/projects/aqentix-1.png", alt: "Aqentix landing page showing tagline, hero metrics, and feature cards" },
    ],
    nextImprovements: ["Integrations (Square, Shopify).", "Forecast model behind reorder.", "Per-role permissioning."],
  },
  {
    slug: "webhook-replay-lab",
    name: "Webhook Replay Lab",
    oneLiner:
      "Backend reliability tool for receiving webhook events, storing payloads, replaying failed deliveries, and tracking retry history.",
    description:
      "A non-AI systems project that proves backend reliability chops. Receives, stores, and replays webhooks with full audit history. Built in Next.js + Postgres with route handlers and server-side validation.",
    built: [
      "Webhook intake endpoint with signature validation",
      "Postgres-backed event store",
      "Replay & retry logic with backoff",
      "Audit log + per-event timeline UI",
    ],
    owned: ["Backend architecture", "Data model", "Reliability semantics", "UI"],
    stack: ["Next.js", "TypeScript", "Postgres", "Tailwind", "Route handlers", "Server-side validation"],
    tags: ["backend", "reliability"],
    status: "active",
    accent: "cyan",
    links: [
      { label: "Live demo", href: "https://webhookreplay-lab.vercel.app/" },
      { label: "GitHub", href: "https://github.com/sixscripts-ai/webhook-replay-lab" },
      { label: "Architecture", href: "/projects/webhook-replay-lab#architecture" },
      { label: "Case notes", href: "/projects/webhook-replay-lab#case" },
    ],
    problem:
      "Webhook integrations fail silently. Most teams discover misses days later. The Replay Lab gives every event an audit trail and a one-click replay so failures stop being mysteries.",
    architecture: {
      nodes: [
        { id: "src", label: "External source\n(Stripe / GitHub / etc.)", lane: 0 },
        { id: "intake", label: "Intake route\n+ signature check", lane: 0 },
        { id: "queue", label: "Replay queue", lane: 1 },
        { id: "pg", label: "Postgres\n(events, attempts)", lane: 1 },
        { id: "ui", label: "Next.js UI\n(timeline + replay)", lane: 2 },
        { id: "audit", label: "Audit log", lane: 2 },
      ],
      edges: [
        { from: "src", to: "intake", label: "POST" },
        { from: "intake", to: "pg", label: "persist" },
        { from: "intake", to: "queue" },
        { from: "queue", to: "pg" },
        { from: "pg", to: "ui" },
        { from: "ui", to: "queue", label: "replay" },
        { from: "queue", to: "audit" },
      ],
    },
    dataModel: [
      { name: "WebhookEvent", fields: ["id", "source", "received_at", "headers", "payload", "signature_ok", "status"] },
      { name: "DeliveryAttempt", fields: ["id", "event_id", "attempt_no", "status_code", "error", "started_at", "finished_at"] },
      { name: "AuditEntry", fields: ["id", "event_id", "action", "actor", "created_at", "notes"] },
    ],
    failureHandling: [
      { case: "Signature mismatch", behavior: "Persist event with signature_ok=false, do not dispatch downstream, alert in audit log." },
      { case: "Downstream 5xx", behavior: "Mark attempt failed; schedule exponential backoff retry up to N attempts." },
      { case: "Duplicate delivery (same id)", behavior: "Idempotent insert; record duplicate as no-op attempt." },
    ],
    verification: ["Integration tests for intake + replay.", "Schema validation on every payload.", "Audit log preserved across replays."],
    evals: [
      {
        name: "Well-formed event flows through intake + replay",
        input: "Simulate a Stripe payment.succeeded webhook with a valid HMAC signature.",
        expected: "Event persisted, attempt logged, replay triggers delivery.",
        actual: "Event persisted with signature_ok=true; replay triggered 1 attempt with 200 response.",
        status: "pass",
      },
      {
        name: "Signature mismatch blocks downstream dispatch",
        input: "Same event with forged HMAC signature.",
        expected: "Event persisted with signature_ok=false, no downstream dispatch.",
        actual: "Signature flagged as invalid; event marked dead without dispatch; audit entry created.",
        status: "pass",
      },
      {
        name: "Duplicate event idempotency",
        input: "Deliver the same webhook id twice in succession.",
        expected: "Only one event record created; second delivery recorded as a no-op duplicate.",
        actual: "Duplicate detected via id constraint; second attempt recorded as no-op without duplicate event.",
        status: "pass",
      },
    ],
    screenshots: [
      { src: "/projects/webhook-replay-lab-1.png", alt: "Dashboard with live metrics showing total events, failure rate, dead letter count, and replay activity" },
      { src: "/projects/webhook-replay-lab-2.png", alt: "Events inbox listing every captured webhook with status, signature check, and duplicate count" },
      { src: "/projects/webhook-replay-lab-3.png", alt: "Dead letter queue for events that exhausted retry attempts and need manual review" },
    ],
    nextImprovements: ["Slack alerts on repeated failures.", "Per-source retry policies.", "Multi-tenant signing keys."],
  },
  {
    slug: "campus-compass",
    name: "Campus Compass",
    oneLiner:
      "Campus information assistant with semantic course search, source-aware retrieval, and prerequisite graph navigation.",
    description:
      "A campus assistant that answers course questions using semantic search over the catalog and a prerequisite graph for path navigation. Every answer includes the cited section.",
    built: ["Catalog ingest + chunker", "Prereq graph builder", "Source-aware retrieval", "Path navigation UI"],
    owned: ["Frontend UI", "Retrieval pipeline", "Graph rendering"],
    stack: ["Next.js", "TypeScript", "Postgres", "pgvector", "React Flow"],
    tags: ["rag", "graph", "edu"],
    status: "shipped",
    accent: "magenta",
    links: [
      { label: "Live demo", href: "https://campuscompass-next.vercel.app/" },
      { label: "GitHub", href: "https://github.com/sixscripts-ai/campuscompass-next" },
      { label: "Architecture", href: "/projects/campus-compass#architecture" },
    ],
    problem:
      "Catalog PDFs are dense and prerequisites are buried. Students need to plan paths, not search keywords.",
    architecture: {
      nodes: [
        { id: "ui", label: "Next.js UI\n(search + path view)", lane: 0 },
        { id: "api", label: "API", lane: 0 },
        { id: "ing", label: "Catalog ingest", lane: 1 },
        { id: "graph", label: "Prereq graph", lane: 1 },
        { id: "vec", label: "pgvector store", lane: 2 },
        { id: "retr", label: "Hybrid retrieval", lane: 2 },
        { id: "ans", label: "Source-cited answer", lane: 2 },
      ],
      edges: [
        { from: "ui", to: "api" },
        { from: "api", to: "ing" },
        { from: "ing", to: "graph" },
        { from: "ing", to: "vec" },
        { from: "api", to: "retr" },
        { from: "retr", to: "vec" },
        { from: "retr", to: "graph" },
        { from: "retr", to: "ans" },
        { from: "ans", to: "ui" },
      ],
    },
    dataModel: [
      { name: "Course", fields: ["id", "code", "title", "description", "units"] },
      { name: "Prereq", fields: ["course_id", "requires_course_id", "type"] },
      { name: "CatalogChunk", fields: ["id", "course_id", "content", "embedding_id"] },
    ],
    failureHandling: [
      { case: "Empty retrieval (no courses match query)", behavior: "Surface 'no results' with suggested broader terms; do not hallucinate course data." },
      { case: "Graph cycle in prerequisites", behavior: "Cycle detection on ingest; cycle edges flagged in UI instead of infinite path rendering." },
      { case: "Embedding search returns low-confidence results", behavior: "Threshold filter applied; results below score are omitted rather than shown as weak matches." },
    ],
    verification: [
      "Search query returns cited course results with source chunk references.",
      "Prerequisite graph renders without cycles or orphan nodes.",
      "Ingest pipeline handles malformed catalog PDF entries gracefully (skip + log).",
      "Live demo at campuscompass-next.vercel.app responds with seeded data on page load.",
    ],
    evals: [
      {
        name: "Semantic search returns relevant courses",
        input: "Query: 'computer science introduction courses'",
        expected: "Return CS 101, CS 110, and related intro courses with chunk-level citations.",
        actual: "Returned 5 results; top 3 matched intro CS. All results included cited catalog sections.",
        status: "pass",
      },
      {
        name: "Prerequisite path finds valid route",
        input: "Find path from intro math to upper-level statistics.",
        expected: "Graph walk produces a valid prerequisite sequence without gaps.",
        actual: "Walk returned 4-node path with no missing intermediate courses.",
        status: "pass",
      },
      {
        name: "Citation fidelity — no hallucinated content",
        input: "Ask a question about a course that exists in a different subject area.",
        expected: "Answer cites only the matching course; does not blend unrelated course info.",
        actual: "Response correctly scoped to the matched course. No cross-contamination.",
        status: "pass",
      },
    ],
    screenshots: [
      { src: "/projects/campus-compass-1.png", alt: "AI course advisor chat interface with suggestion buttons for Find Courses, Prerequisites, and Campus Locations" },
      { src: "/projects/campus-compass-2.png", alt: "Prerequisite graph view showing course dependency navigation" },
      { src: "/projects/campus-compass-3.png", alt: "Course search view with semantic results and source-cited answers" },
    ],
    nextImprovements: ["Add term-aware availability.", "Add user-saved plans.", "Add advisor-mode comments."],
  },
];
