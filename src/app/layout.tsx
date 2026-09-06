import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppProvider } from "@/components/providers/AppProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fasal Sangam — AI-Powered Direct Farm-to-Market Network",
  description:
    "Fasal Sangam connects farmers and FPOs directly with consumers and bulk buyers using intelligent demand insights, supply aggregation, transparent pricing, and coordinated logistics.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="bg-cream-100 font-sans text-ink-900 antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
