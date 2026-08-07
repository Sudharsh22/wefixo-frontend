import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  data: Array<{ name: string; value: number; color: string }>;
};

// Map colors to emphasize WEFIXO red for main inventory item
const customColors: Record<string, string> = {
  "Raw Materials": "#ff1e27", // WEFIXO Red
  Packaging: "#06b6d4",
  Syrup: "#10b981",
  "Finished Goods": "#3b82f6",
};

export default function InventoryStatusChart({ data }: Props) {
  const inventoryData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      color: customColors[item.name] || item.color,
    }));
  }, [data]);

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-red-500/30 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Stock Logistics</p>
          <h2 className="mt-1 text-xl font-bold text-white">Inventory Distribution</h2>
        </div>
        <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-400 backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.15)]">
          Balanced Stock Allocation
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="h-[220px] w-full sm:h-[260px] md:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={inventoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={4}
                stroke="none"
              >
                {inventoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
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
                formatter={(value) => [`${value}% Total Share`, "Category"]}
                labelStyle={{ fontWeight: "bold", color: "#f87171" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend List */}
        <div className="w-full md:w-1/2 space-y-2.5">
          {inventoryData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/40 px-3.5 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-white/20"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-semibold text-white">{item.name}</span>
              </div>
              <span className="text-xs font-bold text-slate-300">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
