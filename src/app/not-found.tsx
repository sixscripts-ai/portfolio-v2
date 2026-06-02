import Link from "next/link";

export const metadata = { title: "404 · Not found" };

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 flex flex-col items-center text-center">
      <p className="label mb-4">404</p>
      <h1 className="font-display text-4xl sm:text-5xl tracking-tight font-semibold mb-4">
        Page not found.
      </h1>
      <p className="text-[var(--ink-muted)] max-w-md leading-relaxed mb-8">
        Some projects are still in progress — this page might be one of them.
        Try the home page or the projects list.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">Home</Link>
        <Link href="/projects" className="btn">All projects</Link>
      </div>
    </div>
  );
}
