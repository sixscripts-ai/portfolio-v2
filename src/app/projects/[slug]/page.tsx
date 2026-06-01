import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import Section from "@/components/Section";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import CodeBlock from "@/components/CodeBlock";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: p.oneLiner };
}

const STATUS_COLOR = { shipped: "var(--volt)", active: "var(--cyan)", concept: "var(--amber)" } as const;

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return notFound();

  return (
    <>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
          <ArrowLeft size={14} /> All projects
        </Link>
      </div>

      <Section
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: STATUS_COLOR[p.status], boxShadow: `0 0 10px ${STATUS_COLOR[p.status]}` }}
            />
            {p.status} project
          </span>
        }
        title={p.name}
      >
        <p className="text-lg text-[var(--ink-muted)] max-w-3xl leading-relaxed">{p.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
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
      </Section>

      {p.problem && (
        <Section id="case" eyebrow="Problem" title="What it solves.">
          <div className="card p-8 prose-tech">
            <p>{p.problem}</p>
          </div>
        </Section>
      )}

      <Section eyebrow="What I built" title="The specific parts I implemented.">
        <div className="grid sm:grid-cols-2 gap-4">
          {p.built.map((b) => (
            <div key={b} className="card p-5 flex gap-3">
              <span className="text-[var(--volt)] font-mono">›</span>
              <span className="text-[var(--ink-muted)]">{b}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="What I owned" title="My responsibility surface.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {p.owned.map((o) => (
            <div key={o} className="card p-5">
              <p className="text-sm text-[var(--ink)]">{o}</p>
            </div>
          ))}
        </div>
      </Section>

      {p.architecture && (
        <Section id="architecture" eyebrow="Architecture" title="How data moves through the system.">
          <ArchitectureDiagram nodes={p.architecture.nodes} edges={p.architecture.edges} accent={p.accent} />
        </Section>
      )}

      {p.screenshots && p.screenshots.length > 0 && (
        <Section eyebrow="Screenshots" title="What the system looks like.">
          <div className="grid sm:grid-cols-2 gap-4">
            {p.screenshots.map((s) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                className="card w-full h-auto"
              />
            ))}
          </div>
        </Section>
      )}

      {p.agentWorkflow && (
        <Section eyebrow="Agent workflow" title="How it reasons, chooses, and verifies.">
          <ol className="space-y-3">
            {p.agentWorkflow.map((step, i) => (
              <li key={i} className="card p-5 flex gap-4">
                <span className="font-mono text-[var(--volt)] text-sm shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[var(--ink-muted)] leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {p.dataModel && (
        <Section eyebrow="Data model" title="What entities the system tracks.">
          <div className="grid md:grid-cols-2 gap-4">
            {p.dataModel.map((e) => (
              <CodeBlock key={e.name} lang={e.name}>
                {e.fields.map((f) => `- ${f}`).join("\n")}
              </CodeBlock>
            ))}
          </div>
        </Section>
      )}

      {p.failureHandling && (
        <Section eyebrow="Failure handling" title="What happens when something breaks.">
          <div className="grid md:grid-cols-2 gap-4">
            {p.failureHandling.map((f, i) => (
              <div key={i} className="card p-5">
                <p className="text-sm text-[var(--danger)] font-mono mb-2">{f.case}</p>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{f.behavior}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {p.verification && (
        <Section eyebrow="Verification" title="How I tested or evaluated it.">
          <ul className="grid sm:grid-cols-2 gap-3">
            {p.verification.map((v, i) => (
              <li key={i} className="card p-4 text-sm text-[var(--ink-muted)] flex gap-2">
                <span className="text-[var(--volt)]">✓</span>
                {v}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {p.evals && (
        <Section id="evals" eyebrow="Eval harness" title="Cases, expected, actual.">
          <div className="space-y-3">
            {p.evals.map((c, i) => {
              const color =
                c.status === "pass" ? "var(--volt)" : c.status === "partial" ? "var(--amber)" : "var(--danger)";
              return (
                <div key={i} className="card p-5">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <span
                      className="font-mono text-[11px] uppercase tracking-widest px-2 py-1 rounded-full border"
                      style={{ color, borderColor: color }}
                    >
                      {c.status}
                    </span>
                  </div>
                  <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div>
                      <dt className="label mb-0.5">Input</dt>
                      <dd className="text-[var(--ink-muted)]">{c.input}</dd>
                    </div>
                    <div>
                      <dt className="label mb-0.5">Expected</dt>
                      <dd className="text-[var(--ink-muted)]">{c.expected}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="label mb-0.5">Actual</dt>
                      <dd className="text-[var(--ink)]">{c.actual}</dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {p.nextImprovements && (
        <Section eyebrow="Next improvements" title="Known gaps & next moves.">
          <ul className="grid sm:grid-cols-2 gap-3">
            {p.nextImprovements.map((n, i) => (
              <li key={i} className="card p-4 text-sm text-[var(--ink-muted)] flex gap-2">
                <span className="text-[var(--cyan)]">→</span>
                {n}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
