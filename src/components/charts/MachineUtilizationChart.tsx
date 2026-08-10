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

// Red theme bar colors for WEFIXO Smart Factory AI command center
const barGradients = ["#ff1a1a", "#b30000", "#8b0000", "#ff4d4d", "#e60000", "#5c0000"];

type Props = {
  data: Array<{ machine: string; utilization: number }>;
};

export default function MachineUtilizationChart({ data }: Props) {
  const utilizationData = useMemo(() => data, [data]);

  return (
    <section className="rounded-[20px] border border-red-600/20 bg-[#0f0f0f]/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_0_20px_rgba(255,26,26,0.2)]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-red-950/80 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff1a1a]">Asset Efficiency</p>
          <h2 className="mt-1 text-xl font-black text-white tracking-tight">Machine Utilization Rate</h2>
        </div>
        <div className="rounded-full border border-red-600/40 bg-red-950/40 px-3.5 py-1.5 text-xs font-bold text-[#ff4d4d] backdrop-blur-md shadow-[0_0_12px_rgba(255,26,26,0.2)]">
          Peak Performance Active
        </div>
      </div>

      <div className="h-[260px] w-full sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={utilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255, 26, 26, 0.12)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="machine"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a3a3a3", fontSize: 11, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a3a3a3", fontSize: 12, fontWeight: 600 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 15, 15, 0.95)",
                borderColor: "rgba(255, 26, 26, 0.4)",
                borderRadius: "16px",
                color: "#ffffff",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 26, 26, 0.25)",
                backdropFilter: "blur(12px)",
                padding: "12px 16px",
              }}
              formatter={(value) => [`${value}% Operational OEE`, "Utilization"]}
              labelStyle={{ fontWeight: "bold", color: "#ff4d4d", marginBottom: "4px" }}
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
