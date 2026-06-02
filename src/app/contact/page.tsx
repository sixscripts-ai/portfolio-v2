"use client";

import Section from "@/components/Section";
import { profile } from "@/data/profile";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [body, setBody] = useState("");
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Hello from ${name || "your portfolio"}`
  )}&body=${encodeURIComponent(`${body}\n\n— ${name || ""} (${from || ""})`)}`;

  return (
    <Section eyebrow="Contact" title="Get in touch.">
      <p className="text-[var(--ink-muted)] max-w-2xl mb-10 leading-relaxed">
        Drop a note. I read everything. I&apos;m especially interested in early-stage AI / product
        engineering roles where I can own features end-to-end — UI, retrieval, data model, deploys.
      </p>
        <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailto;
            }}
            className="mt-6 space-y-4"
          >
            <Field label="Your name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border border-[var(--hairline-strong)] rounded-lg px-3 py-2 outline-none focus:border-[var(--volt)] transition-colors"
              />
            </Field>
            <Field label="Reply-to email">
              <input
                type="email"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full bg-transparent border border-[var(--hairline-strong)] rounded-lg px-3 py-2 outline-none focus:border-[var(--volt)] transition-colors"
              />
            </Field>
            <Field label="Message">
              <textarea
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-transparent border border-[var(--hairline-strong)] rounded-lg px-3 py-2 outline-none focus:border-[var(--volt)] transition-colors resize-y"
              />
            </Field>
            <button type="submit" className="btn btn-primary">
              Send via email <ArrowUpRight size={14} />
            </button>
          </form>
        </div>

        <div className="card p-6 flex flex-col gap-3">
          <p className="label">Direct</p>
          <a href={`mailto:${profile.email}`} className="btn justify-between">
            <span className="inline-flex items-center gap-2"><Mail size={14} /> {profile.email}</span>
            <ArrowUpRight size={14} />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn justify-between">
            <span className="inline-flex items-center gap-2"><Github size={14} /> {profile.github.replace("https://github.com/", "")}</span>
            <ArrowUpRight size={14} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn justify-between">
            <span className="inline-flex items-center gap-2"><Linkedin size={14} /> {profile.linkedin.replace("https://www.linkedin.com/in/", "").replace("/", "")}</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label block mb-1.5">{label}</span>
      {children}
    </label>
  );
}
