import { Activity, Cpu, HardHat, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MachineStatusTable from "../../components/charts/MachineStatusTable";
import MachineUtilizationChart from "../../components/charts/MachineUtilizationChart";
import Sidebar from "../../components/sidebar/Sidebar";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import useLiveFactoryData from "../../hooks/useLiveFactoryData";

type KPI = {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  tone?: "red" | "emerald" | "amber" | "cyan";
};

const kpiData: KPI[] = [
  {
    title: "Total Machines",
    value: "24",
    subtitle: "across 4 production lines",
    icon: Cpu,
    tone: "red",
  },
  {
    title: "Running",
    value: "19",
    subtitle: "online and producing",
    icon: Zap,
    tone: "red",
  },
  {
    title: "Idle",
    value: "2",
    subtitle: "awaiting batch release",
    icon: Activity,
    tone: "amber",
  },
  {
    title: "Maintenance",
    value: "3",
    subtitle: "scheduled service in progress",
    icon: HardHat,
    tone: "red",
  },
];

export default function MachinesPage() {
  const { machineUtilizationData, machineStatuses } = useLiveFactoryData();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-[#050505] via-[#0f0f0f] to-[#2b0000] text-white font-sans">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          eyebrow="Asset monitoring"
          title="Machine Monitoring"
          description="Track machine health, utilization, and live operating conditions across the plant."
          badge="Line 2 is currently at 96% utilization"
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiData.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <MachineUtilizationChart data={machineUtilizationData} />
          <MachineStatusTable machines={machineStatuses} />
        </div>
      </main>
    </div>
  );
}
