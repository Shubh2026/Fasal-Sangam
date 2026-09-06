"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight, Sprout, GitMerge, Layers, Route, Sparkles, TrendingUp, Trophy,
  Truck, Tractor, ShoppingBasket, ShieldCheck, Leaf, CheckCircle2, ChevronRight,
  IndianRupee, PackageCheck,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge, btnClass, Card } from "@/components/ui/primitives";
import { ForecastChart, ForecastLegend } from "@/components/charts/ForecastChart";
import { PriceBreakdown } from "@/components/order/PriceBreakdown";
import { useApp, type Role } from "@/components/providers/AppProvider";
import { roleHome } from "@/components/shell/nav";
import { crops, forecasts } from "@/data/mock";

const pipeline = [
  { icon: Sprout, title: "Collect", sub: "Farmers & FPOs list upcoming produce with harvest windows." },
  { icon: GitMerge, title: "Match", sub: "Buyer requirements meet compatible supply — scored transparently." },
  { icon: TrendingUp, title: "Predict", sub: "Demand forecasts guide what to plant, list and buy." },
  { icon: Layers, title: "Aggregate", sub: "Small lots combine into pooled orders buyers can fill." },
  { icon: Route, title: "Optimize", sub: "Pickup and delivery routes are planned to cut cost per kg." },
  { icon: Truck, title: "Deliver", sub: "Tracked handover — farm gate to buyer dock." },
];

const values = [
  { icon: Tractor, title: "Direct Market Access", body: "Farmers and FPOs reach verified wholesale buyers without stacked middlemen — and keep more of every rupee." },
  { icon: Sparkles, title: "AI Demand Insights", body: "Prototype forecasting surfaces what the market wants next week, by crop, region and grade." },
  { icon: IndianRupee, title: "Transparent Pricing", body: "Every order shows the farmer share, logistics and buyer price side-by-side. No hidden cuts." },
  { icon: Route, title: "Optimized Logistics", body: "Compatible orders share planned routes through FPO collection centres, cutting empty miles." },
];

const roleCards: { id: Role; title: string; desc: string; points: string[]; icon: typeof Tractor; cta: string }[] = [
  {
    id: "farmer", title: "Farmer / FPO", icon: Tractor,
    desc: "List harvests, see demand before you sow, and sell into pooled orders.",
    points: ["Expected demand per crop", "Smart buyer matches", "Earnings with clear price split"],
    cta: "Enter as Farmer",
  },
  {
    id: "buyer", title: "Buyer", icon: ShoppingBasket,
    desc: "Source exact quantity and quality — aggregated from multiple farms.",
    points: ["Aggregated supply view", "AI matching on requirements", "Live delivery tracking"],
    cta: "Enter as Buyer",
  },
  {
    id: "admin", title: "Platform / Admin", icon: ShieldCheck,
    desc: "Watch network health — matching, forecasting and logistics in real time.",
    points: ["Supply vs demand pulse", "Matching center", "Route optimization board"],
    cta: "Enter as Admin",
  },
];

