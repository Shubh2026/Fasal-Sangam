import { cn } from "@/lib/utils";

export function Logo({ light = false, size = "md" }: { light?: boolean; size?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={cn(
          "flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-forest-700 shadow-sm",
          size === "sm" ? "h-8 w-8" : "h-10 w-10"
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" className={size === "sm" ? "h-4.5 w-4.5" : "h-5.5 w-5.5"} stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21v-8" />
          <path d="M12 13c0-3.5 2.5-5.5 6.5-5.5-.2 4-2.2 6.5-6.5 5.5Z" fill="white" fillOpacity=".25" />
          <path d="M12 11c0-3.5-2.5-5.5-6.5-5.5.2 4 2.2 6.5 6.5 5.5Z" fill="white" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={cn("block font-extrabold tracking-tight", size === "sm" ? "text-[15px]" : "text-[17px]", light ? "text-white" : "text-ink-900")}>
          Fasal Sangam
        </span>
        <span className={cn("mt-1 block text-[9.5px] font-semibold uppercase tracking-[0.14em]", light ? "text-emerald-300/80" : "text-emerald-700/80")}>
          Farm → Market Network
        </span>
      </span>
    </div>
  );
}
