"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, TrendingUp, Users } from "lucide-react";
import { cropById, type ProduceListing } from "@/data/mock";
import { GradeChip, StatusPill, Badge } from "@/components/ui/primitives";
import { qty } from "@/lib/utils";

export function HarvestCard({
  listing,
  onFindBuyers,
  findBuyersLabel = "Find Buyers",
}: {
  listing: ProduceListing;
  onFindBuyers?: (l: ProduceListing) => void;
  findBuyersLabel?: string;
}) {
  const crop = cropById[listing.crop];
  return (
    <div className="group rounded-2xl border border-cream-200 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start gap-3.5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-cream-200">
          <Image src={crop.image} alt={crop.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="64px" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-[15px] font-bold text-ink-900">{crop.name}</p>
            <GradeChip grade={listing.grade} />
            {listing.status !== "listed" && <StatusPill status={listing.status === "in-order" ? "In Order" : listing.status === "matched" ? "Matched" : "Delivered"} />}
          </div>
          <p className="tabular mt-0.5 text-xl font-extrabold tracking-tight text-ink-900">{qty(listing.qty)}</p>
        </div>
      </div>

      <dl className="mt-3.5 space-y-1.5 text-[13px]">
        <div className="flex items-center justify-between">
          <dt className="flex items-center gap-1.5 text-ink-500"><CalendarDays className="h-3.5 w-3.5" /> Harvest</dt>
          <dd className="font-semibold text-ink-900">{listing.harvest} <span className="text-ink-400 font-normal">· {listing.harvestIn}</span></dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="flex items-center gap-1.5 text-ink-500"><TrendingUp className="h-3.5 w-3.5" /> Expected price</dt>
          <dd className="tabular font-semibold text-emerald-700">₹{listing.price}/kg</dd>
        </div>
        {typeof listing.potentialBuyers === "number" && listing.potentialBuyers > 0 && (
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-1.5 text-ink-500"><Users className="h-3.5 w-3.5" /> Potential buyers</dt>
            <dd><Badge tone="sky">{listing.potentialBuyers}</Badge></dd>
          </div>
        )}
        {listing.matchedQty ? (
          <div className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
            {qty(listing.matchedQty)} already matched with buyers
          </div>
        ) : null}
      </dl>

      <button
        onClick={() => onFindBuyers?.(listing)}
        className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-50/70 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-600 hover:text-white"
      >
        {findBuyersLabel}
      </button>
    </div>
  );
}

/** Inline link variant for secondary contexts */
export function HarvestLink() {
  return <Link href="/farmer/matches" className="underline">matches</Link>;
}
