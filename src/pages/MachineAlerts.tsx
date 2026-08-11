import { useMemo, useState, useEffect } from "react";
import { AlertTriangle, BellRing, Cpu, Factory, Thermometer } from "lucide-react";
import { api, apiRoutes } from "../api/api";
import Sidebar from "../components/sidebar/Sidebar";
import EmptyState from "../components/ui/EmptyState";
import PageHeader from "../components/ui/PageHeader";
import SectionCard from "../components/ui/SectionCard";
import StatusBadge from "../components/ui/StatusBadge";

type AlertSeverity = "Low" | "Medium" | "High" | "Critical";

type AlertItem = {
  id: number;
  title: string;
  machine: string;
  area: string;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  detectedBy: string;
};

const alertsSeed: AlertItem[] = [
  {
    id: 1,
    title: "Temperature drift in filler head",
    machine: "Filler A1",
    area: "Bottling Line A",
    severity: "High",
    message: "Temperature has exceeded the normal operating window for 8 minutes.",
    timestamp: "2 min ago",
    detectedBy: "SCADA sensor",
  },
  {
    id: 2,
    title: "Conveyor belt vibration spike",
    machine: "Conveyor C3",
    area: "Packaging Zone",
    severity: "Critical",
    message: "Vibration levels are 2.4x above baseline and may indicate bearing wear.",
    timestamp: "6 min ago",
    detectedBy: "Vibration monitor",
  },
  {
    id: 3,
    title: "Labeler jam detected",
    machine: "Labeler L2",
    area: "Secondary Packaging",
    severity: "Medium",
    message: "A label misalignment event caused a short production pause.",
    timestamp: "12 min ago",
    detectedBy: "Vision inspection",
  },
  {
    id: 4,
    title: "Low coolant pressure",
    machine: "Cooling Unit CU-2",
    area: "Utilities",
    severity: "Low",
    message: "Pressure remains slightly below target but within acceptable tolerance.",
    timestamp: "18 min ago",
    detectedBy: "PLC loop",
  },
  {
    id: 5,
    title: "Motor current anomaly",
    machine: "Palletizer P1",
    area: "Material Handling",
    severity: "High",
    message: "Current draw is elevated during the transfer cycle and should be inspected.",
    timestamp: "24 min ago",
    detectedBy: "Electrical analytics",
  },
  {
    id: 6,
    title: "Compressed air leak",
    machine: "Air Compressor AC-4",
    area: "Utilities",
    severity: "Critical",
    message: "Leak rate is increasing and may affect downstream line performance.",
    timestamp: "31 min ago",
    detectedBy: "Pressure sensor",
  },
];

const severityTone: Record<AlertSeverity, "red" | "amber" | "cyan" | "slate"> = {
  Low: "cyan",
  Medium: "amber",
  High: "red",
  Critical: "red",
};

const severityIconMap: Record<AlertSeverity, typeof AlertTriangle> = {
  Low: BellRing,
  Medium: AlertTriangle,
  High: AlertTriangle,
  Critical: AlertTriangle,
};

export default function MachineAlertsPage() {
  const [selectedSeverity, setSelectedSeverity] = useState<AlertSeverity | "All">("All");
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [summary, setSummary] = useState({
    active_lines: 7,
    connected_devices: 184,
    temperature_variance: "+1.8°C"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setError(null);
        // We added a new apiRoutes entry but we can just use the path directly if it's missing in apiRoutes
        const response = await api.post('/workflows/predictive-maintenance');
        const responseData = response.data?.data?._responseData || response.data?.data;
        
        if (response.data?.success && responseData) {
          if (responseData.alerts) setAlerts(responseData.alerts);
          if (responseData.summary) setSummary(responseData.summary);
        } else {
          throw new Error("Invalid response from workflow");
        }
      } catch (err: any) {
        console.error("Error fetching machine alerts:", err);
        setError(err.response?.data?.message || err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const filteredAlerts = useMemo(() => {
    if (selectedSeverity === "All") {
      return alerts;
    }

    return alerts.filter((alert) => alert.severity === selectedSeverity);
  }, [selectedSeverity, alerts]);

  return (
    <div className="flex h-screen w-full overflow-hidden flex-col md:flex-row bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.2),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] text-white font-sans">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          eyebrow="Asset monitoring"
          title="Machine Alerts"
          description="A manufacturing-focused view of abnormal machine conditions and intervention priorities."
          badge="Real-time style data"
        />

        <SectionCard eyebrow="Filter" title="Alert severity">
          <div className="flex flex-wrap gap-3">
            {(["All", "Low", "Medium", "High", "Critical"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setSelectedSeverity(option)}
                className={`rounded-full border px-4 py-2 text-sm transition ${selectedSeverity === option ? "border-red-500/30 bg-red-500/15 text-red-300" : "border-white/10 bg-slate-800/70 text-slate-300 hover:bg-white/5"}`}
              >
                {option}
              </button>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-4 xl:grid-cols-2">
          {loading ? (
            <div className="xl:col-span-2 flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-12 h-12 border-4 border-red-500/20 border-t-[#ff1a1a] rounded-full animate-spin"></div>
              <p className="text-[#a3a3a3]">Analyzing live telemetry data with AI for Predictive Maintenance...</p>
            </div>
          ) : error ? (
            <div className="xl:col-span-2 rounded-xl border border-red-600/50 bg-red-950/30 p-6 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-[#ff1a1a] flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-200">Workflow Error</h3>
                <p className="mt-1 text-sm text-red-300/80">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-[#ff1a1a] hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : filteredAlerts.length === 0 ? (
            <div className="xl:col-span-2">
              <EmptyState title="No alerts found" description="Try another severity filter to view more machine monitoring events." />
            </div>
          ) : (
            filteredAlerts.map((alert, index) => {
              const Icon = severityIconMap[alert.severity] || AlertTriangle;

              return (
                <div key={index} className="animate-fade-up rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                        <Icon className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{alert.machine} • {alert.area}</p>
                      </div>
                    </div>
                    <StatusBadge label={alert.severity} tone={severityTone[alert.severity]} />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-300">{alert.message}</p>

                  <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-slate-800/60 p-4 text-sm text-slate-400 sm:grid-cols-3">
                    <div>
                      <p className="text-slate-500">Detected</p>
                      <p className="mt-1 font-medium text-slate-200">{alert.timestamp}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Source</p>
                      <p className="mt-1 font-medium text-slate-200">{alert.detectedBy}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Priority</p>
                      <p className="mt-1 font-medium text-slate-200">{alert.severity}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <div className="flex items-center gap-3">
              <Factory className="h-5 w-5 text-red-400" />
              <p className="text-sm text-slate-400">Active lines</p>
            </div>
            <p className="mt-3 text-2xl font-semibold">{summary.active_lines}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <div className="flex items-center gap-3">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <p className="text-sm text-slate-400">Connected devices</p>
            </div>
            <p className="mt-3 text-2xl font-semibold">{summary.connected_devices}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <div className="flex items-center gap-3">
              <Thermometer className="h-5 w-5 text-amber-400" />
              <p className="text-sm text-slate-400">Temperature variance</p>
            </div>
            <p className="mt-3 text-2xl font-semibold">{summary.temperature_variance}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
