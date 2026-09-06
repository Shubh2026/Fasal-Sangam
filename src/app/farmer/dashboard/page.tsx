"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Package, Sparkles, Wallet, ClipboardList, ArrowRight, ArrowUpRight } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { Button, Card, KpiCard, SectionTitle, Badge, StatusPill } from "@/components/ui/primitives";
import { AIInsightCard } from "@/components/cards/AIInsightCard";
import { HarvestCard } from "@/components/cards/HarvestCard";
import { MatchScore } from "@/components/cards/MatchCard";
import { farmerListings, farmerRecentOrders, farmerMatches, farmerIdentity, cropById } from "@/data/mock";
import { inr, qty } from "@/lib/utils";

export default function FarmerDashboard() {
  const { t, toast, listings } = useApp();
  const router = useRouter();
  const produce = [...listings, ...farmerListings];
  const listedKg = produce.reduce((s, l) => s + l.qty, 0);
  const matchedKg = 1240 + listings.filter((l) => l.status !== "listed").reduce((s, l) => s + l.qty, 0);
  const heroMatch = farmerMatches[0];

  return (
    <div className="space-y-7 animate-fade-up">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-[28px]">
            {t("greeting.morning")}, {farmerIdentity.name.split(" ")[0]}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-emerald-600" /> {t("greeting.location")}</span>
            <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-emerald-600" /> Saturday, 13 September</span>
          </p>
        </div>
        <Link href="/farmer/produce/new"><Button size="lg">+ {t("common.listProduce")}</Button></Link>
      </div>

      {/* KPIs */}
      <div className="stagger grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label={t("farmer.kpi.listed")} value={qty(listedKg)} icon={<Package className="h-5 w-5" />} trend="+350 kg" sub="this week" />
        <KpiCard label={t("farmer.kpi.matched")} value={qty(matchedKg)} icon={<Sparkles className="h-5 w-5" />} sub="with verified buyers" tone="sky" />
        <KpiCard label={t("farmer.kpi.pending")} value="4" icon={<ClipboardList className="h-5 w-5" />} sub="2 pickups this week" tone="amber" />
        <KpiCard label={t("farmer.kpi.earnings")} value={inr(38450)} icon={<Wallet className="h-5 w-5" />} trend="+12%" sub="vs last month" tone="forest" />
      </div>

      {/* AI insight */}
      <AIInsightCard
        headline="Tomato demand is expected to rise 28% next week."
        body="Retail and restaurant orders in Chandigarh are trending up. Your 750 kg tomato harvest window (12–15 Sep) aligns well with this demand."
        cta="View Demand Forecast"
        href="/farmer/demand"
      />

      {/* harvests + active match */}
      <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <div>
          <SectionTitle
            title={t("farmer.upcomingHarvest")}
            hint="Produce buyers can book before harvest"
            action={<Link href="/farmer/produce" className="text-sm font-semibold text-emerald-700 hover:underline">{t("common.viewAll")}</Link>}
          />
          <div className="stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {produce.slice(0, 3).map((l) => (
              <HarvestCard key={l.id} listing={l} findBuyersLabel={t("common.findBuyers")} onFindBuyers={() => { toast("Scanning buyer requirements…", `Best existing matches for your ${cropById[l.crop].name} lot are highlighted first.`, "info"); router.push("/farmer/matches"); }} />
            ))}
          </div>
        </div>

        <div>
          <SectionTitle title={t("farmer.activeMatches")} hint="Orders looking for your produce" />
          <Card className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Badge tone="emerald">CONFIRMED</Badge>
                <h3 className="mt-2 font-bold text-ink-900">Tomato order #FS-1024</h3>
                <p className="text-[13px] text-ink-500">FreshMart Wholesale · Chandigarh</p>
              </div>
              <MatchScore score={92} size={76} />
            </div>
            <dl className="mt-4 space-y-2 text-[13px]">
              <div className="flex justify-between"><dt className="text-ink-500">Buyer requirement</dt><dd className="tabular font-bold">{qty(1000)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Your contribution</dt><dd className="tabular font-bold text-emerald-700">{qty(350)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Payout</dt><dd className="tabular font-bold">{inr(10500)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Pickup</dt><dd className="font-bold">15 Sep · 9:00 AM</dd></div>
            </dl>
            <Link href="/farmer/orders" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-forest-900 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-700">
              View order <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Card>
          <Link href="/farmer/matches" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-emerald-600/40 bg-emerald-50/40 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50">
            <Sparkles className="h-4 w-4" /> {farmerMatches.length - 1} more buyer matches waiting <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* recent orders */}
      <div>
        <SectionTitle title={t("farmer.recentOrders")} action={<Link href="/farmer/orders" className="text-sm font-semibold text-emerald-700 hover:underline">{t("common.viewAll")}</Link>} />
        <Card className="overflow-hidden">
          {/* desktop table */}
          <table className="hidden w-full md:table">
            <thead>
              <tr className="border-b border-cream-200 bg-cream-50 text-left text-[11px] font-bold uppercase tracking-wider text-ink-400">
                <th className="px-5 py-3">Order</th><th className="px-5 py-3">Produce</th><th className="px-5 py-3">Qty</th>
                <th className="px-5 py-3">Buyer</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {farmerRecentOrders.map((o) => (
                <tr key={o.id} className="border-b border-cream-100 text-sm last:border-0 hover:bg-cream-50/60">
                  <td className="px-5 py-3.5 font-bold text-ink-900">{o.id}<span className="block text-[11px] font-normal text-ink-400">{o.date}</span></td>
                  <td className="px-5 py-3.5 capitalize">{cropById[o.crop as keyof typeof cropById].name}</td>
                  <td className="tabular px-5 py-3.5">{qty(o.qty)}</td>
                  <td className="px-5 py-3.5">{o.buyer}</td>
                  <td className="tabular px-5 py-3.5 font-bold text-ink-900">{inr(o.amount)}</td>
                  <td className="px-5 py-3.5"><StatusPill status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* mobile cards */}
          <div className="divide-y divide-cream-100 md:hidden">
            {farmerRecentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div>
                  <p className="text-sm font-bold text-ink-900">{o.id} <span className="font-normal text-ink-400">· {o.date}</span></p>
                  <p className="text-xs text-ink-500 capitalize">{cropById[o.crop as keyof typeof cropById].name} · {qty(o.qty)} · {o.buyer}</p>
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
