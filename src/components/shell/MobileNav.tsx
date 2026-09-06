"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp, type Role } from "@/components/providers/AppProvider";
import { navConfig } from "@/components/shell/nav";
import { cn } from "@/lib/utils";

export function MobileNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const { t } = useApp();
  const items = navConfig[role].slice(0, 5);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-cream-200 bg-white/95 backdrop-blur-md lg:hidden"
      aria-label="Mobile"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid max-w-md grid-cols-5">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition",
                active ? "text-emerald-700" : "text-ink-400 hover:text-ink-900"
              )}
            >
              <Icon className={cn("h-5 w-5", active && "text-emerald-600")} />
              {t(item.labelKey)}
              <span className={cn("h-1 w-1 rounded-full transition", active ? "bg-emerald-600" : "bg-transparent")} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
