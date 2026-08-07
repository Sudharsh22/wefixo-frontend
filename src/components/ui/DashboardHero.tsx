import { Activity, ArrowRight, Factory, ShieldCheck, Sparkles, Video, Zap } from "lucide-react";
import heroVideo from "../../assets/videos/coke-dashboard.mp4";

export default function DashboardHero() {
  const handleScrollToOperations = () => {
    const kpiSection = document.getElementById("kpi-section");
    if (kpiSection) {
      kpiSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 450, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mb-8 w-full overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-950/80 shadow-[0_0_50px_rgba(15,23,42,0.8)] backdrop-blur-xl transition-all duration-300">
      
      {/* Background Manufacturing Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover scale-[1.02] filter brightness-95 contrast-[1.05]"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Dark Overlay (65% Opacity for Readability) */}
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px]" />
        
        {/* Dark Blue & Black Mesh Gradient Lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-blue-950/50 to-slate-950/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(37,99,235,0.15),_transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(220,38,38,0.15),_transparent_50%)] pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Main Content Area */}
          <div className="max-w-3xl space-y-6">
            
            {/* Status Badges Row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Factory Online Status Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </span>
                <span>Factory Online</span>
              </div>

              {/* Live Video Tag */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1.5 text-xs font-medium text-blue-300 backdrop-blur-md">
                <Video className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
                <span>Live Feed • Bottling Operations</span>
              </div>

              {/* Plant Tag */}
              <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md">
                <Factory className="h-3.5 w-3.5 text-red-400" />
                <span>Smart Plant #04</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-blue-400">
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                <span>Manufacturing Intelligence</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                Coca-Cola Smart Factory
              </h1>
              <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
                Real-time production monitoring and AI-powered factory insights.
              </p>
            </div>

            {/* Glowing CTA Button */}
            <div className="pt-2">
              <button
                onClick={handleScrollToOperations}
                className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>View Live Operations</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-r from-blue-500 to-red-500 opacity-40 blur-md transition-all duration-300 group-hover:opacity-75" />
              </button>
            </div>

          </div>

          {/* Glassmorphism Quick Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:flex-col lg:gap-3 lg:w-72">
            <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-4 transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/70 backdrop-blur-md shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium">Overall OEE</span>
                <Activity className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">98.4%</span>
                <span className="text-xs font-semibold text-emerald-400">+1.2%</span>
              </div>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-4 transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/70 backdrop-blur-md shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium">Active Lines</span>
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">12 / 12</span>
                <span className="text-xs font-semibold text-emerald-400">100% Active</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 group rounded-2xl border border-white/10 bg-slate-900/50 p-4 transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900/70 backdrop-blur-md shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium">Quality Rate</span>
                <ShieldCheck className="h-4 w-4 text-blue-400" />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">99.9%</span>
                <span className="text-xs font-semibold text-blue-400">Optimal</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-red-600" />
    </div>
  );
}
