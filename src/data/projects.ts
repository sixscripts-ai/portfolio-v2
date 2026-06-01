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
      "Agentic job-search system that extracts candidate evidence, normalizes profile data, and matches roles through structured reasoning workflows.",
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
      "Ontology-backed retrieval system that connects financial concepts, semantic search, and graph-based exploration.",
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
    nextImprovements: ["Add term-aware availability.", "Add user-saved plans.", "Add advisor-mode comments."],
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
    nextImprovements: ["Slack alerts on repeated failures.", "Per-source retry policies.", "Multi-tenant signing keys."],
  },
];
