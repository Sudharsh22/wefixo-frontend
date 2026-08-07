type Props = {
  alerts: Array<{
    id: number;
    message: string;
    time: string;
    severity: "High" | "Medium" | "Low";
  }>;
};

const severityStyles = {
  High: "border-red-500/20 bg-red-500/10 text-red-300",
  Medium: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  Low: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
};

export default function RecentAlerts({ alerts }: Props) {
  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Operations feed</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Recent Alerts</h2>
        </div>
        <div className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-sm text-red-300">
          5 active
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-800/60 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-white">{alert.message}</p>
              <p className="mt-1 text-sm text-slate-400">{alert.time}</p>
            </div>

            <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${severityStyles[alert.severity as keyof typeof severityStyles]}`}>
              {alert.severity}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
