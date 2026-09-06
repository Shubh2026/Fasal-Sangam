"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { btnClass } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export function SuccessModal({
  open,
  onClose,
  title,
  message,
  primary,
  secondary,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href?: string; onClick?: () => void };
  children?: ReactNode;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (open) {
      const t = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(t);
    }
    setShown(false);
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close" onClick={onClose} className={cn("absolute inset-0 bg-forest-950/50 backdrop-blur-sm transition-opacity", shown ? "opacity-100" : "opacity-0")} />
      <div className={cn("relative w-full max-w-md rounded-3xl bg-white p-6 shadow-lift transition-all duration-300 sm:p-7", shown ? "scale-100 opacity-100" : "scale-95 opacity-0")}>
        <button onClick={onClose} aria-label="Dismiss" className="absolute right-4 top-4 rounded-lg p-1.5 text-ink-400 hover:bg-cream-100 hover:text-ink-900">
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
          <Check className="h-8 w-8" strokeWidth={3} />
        </div>
        <h2 className="mt-4 text-center text-xl font-extrabold tracking-tight text-ink-900">{title}</h2>
        {message && <p className="mt-1.5 text-center text-sm leading-relaxed text-ink-500">{message}</p>}
        {children}
        <div className="mt-6 flex flex-col gap-2">
          {primary && <Link href={primary.href} onClick={onClose} className={cn(btnClass("primary", "lg"), "w-full")}>{primary.label}</Link>}
          {secondary && (
            secondary.href
              ? <Link href={secondary.href} onClick={onClose} className={cn(btnClass("secondary", "md"), "w-full")}>{secondary.label}</Link>
              : <button onClick={() => { secondary.onClick?.(); onClose(); }} className={cn(btnClass("secondary", "md"), "w-full")}>{secondary.label}</button>
          )}
        </div>
      </div>
    </div>
  );
}
