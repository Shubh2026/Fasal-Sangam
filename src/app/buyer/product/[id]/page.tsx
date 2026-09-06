"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight, MapPin, CalendarDays, Tractor, Warehouse, TrendingUp, ShieldCheck } from "lucide-react";
import { Card, Badge, GradeChip, SectionTitle, StatusPill, btnClass } from "@/components/ui/primitives";
import { PriceBreakdown } from "@/components/order/PriceBreakdown";
import { Sparkline } from "@/components/charts/NetworkCharts";
import { marketplaceSupply, supplyBreakdown, cropById, forecasts } from "@/data/mock";
import { qty } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const item = marketplaceSupply.find((s) => s.id === params.id);
  if (!item) return notFound();

  const crop = cropById[item.crop];
  const f = forecasts[item.crop];
  const breakdown =
    supplyBreakdown[item.id] ?? [
      { name: item.sources.split("+")[0].trim(), type: "Farmer", qty: Math.round(item.available * 0.4), grade: item.grade, distance: item.distance - 6, location: item.location },
      { name: "Pooled FPO lot", type: "FPO", qty: Math.round(item.available * 0.35), grade: "A", distance: item.distance, location: item.location },
      { name: "Satellite farmers", type: "Farmer", qty: Math.round(item.available * 0.25), grade: "B", distance: item.distance + 12, location: "nearby clusters" },
    ];

  const farmerPrice = item.avgPrice;
  const buyerPrice = item.avgPrice + 2;

  return (
    <div className="space-y-6 animate-fade-up">
      <Link href="/buyer/marketplace" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 transition hover:text-ink-900">
        <ArrowLeft className="h-4 w-4" /> Marketplace
      </Link>

      {/* hero */}
      <Card className="overflow-hidden">
        <div className="relative h-52 sm:h-64">
          <Image src={crop.image} alt={crop.name} fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5">
            <div>
              <div className="flex items-center gap-2">
                <GradeChip grade={item.grade} />
                <Badge tone="forest" className="border border-white/15">Aggregated supply pool</Badge>
                <Badge tone="emerald"><ShieldCheck className="h-3 w-3" /> Verified suppliers</Badge>
              </div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white">{crop.name}</h1>
              <p className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {item.location} belt · {item.distance} km from Chandigarh</span>
                <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> Harvest {item.harvest}</span>
              </p>
            </div>
            <div className="rounded-2xl bg-white/95 px-4 py-3 text-center shadow-lift">
              <p className="tabular text-2xl font-extrabold text-ink-900">₹{item.avgPrice}<span className="text-sm font-semibold text-ink-400">/kg</span></p>
              <p className="text-[11px] font-semibold text-ink-400">pooled avg · {qty(item.available)} available</p>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.35fr_1fr]">
          {/* supply sources */}
          <div className="p-5 sm:p-6">
            <SectionTitle title="Who's behind this pool" hint="Combined automatically by the matching engine" />
            <ul className="space-y-2.5">
              {breakdown.map((s) => (
                <li key={s.name} className="flex items-center gap-3 rounded-xl border border-cream-200 bg-cream-50/60 p-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-cream-200">
                    {s.type === "FPO" ? <Warehouse className="h-5 w-5 text-forest-600" /> : <Tractor className="h-5 w-5 text-emerald-600" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink-900">{s.name}</p>
                    <p className="text-xs text-ink-500">{s.type} · {s.location} · {s.distance} km · Grade {s.grade}</p>
                  </div>
                  <p className="tabular shrink-0 text-sm font-extrabold text-ink-900">{qty(s.qty)}</p>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl border border-emerald-600/25 bg-emerald-50/60 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-emerald-950"><TrendingUp className="h-4 w-4" /> Demand outlook for {crop.name}</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <Sparkline data={[...f.history.map((h) => h.value), ...f.future.map((x) => x.value)]} color={f.trend >= 0 ? "#059669" : "#e11d48"} height={52} />
                <Badge tone={f.trend >= 0 ? "emerald" : "rose"} className="shrink-0">{f.trend >= 0 ? "+" : ""}{f.trend}% next week</Badge>
              </div>
              <p className="mt-2 text-xs text-emerald-900/70">{f.recommendation}</p>
            </div>
          </div>

          {/* pricing + action */}
          <div className="border-t border-cream-200 p-5 sm:p-6 lg:border-l lg:border-t-0">
            <PriceBreakdown farmerPrice={farmerPrice} logistics={2} platformFee={0} totalQty={item.available} marketRef={buyerPrice + 2} mandiFarmgate={Math.max(1, farmerPrice - 2)} />
            <div className="mt-4 rounded-2xl bg-forest-950 p-5 text-white">
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Pooled order advantage</p>
              <ul className="mt-2.5 space-y-1.5 text-[13px] text-emerald-50/80">
                <li>· One pickup route, one invoice, one delivery slot.</li>
                <li>· Fill rate guaranteed by {item.sources}.</li>
                <li>· Matching engine confirms within minutes.</li>
              </ul>
              <Link href="/buyer/create-request" className={btnClass("primary", "md", "mt-4 w-full")}>
                Request This Supply <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-2.5 text-center text-[11px] text-white/40">Current pool status: <StatusPill status="Available" /></p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
