import Section from "@/components/Section";
import { evidence } from "@/data/evidence";
import { projects } from "@/data/projects";
import Link from "next/link";

export const metadata = { title: "Proof" };

export default function ProofPage() {
  return (
    <>
      <Section eyebrow="Proof" title="Skills, organized like a resume.">
        <p className="text-[var(--ink-muted)] max-w-2xl mb-10">
          Every claim links to a project where I implemented it. No hand-waving.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {evidence.map((cat) => (
            <div key={cat.area} className="card p-6">
              <p className="label mb-3">{cat.area}</p>
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
