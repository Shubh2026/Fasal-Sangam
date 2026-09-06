"use client";

import { Check } from "lucide-react";
import type { OrderTimelineEvent } from "@/data/mock";
import { cn } from "@/lib/utils";

export function OrderTimeline({ events, className }: { events: OrderTimelineEvent[]; className?: string }) {
  return (
    <ol className={cn("flex flex-col gap-0 sm:flex-row sm:items-start", className)}>
      {events.map((e, i) => (
        <li key={e.label} className="flex flex-1 gap-3 sm:flex-col sm:gap-0">
          <div className="flex flex-col items-center sm:w-full sm:flex-row">
            <span
              className={cn(
                "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                e.done
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-dashed border-cream-300 bg-white text-ink-300"
              )}
            >
              {e.done ? <Check className="h-4 w-4" /> : <span className="h-1.5 w-1.5 rounded-full bg-ink-300" />}
            </span>
            {i < events.length - 1 && (
              <div className={cn("my-0.5 w-0.5 flex-1 min-h-7 sm:mx-1.5 sm:my-0 sm:h-0.5 sm:w-auto", e.done && events[i + 1].done ? "bg-emerald-500" : "bg-cream-300")} />
            )}
          </div>
          <div className="pb-5 sm:pt-2.5 sm:pr-3">
            <p className={cn("text-[12.5px] font-semibold leading-tight", e.done ? "text-ink-900" : "text-ink-400")}>{e.label}</p>
            <p className="mt-0.5 text-[11px] text-ink-400">{e.time}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
