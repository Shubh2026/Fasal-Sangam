"use client";

import { useMemo, useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { Card, Badge, StatusPill, inputCls } from "@/components/ui/primitives";
import { adminOrdersTable } from "@/data/mock";
import { cn, inr, qty } from "@/lib/utils";

const statusTabs = ["All", "In Transit", "Confirmed", "Preparing", "Pickup Scheduled", "Delivered"] as const;

export default function AdminOrdersPage() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<(typeof statusTabs)[number]>("All");
  const [sortDesc, setSortDesc] = useState(true);

  const list = useMemo(() => {
    let rows = [...adminOrdersTable];
    if (tab !== "All") rows = rows.filter((r) => r.status === tab);
    if (q) rows = rows.filter((r) => Object.values(r).join(" ").toLowerCase().includes(q.toLowerCase()));
    rows.sort((a, b) => (sortDesc ? b.value - a.value : a.value - b.value));
    return rows;
  }, [q, tab, sortDesc]);

  const counts = {
    total: adminOrdersTable.length,
    transit: adminOrdersTable.filter((r) => r.status === "In Transit").length,
    delivered: adminOrdersTable.filter((r) => r.status === "Delivered").length,
    gmv: adminOrdersTable.reduce((s, r) => s + r.value, 0),
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Orders</h1>
        <p className="mt-1 text-sm text-ink-500">Full order book across the network.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { l: "Orders shown", v: `${counts.total}` },
          { l: "In transit", v: `${counts.transit}` },
          { l: "Delivered", v: `${counts.delivered}` },
          { l: "Gross value", v: inr(counts.gmv) },
        ].map((s) => (
          <Card key={s.l} className="p-4">
            <p className="text-xs font-medium text-ink-400">{s.l}</p>
            <p className="tabular mt-1 text-xl font-extrabold tracking-tight text-ink-900">{s.v}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-cream-200 p-4">
          <div className="relative min-w-52 flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search order, buyer, crop…" className={cn(inputCls, "pl-10")} />
          </div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {statusTabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cn("shrink-0 rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold transition", tab === t ? "border-forest-900 bg-forest-900 text-white" : "border-cream-300 text-ink-500 hover:text-ink-900")}>
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => setSortDesc((s) => !s)} className="flex items-center gap-1.5 rounded-lg border border-cream-300 px-3 py-1.5 text-[12.5px] font-semibold text-ink-500 transition hover:text-ink-900">
            <ArrowUpDown className="h-3.5 w-3.5" /> Value {sortDesc ? "↓" : "↑"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-cream-200 bg-cream-50 text-left text-[11px] font-bold uppercase tracking-wider text-ink-400">
                <th className="px-5 py-3">Order</th><th className="px-5 py-3">Crop</th><th className="px-5 py-3">Qty</th>
                <th className="px-5 py-3">Buyer</th><th className="px-5 py-3">Value</th><th className="px-5 py-3">Match</th><th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id} className="border-b border-cream-100 text-sm last:border-0 hover:bg-cream-50/60">
                  <td className="px-5 py-3 font-bold text-ink-900">{o.id}<span className="block text-[11px] font-normal text-ink-400">{o.date}</span></td>
                  <td className="px-5 py-3 capitalize">{o.crop}</td>
                  <td className="tabular px-5 py-3">{qty(o.qty)}</td>
                  <td className="px-5 py-3">{o.buyer}</td>
                  <td className="tabular px-5 py-3 font-bold">{inr(o.value)}</td>
                  <td className="px-5 py-3"><Badge tone={o.match >= 90 ? "emerald" : "amber"}>{o.match}%</Badge></td>
                  <td className="px-5 py-3"><StatusPill status={o.status} /></td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-sm text-ink-400">No orders match those filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
