"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightLeft, Leaf } from "lucide-react";
import { useApp, type Role } from "@/components/providers/AppProvider";
import { navConfig, roleCta } from "@/components/shell/nav";
import { Logo } from "@/components/ui/Logo";
import { btnClass } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { farmerIdentity, buyerIdentity, adminIdentity } from "@/data/mock";

const roleLabel: Record<Role, string> = { farmer: "Farmer · FPO", buyer: "Buyer", admin: "Platform" };
const identity = {
  farmer: farmerIdentity,
  buyer: buyerIdentity,
  admin: adminIdentity,
} as const;

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const { t } = useApp();
  const items = navConfig[role];
  const cta = roleCta[role];
  const me = identity[role];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-forest-800 bg-forest-950 lg:flex">
      <div className="px-5 pt-6 pb-5">
        <Logo light />
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-emerald-200/90">
          <Leaf className="h-3 w-3" />
          {roleLabel[role]}
        </div>
      </div>

      <div className="px-4">
        <Link href={cta.href} className={cn(btnClass("primary", "md"), "w-full justify-center")}>
          {cta.label}
        </Link>
      </div>

      <nav className="mt-5 flex-1 overflow-y-auto px-3 pb-4 thin-scroll thin-scroll-thumb-light" aria-label="Primary">
        <ul className="space-y-1">
          {items.map((item) => {
            const active = pathname === item.href || (pathname.startsWith(item.href + "/"));
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-medium transition",
                    active
                      ? "bg-emerald-600/90 text-white shadow-sm"
                      : "text-emerald-100/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className={cn("h-[18px] w-[18px]", active ? "text-white" : "text-emerald-300/50 group-hover:text-emerald-300")} />
                  {t(item.labelKey)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-[13px] font-bold text-emerald-300">
            {me.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-white">{me.name}</p>
            <p className="truncate text-[11px] text-emerald-100/50">{me.org}</p>
          </div>
        </div>
        <Link
          href="/login"
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-white/10 py-1.5 text-[11.5px] font-medium text-emerald-100/70 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowRightLeft className="h-3 w-3" />
          Switch role / demo
        </Link>
      </div>
    </aside>
  );
}