function HeroFlow() {
  const left = [
    { name: "Gurpreet · Rajpura", qty: "350 kg", emojiClass: "bg-emerald-100 text-emerald-700" },
    { name: "Simran · Mohali", qty: "250 kg", emojiClass: "bg-lime-100 text-lime-700" },
    { name: "Patiala FPO", qty: "400 kg", emojiClass: "bg-teal-100 text-teal-700" },
  ];
  const right = [
    { name: "FreshMart Wholesale", qty: "1,000 kg", emojiClass: "bg-amber-100 text-amber-700" },
    { name: "CityFresh Retail", qty: "500 kg", emojiClass: "bg-rose-100 text-rose-700" },
    { name: "Institution Buyer", qty: "750 kg", emojiClass: "bg-sky-100 text-sky-700" },
  ];
  return (
    <div className="relative overflow-hidden rounded-3xl border border-forest-800/60 shadow-lift">
      <Image src="/images/hero-farm.jpg" alt="Punjab farmland from above" fill priority className="object-cover" sizes="(min-width: 1024px) 44vw, 100vw" />
      <div className="absolute inset-0 bg-gradient-to-br from-forest-950/85 via-forest-950/70 to-forest-900/60" />
      <div className="relative p-5 sm:p-7">
        <div className="flex items-center justify-between text-white/80">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Live network flow</p>
          <Badge tone="forest" className="border border-white/15">Order FS-1024 · Tomato</Badge>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          {/* farmers */}
          <div className="space-y-2.5">
            {left.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-2.5 py-2 backdrop-blur-sm animate-fade-up" style={{ animationDelay: `${i * 120}ms` }}>
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${s.emojiClass}`}><Tractor className="h-3.5 w-3.5" /></span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-bold text-white">{s.name}</p>
                  <p className="tabular text-[10px] text-emerald-200/80">{s.qty}</p>
                </div>
              </div>
            ))}
          </div>

          {/* hub */}
          <div className="relative flex flex-col items-center px-1">
            <span className="mb-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-forest-950">Supply</span>
            <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
              <span className="absolute inset-0 animate-pulse-soft rounded-full bg-emerald-400/25" />
              <span className="absolute -inset-3 rounded-full border border-emerald-300/40" />
              <span className="relative flex h-16 w-16 flex-col items-center justify-center rounded-full bg-emerald-600 text-white shadow-lift sm:h-20 sm:w-20">
                <Leaf className="h-5 w-5" />
                <span className="mt-0.5 text-[8.5px] font-extrabold uppercase tracking-wider">Sangam</span>
                <span className="text-[7.5px] font-semibold text-emerald-100/80">Matching engine</span>
              </span>
            </div>
            <span className="mt-2 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">Match</span>
          </div>

          {/* buyers */}
          <div className="space-y-2.5">
            {right.map((s, i) => (
              <div key={s.name} className="flex items-center justify-end gap-2 rounded-xl border border-white/15 bg-white/10 px-2.5 py-2 text-right backdrop-blur-sm animate-fade-up" style={{ animationDelay: `${i * 120 + 200}ms` }}>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-bold text-white">{s.name}</p>
                  <p className="tabular text-[10px] text-emerald-200/80">{s.qty}</p>
                </div>
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${s.emojiClass}`}><ShoppingBasket className="h-3.5 w-3.5" /></span>
              </div>
            ))}
          </div>
        </div>

        {/* stat chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            { icon: TrendingUp, t: "Tomato demand +28%" },
            { icon: Sparkles, t: "94% match score" },
            { icon: Route, t: "68 km optimized route" },
            { icon: PackageCheck, t: "1,000 kg pooled" },
          ].map((c) => (
            <span key={c.t} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-forest-950/60 px-3 py-1.5 text-[11px] font-semibold text-emerald-100 backdrop-blur">
              <c.icon className="h-3.5 w-3.5 text-emerald-300" /> {c.t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { setRole } = useApp();
  const router = useRouter();

  const enter = (r: Role) => { setRole(r); router.push(roleHome[r]); };
  const t = forecasts.tomato;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-cream-200/70 bg-cream-50/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link href="/"><Logo size="sm" /></Link>
          <nav className="ml-auto hidden items-center gap-1 text-sm font-medium text-ink-600 md:flex">
            <Link href="#how" className="rounded-lg px-3 py-2 hover:text-ink-900">How it works</Link>
            <Link href="#value" className="rounded-lg px-3 py-2 hover:text-ink-900">Why Sangam</Link>
            <Link href="#forecast" className="rounded-lg px-3 py-2 hover:text-ink-900">Demand AI</Link>
            <Link href="#pricing" className="rounded-lg px-3 py-2 hover:text-ink-900">Pricing</Link>
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-4">
            <Link href="/login" className={btnClass("secondary", "sm")}>Log in</Link>
            <Link href="/login" className={btnClass("primary", "sm")}>Launch Demo <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-20">
          <div className="animate-fade-up">
            <Badge tone="emerald" className="border border-emerald-600/20">
              <Trophy className="h-3 w-3" /> AI-Powered Direct Farm-to-Market Network
            </Badge>
            <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.06] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
              From farm surplus to market demand —{" "}
              <span className="relative whitespace-nowrap text-emerald-700">
                connected
                <svg viewBox="0 0 220 12" className="absolute -bottom-1 left-0 w-full text-emerald-400" preserveAspectRatio="none"><path d="M2 9C60 3 140 3 218 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
              </span>{" "}
              intelligently.
            </h1>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-600">
              Fasal Sangam links farmers and FPOs directly with consumers and bulk buyers — using intelligent
              demand insights, supply aggregation, transparent pricing and coordinated logistics.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/login" className={btnClass("primary", "lg")}>Explore Marketplace <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/login" className={btnClass("secondary", "lg")}>List Your Produce</Link>
            </div>
            <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
              {[
                { v: "1,284", l: "farmers & FPOs" },
                { v: "₹18.4 L", l: "this month's GMV" },
                { v: "86.6%", l: "requirement match rate" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="tabular text-2xl font-extrabold tracking-tight text-ink-900">{s.v}</dd>
                  <dd className="text-xs font-medium text-ink-500">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroFlow />
        </div>

        {/* crop marquee */}
        <div className="border-y border-cream-200 bg-white/70 py-4">
          <div className="relative mx-auto max-w-6xl overflow-hidden px-4" aria-hidden>
            <div className="flex w-max animate-flow gap-3">
              {[...crops, ...crops].map((c, i) => (
                <span key={c.id + i} className="flex items-center gap-2 rounded-full border border-cream-200 bg-white py-1.5 pl-1.5 pr-4">
                  <span className="relative h-7 w-7 overflow-hidden rounded-full">
                    <Image src={c.image} alt="" fill className="object-cover" sizes="28px" />
                  </span>
                  <span className="text-sm font-semibold text-ink-900">{c.name}</span>
                  <span className="text-xs text-ink-400">{c.hindi}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="forest">The coordination layer</Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">Fragmented supply → intelligent flow</h2>
          <p className="mt-3 text-ink-500">Six connected steps replace guesswork, stacked middlemen and half-empty trucks.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pipeline.map((p, i) => (
            <Card key={p.title} className="stagger group relative p-6 transition hover:-translate-y-1 hover:shadow-lift" >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <p.icon className="h-6 w-6" />
                </span>
                <span className="tabular text-4xl font-extrabold text-cream-200 transition group-hover:text-emerald-100">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{p.sub}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* value props */}
      <section id="value" className="border-y border-cream-200 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Badge tone="emerald">Built for both sides of the trade</Badge>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                Farmers earn more. Buyers pay less. Everyone sees why.
              </h2>
              <p className="mt-4 text-ink-500 leading-relaxed">
                When three middlemen each take a cut, the farm-gate price collapses. Fasal Sangam keeps the
                value chain short and legible — so a tomato that leaves Rajpura at ₹30/kg reaches the buyer at ₹32/kg, not ₹46.
              </p>
              <div className="mt-6 space-y-2.5">
                {["Farmer receives ~+7% vs typical mandi farm-gate", "Buyer pays ~6% less than wholesale reference", "Logistics pooled across pooled orders"].map((x) => (
                  <p key={x} className="flex items-center gap-2.5 text-sm font-medium text-ink-600">
                    <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-600" /> {x}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <Card key={v.title} className="p-5 transition hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-900 text-emerald-300">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-bold text-ink-900">{v.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{v.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* forecast preview */}
      <section id="forecast" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Badge tone="emerald"><Sparkles className="h-3 w-3" /> Prototype AI forecasting</Badge>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">See demand before it arrives</h2>
            <p className="mt-4 text-ink-500 leading-relaxed">
              The demand engine reads marketplace activity and projects weekly demand per crop — helping
              farmers decide what to list and buyers when to book. Demonstrated here on realistic sample data.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { l: "Current demand", v: t.current.toLocaleString("en-IN") + " kg" },
                { l: "Forecast · next week", v: t.forecast.toLocaleString("en-IN") + " kg" },
                { l: "Trend", v: "+28%" },
                { l: "Confidence", v: "High" },
              ].map((s) => (
                <Card key={s.l} className="p-4">
                  <p className="text-xs font-medium text-ink-400">{s.l}</p>
                  <p className="tabular mt-1 text-xl font-extrabold tracking-tight text-ink-900">{s.v}</p>
                </Card>
              ))}
            </div>
          </div>
          <Card className="p-5 sm:p-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-bold text-ink-900">Tomato — Chandigarh region</h3>
              <ForecastLegend />
            </div>
            <ForecastChart crop="tomato" height={300} />
            <p className="mt-3 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-[13px] text-emerald-900">
              <b>AI recommendation:</b> {t.recommendation}
            </p>
          </Card>
        </div>
      </section>

      {/* pricing transparency */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <PriceBreakdown farmerPrice={30} logistics={2} platformFee={0} totalQty={1000} marketRef={34} mandiFarmgate={28} />
          <div>
            <Badge tone="amber"><IndianRupee className="h-3 w-3" /> Radical price transparency</Badge>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">Every rupee, accounted for</h2>
            <p className="mt-4 text-ink-500 leading-relaxed">
              Order FS-1024 pooled 1,000 kg of tomatoes from two farmers and one FPO. The split is visible to
              everyone: the farmer share, the pooled logistics cost, and the final buyer price — no hidden commission stack.
            </p>
            <Link href="/login" className={btnClass("dark", "lg", "mt-6")}>See it in the live demo <ChevronRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* roles */}
      <section id="roles" className="border-t border-forest-800 bg-forest-950 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="forest" className="border border-white/15">One prototype · three lenses</Badge>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Walk through it as anyone</h2>
            <p className="mt-3 text-emerald-100/60">Switch roles anytime from the header — no sign-out needed.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {roleCards.map((r) => (
              <div key={r.id} className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-emerald-500/40 hover:bg-white/[0.07]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 transition group-hover:bg-emerald-500 group-hover:text-forest-950">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-emerald-100/60">{r.desc}</p>
                <ul className="mt-4 space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[13px] text-emerald-100/80">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" /> {p}
                    </li>
                  ))}
                </ul>
                <button onClick={() => enter(r.id)} className={btnClass("primary", "md", "mt-6 w-full")}>
                  {r.cta} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-forest-800 bg-forest-950 pb-10 pt-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <Logo light size="sm" />
          <p className="text-xs text-emerald-100/40">
            Fasal Sangam · prototype demonstration with simulated data. No production AI, payments or live logistics.
          </p>
        </div>
      </footer>
    </div>
  );
}
