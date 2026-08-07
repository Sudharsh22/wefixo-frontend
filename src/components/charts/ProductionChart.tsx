import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: Array<{ day: string; production: number }>;
};

export default function ProductionChart({ data }: Props) {
  const chartData = useMemo(() => data, [data]);

  return (
    <section className="mt-8 rounded-3xl border border-red-500/20 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-red-500/30 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Live Volume Throughput</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
            Weekly Production Volume Trend
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-400 backdrop-blur-md shadow-[0_0_15px_rgba(244,0,9,0.2)]">
          <span>+8.1% vs Target</span>
        </div>
      </div>

      <div className="h-[280px] w-full sm:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="wefixoRedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff1e27" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#ff1e27" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderColor: "rgba(255, 30, 39, 0.4)",
                borderRadius: "16px",
                color: "#ffffff",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(12px)",
                padding: "12px 16px",
              }}
              formatter={(value) => [`${Number(value).toLocaleString()} Cases Packed`, "Production Volume"]}
              labelStyle={{ fontWeight: "bold", color: "#f87171", marginBottom: "4px" }}
            />
            <Area
              type="monotone"
              dataKey="production"
              stroke="#ff1e27"
              strokeWidth={3.5}
              fillOpacity={1}
              fill="url(#wefixoRedGradient)"
              dot={{ r: 5, fill: "#ff1e27", stroke: "#ffffff", strokeWidth: 2 }}
              activeDot={{ r: 8, fill: "#ff1e27", stroke: "#ffffff", strokeWidth: 3, className: "wefixo-glow" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
