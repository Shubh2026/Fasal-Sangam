"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Package } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { Button, Card, EmptyState, SectionTitle, Badge, StatusPill } from "@/components/ui/primitives";
import { HarvestCard } from "@/components/cards/HarvestCard";
import { farmerListings } from "@/data/mock";
import { qty } from "@/lib/utils";

export default function ProducePage() {
  const { listings, toast } = useApp();
  const router = useRouter();
  const all = [...listings, ...farmerListings];

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">My Produce</h1>
          <p className="mt-1 text-sm text-ink-500">Listed harvests — visible to buyers and the matching engine.</p>
        </div>
        <Link href="/farmer/produce/new"><Button><Plus className="h-4 w-4" /> List Produce</Button></Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { l: "Total listings", v: `${all.length}` },
          { l: "Total quantity", v: qty(all.reduce((s, l) => s + l.qty, 0)) },
          { l: "Matched", v: qty(all.reduce((s, l) => s + (l.matchedQty ?? 0), 0)) },
          { l: "Open to offers", v: `${all.filter((l) => l.status === "listed").length} lots` },
        ].map((s) => (
          <Card key={s.l} className="p-4">
            <p className="text-xs font-medium text-ink-400">{s.l}</p>
            <p className="tabular mt-1 text-xl font-extrabold tracking-tight text-ink-900">{s.v}</p>
          </Card>
        ))}
      </div>

      <div>
        <SectionTitle title="Active listings" hint="Newestly added appear first" />
        {all.length === 0 ? (
          <EmptyState title="No produce listed yet" hint="List an upcoming harvest so buyers and the matching engine can find you." action={<Link href="/farmer/produce/new"><Button>List Produce</Button></Link>} icon={<Package className="h-6 w-6" />} />
        ) : (
          <div className="stagger grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {all.map((l) => (
              <div key={l.id} className="relative">
                {l.addedByUser && <Badge tone="emerald" className="absolute -top-2 left-3 z-10 border border-emerald-600/20 shadow-sm">Just added</Badge>}
                <HarvestCard listing={l} onFindBuyers={() => { toast("Finding buyers…", "Redirecting to smart matches.", "info"); router.push("/farmer/matches"); }} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-ink-900">How matching works</h3>
            <p className="mt-1 max-w-xl text-[13px] text-ink-500">
              Every listing is scored against live buyer requirements on crop, quantity, grade, distance, harvest window and price.
              When a large order appears, Fasal Sangam pools several farms into one combined order — you get a confirmed share.
            </p>
          </div>
          <StatusPill status="Matching" />
        </div>
      </Card>
    </div>
  );
}
