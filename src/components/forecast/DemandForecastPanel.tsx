"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, TrendingDown, Gauge, Wheat, ArrowRight, Info } from "lucide-react";
import { Card, Badge, btnClass } from "@/components/ui/primitives";
import { ForecastChart, ForecastLegend } from "@/components/charts/ForecastChart";
import { crops, forecasts, type CropId } from "@/data/mock";
import { cn, pct } from "@/lib/utils";

export function DemandForecastPanel({ variant = "admin" }: { variant?: "farmer" | "buyer" | "admin" }) {
  const [crop, setCrop] = useState<CropId>("tomato");
  const f = forecasts[crop];
  const rising = f.trend >= 0;

  const cta =
    variant === "farmer"
      ? { href: "/farmer/produce/new", label: "List this crop" }
      : variant === "buyer"
      ? { href: "/buyer/create-request", label: "Create requirement" }
      : { href: "/admin/matching", label: "Open matching center" };

  return (
    <div className="space-y-5">
      {/* crop selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label="Select crop">
        {crops.map((c) => {
          const fc = forecasts[c.id];
          const active = crop === c.id;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              onClick={() => setCrop(c.id)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-2xl border px-3 py-2 pr-4 transition",
                active ? "border-emerald-600 bg-white shadow-card" : "border-cream-200 bg-white/60 hover:border-emerald-600/40"
              )}
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-xl border border-cream-200">
                <Image src={c.image} alt="" fill className="object-cover" sizes="36px" />
              </span>
              <span className="text-left">
                <span className={cn("block text-[13px] font-bold", active ? "text-emerald-800" : "text-ink-900")}>{c.name}</span>
                <span className={cn("tabular flex items-center gap-0.5 text-[11px] font-semibold", fc.trend >= 0 ? "text-emerald-600" : "text-rose-600")}>
                  {fc.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {pct(fc.trend)}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs font-medium text-ink-400">Current weekly demand</p>
          <p className="tabular mt-1 text-2xl font-extrabold tracking-tight text-ink-900">{f.current.toLocaleString("en-IN")} kg</p>
          <p className="mt-1 text-[11px] text-ink-400">Chandigarh region</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-ink-400">Forecast · next week</p>
          <p className="tabular mt-1 text-2xl font-extrabold tracking-tight text-ink-900">{f.forecast.toLocaleString("en-IN")} kg</p>
          <Badge tone={rising ? "emerald" : "rose"} className="mt-1">{pct(f.trend)} trend</Badge>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-ink-400">Confidence</p>
          <p className="mt-1 flex items-center gap-2 text-2xl font-extrabold tracking-tight text-ink-900">
            <Gauge className={cn("h-6 w-6", f.confidence === "High" ? "text-emerald-600" : "text-amber-500")} />
            {f.confidence}
          </p>
          <p className="mt-1 text-[11px] text-ink-400">Based on marketplace activity</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-ink-400">Regional demand</p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight text-ink-900">{f.regionalDemand}</p>
          <p className="mt-1 text-[11px] text-ink-400">Suggested price {f.suggestedPrice}</p>
        </Card>
      </div>

      {/* chart + recommendation */}
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card className="p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 font-bold text-ink-900">
              <Wheat className="h-4.5 w-4.5 text-emerald-600" />
              {crops.find((c) => c.id === crop)?.name} demand — weekly
            </h3>
            <ForecastLegend />
          </div>
          <ForecastChart crop={crop} height={300} />
          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-ink-400">
            <Info className="h-3.5 w-3.5" /> Prototype forecast from sample marketplace activity — for demonstration, not agronomic advice.
          </p>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="flex-1 bg-forest-950 p-5 text-white border-forest-800">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">AI recommendation</p>
            <p className="mt-2.5 text-[15px] leading-relaxed text-emerald-50/85">{f.recommendation}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                <p className="text-[10px] uppercase tracking-wide text-white/50">Potential buyers</p>
                <p className="tabular text-xl font-extrabold text-white">{f.potentialBuyers}</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                <p className="text-[10px] uppercase tracking-wide text-white/50">Suggested listing</p>
                <p className="text-xl font-extrabold text-white">{f.suggestedPrice}</p>
              </div>
            </div>
            <Link href={cta.href} className={btnClass("primary", "md", "mt-5 w-full")}>
              {cta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
