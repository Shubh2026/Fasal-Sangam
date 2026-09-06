"use client";

import { useMemo, useState } from "react";
import { Search, Layers, SlidersHorizontal } from "lucide-react";
import { MarketplaceCard } from "@/components/cards/MarketplaceCard";
import { EmptyState, Badge, inputCls } from "@/components/ui/primitives";
import { marketplaceSupply, crops } from "@/data/mock";
import { cn } from "@/lib/utils";

const grades = ["All grades", "A", "B"] as const;
const locations = ["All regions", "Patiala", "Ludhiana", "Mohali", "Kharar", "Jalandhar"] as const;

export default function MarketplacePage() {
  const [q, setQ] = useState("");
  const [crop, setCrop] = useState("all");
  const [grade, setGrade] = useState<(typeof grades)[number]>("All grades");
  const [loc, setLoc] = useState<(typeof locations)[number]>("All regions");

  const list = useMemo(
    () =>
      marketplaceSupply.filter((s) => {
        const c = crops.find((x) => x.id === s.crop)!;
        if (crop !== "all" && s.crop !== crop) return false;
        if (grade !== "All grades" && s.grade !== grade) return false;
        if (loc !== "All regions" && s.location !== loc) return false;
        if (q && !(c.name + c.hindi + s.location).toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [q, crop, grade, loc]
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Marketplace</h1>
          <p className="mt-1 text-sm text-ink-500">Live aggregated supply from farmers and FPOs across Punjab.</p>
        </div>
        <Badge tone="emerald" className="border border-emerald-600/20"><Layers className="h-3 w-3" /> Every card pools multiple suppliers</Badge>
      </div>

      {/* filter bar */}
      <div className="rounded-2xl border border-cream-200 bg-white p-3 shadow-card">
        <div className="grid gap-2.5 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search produce…"
              aria-label="Search produce"
              className={cn(inputCls, "pl-10")}
            />
          </div>
          <select className={inputCls} value={crop} onChange={(e) => setCrop(e.target.value)} aria-label="Crop filter">
            <option value="all">All crops</option>
            {crops.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select className={inputCls} value={grade} onChange={(e) => setGrade(e.target.value as (typeof grades)[number])} aria-label="Quality filter">
            {grades.map((g) => <option key={g}>{g}</option>)}
          </select>
          <select className={inputCls} value={loc} onChange={(e) => setLoc(e.target.value as (typeof locations)[number])} aria-label="Region filter">
            {locations.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
        <p className="mt-2 flex items-center gap-1.5 px-1 text-[11px] text-ink-400">
          <SlidersHorizontal className="h-3 w-3" /> {list.length} supply pools · quantity, harvest window and price shown per pool
        </p>
      </div>

      {list.length === 0 ? (
        <EmptyState
          title="No supply pool matches those filters"
          hint="Try widening the crop, grade or region — new listings arrive every day."
          action={<button onClick={() => { setQ(""); setCrop("all"); setGrade("All grades"); setLoc("All regions"); }} className="text-sm font-semibold text-emerald-700 underline">Clear filters</button>}
        />
      ) : (
        <div className="stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((s) => <MarketplaceCard key={s.id} item={s} />)}
        </div>
      )}
    </div>
  );
}
