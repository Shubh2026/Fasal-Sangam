"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, RotateCcw, Lightbulb } from "lucide-react";
import { Button, Card, Field, inputCls, EmptyState } from "@/components/ui/primitives";
import { MatchingSimulation } from "@/components/match/MatchingSimulation";
import { SupplyCluster } from "@/components/aggregate/SupplyCluster";
import { useApp } from "@/components/providers/AppProvider";
import { crops, locationList, heroOrder, type FSOrder, cropById } from "@/data/mock";
import { cn, qty } from "@/lib/utils";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDate(d: string) {
  const dt = new Date(d + "T00:00:00");
  return isNaN(dt.getTime()) ? d : `${dt.getDate()} ${MONTHS[dt.getMonth()]}`;
}

type Phase = "form" | "matching" | "result";

export default function CreateRequestPage() {
  const { setDemoOrder, toast, setRequirementTried } = useApp();
  const router = useRouter();

  const [cropKey, setCropKey] = useState("tomato");
  const [quantity, setQuantity] = useState("1000");
  const [unit, setUnit] = useState("kg");
  const [grade, setGrade] = useState("A");
  const [delivery, setDelivery] = useState("2026-09-15");
  const [location, setLocation] = useState("Chandigarh");
  const [maxPrice, setMaxPrice] = useState("34");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("form");
  const [confirming, setConfirming] = useState(false);

  const qtyKg = useMemo(() => {
    const q = parseFloat(quantity) || 0;
    return unit === "quintal" ? q * 100 : unit === "tonne" ? q * 1000 : q;
  }, [quantity, unit]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!qtyKg || qtyKg <= 0) errs.quantity = "Enter a quantity above 0";
    if (!delivery) errs.delivery = "Choose a delivery date";
    const p = parseFloat(maxPrice);
    if (!p || p <= 0) errs.maxPrice = "Enter your ceiling price";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setPhase("matching");
    window.setTimeout(() => document.getElementById("match-results")?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
  }

  function confirmCluster() {
    setConfirming(true);
    window.setTimeout(() => {
      const order: FSOrder = {
        ...heroOrder,
        id: "FS-2031",
        status: "In Transit",
        matchScore: 94,
        deliveryDate: fmtDate(delivery),
        timeline: [
          { label: "Order placed", time: "Just now", done: true },
          { label: "Farmers matched", time: "Just now", done: true },
          { label: "Produce being prepared", time: "Today, 4:00 PM", done: true },
          { label: "Pickup scheduled", time: "Tomorrow, 7:00 AM", done: true },
          { label: "In transit", time: "Tomorrow, 12:00 PM", done: true },
          { label: "Delivered", time: `ETA ${fmtDate(delivery)}`, done: false },
        ],
      };
      setDemoOrder(order);
      setRequirementTried(true);
      toast(`Order ${order.id} created`, `${qty(qtyKg)} pooled from 3 suppliers · route optimized to 68 km.`);
      router.push("/buyer/tracking");
    }, 700);
  }

  const crop = cropById[(cropKey as keyof typeof cropById) ?? "tomato"] ?? cropById.tomato;

  return (
    <div className="space-y-7 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">What do you need?</h1>
        <p className="mt-1 text-sm text-ink-500">Describe the requirement — the matching engine pools supply from farmers and FPOs.</p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* form */}
        <Card className="p-6">
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2" noValidate>
            <Field label="Crop" required>
              <select className={inputCls} value={cropKey} onChange={(e) => setCropKey(e.target.value)}>
                {crops.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Quality" required>
              <select className={inputCls} value={grade} onChange={(e) => setGrade(e.target.value)}>
                <option value="A">Grade A — premium</option>
                <option value="B">Grade B — standard</option>
              </select>
            </Field>
            <div className="grid grid-cols-[1fr_110px] gap-3">
              <Field label="Required quantity" required>
                <input className={cn(inputCls, errors.quantity && "border-rose-400")} inputMode="decimal" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                {errors.quantity && <span className="mt-1 block text-xs font-medium text-rose-600">{errors.quantity}</span>}
              </Field>
              <Field label="Unit">
                <select className={inputCls} value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option>kg</option><option>quintal</option><option>tonne</option>
                </select>
              </Field>
            </div>
            <Field label="Delivery date" required>
              <input type="date" className={cn(inputCls, errors.delivery && "border-rose-400")} value={delivery} onChange={(e) => setDelivery(e.target.value)} min="2026-09-13" />
              {errors.delivery && <span className="mt-1 block text-xs font-medium text-rose-600">{errors.delivery}</span>}
            </Field>
            <Field label="Delivery location" required>
              <select className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)}>
                {locationList.map((l) => <option key={l}>{l}</option>)}
              </select>
            </Field>
            <Field label="Maximum price (₹/kg)" required hint="You'll only be matched below this ceiling.">
              <input className={cn(inputCls, errors.maxPrice && "border-rose-400")} inputMode="decimal" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              {errors.maxPrice && <span className="mt-1 block text-xs font-medium text-rose-600">{errors.maxPrice}</span>}
            </Field>
            <div className="sm:col-span-2">
              <Field label="Additional requirements (optional)">
                <textarea className={cn(inputCls, "min-h-20 resize-none")} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. ripe-firm, 20 kg crates, morning delivery slot…" />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <div className="mb-4 rounded-xl bg-cream-50 px-4 py-3 text-[13px] text-ink-600">
                Requirement: <b>{crop.name}</b> · <b className="tabular">{qtyKg.toLocaleString("en-IN")} kg</b> · Grade {grade} · by <b>{fmtDate(delivery)}</b> · {location} · ≤ ₹{maxPrice || "—"}/kg
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Sparkles className="h-4 w-4" /> Find Supply with AI Matching
              </Button>
            </div>
          </form>
        </Card>

        {/* explainer */}
        <div className="space-y-4">
          <Card className="p-5">
            <p className="flex items-center gap-2 font-bold text-ink-900"><Lightbulb className="h-4.5 w-4.5 text-amber-500" /> How aggregation helps you</p>
            <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-ink-500">
              <li><b className="text-ink-900">No supplier is too small.</b> 3–5 farms each contribute a share toward your full quantity.</li>
              <li><b className="text-ink-900">One pooled route.</b> Pickups are sequenced so logistics stays ~₹2/kg even across farms.</li>
              <li><b className="text-ink-900">Grade-consistent lots.</b> Only matching quality is pooled together.</li>
            </ul>
          </Card>
          <Card className="p-5">
            <p className="text-sm font-bold text-ink-900">Right now in the Rajpura–Mohali corridor</p>
            <ul className="mt-3 space-y-2 text-[13px] text-ink-500">
              <li className="flex justify-between"><span>Live suppliers (all crops)</span><b className="tabular">18</b></li>
              <li className="flex justify-between"><span>Tomato lots within 60 km</span><b className="tabular">7</b></li>
              <li className="flex justify-between"><span>FPO collection centres</span><b className="tabular">2</b></li>
            </ul>
          </Card>
        </div>
      </div>

      {/* matching + results */}
      {phase !== "form" && (
        <div id="match-results" className="scroll-mt-24">
          <MatchingSimulation
            run={phase === "matching"}
            onComplete={() => { setPhase("result"); window.setTimeout(() => document.getElementById("cluster-results")?.scrollIntoView({ behavior: "smooth" }), 350); }}
          />
        </div>
      )}

      {phase === "result" && (
        <div id="cluster-results" className="scroll-mt-24 space-y-4 animate-fade-up">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Result</span>
            <h2 className="text-lg font-extrabold tracking-tight text-ink-900">Supply cluster built for your requirement</h2>
          </div>
          <SupplyCluster
            requirement={{ crop: cropKey, qty: Math.round(qtyKg), grade: `Grade ${grade}`, delivery: fmtDate(delivery), location, maxPrice: parseFloat(maxPrice) || 34 }}
            suppliers={[
              { name: "Gurpreet Singh", type: "Farmer", qty: 350, amount: 10500, location: "GreenField Farm, Rajpura", distance: 32 },
              { name: "Simran Kaur", type: "Farmer", qty: 250, amount: 7500, location: "Sector 82 Farm, Mohali", distance: 41 },
              { name: "Patiala FPO", type: "FPO", qty: 400, amount: 12000, location: "FPO Collection Centre, Patiala", distance: 38 },
            ]}
            score={94}
            actions={
              <>
                <Button variant="secondary" onClick={() => { setPhase("form"); }}><RotateCcw className="h-4 w-4" /> Adjust requirement</Button>
                <Button size="lg" loading={confirming} onClick={confirmCluster}>
                  Confirm Supply Cluster <ArrowRight className="h-4 w-4" />
                </Button>
              </>
            }
          />
          <p className="text-xs text-ink-400">
            By confirming, each supplier locks their share at ₹30/kg. You pay ₹32/kg all-in (farmer ₹30 + pooled logistics ₹2).
          </p>
        </div>
      )}

      {phase === "form" && (
        <EmptyState
          title="The engine is standing by"
          hint="Submit the requirement above to see suppliers analyzed, scored, clustered and routed — live."
        />
      )}
    </div>
  );
}
