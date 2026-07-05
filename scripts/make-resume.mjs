/**
 * One-page resume PDF generator. Pure Node, no deps.
 * Run: node scripts/make-resume.mjs
 * Output: public/ashton-aschenbrener-resume.pdf
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const NAME = "Ashton Aschenbrener";
const ROLE = "Full-stack AI Engineer";
const META = "California / Remote  |  sixscripts@proton.me  |  github.com/sixscripts-ai  |  linkedin.com/in/aaschenbrener";

const SUMMARY =
  "Full-stack AI engineer focused on evidence-first AI systems: agent workflows, retrieval infrastructure, eval harnesses, and product interfaces with Next.js, TypeScript, Python, and Postgres.";

const PROJECTS = [
  "Built Agent Skill Registry, a portable SKILL.md registry, builder, console, and runtime for versioned agent capabilities with trust-tier governance, multi-provider routing, and a Librarian AI workflow.",
  "Built EvalBench, an AI evaluation dashboard for provider comparisons, custom assertions, regression detection, and evidence-backed model outputs using React, Express, Prisma, Neon Postgres, Gemini, Groq, and OpenRouter.",
  "Built GhostSSH, an agentic job-search workflow that extracts candidate evidence from GitHub, LinkedIn, and portfolio data, then ranks roles through structured matching logic and missing-evidence checks.",
  "Designed ICT Knowledge Engine, an ontology-backed retrieval system that connects financial concepts, semantic search, graph-based exploration, and source-cited answers.",
  "Built SignalForge, a data import and validation platform with CSV/JSON upload, Zod schema validation, deduplication, audit trails, RBAC-ready data modeling, and quality analytics.",
];

const EXPERIENCE = [
  {
    title: "Founder & Engineer  |  Independent / Six Scripts Software",
    period: "2024 - Present",
    bullets: [
      "Ship full-stack AI products end-to-end: product direction, UI, backend, data model, AI workflow, verification, and deployment.",
      "Designed retrieval and agent systems with explicit failure handling, traceable outputs, source grounding, and eval harnesses.",
      "Deployed production-facing projects on Vercel with Postgres-backed data layers, provider API integrations, Prisma/Drizzle schemas, and environment configuration.",
    ],
  },
  {
    title: "AI Engineering Student  |  MiraCosta College",
    period: "2024 - Present",
    bullets: [
      "Coursework focused on AI systems, data structures, and applied software engineering.",
      "Independent projects on retrieval, agents, ontology-backed knowledge engines, and evaluation infrastructure.",
    ],
  },
];

const SKILLS = [
  ["Languages", "TypeScript, Python, SQL, JavaScript"],
  ["Frontend", "Next.js, React, Tailwind, Framer Motion, shadcn-style UI"],
  ["Backend & Data", "Node.js, Express, Postgres, Neon, Prisma, Drizzle, Zod, route handlers, server actions"],
  ["AI", "RAG, agentic workflows, tool orchestration, evals, provider comparisons, hybrid retrieval, knowledge graphs"],
  ["Infra", "Vercel, GitHub Actions, Docker basics, Neon Postgres, Clerk, Vitest"],
];

const W = 612;
const H = 792;
const MARGIN = 42;
const LEAD = 11.2;

const objects = [];
function obj(content) {
  objects.push(content);
  return objects.length;
}

const stream = [];
let y = H - MARGIN;
function move(dy) { y -= dy; }
function escapePdf(s) { return String(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)"); }
function text(font, size, x, yy, s) {
  stream.push(`BT /F${font} ${size} Tf ${x} ${yy} Td (${escapePdf(s)}) Tj ET`);
}
function ruleColor(r, g, b) { stream.push(`${r} ${g} ${b} RG`); }
function fillColor(r, g, b) { stream.push(`${r} ${g} ${b} rg`); }
function rule(x1, y1, x2, y2, w = 0.5) { stream.push(`${w} w ${x1} ${y1} m ${x2} ${y2} l S`); }
function bullet(x, yy) {
  fillColor(0.10, 0.10, 0.10);
  stream.push(`${x + 1} ${yy + 3} m ${x + 5} ${yy + 6} l ${x + 1} ${yy + 9} l f`);
  fillColor(0, 0, 0);
}

function wrap(str, charsPerLine) {
  const words = str.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? line + " " + w : w;
    if (next.length > charsPerLine) {
      if (line) lines.push(line);
      line = w;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

fillColor(0, 0, 0);
text(2, 21, MARGIN, y, NAME);
move(20);
fillColor(0.1, 0.1, 0.1);
text(2, 10.5, MARGIN, y, ROLE.toUpperCase());
fillColor(0, 0, 0);
move(13);
text(1, 8.5, MARGIN, y, META);
move(9);
ruleColor(0.82, 0.82, 0.82);
rule(MARGIN, y, W - MARGIN, y);
move(14);

fillColor(0.35, 0.35, 0.35);
text(2, 8.2, MARGIN, y, "SUMMARY");
fillColor(0, 0, 0);
move(LEAD);
for (const ln of wrap(SUMMARY, 100)) {
  text(1, 9.2, MARGIN, y, ln);
  move(LEAD);
}
move(3);

fillColor(0.35, 0.35, 0.35);
text(2, 8.2, MARGIN, y, "PROJECTS");
fillColor(0, 0, 0);
move(LEAD);
for (const p of PROJECTS) {
  const lines = wrap(p, 92);
  bullet(MARGIN, y - 2);
  text(1, 9.1, MARGIN + 12, y, lines[0]);
  move(LEAD - 0.3);
  for (let i = 1; i < lines.length; i++) {
    text(1, 9.1, MARGIN + 12, y, lines[i]);
    move(LEAD - 0.3);
  }
  move(0.5);
}
move(2);

fillColor(0.35, 0.35, 0.35);
text(2, 8.2, MARGIN, y, "EXPERIENCE");
fillColor(0, 0, 0);
move(LEAD);
for (const r of EXPERIENCE) {
  text(2, 9.8, MARGIN, y, r.title);
  text(1, 8.5, W - MARGIN - 7 * r.period.length, y, r.period);
  move(LEAD - 1);
  for (const b of r.bullets) {
    const lines = wrap(b, 96);
    bullet(MARGIN, y - 2);
    text(1, 8.9, MARGIN + 12, y, lines[0]);
    move(LEAD - 1.2);
    for (let i = 1; i < lines.length; i++) {
      text(1, 8.9, MARGIN + 12, y, lines[i]);
      move(LEAD - 1.2);
    }
  }
  move(3);
}

fillColor(0.35, 0.35, 0.35);
text(2, 8.2, MARGIN, y, "SKILLS");
fillColor(0, 0, 0);
move(LEAD);
for (const [label, value] of SKILLS) {
  const lines = wrap(value, 78);
  text(2, 8.8, MARGIN, y, label + ":");
  text(1, 8.8, MARGIN + 88, y, lines[0]);
  move(LEAD - 0.7);
  for (let i = 1; i < lines.length; i++) {
    text(1, 8.8, MARGIN + 88, y, lines[i]);
    move(LEAD - 0.7);
  }
}

const contentStream = stream.join("\n");
const contentObj = obj(`<< /Length ${Buffer.byteLength(contentStream)} >>\nstream\n${contentStream}\nendstream`);
const fontHelv = obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
const fontHelvBold = obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
const pageObj = obj(
  `<< /Type /Page /Parent 0 0 R /MediaBox [0 0 ${W} ${H}] /Contents ${contentObj} 0 R /Resources << /Font << /F1 ${fontHelv} 0 R /F2 ${fontHelvBold} 0 R >> >> >>`
);
const pagesObj = obj(`<< /Type /Pages /Kids [${pageObj} 0 R] /Count 1 >>`);
const catalogObj = obj(`<< /Type /Catalog /Pages ${pagesObj} 0 R >>`);
objects[pageObj - 1] = objects[pageObj - 1].replace("/Parent 0 0 R", `/Parent ${pagesObj} 0 R`);

let pdf = "%PDF-1.4\n";
const offsets = [];
for (let i = 0; i < objects.length; i++) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}
const xrefStart = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObj} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

const outDir = resolve(__dirname, "..", "public");
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, "ashton-aschenbrener-resume.pdf");
writeFileSync(outPath, pdf, "binary");
console.log("wrote", outPath, Buffer.byteLength(pdf), "bytes");
