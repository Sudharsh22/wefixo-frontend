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
  Running: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]",
  Maintenance: "border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
  Idle: "border-red-900/60 bg-red-950/40 text-red-300 shadow-[0_0_12px_rgba(255,30,39,0.15)]",
};

export default function MachineStatusTable({ machines }: Props) {
  return (
    <section className="rounded-[20px] border border-red-600/20 bg-[#0f0f0f]/85 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_0_20px_rgba(255,26,26,0.2)]">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-red-950/80 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff1a1a]">Fleet Diagnostics</p>
          <h2 className="mt-0.5 text-xl font-black text-white tracking-tight">Live Machine Fleet Status</h2>
        </div>
        <div className="rounded-full border border-red-600/40 bg-red-950/40 px-3.5 py-1.5 text-xs font-bold text-[#ff4d4d] backdrop-blur-md shadow-[0_0_12px_rgba(255,26,26,0.2)]">
          Real-Time Telemetry
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-[#a3a3a3]">
          <thead>
            <tr className="border-b border-red-900/40 text-xs font-bold uppercase tracking-wider text-[#a3a3a3]">
              <th className="px-4 py-3.5">Equipment ID</th>
              <th className="px-4 py-3.5">Machine Asset</th>
              <th className="px-4 py-3.5">Thermal Index</th>
              <th className="px-4 py-3.5">Active Runtime</th>
              <th className="px-4 py-3.5">Utilization OEE</th>
              <th className="px-4 py-3.5">Operational State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-950/40">
            {machines.map((machine) => {
              const tempVal = Number(machine.temperature.replace("°C", ""));
              return (
                <tr key={machine.id} className="transition-colors duration-200 hover:bg-[#ff1a1a]/10">
                  <td className="px-4 py-4 font-mono text-xs font-bold text-[#ff4d4d]">{machine.id}</td>
                  <td className="px-4 py-4 font-semibold text-white">{machine.name}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 font-medium ${tempVal > 80 ? "text-amber-400" : "text-emerald-400"}`}>
                      <span className={`h-2 w-2 rounded-full ${tempVal > 80 ? "bg-amber-400" : "bg-emerald-400"}`} />
                      {machine.temperature}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[#a3a3a3]">{machine.runtime}</td>
                  <td className="px-4 py-4 font-semibold text-white">{machine.utilization}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[machine.status as keyof typeof statusStyles]}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${machine.status === "Running" ? "bg-emerald-400 animate-pulse" : machine.status === "Maintenance" ? "bg-amber-400" : "bg-red-400"}`} />
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
