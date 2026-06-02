"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Github } from "lucide-react";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg absolute inset-0 pointer-events-none" aria-hidden />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--volt)] shadow-[0_0_12px_var(--volt)] animate-pulse" />
          <span className="label">Available · Open to roles</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-5xl sm:text-7xl tracking-tight font-semibold leading-[1.05]"
        >
          {profile.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-3 text-2xl sm:text-3xl shimmer-text font-display caret"
        >
          {profile.hero.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-8 max-w-2xl text-[17px] leading-relaxed text-[var(--ink-muted)]"
        >
          {profile.hero.pitch}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-3 max-w-2xl text-[15px] text-[var(--ink-faint)]"
        >
          {profile.hero.looking}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link href="/projects" className="btn btn-primary">
            View projects <ArrowRight size={14} />
          </Link>
          <Link href="/resume" className="btn">
            View resume
          </Link>
          <a href={profile.resumePath} download className="btn">
            <Download size={14} /> Download resume
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn">
            <Github size={14} /> GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {profile.stack.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.04 }}
              className="chip"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
