import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sparkles, TrendingUp, Calendar, ShieldCheck, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export type WeekForecast = {
  weekNum: number;
  week: string;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  demand: number;
  inventoryReq: number;
  confidence: number;
  trend: "Increasing" | "Stable" | "Decreasing";
};

// Generate 52-week realistic factory manufacturing data
const generate52WeekData = (): WeekForecast[] => {
  const data: WeekForecast[] = [];

  for (let i = 1; i <= 52; i++) {
    let quarter: "Q1" | "Q2" | "Q3" | "Q4" = "Q1";
    if (i > 39) quarter = "Q4";
    else if (i > 26) quarter = "Q3";
    else if (i > 13) quarter = "Q2";

    // Realistic seasonal production curve (higher in Q2/Q3, moderate Q1, lowering end of Q4)
    let baseDemand = 120000;
    if (i <= 13) {
      baseDemand = 118000 + i * 1400; // Q1 gradual rise 118k -> 136k
    } else if (i <= 26) {
      baseDemand = 136000 + (i - 13) * 2500; // Q2 summer peak rise 136k -> 168k
    } else if (i <= 39) {
      baseDemand = 168000 - (i - 26) * 1500; // Q3 high sustained -> 148k
    } else {
      baseDemand = 148000 - (i - 39) * 1800; // Q4 normalization -> 124k
    }

    // Add realistic minor noise
    const noise = Math.sin(i * 0.5) * 2200;
    const demand = Math.round(baseDemand + noise);
    const inventoryReq = Math.round(demand * 1.12);

    // Dynamic confidence score degrades slightly further into the future
    let confidence = 96;
    if (i > 39) confidence = 89;
    else if (i > 26) confidence = 92;
    else if (i > 13) confidence = 94;

    // Trend calculation
    let trend: "Increasing" | "Stable" | "Decreasing" = "Stable";
    if (i >= 8 && i <= 26) trend = "Increasing";
    else if (i >= 32 && i <= 52) trend = "Decreasing";

    data.push({
      weekNum: i,
      week: `W${i}`,
      quarter,
      demand,
      inventoryReq,
      confidence,
      trend,
    });
  }

  return data;
};

const fullYearData = generate52WeekData();

