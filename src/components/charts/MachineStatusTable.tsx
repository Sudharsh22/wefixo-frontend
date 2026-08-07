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
  Running: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  Maintenance: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  Idle: "border-slate-500/20 bg-slate-500/10 text-slate-300",
};

export default function MachineStatusTable({ machines }: Props) {
  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Machine overview</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Machine Status</h2>
        </div>
        <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
          Live fleet view
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-white/10 text-slate-400">
              <th className="px-3 py-3 font-medium">ID</th>
              <th className="px-3 py-3 font-medium">Machine</th>
              <th className="px-3 py-3 font-medium">Temp</th>
              <th className="px-3 py-3 font-medium">Runtime</th>
              <th className="px-3 py-3 font-medium">Util.</th>
              <th className="px-3 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((machine) => (
              <tr key={machine.id} className="border-b border-white/10 last:border-none">
                <td className="px-3 py-3 text-white">{machine.id}</td>
                <td className="px-3 py-3">{machine.name}</td>
                <td className="px-3 py-3">{machine.temperature}</td>
                <td className="px-3 py-3">{machine.runtime}</td>
                <td className="px-3 py-3">{machine.utilization}</td>
                <td className="px-3 py-3">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[machine.status as keyof typeof statusStyles]}`}>
                    {machine.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
