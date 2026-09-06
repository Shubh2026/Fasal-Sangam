"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Inbox, Loader2 } from "lucide-react";

/* ── Card ─────────────────────────────────────────────────────────────── */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-cream-200 bg-white shadow-card", className)}>
      {children}
    </div>
  );
}

/* ── Buttons ──────────────────────────────────────────────────────────── */
type Variant = "primary" | "secondary" | "ghost" | "dark" | "outlineSoft";
type Size = "sm" | "md" | "lg";

export const btnClass = (v: Variant = "primary", s: Size = "md", extra?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all active:scale-[0.98] whitespace-nowrap",
    s === "sm" && "h-8 px-3 text-[13px]",
    s === "md" && "h-10 px-4 text-sm",
    s === "lg" && "h-12 px-6 text-[15px]",
    v === "primary" && "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700",
    v === "secondary" && "border border-cream-300 bg-white text-ink-900 hover:border-emerald-600/40 hover:bg-emerald-50/60",
    v === "ghost" && "text-ink-500 hover:bg-cream-100 hover:text-ink-900",
    v === "dark" && "bg-forest-900 text-white hover:bg-forest-800",
    v === "outlineSoft" && "border border-white/25 bg-white/5 text-white hover:bg-white/10",
    extra
  );

export function Button({
  variant = "primary",
  size = "md",
  className,
  loading,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; loading?: boolean }) {
  return (
    <button className={cn(btnClass(variant, size), className)} disabled={loading || props.disabled} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

/* ── Badge / chips ────────────────────────────────────────────────────── */
export type Tone = "emerald" | "amber" | "sky" | "rose" | "slate" | "forest";
const toneMap: Record<Tone, string> = {
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-800 ring-amber-600/25",
  sky: "bg-sky-50 text-sky-700 ring-sky-600/20",
  rose: "bg-rose-50 text-rose-700 ring-rose-600/20",
  slate: "bg-cream-100 text-ink-600 ring-ink-400/15",
  forest: "bg-forest-900 text-emerald-300 ring-white/10",
};
export function Badge({ tone = "slate", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset", toneMap[tone], className)}>
      {children}
    </span>
  );
}

export function StatusPill({ status, className }: { status: string; className?: string }) {
  const s = status.toLowerCase();
  const tone: Tone =
    s.includes("deliver") || s.includes("matched") || s.includes("confirmed") || s.includes("in-order")
      ? "emerald"
      : s.includes("transit") || s.includes("in transit")
      ? "sky"
      : s.includes("prepar") || s.includes("pickup") || s.includes("matching") || s.includes("scheduled")
      ? "amber"
      : s.includes("finding") ? "rose"
      : "slate";
  const dot = s.includes("transit") ? "bg-sky-500" : tone === "emerald" ? "bg-emerald-500" : tone === "amber" ? "bg-amber-500" : tone === "rose" ? "bg-rose-500" : "bg-ink-400";
  return (
    <Badge tone={tone} className={className}>
      <span className={cn("h-1.5 w-1.5 rounded-full", dot, (s.includes("transit") || s.includes("matching")) && "animate-pulse")} />
      {status}
    </Badge>
  );
}

export function GradeChip({ grade }: { grade: string }) {
  return (
    <Badge tone={grade === "A" ? "emerald" : "amber"}>Grade {grade}</Badge>
  );
}

/* ── Section heading ──────────────────────────────────────────────────── */
export function SectionTitle({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-[17px] font-bold tracking-tight text-ink-900">{title}</h2>
        {hint && <p className="mt-0.5 text-[13px] text-ink-500">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

/* ── KPI ──────────────────────────────────────────────────────────────── */
export function KpiCard({
  label, value, sub, icon, trend, tone = "emerald",
}: { label: string; value: string; sub?: string; icon: ReactNode; trend?: string; tone?: "emerald" | "amber" | "sky" | "forest" }) {
  const bg =
    tone === "forest" ? "bg-forest-900 text-white border-forest-800" : "bg-white border-cream-200";
  const iconWrap =
    tone === "forest" ? "bg-white/10 text-emerald-300"
      : tone === "amber" ? "bg-amber-50 text-amber-600"
      : tone === "sky" ? "bg-sky-50 text-sky-600"
      : "bg-emerald-50 text-emerald-600";
  return (
    <Card className={cn("p-5", bg)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={cn("text-[12.5px] font-medium", tone === "forest" ? "text-emerald-100/70" : "text-ink-500")}>{label}</p>
          <p className={cn("tabular mt-1.5 text-[26px] font-extrabold tracking-tight leading-none", tone === "forest" ? "text-white" : "text-ink-900")}>
            {value}
          </p>
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", iconWrap)}>{icon}</div>
      </div>
      {(sub || trend) && (
        <div className="mt-3 flex items-center gap-2">
          {trend && <Badge tone={tone === "forest" ? "forest" : "emerald"}>{trend}</Badge>}
          {sub && <span className={cn("text-[12px]", tone === "forest" ? "text-emerald-100/60" : "text-ink-500")}>{sub}</span>}
        </div>
      )}
    </Card>
  );
}

/* ── Empty / loading ──────────────────────────────────────────────────── */
export function EmptyState({ title, hint, action, icon }: { title: string; hint?: string; action?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-cream-300 bg-white/60 px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-100 text-ink-400">
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>
      <p className="text-sm font-semibold text-ink-900">{title}</p>
      {hint && <p className="mt-1 max-w-sm text-[13px] text-ink-500">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LoadingCard({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-cream-200 bg-white px-6 py-10 text-sm text-ink-500">
      <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
      {label}
    </div>
  );
}

/* ── Field primitives ─────────────────────────────────────────────────── */
export function Field({ label, children, hint, required }: { label: string; children: ReactNode; hint?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-[13px] font-semibold text-ink-900">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-400">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-cream-300 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15 outline-none transition";

/* ── Meter ────────────────────────────────────────────────────────────── */
export function Meter({ value, className, barClass }: { value: number; className?: string; barClass?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-cream-200", className)}>
      <div className={cn("h-full rounded-full bg-emerald-500 transition-all duration-700", barClass)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
