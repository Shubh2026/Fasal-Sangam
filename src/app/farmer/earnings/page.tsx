"use client";

import { Wallet, IndianRupee, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, KpiCard, SectionTitle, Badge } from "@/components/ui/primitives";
import { inr, cn } from "@/lib/utils";

const weeks = [
  { label: "17 Aug", v: 6200 },
  { label: "24 Aug", v: 9100 },
  { label: "31 Aug", v: 7400 },
  { label: "7 Sep", v: 11550 },
  { label: "This week", v: 4200 },
];

const payouts = [
  { id: "P-1142", order: "FS-1024", item: "Tomato · 350 kg", amount: 10500, status: "On delivery", date: "15 Sep" },
  { id: "P-1135", order: "FS-1017", item: "Potato · 400 kg", amount: 6400, status: "Paid", date: "8 Sep" },
  { id: "P-1121", order: "FS-1009", item: "Onion · 300 kg", amount: 6600, status: "Paid", date: "30 Aug" },
  { id: "P-1108", order: "FS-0998", item: "Wheat · 1,200 kg", amount: 27000, status: "Paid", date: "20 Aug" },
];

export default function EarningsPage() {
  const max = Math.max(...weeks.map((w) => w.v));
  return (
    <div className="space-y-7 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Earnings</h1>
        <p className="mt-1 text-sm text-ink-500">Clear payouts — per order, per kilogram.</p>
      </div>

      <div className="stagger grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="This month" value={inr(38450)} icon={<Wallet className="h-5 w-5" />} trend="+12%" tone="forest" sub="vs August" />
        <KpiCard label="Received payouts" value={inr(49500)} icon={<IndianRupee className="h-5 w-5" />} sub="last 60 days" />
        <KpiCard label="Pending" value={inr(10500)} icon={<TrendingUp className="h-5 w-5" />} sub="releases on delivery" tone="amber" />
        <KpiCard label="Avg. realization" value="₹26.4/kg" icon={<CheckCircle2 className="h-5 w-5" />} sub="+7% vs mandi farm-gate" tone="sky" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-6">
          <SectionTitle title="Weekly earnings" hint="Payout value released per week (₹)" />
          <div className="flex h-56 items-end gap-3 sm:gap-5" role="img" aria-label="Weekly earnings bar chart">
            {weeks.map((w) => (
              <div key={w.label} className="group flex flex-1 flex-col items-center gap-2">
                <span className="tabular text-xs font-bold text-ink-900 opacity-0 transition group-hover:opacity-100">{inr(w.v)}</span>
                <div
                  className={cn("w-full max-w-16 rounded-t-xl transition-all duration-700", w.label === "This week" ? "bg-emerald-300" : "bg-emerald-600/85 group-hover:bg-emerald-500")}
                  style={{ height: `${(w.v / max) * 100}%` }}
                />
                <span className="text-[11px] font-medium text-ink-400">{w.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <SectionTitle title="Recent payouts" />
          <ul className="divide-y divide-cream-100">
            {payouts.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 py-3 first:pt-0">
                <div>
                  <p className="text-sm font-bold text-ink-900">{p.id} · {p.order}</p>
                  <p className="text-xs text-ink-500">{p.item} · {p.date}</p>
                </div>
                <div className="text-right">
                  <p className="tabular text-sm font-bold">{inr(p.amount)}</p>
                  <Badge tone={p.status === "Paid" ? "emerald" : "amber"} className="mt-1">{p.status}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="flex flex-wrap items-center gap-4 border-emerald-600/25 bg-emerald-50/60 p-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white"><IndianRupee className="h-5 w-5" /></span>
        <div className="min-w-0 flex-1">
          <b className="text-[15px] text-emerald-950">You earn on the full quantity you supply — never less.</b>
          <p className="mt-0.5 text-[13px] leading-relaxed text-emerald-900/80">
            Your agreed ₹30/kg is locked when a match is confirmed. Logistics are billed to the buyer separately,
            and the platform shows you the complete split on every order.
          </p>
        </div>
      </Card>
    </div>
  );
}
