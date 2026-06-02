"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Server, Brain, Database, Terminal as TerminalIcon } from "lucide-react";

interface Scene {
  id: string;
  label: string;
  node: React.ReactNode;
}

const INTERVAL_MS = 4500;

function HeroScene() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-2"
      >
        <span className="chip chip-volt">product engineer</span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="font-['--font-display'] text-2xl md:text-3xl font-semibold text-[var(--ink)] leading-tight"
      >
        Ashton Aschenbrener
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-[13px] text-[var(--ink-muted)] mt-2 max-w-sm leading-relaxed"
      >
        I design and ship production retrieval systems, agent workflows, and evaluation infrastructure.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex gap-3 mt-5"
      >
        <span className="btn btn-primary text-xs py-1.5 px-3">Get in touch →</span>
        <span className="btn text-xs py-1.5 px-3">View projects</span>
      </motion.div>
    </div>
  );
}

const roles = [
  { title: "Product engineer", desc: "Own features end-to-end — concept through deploy.", accent: "var(--volt)" },
  { title: "AI systems", desc: "Retrieval, agents, evals, and the infrastructure around them.", accent: "var(--cyan)" },
  { title: "Full-stack", desc: "UI, data model, APIs, and ops — no handoffs.", accent: "var(--magenta)" },
];

function FitScene() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="label mb-4"
      >
        Where I fit best
      </motion.p>
      <div className="flex flex-wrap gap-3 justify-center max-w-sm">
        {roles.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 * i }}
            className="card p-4 w-[160px]"
            style={{ borderColor: `color-mix(in srgb, ${r.accent} 30%, transparent)` }}
          >
            <div className="w-2 h-2 rounded-full mb-2" style={{ background: r.accent }} />
            <p className="text-sm font-medium text-[var(--ink)] mb-1">{r.title}</p>
            <p className="text-[11px] text-[var(--ink-faint)] leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const terminalLines = [
  { text: "$ git clone github.com/sixscripts-ai/portfolio-v2", cmd: true },
  { text: "Receiving objects: 100% · done.", cmd: false },
  { text: "$ pnpm install && pnpm dev", cmd: true },
  { text: "✓ next.js 15 · ready at http://localhost:3000", cmd: false },
  { text: "$ npm run test", cmd: true },
  { text: "✓ 12 / 12 tests passed · 0 failures", cmd: false },
  { text: "$ git push origin main", cmd: true },
  { text: "▮ Vercel: deployment complete · 200 OK", cmd: false },
];

function TerminalScene() {
  const [shown, setShown] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      setShown((p) => Math.min(p + 1, terminalLines.length));
    }, 350);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col justify-center h-full px-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="label mb-3"
      >
        Build log · Terminal
      </motion.p>
      <div className="card overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[var(--hairline)] bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full bg-[var(--danger)]" />
          <span className="w-2 h-2 rounded-full bg-[var(--amber)]" />
          <span className="w-2 h-2 rounded-full bg-[var(--volt)]" />
          <span className="ml-2 font-mono text-[10px] text-[var(--ink-faint)] tracking-wider">
            ~/portfolio-v2 — zsh
          </span>
        </div>
        <pre className="font-mono text-[12px] leading-6 px-4 py-3 text-[var(--ink)] whitespace-pre-wrap min-h-[100px]">
          {terminalLines.slice(0, shown).map((l, i) => (
            <span
              key={i}
              className="block"
              style={{ color: l.cmd ? "#e7ecf3" : l.text.startsWith("✓") || l.text.includes("▮") ? "#b8ff3a" : "#9aa3b2" }}
            >
              {l.text}
            </span>
          ))}
          {shown < terminalLines.length && <span className="caret" aria-hidden />}
        </pre>
      </div>
    </div>
  );
}

const projectFeatures = [
  { name: "GhostSSH", accent: "var(--volt)", desc: "Agentic job application system" },
  { name: "ICT Knowledge Engine", accent: "var(--cyan)", desc: "Ontology-driven financial knowledge" },
  { name: "EvalBench", accent: "var(--magenta)", desc: "Cross-provider AI evaluation" },
];

