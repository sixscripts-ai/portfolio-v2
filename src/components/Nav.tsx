"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, Github } from "lucide-react";
import clsx from "clsx";
import { profile } from "@/data/profile";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/proof", label: "Proof" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

function trapFocus(container: HTMLElement, e: KeyboardEvent) {
  const focusable = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.key === "Tab") {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const firstLink = panel.querySelector<HTMLElement>('a[href], button');
    firstLink?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      trapFocus(panel, e);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--hairline)] backdrop-blur-md bg-[rgba(7,8,13,0.7)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-[13px] tracking-[0.16em] uppercase flex items-center gap-2"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--volt)] shadow-[0_0_12px_var(--volt)]" />
          ashton<span className="text-[var(--ink-faint)]">.</span>aschenbrener
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "px-3 py-2 rounded-md text-sm transition-colors relative",
                  active ? "text-[var(--ink)]" : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                )}
              >
                {active && (
                  <span className="absolute inset-x-2 -bottom-px h-px bg-[var(--volt)]" aria-hidden />
                )}
                {l.label}
              </Link>
            );
          })}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 p-2 rounded-md text-[var(--ink-muted)] hover:text-[var(--volt)] transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
        </nav>
        <button
          ref={toggleRef}
          className="md:hidden p-2 text-[var(--ink-muted)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="nav-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div
          ref={panelRef}
          id="nav-menu"
          className="md:hidden border-t border-[var(--hairline)] bg-[var(--bg-raised)]"
        >
          <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col gap-1">
            {links.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className="px-3 py-2 rounded-md text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-white/[0.03]"
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href={profile.github}
              className="px-3 py-2 rounded-md text-sm text-[var(--ink-muted)] flex items-center gap-2"
            >
              <Github size={14} /> GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
