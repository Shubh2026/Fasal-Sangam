"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus, Truck, Users } from "lucide-react";
import { Card, EmptyState, Badge, StatusPill, btnClass, Meter } from "@/components/ui/primitives";
import { useApp } from "@/components/providers/AppProvider";
import { buyerOrders, cropById } from "@/data/mock";
import { cn, inr, qty } from "@/lib/utils";

const tabs = ["All", "Active", "Delivered"] as const;

export default function BuyerOrdersPage() {
  const { demoOrder } = useApp();
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");

  const orders = useMemo(() => (demoOrder ? [demoOrder, ...buyerOrders] : buyerOrders), [demoOrder]);
  const list = orders.filter((o) => tab === "All" || (tab === "Active" ? o.status !== "Delivered" : o.status === "Delivered"));

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Orders</h1>
          <p className="mt-1 text-sm text-ink-500">Pooled orders with supplier splits, pricing and live status.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1.5 rounded-xl border border-cream-300 bg-white p-1">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cn("rounded-lg px-3.5 py-1.5 text-sm font-semibold transition", tab === t ? "bg-forest-900 text-white" : "text-ink-500 hover:text-ink-900")}>
                {t}
              </button>
            ))}
          </div>
          <Link href="/buyer/create-request" className={btnClass("primary", "md")}><Plus className="h-4 w-4" /> New</Link>
        </div>
      </div>

      {list.length === 0 ? (
        <EmptyState title={`No ${tab.toLowerCase()} orders`} hint="Confirmed requirements appear here once a supply cluster is approved." />
      ) : (
        <div className="stagger space-y-4">
          {list.map((o) => {
            const crop = cropById[o.crop];
            const doneSteps = o.timeline.filter((e) => e.done).length;
            return (
              <Card key={o.id} className="p-5 transition hover:shadow-lift">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-cream-200">
                    <Image src={crop.image} alt={crop.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold tracking-tight text-ink-900">#{o.id}</h3>
                      {o.id === demoOrder?.id && <Badge tone="emerald" className="border border-emerald-600/20">Created this session</Badge>}
                      <StatusPill status={o.status} />
                      <Badge tone="slate"><Users className="h-3 w-3" /> {o.suppliers.length} suppliers pooled</Badge>
                    </div>
                    <p className="mt-0.5 text-[13px] text-ink-500">
                      {crop.name} · {qty(o.qty)} · {o.grade} · deliver by {o.deliveryDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="tabular text-lg font-extrabold text-ink-900">{inr(o.value)}</p>
                    <p className="text-[11px] text-ink-400">farmers {inr(o.farmerPayout)} · logistics {inr(o.logistics)}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="min-w-40 flex-1">
                    <div className="mb-1 flex justify-between text-[11px]">
                      <span className="font-medium text-ink-400">Journey</span>
                      <span className="tabular font-semibold text-ink-600">{doneSteps}/{o.timeline.length} steps</span>
                    </div>
                    <Meter value={(doneSteps / o.timeline.length) * 100} />
                  </div>
                  <div className="flex gap-2">
                    <Link href="/buyer/tracking" className={btnClass(o.status === "In Transit" ? "primary" : "secondary", "sm")}>
                      <Truck className="h-3.5 w-3.5" /> {o.status === "Delivered" ? "View journey" : "Track"}
                    </Link>
                    <Link href={`/buyer/product/S-${o.crop[0].toUpperCase()}1`.replace("S-O1", "S-O1")} className={btnClass("ghost", "sm")}>
                      Supply <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
