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
    <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.2),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-white md:flex-row">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <DashboardHero />

        {isLoading ? (
          <>
            <DashboardSkeleton variant="kpis" />
            <DashboardSkeleton variant="chart" />
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <DashboardSkeleton variant="chart" />
              <DashboardSkeleton variant="chart" />
            </div>
            <DashboardSkeleton variant="table" />
          </>
        ) : (
          <>
            <div id="kpi-section" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((card) => {
                const Icon = iconMap[card.iconName];
                return <StatCard key={card.title} title={card.title} value={card.value} subtitle={card.subtitle} trend={card.trend} icon={Icon} tone={card.tone} />;
              })}
            </div>

            <ProductionChart data={productionData} />

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <MachineUtilizationChart data={machineUtilizationData} />
              <InventoryStatusChart data={inventoryDistributionData} />
            </div>

            <RecentAlerts alerts={alerts} />
            <MachineStatusTable machines={machineStatuses} />
          </>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <SectionCard eyebrow="Priority overview" title="Current plant focus" badge="3 critical items">
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Bottling line B2</span>
                  <span className="text-emerald-300">Stable</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Throughput is tracking above target at 98.1% of plan.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Packaging cell C4</span>
                  <span className="text-amber-300">Watch</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Minor conveyor variance detected; maintenance is monitoring it.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Cold storage zone</span>
                  <span className="text-emerald-300">Healthy</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  Temperature compliance remains within the recommended range.
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Today's action center" title="What needs attention">
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/60 p-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>12 work orders were closed before noon.</span>
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/60 p-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                <span>Inventory replenishment is aligned with demand.</span>
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/60 p-3">
                <AlertTriangle className="h-4 w-4 text-amber-300" />
                <span>One palletizer requires preventive maintenance this evening.</span>
              </li>
            </ul>
          </SectionCard>
        </div>
      </main>
    </div>
  );
}