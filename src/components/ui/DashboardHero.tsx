import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DashboardHero() {
  const [selectedBrand, setSelectedBrand] = useState("All");

  return (
    <div className="mb-6 w-full rounded-2xl border border-red-950/90 bg-[#060204] p-4 md:p-5 shadow-2xl font-sans">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Left Side: Brand Header */}
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#ff1e27] drop-shadow-[0_0_15px_rgba(255,30,39,0.6)]">
              WEFIXO
            </h1>
            <p className="text-[10px] font-extrabold tracking-[0.25em] text-gray-300 uppercase mt-0.5">
              SMART FACTORY AI
            </p>
          </div>
        </div>

        {/* Right Side: Metrics & Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:justify-end">
          
          {/* Metric 1: Total Units Produced */}
          <div className="flex items-center gap-4 rounded-xl border border-red-950/80 bg-[#0c0305] px-4 py-2.5 shadow-inner">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-300">
                Total Units Produced
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                2,588,500
              </p>
            </div>
            {/* Red Sparkline */}
            <svg className="h-8 w-20 text-[#ff1e27]" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M0 20 Q 15 5, 30 18 T 60 10 T 80 22 T 100 8" strokeLinecap="round" />
            </svg>
          </div>

          {/* Metric 2: Total Factory Yield */}
          <div className="flex items-center gap-4 rounded-xl border border-red-950/80 bg-[#0c0305] px-4 py-2.5 shadow-inner">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-300">
                Total Factory Yield
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                1.16M
              </p>
            </div>
            {/* Red Sparkline */}
            <svg className="h-8 w-20 text-[#ff1e27]" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M0 15 Q 20 25, 40 8 T 70 20 T 100 5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Filter Dropdown */}
          <div className="min-w-[150px]">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Production Unit
            </label>
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full appearance-none rounded-xl border border-red-950/80 bg-[#0c0305] px-3.5 py-1.5 text-xs font-semibold text-white focus:border-red-600 focus:outline-none cursor-pointer"
              >
                <option value="All">All Plants</option>
                <option value="Line-Alpha">Plant Chennai (TN)</option>
                <option value="Line-Beta">Plant Bengaluru (KA)</option>
                <option value="Line-Gamma">Plant Pune (MH)</option>
                <option value="Line-Delta">Plant Ahmedabad (GJ)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