export default function AnnualDemandForecast() {
  const [filter, setFilter] = useState<"4w" | "12w" | "26w" | "52w">("52w");

  const filteredData = useMemo(() => {
    switch (filter) {
      case "4w":
        return fullYearData.slice(0, 4);
      case "12w":
        return fullYearData.slice(0, 12);
      case "26w":
        return fullYearData.slice(0, 26);
      case "52w":
      default:
        return fullYearData;
    }
  }, [filter]);

  const avgConfidence = useMemo(() => {
    const sum = filteredData.reduce((acc, curr) => acc + curr.confidence, 0);
    return (sum / filteredData.length).toFixed(1);
  }, [filteredData]);

  const totalDemandCases = useMemo(() => {
    const sum = filteredData.reduce((acc, curr) => acc + curr.demand, 0);
    return (sum / 1000000).toFixed(2);
  }, [filteredData]);

  return (
    <div className="rounded-[20px] border border-red-600/20 bg-[#0f0f0f]/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:border-red-600/50">
      {/* Header & Filter Controls Bar */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-red-950/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff1a1a]">52-Week AI Forecast</span>
            <span className="rounded-full border border-red-600/40 bg-red-950/50 px-2.5 py-0.5 text-[10px] font-bold text-[#ff4d4d]">
              Full Year Planning
            </span>
          </div>
          <h2 className="mt-1 text-xl font-black text-white tracking-tight sm:text-2xl">
            Annual Production Demand Forecast
          </h2>
          <p className="mt-1 text-xs text-[#a3a3a3]">
            Long-term predictive modeling &amp; material allocation for factory line scheduling.
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-[#050505] p-1.5 rounded-xl border border-red-950/80">
          {(
            [
              { key: "4w", label: "Next 4 Weeks" },
              { key: "12w", label: "Next 12 Weeks" },
              { key: "26w", label: "Next 26 Weeks" },
              { key: "52w", label: "Full Year (52 Wks)" },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                filter === item.key
                  ? "bg-gradient-to-r from-[#ff1a1a] to-[#990000] text-white shadow-[0_0_12px_rgba(255,26,26,0.3)]"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Summary & Quarterly Indicator Pills */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-red-900/30 bg-[#050505]/60 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Volume</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#ff1a1a]" />
          </div>
          <p className="mt-1 text-lg font-black text-white">{totalDemandCases}M <span className="text-xs font-normal text-gray-400">Cases</span></p>
          <span className="text-[10px] text-emerald-400 font-semibold">+14.2% YoY Surge</span>
        </div>

        <div className="rounded-xl border border-red-900/30 bg-[#050505]/60 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">AI Confidence</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="mt-1 text-lg font-black text-white">{avgConfidence}%</p>
          <span className="text-[10px] text-gray-400">Degrades to 89% (Q4)</span>
        </div>

        <div className="rounded-xl border border-red-900/30 bg-[#050505]/60 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Peak Window</span>
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="mt-1 text-lg font-black text-white">Weeks 20–28</p>
          <span className="text-[10px] text-amber-400 font-semibold">168k Cases / Wk</span>
        </div>

        <div className="rounded-xl border border-red-900/30 bg-[#050505]/60 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Current Trend</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#ff1a1a]" />
          </div>
          <p className="mt-1 text-lg font-black text-white">Increasing</p>
          <span className="text-[10px] text-[#ff4d4d] font-semibold">Pre-Summer Surge</span>
        </div>
      </div>

      {/* Quarterly Tabs Indicator Bar */}
      <div className="mb-4 flex items-center justify-between text-xs text-gray-400 border-b border-red-950/40 pb-2 overflow-x-auto">
        <div className="flex items-center space-x-4 min-w-max">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-600" />
            <span className="font-bold text-white">Q1 (W1–W13):</span>
            <span>1.62M Cases • 96% Conf</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#ff1a1a]" />
            <span className="font-bold text-white">Q2 (W14–W26):</span>
            <span>2.05M Cases • 94% Conf</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#b30000]" />
            <span className="font-bold text-white">Q3 (W27–W39):</span>
            <span>2.12M Cases • 92% Conf</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#8b0000]" />
            <span className="font-bold text-white">Q4 (W40–W52):</span>
            <span>1.58M Cases • 89% Conf</span>
          </div>
        </div>
      </div>

      {/* Recharts 52-Week Area Line Chart Container */}
      <div className="h-[320px] w-full sm:h-[360px] overflow-x-auto">
        <div className="h-full min-w-[700px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
              <defs>
                <linearGradient id="annualForecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff1a1a" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#8b0000" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255, 26, 26, 0.12)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                interval={filter === "52w" ? 3 : 0}
                tick={{ fill: "#a3a3a3", fontSize: 11, fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#a3a3a3", fontSize: 11, fontWeight: 600 }}
                tickFormatter={(val) => `${val / 1000}k`}
                domain={["dataMin - 10000", "dataMax + 10000"]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const d = payload[0].payload as WeekForecast;
                  return (
                    <div className="rounded-2xl border border-red-500/40 bg-[#0f0f0f]/95 p-4 text-xs shadow-[0_10px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(255,26,26,0.25)] backdrop-blur-md min-w-[210px]">
                      <div className="flex items-center justify-between border-b border-red-950/80 pb-2 mb-2">
                        <span className="font-extrabold text-white text-sm">
                          Week {d.weekNum} <span className="text-[#ff1a1a]">({d.quarter})</span>
                        </span>
                        <span className="rounded-full bg-[#ff1a1a]/20 border border-[#ff1a1a]/40 px-2 py-0.5 text-[10px] font-bold text-[#ff4d4d]">
                          {d.confidence}% Conf
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Predicted Demand:</span>
                          <span className="font-bold text-white">{d.demand.toLocaleString()} Cases</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Required Raw Material:</span>
                          <span className="font-bold text-emerald-400">{d.inventoryReq.toLocaleString()} Units</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Forecast Trend:</span>
                          <span className={`font-bold flex items-center gap-1 ${
                            d.trend === "Increasing" ? "text-emerald-400" : d.trend === "Decreasing" ? "text-amber-400" : "text-cyan-400"
                          }`}>
                            {d.trend === "Increasing" ? <ArrowUpRight className="w-3 h-3" /> : d.trend === "Decreasing" ? <ArrowDownRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                            {d.trend}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="demand"
                name="Production Demand"
                stroke="#ff1a1a"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#annualForecastGradient)"
                dot={filter !== "52w" ? { r: 4, fill: "#ff1a1a" } : false}
                activeDot={{ r: 7, fill: "#ff1a1a", stroke: "#ffffff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI-Generated Business Planning Insights Below Chart */}
      <div className="mt-6 pt-5 border-t border-red-950/80">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#ff1a1a]" />
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
            AI Operational Planning Recommendations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-red-900/30 bg-[#050505]/60 p-3.5 flex items-start space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#ff1a1a] mt-1.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Summer Peak Demand Surge</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Demand expected to peak during <strong className="text-white">Weeks 20–28 (Q2/Q3)</strong> with a projected +28% volume increase. Activate secondary line shifts by Week 18.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-red-900/30 bg-[#050505]/60 p-3.5 flex items-start space-x-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Pre-Emptive Material Allocation</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Raw syrup &amp; packaging inventory stockup recommended prior to <strong className="text-white">Week 18</strong> to eliminate supply chain bottlenecks.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-red-900/30 bg-[#050505]/60 p-3.5 flex items-start space-x-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Q3 Capacity &amp; Shift Balancing</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Additional production capacity required during <strong className="text-white">Q3 (Weeks 27–39)</strong> to maintain 98.4% target order fulfillment rate.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-red-900/30 bg-[#050505]/60 p-3.5 flex items-start space-x-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Low-Demand Overhaul Window</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                Schedule major preventive line maintenance during the low-demand window in <strong className="text-white">Weeks 44–48 (Q4)</strong> to minimize plant downtime impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
