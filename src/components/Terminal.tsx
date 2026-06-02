"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const lines = [
  "$ git clone github.com/sixscripts-ai/portfolio-v2",
  "Receiving objects: 100% · done.",
  "$ pnpm install && pnpm dev",
  "✓ next.js 15 · ready at http://localhost:3000",
  "$ npm run test",
  "✓ 12 / 12 tests passed · 0 failures",
  "$ git push origin main",
  "▮ Vercel: deployment complete · 200 OK",
];

export default function Terminal() {
  const [shown, setShown] = useState<string[]>([]);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(lines.slice(0, i));
      if (i >= lines.length) clearInterval(id);
    }, 400);
    return () => clearInterval(id);
  }, [inView]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="card overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--hairline)] bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--danger)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--amber)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--volt)]" />
        <span className="ml-3 font-mono text-[11px] text-[var(--ink-faint)] tracking-wider">
          ~/portfolio-v2 — zsh
        </span>
      </div>
      <pre className="font-mono text-[13px] leading-7 px-5 py-5 text-[var(--ink)] whitespace-pre-wrap min-h-[260px]">
        {shown.map((l, i) => {
          const isCmd = l.startsWith("$");
          const isOk = l.startsWith("✓") || l.startsWith("→") || l.startsWith("▮");
          return (
            <span
              key={i}
              className="block"
              style={{ color: isCmd ? "#e7ecf3" : isOk ? "#b8ff3a" : "#9aa3b2" }}
            >
              {l}
            </span>
          );
        })}
        {shown.length < lines.length && <span className="caret" aria-hidden />}
      </pre>
    </motion.div>
  );
}
