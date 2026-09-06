"use client";

import { useMemo, useState } from "react";
import { Route, Timer, Truck, Wallet, MapPin, User } from "lucide-react";
import { Card, SectionTitle, Badge, StatusPill, Meter, KpiCard } from "@/components/ui/primitives";
import { MapPanel } from "@/components/map/MapPanel";
import { adminRoutes, logisticsKpis, buyerOrders, cropById } from "@/data/mock";
import { cn, qty } from "@/lib/utils";

function stopsFor(routeId: string, orderId: string, crop: string): string[] {
  const fromOrder = buyerOrders.find((o) => o.id === orderId);
  if (fromOrder) return fromOrder.route.stops;
  const cropName = crop[0].toUpperCase() + crop.slice(1);
  return [`${cropName} Cluster A`, `${cropName} Cluster B`, "FPO Collection Centre", "Buyer DC, Chandigarh"];
}

export default function LogisticsPage() {
  const [selected, setSelected] = useState(adminRoutes[0].id);
  const route = adminRoutes.find((r) => r.id === selected) ?? adminRoutes[0];
  const stops = useMemo(() => stopsFor(route.id, route.order, route.crop), [route]);

  return (
    <div className="space-y-7 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Logistics</h1>
        <p className="mt-1 text-sm text-ink-500">Pooled pickup routes across the network — simulated for the prototype.</p>
      </div>

      <div className="stagger grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Active routes" value={`${logisticsKpis.activeRoutes}`} icon={<Route className="h-5 w-5" />} sub={`${logisticsKpis.optimized} engine-optimized`} />
        <KpiCard label="Avg. distance" value={`${logisticsKpis.avgDistance} km`} icon={<MapPin className="h-5 w-5" />} sub="vs 78 km unoptimized" tone="sky" />
        <KpiCard label="Avg. delivery time" value={`${logisticsKpis.avgDelivery} days`} icon={<Timer className="h-5 w-5" />} sub="gate → dock" tone="amber" />
        <KpiCard label="Cost per kg moved" value="₹2.0" icon={<Wallet className="h-5 w-5" />} sub="pooled pickups" tone="forest" />
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[1fr_1.5fr]">
        {/* route list */}
        <Card className="overflow-hidden">
          <div className="border-b border-cream-200 px-5 py-4">
            <h2 className="text-sm font-bold text-ink-900">Route board</h2>
          </div>
          <ul className="divide-y divide-cream-100">
            {adminRoutes.map((r) => {
              const active = r.id === selected;
              return (
                <li key={r.id}>
                  <button
                    onClick={() => setSelected(r.id)}
                    className={cn("block w-full px-5 py-4 text-left transition", active ? "bg-emerald-50/70" : "hover:bg-cream-50")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="flex items-center gap-2 font-bold text-ink-900">
                        {r.id}
                        <Badge tone="slate">#{r.order}</Badge>
                      </p>
                      <StatusPill status={r.status} />
                    </div>
                    <p className="mt-1 text-xs capitalize text-ink-500">
                      {cropById[r.crop as keyof typeof cropById].name} · {qty(r.qty)} · {r.stops} stops · {r.distance} km · ETA {r.eta}
                    </p>
                    <Meter value={r.progress * 100} className="mt-2.5" />
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        {/* route detail */}
        <div className="space-y-4">
          <MapPanel stops={stops} progress={route.progress} label={`${route.id} · simulated`} />
          <Card className="p-5">
            <div className="flex flex-wrap items-center gap-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Route</p>
                <p className="font-extrabold text-ink-900">{route.id} → {route.order}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Vehicle</p>
                <p className="flex items-center gap-1.5 font-bold text-ink-900"><Truck className="h-4 w-4 text-emerald-600" /> {route.vehicle}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Driver</p>
                <p className="flex items-center gap-1.5 font-bold text-ink-900"><User className="h-4 w-4 text-emerald-600" /> {route.driver}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Load</p>
                <p className="tabular font-bold text-ink-900">{qty(route.qty)}</p>
              </div>
              <div className="ml-auto">
                <StatusPill status={route.status} />
              </div>
            </div>
            <div className="mt-4 border-t border-dashed border-cream-200 pt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-400">Stop sequence</p>
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12.5px] font-medium text-ink-600">
                {stops.map((s, i) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-900 text-[10px] font-bold text-emerald-300">{i + 1}</span>
                    {s}
                    {i < stops.length - 1 && <span className="text-ink-300">→</span>}
                  </li>
                ))}
              </ol>
            </div>
          </Card>
          <p className="text-xs text-ink-400">
            Route optimization here is a prototype simulation — it sequences stops to visualize pooled logistics; production systems would compute against live fleet data.
          </p>
        </div>
      </div>

      <div>
        <SectionTitle title="Why pooling wins" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { t: "86 km → 68 km", s: "One pooled route versus three separate trips for order FS-1024." },
            { t: "₹2.00 → ₹1.40 per kg", s: "Full-truck utilization on collection corridors cuts cost per kg." },
            { t: "12 h → 4 h", s: "Pre-booked pickup windows reduce farm-side waiting time." },
          ].map((x) => (
            <Card key={x.t} className="p-5">
              <p className="text-lg font-extrabold tracking-tight text-emerald-700">{x.t}</p>
              <p className="mt-1 text-[13px] text-ink-500">{x.s}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
