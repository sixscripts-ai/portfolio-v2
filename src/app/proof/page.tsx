import Section from "@/components/Section";
import { evidence } from "@/data/evidence";
import { projects } from "@/data/projects";
import { Monitor, Server, Brain, Database, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";

const evidenceIcon: Record<string, React.ReactNode> = {
  Frontend: <Monitor size={16} />,
  Backend: <Server size={16} />,
  "AI systems": <Brain size={16} />,
  Data: <Database size={16} />,
  Operations: <TerminalIcon size={16} />,
};

export const metadata = { title: "Proof" };

export default function ProofPage() {
  return (
    <>
      <Section eyebrow="Proof" title="Receipts, mapped to projects.">
        <p className="text-[var(--ink-muted)] max-w-2xl mb-10 leading-relaxed">
          Five capability areas. Every item is something I&apos;ve built and shipped.
          No hand-waving, no hypotheticals.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {evidence.map((cat) => (
            <div key={cat.area} className="card p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[var(--volt)]">{evidenceIcon[cat.area]}</span>
                <p className="label">{cat.area}</p>
              </div>
              <p className="text-xs text-[var(--ink-faint)] mb-3 leading-relaxed">{cat.tagline}</p>
              <ul className="space-y-2">
                {cat.items.map((i) => (
                  <li key={i} className="text-sm text-[var(--ink-muted)] flex gap-2 leading-relaxed">
                    <span className="text-[var(--volt)] mt-0.5">›</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Where to see it" title="Each skill, mapped to a project.">
        <p className="text-[var(--ink-muted)] max-w-2xl mb-8 leading-relaxed">
          Browse the full portfolio — every project ships with architecture docs, eval cases,
          and a verification checklist.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="card card-glow p-5 block"
            >
              <p className="label mb-1">{p.tags.join(" · ")}</p>
              <p className="text-base font-semibold">{p.name}</p>
              <p className="text-sm text-[var(--ink-muted)] mt-2 leading-relaxed">{p.oneLiner}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
