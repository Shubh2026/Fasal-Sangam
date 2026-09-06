import { DemandForecastPanel } from "@/components/forecast/DemandForecastPanel";

export default function BuyerDemandPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Demand Forecast</h1>
        <p className="mt-1 text-sm text-ink-500">Where market demand is heading — time your purchases better.</p>
      </div>
      <DemandForecastPanel variant="buyer" />
    </div>
  );
}
