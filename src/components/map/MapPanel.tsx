"use client";

import { useEffect, useRef, useState } from "react";
import { Truck, Tractor, Warehouse, Store } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stylized, fully simulated route map for the prototype.
 * Renders farm fields, roads, supplier stops and an animated vehicle.
 */
export function MapPanel({
  stops,
  progress = 0,
  className,
  label = "Simulated route · prototype visualization",
}: {
  stops: string[];
  progress?: number; // 0..1 along route
  className?: string;
  label?: string;
}) {
  const W = 760;
  const H = 470;
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const [pt, setPt] = useState({ x: 0, y: 0 });

  const n = stops.length;
  const points = stops.map((_, i) => {
    const x = 90 + (i / (n - 1)) * (W - 190);
    const y = i % 2 === 0 ? 130 : i === n - 1 ? 170 : 320;
    return { x, y: i === n - 1 ? y + 10 : y };
  });

  const d = points.reduce(
    (acc, p, i) =>
      i === 0 ? `M ${p.x} ${p.y}` : `${acc} C ${points[i - 1].x + 60} ${points[i - 1].y + (i % 2 ? 60 : -60)}, ${p.x - 60} ${p.y + (i % 2 ? -60 : 60)}, ${p.x} ${p.y}`,
    ""
  );

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const L = path.getTotalLength();
    setLen(L);
  }, [d]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !len) return;
    const p = path.getPointAtLength(Math.max(0, Math.min(1, progress)) * len);
    setPt({ x: p.x, y: p.y });
  }, [progress, len]);

  const fields = [
    { x: -40, y: 20, w: 200, h: 150, r: -8, c: "#e9f2df" },
    { x: 430, y: -30, w: 260, h: 140, r: 6, c: "#f2efdc" },
    { x: 40, y: 330, w: 240, h: 150, r: 4, c: "#eef4e3" },
    { x: 520, y: 340, w: 250, h: 150, r: -5, c: "#ecf3e1" },
    { x: 250, y: 180, w: 180, h: 120, r: 10, c: "#f4f1e3" },
  ];

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-cream-200 bg-[#FAF9F0] shadow-card", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label="Route map (simulated)">
        {/* fields */}
        {fields.map((f, i) => (
          <g key={i} transform={`rotate(${f.r} ${f.x + f.w / 2} ${f.y + f.h / 2})`}>
            <rect x={f.x} y={f.y} width={f.w} height={f.h} rx={18} fill={f.c} />
            {Array.from({ length: 5 }).map((_, j) => (
              <line key={j} x1={f.x + 14} y1={f.y + 18 + j * 24} x2={f.x + f.w - 14} y2={f.y + 18 + j * 24} stroke="#d7e2c8" strokeWidth="5" strokeLinecap="round" opacity={0.6} />
            ))}
          </g>
        ))}
        {/* water */}
        <ellipse cx={690} cy={80} rx={90} ry={54} fill="#dfeef4" />
        {/* roads */}
        <path d="M -20 380 C 200 340, 420 430, 780 380" stroke="#e6e1cc" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M -20 120 C 220 170, 480 40, 780 130" stroke="#e6e1cc" strokeWidth="10" fill="none" strokeLinecap="round" />

        {/* route: base + animated dash overlay */}
        <path ref={pathRef} d={d} fill="none" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" opacity="0.95" />
        <path d={d} fill="none" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="2 12" className="animate-dash" opacity="0.9" style={{ strokeDasharray: "1 14" }} />

        {/* stops */}
        {stops.map((s, i) => {
          const p = points[i];
          const isBuyer = i === n - 1;
          const isFpo = /fpo/i.test(s);
          return (
            <g key={s}>
              <circle cx={p.x} cy={p.y} r={isBuyer ? 17 : 14} fill={isBuyer ? "#0d2a1d" : "#059669"} stroke="white" strokeWidth="3" />
              <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="800" fill="white">
                {isBuyer ? "B" : isFpo ? "F" : "f"}
              </text>
              <text
                x={p.x}
                y={p.y + (i % 2 === 0 ? -26 : 34)}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="700"
                fill="#10241a"
                style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 5 }}
              >
                {s.length > 26 ? s.slice(0, 26) + "…" : s}
              </text>
            </g>
          );
        })}

        {/* vehicle */}
        <g transform={`translate(${pt.x - 13} ${pt.y - 13})`}>
          <circle r="13" cx="13" cy="13" fill="#1f2937" stroke="white" strokeWidth="2.5" />
        </g>
        <foreignObject x={pt.x - 6.5} y={pt.y - 6.5} width="13" height="13" style={{ overflow: "visible", pointerEvents: "none" }}>
          <Truck className="h-3.5 w-3.5 text-white" />
        </foreignObject>
      </svg>

      {/* legend */}
      <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
        {[
          { icon: <Tractor className="h-3 w-3" />, label: "Farm pickup" },
          { icon: <Warehouse className="h-3 w-3" />, label: "FPO centre" },
          { icon: <Store className="h-3 w-3" />, label: "Buyer" },
        ].map((it) => (
          <span key={it.label} className="flex items-center gap-1 rounded-full border border-cream-200 bg-white/92 px-2 py-1 text-[10.5px] font-semibold text-ink-600 backdrop-blur">
            {it.icon} {it.label}
          </span>
        ))}
      </div>
      <p className="absolute bottom-2.5 right-3 rounded-full bg-forest-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-200">
        {label}
      </p>
    </div>
  );
}
