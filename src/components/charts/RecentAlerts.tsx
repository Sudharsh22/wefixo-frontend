import { AlertCircle, AlertTriangle, Info, ShieldAlert } from "lucide-react";

type Props = {
  alerts: Array<{
    id: number;
    message: string;
    time: string;
    severity: "High" | "Medium" | "Low";
  }>;
};

const severityStyles = {
  High: "border-red-500/40 bg-red-500/15 text-red-400 shadow-[0_0_15px_rgba(244,0,9,0.25)]",
  Medium: "border-amber-500/40 bg-amber-500/15 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
  Low: "border-emerald-500/40 bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
};

const severityIcons = {
  High: ShieldAlert,
  Medium: AlertTriangle,
  Low: Info,
};

export default function RecentAlerts({ alerts }: Props) {
  return (
    <section className="mt-6 rounded-3xl border border-red-500/20 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-red-500/30 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-500">
            <AlertCircle className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Real-Time Telemetry Events</p>
            <h2 className="mt-0.5 text-xl font-bold text-white">Recent Operations Alerts</h2>
          </div>
        </div>

        <div className="rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-400 backdrop-blur-md shadow-[0_0_12px_rgba(244,0,9,0.2)]">
          {alerts.length} Active Incidents
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = severityIcons[alert.severity as keyof typeof severityIcons] || Info;
          return (
            <div
              key={alert.id}
              className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md transition-all duration-300 hover:border-red-500/30 hover:bg-slate-800/60 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 rounded-xl border p-2 ${severityStyles[alert.severity as keyof typeof severityStyles]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-red-200 transition-colors">{alert.message}</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">{alert.time}</p>
                </div>
              </div>

              <span className={`inline-flex w-fit rounded-full border px-3.5 py-1 text-xs font-bold ${severityStyles[alert.severity as keyof typeof severityStyles]}`}>
                {alert.severity} Priority
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
