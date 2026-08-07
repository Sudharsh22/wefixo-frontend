import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  icon: LucideIcon;
  tone?: "cyan" | "emerald" | "amber" | "rose" | "violet";
};

const toneStyles = {
  cyan: "border-cyan-400/20 bg-cyan-500/15 text-cyan-300",
  emerald: "border-emerald-400/20 bg-emerald-500/15 text-emerald-300",
  amber: "border-amber-400/20 bg-amber-500/15 text-amber-300",
  rose: "border-rose-400/20 bg-rose-500/15 text-rose-300",
  violet: "border-violet-400/20 bg-violet-500/15 text-violet-300",
};

const trendStyles = {
  cyan: "text-cyan-300",
  emerald: "text-emerald-300",
  amber: "text-amber-300",
  rose: "text-rose-300",
  violet: "text-violet-300",
};

export default function KpiCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  tone = "cyan",
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 p-5 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
            {title}
          </p>
          <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
        </div>

        <div className={`rounded-2xl border p-3 ${toneStyles[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-slate-400">{subtitle}</span>
        <span className={`font-medium ${trendStyles[tone]}`}>{trend}</span>
      </div>
    </div>
  );
}