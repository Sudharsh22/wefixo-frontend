type Props = {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
};

export default function PageHeader({ eyebrow, title, description, badge }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-400">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-slate-400 sm:text-base">{description}</p>
      </div>

      {badge ? (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {badge}
        </div>
      ) : null}
    </div>
  );
}
