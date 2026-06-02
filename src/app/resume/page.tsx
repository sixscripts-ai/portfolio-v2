"use client";

import Section from "@/components/Section";
import { profile } from "@/data/profile";
import { summary, projectsBullets, experience, skillsGroups } from "@/data/resume";
import { Download, Printer } from "lucide-react";

export default function ResumePage() {
  return (
    <Section eyebrow="Resume" title="Selected technical work, project evidence, and systems experience.">
      <div className="flex flex-wrap gap-3 mb-8 no-print">
        <a href={profile.resumePath} download className="btn btn-primary">
          <Download size={14} /> Download PDF
        </a>
        <button onClick={() => window.print()} className="btn">
          <Printer size={14} /> Print
        </button>
      </div>

      <article className="card p-8 sm:p-10 prose-tech">
        <header className="border-b border-[var(--hairline)] pb-5 mb-6">
          <h1 className="font-display text-3xl tracking-tight">{profile.name}</h1>
          <p className="text-[var(--ink-muted)] mt-1">{profile.role} · {profile.location}</p>
          <p className="font-mono text-xs text-[var(--ink-faint)] mt-2">
            {profile.email} · {profile.github.replace("https://github.com/", "github.com/")} · {profile.linkedin.replace("https://www.linkedin.com/in/", "linkedin.com/in/").replace("/", "")}
          </p>
        </header>

        <section className="mb-6">
          <h2 className="label mb-2">Summary</h2>
          <p>{summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="label mb-2">Projects</h2>
          <ul className="space-y-2">
            {projectsBullets.map((b, i) => (
              <li key={i} className="flex gap-2 leading-relaxed">
                <span className="text-[var(--volt)] mt-0.5">›</span>
                <span className="text-[var(--ink)]">{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="label mb-2">Experience</h2>
          {experience.map((r) => (
            <div key={r.org + r.title} className="mb-4">
              <p className="font-semibold">{r.title} · <span className="text-[var(--ink-muted)] font-normal">{r.org}</span></p>
              <p className="font-mono text-xs text-[var(--ink-faint)] mb-2">{r.period}</p>
              <ul className="space-y-1.5">
                {r.bullets.map((b, i) => (
                  <li key={i} className="text-[var(--ink-muted)] text-sm flex gap-2 leading-relaxed">
                    <span className="text-[var(--volt)] mt-0.5">›</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="label mb-2">Skills</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {skillsGroups.map((g) => (
              <div key={g.label}>
                <p className="text-sm font-semibold mb-1">{g.label}</p>
                <p className="text-sm text-[var(--ink-muted)]">{g.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </Section>
  );
}
