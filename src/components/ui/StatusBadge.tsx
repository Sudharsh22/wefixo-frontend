type Props = {
  label: string;
  tone?: "red" | "emerald" | "amber" | "cyan" | "slate";
};

const toneStyles = {
  red: "border-red-500/20 bg-red-500/10 text-red-300",
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  slate: "border-slate-500/20 bg-slate-500/10 text-slate-300",
};

export default function StatusBadge({ label, tone = "slate" }: Props) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneStyles[tone]}`}>
      {label}
    </span>
  );
}
