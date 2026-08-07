import { AlertTriangle, Clock3, HardHat, ToolCase } from "lucide-react";
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

type MaintenanceRow = {
  machine: string;
  issue: string;
  priority: "High" | "Medium" | "Low";
  assignedTo: string;
  status: "Open" | "In Progress" | "Resolved";
};

const kpiData: KPI[] = [
  {
    title: "Open Maintenance Jobs",
    value: "12",
    subtitle: "active work orders",
    icon: HardHat,
    tone: "amber",
  },
  {
    title: "Critical Issues",
    value: "4",
    subtitle: "priority one incidents",
    icon: AlertTriangle,
    tone: "red",
  },
  {
    title: "Completed Today",
    value: "7",
    subtitle: "resolved before shift end",
    icon: ToolCase,
    tone: "emerald",
  },
  {
    title: "Machine Downtime",
    value: "38 min",
    subtitle: "across 3 lines",
    icon: Clock3,
    tone: "cyan",
  },
];

const downtimeTrend = [
  { day: "Mon", minutes: 24 },
  { day: "Tue", minutes: 31 },
  { day: "Wed", minutes: 27 },
  { day: "Thu", minutes: 35 },
  { day: "Fri", minutes: 29 },
  { day: "Sat", minutes: 41 },
  { day: "Sun", minutes: 33 },
];

const maintenanceRows: MaintenanceRow[] = [
  {
    machine: "Bottle Line A1",
    issue: "Sensor calibration drift",
    priority: "High",
    assignedTo: "Alex Chen",
    status: "In Progress",
  },
  {
    machine: "Conveyor B3",
    issue: "Bearing lubrication required",
    priority: "Medium",
    assignedTo: "Mina Yusuf",
    status: "Open",
  },
  {
    machine: "Packer P4",
    issue: "Hydraulic pressure leak",
    priority: "High",
    assignedTo: "Daniel Ortiz",
    status: "In Progress",
  },
  {
    machine: "Labeler L2",
    issue: "Routine inspection overdue",
    priority: "Low",
    assignedTo: "Sara Kim",
    status: "Resolved",
  },
];

const priorityStyles = {
  High: "border-red-500/20 bg-red-500/10 text-red-300",
  Medium: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  Low: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
};

const statusStyles = {
  Open: "border-slate-500/20 bg-slate-500/10 text-slate-300",
  "In Progress": "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  Resolved: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.22),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <PageHeader
          eyebrow="Reliability center"
          title="Maintenance Management"
          description="Track equipment issues, repair workload, and machine downtime in real time."
          badge="Preventive checks are on schedule for Line 3"
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiData.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        <SectionCard eyebrow="Downtime analytics" title="Downtime Trend" badge="Weekly average 31 min" className="mt-8">

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={downtimeTrend}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid rgba(248, 113, 113, 0.2)",
                    borderRadius: "12px",
                    color: "#f8fafc",
                  }}
                  formatter={(value) => [`${value} min`, "Downtime"]}
                />
                <Line type="monotone" dataKey="minutes" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: "#fb7185" }} activeDot={{ r: 6, fill: "#fda4af" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Work order board" title="Maintenance Schedule" badge="4 active tasks" className="mt-8">

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="px-3 py-3 font-medium">Machine</th>
                  <th className="px-3 py-3 font-medium">Issue</th>
                  <th className="px-3 py-3 font-medium">Priority</th>
                  <th className="px-3 py-3 font-medium">Assigned To</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceRows.map((row) => (
                  <tr key={`${row.machine}-${row.issue}`} className="border-b border-white/10 last:border-none">
                    <td className="px-3 py-3 text-white">{row.machine}</td>
                    <td className="px-3 py-3">{row.issue}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyles[row.priority]}`}>
                        {row.priority}
                      </span>
                    </td>
                    <td className="px-3 py-3">{row.assignedTo}</td>
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
