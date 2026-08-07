import { AlertTriangle, Factory, Gauge, PackageCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
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

type WorkOrderRow = {
  id: string;
  product: string;
  plannedQty: number;
  producedQty: number;
  status: "In Progress" | "Ready" | "Delayed";
};

const kpiData: KPI[] = [
  {
    title: "Planned Production",
    value: "145,000",
    subtitle: "cases targeted today",
    icon: Factory,
    tone: "red",
  },
  {
    title: "Actual Production",
    value: "138,420",
    subtitle: "line output so far",
    icon: PackageCheck,
    tone: "emerald",
  },
  {
    title: "Defective Units",
    value: "1,180",
    subtitle: "below weekly threshold",
    icon: AlertTriangle,
    tone: "amber",
  },
  {
    title: "Production Efficiency",
    value: "95.4%",
    subtitle: "above target benchmark",
    icon: Gauge,
    tone: "cyan",
  },
];

const hourlyData = [
  { hour: "06:00", output: 18200 },
  { hour: "08:00", output: 19450 },
  { hour: "10:00", output: 20810 },
  { hour: "12:00", output: 21560 },
  { hour: "14:00", output: 22340 },
  { hour: "16:00", output: 23120 },
  { hour: "18:00", output: 23980 },
];

const workOrders: WorkOrderRow[] = [
  {
    id: "WO-1042",
    product: "Smart Line Unit A (500ml)",
    plannedQty: 120000,
    producedQty: 112500,
    status: "In Progress",
  },
  {
    id: "WO-1048",
    product: "Smart Line Unit B (330ml)",
    plannedQty: 95000,
    producedQty: 89600,
    status: "Ready",
  },
  {
    id: "WO-1051",
    product: "Smart Line Unit C (250ml)",
    plannedQty: 88000,
    producedQty: 79100,
    status: "In Progress",
  },
  {
    id: "WO-1056",
    product: "Smart Line Unit D (Packaging)",
    plannedQty: 76000,
    producedQty: 70200,
    status: "Delayed",
  },
];

const statusStyles = {
  "In Progress": "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  Ready: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  Delayed: "border-amber-500/20 bg-amber-500/10 text-amber-300",
};

export default function Production() {
  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.22),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <PageHeader
          eyebrow="Production intelligence"
          title="Production Operations"
          description="Monitor throughput, quality, and work order execution across the WEFIXO Smart Factory AI floor."
          badge="Bottling line 2 is performing 4.1% above plan"
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiData.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        <SectionCard eyebrow="Throughput" title="Hourly Production Output" badge="Peak window 14:00–18:00" className="mt-8">

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="hour"
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
                  formatter={(value) => [`${Number(value).toLocaleString()} cases`, "Output"]}
                />
                <Line
                  type="monotone"
                  dataKey="output"
                  stroke="#f43f5e"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#fb7185" }}
                  activeDot={{ r: 6, fill: "#fda4af" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Order tracking" title="Production Schedule" badge="4 live jobs" className="mt-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="px-3 py-3 font-medium">Work Order ID</th>
                  <th className="px-3 py-3 font-medium">Product</th>
                  <th className="px-3 py-3 font-medium">Planned Qty</th>
                  <th className="px-3 py-3 font-medium">Produced Qty</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {workOrders.map((row) => (
                  <tr key={row.id} className="border-b border-white/10 last:border-none">
                    <td className="px-3 py-3 text-white">{row.id}</td>
                    <td className="px-3 py-3">{row.product}</td>
                    <td className="px-3 py-3">{row.plannedQty.toLocaleString()}</td>
                    <td className="px-3 py-3">{row.producedQty.toLocaleString()}</td>
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
