type Props = {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
};

export default function PageHeader({ eyebrow, title, description, badge }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between font-sans">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff1e27]">{eyebrow}</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-1 text-sm font-medium text-gray-400">{description}</p>
      </div>

      {badge ? (
        <div className="rounded-xl border border-red-900/60 bg-[#0c0305] px-4 py-2 text-xs font-bold text-[#ff1e27] shadow-[0_0_12px_rgba(255,30,39,0.15)]">
          {badge}
        </div>
      ) : null}
    </div>
  );
}

