"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Sparkles, TrendingUp, Users, Tag, CalendarDays, CheckCircle2, ArrowRight } from "lucide-react";
import { Button, Card, Field, inputCls, Badge } from "@/components/ui/primitives";
import { SuccessModal } from "@/components/modals/SuccessModal";
import { useApp } from "@/components/providers/AppProvider";
import { crops, forecasts, locationList, cropById, type CropId } from "@/data/mock";
import { cn, pct } from "@/lib/utils";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function NewProducePage() {
  const { addListing } = useApp();
  const [crop, setCrop] = useState<CropId>("tomato");
  const [quantity, setQuantity] = useState("350");
  const [unit, setUnit] = useState("kg");
  const [date, setDate] = useState("2026-09-12");
  const [grade, setGrade] = useState("A");
  const [price, setPrice] = useState("30");
  const [location, setLocation] = useState(locationList[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const f = forecasts[crop];
  const qtyKg = useMemo(() => {
    const q = parseFloat(quantity) || 0;
    return unit === "quintal" ? q * 100 : unit === "tonne" ? q * 1000 : q;
  }, [quantity, unit]);

  const harvestLabel = useMemo(() => {
    if (!date) return "—";
    const d = new Date(date + "T00:00:00");
    if (isNaN(d.getTime())) return "—";
    const end = new Date(d); end.setDate(end.getDate() + 3);
    return `${d.getDate()}–${end.getDate()} ${MONTHS[d.getMonth()]}`;
  }, [date]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!qtyKg || qtyKg <= 0) errs.quantity = "Enter a quantity above 0";
    if (!date) errs.date = "Pick an expected harvest date";
    const p = parseFloat(price);
    if (!p || p <= 0) errs.price = "Enter expected price per kg";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    window.setTimeout(() => {
      addListing({
        crop, qty: Math.round(qtyKg), harvest: harvestLabel, harvestIn: "within a week",
        grade: grade as "A" | "B", price: p, location,
      });
      setSubmitting(false);
      setSuccess(true);
    }, 900);
  }

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">List Your Produce</h1>
        <p className="mt-1 text-sm text-ink-500">Buyers and the matching engine will see this listing immediately.</p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* form */}
        <Card className="p-6">
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2" noValidate>
            <Field label="Crop" required>
              <select className={inputCls} value={crop} onChange={(e) => setCrop(e.target.value as CropId)}>
                {crops.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.hindi})</option>)}
              </select>
            </Field>
            <Field label="Quality grade" required hint="Grade A: uniform size, no damage">
              <select className={inputCls} value={grade} onChange={(e) => setGrade(e.target.value)}>
                <option value="A">Grade A — premium</option>
                <option value="B">Grade B — standard</option>
              </select>
            </Field>
            <div className="grid grid-cols-[1fr_110px] gap-3">
              <Field label="Expected quantity" required>
                <input
                  className={cn(inputCls, errors.quantity && "border-rose-400")}
                  inputMode="decimal" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="350"
                />
                {errors.quantity && <span className="mt-1 block text-xs font-medium text-rose-600">{errors.quantity}</span>}
              </Field>
              <Field label="Unit">
                <select className={inputCls} value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option>kg</option><option>quintal</option><option>tonne</option>
                </select>
              </Field>
            </div>
            <Field label="Expected harvest date" required>
              <input type="date" className={cn(inputCls, errors.date && "border-rose-400")} value={date} onChange={(e) => setDate(e.target.value)} min="2026-09-01" />
              {errors.date && <span className="mt-1 block text-xs font-medium text-rose-600">{errors.date}</span>}
            </Field>
            <Field label="Expected price (₹/kg)" required hint={`AI suggestion for ${cropById[crop].name}: ${f.suggestedPrice}`}>
              <input className={cn(inputCls, errors.price && "border-rose-400")} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
              {errors.price && <span className="mt-1 block text-xs font-medium text-rose-600">{errors.price}</span>}
            </Field>
            <Field label="Farm location" required>
              <select className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)}>
                {locationList.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Photo (optional)" hint="Adds trust — skipped in this demo">
              <label className="flex h-[42px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-cream-300 text-sm text-ink-400 transition hover:border-emerald-600/50 hover:text-emerald-700">
                <input type="file" accept="image/*" className="sr-only" />
                Upload image
              </label>
            </Field>
            <div className="sm:col-span-2">
              <div className="mb-4 rounded-xl bg-cream-50 px-4 py-3 text-[13px] text-ink-600">
                Listing summary: <b>{cropById[crop].name}</b> · <b className="tabular">{qtyKg.toLocaleString("en-IN")} kg</b> · Grade {grade} · harvest <b>{harvestLabel}</b> · ₹{price || "—"}/kg · {location}
              </div>
              <Button type="submit" size="lg" className="w-full" loading={submitting}>
                {submitting ? "Publishing listing…" : "List Produce"}
              </Button>
            </div>
          </form>
        </Card>

        {/* AI assistant panel */}
        <div className="space-y-4">
          <Card className="overflow-hidden border-emerald-600/20">
            <div className="relative h-24">
              <Image src={cropById[crop].image} alt={cropById[crop].name} fill className="object-cover" sizes="400px" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
              <p className="absolute bottom-2.5 left-4 flex items-center gap-1.5 text-sm font-bold text-white">
                <Sparkles className="h-4 w-4 text-emerald-300" /> Market Insight · {cropById[crop].name}
              </p>
            </div>
            <div className="space-y-3 p-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-ink-500"><TrendingUp className="h-4 w-4 text-emerald-600" /> Current regional demand</span>
                <Badge tone={f.regionalDemand.includes("High") || f.regionalDemand === "Rising" ? "emerald" : "amber"}>{f.regionalDemand}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-500">Predicted trend (next week)</span>
                <span className={cn("tabular font-extrabold", f.trend >= 0 ? "text-emerald-700" : "text-rose-600")}>{pct(f.trend)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-ink-500"><Tag className="h-4 w-4 text-emerald-600" /> Suggested listing price</span>
                <b className="tabular text-ink-900">{f.suggestedPrice}</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-ink-500"><Users className="h-4 w-4 text-emerald-600" /> Active potential buyers</span>
                <b className="tabular text-ink-900">{f.potentialBuyers}</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-ink-500"><CalendarDays className="h-4 w-4 text-emerald-600" /> Your harvest window</span>
                <b className="text-ink-900">{harvestLabel}</b>
              </div>
              <p className="rounded-xl bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-900">
                Recommendations are prototype estimates from marketplace activity — not a price guarantee.
              </p>
            </div>
          </Card>
          <Card className="p-5 text-[13px] text-ink-500">
            <b className="text-ink-900">What happens next?</b>
            <ol className="mt-2 list-inside list-decimal space-y-1">
              <li>Listing is scored against live buyer requirements.</li>
              <li>Compatible buyers appear under Smart Matches.</li>
              <li>Large orders may pool your lot with nearby farms.</li>
            </ol>
          </Card>
        </div>
      </div>

      <SuccessModal
        open={success}
        onClose={() => setSuccess(false)}
        title="Produce listed successfully"
        message={`${qtyKg.toLocaleString("en-IN")} kg of Grade ${grade} ${cropById[crop].name} is live. The matching engine found 3 potential buyer matches.`}
        primary={{ label: "View 3 Matches", href: "/farmer/matches" }}
        secondary={{ label: "Back to My Produce", href: "/farmer/produce" }}
      >
        <div className="mt-5 space-y-2 rounded-2xl bg-cream-50 p-4 text-[13px]">
          {["FreshMart Wholesale · needs 1,000 kg Tomato", "CityFresh Retail · needs 500 kg Tomato", "Regional Distributor · needs 700 kg Onion"].map((m) => (
            <p key={m} className="flex items-center gap-2 text-ink-600">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> {m}
              <ArrowRight className="ml-auto h-3.5 w-3.5 text-ink-300" />
            </p>
          ))}
        </div>
      </SuccessModal>
    </div>
  );
}
