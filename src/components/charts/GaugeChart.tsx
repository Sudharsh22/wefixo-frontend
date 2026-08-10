export default function GaugeChart() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-red-950/90 bg-[#060204] p-4 font-sans shadow-xl">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
        Total Units Produced
      </h3>

      <div className="relative my-4 flex flex-col items-center justify-center">
        {/* Semi-Circle SVG Gauge */}
        <svg className="h-36 w-64 overflow-visible" viewBox="0 0 200 110">
          {/* Background Arc Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1a080b"
            strokeWidth="24"
            strokeLinecap="round"
          />
          {/* Filled Arc Track (16M / 33M = ~48.5%) */}
          <path
            d="M 20 100 A 80 80 0 0 1 105 21"
            fill="none"
            stroke="url(#neonRedGradient)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="neonRedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b0000" />
              <stop offset="100%" stopColor="#ff1e27" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Value Overlay */}
        <div className="absolute bottom-2 flex flex-col items-center">
          <span className="text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,30,39,0.5)]">
            16M
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cases</span>
        </div>
      </div>

      {/* Axis Min / Max */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-400 px-2">
        <span>0M</span>
        <span>33M Target</span>
      </div>
    </div>
  );
}
