"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AIInsightCard({
  title = "AI Market Insight",
  headline,
  body,
  cta,
  href,
  accent = "emerald",
  className,
}: {
  title?: string;
  headline: string;
  body: string;
  cta: string;
  href: string;
  accent?: "emerald" | "amber";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-forest-950 p-6 text-white shadow-lift",
        className
      )}
    >
      {/* decorative field-grid + glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff22 1px, transparent 1px), linear-gradient(90deg, #ffffff22 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className={cn("pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl", accent === "emerald" ? "bg-emerald-500/30" : "bg-amber-500/25")} />

      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20">
            <Sparkles className="h-4 w-4 text-emerald-300" />
          </span>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300/90">{title}</p>
          <span className="ml-auto hidden rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-medium text-white/60 sm:inline">
            Prototype recommendation
          </span>
        </div>
        <p className="mt-4 text-[19px] font-bold leading-snug tracking-tight">{headline}</p>
        <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-emerald-50/70">{body}</p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
