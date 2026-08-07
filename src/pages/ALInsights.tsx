import { BrainCircuit, AlertTriangle, TrendingUp, Boxes, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Sidebar from "../components/sidebar/Sidebar";
import PageHeader from "../components/ui/PageHeader";
import SectionCard from "../components/ui/SectionCard";
import StatCard from "../components/ui/StatCard";

type InsightCardProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  tone: "red" | "emerald" | "amber" | "cyan";
};

const cards: InsightCardProps[] = [
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
    title: "Demand Forecast",
    value: "+11.8%",
    subtitle: "week-over-week demand lift",
    icon: TrendingUp,
    tone: "emerald",
  },
  {
    title: "Inventory Risk Alerts",
    value: "3",
    subtitle: "items at risk of stockout",
    icon: Boxes,
    tone: "amber",
  },
];

const forecastData = [
  { week: "W1", demand: 120000 },
  { week: "W2", demand: 126000 },
  { week: "W3", demand: 131000 },
  { week: "W4", demand: 138000 },
  { week: "W5", demand: 144000 },
  { week: "W6", demand: 151000 },
];

const recommendations = [
  "Pre-stage syrup for Line 2 to avoid a late shift bottleneck.",
  "Schedule preventive maintenance on Cooling Unit C2 before the weekend run.",
  "Rebalance pallet movements to reduce courier delays near packaging.",
];

const alerts = [
  { item: "Sugar", level: "High Risk", text: "Forecasted stockout in 3 days" },
  { item: "Labels", level: "Medium Risk", text: "Supplier lead time has increased by 20%" },
  { item: "Caps", level: "Low Risk", text: "Buffer remains above minimum threshold" },
];

const alertStyles = {
  "High Risk": "border-red-500/20 bg-red-500/10 text-red-300",
  "Medium Risk": "border-amber-500/20 bg-amber-500/10 text-amber-300",
  "Low Risk": "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
};

export default function AIInsightsPage() {
  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.22),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <PageHeader
          eyebrow="AI operations"
          title="AI Insights"
          description="Predictive recommendations and supply-chain foresight for the factory."
          badge="Forecast confidence: 92% for the next 6 weeks"
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <SectionCard eyebrow="Demand forecast" title="Demand Forecast" badge="Strong upcoming demand">

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid rgba(248, 113, 113, 0.2)",
                      borderRadius: "12px",
                      color: "#f8fafc",
                    }}
                    formatter={(value) => [`${Number(value).toLocaleString()} cases`, "Demand"]}
                  />
                  <Line type="monotone" dataKey="demand" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: "#fb7185" }} activeDot={{ r: 6, fill: "#fda4af" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Prediction insights" title="Predicted Machine Failures" badge="2 at risk">

            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Cooling Unit C2</span>
                  <span className="text-red-300">High</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">Likely compressor stress within 48 hours.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Packer P4</span>
                  <span className="text-amber-300">Medium</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">Hydraulic pressure variance suggests maintenance attention.</p>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <SectionCard eyebrow="Risk watch" title="Inventory Risk Alerts" badge="3 flagged items">

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                  <div>
                    <p className="font-medium text-white">{alert.item}</p>
                    <p className="mt-1 text-sm text-slate-400">{alert.text}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${alertStyles[alert.level as keyof typeof alertStyles]}`}>
                    {alert.level}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard eyebrow="Next steps" title="Suggested Actions" badge="AI-driven plan">

            <div className="space-y-3">
              {recommendations.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                  <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-300" />
                  <p className="text-sm text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </main>
    </div>
  );
}
