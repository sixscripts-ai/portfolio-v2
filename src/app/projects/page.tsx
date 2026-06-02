import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <Section eyebrow="Projects" title="Shipped projects.">
      <p className="text-[var(--ink-muted)] max-w-2xl mb-10 leading-relaxed">
        Every project includes architecture docs, eval cases, failure handling, and a
        verification checklist. Proof isn&apos;t a feature — it&apos;s the default.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
