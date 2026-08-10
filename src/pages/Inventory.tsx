import { Boxes, PackageCheck, RotateCw, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Sidebar from "../components/sidebar/Sidebar";
import PageHeader from "../components/ui/PageHeader";
import SectionCard from "../components/ui/SectionCard";
import StatCard from "../components/ui/StatCard";

type KPI = {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  tone?: "red" | "emerald" | "amber" | "cyan";
};

type StockRow = {
  material: string;
  availableQty: number;
  reservedQty: number;
  reorderLevel: number;
  status: "Healthy" | "Low" | "Critical";
};

const kpiData: KPI[] = [
  {
    title: "Total Inventory",
    value: "84,320",
    subtitle: "units across warehouse",
    icon: Boxes,
    tone: "red",
  },
  {
    title: "Available Stock",
    value: "71,540",
    subtitle: "ready for allocation",
    icon: PackageCheck,
    tone: "emerald",
  },
  {
    title: "Reserved Stock",
    value: "12,780",
    subtitle: "committed to orders",
    icon: ShieldAlert,
    tone: "amber",
  },
  {
    title: "Reorder Items",
    value: "6",
    subtitle: "materials need replenishment",
    icon: RotateCw,
    tone: "red",
  },
];

// Red color palette variations for Smart Factory theme
const inventoryDistribution = [
  { name: "Raw Materials", value: 45, color: "#ff1a1a" },
  { name: "Packaging", value: 25, color: "#b30000" },
  { name: "Syrup", value: 15, color: "#8b0000" },
  { name: "Finished Goods", value: 15, color: "#ff4d4d" },
];

const stockLevels = [
  { material: "Sugar", available: 4200, reorder: 2500 },
  { material: "Cans", available: 3100, reorder: 1800 },
  { material: "Flavoring", available: 1800, reorder: 1500 },
  { material: "Labels", available: 1400, reorder: 1200 },
  { material: "Caps", available: 2200, reorder: 1800 },
];

const stockRows: StockRow[] = [
  {
    material: "Sugar",
    availableQty: 4200,
    reservedQty: 850,
    reorderLevel: 2500,
    status: "Healthy",
  },
  {
    material: "Cans",
    availableQty: 3100,
    reservedQty: 700,
    reorderLevel: 1800,
    status: "Healthy",
  },
  {
    material: "Flavoring",
    availableQty: 1800,
    reservedQty: 420,
    reorderLevel: 1500,
    status: "Low",
  },
  {
    material: "Labels",
    availableQty: 950,
    reservedQty: 300,
    reorderLevel: 1200,
    status: "Critical",
  },
  {
    material: "Caps",
    availableQty: 2200,
    reservedQty: 500,
    reorderLevel: 1800,
    status: "Healthy",
  },
];

const statusStyles = {
  Healthy: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
  Low: "border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
  Critical: "border-red-600/50 bg-red-950/60 text-red-300 shadow-[0_0_12px_rgba(255,26,26,0.25)]",
};

export default function InventoryPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-[#050505] via-[#0f0f0f] to-[#2b0000] text-white font-sans">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          eyebrow="Supply chain control"
          title="Inventory Management"
          description="Monitor stock availability, allocation, and replenishment needs for the factory."
          badge="Warehouse is healthy with 4 materials above target"
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiData.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <SectionCard eyebrow="Stock mix" title="Inventory Distribution" badge="Balanced inventory">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="h-[260px] w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={inventoryDistribution}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={65}
                      outerRadius={100}
                      paddingAngle={4}
                      stroke="none"
                    >
                      {inventoryDistribution.map((entry) => (
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
                      formatter={(value) => [`${value}% Share`, "Category"]}
                      labelStyle={{ fontWeight: "bold", color: "#ff4d4d" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend List */}
              <div className="w-full md:w-1/2 space-y-2.5">
                {inventoryDistribution.map((item) => (
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
          </SectionCard>

          <SectionCard eyebrow="Supply signal" title="Stock Levels" badge="2 items below target">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockLevels} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255, 26, 26, 0.12)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="material" axisLine={false} tickLine={false} tick={{ fill: "#a3a3a3", fontSize: 12, fontWeight: 600 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#a3a3a3", fontSize: 12, fontWeight: 600 }} />
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
                    labelStyle={{ fontWeight: "bold", color: "#ff4d4d" }}
                  />
                  <Bar dataKey="available" name="Available Stock" fill="#ff1a1a" radius={[8, 8, 0, 0]} maxBarSize={32} />
                  <Bar dataKey="reorder" name="Reorder Level" fill="#8b0000" radius={[8, 8, 0, 0]} maxBarSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <SectionCard eyebrow="Warehouse details" title="Inventory Levels" badge="Live material view">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-[#a3a3a3]">
              <thead>
                <tr className="border-b border-red-900/40 text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
                  <th className="px-4 py-3.5">Material</th>
                  <th className="px-4 py-3.5">Available Qty</th>
                  <th className="px-4 py-3.5">Reserved Qty</th>
                  <th className="px-4 py-3.5">Reorder Level</th>
                  <th className="px-4 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-950/40">
                {stockRows.map((row) => (
                  <tr key={row.material} className="transition-colors duration-200 hover:bg-[#ff1a1a]/10">
                    <td className="px-4 py-4 font-semibold text-white">{row.material}</td>
                    <td className="px-4 py-4 text-white font-mono">{row.availableQty.toLocaleString()}</td>
                    <td className="px-4 py-4 text-[#a3a3a3] font-mono">{row.reservedQty.toLocaleString()}</td>
                    <td className="px-4 py-4 text-[#a3a3a3] font-mono">{row.reorderLevel.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[row.status]}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${row.status === "Healthy" ? "bg-emerald-400 animate-pulse" : row.status === "Low" ? "bg-amber-400" : "bg-red-400"}`} />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </main>
    </div>
  );
}
