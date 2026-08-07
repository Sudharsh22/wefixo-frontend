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

export default function StatCard({ title, value, subtitle, trend, icon: Icon }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsUpdating(true);
      prevValueRef.current = value;
      const timer = setTimeout(() => setIsUpdating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-red-950/90 bg-[#060204] p-4 shadow-xl transition-all duration-200 hover:border-red-600/60 hover:shadow-[0_0_15px_rgba(255,30,39,0.2)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-300">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-2xl font-black tracking-tight text-white transition-all duration-300 ${isUpdating ? "scale-105 text-[#ff1e27]" : ""}`}>
              {value}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-red-600/30 bg-red-600/10 p-2.5 text-[#ff1e27] shadow-[0_0_10px_rgba(255,30,39,0.2)]">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-red-950/80 pt-2.5 text-xs">
        <p className="text-[11px] text-gray-400">{subtitle}</p>
        {trend ? (
          <span className="rounded-full border border-red-900/60 bg-red-950/40 px-2.5 py-0.5 text-[10px] font-bold text-[#ff1e27]">
            {trend}
          </span>
        ) : null}
      </div>
    </div>
  );
}

