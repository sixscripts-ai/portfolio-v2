"use client";

import { useMemo } from "react";

type Node = { id: string; label: string; lane: 0 | 1 | 2 };
type Edge = { from: string; to: string; label?: string };

type Props = {
  nodes: Node[];
  edges: Edge[];
  accent?: "volt" | "cyan" | "magenta" | "amber";
};

const ACCENTS = {
  volt: "#b8ff3a",
  cyan: "#5ad6ff",
  magenta: "#ff5fa2",
  amber: "#ffb547",
} as const;

const CARD_W = 220;
const CARD_H = 64;
const COL_GAP = 80;
const ROW_GAP = 36;
const PAD_X = 16;
const PAD_Y = 16;

export default function ArchitectureDiagram({ nodes, edges, accent = "volt" }: Props) {
  const accentColor = ACCENTS[accent];

  const layout = useMemo(() => {
    const lanes: Record<number, Node[]> = { 0: [], 1: [], 2: [] };
    nodes.forEach((n) => lanes[n.lane].push(n));
    const positions: Record<string, { x: number; y: number }> = {};
    Object.entries(lanes).forEach(([laneStr, items]) => {
      const lane = Number(laneStr);
      items.forEach((n, i) => {
        positions[n.id] = {
          x: PAD_X + lane * (CARD_W + COL_GAP),
          y: PAD_Y + i * (CARD_H + ROW_GAP),
        };
      });
    });
    const maxRows = Math.max(...Object.values(lanes).map((l) => l.length));
    const width = PAD_X * 2 + 3 * CARD_W + 2 * COL_GAP;
    const height = PAD_Y * 2 + maxRows * CARD_H + (maxRows - 1) * ROW_GAP;
    return { positions, width, height };
  }, [nodes]);

  const edgePaths = useMemo(() => {
    return edges.map((e, i) => {
      const a = layout.positions[e.from];
      const b = layout.positions[e.to];
      if (!a || !b) return null;
      const ax = a.x + CARD_W;
      const ay = a.y + CARD_H / 2;
      const bx = b.x;
      const by = b.y + CARD_H / 2;
      const same = e.from === e.to;
      const reverse = bx < ax;
      let d: string;
      if (reverse) {
        const sx = a.x;
        const ex = b.x + CARD_W;
        const midY = Math.max(ay, by) + 30;
        d = `M ${sx} ${ay} C ${sx - 60} ${ay}, ${ex + 60} ${midY}, ${ex} ${by}`;
      } else if (same) {
        d = `M ${ax} ${ay} C ${ax + 60} ${ay - 30}, ${ax + 60} ${ay + 30}, ${ax} ${ay + 1}`;
      } else {
        const cx = (ax + bx) / 2;
        d = `M ${ax} ${ay} C ${cx} ${ay}, ${cx} ${by}, ${bx} ${by}`;
      }
      return { d, label: e.label, key: `${e.from}-${e.to}-${i}`, mid: { x: (ax + bx) / 2, y: (ay + by) / 2 } };
    });
  }, [edges, layout.positions]);

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-[var(--hairline)] bg-[var(--bg-raised)] p-2">
      <svg
        width={layout.width}
        height={layout.height}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        className="block min-w-full"
        role="img"
        aria-label="Architecture diagram"
      >
        <defs>
          <marker
            id={`arrow-${accent}`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={accentColor} />
          </marker>
          <linearGradient id={`card-${accent}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
          </linearGradient>
        </defs>

        {/* edges */}
        {edgePaths.map(
          (p, i) =>
            p && (
              <g key={p.key}>
                <path
                  d={p.d}
                  fill="none"
                  stroke={accentColor}
                  strokeOpacity="0.55"
                  strokeWidth="1.4"
                  strokeDasharray="4 6"
                  markerEnd={`url(#arrow-${accent})`}
                  style={{ animation: `dash 1.6s linear infinite`, animationDelay: `${i * 0.08}s` }}
                />
                {p.label && (
                  <text
                    x={p.mid.x}
                    y={p.mid.y - 4}
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="10"
                    fill="#9aa3b2"
                  >
                    {p.label}
                  </text>
                )}
              </g>
            )
        )}

        {/* nodes */}
        {nodes.map((n) => {
          const p = layout.positions[n.id];
          if (!p) return null;
          const lines = n.label.split("\n");
          return (
            <g key={n.id} transform={`translate(${p.x},${p.y})`}>
              <rect
                width={CARD_W}
                height={CARD_H}
                rx="10"
                fill={`url(#card-${accent})`}
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1"
              />
              <rect width="3" height={CARD_H} fill={accentColor} opacity="0.85" />
              <text x="14" y={lines.length === 1 ? 38 : 26} fill="#e7ecf3" fontSize="13" fontWeight="600">
                {lines[0]}
              </text>
              {lines[1] && (
                <text x="14" y="46" fill="#9aa3b2" fontSize="11" fontFamily="ui-monospace, SFMono-Regular, Menlo">
                  {lines[1]}
                </text>
              )}
              {lines[2] && (
                <text x="14" y="58" fill="#9aa3b2" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo">
                  {lines[2]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
