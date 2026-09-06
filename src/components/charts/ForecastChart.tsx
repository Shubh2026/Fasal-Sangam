"use client";

import {
  ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,
} from "recharts";
import { forecasts, type CropId } from "@/data/mock";
import { cn } from "@/lib/utils";

interface TooltipProps { active?: boolean; payload?: { dataKey?: string; value?: number }[]; label?: string }

function ForecastTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload.find((p) => p.value != null);
  if (!item) return null;
  const isForecast = item.dataKey === "forecast";
  return (
    <div className="rounded-xl border border-cream-200 bg-white px-3 py-2 text-xs shadow-lift">
      <p className="font-bold text-ink-900">
        {label}
        <span className={cn("ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold", isForecast ? "bg-sky-50 text-sky-700" : "bg-emerald-50 text-emerald-700")}>
          {isForecast ? "Forecast" : "Actual"}
        </span>
      </p>
      <p className="tabular mt-0.5 text-sm font-extrabold text-ink-900">{item.value?.toLocaleString("en-IN")} kg</p>
    </div>
  );
}

export function ForecastChart({ crop, height = 300 }: { crop: CropId; height?: number }) {
  const f = forecasts[crop];
  // join historical and future series at the current week for continuity
  const data = [
    ...f.history.map((h, i) => ({
      label: h.label,
      history: h.value,
      forecast: i === f.history.length - 1 ? h.value : undefined,
    })),
    ...f.future.map((h) => ({ label: h.label, history: undefined as number | undefined, forecast: h.value })),
  ];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -14 }}>
          <defs>
            <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="foreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#eceadf" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#7b8b82" }} tickLine={false} axisLine={{ stroke: "#eceadf" }} />
          <YAxis tick={{ fontSize: 11, fill: "#7b8b82" }} tickLine={false} axisLine={false} width={52} tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`} />
          <Tooltip content={<ForecastTooltip />} cursor={{ stroke: "#16a34a", strokeDasharray: "4 4", strokeOpacity: 0.4 }} />
          <ReferenceLine x="This week" stroke="#94a3b8" strokeDasharray="4 4" label={{ value: "today", position: "top", fontSize: 10, fill: "#94a3b8" }} />
          <Area type="monotone" dataKey="history" name="Historical demand" stroke="#059669" strokeWidth={2.5} fill="url(#histGrad)" connectNulls={false} />
          <Area type="monotone" dataKey="forecast" name="Forecast" stroke="#0ea5e9" strokeWidth={2.5} strokeDasharray="6 5" fill="url(#foreGrad)" connectNulls={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ForecastLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-ink-500">
      <span className="flex items-center gap-1.5"><span className="h-2 w-5 rounded-full bg-emerald-500" /> Historical demand</span>
      <span className="flex items-center gap-1.5"><span className="h-2 w-5 rounded-full border-2 border-dashed border-sky-400" /> AI forecast (prototype)</span>
    </div>
  );
}
