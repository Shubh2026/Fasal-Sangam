"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import { supplyDemandSeries, matchPerformance } from "@/data/mock";

interface TT { active?: boolean; payload?: { name?: string; value?: number; color?: string }[]; label?: string }

function BarTooltip({ active, payload, label }: TT) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-cream-200 bg-white px-3 py-2 text-xs shadow-lift">
      <p className="mb-1 font-bold text-ink-900">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="tabular flex items-center gap-1.5 text-ink-600">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="font-bold text-ink-900">{p.value?.toLocaleString("en-IN")} kg</span>
        </p>
      ))}
    </div>
  );
}

export function SupplyDemandChart({ height = 280 }: { height?: number }) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={supplyDemandSeries} margin={{ top: 8, right: 8, bottom: 0, left: -8 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eceadf" vertical={false} />
          <XAxis dataKey="crop" tick={{ fontSize: 11, fill: "#7b8b82" }} tickLine={false} axisLine={{ stroke: "#eceadf" }} />
          <YAxis tick={{ fontSize: 11, fill: "#7b8b82" }} tickLine={false} axisLine={false} width={56} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<BarTooltip />} cursor={{ fill: "#16a34a10" }} />
          <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" iconSize={8} />
          <Bar dataKey="supply" name="Listed supply (kg)" fill="#059669" radius={[6, 6, 0, 0]} maxBarSize={22} />
          <Bar dataKey="demand" name="Buyer demand (kg)" fill="#1e293b" radius={[6, 6, 0, 0]} maxBarSize={22} opacity={0.85} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MatchDonut({ height = 240 }: { height?: number }) {
  const data = [
    { name: "Fully matched", value: matchPerformance.matched, color: "#059669" },
    { name: "Partially matched", value: matchPerformance.partial, color: "#f59e0b" },
    { name: "Unmatched", value: matchPerformance.unmatched, color: "#e11d48" },
  ];
  return (
    <div className="relative w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="62%"
            outerRadius="86%"
            paddingAngle={3}
            startAngle={90}
            endAngle={-270}
            strokeWidth={0}
          >
            {data.map((d) => <Cell key={d.name} fill={d.color} />)}
          </Pie>
          <Tooltip content={<BarTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" iconSize={8} verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-6">
        <p className="tabular text-3xl font-extrabold tracking-tight text-ink-900">{matchPerformance.rate}%</p>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">match rate</p>
      </div>
    </div>
  );
}

export function Sparkline({ data, color = "#059669", height = 44 }: { data: number[]; color?: string; height?: number }) {
  const rows = data.map((v, i) => ({ i, v }));
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={rows} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#spark-${color})`} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
