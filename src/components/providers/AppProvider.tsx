"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { dict, type Lang, type LangKey } from "@/lib/i18n";
import {
  seedNotifications,
  type FSNotification,
  type FSOrder,
  type NotifIcon,
  type ProduceListing,
} from "@/data/mock";
import { cn } from "@/lib/utils";

export type Role = "farmer" | "buyer" | "admin";

interface Toast {
  id: number;
  kind: "success" | "info";
  title: string;
  msg?: string;
}

interface AppState {
  hydrated: boolean;
  role: Role | null;
  setRole: (r: Role) => void;
  language: Lang;
  setLanguage: (l: Lang) => void;
  t: (key: LangKey) => string;
  notifications: Record<Role, FSNotification[]>;
  markAllRead: (role: Role) => void;
  toast: (title: string, msg?: string, kind?: Toast["kind"]) => void;
  listings: ProduceListing[];
  addListing: (l: Omit<ProduceListing, "id" | "status" | "potentialBuyers" | "addedByUser">) => ProduceListing;
  demoOrder: FSOrder | null;
  setDemoOrder: (o: FSOrder | null) => void;
  newRequirementTried: boolean;
  setRequirementTried: (v: boolean) => void;
}

const Ctx = createContext<AppState | null>(null);

const STORAGE = "fasal-sangam-v1";

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [role, setRoleState] = useState<Role | null>(null);
  const [language, setLanguageState] = useState<Lang>("en");
  const [notifications, setNotifications] = useState(seedNotifications);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [extraListings, setExtraListings] = useState<ProduceListing[]>([]);
  const [demoOrder, setDemoOrderState] = useState<FSOrder | null>(null);
  const [requirementTried, setRequirementTried] = useState(false);
  const idRef = useRef(100);

  /* restore from localStorage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.role) setRoleState(saved.role);
        if (saved.language) setLanguageState(saved.language);
        if (Array.isArray(saved.extraListings)) setExtraListings(saved.extraListings);
        if (saved.demoOrder) setDemoOrderState(saved.demoOrder);
        if (typeof saved.requirementTried === "boolean") setRequirementTried(saved.requirementTried);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE,
        JSON.stringify({ role, language, extraListings, demoOrder, requirementTried })
      );
    } catch {
      /* ignore */
    }
  }, [hydrated, role, language, extraListings, demoOrder, requirementTried]);

  const setRole = useCallback((r: Role) => setRoleState(r), []);
  const setLanguage = useCallback((l: Lang) => setLanguageState(l), []);
  const t = useCallback((key: LangKey) => dict[language][key] ?? dict.en[key] ?? key, [language]);

  const markAllRead = useCallback((r: Role) => {
    setNotifications((prev) => ({ ...prev, [r]: prev[r].map((n) => ({ ...n, unread: false })) }));
  }, []);

  const toast = useCallback((title: string, msg?: string, kind: Toast["kind"] = "success") => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, kind, title, msg }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const addListing: AppState["addListing"] = useCallback((l) => {
    const item: ProduceListing = {
      ...l,
      id: `L-${3100 + Math.floor(Math.random() * 400)}`,
      status: "listed",
      potentialBuyers: 3,
      addedByUser: true,
    };
    setExtraListings((prev) => [item, ...prev]);
    return item;
  }, []);

  const setDemoOrder = useCallback((o: FSOrder | null) => setDemoOrderState(o), []);

  const value = useMemo<AppState>(
    () => ({
      hydrated,
      role,
      setRole,
      language,
      setLanguage,
      t,
      notifications,
      markAllRead,
      toast,
      listings: extraListings,
      addListing,
      demoOrder,
      setDemoOrder,
      newRequirementTried: requirementTried,
      setRequirementTried,
    }),
    [hydrated, role, setRole, language, setLanguage, t, notifications, markAllRead, toast,
     extraListings, addListing, demoOrder, setDemoOrder, requirementTried]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {/* Toast stack */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border p-3.5 pl-4 shadow-lift animate-scale-in",
              t.kind === "success"
                ? "border-emerald-200 bg-white"
                : "border-sky-200 bg-white"
            )}
            role="status"
          >
            {t.kind === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            ) : (
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink-900">{t.title}</p>
              {t.msg && <p className="mt-0.5 text-xs text-ink-500">{t.msg}</p>}
            </div>
            <button
              aria-label="Dismiss"
              className="rounded-md p-1 text-ink-400 hover:bg-cream-100 hover:text-ink-900"
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export type { FSNotification, NotifIcon, ProduceListing, FSOrder };
