"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tractor, ShoppingBasket, ArrowRight, Check } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button, Card, Field, inputCls } from "@/components/ui/primitives";
import { useApp, type Role } from "@/components/providers/AppProvider";
import { roleHome } from "@/components/shell/nav";
import { locationList } from "@/data/mock";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const { setRole, toast } = useApp();
  const router = useRouter();
  const [role, setRoleSel] = useState<Role>("farmer");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [loc, setLoc] = useState(locationList[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name";
    if (!org.trim()) errs.org = role === "farmer" ? "Enter farm or FPO name" : "Enter organisation name";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setDone(true);
    window.setTimeout(() => {
      setRole(role);
      toast("Prototype account created", `Signed in as ${role === "farmer" ? "Farmer / FPO" : "Buyer"}.`);
      router.push(roleHome[role]);
    }, 900);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-4 py-10">
      <Card className="w-full max-w-md p-6 sm:p-8 animate-fade-up">
        <Logo size="sm" />
        <h1 className="mt-5 text-xl font-extrabold tracking-tight text-ink-900">Create prototype account</h1>
        <p className="mt-1 text-sm text-ink-500">Registration is simulated — no credentials are stored.</p>

        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Account type">
            {([
              { id: "farmer" as Role, label: "Farmer / FPO", icon: Tractor },
              { id: "buyer" as Role, label: "Buyer", icon: ShoppingBasket },
            ]).map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => setRoleSel(r.id)}
                aria-pressed={role === r.id}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border p-3 text-left text-sm font-semibold transition",
                  role === r.id ? "border-emerald-600 bg-emerald-50 text-emerald-800" : "border-cream-300 text-ink-600 hover:border-emerald-600/40"
                )}
              >
                <r.icon className="h-4.5 w-4.5" /> {r.label}
                {role === r.id && <Check className="ml-auto h-4 w-4" />}
              </button>
            ))}
          </div>

          <Field label="Your name" required>
            <input className={cn(inputCls, errors.name && "border-rose-400")} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Gurpreet Singh" />
            {errors.name && <span className="mt-1 block text-xs font-medium text-rose-600">{errors.name}</span>}
          </Field>
          <Field label={role === "farmer" ? "Farm / FPO name" : "Organisation"} required>
            <input className={cn(inputCls, errors.org && "border-rose-400")} value={org} onChange={(e) => setOrg(e.target.value)} placeholder={role === "farmer" ? "e.g. GreenField Farm, Rajpura" : "e.g. FreshMart Wholesale"} />
            {errors.org && <span className="mt-1 block text-xs font-medium text-rose-600">{errors.org}</span>}
          </Field>
          <Field label="Location">
            <select className={inputCls} value={loc} onChange={(e) => setLoc(e.target.value)}>
              {locationList.map((l) => <option key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Mobile (optional)">
            <input className={inputCls} inputMode="tel" placeholder="+91 ·····" />
          </Field>

          <Button type="submit" size="lg" className="w-full" loading={done}>
            {done ? "Creating…" : "Create account"} {!done && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>

        <p className="mt-5 text-center text-xs text-ink-400">
          Already exploring? <Link href="/login" className="font-semibold text-emerald-700 hover:underline">Back to role login</Link>
        </p>
      </Card>
    </div>
  );
}
