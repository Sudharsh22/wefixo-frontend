type Props = {
  label: string;
  tone?: "red" | "emerald" | "amber" | "cyan" | "slate";
};

const toneStyles = {
  red: "border-red-900/80 bg-red-950/40 text-[#ff1e27] shadow-[0_0_8px_rgba(255,30,39,0.2)]",
  emerald: "border-emerald-900/80 bg-emerald-950/40 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]",
  amber: "border-amber-900/80 bg-amber-950/40 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.2)]",
  cyan: "border-cyan-900/80 bg-cyan-950/40 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.2)]",
  slate: "border-red-950/80 bg-[#0c0305] text-gray-300",
};

export default function StatusBadge({ label, tone = "slate" }: Props) {
  return (
    <span className={`inline-flex items-center rounded-xl border px-3 py-1 text-xs font-bold ${toneStyles[tone]}`}>
      {label}
    </span>
  );
}

