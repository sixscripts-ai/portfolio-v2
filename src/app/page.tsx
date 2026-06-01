import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import Terminal from "@/components/Terminal";
import { projects } from "@/data/projects";
import { evidence } from "@/data/evidence";
import Link from "next/link";

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
        <Terminal />
      </Section>

      <Section
        eyebrow="03 / Technical evidence"
        title="Skills, with the proof attached."
        cta={{ href: "/proof", label: "Full proof page" }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {evidence.map((e) => (
            <div key={e.area} className="card p-5">
              <p className="label mb-2">{e.area}</p>
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

      <Section eyebrow="04 / What's next" title="Hiring me looks like this.">
        <div className="card p-8 prose-tech">
          <p>
            <strong>Best fit:</strong> early-stage AI / product engineering. I want to own a real
            slice end-to-end — UI, retrieval / agent layer, data model, deploys.
          </p>
          <p>
            <strong>Strongest signal:</strong> projects that ship with eval harnesses, failure
            handling, and audit logs — not demo videos.
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
