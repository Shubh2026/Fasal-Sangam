"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell, Check, ChevronDown, Globe, Search, Tractor, ShoppingBasket, ShieldCheck,
  Sparkles, TrendingUp, Truck, ClipboardList, ArrowUpRight,
} from "lucide-react";
import { useApp, type Role, type NotifIcon } from "@/components/providers/AppProvider";
import { languages, type Lang } from "@/lib/i18n";
import { searchIndex } from "@/data/mock";
import { roleHome } from "@/components/shell/nav";
import { cn } from "@/lib/utils";

const notifIcons: Record<NotifIcon, React.ReactNode> = {
  match: <Sparkles className="h-4 w-4 text-emerald-600" />,
  demand: <TrendingUp className="h-4 w-4 text-sky-600" />,
  pickup: <Truck className="h-4 w-4 text-amber-600" />,
  order: <ClipboardList className="h-4 w-4 text-fuchsia-600" />,
  route: <Truck className="h-4 w-4 text-forest-600" />,
  price: <TrendingUp className="h-4 w-4 text-emerald-600" />,
};

const roleMeta: Record<Role, { label: string; icon: React.ReactNode }> = {
  farmer: { label: "Farmer / FPO", icon: <Tractor className="h-4 w-4" /> },
  buyer: { label: "Buyer", icon: <ShoppingBasket className="h-4 w-4" /> },
  admin: { label: "Admin", icon: <ShieldCheck className="h-4 w-4" /> },
};

export function Header({ role }: { role: Role }) {
  const { t, language, setLanguage, notifications, markAllRead, setRole } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<"none" | "notif" | "lang" | "role">("none");
  const [q, setQ] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen("none");
        setSearchFocus(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const unread = notifications[role].filter((n) => n.unread).length;

  const results = q.trim()
    ? searchIndex.filter((s) => (s.label + " " + (s.sub ?? "") + " " + s.type).toLowerCase().includes(q.toLowerCase())).slice(0, 8)
    : searchIndex.slice(0, 5);

  function switchRole(r: Role) {
    setRole(r);
    setOpen("none");
    router.push(roleHome[r]);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-cream-200 bg-cream-50/85 backdrop-blur-md">
      <div ref={wrapRef} className="flex h-16 items-center gap-2 px-4 sm:gap-3 sm:px-6">
        {/* mobile logo */}
        <Link href="/" className="lg:hidden">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-forest-700">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="white" strokeWidth="1.8" strokeLinecap="round">
              <path d="M12 21v-8" />
              <path d="M12 13c0-3.5 2.5-5.5 6.5-5.5-.2 4-2.2 6.5-6.5 5.5Z" fill="white" fillOpacity=".25" />
              <path d="M12 11c0-3.5-2.5-5.5-6.5-5.5.2 4 2.2 6.5 6.5 5.5Z" fill="white" />
            </svg>
          </span>
        </Link>

        {/* search */}
        <div className="relative flex-1 max-w-lg">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setSearchFocus(true); }}
            onFocus={() => setSearchFocus(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setSearchFocus(false);
              if (e.key === "Enter" && results[0]) { setSearchFocus(false); setQ(""); router.push(results[0].href); }
            }}
            placeholder={t("search.placeholder")}
            aria-label="Search"
            className="h-10 w-full rounded-xl border border-cream-300 bg-white pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-600/15"
          />
          {searchFocus && (
            <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-lift animate-scale-in">
              <p className="border-b border-cream-200 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                {q ? "Results" : "Quick links"}
              </p>
              <ul className="max-h-72 overflow-y-auto thin-scroll p-1.5">
                {results.length === 0 && (
                  <li className="px-3 py-4 text-sm text-ink-400">No results for “{q}”.</li>
                )}
                {results.map((r) => (
                  <li key={r.label}>
                    <button
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-emerald-50"
                      onClick={() => { setSearchFocus(false); setQ(""); router.push(r.href); }}
                    >
                      <span className="rounded-lg bg-cream-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-500">{r.type}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-semibold text-ink-900">{r.label}</span>
                        {r.sub && <span className="block truncate text-xs text-ink-400">{r.sub}</span>}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-ink-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {/* language */}
          <div className="relative">
            <button
              onClick={() => setOpen(open === "lang" ? "none" : "lang")}
              className="flex h-10 items-center gap-1.5 rounded-xl border border-cream-300 bg-white px-3 text-sm font-medium text-ink-600 transition hover:border-emerald-600/30 hover:text-ink-900"
              aria-haspopup="listbox"
              aria-expanded={open === "lang"}
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{languages.find((l) => l.code === language)?.native}</span>
              <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
            </button>
            {open === "lang" && (
              <div className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl border border-cream-200 bg-white p-1.5 shadow-lift animate-scale-in" role="listbox">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLanguage(l.code as Lang); setOpen("none"); }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                      language === l.code ? "bg-emerald-50 font-semibold text-emerald-700" : "text-ink-600 hover:bg-cream-100"
                    )}
                    role="option"
                    aria-selected={language === l.code}
                  >
                    <span>{l.native}</span>
                    <span className="flex items-center gap-1 text-xs text-ink-400">
                      {l.code !== "en" && <span>{l.label}</span>}
                      {language === l.code && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* notifications */}
          <div className="relative">
            <button
              onClick={() => setOpen(open === "notif" ? "none" : "notif")}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cream-300 bg-white text-ink-600 transition hover:border-emerald-600/30 hover:text-ink-900"
              aria-label={t("common.notifications")}
            >
              <Bell className="h-[18px] w-[18px]" />
              {unread > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>
            {open === "notif" && (
              <div className="absolute right-0 top-12 z-50 w-[21rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-lift animate-scale-in">
                <div className="flex items-center justify-between border-b border-cream-200 px-4 py-3">
                  <p className="text-sm font-bold text-ink-900">{t("common.notifications")}</p>
                  <button onClick={() => markAllRead(role)} className="text-xs font-semibold text-emerald-700 hover:underline">
                    Mark all read
                  </button>
                </div>
                <ul className="max-h-80 overflow-y-auto thin-scroll">
                  {notifications[role].map((n) => (
                    <li key={n.id} className={cn("flex items-start gap-3 border-b border-cream-100 px-4 py-3", n.unread && "bg-emerald-50/50")}>
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cream-100">{notifIcons[n.icon]}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] leading-snug text-ink-900">{n.text}</span>
                        <span className="mt-0.5 block text-[11px] text-ink-400">{n.time}</span>
                      </span>
                      {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* role switcher */}
          <div className="relative">
            <button
              onClick={() => setOpen(open === "role" ? "none" : "role")}
              className="hidden h-10 items-center gap-1.5 rounded-xl border border-dashed border-emerald-600/40 bg-emerald-50/60 px-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 sm:flex"
            >
              <span className="text-ink-400 font-medium text-xs">{t("role.viewAs")}:</span>
              {roleMeta[role].label}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {open === "role" && (
              <div className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-2xl border border-cream-200 bg-white p-1.5 shadow-lift animate-scale-in">
                {(Object.keys(roleMeta) as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition",
                      r === role ? "bg-emerald-50 font-semibold text-emerald-700" : "text-ink-600 hover:bg-cream-100"
                    )}
                  >
                    {roleMeta[r].icon}
                    {roleMeta[r].label}
                    {r === role && <Check className="ml-auto h-3.5 w-3.5" />}
                  </button>
                ))}
                <Link href="/login" onClick={() => setOpen("none")} className="mt-1 block rounded-xl border-t border-cream-200 px-3 py-2 text-center text-xs font-medium text-ink-400 hover:text-ink-900">
                  Back to role login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
