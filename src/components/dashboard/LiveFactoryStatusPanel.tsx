import { AlertTriangle, CheckCircle2, Cpu, Flame, Gauge, HardDrive, RefreshCw, Zap } from "lucide-react";

type LineStatus = {
  id: string;
  name: string;
  type: string;
  speed: string;
  status: "Optimal" | "Warning" | "Maintenance";
  efficiency: number;
};

const linesData: LineStatus[] = [
  { id: "L-01", name: "High-Speed Bottling Line B1", type: "PET 500ml", speed: "1,250 BPM", status: "Optimal", efficiency: 98.4 },
  { id: "L-02", name: "Can Line C2", type: "Aluminum 330ml", speed: "1,800 CPM", status: "Optimal", efficiency: 96.1 },
  { id: "L-03", name: "Glass Bottling Line G3", type: "Contour 250ml", speed: "850 BPM", status: "Warning", efficiency: 84.2 },
  { id: "L-04", name: "Syrup Blending & Carbonation U4", type: "Zero Sugar Mix", speed: "4,500 L/h", status: "Optimal", efficiency: 99.2 },
  { id: "L-05", name: "Automated Palletizing Cell P5", type: "Bulk Wrapping", speed: "45 Pallets/h", status: "Optimal", efficiency: 97.8 },
];

export default function LiveFactoryStatusPanel() {
  return (
    <section className="mt-8 rounded-3xl border border-red-500/20 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300">
      
      {/* Header Row */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(244,0,9,0.25)]">
            <Cpu className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">Live Enterprise Telemetry</span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>
            <h2 className="mt-0.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Factory Operational Telemetry
            </h2>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-md">
            <RefreshCw className="h-3.5 w-3.5 text-blue-400 animate-spin" />
            <span>Syncing 5s</span>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            5 / 5 Core Lines Active
          </div>
        </div>
      </div>

      {/* Primary Telemetry Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Plant Throughput Rate</span>
            <Gauge className="h-4 w-4 text-red-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">3,900</span>
            <span className="text-xs font-semibold text-emerald-400">Units / min</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-red-600 to-amber-500" style={{ width: "94%" }} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Thermal Control Index</span>
            <Flame className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">4.2 °C</span>
            <span className="text-xs font-semibold text-emerald-400">Target 4.0 °C</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: "98%" }} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Power Grid Load</span>
            <Zap className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">1.28 MW</span>
            <span className="text-xs font-semibold text-emerald-400">92% Capacity</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: "88%" }} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>IoT Sensor Network</span>
            <HardDrive className="h-4 w-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">412 Node</span>
            <span className="text-xs font-semibold text-emerald-400">99.8% Online</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500" style={{ width: "99%" }} />
          </div>
        </div>
      </div>

      {/* Production Lines Table / List */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Live Line Performance Breakdown</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {linesData.map((line) => (
            <div
              key={line.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-4 transition-all duration-300 hover:border-red-500/30 hover:bg-slate-800/60 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-white/5 px-2 py-0.5 text-xs font-mono text-slate-400">{line.id}</span>
                  <span className="font-semibold text-white text-sm">{line.name}</span>
                </div>
                {line.status === "Optimal" ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="h-3 w-3" />
                    Optimal
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="h-3 w-3" />
                    Watch
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                <span className="text-slate-400">{line.type}</span>
                <span className="font-semibold text-white">{line.speed}</span>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Line OEE</span>
                <span className="font-bold text-emerald-400">{line.efficiency}%</span>
              </div>

              <div className="mt-1.5 h-1 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full ${line.efficiency > 95 ? "bg-emerald-500" : line.efficiency > 85 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${line.efficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
