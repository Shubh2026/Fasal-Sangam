"use client";

import { useEffect, useRef, useState } from "react";
import {
  ScanSearch, SlidersHorizontal, Layers, Route, Check, Loader2, Wheat,
  Package, Award, MapPin, CalendarDays, IndianRupee,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MatchResult {
  analyzed: number;
  compatible: number;
  clusters: number;
  routeKm: number;
  score: number;
}

const DEFAULT_RESULT: MatchResult = { analyzed: 18, compatible: 7, clusters: 3, routeKm: 68, score: 94 };

const stages = [
  { id: "scan", label: "Scanning supply network", icon: ScanSearch, hint: "Reading farmer & FPO listings in Punjab belt" },
  { id: "score", label: "Scoring compatibility", icon: SlidersHorizontal, hint: "Crop · quantity · quality · location · harvest window · price" },
  { id: "cluster", label: "Building supply clusters", icon: Layers, hint: "Grouping near-by suppliers into pooled lots" },
  { id: "route", label: "Optimizing logistics route", icon: Route, hint: "Minimizing distance and cost per kg" },
];

function useCountUp(target: number, active: boolean, duration = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return v;
}

const criteria = [
  { label: "Crop — Tomato", icon: Wheat },
  { label: "Quantity — 1,000 kg", icon: Package },
  { label: "Quality — Grade A", icon: Award },
  { label: "Location — within 60 km", icon: MapPin },
  { label: "Harvest — 12–15 Sep", icon: CalendarDays },
  { label: "Price — ≤ ₹34/kg", icon: IndianRupee },
];

export function MatchingSimulation({
  run,
  result = DEFAULT_RESULT,
  onComplete,
  className,
}: {
  run: boolean;
  result?: MatchResult;
  onComplete?: (r: MatchResult) => void;
  className?: string;
}) {
  const [stage, setStage] = useState(-1); // -1 idle, 0..3 running, 4 done
  const triggered = useRef(false);

  const analyzed = useCountUp(result.analyzed, stage >= 0);
  const compatible = useCountUp(result.compatible, stage >= 1);
  const clusters = useCountUp(result.clusters, stage >= 2);
  const routeKm = useCountUp(result.routeKm, stage >= 3);

  useEffect(() => {
    if (!run || triggered.current) return;
    triggered.current = true;
    setStage(0);
    const t1 = setTimeout(() => setStage(1), 1300);
    const t2 = setTimeout(() => setStage(2), 2800);
    const t3 = setTimeout(() => setStage(3), 4200);
    const t4 = setTimeout(() => { setStage(4); onComplete?.(result); }, 5600);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [run, onComplete, result]);

  useEffect(() => { if (!run) triggered.current = false; }, [run]);

  if (stage < 0) return null;

  const done = stage === 4;
  const stageStat = [analyzed, compatible, clusters, routeKm];
  const stageUnit = [" suppliers analyzed", " compatible suppliers", " supply clusters", " km optimized route"];

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-emerald-600/25 bg-white shadow-card", className)}>
      <div className="border-b border-cream-200 bg-gradient-to-r from-forest-950 to-forest-800 px-5 py-4">
        <p className="flex items-center gap-2 text-sm font-bold text-white">
          {!done ? <Loader2 className="h-4 w-4 animate-spin text-emerald-300" /> : <Check className="h-4 w-4 text-emerald-300" />}
          {done ? "Supply matching complete" : "Finding compatible supply…"}
        </p>
        <p className="mt-0.5 text-xs text-emerald-100/60">Prototype simulation · matching engine walkthrough</p>
      </div>

      <div className="p-5">
        <ol className="space-y-3">
          {stages.map((s, i) => {
            const active = stage === i;
            const finished = stage > i;
            const Icon = s.icon;
            return (
              <li
                key={s.id}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3 transition-all duration-500",
                  finished ? "border-cream-200 bg-cream-50" : active ? "border-emerald-600/40 bg-emerald-50/60" : "border-transparent opacity-45"
                )}
              >
                <span className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition",
                  finished ? "bg-emerald-600 text-white" : active ? "bg-white text-emerald-700 ring-1 ring-emerald-600/30" : "bg-cream-100 text-ink-400"
                )}>
                  {finished ? <Check className="h-4.5 w-4.5" /> : <Icon className={cn("h-4.5 w-4.5", active && "animate-pulse")} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-bold text-ink-900">{s.label}</p>
                  <p className="truncate text-xs text-ink-400">{s.hint}</p>
                </div>
                <p className="tabular text-lg font-extrabold text-emerald-700 opacity-0 transition duration-500" style={{ opacity: stage >= i ? 1 : 0 }}>
                  {i === 3 ? `${stageStat[i]} km` : stageStat[i]}
                  {i !== 3 && <span className="ml-1 text-[10px] font-semibold uppercase tracking-wide text-ink-400">{stageUnit[i].split(" ").slice(1).join(" ")}</span>}
                </p>
                {active && !finished && <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />}
              </li>
            );
          })}
        </ol>

        {/* criteria chips */}
        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Matching criteria applied">
          {criteria.map((c, i) => (
            <span
              key={c.label}
              className={cn("flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all duration-500",
                stage >= 1 ? "border-emerald-600/30 bg-emerald-50 text-emerald-800" : "border-cream-200 text-ink-400")}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <c.icon className="h-3 w-3" />
              {c.label}
              {stage >= 1 && <Check className="h-3 w-3" />}
            </span>
          ))}
        </div>

        {/* progress line */}
        {!done && (
          <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-cream-100">
            <span className="absolute inset-y-0 w-1/2 animate-progress-line rounded-full bg-emerald-500" />
          </div>
        )}

        {done && (
          <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-2xl bg-forest-950 p-5 text-white sm:flex-row animate-scale-in">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="tabular text-3xl font-extrabold leading-none text-emerald-300">94%</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/50">match score</span>
              </div>
              <div className="h-10 w-px bg-white/15" />
              <div className="text-[13px] leading-relaxed text-emerald-50/80">
                <b className="text-white">{result.compatible} compatible suppliers</b> found from {result.analyzed} analyzed.
                <br />Best cluster pools 3 suppliers into a single {result.routeKm} km route.
              </div>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white/70">
              18 → 7 → 3 → <b className="text-emerald-300">1,000 kg pooled</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
