import { profile } from "@/data/profile";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--hairline)] mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-[var(--ink-faint)]">
            Built solo · No template · Evidence over noise
          </p>
          <p className="text-sm text-[var(--ink-muted)] mt-1">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            <Github size={14} /> GitHub
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={14} /> LinkedIn
          </a>
          <a className="btn" href={`mailto:${profile.email}`}>
            <Mail size={14} /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}
