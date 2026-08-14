import { useState, useEffect } from "react";
import { BrainCircuit, AlertTriangle, TrendingUp, Boxes, Loader2, Info } from "lucide-react";
import Sidebar from "../components/sidebar/Sidebar";
import PageHeader from "../components/ui/PageHeader";
import SectionCard from "../components/ui/SectionCard";
import StatCard from "../components/ui/StatCard";
import { api, apiRoutes } from "../api/api";

type Forecast = {
  product_name: string;
  average_demand: number;
  latest_demand: number;
  forecast_next_month: number;
  trend: string;
  forecast_confidence: string;
};

type InventoryRisk = {
  material_name: string;
  available_quantity: number;
  reorder_level: number;
  safety_stock: number;
  unit: string;
  inventory_status: string;
  replenishment_quantity: number;
};

type WorkflowData = {
  inventory_summary: {
    total_materials: number;
    reorder_required: number;
    below_safety_stock: number;
    healthy_materials: number;
    total_replenishment_quantity: number;
  };
  demand_forecast: Forecast[];
  inventory_analysis: InventoryRisk[];
  production_attention: any[];
};

export default function DemandForecastPage() {
  const [data, setData] = useState<WorkflowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);
        // The endpoint is POST /api/workflows/demand-forecast
        const response = await api.post(apiRoutes.workflows.demandForecast);
        const responseData = response.data?.data?._responseData || response.data?.data;
        if (response.data?.success && responseData) {
          setData(responseData);
        } else {
          throw new Error("Invalid response from workflow");
        }
      } catch (err: any) {
        console.error("Error fetching forecast:", err);
        setError(err.response?.data?.message || err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);



  const riskStyles = {
    critical: "border-red-600/50 bg-red-950/60 text-red-300",
    high: "border-red-500/40 bg-red-950/40 text-red-300",
    medium: "border-amber-500/40 bg-amber-500/15 text-amber-300",
    low: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
  };

  return (
    <div className="flex h-screen w-full overflow-hidden flex-col md:flex-row bg-linear-to-br from-[#050505] via-[#0f0f0f] to-[#2b0000] text-white font-sans">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          eyebrow="Agent Workflow"
          title="Demand Forecast & Inventory Analysis"
          description="AI-driven analysis of historical demand paired with current inventory status to predict risks."
          badge="Live Supabase Integration"
        />

        {loading && (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="w-12 h-12 text-[#ff1a1a] animate-spin" />
            <p className="text-[#a3a3a3]">Running SNS Agent Workflow and analyzing Supabase data...</p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-600/50 bg-red-950/30 p-6 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-[#ff1a1a] shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-red-200">Workflow Error</h3>
              <p className="mt-1 text-sm text-red-300/80">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-[#ff1a1a] hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!loading && !error && data && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Overall Status"
                value={data.inventory_summary.reorder_required > 0 ? "Action Needed" : "Healthy"}
                subtitle="Based on AI analysis"
                icon={Info}
                tone={data.inventory_summary.reorder_required > 0 ? "red" : "emerald"}
              />
              <StatCard
                title="Materials Analyzed"
                value={data.inventory_summary.total_materials.toString()}
                subtitle="From inventory levels"
                icon={TrendingUp}
                tone="cyan"
              />
              <StatCard
                title="Below Safety"
                value={data.inventory_summary.below_safety_stock.toString()}
                subtitle="Below safety stock"
                icon={Boxes}
                tone={data.inventory_summary.below_safety_stock > 0 ? "amber" : "emerald"}
              />
              <StatCard
                title="Reorder Risks"
                value={data.inventory_summary.reorder_required.toString()}
                subtitle="Critical action needed"
                icon={AlertTriangle}
                tone={data.inventory_summary.reorder_required > 0 ? "red" : "emerald"}
              />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <SectionCard eyebrow="AI Forecasts" title="Demand Forecasts" badge={`${data.demand_forecast.length} items`}>
                <div className="space-y-4">
                  {data.demand_forecast.map((forecast, i) => (
                    <div key={i} className="rounded-xl border border-gray-800 bg-[#0f0f0f]/60 p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-lg">{forecast.product_name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full border ${forecast.forecast_confidence.toLowerCase() === 'high' ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30' : 'border-amber-500/40 text-amber-400 bg-amber-950/30'}`}>
                          {forecast.forecast_confidence} Confidence
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="bg-black/30 p-2 rounded">
                          <p className="text-gray-400 text-xs">Hist. Avg</p>
                          <p className="font-semibold">{forecast.average_demand}</p>
                        </div>
                        <div className="bg-black/30 p-2 rounded">
                          <p className="text-gray-400 text-xs">Recent</p>
                          <p className="font-semibold">{forecast.latest_demand}</p>
                        </div>
                        <div className="bg-black/30 p-2 rounded border border-[#ff1a1a]/20">
                          <p className="text-gray-400 text-xs">Forecast</p>
                          <p className="font-semibold text-white flex items-center gap-1">
                            {forecast.forecast_next_month}
                            {forecast.trend === 'INCREASING' && <TrendingUp className="w-3 h-3 text-[#ff1a1a]" />}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard eyebrow="Risk Analysis" title="Inventory Risks" badge={`${data.inventory_analysis.length} items`}>
                <div className="space-y-4">
                  {data.inventory_analysis.map((risk, i) => (
                    <div key={i} className={`rounded-xl border p-4 ${
                      risk.inventory_status === 'REORDER_REQUIRED' ? riskStyles.critical :
                      risk.inventory_status === 'HEALTHY' ? riskStyles.low : riskStyles.medium
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">{risk.material_name}</h4>
                        <span className="uppercase text-[10px] font-black tracking-wider bg-black/40 px-2 py-1 rounded">
                          {risk.inventory_status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs font-mono bg-black/20 p-2 rounded w-fit">
                        <span>Avail: {risk.available_quantity}{risk.unit}</span>
                        <span className="opacity-50">|</span>
                        <span>Reorder: {risk.reorder_level}</span>
                        <span className="opacity-50">|</span>
                        <span>Safety: {risk.safety_stock}</span>
                      </div>
                      <div className="mt-3 text-sm font-semibold flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4 opacity-70" />
                        Suggested Replenishment: {risk.replenishment_quantity} {risk.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            <SectionCard eyebrow="AI Actions" title="Production Attention Required" badge="Execution Plan">
              <div className="space-y-3">
                {data.production_attention?.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-red-900/30 bg-[#0f0f0f]/60 p-4">
                    <BrainCircuit className="mt-0.5 h-4 w-4 shrink-0 text-[#ff1a1a]" />
                    <p className="text-sm text-gray-300 leading-relaxed">
                      <strong>{item.product_name}</strong> is showing an {item.trend} trend. Latest demand is {item.latest_demand}, expected to be {item.forecast_next_month} next month ({item.forecast_confidence} confidence).
                    </p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </>
        )}
      </main>
    </div>
  );
}
