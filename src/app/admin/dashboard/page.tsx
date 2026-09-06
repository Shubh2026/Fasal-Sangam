"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Users, ShoppingBasket, Sprout, ClipboardList, IndianRupee, Route, Timer, TrendingUp, TrendingDown, ArrowRight, Activity,
} from "lucide-react";
import { Card, SectionTitle, Badge, StatusPill, btnClass } from "@/components/ui/primitives";
import { SupplyDemandChart, MatchDonut } from "@/components/charts/NetworkCharts";
import { networkKpis, forecasts, crops, adminOrdersTable, logisticsKpis } from "@/data/mock";
import { inr, pct, qty, cn } from "@/lib/utils";

export default function AdminDashboard() {
  return (
    <div className="space-y-7 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-[28px]">Fasal Sangam Network</h1>
          <p className="mt-1 text-sm text-ink-500">Saturday, 13 September · Punjab belt · all systems nominal</p>
        </div>
        <Badge tone="emerald" className="border border-emerald-600/20 px-3 py-1.5">
          <Activity className="h-3.5 w-3.5 animate-pulse" /> Live · demo telemetry
        </Badge>
      </div>

      {/* network KPIs */}
      <div className="stagger grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <Card className="p-5"><p className="flex items-center gap-1.5 text-xs font-medium text-ink-400"><Users className="h-3.5 w-3.5" /> Active farmers</p><p className="tabular mt-1.5 text-2xl font-extrabold tracking-tight">{networkKpis.farmers.toLocaleString("en-IN")}</p><p className="mt-1 text-[11px] font-semibold text-emerald-600">+38 this week</p></Card>
        <Card className="p-5"><p className="flex items-center gap-1.5 text-xs font-medium text-ink-400"><ShoppingBasket className="h-3.5 w-3.5" /> Active buyers</p><p className="tabular mt-1.5 text-2xl font-extrabold tracking-tight">{networkKpis.buyers}</p><p className="mt-1 text-[11px] font-semibold text-emerald-600">+6 this week</p></Card>
        <Card className="p-5"><p className="flex items-center gap-1.5 text-xs font-medium text-ink-400"><Sprout className="h-3.5 w-3.5" /> Produce listed</p><p className="tabular mt-1.5 text-2xl font-extrabold tracking-tight">{qty(networkKpis.listedKg)}</p><p className="mt-1 text-[11px] font-semibold text-emerald-600">6 crops · 14 clusters</p></Card>
        <Card className="p-5"><p className="flex items-center gap-1.5 text-xs font-medium text-ink-400"><ClipboardList className="h-3.5 w-3.5" /> Orders this month</p><p className="tabular mt-1.5 text-2xl font-extrabold tracking-tight">{networkKpis.ordersThisMonth}</p><p className="mt-1 text-[11px] font-semibold text-emerald-600">86.6% directly matched</p></Card>
        <Card className="bg-forest-950 border-forest-800 p-5"><p className="flex items-center gap-1.5 text-xs font-medium text-emerald-100/60"><IndianRupee className="h-3.5 w-3.5" /> GMV · September</p><p className="tabular mt-1.5 text-2xl font-extrabold tracking-tight text-white">{networkKpis.gmv}</p><p className="mt-1 text-[11px] font-semibold text-emerald-400">+19% vs August</p></Card>
      </div>

      {/* network overview chart */}
      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-6">
          <SectionTitle
            title="Network overview — listed supply vs buyer demand"
            hint="Weekly tonnes across the Punjab belt (prototype dataset)"
            action={<Link href="/admin/supply" className="text-sm font-semibold text-emerald-700 hover:underline">Open supply board</Link>}
          />
          <SupplyDemandChart height={300} />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: "Matched volume", v: "38.2 t", c: "text-emerald-600" },
              { l: "Pending volume", v: "4.6 t", c: "text-amber-600" },
              { l: "Avg fill time", v: "3.2 h", c: "text-sky-600" },
              { l: "Active clusters", v: "14", c: "text-ink-900" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-cream-50 p-3">
                <p className="text-[11px] font-medium text-ink-400">{s.l}</p>
                <p className={cn("tabular mt-0.5 text-lg font-extrabold", s.c)}>{s.v}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <SectionTitle title="Matching performance" hint="All requirements, this month" action={<Link href="/admin/matching" className={btnClass("secondary", "sm")}>Matching center</Link>} />
          <MatchDonut height={260} />
        </Card>
      </div>

      {/* demand forecast + logistics */}
      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-6">
          <SectionTitle title="Demand forecast — next week" hint="Prototype projections per crop" action={<Link href="/admin/demand" className="text-sm font-semibold text-emerald-700 hover:underline">Full forecaster</Link>} />
          <div className="stagger grid grid-cols-2 gap-3 sm:grid-cols-3">
            {crops.map((c) => {
              const f = forecasts[c.id];
              const up = f.trend >= 0;
              return (
                <Link key={c.id} href={`/admin/demand`} className="group flex items-center gap-3 rounded-2xl border border-cream-200 p-3 transition hover:border-emerald-600/40 hover:bg-emerald-50/40">
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-cream-200">
                    <Image src={c.image} alt="" fill className="object-cover" sizes="40px" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink-900">{c.name}</p>
                    <p className="tabular text-[11px] text-ink-400">{qty(f.current)} → {qty(f.forecast)}</p>
                  </div>
                  <span className={cn("flex items-center gap-0.5 text-sm font-extrabold", up ? "text-emerald-600" : "text-rose-600")}>
                    {up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {pct(f.trend)}
                  </span>
                </Link>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <SectionTitle title="Logistics today" action={<Link href="/admin/logistics" className={btnClass("secondary", "sm")}>Route board</Link>} />
          <ul className="space-y-3">
            {[
              { icon: <Route className="h-4 w-4 text-emerald-600" />, l: "Active routes", v: logisticsKpis.activeRoutes, s: `${logisticsKpis.optimized} engine-optimized` },
              { icon: <Timer className="h-4 w-4 text-sky-600" />, l: "Avg. delivery time", v: `${logisticsKpis.avgDelivery} days`, s: "farm gate → buyer dock" },
              { icon: <Package2Icon />, l: "Avg. route distance", v: `${logisticsKpis.avgDistance} km`, s: "vs 78 km unoptimized" },
              { icon: <TrendingUp className="h-4 w-4 text-emerald-600" />, l: "Cost per kg moved", v: "₹2.0/kg", s: "pooled across orders" },
            ].map((r) => (
              <li key={r.l} className="flex items-center gap-3 rounded-xl border border-cream-200 p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream-50 [&>*]:h-4 [&>*]:w-4">{r.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-medium text-ink-500">{r.l}</p>
                  <p className="text-[10.5px] text-ink-400">{r.s}</p>
                </div>
                <p className="tabular font-extrabold text-ink-900">{r.v}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* recent orders */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-cream-200 px-5 py-4">
          <h2 className="font-bold text-ink-900">Live orders</h2>
          <Link href="/admin/orders" className="flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline">All orders <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-cream-200 bg-cream-50 text-left text-[11px] font-bold uppercase tracking-wider text-ink-400">
                <th className="px-5 py-3">Order</th><th className="px-5 py-3">Crop</th><th className="px-5 py-3">Qty</th>
                <th className="px-5 py-3">Buyer</th><th className="px-5 py-3">Value</th><th className="px-5 py-3">Match</th><th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {adminOrdersTable.slice(0, 5).map((o) => (
                <tr key={o.id} className="border-b border-cream-100 text-sm last:border-0 hover:bg-cream-50/60">
                  <td className="px-5 py-3 font-bold text-ink-900">{o.id}<span className="block text-[11px] font-normal text-ink-400">{o.date}</span></td>
                  <td className="px-5 py-3 capitalize">{o.crop}</td>
                  <td className="tabular px-5 py-3">{qty(o.qty)}</td>
                  <td className="px-5 py-3">{o.buyer}</td>
                  <td className="tabular px-5 py-3 font-bold">{inr(o.value)}</td>
                  <td className="px-5 py-3"><Badge tone="emerald">{o.match}%</Badge></td>
                  <td className="px-5 py-3"><StatusPill status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Package2Icon() {
  return <span className="text-emerald-600 font-extrabold text-sm">kg</span>;
}
