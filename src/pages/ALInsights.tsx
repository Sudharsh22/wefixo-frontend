import { BrainCircuit, AlertTriangle, TrendingUp, Boxes, Sparkles, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Sidebar from "../components/sidebar/Sidebar";
import PageHeader from "../components/ui/PageHeader";
import SectionCard from "../components/ui/SectionCard";
import StatCard from "../components/ui/StatCard";
import AnnualDemandForecast from "../components/charts/AnnualDemandForecast";

type InsightCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  tone: "red" | "emerald" | "amber" | "cyan";
};

const cards: InsightCardProps[] = [
  {
    title: "Annual Demand Forecast",
    value: "7.37M",
    subtitle: "total cases across 52 weeks",
    icon: TrendingUp,
    tone: "emerald",
  },
  {
    title: "AI Recommendations",
    value: "7",
    subtitle: "suggested actions this shift",
    icon: BrainCircuit,
    tone: "cyan",
  },
  {
    title: "Predicted Failures",
    value: "2",
    subtitle: "machines at high risk",
    icon: AlertTriangle,
    tone: "red",
  },
  {
    title: "Inventory Risk Alerts",
    value: "3",
    subtitle: "items at risk of stockout",
    icon: Boxes,
    tone: "amber",
  },
];

const recommendations = [
  "Pre-stage syrup for Line 2 to avoid a late shift bottleneck during Week 18 peak ramp up.",
  "Schedule preventive compressor overhaul on Cooling Unit C2 during the Week 44 low-demand window.",
  "Rebalance pallet movements to reduce courier delays near packaging bay B.",
];

const alerts = [
  { item: "Sugar", level: "High Risk", text: "Forecasted stockout in 3 days (Pre-surge prep required)" },
  { item: "Labels", level: "Medium Risk", text: "Supplier lead time has increased by 20%" },
  { item: "Caps", level: "Low Risk", text: "Buffer remains above minimum threshold for Q2" },
];

const alertStyles = {
  "High Risk": "border-red-600/50 bg-red-950/60 text-red-300 shadow-[0_0_12px_rgba(255,26,26,0.25)]",
  "Medium Risk": "border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
  "Low Risk": "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
};

export default function AIInsightsPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden flex-col md:flex-row bg-gradient-to-br from-[#050505] via-[#0f0f0f] to-[#2b0000] text-white font-sans">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          eyebrow="AI operations"
          title="AI Insights"
          description="52-Week annual demand forecasting, predictive machine failure modeling, and supply-chain foresight."
          badge="52-Week Forecast Visibility Active • 96% Initial Confidence"
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        {/* 52-Week Full Year Annual Demand Forecast Section */}
        <AnnualDemandForecast />

        {/* Predictive Maintenance & Risk Grid */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* Predicted Machine Failures */}
          <SectionCard eyebrow="Prediction insights" title="Predicted Machine Failures" badge="2 at risk">
            <div className="space-y-3">
              <div className="rounded-xl border border-red-600/30 bg-[#0f0f0f]/60 p-4 transition-all hover:border-red-600/60">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center space-x-2">
                    <Wrench className="w-4 h-4 text-[#ff1a1a]" />
                    <span>Cooling Unit C2</span>
                  </span>
                  <span className="rounded-full border border-red-600/40 bg-red-950/60 px-3 py-0.5 text-xs font-bold text-red-300 shadow-[0_0_10px_rgba(255,26,26,0.3)]">
                    High Risk
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#a3a3a3] leading-relaxed">
                  Likely compressor thermal stress predicted within 48 hours. Recommend schedule overhaul before Q2 peak.
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-[#0f0f0f]/60 p-4 transition-all hover:border-amber-500/60">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center space-x-2">
                    <Wrench className="w-4 h-4 text-amber-400" />
                    <span>Packer P4</span>
                  </span>
                  <span className="rounded-full border border-amber-500/40 bg-amber-950/60 px-3 py-0.5 text-xs font-bold text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    Medium Risk
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#a3a3a3] leading-relaxed">
                  Hydraulic pressure variance detected. Schedule routine seal inspection before Week 16 volume surge.
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Inventory Risk Alerts */}
          <SectionCard eyebrow="Risk watch" title="Inventory Risk Alerts" badge="3 flagged items">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.item} className="flex items-center justify-between rounded-xl border border-red-900/30 bg-[#0f0f0f]/60 p-4 transition-all hover:border-red-600/40">
                  <div>
                    <p className="font-bold text-white">{alert.item}</p>
                    <p className="mt-1 text-xs text-[#a3a3a3]">{alert.text}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${alertStyles[alert.level as keyof typeof alertStyles]}`}>
                    {alert.level}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Suggested AI Actions */}
        <SectionCard eyebrow="Next steps" title="AI Suggested Shift Actions" badge="Real-time execution plan">
          <div className="space-y-3">
            {recommendations.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-red-900/30 bg-[#0f0f0f]/60 p-4 transition-all hover:border-red-600/40">
                <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ff1a1a]" />
                <p className="text-xs text-gray-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </main>
    </div>
  );
}
