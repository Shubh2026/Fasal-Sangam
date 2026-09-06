"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ClipboardList, Layers, Truck, PiggyBank, ArrowRight, CalendarDays, Tag, MapPin, Plus,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { Button, Card, KpiCard, SectionTitle, Badge, Meter, StatusPill, btnClass } from "@/components/ui/primitives";
import { AIInsightCard } from "@/components/cards/AIInsightCard";
import { MarketplaceCard } from "@/components/cards/MarketplaceCard";
import { buyerRequirements, marketplaceSupply, buyerIdentity, cropById } from "@/data/mock";
import { inr, qty } from "@/lib/utils";

export default function BuyerDashboard() {
  const { demoOrder } = useApp();

  return (
    <div className="space-y-7 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-[28px]">Good Morning, {buyerIdentity.org}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
            <MapPin className="h-3.5 w-3.5 text-emerald-600" /> {buyerIdentity.location} · Saturday, 13 September
          </p>
        </div>
        <Link href="/buyer/create-request"><Button size="lg"><Plus className="h-4 w-4" /> Create Requirement</Button></Link>
      </div>

      {/* KPIs */}
      <div className="stagger grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Active requests" value={demoOrder ? "9" : "8"} icon={<ClipboardList className="h-5 w-5" />} sub="3 due this week" />
        <KpiCard label="Matched supply" value={qty(4850)} icon={<Layers className="h-5 w-5" />} sub="across 6 requirements" tone="sky" />
        <KpiCard label="Orders in transit" value="3" icon={<Truck className="h-5 w-5" />} sub="ETA today · FS-1024" tone="amber" />
        <KpiCard label="Estimated savings" value={inr(12400)} icon={<PiggyBank className="h-5 w-5" />} trend="+₹2.1k" sub="vs wholesale mandi" tone="forest" />
      </div>

      {/* procurement insight */}
      <AIInsightCard
        title="AI Procurement Insight"
        headline="Potato supply is expected to tighten over the next 7 days."
        body="Listed potato volume in the Doaba belt fell 11% this week while demand is flat. Booking your 1,500 kg requirement early is likely to secure a better price and harvest slot."
        cta="Create Requirement"
        href="/buyer/create-request"
        accent="amber"
      />

      {/* active requirements */}
      <div>
        <SectionTitle
          title="Active Requirements"
          hint="Match progress updates as farmers list supply"
          action={<Link href="/buyer/create-request" className="text-sm font-semibold text-emerald-700 hover:underline">+ New requirement</Link>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {buyerRequirements.map((r) => {
            const crop = cropById[r.crop];
            return (
              <Card key={r.id} className="p-5">
                <div className="flex items-start gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-cream-200">
                    <Image src={crop.image} alt={crop.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-ink-900">{crop.name}</p>
                      <StatusPill status={r.status} />
                    </div>
                    <p className="text-xs text-ink-500">{r.id} · {r.quality}</p>
                  </div>
                </div>
                <dl className="mt-3.5 space-y-1.5 text-[13px]">
                  <div className="flex justify-between"><dt className="flex items-center gap-1.5 text-ink-400"><Layers className="h-3.5 w-3.5" /> Quantity</dt><dd className="tabular font-bold">{qty(r.qty)}</dd></div>
                  <div className="flex justify-between"><dt className="flex items-center gap-1.5 text-ink-400"><CalendarDays className="h-3.5 w-3.5" /> Delivery</dt><dd className="font-bold">{r.delivery}</dd></div>
                  <div className="flex justify-between"><dt className="flex items-center gap-1.5 text-ink-400"><Tag className="h-3.5 w-3.5" /> Max price</dt><dd className="tabular font-bold">₹{r.maxPrice}/kg</dd></div>
                </dl>
                <div className="mt-4">
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="font-medium text-ink-400">Supply matching</span>
                    <span className="tabular font-bold text-ink-900">{r.matchedPct}%</span>
                  </div>
                  <Meter value={r.matchedPct} />
                </div>
                <Link href={r.matchedPct > 80 ? "/buyer/create-request" : "/buyer/marketplace"} className={btnClass(r.matchedPct > 80 ? "primary" : "secondary", "sm", "mt-4 w-full")}>
                  {r.matchedPct > 80 ? "Review & confirm" : "Browse supply"} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* supply recommendations */}
      <div>
        <SectionTitle
          title="Recommended supply"
          hint="Based on your purchase history and rising demand"
          action={<Link href="/buyer/marketplace" className="text-sm font-semibold text-emerald-700 hover:underline">Open marketplace</Link>}
        />
        <div className="stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {marketplaceSupply.slice(0, 3).map((s) => <MarketplaceCard key={s.id} item={s} />)}
        </div>
      </div>
    </div>
  );
}
