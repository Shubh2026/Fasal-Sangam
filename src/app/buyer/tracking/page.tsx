"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Package, Check, Truck, User, Phone, Flag, Timer, Route as RouteIcon, PartyPopper,
} from "lucide-react";
import { Card, Badge, StatusPill, Button, Meter } from "@/components/ui/primitives";
import { MapPanel } from "@/components/map/MapPanel";
import { useApp } from "@/components/providers/AppProvider";
import { buyerOrders, cropById, type FSOrder } from "@/data/mock";
import { cn, qty } from "@/lib/utils";

const baseProgress: Record<FSOrder["status"], number> = {
  Confirmed: 0.06,
  Preparing: 0.12,
  "Pickup Scheduled": 0.2,
  "In Transit": 0.55,
  Delivered: 1,
};

export default function TrackingPage() {
  const { demoOrder, toast } = useApp();
  const orders = useMemo(() => (demoOrder ? [demoOrder, ...buyerOrders] : buyerOrders), [demoOrder]);
  const [selectedId, setSelectedId] = useState<string>(() => orders[0].id);
  const order = orders.find((o) => o.id === selectedId) ?? orders[0];

  const [delivered, setDelivered] = useState<string[]>([]);
  const isDelivered = order.status === "Delivered" || delivered.includes(order.id);
  const cap = isDelivered ? 1 : 0.93;

  const [progress, setProgress] = useState(() => Math.min(baseProgress[order.status] + (order.id === demoOrder?.id ? 0 : 0.1), 0.93));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setProgress(order.status === "Delivered" || delivered.includes(order.id) ? 1 : baseProgress[order.status] + (order.id === demoOrder?.id ? 0.02 : 0.07));
  }, [order.id, order.status, delivered, demoOrder?.id]);

  useEffect(() => {
    if (order.status === "Delivered" || isDelivered) return;
    const tick = () => {
      setProgress((p) => {
        const next = p + 0.0016;
        return next > cap ? cap : next;
      });
      rafRef.current = window.setTimeout(() => requestAnimationFrame(tick), 60);
    };
    rafRef.current = window.setTimeout(() => requestAnimationFrame(tick), 200);
    return () => { if (rafRef.current) clearTimeout(rafRef.current); };
  }, [order.id, cap, isDelivered, order.status]);

  function simulateDelivery() {
    setProgress(1);
    setDelivered((d) => [...d, order.id]);
    toast(`Order ${order.id} delivered`, `${qty(order.qty)} ${cropById[order.crop].name} received at ${order.buyer}, ${order.buyerLocation}.`);
  }

  const crop = cropById[order.crop];

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Order Tracking</h1>
          <p className="mt-1 text-sm text-ink-500">Live pooled-order journeys from farm gate to your dock.</p>
        </div>
        {/* order selector */}
        <div className="flex gap-1.5 overflow-x-auto rounded-xl border border-cream-300 bg-white p-1 no-scrollbar">
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelectedId(o.id)}
              className={cn("shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition", o.id === selectedId ? "bg-forest-900 text-white" : "text-ink-500 hover:text-ink-900")}
            >
              #{o.id}
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[1.55fr_1fr]">
        {/* map */}
        <div className="space-y-4">
          <MapPanel stops={order.route.stops} progress={progress} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: <RouteIcon className="h-4 w-4 text-emerald-600" />, l: "Route distance", v: `${order.route.optimized} km`, s: `${order.route.distance} km direct` },
              { icon: <Timer className="h-4 w-4 text-emerald-600" />, l: "ETA", v: order.route.eta, s: "pooled route" },
              { icon: <Package className="h-4 w-4 text-emerald-600" />, l: "Load", v: qty(order.qty), s: crop.name },
              { icon: <Truck className="h-4 w-4 text-emerald-600" />, l: "Vehicle", v: order.route.vehicle, s: "reefer van" },
            ].map((s) => (
              <Card key={s.l} className="p-3.5">
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink-400">{s.icon} {s.l}</p>
                <p className="tabular mt-1 truncate text-sm font-extrabold text-ink-900">{s.v}</p>
                <p className="text-[10.5px] text-ink-400">{s.s}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* side panel */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="flex items-center gap-3 border-b border-cream-200 bg-cream-50/60 p-4">
              <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-cream-200">
                <Image src={crop.image} alt={crop.name} fill className="object-cover" sizes="44px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-ink-900">Order #{order.id}</p>
                <p className="text-xs text-ink-500">{crop.name} · {qty(order.qty)} · {order.grade}</p>
              </div>
              {isDelivered ? <StatusPill status="Delivered" /> : <StatusPill status="In Transit" />}
            </div>

            <div className="p-5">
              {isDelivered && (
                <div className="mb-5 flex items-center gap-3 rounded-2xl bg-emerald-600 p-4 text-white animate-scale-in">
                  <PartyPopper className="h-6 w-6 shrink-0" />
                  <div>
                    <p className="font-bold">Order Delivered</p>
                    <p className="text-xs text-emerald-100/85">All supplier shares released at agreed price. Thank you!</p>
                  </div>
                </div>
              )}

              {!isDelivered && (
                <div className="mb-5">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-ink-400">Journey progress</span>
                    <span className="tabular font-bold text-ink-900">{Math.round(progress * 100)}%</span>
                  </div>
                  <Meter value={progress * 100} />
                </div>
              )}

              {/* vertical timeline */}
              <ol className="relative space-y-4 border-l-2 border-dashed border-cream-300 pl-5">
                {order.timeline.map((e, i) => {
                  const done = e.done || (isDelivered && i === order.timeline.length - 1);
                  const current = !done && i > 0 && order.timeline[i - 1].done;
                  return (
                    <li key={e.label} className="relative">
                      <span className={cn(
                        "absolute -left-[27px] flex h-5 w-5 items-center justify-center rounded-full border-2",
                        done ? "border-emerald-600 bg-emerald-600 text-white" : current ? "border-emerald-400 bg-white" : "border-cream-300 bg-white"
                      )}>
                        {done ? <Check className="h-3 w-3" /> : current ? <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> : null}
                      </span>
                      <p className={cn("text-[13.5px] font-semibold", done ? "text-ink-900" : "text-ink-400")}>{e.label}</p>
                      <p className="text-[11.5px] text-ink-400">{e.time}</p>
                    </li>
                  );
                })}
              </ol>

              {order.status !== "Delivered" && !isDelivered && (
                <Button variant="secondary" className="mt-5 w-full" onClick={simulateDelivery}>
                  <Flag className="h-4 w-4" /> Simulate delivery complete
                </Button>
              )}
            </div>
          </Card>

          {/* driver */}
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-900 text-emerald-300"><User className="h-5 w-5" /></span>
              <div className="flex-1">
                <p className="text-sm font-bold text-ink-900">{order.route.driver}</p>
                <p className="text-xs text-ink-500">Partner logistics · rated 4.9</p>
              </div>
              <Badge tone="emerald">On route</Badge>
            </div>
            <button onClick={() => toast("Calling driver is disabled in the prototype", "In production this would dial via a masked number.", "info")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-cream-300 py-2.5 text-sm font-semibold text-ink-900 transition hover:border-emerald-600/40 hover:bg-emerald-50">
              <Phone className="h-4 w-4" /> Contact driver
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
