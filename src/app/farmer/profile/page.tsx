"use client";

import { MapPin, BadgeCheck, Sprout, Phone, Landmark, Star, Edit3 } from "lucide-react";
import { Card, SectionTitle, Badge, Button } from "@/components/ui/primitives";
import { useApp } from "@/components/providers/AppProvider";
import { farmerIdentity } from "@/data/mock";

export default function FarmerProfilePage() {
  const { toast } = useApp();

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Profile</h1>
          <p className="mt-1 text-sm text-ink-500">How buyers and the platform see you.</p>
        </div>
        <Button variant="secondary" onClick={() => toast("Edit mode is disabled in the prototype", "Profiles are mock data for this demo.", "info")}>
          <Edit3 className="h-4 w-4" /> Edit
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Card className="p-6 text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-900 text-2xl font-extrabold text-emerald-300 ring-4 ring-emerald-100">
            GS
          </span>
          <h2 className="mt-4 flex items-center justify-center gap-1.5 text-lg font-extrabold text-ink-900">
            {farmerIdentity.name}
            <BadgeCheck className="h-5 w-5 text-emerald-600" aria-label="Verified farmer" />
          </h2>
          <p className="text-sm text-ink-500">{farmerIdentity.org}</p>
          <p className="mt-1.5 flex items-center justify-center gap-1 text-[13px] text-ink-500">
            <MapPin className="h-3.5 w-3.5 text-emerald-600" /> {farmerIdentity.location}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            <Badge tone="emerald"><BadgeCheck className="h-3 w-3" /> KYC verified</Badge>
            <Badge tone="slate"><Star className="h-3 w-3" /> 4.8 supplier rating</Badge>
            <Badge tone="sky">Patiala FPO member</Badge>
          </div>
          <div className="mt-5 grid grid-cols-3 divide-x divide-cream-200 rounded-2xl bg-cream-50 py-3">
            {[{ v: "42", l: "Orders" }, { v: "98%", l: "On-time" }, { v: "2 yrs", l: "On platform" }].map((s) => (
              <div key={s.l}>
                <p className="tabular text-lg font-extrabold text-ink-900">{s.v}</p>
                <p className="text-[11px] text-ink-400">{s.l}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="p-6">
            <SectionTitle title="Farm details" />
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3">
              {[
                { l: "Land holding", v: "8 acres" },
                { l: "Main crops", v: "Tomato · Onion · Wheat" },
                { l: "Soil type", v: "Alluvial loam" },
                { l: "Irrigation", v: "Borewell + canal" },
                { l: "Storage", v: "FPO shared cold room" },
                { l: "Harvest crew", v: "6 seasonal hands" },
              ].map((f) => (
                <div key={f.l} className="rounded-xl bg-cream-50 p-3.5">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">{f.l}</dt>
                  <dd className="mt-1 font-bold text-ink-900">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="p-6">
            <SectionTitle title="Account & payments" />
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 rounded-xl bg-cream-50 p-3.5">
                <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="flex-1 text-ink-600">Mobile</span><b className="tabular">+91 98XXX XX412</b>
              </li>
              <li className="flex items-center gap-3 rounded-xl bg-cream-50 p-3.5">
                <Landmark className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="flex-1 text-ink-600">Payout account</span><b>SBI ···· 8127 (Rajpura)</b>
              </li>
              <li className="flex items-center gap-3 rounded-xl bg-cream-50 p-3.5">
                <Sprout className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="flex-1 text-ink-600">Preferred language</span><b>ਪੰਜਾਬੀ · हिन्दी · English</b>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
