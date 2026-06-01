import Link from "next/link";
import clsx from "clsx";

export default function Section({
  id,
  eyebrow,
  title,
  children,
  className,
  cta,
}: {
  id?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  cta?: { href: string; label: string };
}) {
  return (
    <section id={id} className={clsx("max-w-6xl mx-auto px-5 sm:px-8 py-16", className)}>
      {(eyebrow || title) && (
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            {eyebrow && <p className="label mb-2">{eyebrow}</p>}
            {title && <h2 className="font-display text-3xl sm:text-4xl tracking-tight font-semibold">{title}</h2>}
          </div>
          {cta && (
            <Link href={cta.href} className="text-sm text-[var(--ink-muted)] hover:text-[var(--volt)] transition-colors">
              {cta.label} →
            </Link>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
