import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";

export default function BuyerLayout({ children }: { children: ReactNode }) {
  return <AppShell role="buyer">{children}</AppShell>;
}