function ProjectsScene() {
  return (
    <div className="flex flex-col justify-center h-full px-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="label mb-4"
      >
        Featured projects
      </motion.p>
      <div className="flex flex-wrap gap-3 justify-center max-w-sm mx-auto">
        {projectFeatures.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 * i }}
            className="card p-4 w-[170px] cursor-default"
            style={{ borderColor: `color-mix(in srgb, ${p.accent} 25%, transparent)` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ background: p.accent }} />
              <p className="text-sm font-medium text-[var(--ink)] truncate">{p.name}</p>
            </div>
            <p className="text-[11px] text-[var(--ink-faint)] leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const evidenceAreas = [
  { icon: <Monitor size={14} />, label: "Frontend" },
  { icon: <Server size={14} />, label: "Backend" },
  { icon: <Brain size={14} />, label: "AI systems" },
  { icon: <Database size={14} />, label: "Data" },
  { icon: <TerminalIcon size={14} />, label: "Operations" },
];

function EvidenceScene() {
  return (
    <div className="flex flex-col justify-center h-full px-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="label mb-4"
      >
        Skills &amp; evidence
      </motion.p>
      <div className="flex flex-wrap gap-2.5 justify-center max-w-xs mx-auto">
        {evidenceAreas.map((e, i) => (
          <motion.div
            key={e.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * i }}
            className="card flex items-center gap-2 px-3.5 py-2.5 cursor-default"
          >
            <span className="text-[var(--volt)]">{e.icon}</span>
            <span className="text-xs font-medium text-[var(--ink-muted)] tracking-wide">{e.label}</span>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="text-[11px] text-[var(--ink-faint)] text-center mt-4"
      >
        5 areas · 20+ shipped capabilities
      </motion.p>
    </div>
  );
}

const scenes: Scene[] = [
  { id: "hero", label: "Hero", node: <HeroScene /> },
  { id: "fit", label: "Fit", node: <FitScene /> },
  { id: "terminal", label: "Build", node: <TerminalScene /> },
  { id: "projects", label: "Projects", node: <ProjectsScene /> },
  { id: "evidence", label: "Evidence", node: <EvidenceScene /> },
];

export default function DemoReel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % scenes.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div className="w-full max-w-2xl mx-auto" role="region" aria-label="Portfolio demo reel">
      {/* Browser frame */}
      <div className="card overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[var(--hairline)] bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--danger)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--amber)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--volt)]" />
          </div>
          <div className="flex-1 flex justify-center min-w-0">
            <span className="px-3 py-1 rounded-md bg-white/[0.04] font-mono text-[10px] text-[var(--ink-faint)] truncate max-w-[200px]">
              ashtonaschenbrener-v2.vercel.app
            </span>
          </div>
          <div className="w-12" />
        </div>

        {/* Scene container */}
        <div className="relative h-[340px] md:h-[380px] overflow-hidden bg-[var(--bg-raised)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={scenes[active].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {scenes[active].node}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-3 px-1">
        <div className="flex items-center gap-2">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setActive(i); setPaused(true); }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === active
                  ? "bg-[var(--volt)] w-5"
                  : "bg-[var(--hairline-strong)] hover:bg-[var(--ink-faint)]"
              }`}
              aria-label={`Go to scene: ${s.label}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[var(--ink-faint)] tracking-wider uppercase">
            {scenes[active].label}
          </span>
          <button
            onClick={() => setPaused((p) => !p)}
            className="chip text-[10px] py-1 px-2.5 hover:border-[var(--volt)] hover:text-[var(--volt)] transition-colors"
            aria-label={paused ? "Resume demo" : "Pause demo"}
          >
            {paused ? "▶ Play" : "❚❚ Pause"}
          </button>
        </div>
      </div>
    </div>
  );
}
