"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarDays, Package, Award } from "lucide-react";
import { cropById, type BuyerMatch } from "@/data/mock";
import { Badge, btnClass, Meter } from "@/components/ui/primitives";
import { cn, qty } from "@/lib/utils";

/* Radial match score with animated ring */
export function MatchScore({ score, size = 104, stroke = 9 }: { score: number; size?: number; stroke?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const r = requestAnimationFrame(() => setVal(score));
    return () => cancelAnimationFrame(r);
  }, [score]);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = score >= 90 ? "#059669" : score >= 80 ? "#d97706" : "#64748b";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }} role="img" aria-label={`${score}% match`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eceadf" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * val) / 100}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="tabular font-extrabold leading-none tracking-tight text-ink-900" style={{ fontSize: size * 0.26, color }}>
          {Math.round(score)}%
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">match</span>
      </div>
    </div>
  );
}

export function MatchCard({ match, onAccept, accepted }: { match: BuyerMatch; onAccept?: (m: BuyerMatch) => void; accepted?: boolean }) {
  const crop = cropById[match.crop];
  return (
    <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-card transition hover:shadow-lift">
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-cream-200">
          <Image src={crop.image} alt={crop.name} fill className="object-cover" sizes="56px" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[15px] font-bold text-ink-900">{match.buyer}</p>
            <Badge tone="slate">{match.buyerType}</Badge>
            {accepted && <Badge tone="emerald">Accepted</Badge>}
          </div>
          <p className="mt-0.5 text-[13px] text-ink-500">
            {crop.name} · Requires {qty(match.required)}
          </p>
        </div>
        <MatchScore score={match.score} size={84} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] sm:grid-cols-4">
        <span className="flex items-center gap-1.5 text-ink-600">
          <Package className="h-3.5 w-3.5 text-emerald-600" />
          Network supply: <b className="tabular">{qty(match.networkAvailable)}</b>
        </span>
        <span className="flex items-center gap-1.5 text-ink-600">
          <MapPin className="h-3.5 w-3.5 text-emerald-600" />
          Distance: <b className="tabular">{match.distance} km</b>
        </span>
        <span className="flex items-center gap-1.5 text-ink-600">
          <CalendarDays className="h-3.5 w-3.5 text-emerald-600" />
          Harvest: <b>{match.harvestWindow}</b>
        </span>
        <span className="flex items-center gap-1.5 text-ink-600">
          <Award className="h-3.5 w-3.5 text-emerald-600" />
          Quality: <b>Grade {match.grade}</b>
        </span>
      </div>

      <div className="mt-4 rounded-xl bg-cream-50 p-3">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-ink-500">Your share of this combined order</span>
          <span className="tabular font-bold text-ink-900">{qty(match.yourShare)} · ₹{(match.yourShare * match.price).toLocaleString("en-IN")}</span>
        </div>
        <Meter value={(match.yourShare / match.required) * 100} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="mr-auto text-[13px] text-ink-500">
          Farmer gets <b className="text-emerald-700">₹{match.price}/kg</b> · logistics ₹{match.logistics}/kg · deliver by <b>{match.deliveryBy}</b>
        </p>
        <Link href="/buyer/product/S-T1" className={btnClass("secondary", "sm")}>View Details</Link>
        <button
          onClick={() => onAccept?.(match)}
          disabled={accepted}
          className={cn(btnClass(accepted ? "secondary" : "primary", "sm"), accepted && "border-emerald-600/40 text-emerald-700")}
        >
          {accepted ? "Match Accepted ✓" : "Accept Match"}
        </button>
      </div>
    </div>
  );
}
