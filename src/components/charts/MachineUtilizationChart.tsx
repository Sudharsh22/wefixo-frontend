import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const barGradients = ["#f40009", "#06b6d4", "#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"];

type Props = {
  data: Array<{ machine: string; utilization: number }>;
};

export default function MachineUtilizationChart({ data }: Props) {
  const utilizationData = useMemo(() => data, [data]);

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-red-500/30 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Asset Efficiency</p>
          <h2 className="mt-1 text-xl font-bold text-white">Machine Utilization Rate</h2>
        </div>
        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.15)]">
          Peak Performance Active
        </div>
      </div>

      <div className="h-[260px] w-full sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={utilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="machine"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 600 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderColor: "rgba(244, 0, 9, 0.4)",
                borderRadius: "16px",
                color: "#ffffff",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(12px)",
                padding: "12px 16px",
              }}
              formatter={(value) => [`${value}% Operational OEE`, "Utilization"]}
              labelStyle={{ fontWeight: "bold", color: "#f87171", marginBottom: "4px" }}
            />
            <Bar dataKey="utilization" radius={[10, 10, 0, 0]} maxBarSize={45}>
              {utilizationData.map((entry, index) => (
                <Cell
                  key={`${entry.machine}-${index}`}
                  fill={barGradients[index % barGradients.length]}
                  className="transition-all duration-300 hover:opacity-85"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
