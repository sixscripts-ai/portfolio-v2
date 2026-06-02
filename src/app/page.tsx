import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import Terminal from "@/components/Terminal";
import DemoReel from "@/components/DemoReel";
import { projects } from "@/data/projects";
import { evidence } from "@/data/evidence";
import { Monitor, Server, Brain, Database, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";

const evidenceIcon: Record<string, React.ReactNode> = {
  Frontend: <Monitor size={16} />,
  Backend: <Server size={16} />,
  "AI systems": <Brain size={16} />,
  Data: <Database size={16} />,
  Operations: <TerminalIcon size={16} />,
};

export default function Home() {
  const featured = projects.slice(0, 4);
  return (
    <>
      <Hero />
      <Section
        eyebrow="01 / Featured projects"
        title={<>Evidence-first projects.<br /><span className="text-[var(--ink-muted)]">Real systems, not slideware.</span></>}
        cta={{ href: "/projects", label: "All projects" }}
      >
        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </Section>

      <Section eyebrow="02 / Build log" title="What it looks like to ship.">
        <p className="text-[var(--ink-muted)] max-w-2xl mb-8 leading-relaxed">
          A simulated build trace — clone, install, test, deploy. The commands and checkpoints that
          happen every time I ship something real.
        </p>
        <Terminal />
      </Section>

      <Section eyebrow="03 / Demo" title="See the full experience.">
        <p className="text-[var(--ink-muted)] max-w-2xl mb-10 leading-relaxed">
          An auto-playing walkthrough of the portfolio — hero, roles, build log, projects, and
          evidence. Each scene is a live view of what this site does.
        </p>
        <DemoReel />
      </Section>

      <Section
        eyebrow="04 / Technical evidence"
        title="Skills and the projects that use them."
        cta={{ href: "/proof", label: "Full proof page" }}
      >
        <p className="text-[var(--ink-muted)] max-w-2xl mb-10 leading-relaxed">
          Every capability organized by area. Each item is something I&apos;ve built and shipped — no hand-waving.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {evidence.map((e) => (
            <div key={e.area} className="card p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[var(--volt)]">{evidenceIcon[e.area]}</span>
                <p className="label">{e.area}</p>
              </div>
              <p className="text-xs text-[var(--ink-faint)] mb-3 leading-relaxed">{e.tagline}</p>
              <ul className="text-sm text-[var(--ink-muted)] space-y-1.5">
                {e.items.slice(0, 4).map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--volt)] mt-0.5">›</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="05 / Interested" title="Where I fit best.">
        <div className="card p-8 prose-tech">
          <p>
            <strong>Best fit:</strong> early-stage AI / product engineering. I own the whole stack
            end-to-end — UI, retrieval and agent layers, data model, deploys, evals.
          </p>
          <p>
            <strong>What you get:</strong> projects that ship with eval harnesses, failure handling,
            audit logs, and a verification checklist — not a demo video and a prayer.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Get in touch →</Link>
            <Link href="/projects/ghostssh" className="btn">Read the GhostSSH case study</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
