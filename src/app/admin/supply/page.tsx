"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Warehouse, Tractor, Layers } from "lucide-react";
import { Card, SectionTitle, Badge, Meter, inputCls } from "@/components/ui/primitives";
import { marketplaceSupply, supplyPool, cropById, networkKpis } from "@/data/mock";
import { cn, qty } from "@/lib/utils";

export default function AdminSupplyPage() {
  const [q, setQ] = useState("");
  const pool = useMemo(
    () => supplyPool.filter((s) => (s.name + s.crop + s.type).toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <div className="space-y-7 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Supply</h1>
        <p className="mt-1 text-sm text-ink-500">Every listing, lot and FPO pool feeding the network.</p>
      </div>

      <div className="stagger grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { l: "Total produce listed", v: qty(networkKpis.listedKg) },
          { l: "Active listings", v: "214" },
          { l: "FPO collection centres", v: "14" },
          { l: "Avg. days-to-match", v: "1.8" },
        ].map((s) => (
          <Card key={s.l} className="p-4">
            <p className="text-xs font-medium text-ink-400">{s.l}</p>
            <p className="tabular mt-1 text-xl font-extrabold tracking-tight text-ink-900">{s.v}</p>
          </Card>
        ))}
      </div>

      {/* pooled lots */}
      <div>
        <SectionTitle title="Aggregated supply pools" hint="What buyers actually see in the marketplace" />
        <div className="stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {marketplaceSupply.map((s) => {
            const crop = cropById[s.crop];
            return (
              <Card key={s.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-cream-200">
                    <Image src={crop.image} alt={crop.name} fill className="object-cover" sizes="44px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-bold text-ink-900">{crop.name} · {s.location}</p>
                    <p className="text-xs text-ink-500">{s.sources} · Grade {s.grade}</p>
                  </div>
                  <p className="tabular text-sm font-extrabold text-ink-900">₹{s.avgPrice}/kg</p>
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-[11px]">
                    <span className="font-medium text-ink-400">Pool volume</span>
                    <span className="tabular font-bold">{qty(s.available)}</span>
                  </div>
                  <Meter value={(s.available / 8400) * 100} />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* supplier registry */}
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-cream-200 p-4">
          <h2 className="flex items-center gap-2 font-bold text-ink-900"><Layers className="h-4 w-4 text-emerald-600" /> Supplier registry</h2>
          <div className="relative ml-auto w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search suppliers…" className={cn(inputCls, "pl-10")} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-cream-200 bg-cream-50 text-left text-[11px] font-bold uppercase tracking-wider text-ink-400">
                <th className="px-5 py-3">Supplier</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Crop</th>
                <th className="px-5 py-3">Available</th><th className="px-5 py-3">Grade</th><th className="px-5 py-3">Distance</th>
              </tr>
            </thead>
            <tbody>
              {pool.map((s) => (
                <tr key={s.name} className="border-b border-cream-100 text-sm last:border-0 hover:bg-cream-50/60">
                  <td className="px-5 py-3 font-semibold text-ink-900">{s.name}</td>
                  <td className="px-5 py-3">
                    <Badge tone={s.type === "FPO" ? "forest" : "slate"}>
                      {s.type === "FPO" ? <Warehouse className="h-3 w-3" /> : <Tractor className="h-3 w-3" />} {s.type}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 capitalize">{s.crop}</td>
                  <td className="tabular px-5 py-3">{qty(s.qty)}</td>
                  <td className="px-5 py-3"><Badge tone={s.grade === "A" ? "emerald" : "amber"}>{s.grade}</Badge></td>
                  <td className="tabular px-5 py-3">{s.distance} km</td>
                </tr>
              ))}
              {pool.length === 0 && <tr><td colSpan={6} className="px-5 py-8 text-center text-sm text-ink-400">No suppliers found.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
