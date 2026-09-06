import {
  LayoutDashboard,
  Sprout,
  Sparkles,
  ClipboardList,
  Wallet,
  TrendingUp,
  Store,
  FilePlus2,
  Truck,
  Boxes,
  GitMerge,
  Network,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/components/providers/AppProvider";
import type { LangKey } from "@/lib/i18n";

export interface NavItem {
  href: string;
  labelKey: LangKey;
  icon: LucideIcon;
}

export const navConfig: Record<Role, NavItem[]> = {
  farmer: [
    { href: "/farmer/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
    { href: "/farmer/produce", labelKey: "nav.produce", icon: Sprout },
    { href: "/farmer/matches", labelKey: "nav.matches", icon: Sparkles },
    { href: "/farmer/orders", labelKey: "nav.orders", icon: ClipboardList },
    { href: "/farmer/earnings", labelKey: "nav.earnings", icon: Wallet },
    { href: "/farmer/demand", labelKey: "nav.forecast", icon: TrendingUp },
  ],
  buyer: [
    { href: "/buyer/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
    { href: "/buyer/marketplace", labelKey: "nav.marketplace", icon: Store },
    { href: "/buyer/create-request", labelKey: "nav.createRequest", icon: FilePlus2 },
    { href: "/buyer/orders", labelKey: "nav.orders", icon: ClipboardList },
    { href: "/buyer/tracking", labelKey: "nav.tracking", icon: Truck },
    { href: "/buyer/demand", labelKey: "nav.forecast", icon: TrendingUp },
  ],
  admin: [
    { href: "/admin/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
    { href: "/admin/supply", labelKey: "nav.supply", icon: Boxes },
    { href: "/admin/demand", labelKey: "nav.forecast", icon: TrendingUp },
    { href: "/admin/matching", labelKey: "nav.matching", icon: GitMerge },
    { href: "/admin/logistics", labelKey: "nav.logistics", icon: Truck },
    { href: "/admin/orders", labelKey: "nav.orders", icon: ClipboardList },
  ],
};

export const roleHome: Record<Role, string> = {
  farmer: "/farmer/dashboard",
  buyer: "/buyer/dashboard",
  admin: "/admin/dashboard",
};

export const roleCta: Record<Role, { href: string; label: string }> = {
  farmer: { href: "/farmer/produce/new", label: "+ List Produce" },
  buyer: { href: "/buyer/create-request", label: "+ New Requirement" },
  admin: { href: "/admin/matching", label: "Run Matching" },
};

export const mobileNavIcons: Record<Role, NavItem[]> = navConfig;

export { Network };
