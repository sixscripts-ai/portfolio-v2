export default function CodeBlock({ children, lang }: { children: string; lang?: string }) {
  return (
    <div className="card overflow-hidden">
      {lang && (
        <div className="px-4 py-2 border-b border-[var(--hairline)] flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--ink-faint)]">{lang}</span>
        </div>
      )}
      <pre className="px-5 py-4 font-mono text-[12.5px] leading-6 text-[var(--ink-muted)] overflow-x-auto whitespace-pre">
        {children}
      </pre>
    </div>
  );
}
