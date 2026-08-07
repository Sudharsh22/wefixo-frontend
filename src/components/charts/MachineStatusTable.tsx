type Props = {
  machines: Array<{
    id: string;
    name: string;
    temperature: string;
    runtime: string;
    utilization: string;
    status: "Running" | "Maintenance" | "Idle";
  }>;
};

const statusStyles = {
  Running: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
  Maintenance: "border-amber-500/30 bg-amber-500/15 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
  Idle: "border-slate-500/30 bg-slate-500/15 text-slate-300",
};

export default function MachineStatusTable({ machines }: Props) {
  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-red-500/30 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Fleet Diagnostics</p>
          <h2 className="mt-0.5 text-xl font-bold text-white">Live Machine Fleet Status</h2>
        </div>
        <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-400 backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.15)]">
          Real-Time Sensor Telemetry
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-slate-400">
              <th className="px-4 py-3.5">Equipment ID</th>
              <th className="px-4 py-3.5">Machine Asset</th>
              <th className="px-4 py-3.5">Thermal Index</th>
              <th className="px-4 py-3.5">Active Runtime</th>
              <th className="px-4 py-3.5">Utilization OEE</th>
              <th className="px-4 py-3.5">Operational State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {machines.map((machine) => {
              const tempVal = Number(machine.temperature.replace("°C", ""));
              return (
                <tr key={machine.id} className="transition-colors duration-200 hover:bg-white/[0.04]">
                  <td className="px-4 py-4 font-mono text-xs font-bold text-red-400">{machine.id}</td>
                  <td className="px-4 py-4 font-semibold text-white">{machine.name}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 font-medium ${tempVal > 80 ? "text-amber-400" : "text-emerald-400"}`}>
                      <span className={`h-2 w-2 rounded-full ${tempVal > 80 ? "bg-amber-400" : "bg-emerald-400"}`} />
                      {machine.temperature}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{machine.runtime}</td>
                  <td className="px-4 py-4 font-semibold text-white">{machine.utilization}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[machine.status as keyof typeof statusStyles]}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${machine.status === "Running" ? "bg-emerald-400 animate-pulse" : machine.status === "Maintenance" ? "bg-amber-400" : "bg-slate-400"}`} />
                      {machine.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
