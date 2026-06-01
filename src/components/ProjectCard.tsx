"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import clsx from "clsx";

const STATUS_DOT: Record<Project["status"], string> = {
  shipped: "bg-[var(--volt)] shadow-[0_0_10px_var(--volt)]",
  active: "bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)]",
  concept: "bg-[var(--amber)] shadow-[0_0_10px_var(--amber)]",
};

const ACCENT_BAR: Record<NonNullable<Project["accent"]>, string> = {
  volt: "from-[var(--volt)] via-[var(--volt)]/40 to-transparent",
  cyan: "from-[var(--cyan)] via-[var(--cyan)]/40 to-transparent",
  magenta: "from-[var(--magenta)] via-[var(--magenta)]/40 to-transparent",
  amber: "from-[var(--amber)] via-[var(--amber)]/40 to-transparent",
};

export default function ProjectCard({ p, index = 0 }: { p: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="card card-glow p-6 relative overflow-hidden group"
    >
      <div className={clsx("absolute inset-x-0 top-0 h-px bg-gradient-to-r", ACCENT_BAR[p.accent])} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={clsx("inline-block w-1.5 h-1.5 rounded-full", STATUS_DOT[p.status])} />
            <span className="label">{p.status}</span>
          </div>
          <Link href={`/projects/${p.slug}`} className="text-xl font-semibold tracking-tight hover:text-[var(--volt)] transition-colors">
            {p.name}
          </Link>
          <p className="text-sm text-[var(--ink-muted)] mt-2 leading-relaxed">{p.oneLiner}</p>
        </div>
        <Link
          href={`/projects/${p.slug}`}
          className="shrink-0 p-2 text-[var(--ink-muted)] group-hover:text-[var(--volt)] transition-colors"
          aria-label={`Open ${p.name}`}
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>

      <div className="mt-5">
        <p className="label mb-2">What I built</p>
        <ul className="text-sm text-[var(--ink-muted)] grid sm:grid-cols-2 gap-y-1 gap-x-4">
          {p.built.map((b) => (
            <li key={b} className="flex gap-2 leading-relaxed">
              <span className="text-[var(--volt)] mt-0.5">›</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <p className="label mb-2">Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {p.links.map((l) => (
          <a
            key={l.label + l.href}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noreferrer" : undefined}
            className="chip chip-volt hover:bg-[var(--volt)] hover:text-black transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
    </motion.div>
  );
}
