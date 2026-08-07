import { Flame, Gauge, HardDrive, RefreshCw, Radio, Zap } from "lucide-react";

export default function LiveFactoryStatusPanel() {
  return (
    <section className="mt-6 rounded-2xl border border-red-950/90 bg-[#060204] p-5 shadow-2xl font-sans">
      
      {/* Header Row */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-red-950/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-600/40 bg-red-600/10 text-[#ff1e27] shadow-[0_0_15px_rgba(255,30,39,0.3)]">
            <Radio className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ff1e27]">Live Enterprise Telemetry</span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>
            <h2 className="mt-0.5 text-xl font-black tracking-tight text-white sm:text-2xl">
              Factory Operational Telemetry
            </h2>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-red-950/80 bg-[#0c0305] px-3.5 py-1.5 text-xs text-gray-300">
            <RefreshCw className="h-3.5 w-3.5 text-[#ff1e27] animate-spin" />
            <span>Syncing 5s</span>
          </div>
          <div className="rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-1.5 text-xs font-bold text-red-400 shadow-[0_0_10px_rgba(255,30,39,0.2)]">
            5 / 5 Core Lines Active
          </div>
        </div>
      </div>

      {/* Primary Telemetry 4-Grid Cards (Matching Image 2 Bottom Row) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1: Plant Throughput Rate */}
        <div className="rounded-xl border border-red-950/90 bg-[#0c0305] p-4 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <span>Plant Throughput Rate</span>
            <Gauge className="h-4 w-4 text-[#ff1e27]" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white tracking-tight">3,900</span>
            <span className="text-xs font-extrabold text-[#ff1e27]">Units / min</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#1c0508]">
            <div className="h-full rounded-full bg-gradient-to-r from-red-800 to-[#ff1e27] shadow-[0_0_10px_rgba(255,30,39,0.5)]" style={{ width: "94%" }} />
          </div>
        </div>

        {/* Card 2: Thermal Control Index */}
        <div className="rounded-xl border border-red-950/90 bg-[#0c0305] p-4 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <span>Thermal Control Index</span>
            <Flame className="h-4 w-4 text-[#ff1e27]" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white tracking-tight">4.2 °C</span>
            <span className="text-xs font-extrabold text-[#ff1e27]">Target 4.0 °C</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#1c0508]">
            <div className="h-full rounded-full bg-gradient-to-r from-red-800 to-[#ff1e27] shadow-[0_0_10px_rgba(255,30,39,0.5)]" style={{ width: "98%" }} />
          </div>
        </div>

        {/* Card 3: Power Grid Load */}
        <div className="rounded-xl border border-red-950/90 bg-[#0c0305] p-4 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <span>Power Grid Load</span>
            <Zap className="h-4 w-4 text-[#ff1e27]" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white tracking-tight">1.28 MW</span>
            <span className="text-xs font-extrabold text-[#ff1e27]">92% Capacity</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#1c0508]">
            <div className="h-full rounded-full bg-gradient-to-r from-red-800 to-[#ff1e27] shadow-[0_0_10px_rgba(255,30,39,0.5)]" style={{ width: "88%" }} />
          </div>
        </div>

        {/* Card 4: IoT Sensor Network */}
        <div className="rounded-xl border border-red-950/90 bg-[#0c0305] p-4 shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <span>IoT Sensor Network</span>
            <HardDrive className="h-4 w-4 text-[#ff1e27]" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white tracking-tight">412 Node</span>
            <span className="text-xs font-extrabold text-[#ff1e27]">99.8% Online</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#1c0508]">
            <div className="h-full rounded-full bg-gradient-to-r from-red-800 to-[#ff1e27] shadow-[0_0_10px_rgba(255,30,39,0.5)]" style={{ width: "99%" }} />
          </div>
        </div>

      </div>

    </section>
  );
}

