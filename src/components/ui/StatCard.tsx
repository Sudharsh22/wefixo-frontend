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
  red: "border-red-500/20 bg-red-500/10 text-red-300",
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  violet: "border-violet-500/20 bg-violet-500/10 text-violet-300",
  rose: "border-rose-500/20 bg-rose-500/10 text-rose-300",
};

export default function StatCard({ title, value, subtitle, trend, icon: Icon, tone = "cyan" }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className={`rounded-2xl border p-3 ${toneStyles[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-5 text-sm text-slate-400">{subtitle}</p>
      {trend ? <p className="mt-2 text-xs font-medium text-slate-500">{trend}</p> : null}
    </div>
  );
}
