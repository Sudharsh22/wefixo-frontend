import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  data: Array<{ name: string; value: number; color: string }>;
};

export default function InventoryStatusChart({ data }: Props) {
  const inventoryData = useMemo(() => data, [data]);
  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Inventory health</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Inventory Distribution</h2>
        </div>
        <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
          Balanced stock
        </div>
      </div>

      <div className="h-[260px] w-full sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={inventoryData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
            >
              {inventoryData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid rgba(248, 113, 113, 0.2)",
                borderRadius: "12px",
                color: "#f8fafc",
              }}
              formatter={(value) => [`${value}%`, "Share"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
