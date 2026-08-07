import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
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
    <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Performance trend
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Weekly Production Trend
          </h2>
        </div>
        <div className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-sm text-red-300">
          +8.1% this week
        </div>
      </div>

      <div className="h-[260px] w-full sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid rgba(248, 113, 113, 0.2)",
                borderRadius: "12px",
                color: "#f8fafc",
              }}
              formatter={(value) => [`${Number(value).toLocaleString()} cases`, "Production"]}
            />
            <Line
              type="monotone"
              dataKey="production"
              stroke="#f43f5e"
              strokeWidth={3}
              dot={{ r: 4, fill: "#fb7185" }}
              activeDot={{ r: 6, fill: "#fda4af" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
