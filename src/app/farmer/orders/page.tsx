"use client";

import Image from "next/image";
import { MapPin, Users } from "lucide-react";
import { Card, SectionTitle, Badge, StatusPill, Meter } from "@/components/ui/primitives";
import { OrderTimeline } from "@/components/order/OrderTimeline";
import { PriceBreakdown } from "@/components/order/PriceBreakdown";
import { heroOrder, farmerRecentOrders, cropById } from "@/data/mock";
import { inr, qty, cn } from "@/lib/utils";

export default function FarmerOrdersPage() {
  const crop = cropById[heroOrder.crop];
  const mine = heroOrder.suppliers[0]; // Gurpreet — the signed-in farmer

  return (
    <div className="space-y-7 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Orders</h1>
        <p className="mt-1 text-sm text-ink-500">Every connected order with status and payout.</p>
      </div>

      {/* hero order detail */}
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-4 border-b border-cream-200 bg-cream-50/60 p-5">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-cream-200">
            <Image src={crop.image} alt={crop.name} fill className="object-cover" sizes="56px" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-extrabold tracking-tight text-ink-900">Order #{heroOrder.id}</h2>
              <StatusPill status={heroOrder.status} />
              <Badge tone="forest">Combined order · {heroOrder.suppliers.length} suppliers</Badge>
            </div>
            <p className="mt-0.5 text-[13px] text-ink-500">
              {crop.name} · {qty(heroOrder.qty)} · Grade A · {heroOrder.buyer}, {heroOrder.buyerLocation}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Your payout</p>
            <p className="tabular text-xl font-extrabold text-emerald-700">{inr(10500)}</p>
            <p className="text-[11px] text-ink-400">₹30/kg × 350 kg</p>
          </div>
        </div>

        <div className="p-5">
          <h3 className="mb-3 text-sm font-bold text-ink-900">Order journey</h3>
          <OrderTimeline events={heroOrder.timeline} />
        </div>

        <div className="grid gap-4 border-t border-cream-200 p-5 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
              <Users className="h-4 w-4 text-emerald-600" /> Who fills this order
            </h3>
            <ul className="space-y-2.5">
              {heroOrder.suppliers.map((s) => (
                <li key={s.name} className={cn("rounded-xl border p-3.5", s.name === mine.name ? "border-emerald-600/40 bg-emerald-50/60" : "border-cream-200 bg-cream-50/50")}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                        {s.name} {s.name === mine.name && <Badge tone="emerald">You</Badge>}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-500"><MapPin className="h-3 w-3" /> {s.location} · {s.distance} km</p>
                    </div>
                    <div className="text-right">
                      <p className="tabular text-sm font-bold">{qty(s.qty)}</p>
                      <p className="tabular text-xs font-semibold text-emerald-700">{inr(s.amount)}</p>
                    </div>
                  </div>
                  <Meter value={(s.qty / heroOrder.qty) * 100} className="mt-2.5" />
                </li>
              ))}
            </ul>
          </div>
          <PriceBreakdown farmerPrice={30} logistics={2} platformFee={0} totalQty={heroOrder.qty} marketRef={34} mandiFarmgate={28} />
        </div>
      </Card>

      {/* history */}
      <div>
        <SectionTitle title="Order history" />
        <Card className="overflow-hidden">
          <table className="hidden w-full md:table">
            <thead>
              <tr className="border-b border-cream-200 bg-cream-50 text-left text-[11px] font-bold uppercase tracking-wider text-ink-400">
                <th className="px-5 py-3">Order</th><th className="px-5 py-3">Produce</th><th className="px-5 py-3">Qty</th>
                <th className="px-5 py-3">Buyer</th><th className="px-5 py-3">Payout</th><th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {farmerRecentOrders.map((o) => (
                <tr key={o.id} className="border-b border-cream-100 text-sm last:border-0 hover:bg-cream-50/60">
                  <td className="px-5 py-3.5 font-bold text-ink-900">{o.id}<span className="block text-[11px] font-normal text-ink-400">{o.date}</span></td>
                  <td className="px-5 py-3.5">{cropById[o.crop as keyof typeof cropById].name}</td>
                  <td className="tabular px-5 py-3.5">{qty(o.qty)}</td>
                  <td className="px-5 py-3.5">{o.buyer}</td>
                  <td className="tabular px-5 py-3.5 font-bold">{inr(o.amount)}</td>
                  <td className="px-5 py-3.5"><StatusPill status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="divide-y divide-cream-100 md:hidden">
            {farmerRecentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div>
                  <p className="text-sm font-bold">{o.id}</p>
                  <p className="text-xs text-ink-500">{cropById[o.crop as keyof typeof cropById].name} · {qty(o.qty)}</p>
                </div>
                <div className="text-right">
                  <p className="tabular text-sm font-bold">{inr(o.amount)}</p>
                  <div className="mt-1"><StatusPill status={o.status} /></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
