"use client";

import { useState } from "react";
import { Info, Sparkles } from "lucide-react";
import { MatchCard } from "@/components/cards/MatchCard";
import { Badge, EmptyState } from "@/components/ui/primitives";
import { useApp } from "@/components/providers/AppProvider";
import { farmerMatches, type BuyerMatch, cropById } from "@/data/mock";
import { cn } from "@/lib/utils";

const filters = ["All", "Tomato", "Onion"] as const;

export default function FarmerMatchesPage() {
  const { toast } = useApp();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [accepted, setAccepted] = useState<string[]>(["M-01"]);

  const list = farmerMatches.filter((m) => filter === "All" || cropById[m.crop].name === filter);

  function onAccept(m: BuyerMatch) {
    setAccepted((p) => [...p, m.id]);
    toast("Match accepted", `${m.buyer} will share a pickup slot for your ${m.yourShare} kg share.`);
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Smart Buyer Matches</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            Scored on crop, quantity, grade, distance, harvest window and price.
          </p>
        </div>
        <div className="flex gap-1.5 rounded-xl border border-cream-300 bg-white p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn("rounded-lg px-3.5 py-1.5 text-sm font-semibold transition", filter === f ? "bg-forest-900 text-white" : "text-ink-500 hover:text-ink-900")}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-emerald-600/25 bg-emerald-50/70 p-4">
        <Badge tone="emerald" className="mt-0.5 border border-emerald-600/20">3 active</Badge>
        <p className="text-sm leading-relaxed text-emerald-950">
          <b>{farmerMatches.length} buyer requirements</b> match your listed produce right now.
          Two are <b>combined orders</b> — several farms each contribute a share, so you never need the full quantity yourself.
        </p>
      </div>

      {list.length === 0 ? (
        <EmptyState title="No matches for this filter yet" hint="New buyer requirements are matched automatically as they arrive." />
      ) : (
        <div className="stagger grid gap-4 xl:grid-cols-2">
          {list.map((m, i) => (
            <div key={m.id}>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">Match #{i + 1} · {m.id}</p>
              <MatchCard match={m} onAccept={onAccept} accepted={accepted.includes(m.id)} />
            </div>
          ))}
        </div>
      )}

      <p className="flex items-start gap-2 text-xs text-ink-400">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Match score is a prototype heuristic combining quantity fit, distance, harvest overlap, grade and price. Accepting a match in the demo only updates your local view.
      </p>
    </div>
  );
}
