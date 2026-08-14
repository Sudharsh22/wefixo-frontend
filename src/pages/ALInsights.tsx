import { useState, useEffect, useCallback } from "react";
import { BrainCircuit, AlertTriangle, TrendingUp, Boxes, Sparkles, Wrench, RefreshCw, Bot, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Sidebar from "../components/sidebar/Sidebar";
import PageHeader from "../components/ui/PageHeader";
import SectionCard from "../components/ui/SectionCard";
import StatCard from "../components/ui/StatCard";
import AnnualDemandForecast from "../components/charts/AnnualDemandForecast";
import { api, apiRoutes } from "../api/api";

type InsightCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  tone: "red" | "emerald" | "amber" | "cyan";
};

type PredictedFailure = {
  machine: string;
  risk: "High Risk" | "Medium Risk" | "Low Risk" | string;
  issue: string;
};

type InventoryAlert = {
  item: string;
  level: "High Risk" | "Medium Risk" | "Low Risk" | string;
  text: string;
};

type AIInsightsResponseData = {
  summary: string;
  badge: string;
  cards: {
    annualForecast: string;
    aiRecommendationsCount: number;
    predictedFailuresCount: number;
    inventoryRiskCount: number;
  };
  predictedFailures: PredictedFailure[];
  inventoryAlerts: InventoryAlert[];
  recommendations: string[];
};

const alertStyles: Record<string, string> = {
  "High Risk": "border-red-600/50 bg-red-950/60 text-red-300 shadow-[0_0_12px_rgba(255,26,26,0.25)]",
  "Medium Risk": "border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
  "Low Risk": "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
};

