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
  tone: "red" | "emerald" | "amber" | "cyan";
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
    tone: "cyan",
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

const inventoryDistribution = [
  { name: "Raw Materials", value: 45, color: "#f43f5e" },
  { name: "Packaging", value: 25, color: "#fb923c" },
  { name: "Syrup", value: 15, color: "#22c55e" },
  { name: "Finished Goods", value: 15, color: "#38bdf8" },
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
  Healthy: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  Low: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  Critical: "border-red-500/20 bg-red-500/10 text-red-300",
};

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.22),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
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

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <SectionCard eyebrow="Stock mix" title="Inventory Distribution" badge="Balanced inventory">

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                  >
                    {inventoryDistribution.map((entry) => (
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
          </SectionCard>

          <SectionCard eyebrow="Supply signal" title="Stock Levels" badge="2 items below target">

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockLevels}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="material" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid rgba(248, 113, 113, 0.2)",
                      borderRadius: "12px",
                      color: "#f8fafc",
                    }}
                  />
                  <Bar dataKey="available" fill="#f43f5e" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="reorder" fill="#fb923c" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <SectionCard eyebrow="Warehouse details" title="Inventory Levels" badge="Live material view" className="mt-8">

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="px-3 py-3 font-medium">Material</th>
                  <th className="px-3 py-3 font-medium">Available Qty</th>
                  <th className="px-3 py-3 font-medium">Reserved Qty</th>
                  <th className="px-3 py-3 font-medium">Reorder Level</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {stockRows.map((row) => (
                  <tr key={row.material} className="border-b border-white/10 last:border-none">
                    <td className="px-3 py-3 text-white">{row.material}</td>
                    <td className="px-3 py-3">{row.availableQty.toLocaleString()}</td>
                    <td className="px-3 py-3">{row.reservedQty.toLocaleString()}</td>
                    <td className="px-3 py-3">{row.reorderLevel.toLocaleString()}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
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
