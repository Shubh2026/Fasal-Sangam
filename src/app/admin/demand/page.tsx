import { DemandForecastPanel } from "@/components/forecast/DemandForecastPanel";

export default function AdminDemandPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">AI Demand Forecast</h1>
        <p className="mt-1 text-sm text-ink-500">
          Weekly demand projections from marketplace activity — shown on prototype sample data.
        </p>
      </div>
      <DemandForecastPanel variant="admin" />
    </div>
  );
}
