import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
  icon: LucideIcon;
  tone?: "red" | "emerald" | "amber" | "cyan" | "violet" | "rose";
};

const toneStyles = {
  red: {
    badge: "border-red-500/30 bg-red-500/15 text-red-400 shadow-[0_0_15px_rgba(244,0,9,0.2)]",
    cardBorder: "hover:border-red-500/30",
    accentGlow: "from-red-500/10 to-transparent",
  },
  emerald: {
    badge: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    cardBorder: "hover:border-emerald-500/30",
    accentGlow: "from-emerald-500/10 to-transparent",
  },
  amber: {
    badge: "border-amber-500/30 bg-amber-500/15 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    cardBorder: "hover:border-amber-500/30",
    accentGlow: "from-amber-500/10 to-transparent",
  },
  cyan: {
    badge: "border-cyan-500/30 bg-cyan-500/15 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]",
    cardBorder: "hover:border-cyan-500/30",
    accentGlow: "from-cyan-500/10 to-transparent",
  },
  violet: {
    badge: "border-violet-500/30 bg-violet-500/15 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)]",
    cardBorder: "hover:border-violet-500/30",
    accentGlow: "from-violet-500/10 to-transparent",
  },
  rose: {
    badge: "border-rose-500/30 bg-rose-500/15 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]",
    cardBorder: "hover:border-rose-500/30",
    accentGlow: "from-rose-500/10 to-transparent",
  },
};

export default function StatCard({ title, value, subtitle, trend, icon: Icon, tone = "cyan" }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const prevValueRef = useRef(value);

  // Trigger smooth pulse animation when value updates live
  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsUpdating(true);
      prevValueRef.current = value;
      const timer = setTimeout(() => setIsUpdating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [value]);

  const style = toneStyles[tone] || toneStyles.cyan;

  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 ${style.cardBorder} hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:-translate-y-0.5`}>
      {/* Top Ambient Glow */}
      <div className={`absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-br ${style.accentGlow} pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300`} />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">{title}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-3xl font-extrabold tracking-tight text-white transition-all duration-300 ${isUpdating ? "scale-105 text-red-400" : ""}`}>
              {value}
            </span>
          </div>
        </div>

        <div className={`rounded-2xl border p-3.5 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 ${style.badge}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="relative z-10 mt-4 flex items-center justify-between pt-2 border-t border-white/[0.06]">
        <p className="text-xs font-medium text-slate-400">{subtitle}</p>
        {trend ? (
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            {trend}
          </span>
        ) : null}
      </div>
    </div>
  );
}
