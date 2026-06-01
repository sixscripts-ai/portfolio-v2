/**
 * One-page resume PDF generator. Pure Node, no deps.
 * Run: node scripts/make-resume.mjs
 * Output: public/ashton-aschenbrener-resume.pdf
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---- content (mirrors the on-site resume) ----
const NAME = "Ashton Aschenbrener";
const ROLE = "Full-stack AI Engineer";
const META = "California / Remote  ·  sixscripts@proton.me  ·  github.com/sixscripts-ai  ·  linkedin.com/in/aaschenbrener";

const SUMMARY =
  "Full-stack AI engineer focused on retrieval systems, agentic workflows, and product interfaces with Next.js, TypeScript, Python, and Postgres.";

const PROJECTS = [
  "Built GhostSSH, an agentic job-search workflow that extracts candidate evidence from GitHub, LinkedIn, and portfolio data, then ranks roles through structured matching logic.",
  "Designed ICT Knowledge Engine, an ontology-backed retrieval system that connects financial concepts, semantic search, and graph-based exploration.",
  "Built Campus Compass, a campus information assistant with semantic course search, source-aware retrieval, and prerequisite graph navigation.",
  "Developed Aqentix, a multi-location inventory intelligence concept with reorder workflows, trend visualization, and integration-ready data modeling.",
  "Built Webhook Replay Lab, a backend reliability tool that stores, audits, and replays webhook deliveries with per-attempt history.",
];

const EXPERIENCE = [
  {
    title: "Founder & Engineer  ·  Six Scripts Software (Independent)",
    period: "2024 - Present",
    bullets: [
      "Ship full-stack AI products end-to-end: product, UI, backend, data model, AI workflow, verification.",
      "Designed retrieval and agent systems with explicit failure handling and eval harnesses.",
      "Owned production deploys on Vercel with Postgres + pgvector backends.",
    ],
  },
  {
    title: "AI Engineering Student  ·  MiraCosta College",
    period: "2024 - Present",
    bullets: [
      "Coursework in AI systems, data structures, and applied software engineering.",
      "Independent work on retrieval, agents, and ontology-backed knowledge engines.",
    ],
  },
];

const SKILLS = [
  ["Languages", "TypeScript, Python, SQL, JavaScript"],
  ["Frontend", "Next.js, React, Tailwind, Framer Motion"],
  ["Backend & Data", "Node.js, Postgres, pgvector, route handlers, server actions"],
  ["AI", "RAG, agentic workflows, tool orchestration, evals, knowledge graphs"],
  ["Infra", "Vercel, GitHub Actions, Docker basics"],
];

// ---- PDF writer (Helvetica, single page, US Letter 612x792) ----
const W = 612;
const H = 792;
const MARGIN = 48;
const LEAD = 12.5;
const COL_W = W - MARGIN * 2;

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
  fillColor(0.45, 0.85, 0.18);
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

// HEADER
fillColor(0, 0, 0);
text(2, 22, MARGIN, y, NAME);
move(22);
fillColor(0.45, 0.85, 0.18);
text(2, 11, MARGIN, y, ROLE.toUpperCase());
fillColor(0, 0, 0);
move(14);
text(1, 9, MARGIN, y, META);
move(10);
ruleColor(0.85, 0.85, 0.85);
rule(MARGIN, y, W - MARGIN, y);
move(16);

// SUMMARY
fillColor(0.40, 0.40, 0.40);
text(2, 8.5, MARGIN, y, "SUMMARY");
fillColor(0, 0, 0);
move(LEAD);
for (const ln of wrap(SUMMARY, 96)) {
  text(1, 10, MARGIN, y, ln);
  move(LEAD);
}
move(4);

// PROJECTS
fillColor(0.40, 0.40, 0.40);
text(2, 8.5, MARGIN, y, "PROJECTS");
fillColor(0, 0, 0);
move(LEAD);
for (const p of PROJECTS) {
  const lines = wrap(p, 90);
  bullet(MARGIN, y - 2);
  text(1, 10, MARGIN + 12, y, lines[0]);
  move(LEAD);
  for (let i = 1; i < lines.length; i++) {
    text(1, 10, MARGIN + 12, y, lines[i]);
    move(LEAD);
  }
  move(2);
}
move(2);

// EXPERIENCE
fillColor(0.40, 0.40, 0.40);
text(2, 8.5, MARGIN, y, "EXPERIENCE");
fillColor(0, 0, 0);
move(LEAD);
for (const r of EXPERIENCE) {
  text(2, 10.5, MARGIN, y, r.title);
  text(1, 9, W - MARGIN - 6 * r.period.length, y, r.period);
  move(LEAD);
  for (const b of r.bullets) {
    const lines = wrap(b, 95);
    bullet(MARGIN, y - 2);
    text(1, 9.5, MARGIN + 12, y, lines[0]);
    move(LEAD - 1);
    for (let i = 1; i < lines.length; i++) {
      text(1, 9.5, MARGIN + 12, y, lines[i]);
      move(LEAD - 1);
    }
  }
  move(4);
}

// SKILLS
fillColor(0.40, 0.40, 0.40);
text(2, 8.5, MARGIN, y, "SKILLS");
fillColor(0, 0, 0);
move(LEAD);
for (const [label, value] of SKILLS) {
  text(2, 9.5, MARGIN, y, label + ":");
  text(1, 9.5, MARGIN + 92, y, value);
  move(LEAD);
}

// ---- assemble PDF ----
const contentStream = stream.join("\n");
const contentObj = obj(`<< /Length ${Buffer.byteLength(contentStream)} >>\nstream\n${contentStream}\nendstream`);
const fontHelv = obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
const fontHelvBold = obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
const pageObj = obj(
  `<< /Type /Page /Parent 0 0 R /MediaBox [0 0 ${W} ${H}] /Contents ${contentObj} 0 R /Resources << /Font << /F1 ${fontHelv} 0 R /F2 ${fontHelvBold} 0 R >> >> >>`
);
const pagesObj = obj(`<< /Type /Pages /Kids [${pageObj} 0 R] /Count 1 >>`);
const catalogObj = obj(`<< /Type /Catalog /Pages ${pagesObj} 0 R >>`);

// Patch parent ref in pageObj now that we know pagesObj id
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
