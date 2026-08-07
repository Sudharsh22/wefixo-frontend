type Props = {
  variant?: "kpis" | "chart" | "table";
};

export default function DashboardSkeleton({ variant = "kpis" }: Props) {
  if (variant === "chart") {
    return (
      <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-3 w-20 animate-pulse rounded-full bg-slate-800" />
            <div className="h-5 w-40 animate-pulse rounded-full bg-slate-800" />
          </div>
          <div className="h-8 w-28 animate-pulse rounded-full bg-slate-800" />
        </div>
        <div className="h-[260px] w-full animate-pulse rounded-2xl bg-slate-800/70 sm:h-[320px]" />
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-3 w-20 animate-pulse rounded-full bg-slate-800" />
            <div className="h-5 w-40 animate-pulse rounded-full bg-slate-800" />
          </div>
          <div className="h-8 w-28 animate-pulse rounded-full bg-slate-800" />
        </div>
        <div className="space-y-3">
          <div className="h-12 animate-pulse rounded-2xl bg-slate-800/70" />
          <div className="h-12 animate-pulse rounded-2xl bg-slate-800/70" />
          <div className="h-12 animate-pulse rounded-2xl bg-slate-800/70" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
          <div className="h-3 w-24 animate-pulse rounded-full bg-slate-800" />
          <div className="mt-4 h-8 w-24 animate-pulse rounded-full bg-slate-800" />
          <div className="mt-3 h-3 w-32 animate-pulse rounded-full bg-slate-800/80" />
          <div className="mt-6 h-10 w-full animate-pulse rounded-2xl bg-slate-800/70" />
        </div>
      ))}
    </div>
  );
}
