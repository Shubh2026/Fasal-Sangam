"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarDays, Layers, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { cropById, type AggregateSupply } from "@/data/mock";
import { Badge, GradeChip } from "@/components/ui/primitives";
import { qty } from "@/lib/utils";

export function MarketplaceCard({ item }: { item: AggregateSupply }) {
  const crop = cropById[item.crop];
  return (
    <Link
      href={`/buyer/product/${item.id}`}
      className="group block overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative h-40 overflow-hidden">
        <Image src={crop.image} alt={crop.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 768px) 25vw, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/45 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <GradeChip grade={item.grade} />
          <Badge tone="forest" className="backdrop-blur"><Layers className="h-3 w-3" /> Aggregated supply</Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <p className="text-lg font-extrabold tracking-tight text-white drop-shadow">{crop.name}</p>
          <p className="tabular rounded-lg bg-white/95 px-2 py-1 text-sm font-extrabold text-ink-900">
            ₹{item.avgPrice}<span className="text-xs font-semibold text-ink-400">/kg</span>
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="tabular text-[15px] font-bold text-ink-900">{qty(item.available)} <span className="text-xs font-medium text-ink-400">available</span></p>
          <span className={item.priceTrend >= 0 ? "flex items-center gap-0.5 text-xs font-bold text-emerald-600" : "flex items-center gap-0.5 text-xs font-bold text-rose-600"}>
            {item.priceTrend >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {Math.abs(item.priceTrend)}%
          </span>
        </div>

        <ul className="mt-3 space-y-1.5 text-[12.5px] text-ink-500">
          <li className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 shrink-0 text-ink-400" /> Harvest: <b className="text-ink-900">{item.harvest}</b></li>
          <li className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 shrink-0 text-ink-400" /> {item.location} · {item.distance} km away</li>
          <li className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5 shrink-0 text-ink-400" /> Combined from <b className="text-ink-900">{item.sources}</b></li>
        </ul>

        <span className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cream-300 py-2.5 text-sm font-semibold text-ink-900 transition group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white">
          View Supply <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
