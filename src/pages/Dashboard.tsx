import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  Factory,
  Gauge,
  PackageCheck,
  TimerReset,
  Wrench,
  Zap,
} from "lucide-react";
import InventoryStatusChart from "../components/charts/InventoryStatusChart";
import MachineStatusTable from "../components/charts/MachineStatusTable";
import MachineUtilizationChart from "../components/charts/MachineUtilizationChart";
import ProductionChart from "../components/charts/ProductionChart";
import RecentAlerts from "../components/charts/RecentAlerts";
import LiveFactoryStatusPanel from "../components/dashboard/LiveFactoryStatusPanel";
import Sidebar from "../components/sidebar/Sidebar";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";
import DashboardHero from "../components/ui/DashboardHero";
import SectionCard from "../components/ui/SectionCard";
import StatCard from "../components/ui/StatCard";
import useLiveFactoryData from "../hooks/useLiveFactoryData";

const iconMap = {
  factory: Factory,
  zap: Zap,
  boxes: Boxes,
  gauge: Gauge,
  timer: TimerReset,
  alert: AlertTriangle,
  package: PackageCheck,
  wrench: Wrench,
} as const;

export default function Dashboard() {
  const { kpis, productionData, machineUtilizationData, inventoryDistributionData, alerts, machineStatuses, isLoading } = useLiveFactoryData();

  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,_rgba(244,0,9,0.15),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.9),_transparent_50%),linear-gradient(135deg,_#020617_0%,_#090d16_50%,_#0f172a_100%)] text-white md:flex-row font-sans">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Full Width Background Video Hero Section */}
        <DashboardHero />

        {/* Live Factory Telemetry Status Panel */}
        <LiveFactoryStatusPanel />

        {isLoading ? (
          <>
            <div className="mt-8">
              <DashboardSkeleton variant="kpis" />
            </div>
            <DashboardSkeleton variant="chart" />
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <DashboardSkeleton variant="chart" />
              <DashboardSkeleton variant="chart" />
            </div>
            <DashboardSkeleton variant="table" />
          </>
        ) : (
          <>
            {/* KPI Cards Grid */}
            <div id="kpi-section" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((card) => {
                const Icon = iconMap[card.iconName];
                return <StatCard key={card.title} title={card.title} value={card.value} subtitle={card.subtitle} trend={card.trend} icon={Icon} tone={card.tone} />;
              })}
            </div>

            {/* Production Volume Chart */}
            <ProductionChart data={productionData} />

            {/* Analytics Grid */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <MachineUtilizationChart data={machineUtilizationData} />
              <InventoryStatusChart data={inventoryDistributionData} />
            </div>

            {/* Operations Alerts Feed */}
            <RecentAlerts alerts={alerts} />

            {/* Fleet Status Table */}
            <MachineStatusTable machines={machineStatuses} />
          </>
        )}

        {/* Action Center & Focus Section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <SectionCard eyebrow="Priority Overview" title="Current Plant Focus" badge="3 Critical Items">
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md transition-all duration-200 hover:border-red-500/30">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Bottling Line B2</span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">Stable</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Throughput is tracking above target at 98.1% of operational plan.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md transition-all duration-200 hover:border-red-500/30">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Packaging Cell C4</span>
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">Watch</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Minor conveyor variance detected; maintenance automated telemetry is active.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md transition-all duration-200 hover:border-red-500/30">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Cold Storage Zone</span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">Healthy</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Temperature compliance remains within the target 4.0°C range.
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Action Center" title="What Needs Attention">
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-3.5 backdrop-blur-md">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>12 work orders closed before noon shift.</span>
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-3.5 backdrop-blur-md">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Inventory replenishment aligned with production demand.</span>
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-3.5 backdrop-blur-md">
                <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <span>One palletizer scheduled for preventive maintenance tonight.</span>
              </li>
            </ul>
          </SectionCard>
        </div>
      </main>
    </div>
  );
}