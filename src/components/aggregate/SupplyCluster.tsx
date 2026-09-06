"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, Route, IndianRupee, Timer, Tractor, Warehouse, Store } from "lucide-react";
import { cropById, type SupplierShare } from "@/data/mock";
import { Badge } from "@/components/ui/primitives";
import { MatchScore } from "@/components/cards/MatchCard";
import { qty } from "@/lib/utils";

interface Requirement {
  crop: string;
  qty: number;
  grade: string;
  delivery: string;
  location: string;
  maxPrice: number;
}

export function SupplyCluster({
  requirement,
  suppliers,
  score,
  stats = { combined: 86, optimized: 68, logistics: 2000, days: 1 },
  buyerName = "FreshMart Wholesale",
  actions,
  animate = true,
}: {
  requirement: Requirement;
  suppliers: SupplierShare[];
  score: number;
  stats?: { combined: number; optimized: number; logistics: number; days: number };
  buyerName?: string;
  actions?: ReactNode;
  animate?: boolean;
}) {
  const crop = cropById[(requirement.crop as keyof typeof cropById) ?? "tomato"] ?? cropById.tomato;
  const total = suppliers.reduce((s, x) => s + x.qty, 0);
  const [step, setStep] = useState(animate ? 0 : 99);

  useEffect(() => {
    if (!animate) return;
    const timers = [400, 900, 1400, 2000].map((ms, i) => window.setTimeout(() => setStep(i + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [animate]);

  const show = (min: number) => (step >= min ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none");

  return (
    <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-card sm:p-6">
      {/* Requirement banner */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-forest-950 p-4 text-white">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/15">
          <Image src={crop.image} alt={crop.name} fill className="object-cover" sizes="48px" />
        </div>
        <div className="min-w-0">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-emerald-300/80">Buyer requirement</p>
          <p className="text-lg font-extrabold tracking-tight">
            {crop.name} · {qty(requirement.qty)}
          </p>
          <p className="text-xs text-white/60">{requirement.grade} · Deliver by {requirement.delivery} · {requirement.location} · max ₹{requirement.maxPrice}/kg</p>
        </div>
        <Badge tone="forest" className="ml-auto border border-white/10">1 order · pooled supply</Badge>
      </div>

      {/* Aggregation diagram */}
      <div className="mt-6 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
        {/* suppliers */}
        <div className="flex-1 space-y-3" aria-label="Suppliers contributing to this order">
          {suppliers.map((s, i) => (
            <div
              key={s.name}
              className={`flex items-center gap-3 rounded-xl border border-cream-200 bg-cream-50 p-3 transition-all duration-500 ${show(i >= 1 ? i : 0) || "opacity-0"}`}
              style={{ opacity: step > i - 1 ? undefined : 0 }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-cream-200">
                {s.type === "FPO" ? <Warehouse className="h-5 w-5 text-forest-600" /> : <Tractor className="h-5 w-5 text-emerald-600" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink-900">{s.name}
                  <span className="ml-1.5 rounded-full bg-white px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-400 ring-1 ring-cream-200">{s.type}</span>
                </p>
                <p className="truncate text-xs text-ink-500">{s.location} · {s.distance} km</p>
              </div>
              <div className="text-right">
                <p className="tabular text-base font-extrabold text-ink-900">{qty(s.qty)}</p>
                <p className="tabular text-[11px] font-semibold text-emerald-700">₹{s.amount.toLocaleString("en-IN")}</p>
              </div>
            </div>
          ))}
        </div>

        {/* arrow */}
        <div className={`flex items-center justify-center transition-all duration-500 ${show(1)}`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
            <ArrowDown className="h-5 w-5 lg:hidden" />
            <ArrowRight className="hidden h-5 w-5 lg:block" />
          </span>
        </div>

        {/* total node */}
        <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${show(2)}`}>
          <div className="relative flex h-28 w-28 items-center justify-center">
            <span className="absolute inset-0 animate-pulse-soft rounded-full bg-emerald-500/15" />
            <span className="absolute inset-2 rounded-full bg-emerald-500/10" />
            <div className="relative flex h-20 w-20 flex-col items-center justify-center rounded-full bg-forest-900 text-white shadow-lift ring-4 ring-emerald-100">
              <span className="tabular text-lg font-extrabold leading-none">{qty(total)}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300">combined</span>
            </div>
          </div>
          <MatchScore score={score} size={92} />
        </div>

        {/* arrow */}
        <div className={`flex items-center justify-center transition-all duration-500 ${show(3)}`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
            <ArrowDown className="h-5 w-5 lg:hidden" />
            <ArrowRight className="hidden h-5 w-5 lg:block" />
          </span>
        </div>

        {/* buyer */}
        <div className={`flex-1 transition-all duration-500 ${show(3)}`}>
          <div className="flex items-center gap-3 rounded-xl border-2 border-emerald-600/40 bg-emerald-50/60 p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-900 text-emerald-300">
              <Store className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900">{buyerName}</p>
              <p className="text-xs text-ink-500">Receives full {qty(requirement.qty)} · {requirement.grade}</p>
              <p className="tabular mt-1 text-xs font-semibold text-emerald-700">₹32/kg all-in · ₹{(requirement.qty * 32).toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { icon: <Route className="h-4 w-4 text-emerald-600" />, label: "Optimized route", value: `${stats.optimized} km`, sub: `vs ${stats.combined} km direct` },
          { icon: <IndianRupee className="h-4 w-4 text-emerald-600" />, label: "Est. logistics", value: `₹${stats.logistics.toLocaleString("en-IN")}`, sub: "₹2/kg pooled" },
          { icon: <Timer className="h-4 w-4 text-emerald-600" />, label: "Est. delivery", value: `${stats.days} day`, sub: "single vehicle" },
          { icon: <Tractor className="h-4 w-4 text-emerald-600" />, label: "Suppliers pooled", value: `${suppliers.length}`, sub: "auto-aggregated" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-cream-50 p-3">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-ink-500">{s.icon} {s.label}</div>
            <p className="tabular mt-1 text-base font-extrabold text-ink-900">{s.value}</p>
            <p className="text-[11px] text-ink-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {actions && <div className={`mt-6 flex flex-wrap items-center justify-end gap-2 transition-all duration-500 ${show(4)}`}>{actions}</div>}
    </div>
  );
}
