"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Tractor, ShoppingBasket, ShieldCheck } from "lucide-react";
import { useApp, type Role } from "@/components/providers/AppProvider";
import { Sidebar } from "@/components/shell/Sidebar";
import { Header } from "@/components/shell/Header";
import { MobileNav } from "@/components/shell/MobileNav";
import { Logo } from "@/components/ui/Logo";
import { roleHome } from "@/components/shell/nav";
import { cardGate } from "./gate-styles";

function ShellSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100">
      <div className="flex flex-col items-center gap-4">
        <span className="h-12 w-12 animate-pulse rounded-2xl bg-gradient-to-br from-emerald-500 to-forest-700" />
        <p className="animate-pulse text-sm font-medium text-ink-400">Preparing Fasal Sangam…</p>
      </div>
    </div>
  );
}

/** Shown when the demo hasn't been given a role yet. */
function RoleGate({ target }: { target: Role }) {
  const { setRole } = useApp();
  const router = useRouter();
  const roles: { id: Role; label: string; hint: string; icon: ReactNode }[] = [
    { id: "farmer", label: "Continue as Farmer / FPO", hint: "List produce · find buyers · track earnings", icon: <Tractor className="h-5 w-5" /> },
    { id: "buyer", label: "Continue as Buyer", hint: "Source produce · aggregate supply · track delivery", icon: <ShoppingBasket className="h-5 w-5" /> },
    { id: "admin", label: "Continue as Platform Admin", hint: "Network health · forecasting · matching engine", icon: <ShieldCheck className="h-5 w-5" /> },
  ];
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(1200px_600px_at_70%_-10%,#123a29,#081c12)] px-4 py-10">
      <div className={cardGate}>
        <div className="mb-6"><Logo /></div>
        <h1 className="text-xl font-extrabold tracking-tight text-ink-900">One step to continue the demo</h1>
        <p className="mt-1.5 text-sm text-ink-500">
          Choose a role — the prototype uses mock authentication. No credentials needed.
        </p>
        <div className="mt-6 space-y-3">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => { setRole(r.id); router.push(target === r.id ? roleHome[r.id] : roleHome[r.id]); }}
              className="group flex w-full items-center gap-4 rounded-2xl border border-cream-300 bg-white p-4 text-left transition hover:border-emerald-600/50 hover:bg-emerald-50/50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-900 text-emerald-300 transition group-hover:bg-emerald-600 group-hover:text-white">
                {r.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-ink-900">{r.label}</span>
                <span className="block text-xs text-ink-500">{r.hint}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AppShell({ role, children }: { role: Role; children: ReactNode }) {
  const { hydrated, role: current } = useApp();

  if (!hydrated) return <ShellSkeleton />;
  if (!current) return <RoleGate target={role} />;

  return (
    <div className="min-h-screen">
      <Sidebar role={role} />
      <div className="lg:pl-64">
        <Header role={role} />
        <main className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-6 sm:px-6 lg:pb-12">
          {children}
        </main>
      </div>
      <MobileNav role={role} />
    </div>
  );
}
