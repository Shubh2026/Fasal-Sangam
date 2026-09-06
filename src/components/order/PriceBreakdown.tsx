"use client";

import { IndianRupee, Info, Tractor, Truck, Wallet } from "lucide-react";
import { cn, qty } from "@/lib/utils";

interface Props {
  farmerPrice: number;   // per kg
  logistics: number;     // per kg
  platformFee?: number;  // per kg
  totalQty: number;      // kg
  marketRef?: number;    // per kg (mandi/wholesale reference)
  mandiFarmgate?: number; // typical farmgate price per kg
  className?: string;
}

export function PriceBreakdown({
  farmerPrice,
  logistics,
  platformFee = 0,
  totalQty,
  marketRef = 32,
  mandiFarmgate = 28,
  className,
}: Props) {
  const buyerPays = farmerPrice + logistics + platformFee;
  const segments = [
    { label: "Farmer receives", perKg: farmerPrice, color: "#059669", icon: <Tractor className="h-4 w-4 text-emerald-600" /> },
    { label: "Logistics", perKg: logistics, color: "#f59e0b", icon: <Truck className="h-4 w-4 text-amber-500" /> },
    { label: "Platform ops", perKg: platformFee, color: "#94a3b8", icon: <IndianRupee className="h-4 w-4 text-slate-400" /> },
  ].filter((s) => s.perKg > 0);

  const farmerVsMandi = Math.round(((farmerPrice - mandiFarmgate) / mandiFarmgate) * 100);
  const buyerVsRef = Math.round(((buyerPays - marketRef) / marketRef) * 100);

  return (
    <div className={cn("rounded-2xl border border-cream-200 bg-white p-5 shadow-card", className)}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-[15px] font-bold text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50"><Wallet className="h-4 w-4 text-emerald-600" /></span>
          Transparent Price Breakdown
        </h3>
        <span className="hidden items-center gap-1 text-[11px] text-ink-400 sm:flex"><Info className="h-3.5 w-3.5" /> per kg · {qty(totalQty)}</span>
      </div>

      {/* stacked bar */}
      <div className="mt-5 flex h-12 w-full overflow-hidden rounded-xl border border-cream-200">
        {segments.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-center overflow-hidden transition-all duration-700"
            style={{ width: `${(s.perKg / buyerPays) * 100}%`, background: s.color }}
          >
            <span className="tabular px-2 text-sm font-extrabold text-white drop-shadow-sm">₹{s.perKg}</span>
          </div>
        ))}
        <div className="flex min-w-[70px] flex-1 items-center justify-center bg-forest-950">
          <span className="tabular px-2 text-sm font-extrabold text-emerald-300">₹{buyerPays}</span>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-3 text-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream-50">{s.icon}</span>
            <span className="flex-1 text-ink-600">{s.label}</span>
            <span className="tabular font-bold text-ink-900">₹{s.perKg}/kg</span>
            <span className="tabular hidden w-24 text-right text-xs text-ink-400 sm:block">₹{(s.perKg * totalQty).toLocaleString("en-IN")} total</span>
          </li>
        ))}
        <li className="flex items-center gap-3 border-t border-dashed border-cream-200 pt-2.5 text-sm">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-900"><IndianRupee className="h-4 w-4 text-emerald-300" /></span>
          <span className="flex-1 font-semibold text-ink-900">Buyer pays</span>
          <span className="tabular font-extrabold text-ink-900">₹{buyerPays}/kg</span>
          <span className="tabular hidden w-24 text-right text-xs font-semibold text-ink-600 sm:block">₹{(buyerPays * totalQty).toLocaleString("en-IN")}</span>
        </li>
      </ul>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className={cn("rounded-xl px-3 py-2.5 text-xs", farmerVsMandi >= 0 ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-700")}>
          <b>Farmer receives {farmerVsMandi >= 0 ? "+" : ""}{farmerVsMandi}%</b> vs typical mandi farmgate (₹{mandiFarmgate}/kg)
        </div>
        <div className={cn("rounded-xl px-3 py-2.5 text-xs", buyerVsRef <= 0 ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800")}>
          <b>Buyer pays {buyerVsRef <= 0 ? Math.abs(buyerVsRef) + "% less" : buyerVsRef + "% more"}</b> than market reference (₹{marketRef}/kg)
        </div>
      </div>
    </div>
  );
}
