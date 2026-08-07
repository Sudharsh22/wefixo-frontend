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

const colors = ["#fb7185", "#f59e0b", "#22c55e", "#38bdf8", "#a78bfa", "#f43f5e"];

type Props = {
  data: Array<{ machine: string; utilization: number }>;
};

export default function MachineUtilizationChart({ data }: Props) {
  const utilizationData = useMemo(() => data, [data]);
  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Asset health</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Machine Utilization</h2>
        </div>
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
          Peak performance
        </div>
      </div>

      <div className="h-[260px] w-full sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={utilizationData}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="machine"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid rgba(248, 113, 113, 0.2)",
                borderRadius: "12px",
                color: "#f8fafc",
              }}
              formatter={(value) => [`${value}%`, "Utilization"]}
            />
            <Bar dataKey="utilization" radius={[8, 8, 0, 0]}>
              {utilizationData.map((entry, index) => (
                <Cell key={`${entry.machine}-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
