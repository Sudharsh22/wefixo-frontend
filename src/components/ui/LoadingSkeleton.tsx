type Props = {
  className?: string;
};

export default function LoadingSkeleton({ className = "" }: Props) {
  return (
    <div className={`animate-pulse rounded-2xl border border-white/10 bg-slate-900/70 ${className}`.trim()} />
  );
}
