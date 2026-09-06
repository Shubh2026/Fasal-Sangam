"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tractor, ShoppingBasket, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useApp, type Role } from "@/components/providers/AppProvider";
import { roleHome } from "@/components/shell/nav";
import { cn } from "@/lib/utils";

const roles: { id: Role; title: string; hint: string; icon: typeof Tractor }[] = [
  { id: "farmer", title: "Farmer / FPO", hint: "List produce · demand insights · smart buyer matches", icon: Tractor },
  { id: "buyer", title: "Buyer", hint: "Marketplace · aggregated supply · create requirements", icon: ShoppingBasket },
  { id: "admin", title: "Admin", hint: "Network dashboards · forecast · matching center", icon: ShieldCheck },
];

export default function LoginPage() {
  const { setRole } = useApp();
  const router = useRouter();

  const enter = (r: Role) => {
    setRole(r);
    router.push(roleHome[r]);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* visual side */}
      <div className="relative hidden overflow-hidden lg:block">
        <Image src="/images/hero-farm.jpg" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/55 to-forest-950/35" />
        <div className="relative flex h-full flex-col p-10">
          <Link href="/"><Logo light /></Link>
          <div className="mt-auto max-w-md">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" /> Prototype demo
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white">
              The digital bridge between farms and markets.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-emerald-100/70">
              No real authentication is used — choose a role to explore the end-to-end workflow
              with realistic, simulated data from the Punjab belt.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[{ v: "1,284", l: "farmers" }, { v: "186", l: "buyers" }, { v: "86.6%", l: "match rate" }].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                  <p className="tabular text-lg font-extrabold text-white">{s.v}</p>
                  <p className="text-[11px] text-emerald-100/60">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* form side */}
      <div className="flex items-center justify-center bg-cream-50 px-4 py-12">
        <div className="w-full max-w-md animate-fade-up">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Welcome to Fasal Sangam</h1>
          <p className="mt-1.5 text-sm text-ink-500">Choose your role to continue — mock authentication for the prototype.</p>

          <div className="mt-7 space-y-3">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => enter(r.id)}
                className={cn(
                  "group flex w-full items-center gap-4 rounded-2xl border border-cream-300 bg-white p-4 text-left shadow-card transition",
                  "hover:-translate-y-0.5 hover:border-emerald-600/50 hover:shadow-lift"
                )}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest-900 text-emerald-300 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <r.icon className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-bold text-ink-900">{r.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-ink-500">{r.hint}</span>
                </span>
                <ArrowRight className="h-5 w-5 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-600" />
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-emerald-600/40 bg-emerald-50/60 p-4 text-[13px] leading-relaxed text-emerald-900">
            <b>Demo tip:</b> start as <b>Farmer</b>, list a tomato harvest, then switch to <b>Buyer</b> from the
            header to create a 1,000 kg requirement and watch the matching engine pool the supply.
          </div>

          <p className="mt-6 text-center text-xs text-ink-400">
            New to the network? <Link href="/register" className="font-semibold text-emerald-700 hover:underline">Create a prototype account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