export default function AIInsightsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modelName, setModelName] = useState<string>("Initializing...");
  const [isGrokActive, setIsGrokActive] = useState<boolean>(false);
  const [insightsData, setInsightsData] = useState<AIInsightsResponseData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchAIInsights = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await api.get(apiRoutes.aiInsights);
      if (response.data && response.data.success) {
        setInsightsData(response.data.data);
        setModelName(response.data.model || "AI Operations Engine");
        setIsGrokActive(!!response.data.isGrokActive);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error("Failed to fetch AI Insights:", error);
      // Fallback data in case backend is offline
      setInsightsData({
        summary: "52-Week annual demand forecasting, predictive machine failure modeling, and real-time plant foresight.",
        badge: "Default Plant Telemetry Active",
        cards: {
          annualForecast: "7.37M",
          aiRecommendationsCount: 3,
          predictedFailuresCount: 2,
          inventoryRiskCount: 3
        },
        predictedFailures: [
          { machine: "Cooling Unit C2", risk: "High Risk", issue: "Likely compressor thermal stress predicted within 48 hours. Recommend schedule overhaul before Q2 peak." },
          { machine: "Packer P4", risk: "Medium Risk", issue: "Hydraulic pressure variance detected. Schedule routine seal inspection before Week 16 volume surge." }
        ],
        inventoryAlerts: [
          { item: "Sugar", level: "High Risk", text: "Forecasted stockout in 3 days (Pre-surge prep required)" },
          { item: "Labels", level: "Medium Risk", text: "Supplier lead time has increased by 20%" },
          { item: "Caps", level: "Low Risk", text: "Buffer remains above minimum threshold for Q2" }
        ],
        recommendations: [
          "Pre-stage syrup for Line 2 to avoid a late shift bottleneck during Week 18 peak ramp up.",
          "Schedule preventive compressor overhaul on Cooling Unit C2 during the Week 44 low-demand window.",
          "Rebalance pallet movements to reduce courier delays near packaging bay B."
        ]
      });
      setModelName("Local Telemetry Mode");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAIInsights();
  }, [fetchAIInsights]);

  const cardsList: InsightCardProps[] = [
    {
      title: "Annual Demand Forecast",
      value: insightsData?.cards.annualForecast || "7.37M",
      subtitle: "total cases across 52 weeks",
      icon: TrendingUp,
      tone: "emerald",
    },
    {
      title: "AI Recommendations",
      value: (insightsData?.cards.aiRecommendationsCount ?? 7).toString(),
      subtitle: "suggested actions this shift",
      icon: BrainCircuit,
      tone: "cyan",
    },
    {
      title: "Predicted Failures",
      value: (insightsData?.cards.predictedFailuresCount ?? 2).toString(),
      subtitle: "machines at high risk",
      icon: AlertTriangle,
      tone: "red",
    },
    {
      title: "Inventory Risk Alerts",
      value: (insightsData?.cards.inventoryRiskCount ?? 3).toString(),
      subtitle: "items at risk of stockout",
      icon: Boxes,
      tone: "amber",
    },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden flex-col md:flex-row bg-linear-to-br from-[#050505] via-[#0f0f0f] to-[#2b0000] text-white font-sans">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header & Status Indicator */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <PageHeader
            eyebrow="AI operations"
            title="AI Insights"
            description={insightsData?.summary || "52-Week annual demand forecasting, predictive machine failure modeling, and supply-chain foresight."}
            badge={insightsData?.badge || "52-Week Forecast Visibility Active • Live Engine"}
          />

          <div className="flex flex-wrap items-center gap-3">
            {/* Live Model Badge */}
            <div className={`flex items-center gap-2 rounded-xl px-3.5 py-2 border text-xs font-semibold backdrop-blur-md shadow-lg ${
              isGrokActive
                ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-300"
                : "border-red-600/30 bg-[#0f0f0f]/80 text-gray-300"
            }`}>
              <Bot className={`w-4 h-4 ${isGrokActive ? "text-emerald-400 animate-pulse" : "text-[#ff1a1a]"}`} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span>Engine:</span>
                  <span className="font-extrabold text-white">{modelName}</span>
                </div>
                {lastUpdated && <div className="text-[10px] text-gray-400">Updated at {lastUpdated}</div>}
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => fetchAIInsights(true)}
              disabled={loading || refreshing}
              className="flex items-center gap-2 rounded-xl border border-red-600/40 bg-[#0f0f0f] px-4 py-2 text-xs font-bold text-white transition-all hover:border-red-500 hover:bg-red-950/30 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-[#ff1a1a] ${refreshing ? "animate-spin" : ""}`} />
              <span>{refreshing ? "Re-analyzing..." : "Refresh Insights"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cardsList.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        {/* 52-Week Full Year Annual Demand Forecast Section */}
        <AnnualDemandForecast />

        {/* Predictive Maintenance & Risk Grid */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* Predicted Machine Failures */}
          <SectionCard
            eyebrow="Prediction insights"
            title="Predicted Machine Failures"
            badge={`${insightsData?.predictedFailures.length || 0} flagged`}
          >
            <div className="space-y-3">
              {insightsData?.predictedFailures && insightsData.predictedFailures.length > 0 ? (
                insightsData.predictedFailures.map((pf, idx) => {
                  const isHigh = pf.risk.includes("High");
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border p-4 transition-all ${
                        isHigh
                          ? "border-red-600/30 bg-[#0f0f0f]/60 hover:border-red-600/60"
                          : "border-amber-500/30 bg-[#0f0f0f]/60 hover:border-amber-500/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center space-x-2">
                          <Wrench className={`w-4 h-4 ${isHigh ? "text-[#ff1a1a]" : "text-amber-400"}`} />
                          <span>{pf.machine}</span>
                        </span>
                        <span
                          className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                            alertStyles[pf.risk] || alertStyles["Medium Risk"]
                          }`}
                        >
                          {pf.risk}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-[#a3a3a3] leading-relaxed">{pf.issue}</p>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>All machine telemetry operating within optimal thermal and vibration thresholds.</span>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Inventory Risk Alerts */}
          <SectionCard
            eyebrow="Risk watch"
            title="Inventory Risk Alerts"
            badge={`${insightsData?.inventoryAlerts.length || 0} items`}
          >
            <div className="space-y-3">
              {insightsData?.inventoryAlerts && insightsData.inventoryAlerts.length > 0 ? (
                insightsData.inventoryAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-red-900/30 bg-[#0f0f0f]/60 p-4 transition-all hover:border-red-600/40"
                  >
                    <div>
                      <p className="font-bold text-white">{alert.item}</p>
                      <p className="mt-1 text-xs text-[#a3a3a3]">{alert.text}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        alertStyles[alert.level] || alertStyles["Medium Risk"]
                      }`}
                    >
                      {alert.level}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Raw material inventory buffers are healthy across all production bays.</span>
                </div>
              )}
            </div>
          </SectionCard>
        </div>

        {/* Suggested AI Actions */}
        <SectionCard eyebrow="Next steps" title="AI Suggested Shift Actions" badge="Live Grok / DB Execution Plan">
          <div className="space-y-3">
            {insightsData?.recommendations.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-red-900/30 bg-[#0f0f0f]/60 p-4 transition-all hover:border-red-600/40"
              >
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#ff1a1a]" />
                <p className="text-xs text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </main>
    </div>
  );
}
