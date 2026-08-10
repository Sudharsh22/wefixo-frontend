import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  data: Array<{ name: string; value: number; color: string }>;
};

// Map colors to emphasize WEFIXO red theme variations
const customColors: Record<string, string> = {
  "Raw Materials": "#ff1a1a",
  Packaging: "#b30000",
  Syrup: "#8b0000",
  "Finished Goods": "#ff4d4d",
};

export default function InventoryStatusChart({ data }: Props) {
  const inventoryData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      color: customColors[item.name] || item.color,
    }));
  }, [data]);

  return (
    <section className="rounded-[20px] border border-red-600/20 bg-[#0f0f0f]/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_0_20px_rgba(255,26,26,0.2)]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-red-950/80 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff1a1a]">Stock Logistics</p>
          <h2 className="mt-1 text-xl font-black text-white tracking-tight">Inventory Distribution</h2>
        </div>
        <div className="rounded-full border border-red-600/40 bg-red-950/40 px-3.5 py-1.5 text-xs font-bold text-[#ff4d4d] backdrop-blur-md shadow-[0_0_12px_rgba(255,26,26,0.2)]">
          Balanced Allocation
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
                  backgroundColor: "rgba(15, 15, 15, 0.95)",
                  borderColor: "rgba(255, 26, 26, 0.4)",
                  borderRadius: "16px",
                  color: "#ffffff",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 26, 26, 0.25)",
                  backdropFilter: "blur(12px)",
                  padding: "12px 16px",
                }}
                formatter={(value) => [`${value}% Total Share`, "Category"]}
                labelStyle={{ fontWeight: "bold", color: "#ff4d4d" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend List */}
        <div className="w-full md:w-1/2 space-y-2.5">
          {inventoryData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-xl border border-red-900/30 bg-[#0f0f0f]/60 px-3.5 py-2.5 backdrop-blur-md transition-all duration-200 hover:border-red-600/40"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-semibold text-white">{item.name}</span>
              </div>
              <span className="text-xs font-bold text-[#a3a3a3]">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
