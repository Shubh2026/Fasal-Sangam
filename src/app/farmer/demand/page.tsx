import { DemandForecastPanel } from "@/components/forecast/DemandForecastPanel";

export default function FarmerDemandPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Demand Forecast</h1>
        <p className="mt-1 text-sm text-ink-500">
          Expected demand for crops in your region — plan what to list next.
        </p>
      </div>
      <DemandForecastPanel variant="farmer" />
    </div>
  );
}
