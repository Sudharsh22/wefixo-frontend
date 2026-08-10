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
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff1a1a]">{eyebrow}</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-1 text-sm font-medium text-[#a3a3a3]">{description}</p>
      </div>

      {badge ? (
        <div className="rounded-full border border-red-600/40 bg-red-950/40 px-4 py-1.5 text-xs font-bold text-[#ff4d4d] backdrop-blur-md shadow-[0_0_12px_rgba(255,26,26,0.2)]">
          {badge}
        </div>
      ) : null}
    </div>
  );
}
