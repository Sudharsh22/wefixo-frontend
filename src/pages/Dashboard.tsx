import GaugeChart from "../components/charts/GaugeChart";
import StateSalesBarChart from "../components/charts/StateSalesBarChart";
import FunnelChart from "../components/charts/FunnelChart";
import RetailerDonutChart from "../components/charts/RetailerDonutChart";
import RegionAreaChart from "../components/charts/RegionAreaChart";
import LiveFactoryStatusPanel from "../components/dashboard/LiveFactoryStatusPanel";
import Sidebar from "../components/sidebar/Sidebar";
import DashboardHero from "../components/ui/DashboardHero";
import StatCard from "../components/ui/StatCard";
import useLiveFactoryData from "../hooks/useLiveFactoryData";
import {
  AlertTriangle,
  Boxes,
  Factory,
  Gauge,
  PackageCheck,
  TimerReset,
  Wrench,
  Zap,
} from "lucide-react";

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
  const { kpis } = useLiveFactoryData();

  return (
    <div className="flex h-screen w-full overflow-hidden flex-col bg-[#000000] text-white md:flex-row font-sans">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-3 sm:p-5 lg:p-6 bg-[#000000]">
        {/* Top Header & Brand Bar */}
        <DashboardHero />

        {/* Main Dashboard Chart Grid */}
        <div className="space-y-4">
          
          {/* Grid Row 1: Gauge, State Bar, Funnel + City Filter */}
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
            <GaugeChart />
            <StateSalesBarChart title="Sum of Total Sales by State" />
            <div className="lg:col-span-2">
              <FunnelChart />
            </div>
          </div>

          {/* Grid Row 2: Units Sold by State, Retailer Donut, Regional Area Chart */}
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <StateSalesBarChart title="Sum of Units Sold by State" />
            <RetailerDonutChart />
            <RegionAreaChart />
          </div>

        </div>

        {/* Live Operational Telemetry Panel */}
        <LiveFactoryStatusPanel />

        {/* Smart Factory Operational KPI Overview */}
        <div className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-300">
            Real-Time Plant Telemetry Metrics
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.slice(0, 4).map((card) => {
              const Icon = iconMap[card.iconName] || Factory;
              return (
                <StatCard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  subtitle={card.subtitle}
                  trend={card.trend}
                  icon={Icon}
                />
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}