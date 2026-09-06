"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBasket, Wheat, Package, Award, MapPin, CalendarDays, IndianRupee, GitMerge,
  Check, ArrowRight, CheckCircle2,
} from "lucide-react";
import { Card, SectionTitle, Badge, Button, btnClass } from "@/components/ui/primitives";
import { MatchingSimulation } from "@/components/match/MatchingSimulation";
import { MatchScore } from "@/components/cards/MatchCard";
import { supplyPool, cropById, heroOrder } from "@/data/mock";
import { cn, qty, inr } from "@/lib/utils";

const criteria = [
  { icon: Wheat, label: "Crop match", value: "Tomato" },
  { icon: Package, label: "Quantity fit", value: "≤ 1,000 kg pooled" },
  { icon: Award, label: "Quality", value: "Grade A preferred" },
  { icon: MapPin, label: "Location", value: "≤ 60 km radius" },
  { icon: CalendarDays, label: "Harvest window", value: "12–15 Sep overlap" },
  { icon: IndianRupee, label: "Price ceiling", value: "≤ ₹34/kg" },
];

const SELECTED = ["Gurpreet Singh", "Simran Kaur", "Patiala FPO"];

type Phase = "idle" | "running" | "done";

export default function MatchingCenterPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [runId, setRunId] = useState(0);

  function start() {
    setPhase("running");
    setRunId((r) => r + 1);
    window.setTimeout(() => document.getElementById("match-engine")?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }

  const tomatoPool = supplyPool.filter((s) => s.crop === "tomato");

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Matching Center</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
            <GitMerge className="h-4 w-4 text-emerald-600" /> Watch the engine turn one requirement into a pooled, routed order.
          </p>
        </div>
        <Button onClick={start} size="lg" disabled={phase === "running"}>
          {phase === "done" ? "Run Again" : "Run Matching Engine"}
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* buyer demand */}
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-900 text-emerald-300"><ShoppingBasket className="h-5 w-5" /></span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Incoming requirement · R-201</p>
              <h3 className="font-extrabold text-ink-900">FreshMart Wholesale — Chandigarh</h3>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:grid-cols-3">
            <div><dt className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-400">Crop</dt><dd className="font-bold">Tomato</dd></div>
            <div><dt className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-400">Quantity</dt><dd className="tabular font-bold">1,000 kg</dd></div>
            <div><dt className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-400">Quality</dt><dd className="font-bold">Grade A</dd></div>
            <div><dt className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-400">Deliver by</dt><dd className="font-bold">15 Sep</dd></div>
            <div><dt className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-400">Max price</dt><dd className="tabular font-bold">₹34/kg</dd></div>
            <div><dt className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-400">Priority</dt><dd><Badge tone="amber">High</Badge></dd></div>
          </dl>
        </Card>

        {/* criteria */}
        <Card className="p-5">
          <h3 className="text-sm font-bold text-ink-900">Matching criteria applied</h3>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {criteria.map((c, i) => (
              <li key={c.label} className={cn("rounded-xl border p-3 transition-all duration-500", phase === "done" ? "border-emerald-600/30 bg-emerald-50/60" : "border-cream-200")} style={{ transitionDelay: `${i * 90}ms` }}>
                <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-500">
                  <c.icon className="h-3.5 w-3.5 text-emerald-600" /> {c.label}
                  {phase === "done" && <Check className="ml-auto h-3.5 w-3.5 text-emerald-600" />}
                </p>
                <p className="mt-1 text-[12.5px] font-bold text-ink-900">{c.value}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* supply pool */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-ink-900">Supply pool · <span className="tabular">12</span> live suppliers</h3>
          <div className="flex items-center gap-3 text-[11px] font-semibold text-ink-500">
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Selected</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-200" /> Crop compatible</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-cream-200" /> Filtered out</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
          {supplyPool.map((s) => {
            const selected = phase !== "idle" && SELECTED.includes(s.name);
            const compatible = phase !== "idle" && s.crop === "tomato" && !selected;
            const filtered = phase === "done" && s.crop !== "tomato";
            return (
              <div
                key={s.name}
                className={cn(
                  "rounded-xl border p-3 text-[12.5px] transition-all duration-500",
                  selected ? "border-emerald-600 bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30" :
                  compatible ? "border-emerald-600/30 bg-emerald-50/70" :
                  filtered ? "opacity-40" : "border-cream-200",
                  phase === "running" && s.crop === "tomato" && !selected && "animate-pulse"
                )}
              >
                <p className="flex items-center justify-between gap-2 font-bold">
                  {s.name}
                  <Badge tone={s.type === "FPO" ? (selected ? "forest" : "forest") : selected ? "forest" : "slate"}>{s.type}</Badge>
                </p>
                <p className={cn("mt-0.5 capitalize", selected ? "text-emerald-100/80" : "text-ink-500")}>
                  {s.crop} · {qty(s.qty)} · {s.grade} · {s.distance} km
                </p>
              </div>
            );
          })}
        </div>
        {phase === "done" && (
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-cream-50 px-3.5 py-2.5 text-xs text-ink-500 animate-fade-in">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
            {tomatoPool.length} crop-compatible suppliers scored; best-fit cluster keeps all pickups within 47 km and total grade A.
          </p>
        )}
      </Card>

      {/* engine run */}
      <div id="match-engine" className="scroll-mt-24">
        {phase === "idle" ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-cream-300 bg-white/60 px-6 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-900 text-emerald-300"><GitMerge className="h-6 w-6" /></span>
            <p className="mt-3 font-bold text-ink-900">Engine idle</p>
            <p className="mt-1 max-w-sm text-sm text-ink-500">Press “Run Matching Engine” to watch requirement R-201 get scored, clustered and routed live.</p>
            <Button className="mt-5" onClick={start}>Run Matching Engine</Button>
          </div>
        ) : (
          <MatchingSimulation key={runId} run={phase === "running"} onComplete={() => setPhase("done")} />
        )}
      </div>

      {/* result */}
      {phase === "done" && (
        <Card className="p-5 animate-fade-up">
          <div className="flex flex-wrap items-center gap-5">
            <MatchScore score={94} size={110} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Result · Order candidate</p>
              <h3 className="mt-1 text-lg font-extrabold tracking-tight text-ink-900">#{heroOrder.id} · Tomato {qty(heroOrder.qty)} pooled</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {heroOrder.suppliers.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 py-1 pl-1 pr-3 text-xs font-semibold text-emerald-900">
                    <span className="relative h-6 w-6 overflow-hidden rounded-full">
                      <Image src={cropById[heroOrder.crop].image} alt="" fill className="object-cover" sizes="24px" />
                    </span>
                    {s.name} · {qty(s.qty)} · {inr(s.amount)}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[13px] text-ink-500">
                12 candidates → 7 compatible → 3 selected · aggregated {qty(heroOrder.qty)} · route optimized {heroOrder.route.optimized} km · logistics ₹2/kg
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/admin/orders" className={btnClass("primary", "md")}>View in order book <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/buyer/tracking" className={btnClass("secondary", "md")}>Track route</Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
