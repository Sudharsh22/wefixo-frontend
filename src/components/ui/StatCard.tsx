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
    <div className="group relative overflow-hidden rounded-[20px] border border-red-600/20 bg-[#0f0f0f]/85 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 hover:border-red-600/50 hover:shadow-[0_0_20px_rgba(255,26,26,0.2)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#a3a3a3]">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-2xl font-black tracking-tight text-white transition-all duration-300 ${isUpdating ? "scale-105 text-[#ff1a1a]" : ""}`}>
              {value}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-red-600/30 bg-red-600/10 p-2.5 text-[#ff1a1a] shadow-[0_0_12px_rgba(255,26,26,0.25)]">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-red-950/80 pt-2.5 text-xs">
        <p className="text-[11px] text-[#a3a3a3]">{subtitle}</p>
        {trend ? (
          <span className="rounded-full border border-red-600/30 bg-red-950/40 px-2.5 py-0.5 text-[10px] font-bold text-[#ff4d4d]">
            {trend}
          </span>
        ) : null}
      </div>
    </div>
  );
}
